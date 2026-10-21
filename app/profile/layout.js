"use client";

import React from "react";
import Link from "next/link";
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
            <div className="min-h-screen bg-[#FDFCFB] pt-8 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-8 space-y-2">
                        <Skeleton className="h-4 w-32 rounded-md" />
                        <Skeleton className="h-8 w-64 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
                        <aside className="lg:col-span-4 xl:col-span-3">
                            <Skeleton className="h-80 w-full rounded-[32px]" />
                        </aside>
                        <main className="lg:col-span-8 xl:col-span-9 space-y-8">
                            <Skeleton className="h-44 w-full rounded-[32px]" />
                            <Skeleton className="h-96 w-full rounded-[36px]" />
                        </main>
                    </div>
                </div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-8 sm:pt-12 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Header Breadcrumb */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-xs font-black text-stone-400 uppercase tracking-widest mb-1.5">
                        <Link href="/" className="hover:text-emerald-700 transition-colors">Home</Link>
                        <span>/</span>
                        <span className="text-stone-700">Account</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-black text-stone-900 uppercase tracking-tight">Customer Portal</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
                    {/* Sidebar Area */}
                    <aside className="lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-28">
                            <ProfileSidebar />
                        </div>
                    </aside>

                    {/* Main Content Area */}
                    <main className="lg:col-span-8 xl:col-span-9 min-w-0">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
