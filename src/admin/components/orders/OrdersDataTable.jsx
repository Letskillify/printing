import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Zap, 
  Truck, 
  FileText, 
  Phone, 
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const OrdersDataTable = () => {
  const { orders, setSelectedOrder, setPreflightModalOpen, updateOrderStatus } = useAdmin();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [expressOnly, setExpressOnly] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Multi-column filtering
  const filteredOrders = orders.filter((o) => {
    const matchesSearch = 
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer.phone.includes(searchTerm) ||
      o.customer.company?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || o.status === statusFilter;
    const matchesExpress = !expressOnly || o.isExpress;

    return matchesSearch && matchesStatus && matchesExpress;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage) || 1;
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const exportToCSV = () => {
    const headers = ["Order ID", "Customer", "Company", "Phone", "Status", "Delivery", "Total (INR)", "Created At"];
    const rows = filteredOrders.map(o => [
      o.id,
      `"${o.customer.name}"`,
      `"${o.customer.company || ''}"`,
      o.customer.phone,
      o.status,
      `"${o.deliveryMethod}"`,
      o.totalAmount,
      o.createdAt
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Printigly_Orders_Export_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      
      {/* Filtering Bar */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/60 flex flex-wrap items-center justify-between gap-3">
        
        {/* Search Field */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search Order ID, Phone, Customer or Company..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-500 shadow-2xs"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-500" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 shadow-2xs"
          >
            <option value="ALL">All Production Stages</option>
            <option value="Payment Confirmed">Payment Confirmed</option>
            <option value="Artwork Verification">Artwork Verification</option>
            <option value="In Production">In Production</option>
            <option value="Quality Check">Quality Check</option>
            <option value="Packed & Ready">Packed & Ready</option>
            <option value="Dispatched">Dispatched</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        {/* Express Toggle */}
        <button
          onClick={() => setExpressOnly(!expressOnly)}
          className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1.5 ${
            expressOnly 
              ? 'bg-red-600 text-white border-red-600 shadow-xs' 
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Zap className="w-3.5 h-3.5 fill-current" /> Express Only
        </button>

        {/* CSV Export Button */}
        <button
          onClick={exportToCSV}
          className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
        >
          <Download className="w-3.5 h-3.5" /> Export CSV
        </button>

      </div>

      {/* High-density Data Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Order ID & Date</th>
              <th className="py-3 px-4">Customer & Company</th>
              <th className="py-3 px-4">Items Summary</th>
              <th className="py-3 px-4">Stage Status</th>
              <th className="py-3 px-4">Delivery Method</th>
              <th className="py-3 px-4 text-right">Total (INR)</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {paginatedOrders.map((order) => (
              <tr 
                key={order.id}
                className="hover:bg-slate-50/80 transition-colors group"
              >
                <td className="py-3 px-4">
                  <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <span>{order.id}</span>
                    {order.isExpress && (
                      <span className="px-1.5 py-0.2 rounded bg-red-100 text-red-700 font-extrabold text-[9px] flex items-center gap-0.5">
                        <Zap className="w-2.5 h-2.5 fill-red-600" /> Express
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </td>

                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{order.customer.name}</div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-2">
                    <span>{order.customer.company || 'Retail'}</span>
                    <span className="text-slate-300">•</span>
                    <span className="font-mono text-[10px]">{order.customer.phone}</span>
                  </div>
                </td>

                <td className="py-3 px-4 max-w-[220px]">
                  <p className="font-medium text-slate-800 truncate">
                    {order.items.map(i => i.productName).join(', ')}
                  </p>
                  <p className="text-[10px] text-slate-500 truncate">
                    {order.items[0]?.variant}
                  </p>
                </td>

                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="px-2.5 py-1 rounded-lg bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer"
                  >
                    <option value="Payment Confirmed">Payment Confirmed</option>
                    <option value="Artwork Verification">Artwork Verification</option>
                    <option value="In Production">In Production</option>
                    <option value="Quality Check">Quality Check</option>
                    <option value="Packed & Ready">Packed & Ready</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>

                <td className="py-3 px-4">
                  <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                    <Truck className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span className="truncate max-w-[140px]">{order.deliveryMethod}</span>
                  </div>
                </td>

                <td className="py-3 px-4 text-right">
                  <div className="font-black text-slate-900">₹{order.totalAmount.toLocaleString()}</div>
                  <span className="text-[10px] text-emerald-600 font-semibold">Incl. 18% GST</span>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setPreflightModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white font-semibold transition-colors inline-flex items-center gap-1"
                    title="Inspect Artwork File & Order Details"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span className="hidden xl:inline text-[11px]">Inspect</span>
                  </button>
                </td>
              </tr>
            ))}

            {paginatedOrders.length === 0 && (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400 font-medium">
                  No orders found matching search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs text-slate-600">
        <div>
          Showing {paginatedOrders.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to {Math.min(currentPage * itemsPerPage, filteredOrders.length)} of {filteredOrders.length} orders
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-bold text-slate-800">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg bg-white border border-slate-200 disabled:opacity-40 hover:bg-slate-100"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};
