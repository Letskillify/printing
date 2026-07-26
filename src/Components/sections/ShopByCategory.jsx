import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export function ShopByCategory({ setCurrentPage }) {
  const prefersReducedMotion = useReducedMotion()

  const handleLink = () => {
    if (setCurrentPage) setCurrentPage('products')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const categories = [
    {
      name: 'Business Cards',
      sub: 'Premium quality cards with foil & matte finishes',
      img: 'https://images.unsplash.com/photo-1612831819695-7e71f5ccf16c?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Brochures & Flyers',
      sub: 'Professional marketing & tri-fold materials',
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Posters & Banners',
      sub: 'Large format outdoor & event displays',
      img: 'https://images.unsplash.com/photo-1608502374980-67d5c35a5302?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Invitations & Cards',
      sub: 'Special occasions & luxury embossed cards',
      img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Stickers & Labels',
      sub: 'Custom die-cut vinyl & roll labels',
      img: 'https://images.unsplash.com/photo-1591981730169-05e8e57a7c04?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Custom Packaging',
      sub: 'Custom mailer boxes, pouches & packaging',
      img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Stationery',
      sub: 'Branded letterheads, envelopes & notebooks',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    },
    {
      name: 'Photo Printing',
      sub: 'High quality prints & canvas frames',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
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
    <section className="py-20 bg-[#F7F8FA] font-sans border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-[#FF5A1F] text-xs font-extrabold tracking-widest uppercase mb-2 block">
              Explore Our Collection
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1633] tracking-tight">
              Shop by Category
            </h2>
            <p className="text-[#667085] text-[15px] font-normal mt-2 max-w-xl leading-relaxed">
              Explore our wide range of premium printing products engineered for high precision and vibrant colors.
            </p>
          </div>

          <button
            onClick={handleLink}
            className="inline-flex items-center gap-2 text-[14px] font-extrabold text-[#FF5A1F] hover:text-[#e44d15] border-none bg-transparent cursor-pointer group"
          >
            View All Products
            <FiArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
          </button>
        </div>

        {/* 4x2 Category Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {categories.map((cat) => (
            <motion.button
              key={cat.name}
              variants={cardVariants}
              onClick={handleLink}
              className="group relative bg-white rounded-[16px] overflow-hidden border border-[#E7EAF0] hover:border-[#FF5A1F]/40 hover:shadow-[0_12px_30px_rgba(7,21,47,0.08)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] text-left cursor-pointer p-0 flex flex-col justify-between hover:-translate-y-1.5"
            >
              {/* Image Container */}
              <div className="relative overflow-hidden h-[170px] w-full bg-[#F7F8FA]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#07152F]/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
              </div>

              {/* Text Area */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-bold text-[#0B1633] group-hover:text-[#FF5A1F] transition-colors duration-200 leading-snug mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[#667085] text-[14px] font-normal leading-relaxed">
                    {cat.sub}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#E7EAF0] flex items-center justify-between text-[13px] font-bold text-[#FF5A1F]">
                  <span>Explore Products</span>
                  <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
