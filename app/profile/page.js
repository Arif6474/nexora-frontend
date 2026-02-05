"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
    User,
    Package,
    Settings,
    ChevronRight,
    MapPin,
    Phone,
    Mail,
    Calendar,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    Camera,
    Save,
    ShoppingBag
} from "lucide-react";
import { mockOrders } from "./ordersData";
import { useRouter, useSearchParams } from "next/navigation";

const ProfilePage = () => {
    const { user, updateProfile, logout, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeTab, setActiveTab] = useState(searchParams.get("tab") || "info");
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    const [orderStatusFilter, setOrderStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const orderStatuses = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

    useEffect(() => {
        if (!loading && !user) {
            router.push("/");
        }
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || ""
            });
        }
    }, [user, loading, router]);

    if (loading || !user) return null;

    const handleSave = () => {
        updateProfile(formData);
        setIsEditing(false);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Processing": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Shipped": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Cancelled": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-stone-100 text-stone-700 border-stone-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Delivered": return <CheckCircle2 className="w-4 h-4" />;
            case "Processing": return <Clock className="w-4 h-4" />;
            case "Shipped": return <Truck className="w-4 h-4" />;
            case "Cancelled": return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const filteredOrders = orderStatusFilter === "All"
        ? mockOrders
        : mockOrders.filter(order => order.status === orderStatusFilter);

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-12 pb-24 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Profile Header */}
                <div className="relative mb-12 animate-fade-in">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/5 to-amber-600/5 blur-3xl -z-10" />
                    <div className="bg-white/60 backdrop-blur-2xl rounded-[48px] p-8 sm:p-12 border border-white shadow-[0_32px_80px_-20px_rgba(0,0,0,0.08)] flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        <div className="relative group">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-[40px] overflow-hidden border-4 border-white shadow-2xl">
                                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            </div>
                            <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-white rounded-2xl flex items-center justify-center text-stone-500 hover:text-emerald-600 shadow-xl border border-stone-100 transition-all hover:scale-110 active:scale-95">
                                <Camera className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl sm:text-4xl font-black text-stone-900 uppercase tracking-tight mb-2">{user.name}</h1>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-stone-500 text-sm font-bold">
                                <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-emerald-600" />
                                    {user.email}
                                </div>
                                <div className="w-1.5 h-1.5 rounded-full bg-stone-200 hidden sm:block" />
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-amber-600" />
                                    Member since Feb 2024
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={logout}
                                className="px-6 py-3 bg-stone-100 text-stone-600 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-red-50 hover:text-red-500 transition-all active:scale-95"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs & Content */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar Tabs */}
                    <div className="lg:col-span-3 space-y-2">
                        <button
                            onClick={() => setActiveTab("info")}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] ${activeTab === "info" ? "bg-stone-900 text-white shadow-xl shadow-stone-900/20" : "text-stone-400 hover:bg-white hover:text-stone-900"}`}
                        >
                            <User className="w-4 h-4" />
                            Profile Info
                        </button>
                        <button
                            onClick={() => setActiveTab("orders")}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] ${activeTab === "orders" ? "bg-stone-900 text-white shadow-xl shadow-stone-900/20" : "text-stone-400 hover:bg-white hover:text-stone-900"}`}
                        >
                            <Package className="w-4 h-4" />
                            My Orders
                        </button>
                        <button
                            className="w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all font-black text-[10px] uppercase tracking-[0.2em] text-stone-400 hover:bg-white hover:text-stone-900"
                        >
                            <Settings className="w-4 h-4" />
                            Settings
                        </button>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-9 animate-fade-in-up">
                        {activeTab === "info" ? (
                            <div className="bg-white rounded-[40px] p-8 sm:p-12 border border-stone-100 shadow-xl shadow-stone-200/40">
                                <div className="flex items-center justify-between mb-12">
                                    <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Personal Information</h2>
                                    <button
                                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${isEditing ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20" : "bg-stone-50 text-stone-900 hover:bg-stone-100"}`}
                                    >
                                        {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : "Edit Profile"}
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Name Field */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-4 p-5 bg-stone-50/50 rounded-2xl">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                    <User className="w-5 h-5 text-emerald-600" />
                                                </div>
                                                <span className="font-bold text-stone-800">{user.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Email Field */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Email Address</label>
                                        <div className="flex items-center gap-4 p-5 bg-stone-50/50 rounded-2xl opacity-60">
                                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                <Mail className="w-5 h-5 text-amber-600" />
                                            </div>
                                            <span className="font-bold text-stone-800">{user.email}</span>
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="space-y-3">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Phone Number</label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-4 p-5 bg-stone-50/50 rounded-2xl">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                                    <Phone className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <span className="font-bold text-stone-800">{user.phone || "Not set"}</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Address Field */}
                                    <div className="space-y-3 md:col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-stone-400">Delivery Address</label>
                                        {isEditing ? (
                                            <textarea
                                                rows="3"
                                                value={formData.address}
                                                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                                className="w-full px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-600 outline-none transition-all font-medium resize-none"
                                            />
                                        ) : (
                                            <div className="flex items-center gap-4 p-5 bg-stone-50/50 rounded-2xl">
                                                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                                                    <MapPin className="w-5 h-5 text-rose-600" />
                                                </div>
                                                <span className="font-bold text-stone-800">{user.address || "Not set"}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Order History</h2>
                                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0">
                                        {orderStatuses.map(status => (
                                            <button
                                                key={status}
                                                onClick={() => setOrderStatusFilter(status)}
                                                className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${orderStatusFilter === status ? "bg-stone-900 text-white shadow-lg shadow-stone-900/20" : "bg-stone-50 text-stone-400 hover:text-stone-900 hover:bg-stone-100"}`}
                                            >
                                                {status}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {filteredOrders.length > 0 ? (
                                    <div className="space-y-6">
                                        {filteredOrders.map((order) => (
                                            <div key={order.id} className="bg-white rounded-[32px] border border-stone-100 shadow-xl shadow-stone-200/20 overflow-hidden group hover:border-emerald-100 transition-all flex flex-col">
                                                <div className="p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 border-b border-stone-50">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                                                            <ShoppingBag className="w-6 h-6 text-stone-900" />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none mb-1">Order ID</p>
                                                            <p className="text-sm font-black text-stone-900">{order.id}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none mb-1">Date</p>
                                                            <p className="text-xs font-bold text-stone-600">{order.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <div>
                                                            <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none mb-1">Total</p>
                                                            <p className="text-sm font-black text-emerald-700">${order.total}</p>
                                                        </div>
                                                    </div>
                                                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.status)}`}>
                                                        {getStatusIcon(order.status)}
                                                        {order.status}
                                                    </div>
                                                    <button
                                                        onClick={() => setSelectedOrder(order)}
                                                        className="p-2 rounded-full hover:bg-stone-50 text-stone-300 hover:text-stone-900 transition-all active:scale-95"
                                                    >
                                                        <ChevronRight className="w-6 h-6" />
                                                    </button>
                                                </div>
                                                <div className="p-6 sm:p-8 bg-stone-50/30 flex gap-4 overflow-x-auto no-scrollbar">
                                                    {order.items.map((item, idx) => (
                                                        <div key={idx} className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white shadow-sm ring-1 ring-stone-100">
                                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-[40px] p-20 border border-dashed border-stone-200 text-center flex flex-col items-center justify-center">
                                        <div className="w-20 h-20 bg-stone-50 rounded-[32px] flex items-center justify-center mb-6">
                                            <Package className="w-10 h-10 text-stone-300" />
                                        </div>
                                        <h3 className="text-xl font-black text-stone-900 uppercase tracking-tight mb-2">No {orderStatusFilter !== 'All' ? orderStatusFilter : ''} Orders</h3>
                                        <p className="text-stone-400 font-bold text-sm max-w-xs mb-8">You haven't placed any orders with this status yet. Start your premium journey today.</p>
                                        <button
                                            onClick={() => router.push('/shop')}
                                            className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-stone-200 active:scale-95"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Order Detail View Overlay */}
            {selectedOrder && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xl animate-fade-in"
                        onClick={() => setSelectedOrder(null)}
                    />
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FDFCFB] rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white overflow-hidden flex flex-col animate-scale-in">
                        {/* Detail Header */}
                        <div className="p-8 sm:p-10 border-b border-stone-100 flex items-center justify-between bg-white">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <ShoppingBag className="w-7 h-7 text-emerald-700" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">Viewing Order Details</h3>
                                    <p className="text-2xl font-black text-stone-900 uppercase tracking-tight">{selectedOrder.id}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="p-3 bg-stone-50 rounded-2xl text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-all active:scale-90"
                            >
                                <XCircle className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Detail Content */}
                        <div className="flex-1 overflow-y-auto p-8 sm:p-10 no-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Order Summary */}
                                <div className="space-y-8">
                                    <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm">
                                        <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Delivery Information</h4>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                                                <div className="space-y-1">
                                                    <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">Shipping Address</p>
                                                    <p className="text-sm font-bold text-stone-800 leading-relaxed">{user.address || "123 Professional St, Elite District, CT 06831"}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                                                <div className="space-y-1">
                                                    <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">Contact Phone</p>
                                                    <p className="text-sm font-bold text-stone-800">{user.phone || "+1 (555) 000-0000"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm">
                                        <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Payment Summary</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-stone-400 font-bold uppercase tracking-tight">Subtotal</span>
                                                <span className="text-stone-900 font-black">${selectedOrder.total - 15}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-stone-400 font-bold uppercase tracking-tight">Shipping</span>
                                                <span className="text-emerald-600 font-black">FREE</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-stone-400 font-bold uppercase tracking-tight">Tax</span>
                                                <span className="text-stone-900 font-black">$15.00</span>
                                            </div>
                                            <div className="pt-4 border-t border-dashed border-stone-100 flex justify-between">
                                                <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Grand Total</span>
                                                <span className="text-xl font-black text-emerald-700">${selectedOrder.total}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm h-fit">
                                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6">Ordered Items ({selectedOrder.items.length})</h4>
                                    <div className="space-y-6">
                                        {selectedOrder.items.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center group">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0 group-hover:scale-105 transition-all">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-0.5">Premium Quality</p>
                                                    <p className="text-sm font-black text-stone-900 uppercase truncate mb-1">{item.name}</p>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-xs font-bold text-stone-400">Qty: {item.quantity}</p>
                                                        <div className="w-1 h-1 rounded-full bg-stone-200" />
                                                        <p className="text-sm font-black text-emerald-700">${item.price}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={`mt-10 p-5 rounded-2xl border-2 flex items-center gap-4 ${getStatusColor(selectedOrder.status)}`}>
                                        <div className="w-10 h-10 bg-white/40 rounded-xl flex items-center justify-center">
                                            {getStatusIcon(selectedOrder.status)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Current Status</p>
                                            <p className="text-sm font-black uppercase tracking-tight">{selectedOrder.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detail Footer */}
                        <div className="p-8 bg-stone-50/50 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                            <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest text-center sm:text-left">Need assistance with this order? <button className="text-emerald-700 hover:underline">Contact Support</button></p>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="w-full sm:w-auto px-10 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-stone-200"
                            >
                                Back to History
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                @keyframes scale-in {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-scale-in {
                    animation: scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out forwards;
                }
                @keyframes fade-in {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ProfilePage;
