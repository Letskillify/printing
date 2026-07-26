import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { FiArrowRight, FiCheck, FiFilter, FiUploadCloud, FiX, FiShoppingBag, FiStar, FiSliders } from 'react-icons/fi'

export function ProductsPage({ onAddToCart }) {
  const prefersReducedMotion = useReducedMotion()
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)
  
  // Custom Product configurations state
  const [quantity, setQuantity] = useState(250)
  const [paperType, setPaperType] = useState('350gsm Premium Matte')
  const [finish, setFinish] = useState('None')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [isAdded, setIsAdded] = useState(false)

  const categories = ['All', 'Stationery', 'Marketing', 'Packaging', 'Signage']

  const productsList = [
    {
      id: 1,
      title: 'Visiting Cards',
      category: 'Stationery',
      description: 'Standard 3.5" x 2" business cards with selectable luxury paper textures and foil accents.',
      pricePerUnit: 0.8,
      basePrice: 199,
      image: 'https://images.unsplash.com/photo-1612831819695-7e71f5ccf16c?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 2,
      title: 'Pamphlets & Flyers',
      category: 'Marketing',
      description: 'Bi-fold and tri-fold high speed premium offset calibrated marketing flyers.',
      pricePerUnit: 1.8,
      basePrice: 499,
      image: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 3,
      title: 'Brochures',
      category: 'Marketing',
      description: 'Multi-page booklets and catalogs with custom bindings and cover finishes.',
      pricePerUnit: 2.5,
      basePrice: 699,
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 4,
      title: 'Flex Banners & Posters',
      category: 'Signage',
      description: 'Durable, weather-resistant PVC banners with reinforced metal grommets for outdoor events.',
      pricePerUnit: 4.5,
      basePrice: 299,
      image: 'https://images.unsplash.com/photo-1608502374980-67d5c35a5302?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 5,
      title: 'Bill Books & Invoices',
      category: 'Stationery',
      description: 'Duplicate or triplicate carbonless paper bill books with logical enterprise layouts.',
      pricePerUnit: 1.2,
      basePrice: 199,
      image: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 6,
      title: 'Custom Packaging Boxes',
      category: 'Packaging',
      description: 'Rigid mailer boxes, pouches, and eco-friendly custom branded boxes.',
      pricePerUnit: 5.5,
      basePrice: 899,
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 7,
      title: 'Stickers & Labels',
      category: 'Packaging',
      description: 'Custom die-cut vinyl stickers and waterproof product roll labels.',
      pricePerUnit: 0.5,
      basePrice: 149,
      image: 'https://images.unsplash.com/photo-1591981730169-05e8e57a7c04?auto=format&fit=crop&q=80&w=600',
    },
    {
      id: 8,
      title: 'Photo Canvas Prints',
      category: 'Signage',
      description: 'Museum-grade stretched canvas prints mounted on solid pine frames.',
      pricePerUnit: 8.0,
      basePrice: 799,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
    },
  ]

  const filteredProducts = activeCategory === 'All' 
    ? productsList 
    : productsList.filter(p => p.category === activeCategory)

  const handleAddToCartClick = () => {
    if (onAddToCart) onAddToCart()
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      setSelectedProduct(null)
    }, 1800)
  }

  // Calculate dynamic price
  const calculateTotal = (product) => {
    const base = product.basePrice || 200
    const qtyPrice = (quantity / 50) * product.pricePerUnit * 40
    const finishCost = finish === 'Gold Foil' ? 350 : finish === 'Spot UV' ? 250 : 0
    return Math.round(base + qtyPrice + finishCost)
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
            All Print Products
          </h1>
          <p className="text-slate-300 text-[15px] max-w-2xl leading-relaxed">
            High precision printing, custom dimensions, luxury finishes, and instant digital proofing.
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="group bg-white rounded-[16px] overflow-hidden border border-[#E7EAF0] hover:border-[#FF5A1F]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
            >
              {/* Product Image */}
              <div className="relative h-[180px] w-full overflow-hidden bg-[#F7F8FA]">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 right-3 bg-[#07152F] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                  {prod.category}
                </span>
              </div>

              {/* Product Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-[17px] font-bold text-[#0B1633] group-hover:text-[#FF5A1F] transition-colors mb-1.5">
                    {prod.title}
                  </h3>
                  <p className="text-[#667085] text-[13.5px] leading-relaxed mb-4">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#E7EAF0] flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-[#667085] block">Starting from</span>
                    <span className="text-[18px] font-extrabold text-[#0B1633]">₹{prod.basePrice}</span>
                  </div>

                  <button
                    onClick={() => setSelectedProduct(prod)}
                    className="inline-flex items-center gap-1.5 bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[13px] px-4 py-2 rounded-[10px] transition-all cursor-pointer border-none shadow-sm shadow-[#FF5A1F]/20"
                  >
                    Configure <FiArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Product Customizer Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-[#07152F]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[20px] border border-[#E7EAF0] shadow-2xl max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative">
            {/* Close Modal */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F7F8FA] hover:bg-[#E7EAF0] text-[#0B1633] flex items-center justify-center transition border-none cursor-pointer"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <span className="bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-bold px-3 py-1 rounded-full uppercase">
                {selectedProduct.category}
              </span>
              <h2 className="text-2xl font-extrabold text-[#0B1633]">{selectedProduct.title}</h2>
            </div>

            {/* Config Form */}
            <div className="space-y-5 mb-6 text-left">
              {/* Quantity */}
              <div>
                <label className="block text-[13px] font-bold text-[#0B1633] mb-2">Select Quantity:</label>
                <div className="grid grid-cols-4 gap-2">
                  {[100, 250, 500, 1000].map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`py-2 rounded-[10px] text-xs font-bold transition border cursor-pointer ${
                        quantity === qty
                          ? 'bg-[#FF5A1F] text-white border-[#FF5A1F]'
                          : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                      }`}
                    >
                      {qty} units
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Stock */}
              <div>
                <label className="block text-[13px] font-bold text-[#0B1633] mb-2">Paper Stock & Weight:</label>
                <select
                  value={paperType}
                  onChange={(e) => setPaperType(e.target.value)}
                  className="w-full bg-[#F7F8FA] border border-[#E7EAF0] rounded-[10px] py-2.5 px-3 text-xs text-[#0B1633] font-medium focus:outline-none focus:border-[#FF5A1F]"
                >
                  <option>300gsm Art Card Matte</option>
                  <option>350gsm Premium Gloss</option>
                  <option>400gsm Velvet Touch</option>
                  <option>Recycled FSC Eco Kraft</option>
                </select>
              </div>

              {/* Finish Options */}
              <div>
                <label className="block text-[13px] font-bold text-[#0B1633] mb-2">Special Finishes:</label>
                <div className="grid grid-cols-3 gap-2">
                  {['None', 'Gold Foil', 'Spot UV'].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFinish(f)}
                      className={`py-2 rounded-[10px] text-xs font-bold transition border cursor-pointer ${
                        finish === f
                          ? 'bg-[#07152F] text-white border-[#07152F]'
                          : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* File Upload Dropzone */}
              <div>
                <label className="block text-[13px] font-bold text-[#0B1633] mb-2">Upload Print File (PDF, AI, PSD):</label>
                <label className="border-2 border-dashed border-[#E7EAF0] hover:border-[#FF5A1F] rounded-[14px] p-4 text-center block bg-[#F7F8FA] cursor-pointer transition">
                  <FiUploadCloud className="w-8 h-8 text-[#FF5A1F] mx-auto mb-1" />
                  <span className="text-xs text-[#667085] font-medium block">
                    {uploadedFile ? uploadedFile.name : 'Click to upload or drag artwork file here'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                </label>
              </div>
            </div>

            {/* Total Price & Add to Cart */}
            <div className="pt-4 border-t border-[#E7EAF0] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#667085] block">Total Estimated Price</span>
                <span className="text-2xl font-extrabold text-[#FF5A1F]">₹{calculateTotal(selectedProduct)}</span>
              </div>

              <button
                onClick={handleAddToCartClick}
                className="bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[14px] px-7 py-3 rounded-[12px] transition-all border-none cursor-pointer flex items-center gap-2 shadow-md shadow-[#FF5A1F]/20"
              >
                {isAdded ? (
                  <>
                    <FiCheck className="w-4 h-4" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
