"use client";

import React, { useState, useEffect } from "react";
import {
    Package,
    ChevronRight,
    CheckCircle2,
    Clock,
    Truck,
    XCircle,
    ShoppingBag,
    MapPin,
    Phone,
    Loader2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { GET_MY_ALL_ORDERS_API } from "@/utils/APIs";
import { toast } from "react-hot-toast";

export default function OrderHistory() {
    const router = useRouter();
    const [orderStatusFilter, setOrderStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    const orderStatuses = ["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned", "Completed"];

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user?.token) return;

            try {
                setLoading(true);
                const response = await fetch(GET_MY_ALL_ORDERS_API, {
                    headers: {
                        "Authorization": `Bearer ${user.token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrders(data.orders);
                } else {
                    toast.error("Failed to fetch order history");
                }
            } catch (error) {
                console.error("Fetch orders error:", error);
                toast.error("An error occurred while fetching orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Delivered":
            case "Completed": return "bg-emerald-100 text-emerald-700 border-emerald-200";
            case "Processing": return "bg-amber-100 text-amber-700 border-amber-200";
            case "Pending": return "bg-stone-100 text-stone-600 border-stone-200";
            case "Shipped": return "bg-blue-100 text-blue-700 border-blue-200";
            case "Cancelled":
            case "Returned": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-stone-100 text-stone-700 border-stone-200";
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Delivered":
            case "Completed": return <CheckCircle2 className="w-4 h-4" />;
            case "Processing": return <Clock className="w-4 h-4" />;
            case "Shipped": return <Truck className="w-4 h-4" />;
            case "Cancelled":
            case "Returned": return <XCircle className="w-4 h-4" />;
            default: return null;
        }
    };

    const filteredOrders = orderStatusFilter === "All"
        ? orders
        : orders.filter(order => order.orderStatus === orderStatusFilter);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                <Loader2 className="w-12 h-12 text-stone-300 animate-spin mb-4" />
                <p className="text-[10px] font-black uppercase tracking-widest text-stone-400">Loading Order History...</p>
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
                <h2 className="text-2xl font-black text-stone-900 uppercase tracking-tight">Order History</h2>
                <div className="flex gap-2 p-1.5 bg-stone-50 rounded-2xl border border-stone-100 overflow-x-auto no-scrollbar max-w-full">
                    {orderStatuses.map(status => (
                        <button
                            key={status}
                            onClick={() => setOrderStatusFilter(status)}
                            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${orderStatusFilter === status
                                ? "bg-white text-stone-900 shadow-sm ring-1 ring-stone-200/50"
                                : "text-stone-400 hover:text-stone-900"
                                }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {filteredOrders.length > 0 ? (
                <div className="space-y-6">
                    {filteredOrders.map((order) => (
                        <div key={order._id} className="bg-white rounded-[32px] border border-stone-100 shadow-xl shadow-stone-200/20 overflow-hidden group hover:border-emerald-100 transition-all flex flex-col">
                            <div className="p-6 sm:p-8 flex flex-wrap items-center justify-between gap-6 border-b border-stone-100/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-stone-50 rounded-2xl flex items-center justify-center">
                                        <ShoppingBag className="w-6 h-6 text-stone-900" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none mb-1">Order ID</p>
                                        <p className="text-sm font-black text-stone-900">{order.orderId}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none mb-1">Date</p>
                                        <p className="text-xs font-bold text-stone-600">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div>
                                        <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase leading-none mb-1">Total</p>
                                        <p className="text-sm font-black text-emerald-700">${order.totalAmount}</p>
                                    </div>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-[10px] font-black uppercase tracking-widest ${getStatusColor(order.orderStatus)}`}>
                                    {getStatusIcon(order.orderStatus)}
                                    {order.orderStatus}
                                </div>
                                <button
                                    onClick={() => setSelectedOrder(order)}
                                    className="p-2 rounded-xl hover:bg-stone-50 text-stone-300 hover:text-stone-900 transition-all active:scale-95"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                            <div className="p-6 sm:p-8 bg-stone-50/30 flex gap-4 overflow-x-auto no-scrollbar">
                                {order.products.map((item, idx) => (
                                    <div key={idx} className="shrink-0 w-16 h-16 rounded-xl overflow-hidden border border-white shadow-sm ring-1 ring-stone-100 bg-white">
                                        <img
                                            src={process.env.NEXT_PUBLIC_SPACES_URL + item.product?.image}
                                            alt={item.product?.title}
                                            className="w-full h-full object-cover"
                                            onError={(e) => e.target.src = '/placeholder-product.png'}
                                        />
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
                    <p className="text-stone-400 font-bold text-sm max-w-xs mb-8">You haven't placed any orders with this status yet.</p>
                    <button
                        onClick={() => router.push('/shop')}
                        className="px-8 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-emerald-700 transition-all shadow-xl shadow-stone-200 active:scale-95"
                    >
                        Continue Shopping
                    </button>
                </div>
            )}

            {selectedOrder && (
                <div className="fixed inset-0 z-999999 flex items-center justify-center p-4 sm:p-6 w-full">
                    <div
                        className="absolute inset-0 bg-stone-900/60 backdrop-blur-xl animate-fade-in"
                        onClick={() => setSelectedOrder(null)}
                    />
                    <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#FDFCFB] rounded-[48px] shadow-[0_40px_100px_rgba(0,0,0,0.3)] border border-white overflow-hidden flex flex-col animate-scale-in">
                        {/* Detail Header */}
                        <div className="p-8 sm:p-10 border-b border-stone-100 flex items-center justify-between bg-white text-stone-900">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center">
                                    <ShoppingBag className="w-7 h-7 text-emerald-700" />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-[10px] font-black text-stone-400 uppercase tracking-widest leading-none">Viewing Order Details</h3>
                                    <p className="text-2xl font-black text-stone-900 uppercase tracking-tight">{selectedOrder.orderId}</p>
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
                                        <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6 text-stone-900">Delivery Information</h4>
                                        <div className="space-y-4">
                                            <div className="flex gap-4">
                                                <MapPin className="w-5 h-5 text-emerald-600 shrink-0" />
                                                <div className="space-y-1">
                                                    <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">Shipping Address</p>
                                                    <p className="text-sm font-bold text-stone-800 leading-relaxed text-stone-900">{selectedOrder.shippingDetails?.address || "N/A"}</p>
                                                    <p className="text-sm font-bold text-stone-800 leading-relaxed text-stone-900">{selectedOrder.shippingDetails?.city}, {selectedOrder.shippingDetails?.zipCode}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-4">
                                                <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                                                <div className="space-y-1">
                                                    <p className="text-[11px] font-black text-stone-400 uppercase tracking-widest">Contact Phone</p>
                                                    <p className="text-sm font-bold text-stone-800 text-stone-900">{selectedOrder.shippingDetails?.phone || "N/A"}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm">
                                        <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6 text-stone-900">Payment Summary</h4>
                                        <div className="space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-stone-400 font-bold uppercase tracking-tight">Status</span>
                                                <span className="text-stone-900 font-black">{selectedOrder.paymentStatus}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-stone-400 font-bold uppercase tracking-tight">Method</span>
                                                <span className="text-stone-900 font-black uppercase">{selectedOrder.paymentMethod}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-stone-400 font-bold uppercase tracking-tight">Discount</span>
                                                <span className="text-red-500 font-black">-${selectedOrder.discount || 0}</span>
                                            </div>
                                            <div className="pt-4 border-t border-dashed border-stone-100 flex justify-between">
                                                <span className="text-[10px] font-black text-stone-900 uppercase tracking-widest">Grand Total</span>
                                                <span className="text-xl font-black text-emerald-700">${selectedOrder.totalAmount}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Items List */}
                                <div className="bg-white rounded-[32px] p-8 border border-stone-100 shadow-sm h-fit">
                                    <h4 className="text-[10px] font-black text-stone-400 uppercase tracking-widest mb-6 text-stone-900">Ordered Items ({selectedOrder.products.length})</h4>
                                    <div className="space-y-6">
                                        {selectedOrder.products.map((item, idx) => (
                                            <div key={idx} className="flex gap-4 items-center group">
                                                <div className="w-16 h-16 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100 shrink-0 group-hover:scale-105 transition-all">
                                                    <img src={process.env.NEXT_PUBLIC_SPACES_URL + item.product?.image} alt={item.product?.title} className="w-full h-full object-cover" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-[10px] font-black text-stone-500 uppercase tracking-widest mb-0.5">{item.color} / {item.size}</p>
                                                    <p className="text-sm font-black text-stone-900 uppercase truncate mb-1">{item.product?.title}</p>
                                                    <div className="flex items-center gap-3">
                                                        <p className="text-xs font-bold text-stone-400">Qty: {item.quantity}</p>
                                                        <div className="w-1 h-1 rounded-full bg-stone-200" />
                                                        <p className="text-sm font-black text-emerald-700">${item.unitPrice}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className={`mt-10 p-5 rounded-2xl border-2 flex items-center gap-4 ${getStatusColor(selectedOrder.orderStatus)}`}>
                                        <div className="w-10 h-10 bg-white/40 rounded-xl flex items-center justify-center">
                                            {getStatusIcon(selectedOrder.orderStatus)}
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Current Status</p>
                                            <p className="text-sm font-black uppercase tracking-tight">{selectedOrder.orderStatus}</p>
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
}
