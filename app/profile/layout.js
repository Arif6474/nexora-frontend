"use client";

import React from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import Skeleton from "@/components/ui/Skeleton";

export default function ProfileLayout({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#FDFCFB] pt-12 pb-24 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <aside className="lg:col-span-3">
                            <div className="space-y-3">
                                <Skeleton className="h-4 w-28 rounded-md mb-4 ml-6" />
                                {[1, 2, 3].map((i) => (
                                    <Skeleton key={i} className="h-14 w-full rounded-2xl" />
                                ))}
                            </div>
                        </aside>
                        <main className="lg:col-span-9 space-y-8">
                            <div className="flex items-center gap-6">
                                <Skeleton className="w-32 h-32 rounded-[40px] flex-shrink-0" />
                                <div className="space-y-2 flex-1">
                                    <Skeleton className="h-8 w-48 rounded-xl" />
                                    <Skeleton className="h-4 w-36 rounded-md opacity-70" />
                                </div>
                            </div>
                            <Skeleton className="h-80 w-full rounded-[40px]" />
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

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
