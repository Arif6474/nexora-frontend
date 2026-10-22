"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import {
    CHATBOT_MESSAGE_API,
    CHATBOT_NEW_CHAT_API,
    CHATBOT_CONVERSATIONS_API
} from "@/utils/APIs";
import { useAuth } from "./AuthContext";

const ChatbotContext = createContext();

const INITIAL_MESSAGE = {
    id: "welcome-1",
    role: "assistant",
    content: "Greetings and welcome to Nexora Luxury Atelier. I am your personal concierge. How may I assist you with our curated collections, styling advice, or orders today?",
    timestamp: new Date().toISOString(),
    products: [],
    order: null,
    verifiedSource: "concierge_greeting",
    quickReplies: [
        "Trending blazers under $400",
        "Supima Cotton Tees",
        "Track my order",
        "Shipping & Delivery policy"
    ]
};

export const ChatbotProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([INITIAL_MESSAGE]);
    const [isLoading, setIsLoading] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const [activeLanguage, setActiveLanguage] = useState("English");
    const [conversationId, setConversationId] = useState(null);
    const [sessionId, setSessionId] = useState(null);
    const [conversations, setConversations] = useState([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(false);
    const { user } = useAuth();

    // Sequence tracker and abort controller to prevent in-flight race conditions
    const requestSeqRef = useRef(0);
    const abortControllerRef = useRef(null);

    // Initialize sessionId and restore conversation from sessionStorage on mount
    useEffect(() => {
        try {
            let storedSessionId = sessionStorage.getItem("nexora_chat_session_id");
            if (!storedSessionId) {
                storedSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
                    ? crypto.randomUUID()
                    : `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
                sessionStorage.setItem("nexora_chat_session_id", storedSessionId);
            }
            setSessionId(storedSessionId);

            const storedConvId = sessionStorage.getItem("nexora_chat_conversation_id");
            if (storedConvId) {
                setConversationId(storedConvId);
            }

            const saved = sessionStorage.getItem("nexora_chat_history");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            }
        } catch (e) {
            console.warn("Could not load stored chat session/history", e);
        }
    }, []);

    // Save conversation to sessionStorage
    useEffect(() => {
        try {
            if (messages.length > 0) {
                sessionStorage.setItem("nexora_chat_history", JSON.stringify(messages.slice(-20)));
            }
            if (conversationId) {
                sessionStorage.setItem("nexora_chat_conversation_id", conversationId);
            } else {
                sessionStorage.removeItem("nexora_chat_conversation_id");
            }
        } catch (e) {
            console.warn("Could not save chat history", e);
        }
    }, [messages, conversationId]);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => {
            if (!prev) setUnreadCount(0);
            return !prev;
        });
    }, []);

    // Fetch conversation list for logged-in customer
    const fetchConversations = useCallback(async () => {
        if (!user?.token) {
            setConversations([]);
            return;
        }
        setIsLoadingHistory(true);
        try {
            const res = await axios.get(CHATBOT_CONVERSATIONS_API, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (res.data?.success && Array.isArray(res.data.conversations)) {
                setConversations(res.data.conversations);
            }
        } catch (err) {
            console.warn("Could not fetch conversations:", err.message);
        } finally {
            setIsLoadingHistory(false);
        }
    }, [user]);

    // Fetch conversation list when user logs in or opens chat
    useEffect(() => {
        if (user?.token && isOpen) {
            fetchConversations();
        }
    }, [user, isOpen, fetchConversations]);

    // Start a fresh new chat session with context isolation
    const startNewChat = useCallback(async () => {
        // Abort any in-flight message request to prevent delayed responses from overwriting the new chat
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        requestSeqRef.current += 1;
        const currentSeq = requestSeqRef.current;

        const freshSessionId = typeof crypto !== 'undefined' && crypto.randomUUID
            ? crypto.randomUUID()
            : `session-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

        setMessages([INITIAL_MESSAGE]);
        setUnreadCount(0);
        setIsLoading(false);
        setConversationId(null);
        setSessionId(freshSessionId);

        try {
            sessionStorage.removeItem("nexora_chat_history");
            sessionStorage.removeItem("nexora_chat_conversation_id");
            sessionStorage.setItem("nexora_chat_session_id", freshSessionId);

            if (user?.token) {
                const res = await axios.post(
                    CHATBOT_NEW_CHAT_API,
                    {},
                    { headers: { Authorization: `Bearer ${user.token}` } }
                );
                if (currentSeq === requestSeqRef.current && res.data?.conversationId) {
                    setConversationId(res.data.conversationId);
                    sessionStorage.setItem("nexora_chat_conversation_id", res.data.conversationId);
                }
                if (currentSeq === requestSeqRef.current) {
                    fetchConversations();
                }
            }
        } catch (e) {
            console.warn("Failed to create new server chat session:", e);
        }
    }, [user, fetchConversations]);

    // Load a previous conversation by ID
    const loadConversation = useCallback(async (id) => {
        if (!id || !user?.token) return;

        // Abort any in-flight message request
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
        }
        requestSeqRef.current += 1;
        const currentSeq = requestSeqRef.current;

        setIsLoading(true);
        try {
            const res = await axios.get(`${CHATBOT_CONVERSATIONS_API}/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (currentSeq !== requestSeqRef.current) return;

            const conv = res.data?.conversation;
            if (conv && Array.isArray(conv.messages) && conv.messages.length > 0) {
                const formatted = conv.messages.map((m, idx) => ({
                    id: m._id || `restored-${idx}-${Date.now()}`,
                    role: m.role,
                    content: m.content,
                    intent: m.intent,
                    products: m.products || [],
                    order: m.order || null,
                    requiresAuth: !!m.requiresAuth,
                    verifiedSource: m.verifiedSource || null,
                    quickReplies: m.quickReplies || [],
                    timestamp: m.timestamp || new Date().toISOString()
                }));
                setMessages(formatted);
                setConversationId(conv.id || id);
                sessionStorage.setItem("nexora_chat_conversation_id", conv.id || id);
                sessionStorage.setItem("nexora_chat_history", JSON.stringify(formatted.slice(-20)));
            }
        } catch (err) {
            if (currentSeq === requestSeqRef.current) {
                console.error("Failed to load conversation:", err);
            }
        } finally {
            if (currentSeq === requestSeqRef.current) {
                setIsLoading(false);
            }
        }
    }, [user]);

    // Delete single conversation
    const deleteConversation = useCallback(async (id) => {
        if (!id || !user?.token) return;
        try {
            await axios.delete(`${CHATBOT_CONVERSATIONS_API}/${id}`, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            setConversations(prev => prev.filter(c => c.id !== id));
            if (conversationId === id) {
                startNewChat();
            }
        } catch (err) {
            console.error("Failed to delete conversation:", err);
        }
    }, [user, conversationId, startNewChat]);

    // Clear all history
    const clearHistory = useCallback(() => {
        startNewChat();
    }, [startNewChat]);

    const sendMessage = useCallback(async (text) => {
        if (!text || typeof text !== "string" || !text.trim()) return;

        const cleanText = text.trim();
        const userMsg = {
            id: `user-${Date.now()}`,
            role: "user",
            content: cleanText,
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMsg]);
        setIsLoading(true);

        // Cancel previous pending message request if any
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        requestSeqRef.current += 1;
        const reqSeq = requestSeqRef.current;

        try {
            // Prepare conversation context (last 6 messages)
            const conversationHistory = messages.slice(-6).map(m => ({
                role: m.role,
                content: m.content
            }));

            const headers = { "Content-Type": "application/json" };
            if (user?.token) {
                headers.Authorization = `Bearer ${user.token}`;
            }

            const response = await axios.post(
                CHATBOT_MESSAGE_API,
                {
                    message: cleanText,
                    conversationHistory,
                    conversationId,
                    sessionId
                },
                {
                    headers,
                    timeout: 35000,
                    signal: controller.signal
                }
            );

            // Check if superseded while awaiting response
            if (reqSeq !== requestSeqRef.current) {
                return;
            }

            const data = response.data;

            if (data.language?.name) {
                setActiveLanguage(data.language.name);
            }

            if (data.conversationId) {
                setConversationId(data.conversationId);
                sessionStorage.setItem("nexora_chat_conversation_id", data.conversationId);
            }
            if (data.sessionId && !sessionId) {
                setSessionId(data.sessionId);
                sessionStorage.setItem("nexora_chat_session_id", data.sessionId);
            }

            const assistantMsg = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.message || "Thank you for reaching out to Nexora.",
                products: data.products || [],
                order: data.order || null,
                requiresAuth: !!data.requiresAuth,
                quickReplies: data.quickReplies || [],
                verifiedSource: data.verifiedSource || null,
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, assistantMsg]);
            if (!isOpen) {
                setUnreadCount(c => c + 1);
            }

            // Refresh conversation list in background for customer
            if (user?.token) {
                fetchConversations();
            }
        } catch (error) {
            // If request was canceled/superseded, silently discard
            if (axios.isCancel?.(error) || error.name === 'CanceledError' || error.name === 'AbortError' || reqSeq !== requestSeqRef.current) {
                return;
            }

            console.error("Chatbot API error:", error);
            const errorMsg = {
                id: `error-${Date.now()}`,
                role: "assistant",
                content: error.response?.data?.message || "Our concierge service is briefly processing high traffic. Please try again or reach our studio directly at hello@nexora.com.",
                isError: true,
                timestamp: new Date().toISOString()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            if (reqSeq === requestSeqRef.current) {
                setIsLoading(false);
                if (abortControllerRef.current === controller) {
                    abortControllerRef.current = null;
                }
            }
        }
    }, [messages, user, isOpen, conversationId, sessionId, fetchConversations]);

    return (
        <ChatbotContext.Provider
            value={{
                isOpen,
                setIsOpen,
                toggleChat,
                messages,
                sendMessage,
                isLoading,
                unreadCount,
                activeLanguage,
                conversationId,
                sessionId,
                conversations,
                isLoadingHistory,
                startNewChat,
                loadConversation,
                deleteConversation,
                fetchConversations,
                clearHistory
            }}
        >
            {children}
        </ChatbotContext.Provider>
    );
};

export const useChatbot = () => {
    const context = useContext(ChatbotContext);
    if (!context) {
        throw new Error("useChatbot must be used within a ChatbotProvider");
    }
    return context;
};
