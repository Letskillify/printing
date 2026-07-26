import { motion, useReducedMotion } from 'framer-motion'
import { FiGrid, FiUploadCloud, FiCheckCircle, FiPackage } from 'react-icons/fi'

export function HowItWorks() {
  const prefersReducedMotion = useReducedMotion()

  const steps = [
    {
      num: '01',
      icon: <FiGrid className="w-6 h-6" />,
      title: 'Choose Product',
      desc: 'Select from our wide range of premium printing products.',
    },
    {
      num: '02',
      icon: <FiUploadCloud className="w-6 h-6" />,
      title: 'Upload Design',
      desc: 'Upload your design or use our templates to create your own.',
    },
    {
      num: '03',
      icon: <FiCheckCircle className="w-6 h-6" />,
      title: 'Review & Order',
      desc: 'Review your order and proceed to secure payment.',
    },
    {
      num: '04',
      icon: <FiPackage className="w-6 h-6" />,
      title: 'We Print & Deliver',
      desc: 'We print with precision and deliver to your doorstep.',
    },
  ]

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
        delayChildren: 0.2,
      },
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  }

  return (
    <section className="py-20 bg-[#F7F8FA] font-sans border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#FF5A1F] text-xs font-extrabold tracking-widest uppercase mb-2 block">
            Simple 4-Step Journey
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1633] tracking-tight">
            How It Works
          </h2>
          <p className="text-[#667085] text-[15px] font-normal mt-2.5 max-w-lg mx-auto leading-relaxed">
            Simple 4 steps to get your print products delivered to your doorstep.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Animated Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-[58px] left-[15%] right-[15%] h-[2.5px] bg-[#E7EAF0] z-0 overflow-hidden">
            <motion.div
              className="h-full bg-[#FF5A1F] origin-left"
              variants={lineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
            />
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
          >
            {steps.map((step) => (
              <motion.div
                key={step.title}
                variants={stepVariants}
                className="group bg-white rounded-[16px] p-6 text-center border border-[#E7EAF0] hover:border-[#FF5A1F]/30 hover:shadow-[0_8px_25px_rgba(7,21,47,0.06)] transition-all duration-300 hover:-translate-y-1 flex flex-col items-center"
              >
                {/* Step Number Badge */}
                <span className="inline-block bg-[#07152F] text-white text-[10px] font-extrabold px-3 py-0.5 rounded-full uppercase tracking-wider mb-4 shadow-sm">
                  Step {step.num}
                </span>

                {/* Icon Container */}
                <div className="w-14 h-14 rounded-[14px] bg-[#F7F8FA] border border-[#E7EAF0] text-[#FF5A1F] flex items-center justify-center mb-4 group-hover:bg-[#FF5A1F] group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm">
                  {step.icon}
                </div>

                <h3 className="text-[17px] font-bold text-[#0B1633] mb-1.5 group-hover:text-[#FF5A1F] transition-colors duration-200">
                  {step.title}
                </h3>
                <p className="text-[#667085] text-[14px] font-normal leading-relaxed max-w-[220px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
