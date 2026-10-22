"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import axios from "axios";
import { CHATBOT_MESSAGE_API } from "@/utils/APIs";
import { useAuth } from "./AuthContext";

const ChatbotContext = createContext();

const INITIAL_MESSAGE = {
    id: "welcome-1",
    role: "assistant",
    content: "Greetings and welcome to Nexora Luxury Atelier. I am your personal concierge. How may I assist you with our curated collections, styling advice, or orders today?",
    timestamp: new Date().toISOString(),
    products: [],
    order: null,
    quickReplies: [
        "Trending blazers under $400",
        " Supima Cotton Tees",
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
    const { user } = useAuth();

    // Restore conversation from sessionStorage on mount
    useEffect(() => {
        try {
            const saved = sessionStorage.getItem("nexora_chat_history");
            if (saved) {
                const parsed = JSON.parse(saved);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setMessages(parsed);
                }
            }
        } catch (e) {
            console.warn("Could not load stored chat history", e);
        }
    }, []);

    // Save conversation to sessionStorage
    useEffect(() => {
        try {
            if (messages.length > 0) {
                sessionStorage.setItem("nexora_chat_history", JSON.stringify(messages.slice(-15)));
            }
        } catch (e) {
            console.warn("Could not save chat history", e);
        }
    }, [messages]);

    const toggleChat = useCallback(() => {
        setIsOpen(prev => {
            if (!prev) setUnreadCount(0);
            return !prev;
        });
    }, []);

    const clearHistory = useCallback(() => {
        setMessages([INITIAL_MESSAGE]);
        setUnreadCount(0);
        try {
            sessionStorage.removeItem("nexora_chat_history");
        } catch (e) {}
    }, []);

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
                    conversationHistory
                },
                { headers, timeout: 35000 }
            );

            const data = response.data;

            if (data.language?.name) {
                setActiveLanguage(data.language.name);
            }

            const assistantMsg = {
                id: `assistant-${Date.now()}`,
                role: "assistant",
                content: data.message || "Thank you for reaching out to Nexora.",
                products: data.products || [],
                order: data.order || null,
                requiresAuth: !!data.requiresAuth,
                quickReplies: data.quickReplies || [],
                timestamp: new Date().toISOString()
            };

            setMessages(prev => [...prev, assistantMsg]);
            if (!isOpen) {
                setUnreadCount(c => c + 1);
            }
        } catch (error) {
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
            setIsLoading(false);
        }
    }, [messages, user, isOpen]);

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
