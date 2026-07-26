import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiMail, FiCheck } from 'react-icons/fi'

export function LatestBlog({ setCurrentPage }) {
  const prefersReducedMotion = useReducedMotion()
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleLink = (page) => {
    if (setCurrentPage) setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 3000)
    }
  }

  const posts = [
    {
      tag: 'Design Tips',
      title: '5 Tips for Designing Perfect Business Cards',
      desc: 'Learn key font pairings, color bleed rules, and luxury paper stocks that make your business cards stand out.',
      date: 'Jan 15, 2024',
      img: 'https://images.unsplash.com/photo-1612831819695-7e71f5ccf16c?auto=format&fit=crop&q=80&w=600',
    },
    {
      tag: 'Printing',
      title: 'How Quality Printing Boosts Your Brand Image',
      desc: 'Discover why high-tactile print collateral drives higher enterprise client conversion and builds lasting trust.',
      date: 'Jan 10, 2024',
      img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=600',
    },
    {
      tag: 'Paper Guide',
      title: 'Choosing the Right Paper for Your Print Projects',
      desc: 'A complete breakdown of GSM weights, matte vs gloss coatings, and eco-friendly recycled stocks.',
      date: 'Jan 05, 2024',
      img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
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
    <section className="py-20 bg-[#F7F8FA] font-sans border-b border-[#E7EAF0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-12 text-left">
          <span className="text-[#FF5A1F] text-xs font-extrabold tracking-widest uppercase mb-2 block">
            Print Insights & News
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B1633] tracking-tight">
            Latest from Blog
          </h2>
          <p className="text-[#667085] text-[15px] font-normal mt-2 max-w-xl leading-relaxed">
            Stay updated with printing tips, paper guides, and design inspiration from industry experts.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          
          {/* Blog Post Cards (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {posts.map((post) => (
              <motion.article
                key={post.title}
                variants={cardVariants}
                className="group cursor-pointer rounded-[16px] overflow-hidden border border-[#E7EAF0] hover:border-[#FF5A1F]/40 hover:shadow-[0_12px_30px_rgba(7,21,47,0.06)] transition-all duration-350 ease-[cubic-bezier(0.22,1,0.36,1)] bg-white flex flex-col justify-between hover:-translate-y-1"
                onClick={() => handleLink('about')}
              >
                <div>
                  {/* Dominant Image Container */}
                  <div className="relative h-[170px] overflow-hidden bg-slate-100">
                    <img
                      src={post.img}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-350 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    />
                    <span className="absolute top-3 left-3 bg-[#FF5A1F] text-white text-[11px] font-extrabold px-3 py-0.5 rounded-full shadow-sm">
                      {post.tag}
                    </span>
                  </div>

                  {/* Body Metadata & Content */}
                  <div className="p-5">
                    <p className="text-[12px] text-[#667085] font-semibold mb-2">{post.date}</p>
                    <h3 className="text-[17px] font-bold text-[#0B1633] mb-2 leading-snug group-hover:text-[#FF5A1F] transition-colors duration-200 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#667085] text-[14px] font-normal leading-relaxed line-clamp-3 mb-4">
                      {post.desc}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button className="text-[#FF5A1F] text-[13px] font-extrabold flex items-center gap-1.5 group-hover:gap-2.5 transition-all duration-250 border-none bg-transparent cursor-pointer p-0">
                    Read Article <FiArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter Card (4 cols) — Deep Navy #07152F */}
          <motion.div variants={cardVariants} className="lg:col-span-4">
            <div className="bg-[#07152F] text-white rounded-[20px] p-7 border border-slate-800 shadow-xl h-full flex flex-col justify-between relative overflow-hidden">
              
              {/* Subtle Ambient Lighting */}
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#FF5A1F]/15 blur-2xl pointer-events-none" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-[12px] bg-white/10 border border-white/15 flex items-center justify-center mb-5 text-[#FF5A1F]">
                  <FiMail className="w-6 h-6 text-[#FF5A1F]" />
                </div>
                <h3 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                  Stay Updated
                </h3>
                <p className="text-[#909AB0] text-[14px] font-normal leading-relaxed mb-6">
                  Subscribe to our newsletter for exclusive offers, free print sample kits, and design tips.
                </p>

                <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full bg-[#0B1633] border border-slate-700/80 rounded-[10px] py-3 px-3.5 text-[14px] text-white placeholder-slate-400 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition-all duration-200 font-medium"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[14px] py-3.5 rounded-[10px] transition-all duration-200 shadow-md shadow-[#FF5A1F]/20 hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border-none flex items-center justify-center gap-2"
                  >
                    {subscribed ? (
                      <>
                        <FiCheck className="w-4 h-4" /> Subscribed!
                      </>
                    ) : (
                      'Subscribe'
                    )}
                  </button>
                </form>
              </div>

              <div className="relative z-10 text-[11px] text-[#667085] text-center mt-6 font-medium">
                🔒 No spam. Unsubscribe anytime.
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
