import { FiUpload, FiCheck, FiArrowRight, FiShield, FiStar } from 'react-icons/fi'

export function Hero({ setCurrentPage }) {
  const handleLink = (page) => {
    if (setCurrentPage) setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="relative bg-[#FAF8F5] py-20 lg:py-28 overflow-hidden font-sans border-b border-neutral-200/60">
      
      {/* Decorative Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[45vw] h-[45vw] rounded-full bg-amber-200/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-orange-100/30 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Column: Premium Editorial Content */}
        <div className="flex flex-col text-left lg:col-span-7 pr-0 lg:pr-6">
          
          {/* Subheading Badge */}
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 rounded-full bg-[#E5AA17] animate-pulse" />
            <span className="text-[12px] md:text-[13px] font-extrabold tracking-[0.25em] text-[#C48C08] uppercase">
              Design • Print • Deliver
            </span>
          </div>
          
          {/* Headline */}
          <h1 className="text-[48px] sm:text-[62px] lg:text-[72px] font-extrabold text-neutral-900 leading-[1.05] tracking-tight mb-6">
            Design it.<br />
            Print it. <span className="font-serif italic font-normal text-[#D5A153]">Love it.</span>
          </h1>
          
          {/* Paragraph */}
          <p className="text-neutral-600 text-base md:text-[18px] leading-relaxed max-w-xl mb-10 font-normal">
            Bespoke print production engineered for ambitious brands and discerning creators. Enjoy premium finishes, tactile textures, and doorstep delivery.
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-10">
            <button 
              onClick={() => handleLink('products')} 
              className="inline-flex items-center justify-center bg-neutral-900 hover:bg-neutral-800 text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-[15px] transition-all duration-300 shadow-xl shadow-neutral-900/10 hover:shadow-2xl hover:-translate-y-0.5 cursor-pointer border-none group"
            >
              Shop All Products 
              <FiArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            
            <button 
              onClick={() => handleLink('products')} 
              className="inline-flex items-center justify-center bg-white/90 backdrop-blur-md border border-neutral-300/80 hover:border-neutral-400 hover:bg-white text-neutral-800 font-semibold px-7 py-4 rounded-full text-sm sm:text-[15px] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              Upload Your Design <FiUpload className="ml-2.5 w-4 h-4 text-neutral-500" />
            </button>
          </div>

          {/* Quick Checklist Icons */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-xs sm:text-sm font-medium text-neutral-700 border-t border-neutral-200/80 pt-8 max-w-xl">
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[#C48C08]">
                <FiCheck className="w-3.5 h-3.5" />
              </span>
              Free Studio Design Check
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[#C48C08]">
                <FiCheck className="w-3.5 h-3.5" />
              </span>
              Encrypted Checkout
            </span>
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500/10 flex items-center justify-center text-[#C48C08]">
                <FiCheck className="w-3.5 h-3.5" />
              </span>
              On-Time Guaranteed
            </span>
          </div>

          {/* Slider Pagination Dots */}
          <div className="flex gap-2 mt-8 items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 cursor-pointer hover:bg-neutral-400 transition-colors"></span>
            <span className="w-7 h-2.5 rounded-full bg-[#E5AA17] cursor-pointer shadow-sm"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 cursor-pointer hover:bg-neutral-400 transition-colors"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-neutral-300 cursor-pointer hover:bg-neutral-400 transition-colors"></span>
          </div>
        </div>

        {/* Right Column: Layered Photo Showcase */}
        <div className="relative h-[480px] sm:h-[540px] lg:h-[580px] w-full lg:col-span-5 flex items-center justify-center select-none group/card">
          
          {/* Subtle Frame Geometry Backdrop */}
          <div className="absolute inset-0 m-auto w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-neutral-200/60 scale-125 pointer-events-none" />

          {/* Main Showcase Image (Layered Print Mockup) */}
          <div className="relative w-full h-[400px] sm:h-[460px] rounded-3xl overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.12)] border border-white/60 transform transition-transform duration-700 group-hover/card:scale-[1.02]">
            <img 
              src="https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=1200" 
              alt="Premium Print Production Showcase" 
              className="w-full h-full object-cover object-center"
            />
            {/* Subtle Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </div>

          {/* Floating Glassmorphic Accent Badge 1: Quality Stamp */}
          <div className="absolute top-6 left-2 sm:-left-4 bg-white/80 backdrop-blur-md border border-white/80 p-3.5 rounded-2xl shadow-xl flex items-center gap-3 transform -rotate-3 hover:rotate-0 transition-all duration-500 z-20">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#E5AA17] to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md">
              <FiStar className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-900 leading-tight">4.9 / 5.0 Rating</p>
              <p className="text-[10px] text-neutral-500 font-medium">Over 10k+ Prints Delivered</p>
            </div>
          </div>

          {/* Floating Glassmorphic Accent Badge 2: Craftsmanship Tag */}
          <div className="absolute bottom-8 right-2 sm:-right-4 bg-neutral-900/90 backdrop-blur-md border border-neutral-800 text-white p-4 rounded-2xl shadow-2xl flex items-center gap-3.5 transform rotate-2 hover:rotate-0 transition-all duration-500 z-20">
            <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-[#E5AA17]">
              <FiShield className="w-4 h-4" />
            </div>
            <div className="text-left">
              <p className="text-xs font-bold tracking-wide text-amber-300 uppercase">100% Guaranteed</p>
              <p className="text-[11px] text-neutral-300 font-normal">Ultra-High Resolution Print</p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}