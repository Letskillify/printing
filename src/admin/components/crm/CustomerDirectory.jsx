import React, { useState } from 'react';
import { 
  Users, 
  Building2, 
  CreditCard, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Phone, 
  Mail,
  ShieldAlert,
  ArrowUpRight
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

export const CustomerDirectory = () => {
  const { customers, toggleB2BCredit } = useAdmin();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Customer Relationship Directory & B2B Account Management
          </h2>
          <p className="text-xs text-slate-500">
            Search corporate clients, review lifetime total spend, and manage NET-15 credit invoice privileges
          </p>
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Search customer name, company, email, or mobile..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-purple-500 shadow-2xs"
        />
      </div>

      {/* High-density CRM Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-100/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">Client Name & Company</th>
              <th className="py-3 px-4">Contact Info</th>
              <th className="py-3 px-4">GSTIN Number</th>
              <th className="py-3 px-4">Orders & Lifetime Spend</th>
              <th className="py-3 px-4 text-center">NET-15 Credit Privilege</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-xs">
            {filteredCustomers.map((cust) => (
              <tr key={cust.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    {cust.logoUrl ? (
                      <img src={cust.logoUrl} alt="Logo" className="w-9 h-9 object-cover rounded-xl border border-slate-200 shrink-0" />
                    ) : (
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 font-extrabold flex items-center justify-center text-xs shrink-0">
                        {cust.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <div className="font-extrabold text-slate-900">{cust.name}</div>
                      <div className="text-[11px] text-purple-600 font-semibold">{cust.company || 'Retail Account'}</div>
                    </div>
                  </div>
                </td>

                <td className="py-3 px-4">
                  <div className="text-slate-800 font-medium flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" /> {cust.email}
                  </div>
                  <div className="text-slate-500 text-[11px] flex items-center gap-1.5 mt-0.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" /> {cust.phone}
                  </div>
                </td>

                <td className="py-3 px-4 font-mono">
                  {cust.gstin ? (
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                      {cust.gstin}
                    </span>
                  ) : (
                    <span className="text-slate-400 italic">No GST registered</span>
                  )}
                </td>

                <td className="py-3 px-4">
                  <div className="font-extrabold text-slate-900">₹{cust.totalSpend.toLocaleString()}</div>
                  <div className="text-[11px] text-slate-500">{cust.totalOrders} Completed Orders</div>
                </td>

                <td className="py-3 px-4 text-center">
                  <button
                    onClick={() => toggleB2BCredit(cust.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors inline-flex items-center gap-1.5 ${
                      cust.creditNet15 
                        ? 'bg-purple-600 text-white border-purple-600 shadow-2xs' 
                        : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{cust.creditNet15 ? 'NET-15 Enabled' : 'Standard Cash'}</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
};
