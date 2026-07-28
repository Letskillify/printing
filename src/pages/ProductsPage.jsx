import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiCheck, FiFilter, FiUploadCloud, FiX, FiShoppingBag, FiStar, FiSliders, FiHeart, FiPlusCircle } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { subscribeToProducts } from '../services/firebase'
import { ProductDetailPage } from './ProductDetailPage'

export function ProductsPage({ onNavigateCart }) {
  const { addToCart, toggleWishlist, isInWishlist } = useAuth()
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Real-time Products State from Firestore
  const [liveProducts, setLiveProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  // Subscribe to live Firestore products
  useEffect(() => {
    const unsubscribe = subscribeToProducts((prods) => {
      setLiveProducts(prods || []);
      setLoadingProducts(false);
    });
    return () => unsubscribe();
  }, []);

  const categories = ['All', 'Business Stationery', 'Large Format Display', 'Custom Packaging', 'Apparel & Merch', 'Marketing']

  const filteredProducts = activeCategory === 'All' 
    ? liveProducts 
    : liveProducts.filter(p => p.category === activeCategory)

  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onNavigateCart={onNavigateCart}
      />
    );
  }

  return (
    <div className="bg-[#FAFBFD] font-sans min-h-screen text-[#0B1633]">

      {/* Page Hero Header — Deep Navy #07152F */}
      <section className="bg-[#07152F] text-white py-14 sm:py-18 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-[#FF5A1F]/10 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center sm:text-left">
          <div className="flex items-center gap-2 mb-3 justify-center sm:justify-start text-xs font-semibold text-slate-400">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#FF5A1F] font-bold">Products Catalog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3">
            Live Print Catalog
          </h1>
          <p className="text-slate-300 text-[15px] max-w-2xl leading-relaxed">
            Click on any product card to inspect full specs, custom configurations, and pricing options.
          </p>
        </div>
      </section>

      {/* Main Catalog Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs font-bold uppercase tracking-wider text-[#667085] mr-2 flex items-center gap-1.5 flex-shrink-0">
            <FiFilter className="text-[#FF5A1F]" /> Filter:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-[10px] text-[13px] font-bold transition-all duration-200 cursor-pointer border-none flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/20'
                  : 'bg-white text-[#0B1633] border border-[#E7EAF0] hover:bg-[#F7F8FA] hover:text-[#FF5A1F]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        {loadingProducts ? (
          <div className="py-20 text-center text-slate-500 font-bold text-sm">
            Loading Live Products from Firestore...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const isSaved = isInWishlist(prod.id);
              const imgSrc = (prod.images && prod.images[0]) || prod.image || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600';
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="group bg-white rounded-[16px] overflow-hidden border border-[#E7EAF0] hover:border-[#FF5A1F]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative h-[180px] w-full overflow-hidden bg-[#F7F8FA]">
                    <img
                      src={imgSrc}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-[#07152F] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                      {prod.category}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className={`absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition border-none cursor-pointer ${
                        isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
                      }`}
                      title="Save to Wishlist"
                    >
                      <FiHeart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  {/* Product Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-[17px] font-bold text-[#0B1633] group-hover:text-[#FF5A1F] transition-colors mb-1.5">
                        {prod.title}
                      </h3>
                      <p className="text-[#667085] text-[13.5px] leading-relaxed mb-4 line-clamp-2">
                        {prod.summary || prod.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E7EAF0] flex items-center justify-between">
                      <div>
                        <span className="text-[11px] text-[#667085] block">Starting from</span>
                        <span className="text-[18px] font-extrabold text-[#0B1633]">₹{prod.basePrice}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(prod);
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[13px] px-4 py-2 rounded-[10px] transition-all cursor-pointer border-none shadow-sm shadow-[#FF5A1F]/20"
                      >
                        View Detail <FiArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[20px] p-12 text-center max-w-md mx-auto border border-[#E7EAF0]">
            <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-3">
              <FiShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B1633] mb-1">Catalog Ready for SKUs</h3>
            <p className="text-slate-500 text-xs mb-6">No products published in this category yet. Add SKUs dynamically using the Admin Panel.</p>
            <a
              href="/admin"
              className="bg-[#07152F] text-white font-extrabold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2"
            >
              <FiPlusCircle className="w-4 h-4 text-sky-400" /> Open Admin SKU Manager
            </a>
          </div>
        )}
      </div>

    </div>
  )
}
