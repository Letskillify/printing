import React, { useState } from 'react';
import { Kanban, Table, Plus, RefreshCw } from 'lucide-react';
import { ProductionKanban } from './ProductionKanban';
import { OrdersDataTable } from './OrdersDataTable';
import { PreflightFileInspector } from './PreflightFileInspector';
import { useAdmin } from '../../context/AdminContext';

export const OrderPipelineHub = () => {
  const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'table'
  const { setWalkInModalOpen } = useAdmin();

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
            Order & Production Pipeline Hub
          </h2>
          <p className="text-xs text-slate-500">
            Real-time multi-stage Kanban workflow and detailed order inspector
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* View Mode Switcher */}
          <div className="bg-slate-100 p-1 rounded-xl flex items-center gap-1 border border-slate-200 text-xs">
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'kanban' 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Kanban className="w-3.5 h-3.5" /> Kanban Board
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'table' 
                  ? 'bg-white text-blue-600 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5" /> Data Table
            </button>
          </div>

          <button
            onClick={() => setWalkInModalOpen(true)}
            className="px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" /> + Walk-in Order
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {viewMode === 'kanban' ? <ProductionKanban /> : <OrdersDataTable />}

      {/* Preflight Modal */}
      <PreflightFileInspector />
    </div>
  );
};
