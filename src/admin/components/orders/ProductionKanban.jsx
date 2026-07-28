import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Zap, 
  Clock, 
  Truck, 
  CheckCircle, 
  FileCheck, 
  ChevronRight, 
  ChevronLeft,
  MessageSquare
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const ProductionKanban = () => {
  const { 
    orders, 
    updateOrderStatus, 
    setSelectedOrder, 
    setPreflightModalOpen 
  } = useAdmin();

  const stages = [
    { name: 'Payment Confirmed', color: 'border-slate-300 bg-slate-100/50 text-slate-700' },
    { name: 'Artwork Verification', color: 'border-amber-300 bg-amber-50 text-amber-800' },
    { name: 'In Production', color: 'border-blue-300 bg-blue-50 text-blue-800' },
    { name: 'Quality Check', color: 'border-purple-300 bg-purple-50 text-purple-800' },
    { name: 'Packed & Ready', color: 'border-indigo-300 bg-indigo-50 text-indigo-800' },
    { name: 'Dispatched', color: 'border-sky-300 bg-sky-50 text-sky-800' },
    { name: 'Delivered', color: 'border-emerald-300 bg-emerald-50 text-emerald-800' },
  ];

  // Drag and Drop simulation handlers
  const handleDragStart = (e, orderId) => {
    e.dataTransfer.setData('text/plain', orderId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetStage) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('text/plain');
    if (orderId) {
      updateOrderStatus(orderId, targetStage);
    }
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2 custom-scrollbar min-h-[680px]">
      {stages.map((stage) => {
        const stageOrders = orders.filter(o => o.status === stage.name);
        return (
          <div
            key={stage.name}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.name)}
            className="w-80 shrink-0 bg-slate-100/70 rounded-2xl border border-slate-200 p-3 flex flex-col h-full"
          >
            {/* Stage Header */}
            <div className={`p-3 rounded-xl border font-bold text-xs flex items-center justify-between mb-3 shadow-2xs ${stage.color}`}>
              <span className="truncate">{stage.name}</span>
              <span className="px-2 py-0.5 rounded-full bg-white text-slate-800 font-extrabold text-[11px] border border-slate-200">
                {stageOrders.length}
              </span>
            </div>

            {/* Kanban Stage Cards Column */}
            <div className="flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar min-h-[400px]">
              {stageOrders.map((order) => (
                <div
                  key={order.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, order.id)}
                  className="bg-white rounded-xl p-3.5 border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-grab active:cursor-grabbing hover:border-blue-300 space-y-2.5 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-xs text-slate-900">{order.id}</span>
                    {order.isExpress && (
                      <span className="px-1.5 py-0.5 rounded bg-red-100 text-red-700 font-extrabold text-[10px] flex items-center gap-0.5">
                        <Zap className="w-3 h-3 fill-red-600 animate-pulse" /> Express
                      </span>
                    )}
                  </div>

                  <div className="text-xs">
                    <p className="font-bold text-slate-800 truncate">{order.customer.name}</p>
                    <p className="text-slate-500 text-[11px] truncate">{order.customer.company || 'Retail Order'}</p>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-2 text-[11px] border border-slate-100 space-y-1">
                    <p className="font-semibold text-slate-700 truncate">
                      {order.items[0]?.productName}
                    </p>
                    <div className="flex items-center justify-between text-slate-500 text-[10px]">
                      <span>Qty: {order.items[0]?.quantity}</span>
                      <span className="font-bold text-slate-900">₹{order.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Artwork File Indicator */}
                  {order.artworkFile && (
                    <div className="flex items-center justify-between text-[10px] text-slate-500 bg-blue-50/50 px-2 py-1 rounded border border-blue-100">
                      <span className="truncate max-w-[150px] font-mono">{order.artworkFile.fileName}</span>
                      <span className="px-1 bg-blue-100 text-blue-700 rounded uppercase font-bold text-[9px]">
                        {order.artworkFile.fileType}
                      </span>
                    </div>
                  )}

                  {/* Stage Action Controls */}
                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setPreflightModalOpen(true);
                      }}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" /> Inspect
                    </button>

                    <div className="flex items-center gap-1">
                      {/* Move Next Button */}
                      {stages.findIndex(s => s.name === stage.name) < stages.length - 1 && (
                        <button
                          onClick={() => {
                            const nextIdx = stages.findIndex(s => s.name === stage.name) + 1;
                            updateOrderStatus(order.id, stages[nextIdx].name);
                          }}
                          className="p-1 rounded hover:bg-slate-100 text-slate-500 hover:text-blue-600"
                          title="Advance to Next Stage"
                        >
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              ))}

              {stageOrders.length === 0 && (
                <div className="py-12 text-center text-xs text-slate-400 font-medium border-2 border-dashed border-slate-200 rounded-xl">
                  Drop orders here
                </div>
              )}
            </div>

          </div>
        );
      })}
    </div>
  );
};
