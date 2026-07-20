import { useState } from 'react'
import { FiCheck, FiMail, FiMessageSquare } from 'react-icons/fi'

export function ServicesPage() {
  const [selectedService, setSelectedService] = useState('Logo Design')
  const [formData, setFormData] = useState({ name: '', email: '', details: '', files: null })
  const [formSubmitted, setFormSubmitted] = useState(false)

  const designServices = [
    {
      name: 'Logo Design',
      price: '₹1,499',
      delivery: '3-4 Days',
      includes: ['3 Unique Initial Proposals', 'Vector Print-Ready Output', 'Full Brand Guidelines', 'Unlimited Revisions'],
      iconMarkup: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#E5AA17]" fill="currentColor">
          <circle cx="50" cy="50" r="42" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" />
          <text x="50" y="58" fontStyle="italic" fontWeight="1000" fontSize="26" textAnchor="middle" fill="currentColor">Cp</text>
        </svg>
      )
    },
    {
      name: 'Brand Stationery Bundle',
      price: '₹4,999',
      delivery: '5-7 Days',
      includes: ['Custom Card & Brochure Layout', 'Envelope & Bill Book layout', 'Social Cover Arts', 'Print-Perfect Bleed calibrators'],
      iconMarkup: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#E5AA17]" fill="currentColor">
          <rect x="15" y="20" width="70" height="60" rx="4" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" />
          <line x1="25" y1="35" x2="75" y2="35" stroke="currentColor" strokeWidth="3" />
          <line x1="25" y1="48" x2="60" y2="48" stroke="currentColor" strokeWidth="3" />
          <line x1="25" y1="61" x2="45" y2="61" stroke="currentColor" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Bleed Check & File Correction',
      price: '₹350',
      delivery: '24 Hours',
      includes: ['Color conversions to CMYK', '3mm Bleed alignment and margins', 'DPI scaling checks and adjustments', 'Printability validation certificate'],
      iconMarkup: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#E5AA17]" fill="currentColor">
          <rect x="20" y="20" width="60" height="60" rx="3" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" strokeDasharray="6 4" />
          <circle cx="50" cy="50" r="10" fill="currentColor" />
          <path d="M50 25 V75 M25 50 H75" stroke="currentColor" strokeWidth="3" />
        </svg>
      )
    },
    {
      name: 'Custom Structure Die-Cut Design',
      price: '₹2,999',
      delivery: '4-5 Days',
      includes: ['Custom box structural folding blueprint', 'Prototype fold instructions', 'Dieline handoff in vector (PDF/AI)', 'Calibrated dimensions check'],
      iconMarkup: (
        <svg viewBox="0 0 100 100" className="w-12 h-12 text-[#E5AA17]" fill="currentColor">
          <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" strokeWidth="3" strokeDasharray="4 3" />
          <line x1="10" y1="30" x2="90" y2="70" stroke="currentColor" strokeWidth="3" strokeDasharray="4 3" />
        </svg>
      )
    }
  ]

  const onHandleSubmit = (e) => {
    e.preventDefault()
    setFormSubmitted(true)
    setTimeout(() => {
      setFormSubmitted(false)
      setFormData({ name: '', email: '', details: '', files: null })
    }, 2000)
  }

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner Hero */}
        <div className="bg-[#0b1426] rounded-2xl p-8 sm:p-10 mb-12 text-white relative overflow-hidden">
          <div className="absolute right-[5%] bottom-[-20%] opacity-10 pointer-events-none hidden md:block">
            <svg viewBox="0 0 200 200" className="w-80 h-80 text-white" fill="currentColor">
              <polygon points="100,5 195,50 195,150 100,195 5,150 5,50" />
            </svg>
          </div>
          
          <div className="max-w-2xl text-left z-10 relative">
            <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
              Specialist Art Studio
            </span>
            <h1 className="text-[32px] sm:text-[40px] font-black text-white tracking-tight leading-none mb-4">
              Professional Artwork Services
            </h1>
            <p className="text-gray-300 text-xs sm:text-base leading-relaxed">
              Don't compromise on visual layouts. Connect directly with our certified graphic artists to check, prepare, or structure your brand packaging details for offset printing.
            </p>
          </div>
        </div>

        {/* Services offerings cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {designServices.map((srv) => (
            <div 
              key={srv.name}
              className="bg-white rounded-2xl border border-gray-150 p-6 flex flex-col justify-between hover:shadow-md hover:border-gray-250 transition-all duration-300 group"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  {srv.iconMarkup}
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Est. Cost</span>
                    <span className="text-2xl font-black text-slate-800">{srv.price}</span>
                  </div>
                </div>
                
                <h3 className="text-[16px] sm:text-lg font-black text-slate-850 mb-1.5 group-hover:text-[#E5AA17] transition-colors">
                  {srv.name}
                </h3>
                <span className="text-[10.5px] uppercase font-bold tracking-wider text-amber-500 bg-amber-50 px-2 py-0.5 rounded inline-block mb-4">
                  Delivery: {srv.delivery}
                </span>
                
                {/* Lists */}
                <ul className="space-y-2.5 text-xs text-gray-650 font-semibold border-t border-gray-50 pt-4">
                  {srv.includes.map((incl) => (
                    <li key={incl} className="flex items-start gap-2">
                      <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <FiCheck className="w-2.5 h-2.5 stroke-[3]" />
                      </span>
                      <span className="leading-snug">{incl}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <button 
                onClick={() => {
                  setSelectedService(srv.name)
                  document.querySelector('#brief-form')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="mt-8 w-full border border-gray-200 hover:border-[#E5AA17] hover:bg-[#E5AA17] hover:text-slate-950 text-xs font-black uppercase tracking-wider py-3 rounded-lg transition"
              >
                Hire Designer
              </button>
            </div>
          ))}
        </div>

        {/* Process workflow description */}
        <div className="bg-white rounded-2xl border border-gray-150 p-8 mb-16 text-left">
          <h3 className="text-lg font-black text-slate-850 mb-8 border-b border-gray-100 pb-3">Creative Collaboration Workflow</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">1</span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800">Submit Layout Brief</h4>
                <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed">Fill custom briefing form showing specs requirements</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">2</span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800">Direct Chat Revision</h4>
                <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed">Chat options file drafts review cycles directly</p>
              </div>
            </div>
            <div className="flex gap-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs">3</span>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-slate-800">Print Preparation Handoff</h4>
                <p className="text-[11.5px] text-gray-500 mt-1 leading-relaxed font-sans">Final layouts saved under client account for printing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Designer brief intake form */}
        <div id="brief-form" className="bg-[#FAF6F0] rounded-2.5xl border border-gray-150 p-6 sm:p-10 text-left max-w-2xl mx-auto">
          {formSubmitted ? (
            <div className="py-12 text-center">
              <span className="w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/10">
                <FiCheck className="w-6 h-6 stroke-[3]" />
              </span>
              <h3 className="text-lg font-black text-slate-800">Brief Submitted Successfully!</h3>
              <p className="text-xs text-gray-500 mt-1">Our lead artist designer will email you in 2-4 hours to schedule setup.</p>
            </div>
          ) : (
            <form onSubmit={onHandleSubmit} className="space-y-5">
              <div className="border-b border-gray-200 pb-3 block">
                <span className="flex items-center gap-1.5 text-[#E5AA17] font-bold text-xs uppercase tracking-wider mb-2">
                  <FiMessageSquare className="w-4 h-4" /> Brief Intake
                </span>
                <h3 className="text-lg font-black text-slate-800">Send Custom Design Brief</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-500 tracking-wider mb-1.5">Your Name</label>
                  <input 
                    required 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe" 
                    className="w-full bg-white border border-gray-250 focus:border-[#E5AA17] rounded-lg p-3 text-xs text-slate-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-gray-500 tracking-wider mb-1.5">Business Email</label>
                  <input 
                    required 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@business.com" 
                    className="w-full bg-white border border-gray-250 focus:border-[#E5AA17] rounded-lg p-3 text-xs text-slate-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-gray-500 tracking-wider mb-1.5">Selected Package</label>
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="w-full bg-white border border-gray-250 focus:border-[#E5AA17] rounded-lg p-3 text-xs text-slate-850 font-bold"
                >
                  <option>Logo Design</option>
                  <option>Brand Stationery Bundle</option>
                  <option>Bleed Check & File Correction</option>
                  <option>Custom Structure Die-Cut Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-gray-500 tracking-wider mb-1.5">Project Brief & Details</label>
                <textarea 
                  required 
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Explain details about your branding goals, color palette preferences, or sizes required..." 
                  className="w-full bg-white border border-gray-250 focus:border-[#E5AA17] rounded-lg p-3 text-xs text-slate-850 font-normal leading-relaxed"
                />
              </div>

              <div>
                <button 
                  type="submit" 
                  className="w-full bg-[#E5AA17] hover:bg-[#cca118] text-slate-950 font-black uppercase tracking-wider py-3.5 rounded-lg transition"
                >
                  Send Brief Handoff <FiMail className="inline ml-1 w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  )
}
