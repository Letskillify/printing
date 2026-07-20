import { FiLayers, FiShield, FiHeart } from 'react-icons/fi'

export function AboutPage() {
  const values = [
    {
      title: 'Obsessive Precision',
      desc: 'Our printing presses are calibrated weekly to the FOGRA ISO standard. Color profiles (CMYK) are checked by real human pre-press specialists before production.',
      icon: <FiLayers className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'Eco-Ethical Print',
      desc: 'We prioritize FSC-certified recycled paper stocks, biodegradable soy-based inks, and custom folding box designs that eliminate glue adhesives entirely where possible.',
      icon: <FiHeart className="w-6 h-6 text-amber-500" />
    },
    {
      title: 'On-Time Handoff Guarantee',
      desc: 'We understand business deadlines. If your order shipment leaves our printing hubs later than the promised dispatch date, you get a full refund.',
      icon: <FiShield className="w-6 h-6 text-amber-500" />
    }
  ]

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Hero */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-gray-150 p-8 sm:p-12 mb-12 text-center sm:text-left flex flex-col lg:flex-row items-center gap-8">
          <div className="max-w-2xl text-left">
            <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
              Who We Are
            </span>
            <h1 className="text-[32px] sm:text-[42px] font-black text-slate-800 tracking-tight leading-none mb-5">
              Legacy of High-Precision Print Production
            </h1>
            <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
              At CreatiPrint, we combine advanced print engineering with meticulous craftsmanship. We believe prints build physical trust between brands and their audiences. Every trifold pamphlet fold, business card foil accent, and box edge detail represents your corporate signature.
            </p>
          </div>
          {/* Logo Badge Art */}
          <div className="flex-shrink-0 w-40 h-40 bg-[#FAF7F2] border border-gray-200 rounded-full flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 100 100" className="w-20 h-20 text-[#E5AA17]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50 8L88 30V70L50 92L12 70V30L50 8Z" stroke="currentColor" strokeWidth="6" strokeLinejoin="round" />
              <path d="M50 8L88 30L50 52L12 30L50 8Z" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="4" />
              <path d="M12 30L50 52V92" stroke="currentColor" strokeWidth="5" />
              <path d="M88 30L50 52V92" stroke="currentColor" strokeWidth="5" />
            </svg>
          </div>
        </div>

        {/* Pillars / Values blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {values.map((v) => (
            <div key={v.title} className="bg-white rounded-xl border border-gray-150 p-6 flex flex-col items-start hover:shadow-md transition">
              <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mb-5">
                {v.icon}
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-850 mb-3">{v.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Highlight Production facility detailing */}
        <div className="bg-white rounded-2xl border border-gray-150 p-8 sm:p-10 mb-12">
          <div className="border-b border-gray-100 pb-4 mb-8">
            <h2 className="text-lg font-black text-slate-850 uppercase tracking-wide">
              Facility & Press Machinery
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-800">4-Color Offset Lithography Presses</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-semibold">Ensures absolute color uniformity across larger-scale brochure runs and flyer prints. Calibrated with Heidelberg printing software.</p>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-800">Flatbed Plotting & UV Spot Finish Coaters</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-semibold">Delivers raised metallic leaf foils, matte soft-touch coatings, and spot laminate textures that demand customer touch.</p>
              </div>
              <div>
                <h4 className="text-sm sm:text-base font-black text-slate-800">High-Speed Laser Dieline Routers</h4>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed font-semibold">Precise layout outline cutting for packaging boxes, folders, custom tags, and stickers with error margins under 0.1mm.</p>
              </div>
            </div>
            {/* Visual Vector Machinery schematic render */}
            <div className="bg-[#FAF7F2] border border-gray-150 rounded-xl p-6 h-64 flex flex-col justify-between relative overflow-hidden select-none">
              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase block">Print Calibration Grid</span>
              
              <svg viewBox="0 0 100 40" className="w-full fill-none stroke-amber-500 stroke-[0.8] opacity-75">
                {/* Simulated sine-wave / machine trace */}
                <path d="M 0 20 Q 12.5 5, 25 20 T 50 20 T 75 20 T 100 20" />
                <path d="M 0 20 Q 12.5 35, 25 20 T 50 20 T 75 20 T 100 20" stroke="#0b1426" strokeWidth="0.5" />
              </svg>
              
              <div className="flex justify-between items-center text-xs font-black text-slate-700">
                <span>SYSTEM STATUS: Calibrated</span>
                <span className="text-[#E9A115]">99.8% Alignment Accuracy</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
