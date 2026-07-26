import { useState } from 'react'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiMapPin, FiPhone, FiMail } from 'react-icons/fi'

export function Footer({ setCurrentPage }) {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleLink = (pageId) => {
    setCurrentPage(pageId)
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

  const products = [
    'Business Cards', 'Brochures & Flyers', 'Posters & Banners',
    'Stickers & Labels', 'Custom Packaging', 'Bulk Printing',
  ]
  const services = [
    'Design Services', 'Large Format Printing', 'Same Day Printing',
    'Custom Production', 'Bulk Orders',
  ]
  const company = ['About Us', 'Blog Insights', 'Careers', 'Press Kit', 'Contact Us']
  const support = ['Help Center', 'Shipping Info', 'Returns & Refunds', 'Track Order', 'Privacy Policy']

  return (
    <footer className="bg-[#07152F] text-white font-sans pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-8 pb-14 border-b border-slate-800">

          {/* Col 1 — Brand Logo & Newsletter (2 cols) */}
          <div className="lg:col-span-2 flex flex-col items-start">
            {/* Logo */}
            <button
              onClick={() => handleLink('home')}
              className="flex items-center gap-2.5 mb-4 border-none bg-transparent cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-[10px] bg-[#FF5A1F] flex items-center justify-center shadow-md shadow-[#FF5A1F]/20 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 4v3H4a2 2 0 00-2 2v7a2 2 0 002 2h1v2a1 1 0 001 1h12a1 1 0 001-1v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1zm2 0h10v3H7V4zm-3 7h16v5h-1v-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1H4v-5zm3 6v-2h10v2H7z"/>
                </svg>
              </div>
              <div className="flex flex-col leading-none text-left select-none">
                <span className="text-[22px] font-black text-white tracking-tight">
                  Printo<span className="text-[#FF5A1F]">.</span>
                </span>
                <span className="text-[8.5px] font-bold text-[#667085] tracking-[0.2em] uppercase mt-0.5">Print Studio</span>
              </div>
            </button>

            <p className="text-[#909AB0] text-[14px] font-normal leading-relaxed mb-5 max-w-sm">
              Your trusted enterprise partner for luxury print materials, custom packaging, and doorstep delivery.
            </p>

            {/* Social Icons */}
            <div className="flex gap-2.5 mb-6">
              {[
                { Icon: FiFacebook, href: '#', label: 'Facebook' },
                { Icon: FiInstagram, href: '#', label: 'Instagram' },
                { Icon: FiTwitter, href: '#', label: 'Twitter' },
                { Icon: FiLinkedin, href: '#', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8.5 h-8.5 rounded-full border border-slate-700 bg-slate-800/80 hover:bg-[#FF5A1F] hover:border-[#FF5A1F] flex items-center justify-center text-[#909AB0] hover:text-white transition-all duration-200 shadow-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            {/* Integrated Newsletter Form */}
            <p className="text-white text-[12px] font-extrabold mb-2 uppercase tracking-wider">Join VIP Newsletter</p>
            <form onSubmit={handleSubscribe} className="w-full flex flex-col gap-2 max-w-sm">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full bg-[#0B1633] border border-slate-700 rounded-[10px] py-2.5 px-3.5 text-[13px] text-white placeholder-slate-400 focus:outline-none focus:border-[#FF5A1F] font-medium transition-colors duration-200"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[13px] py-2.5 rounded-[10px] transition-all duration-200 shadow-md shadow-[#FF5A1F]/20 cursor-pointer border-none"
              >
                {subscribed ? '✓ Subscribed!' : 'Subscribe'}
              </button>
            </form>
          </div>

          {/* Col 2 — Products */}
          <div className="text-left">
            <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-4">Products</h4>
            <ul className="space-y-2.5">
              {products.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLink('products')}
                    className="text-[14px] text-[#909AB0] hover:text-[#FF5A1F] hover:translate-x-1 transition-all duration-200 border-none bg-transparent cursor-pointer p-0 text-left leading-snug font-normal block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Services */}
          <div className="text-left">
            <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLink('services')}
                    className="text-[14px] text-[#909AB0] hover:text-[#FF5A1F] hover:translate-x-1 transition-all duration-200 border-none bg-transparent cursor-pointer p-0 text-left leading-snug font-normal block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Company & Support */}
          <div className="text-left">
            <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2.5 mb-5">
              {company.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLink(item.toLowerCase().includes('about') ? 'about' : item.toLowerCase().includes('contact') ? 'contact' : 'about')}
                    className="text-[14px] text-[#909AB0] hover:text-[#FF5A1F] hover:translate-x-1 transition-all duration-200 border-none bg-transparent cursor-pointer p-0 text-left leading-snug font-normal block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
            <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-4">Support</h4>
            <ul className="space-y-2.5">
              {support.map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleLink(item.toLowerCase().includes('help') ? 'help' : item.toLowerCase().includes('track') ? 'track' : 'about')}
                    className="text-[14px] text-[#909AB0] hover:text-[#FF5A1F] hover:translate-x-1 transition-all duration-200 border-none bg-transparent cursor-pointer p-0 text-left leading-snug font-normal block"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5 — Contact Info */}
          <div className="text-left">
            <h4 className="text-[12px] font-black text-white uppercase tracking-widest mb-4">Contact Info</h4>
            <div className="space-y-3.5">
              <div className="flex items-start gap-2.5">
                <FiMapPin className="w-4 h-4 text-[#FF5A1F] mt-0.5 flex-shrink-0" />
                <span className="text-[14px] text-[#909AB0] leading-snug font-normal">123 Print Street,<br/>Indiana MP 61801</span>
              </div>
              <div className="flex items-center gap-2.5">
                <FiPhone className="w-4 h-4 text-[#FF5A1F] flex-shrink-0" />
                <a href="tel:+911234567891" className="text-[14px] text-[#909AB0] hover:text-[#FF5A1F] transition-colors duration-200 font-normal">+91 12345-67-891</a>
              </div>
              <div className="flex items-center gap-2.5">
                <FiMail className="w-4 h-4 text-[#FF5A1F] flex-shrink-0" />
                <a href="mailto:hello@printo.com" className="text-[14px] text-[#909AB0] hover:text-[#FF5A1F] transition-colors duration-200 font-normal">hello@printo.com</a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 text-[13px] font-normal text-[#667085]">
          <p>© 2024 Printo Inc. All rights reserved.</p>

          {/* Payment Method Badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center select-none">
            <div className="bg-white rounded-[6px] px-2.5 py-1 text-[9px] font-black text-[#0f2187] italic tracking-wide border border-gray-200">VISA</div>
            <div className="bg-white rounded-[6px] px-2 py-1 flex items-center gap-0.5 border border-gray-200">
              <span className="w-3 h-3 rounded-full bg-[#eb001b] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ff5f00] inline-block -ml-1.5" />
            </div>
            <div className="bg-white rounded-[6px] px-2.5 py-1 text-[9px] font-extrabold text-[#0f7975] tracking-widest border border-gray-200">UPI</div>
            <div className="bg-white rounded-[6px] px-2.5 py-1 text-[9px] font-black text-[#00b9f5] border border-gray-200">Paytm</div>
            <div className="bg-white rounded-[6px] px-2.5 py-1 text-[9px] font-extrabold text-[#09357a] border border-gray-200">RuPay</div>
          </div>
        </div>

      </div>
    </footer>
  )
}
