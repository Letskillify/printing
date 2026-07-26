import { motion, useReducedMotion } from 'framer-motion'
import { FiAward, FiClock, FiDollarSign, FiHeadphones } from 'react-icons/fi'

export function WhyChooseUs() {
  const prefersReducedMotion = useReducedMotion()

  const features = [
    {
      icon: <FiAward className="w-6 h-6" />,
      title: 'Premium Quality',
      desc: 'We use the finest materials and latest printing technology to deliver exceptional quality every time.'
    },
    {
      icon: <FiClock className="w-6 h-6" />,
      title: 'Fast Turnaround',
      desc: 'Quick production and fast delivery to meet your deadlines without compromising on quality.'
    },
    {
      icon: <FiDollarSign className="w-6 h-6" />,
      title: 'Affordable Pricing',
      desc: 'Competitive prices without compromising on quality. Best value for your money.'
    },
    {
      icon: <FiHeadphones className="w-6 h-6" />,
      title: 'Design Support',
      desc: 'Expert design assistance to help you create stunning print materials.'
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

  const itemVariants = {
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
            Our Commitments
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1633] tracking-tight">
            Why Choose Printo?
          </h2>
          <p className="text-[#667085] text-[15px] font-normal mt-2.5 max-w-lg mx-auto leading-relaxed">
            We provide exceptional printing services backed by years of experience and commitment to quality.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={itemVariants}
              className="group bg-white rounded-[16px] p-7 text-left border border-[#E7EAF0] hover:border-[#FF5A1F]/30 hover:shadow-[0_8px_25px_rgba(7,21,47,0.05)] transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Icon Container */}
                <div className="w-13 h-13 rounded-[12px] bg-[#F7F8FA] border border-[#E7EAF0] text-[#07152F] flex items-center justify-center mb-6 group-hover:bg-[#FF5A1F]/10 group-hover:border-[#FF5A1F]/30 group-hover:text-[#FF5A1F] group-hover:scale-105 group-hover:shadow-[0_0_20px_rgba(255,90,31,0.2)] transition-all duration-300">
                  {f.icon}
                </div>

                <h3 className="text-[17px] font-bold text-[#0B1633] mb-2 group-hover:text-[#FF5A1F] transition-colors duration-200">
                  {f.title}
                </h3>
                <p className="text-[#667085] text-[14px] font-normal leading-relaxed">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
