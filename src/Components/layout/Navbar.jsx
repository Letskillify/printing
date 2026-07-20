import { useState } from 'react'
import { FiClock, FiHelpCircle, FiShoppingBag, FiTruck, FiUser, FiChevronDown, FiMenu, FiX, FiCheck } from 'react-icons/fi'

export function Navbar({ currentPage, setCurrentPage, cartCount, darkMode, onToggleDark }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLinkClick = (pageId) => {
    setCurrentPage(pageId)
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }

  return (
    <header className="w-full bg-white font-sans sticky top-0 z-50 shadow-sm">
      {/* Top Banner (Navy Blue) */}
      <div className="bg-[#0b1426] text-white text-[11px] font-medium py-2 px-4 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Leftside Info */}
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <span className="flex items-center gap-1.5 opacity-90 cursor-pointer hover:opacity-100" onClick={() => handleLinkClick('home')}>
              <svg className="w-3.5 h-3.5 text-white" strokeWidth="2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              High Quality Printing
            </span>
            <span className="flex items-center gap-1.5 opacity-90 cursor-pointer hover:opacity-100" onClick={() => handleLinkClick('products')}>
              <FiTruck className="w-3.5 h-3.5 text-white" />
              Fast Delivery
            </span>
            <span className="flex items-center gap-1.5 opacity-90 cursor-pointer hover:opacity-100" onClick={() => handleLinkClick('about')}>
              <svg className="w-3.5 h-3.5 text-white" strokeWidth="2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              100% Satisfaction
            </span>
          </div>
          {/* Rightside Info */}
          <div className="flex items-center gap-5">
            <button 
              onClick={() => handleLinkClick('help')} 
              className={`flex items-center gap-1.5 opacity-90 hover:opacity-100 transition cursor-pointer ${currentPage === 'help' && 'text-[#E5AA17]'}`}
            >
              <FiHelpCircle className="w-3.5 h-3.5" />
              Help Center
            </button>
            <button 
              onClick={() => handleLinkClick('track')} 
              className={`flex items-center gap-1.5 opacity-90 hover:opacity-100 transition cursor-pointer ${currentPage === 'track' && 'text-[#E5AA17]'}`}
            >
              <FiClock className="w-3.5 h-3.5" />
              Track Order
            </button>
            <button 
              onClick={() => handleLinkClick('contact')} 
              className="flex items-center gap-1.5 opacity-90 hover:opacity-100 transition cursor-pointer"
            >
              <FiUser className="w-3.5 h-3.5" />
              Login / Sign Up
            </button>
          </div>
        </div>
      </div>

      {/* Main Header / Navbar */}
      <div className="border-b border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Brand Logo */}
          <button onClick={() => handleLinkClick('home')} className="flex items-center gap-2.5 text-left border-none bg-transparent cursor-pointer">
            <div className="relative flex-shrink-0 flex items-center justify-center text-amber-500">
              <svg viewBox="0 0 100 100" className="w-[38px] h-[38px]" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 8L88 30V70L50 92L12 70V30L50 8Z" stroke="#E5AA17" strokeWidth="6" strokeLinejoin="round" />
                <path d="M50 8L88 30L50 52L12 30L50 8Z" fill="#E5AA17" fillOpacity="0.4" stroke="#E5AA17" strokeWidth="4" />
                <path d="M12 30L50 52V92" stroke="#E5AA17" strokeWidth="5" />
                <path d="M88 30L50 52V92" stroke="#E5AA17" strokeWidth="5" />
                <path d="M50 25L73 38V63L50 76L27 63V38L50 25Z" fill="#E5AA17" stroke="#E5AA17" strokeWidth="3" />
              </svg>
            </div>
            <div className="flex flex-col select-none leading-none">
              <span className="text-[23px] font-extrabold tracking-tight text-slate-800 font-sans">
                CreatiPrint
              </span>
              <span className="text-[9px] font-bold text-gray-500 tracking-[0.16em] mt-0.5 font-sans">
                DESIGN & PRINTING
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Home Link */}
            <button 
              onClick={() => handleLinkClick('home')} 
              className={`relative py-2 text-sm font-semibold transition cursor-pointer border-none bg-transparent ${
                currentPage === 'home' ? 'text-amber-600' : 'text-gray-700 hover:text-amber-500'
              }`}
            >
              Home
              {currentPage === 'home' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5AA17] rounded-full"></span>
              )}
            </button>

            {/* Products Link */}
            <div className="relative group">
              <button 
                onClick={() => handleLinkClick('products')}
                className={`flex items-center gap-1 py-2 text-sm font-semibold transition cursor-pointer border-none bg-transparent ${
                  currentPage === 'products' ? 'text-amber-600' : 'text-gray-700 hover:text-amber-500'
                }`}
              >
                All Products
                <FiChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-amber-500 transition" />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-150 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {['Visiting Cards', 'Pamphlets', 'Brochures', 'Flex Banners', 'Bill Books', 'Custom Design'].map((prod) => (
                  <button 
                    key={prod} 
                    onClick={() => handleLinkClick('products')}
                    className="block w-full text-left px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-amber-50 hover:text-amber-600 border-none bg-transparent cursor-pointer"
                  >
                    {prod}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Link */}
            <button 
              onClick={() => handleLinkClick('services')}
              className={`py-2 text-sm font-semibold transition cursor-pointer border-none bg-transparent ${
                currentPage === 'services' ? 'text-amber-600' : 'text-gray-750 hover:text-amber-500'
              }`}
            >
              Design Services
              {currentPage === 'services' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5AA17] rounded-full"></span>
              )}
            </button>

            {/* Templates Link */}
            <button 
              onClick={() => handleLinkClick('templates')}
              className={`py-2 text-sm font-semibold transition cursor-pointer border-none bg-transparent ${
                currentPage === 'templates' ? 'text-amber-600' : 'text-gray-750 hover:text-amber-500'
              }`}
            >
              Templates
              {currentPage === 'templates' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5AA17] rounded-full"></span>
              )}
            </button>

            {/* About Link */}
            <button 
              onClick={() => handleLinkClick('about')}
              className={`py-2 text-sm font-semibold transition cursor-pointer border-none bg-transparent ${
                currentPage === 'about' ? 'text-amber-600' : 'text-gray-750 hover:text-amber-500'
              }`}
            >
              About Us
              {currentPage === 'about' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5AA17] rounded-full"></span>
              )}
            </button>

            {/* Contact Link */}
            <button 
              onClick={() => handleLinkClick('contact')}
              className={`py-2 text-sm font-semibold transition cursor-pointer border-none bg-transparent ${
                currentPage === 'contact' ? 'text-amber-600' : 'text-gray-750 hover:text-amber-500'
              }`}
            >
              Contact Us
              {currentPage === 'contact' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#E5AA17] rounded-full"></span>
              )}
            </button>
          </div>

          {/* Cart Button & Theme Toggle */}
          <div className="hidden lg:flex items-center gap-3">
            <button 
              onClick={() => handleLinkClick('products')}
              className="flex items-center gap-2 border border-gray-300 hover:border-amber-500 hover:text-[#b58005] hover:bg-amber-50/20 transition rounded-full px-5 py-2.5 text-sm font-extrabold text-slate-800 bg-white cursor-pointer select-none"
            >
              <FiShoppingBag className="w-4 h-4 text-slate-650" />
              Cart ({cartCount})
            </button>
            
            {/* Minimal Dark Mode Simulator to preserve framework functionality */}
            <button 
              onClick={onToggleDark} 
              aria-label="Toggle dark mode" 
              className="p-2.5 text-gray-500 hover:text-amber-500 transition rounded-full hover:bg-gray-50 cursor-pointer"
            >
              {darkMode ? (
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.46 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zm1.41 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 100 2h1z" /></svg>
              ) : (
                <svg className="w-4.5 h-4.5" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              )}
            </button>
          </div>

          {/* Mobile Menu Icon Toggle */}
          <button className="lg:hidden p-2 text-gray-700 cursor-pointer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-gray-150 bg-white px-4 py-4 space-y-3 relative z-40 text-left">
          <button onClick={() => handleLinkClick('home')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            Home
          </button>
          <button onClick={() => handleLinkClick('products')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            All Products
          </button>
          <button onClick={() => handleLinkClick('services')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            Design Services
          </button>
          <button onClick={() => handleLinkClick('templates')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            Templates
          </button>
          <button onClick={() => handleLinkClick('about')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            About Us
          </button>
          <button onClick={() => handleLinkClick('contact')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            Contact Us
          </button>
          <button onClick={() => handleLinkClick('help')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            Help Center
          </button>
          <button onClick={() => handleLinkClick('track')} className="block w-full text-left py-1 text-sm font-semibold text-gray-700 hover:text-amber-500 border-none bg-transparent">
            Track Order
          </button>
          <button onClick={() => handleLinkClick('products')} className="flex items-center gap-2 border border-gray-300 w-full justify-center rounded-full px-5 py-2.5 text-sm font-black text-slate-800 bg-white">
            <FiShoppingBag className="w-4 h-4 text-gray-500" />
            Cart ({cartCount})
          </button>
        </div>
      )}
    </header>
  )
}
