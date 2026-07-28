import React from 'react';
import { 
  CheckCircle, 
  FileCheck, 
  Palette, 
  Truck, 
  Zap, 
  PlusCircle, 
  Receipt, 
  Send 
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const ActivityFeed = () => {
  const { setWalkInModalOpen, setQuickInvoiceModalOpen, setActiveTab } = useAdmin();

  const activities = [
    {
      id: 1,
      type: 'artwork',
      text: 'Pre-flight verified: CMYK & Bleed approved for PRT-98421 (Soft-Touch Cards)',
      time: '12 mins ago',
      icon: FileCheck,
      iconBg: 'bg-emerald-100 text-emerald-600',
    },
    {
      id: 2,
      type: 'express',
      text: 'Dunzo rider assigned to PRT-98422 (Zest Coffee Pouches)',
      time: '25 mins ago',
      icon: Zap,
      iconBg: 'bg-red-100 text-red-600',
    },
    {
      id: 3,
      type: 'proof',
      text: 'Digital proof uploaded to Cloudinary for DSGN-104 (Priya Nair)',
      time: '42 mins ago',
      icon: Palette,
      iconBg: 'bg-blue-100 text-blue-600',
    },
    {
      id: 4,
      type: 'dispatch',
      text: 'AWB BD-883920192 generated via BlueDart Air for PRT-98423',
      time: '1 hour ago',
      icon: Truck,
      iconBg: 'bg-sky-100 text-sky-600',
    },
    {
      id: 5,
      type: 'order',
      text: 'New Walk-in Order PRT-98426 created at counter (₹11,210)',
      time: '2 hours ago',
      icon: CheckCircle,
      iconBg: 'bg-purple-100 text-purple-600',
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Activity Feed */}
      <div className="lg:col-span-2 bg-white rounded-2xl p-5 border border-slate-200 shadow-xs">
        <h3 className="font-bold text-slate-900 text-sm mb-4">
          Live Operational Activity Feed
        </h3>

        <div className="space-y-4">
          {activities.map((act) => {
            const Icon = act.icon;
            return (
              <div key={act.id} className="flex items-start gap-3">
                <div className={`p-2 rounded-xl ${act.iconBg} shrink-0 mt-0.5`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-slate-800 leading-snug">
                    {act.text}
                  </p>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {act.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Action Shortcuts Panel */}
      <div className="bg-gradient-to-br from-blue-900 to-indigo-900 text-white rounded-2xl p-5 border border-blue-800 shadow-lg flex flex-col justify-between">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-sky-300">
            Rapid Dispatch Controls
          </span>
          <h3 className="font-extrabold text-lg text-white mt-1 mb-2">
            Admin Quick Actions
          </h3>
          <p className="text-xs text-blue-200 mb-6 leading-relaxed">
            Execute key operational tasks instantly without leaving the dashboard view.
          </p>
        </div>

        <div className="space-y-2.5">
          <button
            onClick={() => setWalkInModalOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/10"
          >
            <PlusCircle className="w-4 h-4 text-sky-300" />
            + New Counter Walk-In Order
          </button>

          <button
            onClick={() => setQuickInvoiceModalOpen(true)}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/10"
          >
            <Receipt className="w-4 h-4 text-amber-300" />
            Generate GST B2B Invoice
          </button>

          <button
            onClick={() => setActiveTab('design_desk')}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors border border-white/10"
          >
            <Send className="w-4 h-4 text-emerald-300" />
            Send WhatsApp Proof to Customer
          </button>
        </div>
      </div>

    </div>
  );
};
