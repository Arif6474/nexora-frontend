"use client";

import React, { useState, useRef, useEffect } from "react";
import {
    MessageSquare,
    X,
    Send,
    Sparkles,
    Trash2,
    Minimize2,
    Maximize2,
    Globe,
    Lock,
    RefreshCw,
    Bot
} from "lucide-react";
import { useChatbot } from "@/context/ChatbotContext";
import ProductCardBubble from "./ProductCardBubble";
import OrderCardBubble from "./OrderCardBubble";

export default function ChatbotWidget() {
    const {
        isOpen,
        toggleChat,
        messages,
        sendMessage,
        isLoading,
        unreadCount,
        activeLanguage,
        clearHistory
    } = useChatbot();

    const [input, setInput] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);

    // Auto-scroll to bottom of messages
    useEffect(() => {
        if (isOpen) {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen, isLoading]);

    // Focus input on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 200);
        }
    }, [isOpen]);

    const handleSend = (e) => {
        if (e) e.preventDefault();
        if (!input.trim() || isLoading) return;

        const textToSend = input;
        setInput("");
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
        }
        sendMessage(textToSend);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleTextareaChange = (e) => {
        setInput(e.target.value);
        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
            {/* Expanded Chat Window */}
            {isOpen && (
                <div
                    role="dialog"
                    aria-label="Nexora Concierge AI Chat"
                    className={`bg-stone-900 border border-stone-800 shadow-2xl rounded-3xl flex flex-col overflow-hidden mb-4 transition-all duration-300 ease-out backdrop-blur-xl ${
                        isExpanded
                            ? "w-[92vw] sm:w-[600px] h-[80vh] max-h-[750px]"
                            : "w-[92vw] sm:w-[400px] h-[550px] max-h-[85vh]"
                    }`}
                >
                    {/* Header */}
                    <div className="bg-stone-950/80 px-5 py-4 border-b border-stone-800 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-9 h-9 rounded-xl bg-linear-to-br from-emerald-600 to-emerald-800 flex items-center justify-center text-white shadow-md">
                                    <Bot className="w-5 h-5 text-emerald-100" />
                                </div>
                                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-stone-950 rounded-full animate-pulse" />
                            </div>
                            <div>
                                <div className="flex items-center gap-1.5">
                                    <h3 className="text-sm font-black text-white tracking-tight">Nexora AI Assistant</h3>
                                    <span className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold px-1.5 py-0.2 rounded-full uppercase">
                                        AI
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-[10px] text-stone-400 flex items-center gap-1">
                                        <Globe className="w-2.5 h-2.5 text-emerald-500" />
                                        {activeLanguage || "Multilingual"}
                                    </span>
                                    <span className="text-stone-700">•</span>
                                    <span className="text-[10px] text-emerald-400 font-medium">Local Qwen 2.5</span>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1 text-stone-400">
                            <button
                                onClick={clearHistory}
                                title="Reset conversation"
                                className="p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                title={isExpanded ? "Standard view" : "Expand window"}
                                className="hidden sm:block p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                            >
                                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={toggleChat}
                                title="Close chat"
                                className="p-1.5 hover:text-white hover:bg-stone-800 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Messages Body */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-medium bg-[#161514]">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex flex-col ${
                                    msg.role === "user" ? "items-end" : "items-start"
                                } animate-fade-in`}
                            >
                                <div
                                    className={`max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed ${
                                        msg.role === "user"
                                            ? "bg-emerald-700 text-white shadow-md shadow-emerald-950/20"
                                            : msg.isError
                                            ? "bg-red-950/40 border border-red-800/50 text-red-200"
                                            : "bg-stone-900 border border-stone-800 text-stone-200 shadow-sm"
                                    }`}
                                >
                                    <p className="whitespace-pre-wrap">{msg.content}</p>

                                    {/* Unauthenticated order prompt */}
                                    {msg.requiresAuth && (
                                        <div className="mt-2.5 pt-2 border-t border-stone-800/80 flex items-center gap-2">
                                            <Lock className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                                            <span className="text-[10px] text-stone-400">
                                                Please sign in via the top navbar to authenticate.
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* Order details card only when verified by order service */}
                                {msg.order && msg.order.orderId && msg.verifiedSource === "order_service" && (
                                    <div className="w-full mt-2">
                                        <OrderCardBubble order={msg.order} />
                                    </div>
                                )}

                                {/* Product cards carousel / grid only when verified by product service/database */}
                                {msg.products && msg.products.length > 0 && (msg.verifiedSource === "mongodb" || msg.verifiedSource === "product_service") && (
                                    <div className="w-full mt-2 space-y-2">
                                        {msg.products.map((p) => (
                                            <ProductCardBubble key={p.id} product={p} />
                                        ))}
                                    </div>
                                )}

                                <span className="text-[9px] text-stone-600 mt-1 px-1">
                                    {new Date(msg.timestamp).toLocaleTimeString([], {
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </span>
                            </div>
                        ))}

                        {/* Loading Typing Indicator */}
                        {isLoading && (
                            <div className="flex items-start gap-2 animate-pulse">
                                <div className="w-7 h-7 rounded-lg bg-emerald-900/40 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                                    <Sparkles className="w-3.5 h-3.5 animate-spin" />
                                </div>
                                <div className="bg-stone-900 border border-stone-800 rounded-2xl px-4 py-3 text-stone-400 text-xs flex items-center gap-1.5">
                                    <span>Consulting verified catalog</span>
                                    <span className="inline-flex gap-1 ml-1">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-0" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-150" />
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce delay-300" />
                                    </span>
                                </div>
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Replies Bar */}
                    {messages.length > 0 && messages[messages.length - 1]?.quickReplies?.length > 0 && !isLoading && (
                        <div className="px-3 py-2 bg-stone-950/50 border-t border-stone-800/50 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                            {messages[messages.length - 1].quickReplies.map((reply, i) => (
                                <button
                                    key={i}
                                    onClick={() => sendMessage(reply)}
                                    className="whitespace-nowrap bg-stone-900 hover:bg-emerald-900/30 hover:border-emerald-500/30 border border-stone-800 text-stone-300 hover:text-emerald-300 text-[11px] font-semibold px-3 py-1.5 rounded-full transition-all flex-shrink-0 active:scale-95"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Input Bar */}
                    <form
                        onSubmit={handleSend}
                        className="p-3 bg-stone-950 border-t border-stone-800 flex items-end gap-2"
                    >
                        <div className="flex-1 bg-stone-900/90 rounded-2xl border border-stone-800 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/10 transition-all flex items-center px-3.5 py-1.5">
                            <textarea
                                ref={textareaRef}
                                rows={1}
                                value={input}
                                maxLength={500}
                                onChange={handleTextareaChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask in English, বাংলা, Banglish, Italiano, हिन्दी..."
                                className="w-full bg-transparent text-xs text-white placeholder:text-stone-500 outline-none resize-none leading-relaxed py-1.5 max-h-28"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!input.trim() || isLoading}
                            className="w-10 h-10 rounded-2xl bg-linear-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-emerald-950/40 flex-shrink-0"
                            aria-label="Send message"
                        >
                            {isLoading ? (
                                <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Chat Trigger Button */}
            <button
                onClick={toggleChat}
                aria-label={isOpen ? "Close AI Concierge" : "Open AI Concierge"}
                className="group relative flex items-center gap-2.5 px-4 py-3.5 bg-linear-to-r from-stone-900 to-stone-950 hover:from-emerald-950 hover:to-stone-950 border border-emerald-500/30 text-white rounded-full shadow-2xl hover:shadow-emerald-900/30 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-xl"
            >
                <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-inner group-hover:rotate-12 transition-transform">
                        <MessageSquare className="w-4 h-4" />
                    </div>
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-stone-950 text-[10px] font-black rounded-full flex items-center justify-center">
                            {unreadCount}
                        </span>
                    )}
                </div>

                <div className="text-left hidden sm:block pr-1">
                    <p className="text-[11px] font-black tracking-wider uppercase text-emerald-400">
                       Nexora AI Assistant
                    </p>
                    <p className="text-[9px] font-semibold text-stone-400">
                        {isOpen ? "Click to minimize" : "Ask in any language"}
                    </p>
                </div>

                {/* Shimmer accent */}
                <div className="absolute inset-0 rounded-full border border-emerald-500/20 pointer-events-none" />
            </button>
        </div>
    );
}
