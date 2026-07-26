import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle, FiTag } from 'react-icons/fi'

export function DiscountCTA({ setCurrentPage }) {
  const prefersReducedMotion = useReducedMotion()

  const handleLink = (page) => {
    if (setCurrentPage) setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section className="py-0 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 rounded-[20px] overflow-hidden shadow-xl border border-[#E7EAF0]">

          {/* Left Panel — Orange Discount Offer (5 cols) */}
          <div className="lg:col-span-5 relative flex flex-col justify-center px-6 sm:px-10 py-10 text-white bg-[#FF5A1F] overflow-hidden">
            {/* Soft Controlled Lighting */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/15 blur-xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/10 blur-xl pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider mb-4 text-white border border-white/30">
                <FiTag className="w-3.5 h-3.5" /> Special Welcome Offer
              </div>

              <div className="text-5xl sm:text-6xl font-black text-white leading-none tracking-tight mb-1">
                20% OFF
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-white mb-2">
                On Your First Order
              </div>
              
              <p className="text-white/95 text-[14px] font-normal leading-relaxed mb-6 max-w-sm">
                Unlock instant savings on custom business cards, brochures, banners, and packaging.
              </p>

              {/* Premium Dashed Coupon Container */}
              <div className="inline-flex items-center gap-3 bg-white/15 border-2 border-dashed border-white/60 rounded-[12px] px-4 py-2 mb-6 shadow-inner">
                <span className="text-white/90 text-[13px] font-medium">Use code:</span>
                <span className="text-white font-mono font-black text-[15px] tracking-widest bg-white/20 px-2.5 py-0.5 rounded-[6px]">WELCOME20</span>
              </div>

              <div>
                <button
                  onClick={() => handleLink('products')}
                  className="inline-flex items-center justify-center bg-white text-[#FF5A1F] hover:bg-orange-50 font-extrabold text-[14px] px-6 py-3.5 rounded-[12px] shadow-lg hover:shadow-xl transition-all duration-250 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border-none gap-2 group"
                >
                  Shop Now
                  <FiArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Panel — Deep Navy CTA with Product Image (7 cols) */}
          <div className="lg:col-span-7 relative flex flex-col justify-center bg-[#07152F] px-6 sm:px-10 py-10 text-white overflow-hidden border-t lg:border-t-0 lg:border-l border-slate-800">
            {/* Controlled Lighting */}
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[#FF5A1F]/10 blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Text Area */}
              <div className="md:col-span-7">
                <span className="text-[#FF5A1F] text-[12px] font-extrabold tracking-widest uppercase mb-1.5 block">
                  Get Started Today
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-[#909AB0] text-[14px] font-normal leading-relaxed mb-5">
                  Join thousands of satisfied customers who trust us for their printing needs.
                </p>

                {/* Benefits List */}
                <div className="space-y-2.5 mb-6">
                  {[
                    'Free Design Consultation',
                    'Free Shipping Orders over ₹999',
                    '24/7 Customer Support',
                  ].map((b) => (
                    <div key={b} className="flex items-center gap-2.5">
                      <div className="w-4.5 h-4.5 rounded-full bg-[#FF5A1F]/20 border border-[#FF5A1F]/40 flex items-center justify-center flex-shrink-0 text-[#FF5A1F]">
                        <FiCheckCircle className="w-3 h-3" />
                      </div>
                      <span className="text-slate-200 text-[14px] font-medium">{b}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => handleLink('products')}
                  className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[14px] px-6 py-3.5 rounded-[12px] transition-all duration-250 shadow-md shadow-[#FF5A1F]/20 hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border-none"
                >
                  Get Started
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Product Visual with Subtle Floating Motion */}
              <div className="md:col-span-5 relative flex items-center justify-center py-4 md:py-0">
                <div className="w-40 h-40 rounded-full bg-white/5 absolute blur-md pointer-events-none" />
                <motion.img
                  src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=500"
                  alt="High quality print samples"
                  className="relative z-10 w-44 h-44 object-cover rounded-[16px] shadow-2xl border border-white/15"
                  animate={!prefersReducedMotion ? { y: [0, -5, 0] } : {}}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
