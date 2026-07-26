import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

export function Testimonials() {
  const prefersReducedMotion = useReducedMotion()
  const [active, setActive] = useState(0)

  const reviews = [
    {
      text: 'Excellent quality and fast delivery! Print never disappoints. Highly recommended for all printing needs.',
      name: 'Rajesh Kumar',
      role: 'Business Owner',
      avatar: 'RK',
      rating: 5,
    },
    {
      text: 'Amazing print quality and order accuracy. They were able to perfectly match our design specifications and color palettes.',
      name: 'Priya Sharma',
      role: 'Marketing Manager',
      avatar: 'PS',
      rating: 5,
    },
    {
      text: 'Great customer service and competitive pricing. Fast delivery ordered exactly as mentioned on their store.',
      name: 'Aamit Patel',
      role: 'Designer',
      avatar: 'AP',
      rating: 5,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="py-20 bg-white font-sans border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#FF5A1F] text-xs font-extrabold tracking-widest uppercase mb-2 block">
            Real Customer Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1633] tracking-tight">
            What Our Customers Say
          </h2>
          <p className="text-[#667085] text-[15px] font-normal mt-2.5 max-w-lg mx-auto leading-relaxed">
            Read real feedback from our satisfied enterprise and business clients.
          </p>
        </div>

        {/* Testimonial Cards */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              variants={cardVariants}
              className={`bg-white rounded-[16px] p-7 border transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer flex flex-col justify-between hover:shadow-[0_12px_30px_rgba(7,21,47,0.06)] hover:-translate-y-1 ${
                i === active ? 'border-[#FF5A1F]/50 shadow-md ring-1 ring-[#FF5A1F]/20' : 'border-[#E7EAF0] hover:border-[#FF5A1F]/40'
              }`}
              onClick={() => setActive(i)}
            >
              <div>
                {/* Quotation Mark */}
                <div className="text-[#FF5A1F] mb-3">
                  <svg className="w-8 h-8 opacity-30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-3.5">
                  {Array.from({ length: r.rating }).map((_, si) => (
                    <FiStar key={si} className="w-4 h-4 fill-[#FF5A1F] text-[#FF5A1F]" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-[#0B1633] text-[15px] font-normal italic leading-relaxed mb-6">
                  "{r.text}"
                </p>
              </div>

              {/* Reviewer Details */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-[#E7EAF0]">
                <div className="w-10 h-10 rounded-full bg-[#07152F] text-white flex items-center justify-center text-xs font-black flex-shrink-0 shadow-sm border border-slate-700">
                  {r.avatar}
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-[#0B1633] leading-snug">{r.name}</h4>
                  <p className="text-[#667085] text-[13px] font-medium">{r.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              className={`transition-all duration-300 rounded-full border-none cursor-pointer ${
                i === active ? 'w-7 h-2 bg-[#FF5A1F]' : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
