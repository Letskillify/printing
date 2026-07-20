import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiPhone, FiMail, FiGlobe } from 'react-icons/fi'

export function Footer({ setCurrentPage }) {
  const socialIcons = [
    { icon: <FiFacebook className="w-4 h-4" />, href: '#facebook', label: 'Facebook' },
    { icon: <FiInstagram className="w-4 h-4" />, href: '#instagram', label: 'Instagram' },
    { icon: <FiLinkedin className="w-4 h-4" />, href: '#linkedin', label: 'LinkedIn' },
    { icon: <FiTwitter className="w-4 h-4" />, href: '#twitter', label: 'Twitter' }
  ]

  const quickLinks = [
    { name: 'Home', pageId: 'home' },
    { name: 'All Products', pageId: 'products' },
    { name: 'Design Services', pageId: 'services' },
    { name: 'Templates', pageId: 'templates' },
    { name: 'About Us', pageId: 'about' },
    { name: 'Contact Us', pageId: 'contact' }
  ]

  const customerService = [
    { name: 'Help Center', pageId: 'help' },
    { name: 'Track Order', pageId: 'track' },
    { name: 'Shipping & Delivery', pageId: 'help' },
    { name: 'Returns & Refunds', pageId: 'help' },
    { name: 'Terms & Conditions', pageId: 'about' },
    { name: 'Privacy Policy', pageId: 'about' }
  ]

  const handleLink = (pageId) => {
    setCurrentPage(pageId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="bg-[#0b1426] text-white font-sans text-left pt-16 pb-8 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 pb-14 border-b border-slate-800">
          
          {/* Col 1: Logo, Brand Text, Socials */}
          <div className="lg:col-span-1 flex flex-col items-start text-left">
            {/* Logo */}
            <button onClick={() => handleLink('home')} className="flex items-center gap-2.5 mb-6 text-left border-none bg-transparent cursor-pointer">
              <div className="relative flex-shrink-0 flex items-center justify-center text-amber-500">
                <svg viewBox="0 0 100 100" className="w-[32px] h-[32px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M50 8L88 30V70L50 92L12 70V30L50 8Z" stroke="#E5AA17" strokeWidth="6" strokeLinejoin="round" />
                  <path d="M50 8L88 30L50 52L12 30L50 8Z" fill="#E5AA17" fillOpacity="0.4" stroke="#E5AA17" strokeWidth="4" />
                  <path d="M12 30L50 52V92" stroke="#E5AA17" strokeWidth="5" />
                  <path d="M88 30L50 52V92" stroke="#E5AA17" strokeWidth="5" />
                  <path d="M50 25L73 38V63L50 76L27 63V38L50 25Z" fill="#E5AA17" stroke="#E5AA17" strokeWidth="3" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[19px] font-extrabold tracking-tight text-white font-sans">
                  CreatiPrint
                </span>
                <span className="text-[8px] font-bold text-gray-400 tracking-[0.16em] mt-0.5 font-sans">
                  DESIGN & PRINTING
                </span>
              </div>
            </button>
            {/* Brand Desc */}
            <p className="text-gray-400 text-xs sm:text-[12.5px] leading-relaxed mb-6 max-w-sm">
              Your one-stop solution for all design and printing needs. We combine creativity and quality to help your business stand out.
            </p>
            {/* Social Icons */}
            <div className="flex gap-2.5">
              {socialIcons.map((soc) => (
                <a 
                  key={soc.label} 
                  href={soc.href} 
                  aria-label={soc.label}
                  className="w-9 h-9 rounded-full border border-slate-700 bg-slate-900/40 hover:bg-[#E5AA17] hover:text-slate-950 flex items-center justify-center text-gray-350 transition-all"
                >
                  {soc.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="flex flex-col items-start bg-transparent text-left">
            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] font-semibold text-gray-400 text-left">
              {quickLinks.map((link) => (
                <li key={link.name} className="text-left">
                  <button 
                    onClick={() => handleLink(link.pageId)} 
                    className="hover:text-white hover:underline transition border-none bg-transparent p-0 text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Customer Service */}
          <div className="flex flex-col items-start bg-transparent text-left">
            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-5">
              Customer Service
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] font-semibold text-gray-400 text-left">
              {customerService.map((link) => (
                <li key={link.name} className="text-left">
                  <button 
                    onClick={() => handleLink(link.pageId)}
                    className="hover:text-white hover:underline transition border-none bg-transparent p-0 text-left cursor-pointer"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="flex flex-col items-start gap-4 text-left">
            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-1">
              Contact Us
            </h4>
            <div className="space-y-4 text-xs sm:text-[13px] font-semibold text-gray-450 text-left cursor-pointer" onClick={() => handleLink('contact')}>
              <div className="flex items-start gap-2.5">
                <FiMapPin className="w-5 h-5 text-gray-500 mt-0.5 flex-shrink-0" />
                <span className="leading-snug text-gray-400">
                  123, Print Street, Design City, India - 302001
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-400">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-400 font-sans">info@creatiprint.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiGlobe className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span className="text-gray-400">www.creatiprint.com</span>
              </div>
            </div>
          </div>

          {/* Col 5: Newsletter */}
          <div className="flex flex-col items-start text-left">
            <h4 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider mb-4">
              Newsletter
            </h4>
            <p className="text-gray-400 text-xs sm:text-[13px] font-semibold mb-4 leading-relaxed text-left">
              Subscribe to get special offers and updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="w-full flex flex-col gap-2.5">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-[#162137] border border-slate-800 rounded-lg py-3 px-4 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 font-medium"
              />
              <button 
                type="submit" 
                className="w-full bg-[#E5AA17] hover:bg-[#cca118] text-slate-950 font-black text-xs sm:text-sm py-3 rounded-lg transition-all cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Footer Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-xs font-semibold text-gray-500 text-left">
          <p>© 2024 CreatiPrint. All Rights Reserved.</p>
          
          {/* Combined Payment Badges (Visa, Mastercard, RuPay, UPI, Paytm) */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="bg-white rounded px-2.5 py-1 text-[8.5px] font-black text-[#0f2187] italic tracking-wide border border-gray-250 select-none">
              VISA
            </div>
            <div className="bg-white rounded px-2 py-1 text-[8.5px] font-extrabold text-slate-800 flex items-center gap-0.5 border border-gray-250 select-none">
              <span className="w-2.5 h-2.5 rounded-full bg-[#eb001b] inline-block opacity-85"></span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f00] inline-block -ml-1.5 opacity-85"></span>
              mc
            </div>
            <div className="bg-white rounded px-2.5 py-1 text-[8.5px] font-extrabold text-[#09357a] border border-gray-200 select-none">
              RuPay
            </div>
            <div className="bg-white rounded px-2 py-1 text-[8.5px] font-extrabold text-[#0f7975] tracking-widest border border-gray-200 select-none">
              UPI
            </div>
            <div className="bg-white rounded px-2.5 py-1 text-[8.5px] font-black text-[#00b9f5] border border-gray-200 select-none">
              Paytm
            </div>
          </div>
        </div>

      </div>
    </footer>
  )
}
