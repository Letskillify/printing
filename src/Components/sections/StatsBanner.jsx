import { useState, useEffect, useRef } from 'react'
import { animate, useInView } from 'framer-motion'
import { FiUsers, FiCheckCircle, FiLayers, FiSmile } from 'react-icons/fi'

function AnimatedCounter({ value, decimals = 0, suffix = '' }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })
  const [displayValue, setDisplayValue] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(latest) {
        if (decimals > 0) {
          setDisplayValue(latest.toFixed(decimals))
        } else {
          setDisplayValue(Math.floor(latest).toLocaleString('en-US'))
        }
      },
    })
    return () => controls.stop()
  }, [isInView, value, decimals])

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export function StatsBanner() {
  const stats = [
    {
      value: 50000,
      suffix: '+',
      label: 'Happy Customers',
      desc: 'Trusted by business owners nationwide',
      icon: <FiUsers className="w-6 h-6 text-[#FF5A1F]" />,
    },
    {
      value: 100000,
      suffix: '+',
      label: 'Orders Completed',
      desc: 'Printed with precision & delivered',
      icon: <FiCheckCircle className="w-6 h-6 text-[#FF5A1F]" />,
    },
    {
      value: 500,
      suffix: '+',
      label: 'Premium Products',
      desc: 'Extensive catalog of custom print items',
      icon: <FiLayers className="w-6 h-6 text-[#FF5A1F]" />,
    },
    {
      value: 99.9,
      decimals: 1,
      suffix: '%',
      label: 'Satisfaction Rate',
      desc: 'Backed by our print quality guarantee',
      icon: <FiSmile className="w-6 h-6 text-[#FF5A1F]" />,
    },
  ]

  return (
    <section className="py-16 bg-[#07152F] text-white font-sans relative overflow-hidden border-y border-slate-800">
      {/* Subtle Lighting Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-[#FF5A1F]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`flex flex-col items-center text-center ${
                i !== 0 ? 'pt-8 sm:pt-0 sm:pl-8' : ''
              }`}
            >
              {/* Icon Container */}
              <div className="w-13 h-13 rounded-[14px] bg-white/5 border border-slate-800 flex items-center justify-center mb-4 shadow-sm">
                {s.icon}
              </div>

              {/* Animated Number */}
              <div className="text-4xl sm:text-5xl font-black text-white leading-none tracking-tight mb-2">
                <AnimatedCounter
                  value={s.value}
                  decimals={s.decimals || 0}
                  suffix={s.suffix}
                />
              </div>

              <div className="text-[16px] font-bold text-white mb-1">
                {s.label}
              </div>
              <div className="text-[13px] text-[#909AB0] font-normal max-w-[200px]">
                {s.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
