import { useState } from 'react'
import { FiSearch, FiCheck, FiTruck, FiBox, FiClock, FiFileText } from 'react-icons/fi'

export function TrackOrderPage() {
  const [orderId, setOrderId] = useState('')
  const [searchedId, setSearchedId] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrackSubmit = (e) => {
    e.preventDefault()
    if (!orderId) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSearchedId(orderId.toUpperCase())
    }, 1000)
  }

  // Pre-calculated milestones for search simulation
  const milestones = [
    { name: 'Order Received', desc: 'Payment validated successfully', date: '18 July, 10:14 AM', state: 'done' },
    { name: 'Artwork Verified', desc: 'Pre-press layout safely adjusted', date: '18 July, 02:40 PM', state: 'done' },
    { name: 'Printing Press Calibrated', desc: 'Heidelberg CMYK ink offsets matched', date: '19 July, 09:12 AM', state: 'done' },
    { name: 'Slicing & Finishing', desc: 'Spot UV layers applied, sheets trimmed', date: 'In Progress', state: 'current' },
    { name: 'Dispatched for Shipping', desc: 'Handed off to premium air carrier courier', date: 'Estimated: 21 July', state: 'pending' }
  ]

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-gray-150 p-8 sm:p-10 mb-8 text-center sm:text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
            Shipment Tracking
          </span>
          <h1 className="text-[32px] sm:text-[38px] font-black text-slate-800 tracking-tight leading-none mb-4">
            Track Your Order Status
          </h1>
          <p className="text-gray-550 text-sm leading-relaxed max-w-xl">
            Input your 6-character Order ID (e.g. CP-9081) printed on your invoice receipt to get print calibration milestones and tracking information.
          </p>
        </div>

        {/* Tracking Search Input Form */}
        <div className="bg-white rounded-xl border border-gray-150 p-5 mb-8">
          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 flex items-center bg-slate-50 border border-gray-250 rounded-lg py-3 px-4 focus-within:border-[#E5AA17] focus-within:bg-white transition-all">
              <FiSearch className="text-gray-400 mr-2 w-4 h-4" />
              <input
                required
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter order ID (e.g. CP-7840)"
                className="bg-transparent border-none text-xs text-slate-800 placeholder-gray-500 font-bold focus:outline-none w-full uppercase"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-[#E5AA17] hover:bg-[#cca118] disabled:bg-slate-200 disabled:text-gray-400 text-slate-950 font-black text-xs uppercase tracking-wider py-3 px-8 rounded-lg transition-all"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>
        </div>

        {/* Dynamic Display Details */}
        {searchedId ? (
          <div className="space-y-6">
            
            {/* Quick Summary Box */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 text-left">
              <div>
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none block mb-1">Active Query</span>
                <h3 className="text-base font-black text-slate-850">Order {searchedId}</h3>
                <p className="text-xs text-gray-500 font-semibold mt-1">Item: 500x Velvet Business Cards (Soft Touch Velvet)</p>
              </div>
              <div className="text-left sm:text-right border-t sm:border-t-0 border-gray-100 pt-4 sm:pt-0">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Estimated Handover</span>
                <span className="text-base font-black text-[#E5AA17]">22 July 2026</span>
              </div>
            </div>

            {/* Print Milestones Path */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 text-left">
              <h3 className="text-base font-black text-slate-850 mb-8 border-b border-gray-100 pb-3 block">Production Milestones</h3>
              
              <div className="relative pl-6 sm:pl-8 space-y-8 border-l border-gray-200">
                
                {milestones.map((ms, idx) => (
                  <div key={idx} className="relative group text-left">
                    {/* Circle Node indicator on border line */}
                    <span className={`absolute top-0.5 -left-[31px] sm:-left-[39px] w-6 h-6 rounded-full flex items-center justify-center border font-bold text-[10px] ${
                      ms.state === 'done'
                        ? 'bg-emerald-500 text-white border-emerald-500 shadow-md shadow-emerald-500/20'
                        : ms.state === 'current'
                        ? 'bg-amber-500 text-slate-950 border-amber-500 animate-pulse'
                        : 'bg-white text-gray-400 border-gray-300'
                    }`}>
                      {ms.state === 'done' ? (
                        <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                      ) : (
                        idx + 1
                      )}
                    </span>
                    
                    {/* Details content */}
                    <div>
                      <h4 className="text-xs sm:text-sm font-black text-slate-800 leading-snug">{ms.name}</h4>
                      <p className="text-[11.5px] text-gray-500 leading-relaxed font-semibold mt-0.5">{ms.desc}</p>
                      <span className="text-[10px] font-bold text-gray-450 uppercase block mt-1.5 font-mono">{ms.date}</span>
                    </div>
                  </div>
                ))}

              </div>
            </div>

            {/* Package details checklist box */}
            <div className="bg-[#FAF6F0] rounded-xl border border-gray-200 p-6 text-left grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex gap-2">
                <FiFileText className="w-5 h-5 text-gray-450 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[9.5px] text-gray-405 font-bold uppercase tracking-wider block leading-none">Design File</span>
                  <span className="text-xs font-black text-slate-800 block mt-1 leading-snug truncate max-w-[170px]">cards_velvet_v2.pdf</span>
                </div>
              </div>
              <div className="flex gap-2">
                <FiBox className="w-5 h-5 text-gray-450 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[9.5px] text-gray-405 font-bold uppercase tracking-wider block leading-none">Specifications</span>
                  <span className="text-xs font-black text-slate-800 block mt-1 leading-snug">350GSM Matte + Spot UV</span>
                </div>
              </div>
              <div className="flex gap-2">
                <FiTruck className="w-5 h-5 text-gray-450 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="text-[9.5px] text-gray-405 font-bold uppercase tracking-wider block leading-none">Carrier Handoff</span>
                  <span className="text-xs font-black text-slate-800 block mt-1 leading-snug">Delhivery Air Express</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-150 py-16 px-6 text-center">
            <div className="w-14 h-14 rounded-full bg-[#FAF6F0] border border-gray-200 flex items-center justify-center mx-auto mb-4">
              <FiBox className="w-6 h-6 text-amber-500" />
            </div>
            <h3 className="text-[17px] font-black text-slate-800">Pending Order ID Search</h3>
            <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto mt-1">
              Currently no active track trace query. Enter your reference ID above to load production calibration statuses.
            </p>
          </div>
        )}

      </div>
    </section>
  )
}
