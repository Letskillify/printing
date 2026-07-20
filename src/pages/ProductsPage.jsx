import { useState } from 'react'
import { FiArrowRight, FiCheck, FiFilter, FiUploadCloud, FiX } from 'react-icons/fi'

export function ProductsPage({ onAddToCart }) {
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
      description: 'Standard 3.5" x 2" business cards with selectable luxury paper textures.',
      pricePerUnit: 0.8,
      basePrice: 199,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
          <rect x="5" y="15" width="65" height="42" rx="3" fill="#0b1426" />
          <line x1="12" y1="23" x2="32" y2="23" stroke="#E5AA17" strokeWidth="2.5" />
          <line x1="12" y1="31" x2="52" y2="31" stroke="#ffffff" strokeWidth="1.5" className="opacity-40" />
          <rect x="25" y="24" width="65" height="42" rx="3" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
          <rect x="33" y="32" width="10" height="10" fill="#E5AA17" rx="1" />
          <line x1="47" y1="35" x2="77" y2="35" stroke="#1e293b" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Pamphlets',
      category: 'Marketing',
      description: 'Bi-fold and tri-fold high speed premium offset calibrated flyers.',
      pricePerUnit: 1.8,
      basePrice: 499,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
          <path d="M15 10 L40 16 L40 60 L15 52 Z" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
          <path d="M40 16 L68 11 L68 55 L40 60 Z" fill="#E2E8F0" />
          <path d="M68 11 L90 18 L90 62 L68 55 Z" fill="#ffffff" stroke="#E2E8F0" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Brochures',
      category: 'Marketing',
      description: 'Multi-page booklets and catalogs with custom bindings and cover finishes.',
      pricePerUnit: 2.5,
      basePrice: 699,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
          <path d="M16 12 L48 8 L48 58 L16 62 Z" fill="#0b1426" />
          <path d="M48 8 L80 14 L80 64 L48 58 Z" fill="#f8fafc" stroke="#CBD5E1" strokeWidth="1" />
          <rect x="54" y="20" width="20" height="10" fill="#E5AA17" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Flex Banners',
      category: 'Signage',
      description: 'Durable, weather-resistant PVC banners with reinforced metal grommets.',
      pricePerUnit: 4.5,
      basePrice: 299,
      imageMarkup: (
        <svg viewBox="0 0 70 80" className="w-14 h-18 drop-shadow-md">
          <rect x="12" y="4" width="46" height="68" rx="1.5" fill="#0b1426" />
          <rect x="22" y="14" width="26" height="12" fill="#E5AA17" />
          <line x1="35" y1="40" x2="35" y2="72" stroke="#475569" strokeWidth="2" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Bill Books',
      category: 'Stationery',
      description: 'Duplicate or triplicate carbonless paper bill books with logical layouts.',
      pricePerUnit: 1.2,
      basePrice: 199,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
          <rect x="20" y="8" width="60" height="54" rx="2" fill="#ffffff" stroke="#CBD5E1" strokeWidth="1.5" />
          <rect x="20" y="8" width="60" height="8" rx="1" fill="#94a3b8" />
          <rect x="25" y="22" width="50" height="32" rx="1" fill="#f8fafc" stroke="#E2E8F0" strokeWidth="1" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Custom Design',
      category: 'Marketing',
      description: 'One-on-one consultation with layout design specialists to bring ideas to life.',
      pricePerUnit: 0.0,
      basePrice: 299,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
          <rect x="18" y="10" width="64" height="42" rx="3" fill="#475569" />
          <rect x="21" y="13" width="58" height="36" rx="1" fill="#ffffff" />
          <circle cx="50" cy="31" r="9" fill="#0b1426" />
        </svg>
      )
    },
    {
      id: 7,
      title: 'Packaging Boxes',
      category: 'Packaging',
      description: 'Eco-safe custom printed product boxes, folders, and mailer setups.',
      pricePerUnit: 5.0,
      basePrice: 399,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-24 h-16 drop-shadow-md">
          <path d="M50 10 L80 25 L50 40 L20 25 Z" fill="#2d3b4e" />
          <path d="M20 25 L50 40 L50 67 L20 52 Z" fill="#0b1426" />
          <path d="M50 40 L80 25 L80 52 L50 67 Z" fill="#1b2a47" />
        </svg>
      )
    },
    {
      id: 8,
      title: 'Labels & Stickers',
      category: 'Packaging',
      description: 'Waterproof die-cut rolls or sheets. High glossy finish options.',
      pricePerUnit: 0.5,
      basePrice: 149,
      imageMarkup: (
        <svg viewBox="0 0 100 70" className="w-22 h-16 drop-shadow-md">
          <circle cx="50" cy="35" r="22" fill="#E5AA17" fillOpacity="0.15" stroke="#E5AA17" strokeWidth="2.5" strokeDasharray="4 3" />
          <circle cx="50" cy="35" r="15" fill="#E5AA17" />
          <path d="M46 35 L49 38 L55 32" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
  ]

  const filteredProducts = activeCategory === 'All'
    ? productsList
    : productsList.filter(p => p.category === activeCategory)

  // Configure Calculations
  const calculateTotal = () => {
    if (!selectedProduct) return 0
    let base = selectedProduct.basePrice
    let qtyCost = quantity * selectedProduct.pricePerUnit
    let finishAdd = 0
    if (finish === 'Gold Foil Accent') finishAdd = 450
    if (finish === 'Spot UV Laminate') finishAdd = 300
    return Math.round(base + qtyCost + finishAdd)
  }

  const handleSimulateFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0].name)
    }
  }

  const submitAddToCart = () => {
    setIsAdded(true)
    onAddToCart()
    setTimeout(() => {
      setIsAdded(false)
      setSelectedProduct(null)
      // reset forms
      setUploadedFile(null)
      setFinish('None')
    }, 1500)
  }

  return (
    <section className="bg-[#FAF8F5] py-14 font-sans text-left min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Marketplace Hero Header */}
        <div className="bg-[#FAF6F0] rounded-2xl border border-gray-150 p-8 sm:p-10 mb-10 text-center sm:text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-[#E5AA17] uppercase block mb-3">
            CreatiPrint Store
          </span>
          <h1 className="text-[32px] sm:text-[40px] font-black text-slate-800 tracking-tight leading-none mb-4">
            Design & Print Marketplace
          </h1>
          <p className="text-gray-550 text-sm sm:text-base max-w-2xl leading-relaxed">
            Choose from our premium catalog. Calibrated print output, custom thickness selections, and quick delivery directly to your workspace.
          </p>
        </div>

        {/* Filters and Search toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-black select-none transition-all ${
                  activeCategory === cat
                    ? 'bg-[#E5AA17] text-slate-950 shadow-md shadow-amber-500/10'
                    : 'bg-white border border-gray-250 text-gray-700 hover:border-gray-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="text-xs font-bold text-gray-450 uppercase flex items-center gap-1.5 self-end">
            <FiFilter className="w-3.5 h-3.5" />
            Showing {filteredProducts.length} Products
          </div>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-xl border border-gray-150 hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group"
            >
              {/* Graphic element container */}
              <div className="bg-[#FAF7F2] h-40 flex items-center justify-center border-b border-gray-100">
                {prod.imageMarkup}
              </div>
              
              {/* Card Meta Content */}
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 px-2 py-0.5 rounded-md bg-amber-50 inline-block mb-2">
                    {prod.category}
                  </span>
                  <h3 className="text-base font-extrabold text-slate-800 group-hover:text-[#E5AA17] transition-colors leading-tight">
                    {prod.title}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 leading-relaxed">
                    {prod.description}
                  </p>
                </div>
                
                {/* Row pricing & button */}
                <div className="flex items-center justify-between mt-6 pt-2 border-t border-gray-50">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wide">Starting at</span>
                    <span className="text-[15px] font-black text-slate-800">{prod.pricePerUnit === 0 ? 'Quote' : `₹${prod.basePrice}`}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProduct(prod)
                      setQuantity(250)
                      setPaperType('350gsm Premium Matte')
                      setFinish('None')
                    }}
                    className="flex items-center justify-center gap-1 text-[11px] font-black text-slate-800 hover:text-[#E5AA17] uppercase tracking-wider bg-slate-50 border border-gray-200 px-3.5 py-2 rounded-lg transition"
                  >
                    Details <FiArrowRight className="w-3.0 h-3.0" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Product Detail Modal / Slider Configuration Drawer */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-slate-950/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-2xl border border-gray-150 overflow-hidden relative flex flex-col max-h-[85vh]">
            
            {/* Header info */}
            <div className="bg-[#FAF7F2] p-5 border-b border-gray-100 flex justify-between items-center text-left">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-amber-500 block mb-1">Configure Order</span>
                <h3 className="text-lg font-black text-slate-800">{selectedProduct.title}</h3>
              </div>
              <button 
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition"
              >
                <FiX className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Scroll Config Fields */}
            <div className="p-6 overflow-y-auto space-y-5 text-left flex-1">
              
              {/* Product description info banner */}
              <div className="p-3.5 bg-slate-50 border border-gray-150 rounded-lg text-xs text-gray-600 leading-relaxed">
                {selectedProduct.description}
              </div>

              {/* Quantity config selector */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Quantity</label>
                <select 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full text-xs font-semibold p-3 border border-gray-250 bg-white rounded-lg focus:outline-none focus:border-[#E5AA17]"
                >
                  <option value={100}>100 units</option>
                  <option value={250}>250 units</option>
                  <option value={500}>500 units</option>
                  <option value={1000}>1000 units</option>
                </select>
                <p className="text-[10px] text-gray-400 mt-1 font-medium">Rate: ₹{selectedProduct.pricePerUnit} per unit + Base pricing</p>
              </div>

              {/* Material Stock Selection */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Material / Paper Type</label>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-700">
                  {['350gsm Premium Matte', '400gsm Velvet Touch', 'Eco Kraft Cardstock', 'Synthetic Waterproof'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPaperType(p)}
                      className={`p-3 border rounded-lg text-left transition ${
                        paperType === p 
                          ? 'border-[#E5AA17] bg-amber-50/50 text-[#b58005]' 
                          : 'border-gray-250 hover:border-gray-350'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Finishes Upgrade */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Luxury Finishing Addon</label>
                <div className="space-y-2">
                  {[
                    { name: 'None', price: '+₹0', desc: 'Standard calibrated offset print' },
                    { name: 'Gold Foil Accent', price: '+₹450', desc: 'Adds a raised metallic gold foil highlight on layout elements' },
                    { name: 'Spot UV Laminate', price: '+₹300', desc: 'Adds gloss layer accents raises contrasting glossy textures' }
                  ].map((x) => (
                    <div 
                      key={x.name} 
                      onClick={() => setFinish(x.name)}
                      className={`p-3 border rounded-xl flex items-center justify-between cursor-pointer transition ${
                        finish === x.name 
                          ? 'border-[#E5AA17] bg-amber-50/40' 
                          : 'border-gray-150 hover:border-gray-250'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-black text-slate-800">{x.name}</span>
                        <span className="text-[10px] text-gray-400 mt-0.5 leading-none">{x.desc}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#E5AA17]">{x.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Artwork Design Upload Box */}
              <div>
                <label className="block text-xs font-black text-slate-800 uppercase tracking-wider mb-2">Upload Print File (PDF / SVG / AI)</label>
                <div className="border-2 border-dashed border-gray-250 rounded-xl p-5 flex flex-col items-center justify-center text-center hover:bg-slate-50 transition cursor-pointer relative">
                  <input 
                    type="file" 
                    accept=".pdf,.ai,.psd,.zip,.png,.svg" 
                    onChange={handleSimulateFile}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  />
                  <FiUploadCloud className="w-8 h-8 text-[#E5AA17] mb-2" />
                  <span className="text-xs font-extrabold text-slate-850">
                    {uploadedFile ? `Artwork: ${uploadedFile}` : 'Drag & drop or Click to choose file'}
                  </span>
                  <span className="text-[9.5px] text-gray-400 mt-1 font-medium">Recommended file formats: high-res PDF or SVG with 3mm bleed borders</span>
                </div>
              </div>

            </div>

            {/* Calculations Footer */}
            <div className="p-5 border-t border-gray-100 bg-[#FAF7F2] flex items-center justify-between text-left">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-450 font-bold uppercase tracking-wider">Calculated Total</span>
                <span className="text-[20px] font-black text-slate-900 leading-none mt-1">₹{calculateTotal()}</span>
              </div>
              
              <button
                onClick={submitAddToCart}
                disabled={isAdded}
                className={`inline-flex items-center justify-center text-xs sm:text-sm font-black uppercase tracking-wider px-6 py-3 rounded-lg shadow-md transition-all select-none ${
                  isAdded 
                    ? 'bg-emerald-500 text-white shadow-emerald-500/10' 
                    : 'bg-[#E5AA17] hover:bg-[#cca118] text-slate-950 shadow-amber-500/10'
                }`}
              >
                {isAdded ? (
                  <>
                    <FiCheck className="w-4 h-4 mr-1.5 stroke-[3]" /> Added to Cart
                  </>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  )
}
