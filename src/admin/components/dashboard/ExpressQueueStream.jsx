import React, { useState, useEffect } from 'react';
import { Zap, Clock, Truck, Eye, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const ExpressQueueStream = () => {
  const { orders, setSelectedOrder, setPreflightModalOpen, setActiveTab, updateOrderStatus } = useAdmin();

  const expressOrders = orders.filter(o => o.isExpress && o.status !== "Delivered");

  // Timer helper calculation
  const calculateTimeLeft = (deadlineStr) => {
    if (!deadlineStr) return "1h 45m";
    const diff = new Date(deadlineStr) - new Date();
    if (diff <= 0) return "EXPIRED";
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${mins}m remaining`;
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-2xl p-5 border border-slate-800 shadow-xl relative overflow-hidden">
      
      {/* Background Subtle Pulsing Glow */}
      <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 border border-red-500/30">
            <Zap className="w-4 h-4 fill-red-500 animate-pulse" />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-100 flex items-center gap-2">
              Express Same-Day Priority Stream
            </h3>
            <p className="text-xs text-slate-400">Orders requiring local dispatch before 12:00 PM cutoff</p>
          </div>
        </div>

        <button 
          onClick={() => setActiveTab('orders')}
          className="text-xs text-sky-400 hover:text-sky-300 font-semibold flex items-center gap-1"
        >
          View Pipeline <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {expressOrders.map((order) => (
          <div 
            key={order.id}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 rounded-xl p-4 transition-all relative group shadow-md"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-extrabold text-sm text-slate-100 tracking-tight">{order.id}</span>
              <span className="px-2 py-0.5 rounded-full bg-red-950/80 text-red-400 border border-red-800 text-[10px] font-bold flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-500" />
                {calculateTimeLeft(order.expressDeadline)}
              </span>
            </div>

            <div className="text-xs space-y-1 mb-3">
              <p className="font-bold text-slate-200">{order.customer.name} ({order.customer.company})</p>
              <p className="text-slate-400 text-[11px] truncate">
                {order.items.map(i => i.productName).join(', ')}
              </p>
              <div className="flex items-center gap-1 text-sky-400 text-[11px] font-medium pt-1">
                <Truck className="w-3 h-3 shrink-0" />
                <span>{order.deliveryMethod}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-700/60 flex items-center justify-between text-xs">
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-900 text-amber-400 border border-amber-500/30">
                {order.status}
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setSelectedOrder(order);
                    setPreflightModalOpen(true);
                  }}
                  className="p-1.5 rounded-lg bg-slate-700 text-slate-300 hover:text-white hover:bg-blue-600 transition-colors"
                  title="Inspect Artwork File"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => updateOrderStatus(order.id, 'Packed & Ready')}
                  className="p-1.5 rounded-lg bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white transition-colors"
                  title="Mark Packed & Ready for Porter"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
