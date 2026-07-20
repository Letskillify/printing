import { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiSearch, FiFileText, FiTruck, FiDollarSign, FiEdit3 } from 'react-icons/fi'

export function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')
  const [expandedFaq, setExpandedFaq] = useState(null)

  const faqCategories = [
    { name: 'All', icon: null },
    { name: 'Artwork Setup', icon: <FiEdit3 className="w-4 h-4" /> },
    { name: 'Ordering & Proofs', icon: <FiFileText className="w-4 h-4" /> },
    { name: 'Shipping & Delivery', icon: <FiTruck className="w-4 h-4" /> },
    { name: 'Payments & Refunds', icon: <FiDollarSign className="w-4 h-4" /> }
  ]

  const faqs = [
    {
      id: 1,
      category: 'Artwork Setup',
      question: 'What is a bleed margin and why is it required?',
      answer: 'A bleed margin is an extra 3mm of artwork extended beyond the final trim size of your product (such as a business card or brochure). It prevents thin, unintended white borders from appearing along final trimmed edges when big paper stack sheets are sliced by automated cutting machines.'
    },
    {
      id: 2,
      category: 'Artwork Setup',
      question: 'Why do you request CMYK color mode instead of RGB?',
      answer: 'Printing presses reproduce color using Cyan, Magenta, Yellow, and Key Black inks (CMYK). Digital screens display color using Red, Green, and Blue light waves (RGB). If files are submitted in RGB, our calibration engines convert them into CMYK, which can sometimes cause highly saturated hues to shift towards flatter colors. Designing directly in CMYK prevents this.'
    },
    {
      id: 3,
      category: 'Ordering & Proofs',
      question: 'Can I verify a proof print layout before final execution?',
      answer: 'Yes! For every print order, our pre-press team emails a digital PDF match proof highlighting safe-zone gridlines, bleed margins, and fold directions. Production only starts after you click "Approve Proof" in your account.'
    },
    {
      id: 4,
      category: 'Shipping & Delivery',
      question: 'How long does production and shipping take?',
      answer: 'Most standard products (visiting cards, pamphlets, flyers) are printed and ready for shipping in 2 to 4 business days. Custom complex structures like rigid packaging boxes take 5 to 7 days. Shipping delivery timelines range from 1 to 3 days depending on whether express courier air freight is selected.'
    },
    {
      id: 5,
      category: 'Payments & Refunds',
      question: 'Do you offer custom mockups or sample pack runs?',
      answer: 'Yes. We offer sample packs containing various paper gauges (GSM) and gloss/metallic finishes for ₹299. For larger custom packaging orders, we can manufacture a physical structurally unprinted mock prototype box for structural validation.'
    },
    {
      id: 6,
      category: 'Payments & Refunds',
      question: 'What is your refund policy on delayed shipments?',
      answer: 'If our printing loops fall behind schedule and fail to dispatch your package on or before the calendar deadline guarantee, you are eligible to claim a 100% refund. Please note, courier transit hiccups beyond our dispatch control are excluded.'
    }
  ]

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id)
  }

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCat = activeCategory === 'All' || faq.category === activeCategory
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Page Hero Header */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-gray-150 p-8 sm:p-10 mb-8 text-center sm:text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
            Knowledge Base
          </span>
          <h1 className="text-[32px] sm:text-[38px] font-black text-slate-800 tracking-tight leading-none mb-4">
            CreatiPrint Help Center
          </h1>
          <p className="text-gray-550 text-sm leading-relaxed max-w-xl">
            Learn about CMYK color profiles, adding bleed safe margins, sample pack orders, shipping guarantees, and file format resolutions.
          </p>
        </div>

        {/* Search Bar Block */}
        <div className="relative flex items-center bg-white border border-gray-250 rounded-xl py-3.5 px-4 mb-6 shadow-sm">
          <FiSearch className="text-gray-400 mr-2 w-4.5 h-4.5" />
          <input
            type="text"
            placeholder="Type keywords (e.g. bleed, CMYK, proof, shipping)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none text-xs sm:text-sm text-slate-800 placeholder-gray-500 font-semibold focus:outline-none w-full"
          />
        </div>

        {/* Category Tabs list */}
        <div className="flex gap-2 items-center overflow-x-auto pb-2 mb-8">
          {faqCategories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveCategory(cat.name)}
              className={`flex items-center gap-1.5 px-4.5 py-2.5 rounded-full text-xs font-bold transition select-none flex-shrink-0 ${
                activeCategory === cat.name
                  ? 'bg-[#E5AA17] text-slate-950 shadow-md shadow-amber-500/10'
                  : 'bg-white border border-gray-250 text-gray-700 hover:border-gray-350'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        {/* FAQ Accordions Block */}
        <div className="space-y-4">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => {
              const isExpanded = expandedFaq === faq.id
              return (
                <div 
                  key={faq.id}
                  className="bg-white rounded-xl border border-gray-150 hover:border-gray-250 transition-all overflow-hidden"
                >
                  {/* Question row clicker */}
                  <div 
                    onClick={() => toggleFaq(faq.id)} 
                    className="p-5 flex justify-between items-center cursor-pointer select-none"
                  >
                    <div className="flex flex-col text-left pr-4">
                      <span className="text-[8.5px] font-bold text-amber-500 uppercase tracking-wider mb-1">{faq.category}</span>
                      <h4 className="text-xs sm:text-sm font-black text-slate-850">{faq.question}</h4>
                    </div>
                    <span>
                      {isExpanded ? (
                        <FiChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <FiChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </span>
                  </div>

                  {/* Expand-Collapse Answer Block */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-[13px] text-gray-600 leading-relaxed text-left border-t border-gray-50 bg-slate-50/50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              )
            })
          ) : (
            <div className="bg-white rounded-xl border border-gray-150 py-16 text-center">
              <p className="text-xs text-gray-550">No FAQ articles found matching keywords. Try searching another topic.</p>
            </div>
          )}
        </div>

        {/* Call support block bottom */}
        <div className="bg-[#FAF6F0] rounded-xl border border-gray-200 p-6 mt-12 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="text-sm sm:text-base font-black text-slate-800">Still have queries?</h4>
            <p className="text-xs text-gray-500 mt-0.5 leading-relaxed font-semibold">Speak directly to prepress customer managers for help.</p>
          </div>
          <a
            href="#contact"
            className="bg-[#0b1426] hover:bg-slate-900 text-white font-black text-xs uppercase tracking-wider py-3 px-6 rounded-lg transition"
          >
            Direct Contact Form
          </a>
        </div>

      </div>
    </section>
  )
}
