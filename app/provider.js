"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";


export const RootProviders = ({ children }) => {
  return (
    <SessionProvider>
      <AuthProvider>
        {children}
        <Toaster position="bottom-right" />
      </AuthProvider>
    </SessionProvider>
  );
};
