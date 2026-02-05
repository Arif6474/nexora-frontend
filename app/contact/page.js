"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe, Sparkles, Loader2 } from "lucide-react";

const ContactPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
            setTimeout(() => setIsSubmitted(false), 5000);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB]">
            {/* Hero Section */}
            <div className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-transparent -z-10" />
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-6">
                        <Sparkles className="w-4 h-4 text-emerald-600" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700">We're here to help</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-stone-900 uppercase tracking-tight mb-6">
                        Contact <span className="text-emerald-700 italic">Us</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-stone-500 font-medium max-w-2xl mx-auto leading-relaxed">
                        Have a question about our collections or need assistance with an order? Our dedicated team is ready to provide you with a premium support experience.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-8 pb-32">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    {/* Contact Info Sidebar */}
                    <div className="lg:col-span-4 space-y-10">
                        <div className="space-y-8">
                            <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Reach <span className="text-emerald-700">Out</span></h2>

                            <div className="space-y-6">
                                {/* Card 1 */}
                                <div className="group bg-white p-6 rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/40 hover:border-emerald-100 transition-all hover:translate-y-[-4px]">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all">
                                            <Mail className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Email Support</p>
                                            <p className="text-sm font-black text-stone-900">hello@nexora.com</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 2 */}
                                <div className="group bg-white p-6 rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/40 hover:border-emerald-100 transition-all hover:translate-y-[-4px]">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center group-hover:bg-amber-500 group-hover:text-white transition-all">
                                            <Phone className="w-6 h-6 text-amber-600 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Call Us</p>
                                            <p className="text-sm font-black text-stone-900">+1 (234) 567-890</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Card 3 */}
                                <div className="group bg-white p-6 rounded-3xl border border-stone-100 shadow-xl shadow-stone-200/40 hover:border-emerald-100 transition-all hover:translate-y-[-4px]">
                                    <div className="flex items-center gap-5">
                                        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                                            <MapPin className="w-6 h-6 text-blue-600 group-hover:text-white" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-1">Visit Studio</p>
                                            <p className="text-sm font-black text-stone-900">123 Fashion Ave, NY 10001</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Extra Info */}
                        <div className="bg-stone-900 rounded-[40px] p-8 sm:p-10 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl" />
                            <h3 className="text-lg font-black uppercase tracking-tight mb-6">Business Hours</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                                    <span className="text-stone-400 text-sm font-medium">Monday - Friday</span>
                                    <span className="font-black text-xs uppercase tracking-widest">9AM - 8PM</span>
                                </div>
                                <div className="flex justify-between items-center pb-4 border-b border-stone-800">
                                    <span className="text-stone-400 text-sm font-medium">Saturday</span>
                                    <span className="font-black text-xs uppercase tracking-widest">10AM - 6PM</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-stone-400 text-sm font-medium">Sunday</span>
                                    <span className="font-black text-xs uppercase tracking-widest text-emerald-500">Global Concierge</span>
                                </div>
                            </div>
                            <div className="mt-10 pt-10 border-t border-stone-800 flex items-center gap-4">
                                <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-emerald-400" />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-500">Nexora Global Support</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-[48px] p-8 sm:p-12 md:p-16 border border-stone-100 shadow-2xl shadow-stone-200/60 relative overflow-hidden">
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 mb-10">
                                    <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                                        <MessageSquare className="w-6 h-6 text-stone-900" />
                                    </div>
                                    <h2 className="text-3xl font-black text-stone-900 uppercase tracking-tight">Send a <span className="text-emerald-700 italic">Message</span></h2>
                                </div>

                                {isSubmitted ? (
                                    <div className="py-20 text-center animate-fade-in">
                                        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner shadow-emerald-100">
                                            <Send className="w-10 h-10" />
                                        </div>
                                        <h3 className="text-2xl font-black text-stone-900 uppercase tracking-tight mb-3">Message Sent Successfully</h3>
                                        <p className="text-stone-500 font-medium mb-8">Thank you for reaching out. A premium consultant will review your inquiry and respond within 24 hours.</p>
                                        <button
                                            onClick={() => setIsSubmitted(false)}
                                            className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl active:scale-95"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Full Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                    placeholder="e.g. Alexander Vance"
                                                    className="w-full px-8 py-5 bg-stone-50/50 border border-stone-100 rounded-[24px] outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-medium text-stone-900"
                                                />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Email Address</label>
                                                <input
                                                    required
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                    placeholder="e.g. alex@vance.com"
                                                    className="w-full px-8 py-5 bg-stone-50/50 border border-stone-100 rounded-[24px] outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-medium text-stone-900"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Subject</label>
                                            <input
                                                required
                                                type="text"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                placeholder="How can we assist you today?"
                                                className="w-full px-8 py-5 bg-stone-50/50 border border-stone-100 rounded-[24px] outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-medium text-stone-900"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-stone-400 ml-2">Your Message</label>
                                            <textarea
                                                required
                                                rows="6"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us about your inquiry..."
                                                className="w-full px-8 py-5 bg-stone-50/50 border border-stone-100 rounded-[32px] outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 transition-all font-medium text-stone-900 resize-none"
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="w-full sm:w-auto px-12 py-6 bg-stone-900 text-white rounded-[24px] font-black shadow-2xl shadow-stone-200 uppercase tracking-[0.25em] text-xs hover:bg-emerald-700 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                                        >
                                            {isLoading ? (
                                                <><Loader2 className="w-5 h-5 animate-spin" /> Processing Inquiry...</>
                                            ) : (
                                                <><Send className="w-5 h-5" /> Dispatch Message</>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fade-in 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ContactPage;
