import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Kanban, 
  Palette, 
  Package, 
  Calculator, 
  Image as ImageIcon, 
  Users, 
  Truck, 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  Printer, 
  UserCheck,
  ArrowLeftRight,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const AdminSidebar = ({ onSwitchToWebsite, isMobileOpen, onCloseMobileSidebar }) => {
  const { 
    activeTab, 
    setActiveTab, 
    sidebarCollapsed, 
    setSidebarCollapsed,
    userRole,
    setUserRole,
    expressOrdersCount,
    pendingArtworkCount
  } = useAdmin();

  const navItems = [
    {
      group: "Operations",
      items: [
        { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
        { 
          id: 'orders', 
          label: 'Production Pipeline', 
          icon: Kanban, 
          badge: expressOrdersCount > 0 ? `${expressOrdersCount} Express` : null,
          badgeColor: 'bg-red-500 text-white animate-pulse'
        },
        { 
          id: 'design_desk', 
          label: 'Custom Design Desk', 
          icon: Palette, 
          badge: pendingArtworkCount > 0 ? `${pendingArtworkCount} Pending` : null,
          badgeColor: 'bg-amber-500 text-white'
        },
      ]
    },
    {
      group: "Catalog & Pricing",
      items: [
        { id: 'catalog', label: 'Product Catalog', icon: Package },
        { id: 'pricing', label: 'Pricing & GST Engine', icon: Calculator },
        { id: 'cloudinary', label: 'Cloudinary Asset Hub', icon: ImageIcon },
      ]
    },
    {
      group: "Management",
      items: [
        { id: 'crm', label: 'Customer Directory', icon: Users },
        { id: 'logistics', label: 'Dispatch & Logistics', icon: Truck },
        { id: 'rbac', label: 'RBAC & Security', icon: ShieldCheck },
      ]
    }
  ];

  const handleSelectTab = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobileSidebar) onCloseMobileSidebar();
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-slate-100 border-r border-slate-800 select-none shadow-2xl">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
            <Printer className="w-5 h-5" />
          </div>
          {(!sidebarCollapsed || isMobileOpen) && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-200 to-sky-300 bg-clip-text text-transparent">
                PRINTIGLY
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-sky-400">
                Backoffice Ops v2.4
              </span>
            </div>
          )}
        </div>

        {/* Desktop Collapse Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="hidden lg:flex p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          title={sidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        {/* Mobile Close Button */}
        {isMobileOpen && (
          <button
            onClick={onCloseMobileSidebar}
            className="lg:hidden p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Role Indicator Banner */}
      {(!sidebarCollapsed || isMobileOpen) && (
        <div className="px-4 py-2 bg-slate-800/50 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 shrink-0">
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-medium text-slate-300 text-[11px]">Role:</span>
          </div>
          <select 
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded px-2 py-0.5 text-[11px] text-sky-400 font-bold focus:outline-none focus:border-sky-500 cursor-pointer"
          >
            <option value="Super Admin">Super Admin</option>
            <option value="Production Manager">Production Mgr</option>
            <option value="In-House Designer">Designer</option>
          </select>
        </div>
      )}

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 custom-scrollbar">
        {navItems.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {(!sidebarCollapsed || isMobileOpen) && (
              <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                {group.group}
              </h3>
            )}
            {group.items.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelectTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all group relative cursor-pointer ${
                    isActive 
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/70'
                  }`}
                  title={sidebarCollapsed && !isMobileOpen ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-sky-400'}`} />
                  
                  {(!sidebarCollapsed || isMobileOpen) && (
                    <span className="truncate flex-1 text-left">{item.label}</span>
                  )}

                  {item.badge && (
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold shadow-sm ${item.badgeColor} ${sidebarCollapsed && !isMobileOpen ? 'absolute -top-1 -right-1 px-1' : ''}`}>
                      {sidebarCollapsed && !isMobileOpen ? '!' : item.badge}
                    </span>
                  )}

                  {/* Active Indicator Line */}
                  {isActive && (
                    <div className="absolute right-0 top-2 bottom-2 w-1 bg-sky-300 rounded-l" />
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Bottom Storefront Switcher */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-950/40 space-y-2 shrink-0">
        <button
          onClick={() => {
            if (onCloseMobileSidebar) onCloseMobileSidebar();
            onSwitchToWebsite();
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-sky-400 transition-colors border border-slate-700/60 cursor-pointer"
        >
          <ArrowLeftRight className="w-3.5 h-3.5" />
          {(!sidebarCollapsed || isMobileOpen) && <span>Customer Website</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <motion.aside
        animate={{ width: sidebarCollapsed ? 76 : 260 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden lg:block relative h-screen z-30 shrink-0"
      >
        {sidebarContent}
      </motion.aside>

      {/* Mobile Drawer Overlay Sidebar */}
      <AnimatePresence>
        {isMobileOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onCloseMobileSidebar}
              className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="relative w-72 max-w-[85vw] h-full z-10"
            >
              {sidebarContent}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
