import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiShoppingBag, FiUser, FiChevronDown, FiTruck, FiShield, FiCheckCircle } from 'react-icons/fi'

export function Navbar({ currentPage, setCurrentPage, cartCount }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (pageId) => {
    setCurrentPage(pageId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const productCategories = [
    'Business Cards', 'Brochures & Flyers', 'Posters & Banners',
    'Stickers & Labels', 'Packaging', 'Stationery', 'Photo Printing'
  ]

  return (
    <header className="w-full font-sans sticky top-0 z-50 transition-all duration-300">

      {/* ── Top Announcement Bar (Deep Navy: #07152F) ── */}
      <div className="bg-[#07152F] text-white text-[11px] font-medium py-1.5 px-3 sm:px-4 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
          {/* Left badges (Show single compact highlight on mobile, all on sm+) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 opacity-95">
              <FiTruck className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="font-bold text-[#FF5A1F]">Fast Delivery</span>
              <span className="text-[#667085] hidden xs:inline sm:inline">3-5 days</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-95">
              <FiCheckCircle className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="font-bold text-[#FF5A1F]">100% Quality</span>
              <span className="text-[#667085]">Guaranteed</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 opacity-95">
              <FiShield className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="font-bold text-[#FF5A1F]">Secure Payment</span>
              <span className="text-[#667085]">100% safe</span>
            </span>
          </div>
          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            <button
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors duration-200 border-none bg-transparent cursor-pointer text-[10.5px] sm:text-[11px] font-medium"
            >
              <FiUser className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF5A1F]" /> My Account
            </button>
            <button
              onClick={() => handleLinkClick('products')}
              className="flex items-center gap-1 text-slate-300 hover:text-white transition-colors duration-200 border-none bg-transparent cursor-pointer text-[10.5px] sm:text-[11px] font-medium"
            >
              <FiShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#FF5A1F]" /> Cart ({cartCount})
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <div className={`bg-white/95 backdrop-blur-md transition-all duration-300 border-b ${
        isScrolled ? 'py-2.5 shadow-[0_4px_20px_rgba(7,21,47,0.06)] border-[#E7EAF0]' : 'py-3.5 border-[#E7EAF0]'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 border-none bg-transparent cursor-pointer flex-shrink-0 group"
          >
            <div className="w-9 h-9 rounded-[10px] bg-[#FF5A1F] flex items-center justify-center shadow-md shadow-[#FF5A1F]/20 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 4v3H4a2 2 0 00-2 2v7a2 2 0 002 2h1v2a1 1 0 001 1h12a1 1 0 001-1v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1zm2 0h10v3H7V4zm-3 7h16v5h-1v-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1H4v-5zm3 6v-2h10v2H7z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none select-none text-left">
              <span className="text-[22px] font-black text-[#0B1633] tracking-tight">
                Printo<span className="text-[#FF5A1F]">.</span>
              </span>
              <span className="text-[8.5px] font-bold text-[#667085] tracking-[0.2em] uppercase mt-0.5">Print Studio</span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home Link */}
            <button
              onClick={() => handleLinkClick('home')}
              className={`relative px-4 py-2 text-[14px] font-semibold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'home' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'home' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleLinkClick('products')}
                className={`relative flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold transition-colors duration-200 border-none cursor-pointer ${
                  currentPage === 'products' ? 'text-[#FF5A1F]' : 'text-[#0B1633] group-hover:text-[#FF5A1F]'
                }`}
              >
                Products
                <FiChevronDown className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#FF5A1F] transition-transform duration-200 group-hover:rotate-180" />
                <span className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                  currentPage === 'products' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
                }`} />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1.5 w-56 bg-white border border-[#E7EAF0] rounded-[14px] shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleLinkClick('products')}
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2.5 text-[13px] font-medium text-[#0B1633] hover:bg-[#F7F8FA] hover:text-[#FF5A1F] transition-colors duration-150 border-none bg-transparent cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] flex-shrink-0 opacity-60" />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <button
              onClick={() => handleLinkClick('services')}
              className={`relative px-4 py-2 text-[14px] font-semibold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'services' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'services' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* Templates */}
            <button
              onClick={() => handleLinkClick('templates')}
              className={`relative flex items-center gap-1.5 px-4 py-2 text-[14px] font-semibold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'templates' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Templates
              <FiChevronDown className="w-3.5 h-3.5 text-[#667085] group-hover:text-[#FF5A1F] transition-colors" />
              <span className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'templates' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* About */}
            <button
              onClick={() => handleLinkClick('about')}
              className={`relative px-4 py-2 text-[14px] font-semibold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'about' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              About Us
              <span className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'about' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* Contact */}
            <button
              onClick={() => handleLinkClick('contact')}
              className={`relative px-4 py-2 text-[14px] font-semibold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'contact' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Contact Us
              <span className={`absolute bottom-0 left-4 right-4 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'contact' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>
          </nav>

          {/* Right Action Button */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('products')}
              className="inline-flex items-center gap-2 bg-[#FF5A1F] hover:bg-[#e44d15] hover:brightness-105 text-white font-extrabold text-[14px] px-5 py-2.5 rounded-[12px] transition-all duration-250 shadow-md shadow-[#FF5A1F]/20 hover:shadow-lg hover:shadow-[#FF5A1F]/30 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] cursor-pointer border-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
              </svg>
              Upload / Design Now
            </button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-[#0B1633] cursor-pointer rounded-lg hover:bg-[#F7F8FA] transition-colors border-none bg-transparent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E7EAF0] shadow-xl px-4 py-4 space-y-1.5 z-40">
          {[
            { label: 'Home', page: 'home' },
            { label: 'Products', page: 'products' },
            { label: 'Services', page: 'services' },
            { label: 'Templates', page: 'templates' },
            { label: 'About Us', page: 'about' },
            { label: 'Contact Us', page: 'contact' },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleLinkClick(page)}
              className={`block w-full text-left px-4 py-2.5 text-[14px] font-semibold rounded-[10px] transition-colors border-none cursor-pointer ${
                currentPage === page ? 'text-[#FF5A1F] bg-[#FF5A1F]/10' : 'text-[#0B1633] bg-transparent hover:bg-[#F7F8FA]'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('products')}
              className="flex items-center justify-center gap-2 w-full bg-[#FF5A1F] text-white font-extrabold text-[14px] px-5 py-3 rounded-[12px] border-none cursor-pointer shadow-md shadow-[#FF5A1F]/20"
            >
              Upload / Design Now
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
