"use client";

import React from "react";
import { Settings, Shield, Bell, Eye } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="animate-fade-in">
            <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-10">Account Settings</h2>

            <div className="space-y-6">
                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-xl shadow-stone-200/20 flex items-center justify-between group hover:border-emerald-100 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                            <Shield className="text-emerald-600 w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-stone-900 uppercase text-xs tracking-widest">Security & Password</p>
                            <p className="text-stone-400 font-bold text-[10px] uppercase mt-1">Manage your security credentials</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-stone-50 text-stone-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all">Manage</button>
                </div>

                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-xl shadow-stone-200/20 flex items-center justify-between group hover:border-emerald-100 transition-all">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                            <Bell className="text-amber-600 w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-stone-900 uppercase text-xs tracking-widest">Notifications</p>
                            <p className="text-stone-400 font-bold text-[10px] uppercase mt-1">Control your email and SMS alerts</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-stone-50 text-stone-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-900 hover:text-white transition-all">Configure</button>
                </div>

                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-xl shadow-stone-200/20 flex items-center justify-between group hover:border-emerald-100 transition-all opacity-60">
                    <div className="flex items-center gap-6">
                        <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                            <Eye className="text-blue-600 w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-black text-stone-900 uppercase text-xs tracking-widest">Privacy Policy</p>
                            <p className="text-stone-400 font-bold text-[10px] uppercase mt-1">Review your data preferences</p>
                        </div>
                    </div>
                    <button className="px-6 py-3 bg-stone-50 text-stone-900 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-100 transition-all">View</button>
                </div>
            </div>
        </div>
    );
}
