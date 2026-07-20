import { useState } from 'react'
import { FiCheck, FiMail, FiMapPin, FiPhone, FiSend, FiClock } from 'react-icons/fi'

export function ContactPage() {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleContactSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', subject: '', message: '' })
    }, 2500)
  }

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Hero Header */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-gray-150 p-8 sm:p-10 mb-10 text-center sm:text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
            Get In Touch
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-black text-slate-800 tracking-tight leading-none mb-4">
            Connect With CreatiPrint Studio
          </h1>
          <p className="text-gray-550 text-sm sm:text-base max-w-2xl leading-relaxed">
            Need layout approvals, bulk discounts updates, or packaging material specifications? Send us a message. Our team resolves emails in 2-4 hours.
          </p>
        </div>

        {/* Form and Contact Details Dual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Leftside: Message form template */}
          <div className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8">
            {submitted ? (
              <div className="py-16 text-center">
                <span className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
                  <FiCheck className="w-6 h-6 stroke-[3]" />
                </span>
                <h3 className="text-lg font-black text-slate-800">Message Dispatched!</h3>
                <p className="text-xs text-gray-500 mt-1">Our pre-press support team will confirm receipt via email shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-5">
                <h3 className="text-lg font-black text-slate-850 border-b border-gray-100 pb-3 block">Send a Message</h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">First & Last Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Rachel Green" 
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-250 focus:border-[#E5AA17] focus:bg-white rounded-lg p-3 text-xs text-slate-850 font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">Contact Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="e.g. rachel@store.com" 
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-slate-50 border border-gray-250 focus:border-[#E5AA17] focus:bg-white rounded-lg p-3 text-xs text-slate-850 font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">Message Subject</label>
                  <input 
                    required 
                    type="text" 
                    placeholder="e.g. Query on Custom Brochures layout design or packaging paper depth" 
                    value={formState.subject}
                    onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-250 focus:border-[#E5AA17] focus:bg-white rounded-lg p-3 text-xs text-slate-850 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-black uppercase tracking-wider text-gray-500 mb-1.5">Write Your Message</label>
                  <textarea 
                    required 
                    rows={5}
                    placeholder="Explain details of your query..." 
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-slate-50 border border-gray-250 focus:border-[#E5AA17] focus:bg-white rounded-lg p-3 text-xs text-slate-850 leading-relaxed font-normal"
                  />
                </div>

                <div>
                  <button 
                    type="submit" 
                    className="w-full bg-[#E5AA17] hover:bg-[#cca118] text-slate-950 font-black uppercase tracking-wider py-3.5 rounded-lg transition-all shadow-md shadow-amber-500/10 flex items-center justify-center gap-1.5"
                  >
                    Send Message <FiSend className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Rightside: Details Cards + Google Map schematic */}
          <div className="space-y-6">
            
            {/* Store Information cards */}
            <div className="bg-white rounded-2xl border border-gray-150 p-6 space-y-5">
              <h3 className="text-base font-black text-slate-800 border-b border-gray-100 pb-3 block">Corporate Channels</h3>
              
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#E5AA17] flex-shrink-0 mt-0.5">
                  <FiMapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Studio Headquarters</span>
                  <p className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-0.5 leading-snug">
                    123, Print Street, Design City, India - 302001
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#E5AA17] flex-shrink-0 mt-0.5">
                  <FiPhone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Hotline Support</span>
                  <p className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-0.5 leading-none">
                    +91 98765 43210
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#E5AA17] flex-shrink-0 mt-0.5">
                  <FiMail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">General Mailbox Address</span>
                  <p className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-0.5 leading-none">
                    info@creatiprint.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-[#E5AA17] flex-shrink-0 mt-0.5">
                  <FiClock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Operational Hours</span>
                  <p className="text-xs sm:text-[13px] text-slate-700 font-semibold mt-0.5 leading-none">
                    Mon - Sat: 9:00 AM to 7:00 PM IST
                  </p>
                </div>
              </div>
            </div>

            {/* Schematic Vector Map simulation */}
            <div className="bg-[#0b1426] text-white rounded-2xl p-6 h-60 flex flex-col justify-between relative overflow-hidden border border-slate-900 select-none">
              
              {/* Grid map vector lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg viewBox="0 0 200 120" className="w-full h-full fill-none stroke-white stroke-[0.5] font-sans">
                  <line x1="20" y1="0" x2="20" y2="120" />
                  <line x1="60" y1="0" x2="60" y2="120" />
                  <line x1="100" y1="0" x2="100" y2="120" />
                  <line x1="160" y1="0" x2="160" y2="120" />
                  <line x1="0" y1="30" x2="200" y2="30" />
                  <line x1="0" y1="70" x2="200" y2="70" />
                  
                  {/* Diagonal street path representation */}
                  <path d="M-10,10 H60 L100,60 L210,60" stroke="#E5AA17" strokeWidth="4" className="opacity-40" />
                </svg>
              </div>

              <span className="text-[9px] font-bold text-gray-400 tracking-wider uppercase block">CreatiPrint Map Outline</span>

              {/* Pin representation */}
              <div className="mx-auto flex flex-col items-center z-10 relative">
                <span className="w-12 h-12 rounded-full bg-slate-900 border border-[#E5AA17] flex items-center justify-center shadow-lg animate-bounce duration-1000">
                  <FiMapPin className="w-5 h-5 text-[#E5AA17]" />
                </span>
                <span className="text-xs font-black block mt-2 text-white bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800">CreatiPrint HQ</span>
              </div>

              <div className="flex justify-between items-center text-[10px] text-gray-400 font-bold z-10">
                <span>Latitude: 26.9124° N</span>
                <span>Longitude: 75.7873° E</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
