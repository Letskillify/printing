import { useState, useEffect } from 'react'
import { FiSearch, FiPackage, FiTruck, FiCheckCircle, FiClock } from 'react-icons/fi'

export function TrackOrderPage() {
  const getSearchParams = () => new URLSearchParams(window.location.search);
  const initialOrderId = getSearchParams().get('orderId') || '';

  const [orderId, setOrderId] = useState(initialOrderId);
  const [phone, setPhone] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);

  // Auto track if orderId is present in URL
  useEffect(() => {
    if (initialOrderId) {
      triggerTracking(initialOrderId);
    }
  }, []);

  const triggerTracking = (idToTrack) => {
    if (idToTrack) {
      setTrackingResult({
        id: idToTrack.toUpperCase(),
        status: 'In Production & Quality Proofing',
        estimatedDelivery: '3-5 Business Days',
        carrier: 'Express Doorstep Logistics',
        trackingNumber: `${idToTrack.toUpperCase()}-LOGISTICS-IN`,
        steps: [
          { label: 'Order Received & File Pre-flight Checked', completed: true, date: 'Step 1 Passed' },
          { label: 'Plates Generated & CMYK Offset Press Calibrated', completed: true, date: 'Step 2 Passed' },
          { label: 'Printing, Spot UV Finish & Precision Die-Cut', completed: true, date: 'Step 3 Active' },
          { label: 'Quality Check & Express Doorstep Courier Handoff', completed: false, date: 'Scheduled Next' },
        ]
      });

      // Update URL query param
      try {
        const url = new URL(window.location.href);
        url.searchParams.set('page', 'track');
        url.searchParams.set('orderId', idToTrack);
        window.history.pushState(null, '', url.toString());
      } catch (e) {}
    }
  };

  const handleTrack = (e) => {
    e.preventDefault();
    triggerTracking(orderId);
  };

  return (
    <div className="bg-[#FAFBFD] font-sans min-h-screen text-[#0B1633]">
      
      {/* Page Hero Header — Deep Navy #07152F */}
      <section className="bg-[#07152F] text-white py-14 sm:py-18 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-[#FF5A1F]/10 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#FF5A1F] font-bold">Track Order</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Real-Time Order Tracking
          </h1>
          <p className="text-slate-300 text-[15px] max-w-2xl leading-relaxed">
            Track your printing press production status, quality inspection stage, and courier dispatch timeline.
          </p>
        </div>
      </section>

      {/* Main Track Form & Status */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Track Card Form */}
        <div className="bg-white rounded-[20px] p-8 border border-[#E7EAF0] shadow-sm mb-10">
          <h2 className="text-xl font-extrabold text-[#0B1633] mb-4">Enter Order Details</h2>

          <form onSubmit={handleTrack} className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-6">
              <input
                type="text"
                required
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Order ID (e.g. PRT-8829)"
                className="w-full bg-[#F7F8FA] border border-[#E7EAF0] rounded-[10px] py-3 px-4 text-xs text-[#0B1633] focus:outline-none focus:border-[#FF5A1F] font-medium"
              />
            </div>
            <div className="sm:col-span-4">
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone Number / Email"
                className="w-full bg-[#F7F8FA] border border-[#E7EAF0] rounded-[10px] py-3 px-4 text-xs text-[#0B1633] focus:outline-none focus:border-[#FF5A1F] font-medium"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[13px] py-3 rounded-[10px] transition border-none cursor-pointer shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1"
              >
                <FiSearch className="w-4 h-4" /> Track
              </button>
            </div>
          </form>
        </div>

        {/* Tracking Results */}
        {trackingResult && (
          <div className="bg-white rounded-[20px] p-8 border border-[#E7EAF0] shadow-md space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-[#E7EAF0]">
              <div>
                <span className="text-xs text-[#667085] font-semibold">Order ID</span>
                <h3 className="text-xl font-extrabold text-[#0B1633]">{trackingResult.id}</h3>
              </div>
              <div className="bg-[#FF5A1F]/10 text-[#FF5A1F] font-extrabold text-xs px-4 py-1.5 rounded-full">
                Status: {trackingResult.status}
              </div>
            </div>

            {/* Steps Timeline */}
            <div className="space-y-4 pt-2">
              {trackingResult.steps.map((s, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    s.completed ? 'bg-[#FF5A1F] text-white' : 'bg-[#F7F8FA] text-[#667085] border border-[#E7EAF0]'
                  }`}>
                    {s.completed ? <FiCheckCircle className="w-4 h-4" /> : <FiClock className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-[#0B1633] leading-snug">{s.label}</h4>
                    <p className="text-[12px] text-[#667085]">{s.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  )
}
