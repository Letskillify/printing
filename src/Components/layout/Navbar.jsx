import { useState, useEffect } from 'react'
import { 
  FiMenu, 
  FiX, 
  FiShoppingBag, 
  FiUser, 
  FiChevronDown, 
  FiChevronUp,
  FiTruck, 
  FiShield, 
  FiCheckCircle, 
  FiHeart, 
  FiLogOut, 
  FiSearch, 
  FiZap, 
  FiPhoneCall,
  FiArrowRight,
  FiGrid,
  FiStar,
  FiTag,
  FiCreditCard,
  FiMail,
  FiPrinter,
  FiPackage,
  FiBriefcase,
  FiBox,
  FiLayers
} from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { SearchModal } from '../common/SearchModal'
import { subscribeToMegamenuCategories, DEFAULT_MEGAMENU_CATEGORIES } from '../../services/firebase'

export const MEGA_MENU_CATEGORIES = DEFAULT_MEGAMENU_CATEGORIES;

export function Navbar({ currentPage, setCurrentPage }) {
  const { currentUser, userProfile, logout, cartItems, wishlistItems } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [mobileCategoryOpen, setMobileCategoryOpen] = useState(null)

  const [liveMegamenuCats, setLiveMegamenuCats] = useState(DEFAULT_MEGAMENU_CATEGORIES);

  useEffect(() => {
    const unsubscribe = subscribeToMegamenuCategories((cats) => {
      if (cats && Array.isArray(cats) && cats.length > 0) {
        setLiveMegamenuCats(cats);
      }
    });
    return () => unsubscribe();
  }, []);

  const getIconForName = (iconName) => {
    switch (iconName) {
      case 'FiCreditCard': return FiCreditCard;
      case 'FiMail': return FiMail;
      case 'FiPrinter': return FiPrinter;
      case 'FiPackage': return FiPackage;
      case 'FiBriefcase': return FiBriefcase;
      case 'FiBox': return FiBox;
      case 'FiTag': return FiTag;
      case 'FiLayers': return FiLayers;
      default: return FiPackage;
    }
  };

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

            {/* Products Premium Megamenu Dropdown */}
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

              {/* ── Ultra Premium Mega Menu Container (Decreased Top Gap: pt-1.5 with bridge) ── */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1.5 w-[1240px] max-w-[96vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-50 pointer-events-none group-hover:pointer-events-auto">
                <div className="bg-white/98 backdrop-blur-2xl border border-slate-200/90 rounded-3xl shadow-[0_20px_60px_-15px_rgba(7,21,47,0.18)] p-6 sm:p-7">
                  
                  {/* Top Quick Highlights Bar */}
                  <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 text-xs">
                    <div className="flex items-center gap-4 text-slate-500 font-bold">
                      <span className="flex items-center gap-1.5 text-[#07152F] font-black">
                        <FiZap className="w-4 h-4 text-[#FF5A1F]" />
                        Luxury Print & Packaging Studio
                      </span>
                      <span className="hidden xl:inline text-slate-300 font-normal">|</span>
                      <span className="hidden xl:inline text-emerald-700 font-bold bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
                        ✓ 24-48h Express Production
                      </span>
                      <span className="hidden xl:inline text-sky-700 font-bold bg-sky-50 border border-sky-200/60 px-2.5 py-0.5 rounded-full">
                        ✓ Free Digital Proofing
                      </span>
                    </div>
                    <button
                      onClick={() => handleLinkClick('products')}
                      className="flex items-center gap-1.5 font-black text-xs text-[#FF5A1F] hover:text-[#d84813] transition border-none bg-transparent cursor-pointer group/catlink"
                    >
                      View Complete Catalog (250+ SKUs) <FiArrowRight className="w-3.5 h-3.5 group-hover/catlink:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* 5-Column Grid + Promo Showcase Sidebar */}
                  <div className="grid grid-cols-12 gap-5">
                    
                    {/* Mega Menu Categories */}
                    <div className="col-span-10 grid grid-cols-5 gap-3.5 border-r border-slate-100 pr-4">
                      {liveMegamenuCats.map((category) => {
                        const Icon = category.icon || getIconForName(category.iconName);
                        return (
                          <div key={category.id || category.title} className="flex flex-col">
                            
                            {/* Category Header Box — Sleek Non-wrapping Header Card */}
                            <button
                              onClick={() => handleLinkClick('products', { category: category.categoryQuery || category.title }, '#catalog')}
                              className="flex items-center justify-between w-full bg-slate-50 hover:bg-[#FF5A1F]/10 border border-slate-200/80 hover:border-[#FF5A1F]/40 p-2.5 rounded-xl transition-all duration-200 cursor-pointer mb-2 group/head select-none"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <div className="w-7 h-7 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-[#FF5A1F] shadow-2xs group-hover/head:bg-[#FF5A1F] group-hover/head:text-white transition-colors flex-shrink-0">
                                  {Icon && <Icon className="w-3.5 h-3.5" />}
                                </div>
                                <span className="text-[13px] font-black text-[#07152F] group-hover/head:text-[#FF5A1F] transition-colors truncate">
                                  {category.title}
                                </span>
                              </div>
                              {category.badge && (
                                <span className="ml-1 px-1.5 py-0.5 text-[8px] font-black uppercase tracking-wider text-white bg-[#FF5A1F] rounded-full shadow-2xs flex-shrink-0">
                                  {category.badge}
                                </span>
                              )}
                            </button>

                            {/* Category Items List */}
                            <div className="space-y-0.5">
                              {(category.items || []).map((item) => (
                                <button
                                  key={item.name}
                                  onClick={() => handleLinkClick('products', { category: category.categoryQuery || category.title, search: item.search || item.name }, '#catalog')}
                                  className="flex flex-col w-full text-left px-2.5 py-1.5 rounded-xl hover:bg-slate-50 hover:translate-x-1 transition-all duration-200 border-none bg-transparent cursor-pointer group/item"
                                >
                                  <span className="text-[12.5px] font-bold text-slate-800 group-hover/item:text-[#FF5A1F] transition-colors flex items-center justify-between leading-snug">
                                    <span>{item.name}</span>
                                    <FiArrowRight className="w-3 h-3 text-[#FF5A1F] opacity-0 group-hover/item:opacity-100 -translate-x-1 group-hover/item:translate-x-0 transition-all" />
                                  </span>
                                  <span className="text-[10px] text-slate-400 font-medium group-hover/item:text-slate-500">
                                    {item.tag}
                                  </span>
                                </button>
                              ))}
                            </div>

                          </div>
                        );
                      })}
                    </div>

                    {/* Right Promo Showcase Banner (2 Columns) */}
                    <div className="col-span-2 flex flex-col justify-between bg-gradient-to-br from-[#07152F] via-[#0b1d3f] to-[#112852] text-white p-4 rounded-2xl relative overflow-hidden shadow-lg border border-slate-800/80">
                      <div className="absolute top-0 right-0 w-28 h-28 bg-[#FF5A1F]/20 rounded-full blur-2xl pointer-events-none" />
                      
                      <div>
                        <div className="inline-flex items-center gap-1 bg-[#FF5A1F] text-white font-extrabold text-[9px] uppercase tracking-wider px-2 py-0.5 rounded-md mb-2 shadow-xs">
                          ⚡ Custom Orders
                        </div>
                        <h4 className="text-sm font-extrabold leading-tight text-white mb-1.5">
                          B2B Corporate & Bulk Printing
                        </h4>
                        <p className="text-[11px] text-slate-300 leading-relaxed font-medium mb-3">
                          Need custom spot UV, foils, or sample physical kits delivered?
                        </p>
                      </div>

                      <div className="space-y-2 pt-2 border-t border-slate-700/60">
                        <button
                          onClick={() => handleLinkClick('quote')}
                          className="w-full bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-black text-xs py-2 px-3 rounded-xl transition cursor-pointer border-none shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-1.5"
                        >
                          Get Custom Quote <FiArrowRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleLinkClick('products')}
                          className="w-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 font-bold text-[11px] py-1.5 px-3 rounded-xl transition cursor-pointer border border-slate-700 flex items-center justify-center gap-1"
                        >
                          Explore Catalog
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
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

            {/* Shop (Changed from Track Order as requested) */}
            <button
              onClick={() => handleLinkClick('products')}
              className={`relative px-3.5 py-2 text-xs font-extrabold transition-colors duration-200 border-none cursor-pointer group ${
                currentPage === 'products' ? 'text-[#FF5A1F]' : 'text-[#0B1633] hover:text-[#FF5A1F]'
              }`}
            >
              Shop
              <span className={`absolute bottom-0 left-3 right-3 h-[2.5px] bg-[#FF5A1F] rounded-full transition-transform duration-300 ${
                currentPage === 'products' ? 'scale-x-100 origin-left' : 'scale-x-0 group-hover:scale-x-100 origin-left'
              }`} />
            </button>

            {/* Track Order */}
           

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
        <div className="lg:hidden bg-white border-b border-slate-200 shadow-2xl px-4 py-5 space-y-2 z-40 max-h-[85vh] overflow-y-auto">
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

          {/* Navigation Links */}
          <button
            onClick={() => handleLinkClick('home')}
            className={`block w-full text-left px-4 py-2 text-xs font-extrabold rounded-xl transition-colors border-none cursor-pointer ${
              currentPage === 'home' ? 'text-[#FF5A1F] bg-[#FF5A1F]/10' : 'text-[#0B1633] bg-transparent hover:bg-slate-50'
            }`}
          >
            Home
          </button>

          {/* Expandable Mobile Products Accordion */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 my-1">
            <button
              onClick={() => handleLinkClick('products')}
              className="w-full text-left px-4 py-2.5 text-xs font-extrabold text-[#0B1633] bg-transparent border-none flex items-center justify-between cursor-pointer"
            >
              <span>Products Catalog (All Items)</span>
              <span className="text-[10px] bg-[#FF5A1F] text-white px-2 py-0.5 rounded-full font-extrabold">250+ SKUs</span>
            </button>

            {/* Mobile Categories Submenu */}
            <div className="px-3 pb-3 space-y-2">
              {liveMegamenuCats.map((cat) => {
                const isOpen = mobileCategoryOpen === (cat.id || cat.title);
                return (
                  <div key={cat.id || cat.title} className="bg-white border border-slate-200/80 rounded-xl overflow-hidden shadow-2xs">
                    <button
                      onClick={() => setMobileCategoryOpen(isOpen ? null : (cat.id || cat.title))}
                      className="w-full flex items-center justify-between px-3 py-2 text-xs font-extrabold text-[#C2410C] bg-orange-50/40 border-none cursor-pointer"
                    >
                      <span className="flex items-center gap-1.5">
                        {cat.title}
                        <FiChevronUp className={`w-3.5 h-3.5 transition-transform ${isOpen ? '' : 'rotate-180'}`} />
                      </span>
                      {cat.badge && (
                        <span className="text-[8px] bg-[#FF5A1F] text-white px-1.5 py-0.5 rounded-full font-black">
                          {cat.badge}
                        </span>
                      )}
                    </button>

                    {isOpen && (
                      <div className="p-2 space-y-1 bg-white">
                        {(cat.items || []).map((item) => (
                          <button
                            key={item.name}
                            onClick={() => handleLinkClick('products', { category: cat.categoryQuery || cat.title, search: item.search || item.name }, '#catalog')}
                            className="block w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-[#FF5A1F] hover:bg-slate-50 border-none bg-transparent cursor-pointer"
                          >
                            • {item.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {[
            { label: 'Shop Catalog', page: 'products' },
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

