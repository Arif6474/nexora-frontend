"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { ChatbotProvider } from "@/context/ChatbotContext";
import { Toaster } from "react-hot-toast";


export const RootProviders = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProvider>
        <ChatbotProvider>
          {children}
          <Toaster position="bottom-right" />
        </ChatbotProvider>
      </AuthProvider>
    </SessionProvider>
  );
};
