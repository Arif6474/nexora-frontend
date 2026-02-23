"use client";

import React from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfileLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading || !user) return null;

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-12 pb-24 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar Area */}
                    <aside className="lg:col-span-3">
                        <div className="sticky top-28">
                            <ProfileSidebar />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-9">
                        {children}
                    </main>
                </div>
            </div>


        </div>
    );
}
