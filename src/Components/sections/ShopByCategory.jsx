import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiCreditCard, FiBookOpen, FiTv, FiGift, FiTag, FiBox, FiFileText, FiImage, FiPackage } from 'react-icons/fi'
import { subscribeToHomepageSettings, DEFAULT_HOMEPAGE_SETTINGS } from '../../services/firebase'

const getIconByName = (name) => {
  const map = {
    FiCreditCard: <FiCreditCard className="w-5 h-5 text-[#FF5A1F]" />,
    FiBookOpen: <FiBookOpen className="w-5 h-5 text-[#FF5A1F]" />,
    FiTv: <FiTv className="w-5 h-5 text-[#FF5A1F]" />,
    FiGift: <FiGift className="w-5 h-5 text-[#FF5A1F]" />,
    FiTag: <FiTag className="w-5 h-5 text-[#FF5A1F]" />,
    FiBox: <FiBox className="w-5 h-5 text-[#FF5A1F]" />,
    FiFileText: <FiFileText className="w-5 h-5 text-[#FF5A1F]" />,
    FiImage: <FiImage className="w-5 h-5 text-[#FF5A1F]" />,
  };
  return map[name] || <FiPackage className="w-5 h-5 text-[#FF5A1F]" />;
};

export function ShopByCategory({ setCurrentPage }) {
  const prefersReducedMotion = useReducedMotion()
  const [sectionData, setSectionData] = useState(DEFAULT_HOMEPAGE_SETTINGS.categoriesSection)

  useEffect(() => {
    const handleUpdateEvent = () => {
      try {
        const stored = localStorage.getItem('printigly_homepage_settings');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (parsed.categoriesSection) setSectionData(parsed.categoriesSection);
        }
      } catch (e) {}
    };

    const unsubscribe = subscribeToHomepageSettings((data) => {
      if (data && data.categoriesSection) {
        setSectionData(data.categoriesSection);
      }
    });

    window.addEventListener('homepage_settings_updated', handleUpdateEvent);
    return () => {
      unsubscribe();
      window.removeEventListener('homepage_settings_updated', handleUpdateEvent);
    };
  }, []);

  const handleLink = () => {
    if (setCurrentPage) setCurrentPage('products')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
    <section className="py-16 sm:py-20 bg-[#F7F8FA] font-sans border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#FF5A1F] text-xs font-extrabold tracking-widest uppercase">
                {sectionData.badgeText || "EXPLORE OUR COLLECTION"}
              </span>
              <span className="h-[2px] w-8 bg-[#FF5A1F] inline-block rounded-full" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] inline-block" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-[38px] font-bold text-[#0B1633] tracking-tight">
              {sectionData.headingLine1 || "Shop by"} <span className="text-[#FF5A1F]">{sectionData.headingHighlight || "Category"}</span>
            </h2>
            <p className="text-[#667085] text-[16px] sm:text-[17px] font-normal mt-2 max-w-xl leading-relaxed">
              {sectionData.description || "Explore our wide range of premium printing products engineered for high precision and vibrant colors."}
            </p>
          </div>

          <button
            onClick={handleLink}
            className="inline-flex items-center gap-2.5 text-[14px] font-bold text-[#FF5A1F] hover:text-[#e44d15] border-none bg-transparent cursor-pointer group"
          >
            <span>View All Products</span>
            <div className="w-8 h-8 rounded-full bg-white border border-[#E7EAF0] shadow-sm flex items-center justify-center group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F] transition-all duration-250">
              <FiArrowRight className="w-4 h-4 text-[#FF5A1F] group-hover:text-white transition-colors duration-250 transform group-hover:translate-x-0.5" />
            </div>
          </button>
        </div>

        {/* Dynamic Category Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {(sectionData.categories || []).map((cat, idx) => (
            <motion.button
              key={cat.id || idx}
              variants={cardVariants}
              onClick={handleLink}
              className="group relative bg-white rounded-[20px] p-3.5 border border-[#E7EAF0] hover:border-[#FF5A1F]/50 hover:shadow-[0_14px_35px_rgba(7,21,47,0.08)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] text-left cursor-pointer flex flex-col justify-between hover:-translate-y-1.5 border-t-[3px] border-t-[#FF5A1F]"
            >
              {/* Inner Image Area with Top-Left Floating Badge Icon */}
              <div className="relative overflow-hidden h-[165px] w-full rounded-[14px] bg-[#F7F8FA]">
                <img
                  src={cat.img}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
                
                {/* Floating Top-Left Circle Icon Badge */}
                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md border border-[#E7EAF0] shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  {getIconByName(cat.iconName)}
                </div>
              </div>

              {/* Text Area */}
              <div className="pt-4 px-1 pb-1 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[18px] font-bold text-[#0B1633] group-hover:text-[#FF5A1F] transition-colors duration-200 leading-snug mb-1">
                    {cat.name}
                  </h3>
                  <p className="text-[#667085] text-[14.5px] font-normal leading-relaxed">
                    {cat.sub}
                  </p>
                </div>

                {/* Footer Action Bar with Arrow Button */}
                <div className="mt-4 pt-3.5 border-t border-[#F0F2F5] flex items-center justify-between">
                  <span className="text-[13px] font-bold text-[#FF5A1F] group-hover:text-[#e44d15] transition-colors">
                    Explore Products
                  </span>
                  <div className="w-7 h-7 rounded-full bg-white border border-[#E7EAF0] shadow-xs flex items-center justify-center group-hover:bg-[#FF5A1F] group-hover:border-[#FF5A1F] transition-all duration-250">
                    <FiArrowRight className="w-3.5 h-3.5 text-[#FF5A1F] group-hover:text-white transition-colors duration-250 transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

