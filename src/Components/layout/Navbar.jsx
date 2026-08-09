import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiShoppingBag, FiUser, FiChevronDown, FiTruck, FiShield, FiCheckCircle, FiHeart, FiLogOut, FiSearch, FiZap, FiPhoneCall } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { SearchModal } from '../common/SearchModal'

export function Navbar({ currentPage, setCurrentPage }) {
  const { currentUser, userProfile, logout, cartItems, wishlistItems } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Listen for Ctrl+K / Cmd+K global shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLinkClick = (pageId, extraParams = {}, fragment = '') => {
    if (typeof setCurrentPage === 'function') {
      setCurrentPage(pageId, extraParams, fragment)
    }
    setMobileMenuOpen(false)
    setUserDropdownOpen(false)
  }

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      handleLinkClick('products', { search: searchQuery.trim() }, '#catalog')
    }
  }

  const productCategories = [
    'Business Cards', 'Brochures & Flyers', 'Posters & Banners',
    'Stickers & Labels', 'Packaging', 'Stationery', 'Photo Printing'
  ]

  const totalCartCount = cartItems.reduce((sum, item) => sum + (item.qty || 1), 0)

  return (
    <header className="w-full font-sans sticky top-0 z-50 transition-all duration-300">

      {/* ── Top Announcement Bar (Deep Navy: #07152F with gradient line) ── */}
      <div className="bg-[#07152F] text-white text-[11px] font-medium py-1.5 px-3 sm:px-6 border-b border-slate-800/80 shadow-xs relative">
        <div className="max-w-7xl mx-auto flex flex-row justify-between items-center gap-2">
          {/* Left Feature Badges */}
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5 opacity-95">
              <FiTruck className="w-3.5 h-3.5 text-[#FF5A1F]" />
              <span className="font-extrabold text-[#FF5A1F]">🚀 Express Delivery</span>
              <span className="text-[#909AB0] hidden xs:inline sm:inline">3-5 days pan-India</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 opacity-95">
              <FiCheckCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-bold text-white">100% Quality</span>
              <span className="text-[#909AB0]">Re-print Guaranteed</span>
            </span>
            <span className="hidden lg:flex items-center gap-1.5 opacity-95">
              <FiShield className="w-3.5 h-3.5 text-sky-400" />
              <span className="font-bold text-sky-300">256-bit SSL</span>
              <span className="text-[#909AB0]">B2B Tax Invoices</span>
            </span>
          </div>

          {/* Right Admin Shortcut */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => handleLinkClick('admin')}
              className="flex items-center gap-1 text-sky-300 hover:text-white transition-colors duration-200 border border-sky-400/40 bg-sky-500/15 hover:bg-sky-500/25 px-2.5 py-0.5 rounded-full text-[10.5px] sm:text-[11px] font-bold cursor-pointer"
            >
              ⚡ Admin Panel
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Compact Header (Glassmorphic Blur with Sleek Icons) ── */}
      <div className={`bg-white/95 backdrop-blur-xl transition-all duration-300 border-b ${
        isScrolled ? 'py-2 shadow-[0_4px_25px_rgba(7,21,47,0.08)] border-slate-200' : 'py-3 border-slate-200/90'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">

          {/* Brand Logo */}
          <button
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2.5 border-none bg-transparent cursor-pointer flex-shrink-0 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5A1F] to-[#e44d15] flex items-center justify-center shadow-lg shadow-[#FF5A1F]/25 group-hover:scale-105 transition-transform duration-200">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 4v3H4a2 2 0 00-2 2v7a2 2 0 002 2h1v2a1 1 0 001 1h12a1 1 0 001-1v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a1 1 0 00-1-1H6a1 1 0 00-1 1zm2 0h10v3H7V4zm-3 7h16v5h-1v-1a1 1 0 00-1-1H6a1 1 0 00-1 1v1H4v-5zm3 6v-2h10v2H7z"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none text-left select-none">
              <span className="text-2xl font-black text-[#0B1633] tracking-tight">
                Printo<span className="text-[#FF5A1F]">.</span>
              </span>
              <span className="text-[8.5px] font-extrabold text-slate-400 tracking-[0.22em] uppercase mt-0.5">Print Studio</span>
            </div>
          </button>

          {/* Search Input Bar (Desktop Command Trigger) */}
          <div 
            onClick={() => setIsSearchOpen(true)}
            className="hidden md:flex items-center flex-1 max-w-xs xl:max-w-sm relative cursor-pointer group"
          >
            <FiSearch className="w-4 h-4 text-slate-400 group-hover:text-[#FF5A1F] absolute left-3.5 pointer-events-none transition" />
            <input
              type="text"
              readOnly
              placeholder="Search products, packaging..."
              className="w-full pl-10 pr-12 py-2 rounded-xl border border-slate-200/90 text-xs font-semibold text-slate-900 bg-slate-50/70 group-hover:bg-white group-hover:border-[#FF5A1F]/50 group-hover:ring-2 group-hover:ring-[#FF5A1F]/10 transition cursor-pointer"
            />
            <span className="absolute right-3 text-[9.5px] font-bold text-slate-400 group-hover:text-slate-600 bg-slate-200/80 group-hover:bg-slate-200 px-1.5 py-0.5 rounded transition">Ctrl+K</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* Home */}
            <button
              onClick={() => handleLinkClick('home')}
              className={`relative px-3.5 py-2 text-xs font-extrabold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'home' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Home
              <span className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'home' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* Products Dropdown */}
            <div className="relative group">
              <button
                onClick={() => handleLinkClick('products')}
                className={`relative flex items-center gap-1 px-3.5 py-2 text-xs font-extrabold transition-colors duration-200 border-none cursor-pointer ${
                  currentPage === 'products' ? 'text-[#FF5A1F]' : 'text-[#0B1633] group-hover:text-[#FF5A1F]'
                }`}
              >
                Products
                <FiChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#FF5A1F] transition-transform duration-200 group-hover:rotate-180" />
                <span className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                  currentPage === 'products' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
                }`} />
              </button>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-1.5 w-60 bg-white border border-slate-200/90 rounded-2xl shadow-2xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                {productCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleLinkClick('products', { category: cat }, '#catalog')}
                    className="flex items-center gap-2.5 w-full text-left px-4 py-2 text-xs font-bold text-slate-800 hover:bg-slate-50 hover:text-[#FF5A1F] transition-colors border-none bg-transparent cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] flex-shrink-0 opacity-70" />
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Services */}
            <button
              onClick={() => handleLinkClick('services')}
              className={`relative px-3.5 py-2 text-xs font-extrabold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'services' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Services
              <span className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'services' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* Track Order */}
            <button
              onClick={() => handleLinkClick('track')}
              className={`relative px-3.5 py-2 text-xs font-extrabold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'track' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Track Order
              <span className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'track' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* About */}
            <button
              onClick={() => handleLinkClick('about')}
              className={`relative px-3.5 py-2 text-xs font-extrabold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'about' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              About
              <span className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'about' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>
          </nav>

          {/* Right Action Icons Only (Wishlist, Cart, Accounts) */}
          <div className="flex items-center gap-3 shrink-0">
            
            {/* Get Quote Quick Pill */}
            <button
              onClick={() => handleLinkClick('quote')}
              className="hidden sm:inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs px-3.5 py-2 rounded-xl transition border-none cursor-pointer"
            >
              Get Quote
            </button>

            {/* Wishlist Icon Button */}
            <button
              onClick={() => handleLinkClick('products')}
              className="relative p-2.5 rounded-xl bg-rose-50/80 hover:bg-rose-100/80 text-rose-600 transition cursor-pointer border border-rose-200/80 flex items-center justify-center"
              title="View Wishlist"
            >
              <FiHeart className="w-4 h-4 text-rose-600 fill-rose-500" />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-600 text-white font-black text-[9.5px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            {/* Cart Icon Button */}
            <button
              onClick={() => handleLinkClick('cart')}
              className="relative p-2.5 rounded-xl bg-[#FF5A1F]/10 hover:bg-[#FF5A1F]/20 text-[#FF5A1F] transition cursor-pointer border border-[#FF5A1F]/30 flex items-center justify-center"
              title="View Shopping Cart"
            >
              <FiShoppingBag className="w-4 h-4 text-[#FF5A1F]" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF5A1F] text-white font-black text-[9.5px] w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Accounts Icon Button — Opens Account Page directly on click! */}
            <button
              onClick={() => handleLinkClick('account')}
              className={`p-2.5 rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5 ${
                currentUser
                  ? 'bg-[#07152F] text-white hover:bg-slate-800 border border-slate-700 shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200'
              }`}
              title="My Account Dashboard (Track Orders, Saved Addresses, Edit Profile)"
            >
              {currentUser ? (
                <span className="w-4 h-4 rounded-full bg-[#FF5A1F] text-white font-black text-[9px] flex items-center justify-center">
                  {(currentUser.displayName || userProfile?.displayName || currentUser.email || 'U').substring(0, 1).toUpperCase()}
                </span>
              ) : (
                <FiUser className="w-4 h-4 text-slate-700" />
              )}
            </button>

          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-[#0B1633] cursor-pointer rounded-lg hover:bg-slate-100 transition-colors border-none bg-transparent"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Panel */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-4 py-5 space-y-2 z-40">
          <div 
            onClick={() => {
              setMobileMenuOpen(false);
              setIsSearchOpen(true);
            }} 
            className="relative mb-3 cursor-pointer group"
          >
            <FiSearch className="w-4 h-4 text-slate-400 group-hover:text-[#FF5A1F] absolute left-3 top-3 transition" />
            <input
              type="text"
              readOnly
              placeholder="Search products..."
              className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-900 bg-slate-50 group-hover:bg-white group-hover:border-[#FF5A1F] transition cursor-pointer"
            />
          </div>

          {[
            { label: 'Home', page: 'home' },
            { label: 'Products Catalog', page: 'products' },
            { label: 'Services', page: 'services' },
            { label: 'Track Order', page: 'track' },
            { label: 'About Us', page: 'about' },
            { label: 'Contact', page: 'contact' },
            { label: 'Cart Overview', page: 'cart' },
            { label: 'My Account', page: 'account' },
            { label: 'Get Custom Quote', page: 'quote' },
          ].map(({ label, page }) => (
            <button
              key={page}
              onClick={() => handleLinkClick(page)}
              className={`block w-full text-left px-4 py-2.5 text-xs font-extrabold rounded-xl transition-colors border-none cursor-pointer ${
                currentPage === page ? 'text-[#FF5A1F] bg-[#FF5A1F]/10' : 'text-[#0B1633] bg-transparent hover:bg-slate-50'
              }`}
            >
              {label}
            </button>
          ))}
          <div className="pt-2">
            <button
              onClick={() => handleLinkClick('products')}
              className="flex items-center justify-center gap-2 w-full bg-[#FF5A1F] text-white font-black text-xs uppercase tracking-wider px-5 py-3 rounded-xl border-none cursor-pointer shadow-md shadow-[#FF5A1F]/20"
            >
              Upload / Design Now
            </button>
          </div>
        </div>
      )}

      {/* Instant Search Command Palette Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => {
          handleLinkClick('products', { sku: prod.id }, '#specs');
        }}
        onNavigateSearch={(term) => {
          handleLinkClick('products', { search: term }, '#catalog');
        }}
      />
    </header>
  )
}
