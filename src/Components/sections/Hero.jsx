import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiShield, FiTruck, FiStar, FiCheckCircle } from 'react-icons/fi'

export function Hero({ setCurrentPage }) {
  const prefersReducedMotion = useReducedMotion()
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (prefersReducedMotion) return
    const handleMouseMove = (e) => {
      // Small parallax offset calculation normalized around center
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 12
      const y = (e.clientY / innerHeight - 0.5) * 12
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [prefersReducedMotion])

  const handleLink = (page) => {
    if (setCurrentPage) setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Animation variants (staggered 700-1000ms total)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.05,
      },
    },
  }

  const eyebrowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  }

  const h1Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  }

  const descVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  }

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  }

  const trustVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  }

  const visualVariants = {
    hidden: { opacity: 0, x: 25, scale: 0.98 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section className="relative bg-[#07152F] text-white py-16 sm:py-20 lg:py-24 overflow-hidden font-sans border-b border-slate-800/70">
      
      {/* ── Background Atmospheric Glows & Lighting ── */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-[#FF5A1F]/10 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-[#0B1633] blur-[100px] pointer-events-none" />
      {/* Subtle background radial spotlight */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

        {/* Left Column — Content & Copy */}
        <motion.div
          className="flex flex-col text-left lg:col-span-7 pr-0 lg:pr-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow Badge */}
          <motion.div variants={eyebrowVariants} className="inline-flex items-center gap-2 mb-5 w-fit">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5A1F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF5A1F]"></span>
            </span>
            <span className="bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 text-[#FF5A1F] text-[11px] sm:text-xs font-extrabold tracking-widest uppercase px-3.5 py-1.5 rounded-full backdrop-blur-md">
              Enterprise Print & Packaging
            </span>
          </motion.div>

          {/* Hero H1 — Dominant Headline */}
          <motion.h1
            variants={h1Variants}
            className="text-4xl sm:text-5xl lg:text-[64px] font-black text-white leading-[1.05] tracking-tight mb-5"
          >
            Print Your Imagination,<br />
            <span className="text-[#FF5A1F]">
              Perfected.
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={descVariants}
            className="text-slate-300 text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-relaxed max-w-xl mb-8 tracking-wide"
          >
            Enterprise-grade print production engineered for ambitious brands. Enjoy tactile luxury textures, vibrant color accuracy, instant quotes, and rapid doorstep delivery.
          </motion.p>

          {/* Action Buttons */}
          <motion.div variants={buttonVariants} className="flex flex-wrap items-center gap-4 mb-10">
            <button
              onClick={() => handleLink('products')}
              className="inline-flex items-center justify-center bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold px-8 py-4 rounded-[12px] text-[15px] transition-all duration-250 shadow-xl shadow-[#FF5A1F]/25 hover:shadow-2xl hover:shadow-[#FF5A1F]/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border-none gap-2.5 group"
            >
              Shop All Products
              <FiArrowRight className="w-4 h-4 transition-transform duration-250 group-hover:translate-x-1" />
            </button>
            <button
              onClick={() => handleLink('contact')}
              className="inline-flex items-center justify-center bg-white/5 hover:bg-white/10 backdrop-blur-md border border-slate-700 hover:border-white text-white font-semibold px-7 py-4 rounded-[12px] text-[15px] transition-all duration-250 cursor-pointer gap-2 shadow-sm"
            >
              Get Custom Quote
            </button>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div variants={trustVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-2xl">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-[#FF5A1F]/15 border border-[#FF5A1F]/30 flex items-center justify-center text-[#FF5A1F] flex-shrink-0">
                <FiStar className="w-4 h-4 fill-[#FF5A1F]" />
              </div>
              <div>
                <h4 className="text-white font-bold text-[13px] leading-snug">Premium Finish</h4>
                <p className="text-[#667085] text-[12px]">Ultra HD 2400 DPI</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-white/10 border border-slate-700 flex items-center justify-center text-[#FF5A1F] flex-shrink-0">
                <FiTruck className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-bold text-[13px] leading-snug">Express Dispatch</h4>
                <p className="text-[#667085] text-[12px]">3-5 Business Days</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[10px] bg-white/10 border border-slate-700 flex items-center justify-center text-[#FF5A1F] flex-shrink-0">
                <FiShield className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-white font-bold text-[13px] leading-snug">100% Quality</h4>
                <p className="text-[#667085] text-[12px]">Satisfaction Guaranteed</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column — Product Visual Composition with Subtle Motion & Parallax */}
        <motion.div
          className="lg:col-span-5 relative flex items-center justify-center py-6 lg:py-0"
          variants={visualVariants}
          initial="hidden"
          animate="visible"
          style={!prefersReducedMotion ? {
            transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0px)`,
            transition: 'transform 0.2s ease-out'
          } : {}}
        >
          {/* Subtle Orange Glow behind product */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5A1F]/20 via-[#07152F] to-transparent rounded-[22px] blur-2xl transform scale-95 pointer-events-none" />

          {/* Main Card Floating Animation */}
          <motion.div
            className="relative w-full max-w-[420px] rounded-[22px] overflow-hidden border border-white/15 bg-slate-900/90 backdrop-blur-xl shadow-2xl p-4 group"
            animate={!prefersReducedMotion ? { y: [0, -6, 0] } : {}}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* Showcase Image */}
            <div className="relative h-[320px] sm:h-[370px] w-full rounded-[16px] overflow-hidden shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=1000"
                alt="Luxury Print Products Showcase"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07152F]/85 via-transparent to-transparent" />

              {/* Top Verified Badge */}
              <div className="absolute top-3.5 left-3.5 bg-[#07152F]/90 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[11px] font-bold text-white flex items-center gap-1.5 shadow-md">
                <FiCheckCircle className="text-[#FF5A1F]" /> Verified High-Resolution Output
              </div>

              {/* Bottom Info Pill */}
              <div className="absolute bottom-3.5 left-3.5 right-3.5 bg-white/10 backdrop-blur-xl border border-white/20 p-3.5 rounded-[12px] text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-[14px]">Enterprise Packaging & Cards</h3>
                    <p className="text-[12px] text-slate-300">Gold Foil, Soft-Touch Matte & Spot UV</p>
                  </div>
                  <span className="bg-[#FF5A1F] text-white font-extrabold text-[10px] px-2.5 py-1 rounded-[8px] shadow">
                    Top Rated
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Glass Rating Accent */}
            <motion.div
              className="absolute -bottom-4 -left-4 hidden sm:flex items-center gap-3 bg-[#07152F]/95 backdrop-blur-2xl border border-white/20 p-3.5 rounded-[14px] shadow-2xl z-20"
              animate={!prefersReducedMotion ? { y: [0, 4, 0] } : {}}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#FF5A1F] flex items-center justify-center text-white font-black text-base shadow-md">
                ★
              </div>
              <div className="text-left">
                <p className="text-[13px] font-bold text-white">4.98 / 5.0 Rating</p>
                <p className="text-[11px] text-[#667085] font-medium">From 50,000+ Verified Clients</p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}