"use client";

import React from "react";
import { Package, Truck, CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";

export default function OrderCardBubble({ order }) {
    if (!order) return null;

    const getStatusBadge = (status) => {
        switch (status) {
            case "Delivered":
            case "Completed":
                return {
                    bg: "bg-emerald-50 text-emerald-700 border-emerald-200",
                    icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                };
            case "Shipped":
                return {
                    bg: "bg-purple-50 text-purple-700 border-purple-200",
                    icon: <Truck className="w-3.5 h-3.5 text-purple-600" />
                };
            case "Processing":
                return {
                    bg: "bg-blue-50 text-blue-700 border-blue-200",
                    icon: <Clock className="w-3.5 h-3.5 text-blue-600" />
                };
            case "Cancelled":
                return {
                    bg: "bg-red-50 text-red-700 border-red-200",
                    icon: <XCircle className="w-3.5 h-3.5 text-red-600" />
                };
            case "Returned":
                return {
                    bg: "bg-amber-50 text-amber-700 border-amber-200",
                    icon: <RotateCcw className="w-3.5 h-3.5 text-amber-600" />
                };
            default:
                return {
                    bg: "bg-stone-50 text-stone-700 border-stone-200",
                    icon: <Clock className="w-3.5 h-3.5 text-stone-500" />
                };
        }
    };

    const badge = getStatusBadge(order.orderStatus);

    return (
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-4 my-2 max-w-sm w-full">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-2.5 mb-3">
                <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-stone-100 flex items-center justify-center">
                        <Package className="w-4 h-4 text-stone-700" />
                    </div>
                    <div>
                        <span className="text-[10px] uppercase font-bold text-stone-400 block tracking-wider">
                            Order ID
                        </span>
                        <span className="text-xs font-black text-stone-900">
                            #{order.orderId}
                        </span>
                    </div>
                </div>

                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold ${badge.bg}`}>
                    {badge.icon}
                    <span>{order.orderStatus}</span>
                </div>
            </div>

            {/* Content summary */}
            <div className="space-y-1.5 text-xs text-stone-600 mb-3">
                <div className="flex justify-between">
                    <span className="text-stone-400">Total Amount:</span>
                    <span className="font-bold text-stone-900">${order.finalAmount || order.totalAmount}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-stone-400">Shipping:</span>
                    <span className="font-medium text-stone-800">{order.shippingMethod} Delivery</span>
                </div>
                {order.shippingCity && (
                    <div className="flex justify-between">
                        <span className="text-stone-400">Destination:</span>
                        <span className="font-medium text-stone-800">{order.shippingCity}</span>
                    </div>
                )}
                <div className="flex justify-between">
                    <span className="text-stone-400">Tracking:</span>
                    <span className="font-mono text-[11px] text-emerald-700 font-semibold">{order.trackingNumber}</span>
                </div>
            </div>

            {/* Items preview */}
            {order.items && order.items.length > 0 && (
                <div className="border-t border-stone-100 pt-2.5 space-y-1.5">
                    <span className="text-[10px] uppercase font-bold text-stone-400 tracking-wider block">
                        Included Pieces ({order.itemCount || order.items.length})
                    </span>
                    {order.items.slice(0, 2).map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-[11px]">
                            <span className="text-stone-800 font-medium truncate max-w-[200px]">
                                {item.quantity}x {item.title}
                            </span>
                            <span className="text-stone-500 font-semibold">${item.totalPrice || item.unitPrice}</span>
                        </div>
                    ))}
                    {order.items.length > 2 && (
                        <span className="text-[10px] text-stone-400 italic block">
                            +{order.items.length - 2} more item(s)
                        </span>
                    )}
                </div>
            )}
        </div>
    );
}
