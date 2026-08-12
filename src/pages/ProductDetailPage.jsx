import React, { useState, useEffect } from 'react';
import { 
  FiArrowLeft, 
  FiShoppingBag, 
  FiHeart, 
  FiCheckCircle, 
  FiTruck, 
  FiShield, 
  FiUploadCloud, 
  FiZap,
  FiFileText,
  FiPackage,
  FiStar,
  FiClock,
  FiChevronDown,
  FiChevronUp,
  FiInfo
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

// Helper to convert camelCase keys like 'boxStyle' -> 'Box Style'
const formatKeyToTitle = (key) => {
  const titles = {
    paperStock: 'Paper Stock & Board Weight',
    finishes: 'Special Finishes & Finishing Effects',
    sides: 'Print Sides Option',
    corners: 'Edge Cutting & Corner Finishing',
    sizeFormat: 'Card Size & Aspect Ratio Format',
    lamination: 'Lamination Option & Protective Coating',
    foilAccents: 'Metallic Foil Accents & Hot Stamping',
    spotUV: 'Spot UV & Selective Gloss Textures',
    bindingStyle: 'Binding & Booklet Construction',
    proofService: 'Prepress File Check & Proofing Service',
    packagingStyle: 'Packaging & Presentation Box',
    baseType: 'Base & Frame Specification',
    boxStyle: 'Box Construction & Style',
  };
  if (titles[key]) return titles[key];
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase());
};

export function ProductDetailPage({ product, onBack, onNavigateCart }) {
  const { addToCart, toggleWishlist, isInWishlist } = useAuth();

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  const [selectedImage, setSelectedImage] = useState(
    imagesList.length > 0 ? imagesList[0] : null
  );

  useEffect(() => {
    if (imagesList.length > 0) {
      setSelectedImage(imagesList[0]);
    }
  }, [product]);

  // Minimum Order Quantity (Min Pieces) from product or default 1
  const minPieces = product.minOrderQty || 1;

  const [isCustomQty, setIsCustomQty] = useState(true);
  const [customQtyInput, setCustomQtyInput] = useState(minPieces);
  const [quantity, setQuantity] = useState(minPieces);

  // Accordion Tabs Toggle (description open by default)
  const [openAccordion, setOpenAccordion] = useState('description'); // 'overview', 'shipping', 'guarantee'

  // Parse available variants dynamically from product object ONLY
  const availableVariantEntries = Object.entries(product.variants || {}).filter(
    ([_, options]) => Array.isArray(options) && options.length > 0
  );

  // Initialize selected option values for each available variant category
  const [selectedVariants, setSelectedVariants] = useState(() => {
    const initial = {};
    Object.entries(product.variants || {}).forEach(([key, options]) => {
      if (Array.isArray(options) && options.length > 0) {
        const first = options[0];
        initial[key] = typeof first === 'string' ? first : first.name;
      }
    });
    return initial;
  });

  // Keep state updated if product changes
  useEffect(() => {
    const initial = {};
    Object.entries(product.variants || {}).forEach(([key, options]) => {
      if (Array.isArray(options) && options.length > 0) {
        const first = options[0];
        initial[key] = typeof first === 'string' ? first : first.name;
      }
    });
    setSelectedVariants(initial);
  }, [product]);

  const [uploadedFile, setUploadedFile] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isSaved = isInWishlist(product.id);

  // Active pricing tier lookup
  const getActiveTier = () => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) return null;
    const sortedTiers = [...product.tieredPricing].sort((a, b) => a.tierMin - b.tierMin);
    const matched = sortedTiers.find(t => quantity <= t.tierMin);
    return matched || sortedTiers[sortedTiers.length - 1];
  };

  const activeTier = getActiveTier();

  // Dynamic Price Calculator based on product base price, tier, and selected variant modifiers
  const calculatePrice = () => {
    const validQty = Math.max(1, quantity || minPieces);
    let baseUnitPrice = product.basePrice || product.price || 0;
    if (activeTier) {
      baseUnitPrice = activeTier.pricePerUnit;
    }

    let totalModifiers = 0;
    Object.entries(product.variants || {}).forEach(([key, options]) => {
      if (Array.isArray(options) && options.length > 0) {
        const selectedVal = selectedVariants[key];
        const match = options.find(
          (opt) => (typeof opt === 'string' ? opt : opt.name) === selectedVal
        );
        if (match && typeof match === 'object' && match.priceModifier) {
          totalModifiers += Number(match.priceModifier) || 0;
        }
      }
    });

    const calculatedTotal = (baseUnitPrice + totalModifiers) * validQty;
    return Math.max(1, Math.round(calculatedTotal));
  };

  const totalPrice = calculatePrice();
  const unitPrice = Math.max(0.01, Math.round((totalPrice / Math.max(1, quantity)) * 100) / 100);

  const handleOptionChange = (key, optionName) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [key]: optionName,
    }));
  };

  const handleAddToCart = () => {
    if (isCustomQty) {
      const parsed = parseInt(customQtyInput);
      if (!customQtyInput || isNaN(parsed) || parsed <= 0) {
        alert(`Mandatory Custom Quantity Required!\n\nPlease enter your desired quantity (Minimum ${minPieces} pieces) before adding to cart.`);
        const inputEl = document.getElementById('customQtyField');
        if (inputEl) {
          inputEl.focus();
          inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      if (parsed < minPieces) {
        alert(`Minimum Order Quantity Requirement:\n\nThis product requires a minimum of ${minPieces} pieces. Please enter ${minPieces} or more.`);
        const inputEl = document.getElementById('customQtyField');
        if (inputEl) inputEl.focus();
        return;
      }
    }

    if (quantity < minPieces) {
      alert(`Minimum order quantity for this product is ${minPieces} pieces.`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.title || product.name,
      qty: quantity,
      selectedOptions: selectedVariants,
      paper: selectedVariants.paperStock || selectedVariants.paper || '',
      finish: selectedVariants.finishes || selectedVariants.finish || '',
      sides: selectedVariants.sides || '',
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      image: selectedImage || (imagesList.length > 0 ? imagesList[0] : null),
      uploadedFile: uploadedFile ? uploadedFile.name : null
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    if (isCustomQty) {
      const parsed = parseInt(customQtyInput);
      if (!customQtyInput || isNaN(parsed) || parsed <= 0) {
        alert(`Mandatory Custom Quantity Required!\n\nPlease enter your desired quantity (Minimum ${minPieces} pieces) before proceeding to checkout.`);
        const inputEl = document.getElementById('customQtyField');
        if (inputEl) {
          inputEl.focus();
          inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
      }
      if (parsed < minPieces) {
        alert(`Minimum Order Quantity Requirement:\n\nThis product requires a minimum of ${minPieces} pieces. Please enter ${minPieces} or more.`);
        const inputEl = document.getElementById('customQtyField');
        if (inputEl) inputEl.focus();
        return;
      }
    }

    handleAddToCart();
    if (onNavigateCart) onNavigateCart();
  };

  // Step Counter tracking variable for dynamic section numbers
  let stepCounter = 1;

  return (
    <div className="bg-[#FAFBFD] font-sans min-h-screen text-[#0B1633] pb-20">
      
      {/* Top Breadcrumb & Quick Navigation Bar */}
      <div className="bg-[#07152F] text-white py-5 px-4 sm:px-8 border-b border-slate-800/80 sticky top-0 z-30 backdrop-blur-md bg-[#07152F]/95">
        <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-[#FF5A1F] transition cursor-pointer bg-transparent border-none"
          >
            <FiArrowLeft className="w-4 h-4 text-[#FF5A1F]" /> Back to Products Catalog
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Products</span>
            <span>/</span>
            <span className="text-[#FF5A1F] font-bold">{product.category}</span>
            <span className="hidden xs:inline">/</span>
            <span className="text-white font-extrabold truncate max-w-[160px] hidden xs:inline">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Product Details Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: STICKY IMAGE GALLERY & TECHNICAL SPECS (5 cols) */}
          <div className="lg:col-span-5 sticky top-24 self-start space-y-5">
            
            {/* Main Stage Image Box */}
            <div className="relative bg-white rounded-3xl overflow-hidden border border-[#E7EAF0] shadow-xl group h-[400px] sm:h-[460px] flex items-center justify-center">
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
              ) : (
                <div className="w-full h-full bg-slate-50 flex flex-col items-center justify-center text-slate-400">
                  <FiPackage className="w-20 h-20 text-slate-300 mb-3" />
                  <span className="text-xs font-extrabold">No Image Uploaded</span>
                </div>
              )}

              {/* Wishlist Glass Heart Button */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-center transition-all duration-200 border-none cursor-pointer hover:scale-110 ${
                  isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
                }`}
                title="Save to Wishlist"
              >
                <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-rose-600 text-rose-600' : ''}`} />
              </button>

              {/* Verified Press Quality Badge */}
              <div className="absolute bottom-4 left-4 bg-[#07152F]/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl border border-white/20 flex items-center gap-1.5 shadow-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>300 DPI Prepress Proofed</span>
              </div>
            </div>

            {/* Thumbnail Carousel Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all duration-200 cursor-pointer shrink-0 shadow-xs ${
                      selectedImage === img ? 'border-[#FF5A1F] ring-2 ring-[#FF5A1F]/30 scale-105' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Specifications Card if available */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div id="specs" className="bg-white rounded-3xl p-6 border border-[#E7EAF0] shadow-sm space-y-4 text-xs">
                <h4 className="font-black text-[#0B1633] flex items-center gap-2 border-b border-slate-100 pb-3 text-sm uppercase tracking-wider">
                  <FiFileText className="w-4 h-4 text-[#FF5A1F]" /> Technical Specs & Print Specifications
                </h4>
                <div className="grid grid-cols-2 gap-3 text-slate-600 font-medium">
                  {product.specs.paperGsm && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Paper Weight</span>
                      <strong className="text-slate-900 font-extrabold text-xs">{product.specs.paperGsm}</strong>
                    </div>
                  )}
                  {product.specs.dimensions && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Dimensions</span>
                      <strong className="text-slate-900 font-extrabold text-xs">{product.specs.dimensions}</strong>
                    </div>
                  )}
                  {product.specs.printTech && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Press Tech</span>
                      <strong className="text-slate-900 font-extrabold text-xs">{product.specs.printTech}</strong>
                    </div>
                  )}
                  {product.specs.turnaround && (
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Turnaround</span>
                      <strong className="text-slate-900 font-extrabold text-xs">{product.specs.turnaround}</strong>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Press Guarantee Badges */}
            <div className="bg-white rounded-3xl p-5 border border-[#E7EAF0] shadow-sm grid grid-cols-3 gap-3 text-center text-[11px] font-bold text-slate-700">
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-orange-50/50">
                <FiTruck className="w-5 h-5 text-[#FF5A1F]" />
                <span className="text-[11px] font-black text-slate-900">Express Delivery</span>
                <span className="text-[9.5px] text-slate-500 font-medium">Pan-India Doorstep</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-emerald-50/50">
                <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-[11px] font-black text-slate-900">300 DPI Pre-Flight</span>
                <span className="text-[9.5px] text-slate-500 font-medium">Free File Proof</span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-2 rounded-2xl bg-blue-50/50">
                <FiShield className="w-5 h-5 text-blue-600" />
                <span className="text-[11px] font-black text-slate-900">100% Quality</span>
                <span className="text-[9.5px] text-slate-500 font-medium">Re-print Guarantee</span>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: PRODUCT CONFIGURATOR & PRICING ENGINE (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Header: Title, Rating, Summary */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1 rounded-full bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-black uppercase tracking-wider border border-[#FF5A1F]/20">
                  {product.category}
                </span>
                <div className="flex items-center gap-1 text-amber-500 text-xs font-extrabold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                  <span>4.9</span>
                  <span className="text-slate-400 font-normal">(148 Press Reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black text-[#0B1633] tracking-tight leading-tight">
                {product.title}
              </h1>
            </div>

            {/* LIVE DYNAMIC PRICING ENGINE BAR */}
            <div id="pricing" className="bg-gradient-to-br from-white to-slate-50 rounded-3xl p-6 border border-[#E7EAF0] shadow-md space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <span className="text-xs text-slate-500 font-bold uppercase tracking-wider block mb-1">
                    Calculated Total (Incl. 18% GST)
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-[#FF5A1F] tracking-tight">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm text-slate-600 font-extrabold font-mono">
                      (₹{unitPrice} / unit)
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold border border-emerald-300 inline-flex items-center gap-1.5 shadow-xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    In Stock & Press Ready
                  </span>
                </div>
              </div>

              {activeTier && (
                <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-blue-900 bg-blue-50/80 p-3 rounded-2xl border border-blue-200/90">
                  <span>🎉 Volume Discount Applied: Tier Rate for up to {activeTier.tierMin} units</span>
                  <span className="font-extrabold text-blue-700">₹{activeTier.pricePerUnit}/unit</span>
                </div>
              )}
            </div>

            {/* STEP-BY-STEP PRODUCT CONFIGURATOR FORM */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E7EAF0] shadow-sm space-y-6 text-xs">
              <h3 className="font-black text-sm text-[#0B1633] uppercase tracking-wider border-b border-slate-100 pb-3 flex items-center justify-between">
                <span>Configure Print Specifications</span>
                <span className="text-[11px] font-bold text-[#FF5A1F] uppercase">Interactive Press Studio</span>
              </h3>

              {/* STEP 1: QUANTITY TIER & MANDATORY CUSTOM UNIT SELECTION */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-extrabold text-sm text-[#0B1633] flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#07152F] text-white flex items-center justify-center text-xs font-black">{stepCounter++}</span>
                    <span>Select Quantity Tier:</span>
                  </label>
                  <span className="text-xs font-black text-[#FF5A1F] bg-[#FF5A1F]/10 px-3 py-1 rounded-full border border-[#FF5A1F]/20">
                    {quantity || 0} units selected
                  </span>
                </div>

                {/* Preset Tier Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                  {(product.tieredPricing && product.tieredPricing.length > 0 ? product.tieredPricing : [
                    { tierMin: minPieces, pricePerUnit: product.basePrice || product.price || 5 }
                  ]).map((t, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setIsCustomQty(false);
                        setQuantity(t.tierMin);
                      }}
                      className={`py-3 px-2.5 rounded-2xl font-extrabold text-xs transition border cursor-pointer flex flex-col items-center justify-center gap-1 ${
                        !isCustomQty && quantity === t.tierMin
                          ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-md scale-105'
                          : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                      }`}
                    >
                      <span>Up to {t.tierMin} units</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        !isCustomQty && quantity === t.tierMin ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        ₹{t.pricePerUnit}/unit
                      </span>
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCustomQty(true);
                      setQuantity(customQtyInput || minPieces);
                    }}
                    className={`py-3 px-2.5 rounded-2xl font-extrabold text-xs transition border cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isCustomQty
                        ? 'bg-[#07152F] text-white border-[#07152F] shadow-md scale-105'
                        : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                    }`}
                  >
                    <span>Custom Qty</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isCustomQty ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      Enter Units
                    </span>
                  </button>
                </div>

                {/* Custom Quantity Input Box with Mandatory Flag */}
                {isCustomQty && (
                  <div className={`p-4.5 rounded-2xl border transition-all duration-200 ${
                    !customQtyInput || parseInt(customQtyInput) < minPieces || isNaN(parseInt(customQtyInput))
                      ? 'bg-rose-50/80 border-rose-300 ring-2 ring-rose-200'
                      : 'bg-[#F7F8FA] border-[#E7EAF0]'
                  }`}>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <label htmlFor="customQtyField" className="font-extrabold text-xs text-[#0B1633] shrink-0 flex items-center gap-1">
                          <span>Enter Custom Units (Mandatory)</span>
                          <span className="text-rose-600 font-extrabold text-sm">*</span>:
                        </label>
                        <input
                          id="customQtyField"
                          type="number"
                          min={minPieces}
                          value={customQtyInput}
                          onChange={(e) => {
                            const raw = e.target.value;
                            setCustomQtyInput(raw);
                            const val = parseInt(raw);
                            if (!isNaN(val) && val > 0) {
                              setQuantity(val);
                            } else {
                              setQuantity(0);
                            }
                          }}
                          placeholder={`Min ${minPieces} pcs`}
                          className={`w-36 bg-white border rounded-xl px-3.5 py-2 font-black text-sm text-[#0B1633] focus:outline-none shadow-xs ${
                            !customQtyInput || parseInt(customQtyInput) < minPieces || isNaN(parseInt(customQtyInput))
                              ? 'border-rose-400 focus:border-rose-600 text-rose-900 ring-1 ring-rose-300'
                              : 'border-[#E7EAF0] focus:border-[#FF5A1F]'
                          }`}
                        />
                      </div>
                      {activeTier && (
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                          Tier Rate (Up to {activeTier.tierMin} units): ₹{activeTier.pricePerUnit}/unit
                        </span>
                      )}
                    </div>

                    {(!customQtyInput || parseInt(customQtyInput) <= 0 || isNaN(parseInt(customQtyInput))) ? (
                      <div className="mt-2.5 text-rose-700 text-[11.5px] font-extrabold flex items-center gap-1.5">
                        <span>⚠️ Mandatory Field: Please enter your desired quantity (Minimum {minPieces} pcs) to calculate price.</span>
                      </div>
                    ) : parseInt(customQtyInput) < minPieces ? (
                      <div className="mt-2.5 text-amber-700 text-[11.5px] font-extrabold flex items-center gap-1.5">
                        <span>⚠️ Minimum Order Quantity for this item is {minPieces} pieces. Please enter {minPieces} or more.</span>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              {/* DYNAMIC VARIANT OPTION SECTIONS */}
              {availableVariantEntries.map(([key, optionsList]) => {
                const stepNum = stepCounter++;
                const title = formatKeyToTitle(key);
                const currentSelected = selectedVariants[key];

                // Dropdown layout for paperStock & finishes
                if (key === 'paperStock' || key === 'finishes') {
                  return (
                    <div key={key} className="space-y-2">
                      <label className="font-extrabold text-sm text-[#0B1633] flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-[#07152F] text-white flex items-center justify-center text-xs font-black">{stepNum}</span>
                        <span>{title}:</span>
                      </label>
                      <select
                        value={currentSelected}
                        onChange={(e) => handleOptionChange(key, e.target.value)}
                        className="w-full bg-[#F7F8FA] border border-[#E7EAF0] rounded-2xl p-3.5 font-bold text-xs text-[#0B1633] focus:outline-none focus:border-[#FF5A1F] shadow-xs cursor-pointer"
                      >
                        {optionsList.map((opt, i) => {
                          const optName = typeof opt === 'string' ? opt : opt.name;
                          const optPrice = typeof opt === 'object' && opt.priceModifier ? opt.priceModifier : 0;
                          return (
                            <option key={i} value={optName}>
                              {optName} {optPrice > 0 ? `(+₹${optPrice}/unit)` : ''}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  );
                }

                // Grid button layout for all other option types
                return (
                  <div key={key} className="space-y-2">
                    <label className="font-extrabold text-sm text-[#0B1633] flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#07152F] text-white flex items-center justify-center text-xs font-black">{stepNum}</span>
                      <span>{title}:</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                      {optionsList.map((opt, i) => {
                        const optName = typeof opt === 'string' ? opt : opt.name;
                        const optPrice = typeof opt === 'object' && opt.priceModifier ? opt.priceModifier : 0;
                        const isSelected = currentSelected === optName;

                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => handleOptionChange(key, optName)}
                            className={`py-3 px-3 rounded-2xl font-extrabold text-xs transition-all duration-150 border flex flex-col items-center justify-center gap-1.5 cursor-pointer text-center ${
                              isSelected
                                ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-md scale-105 ring-2 ring-[#FF5A1F]/30'
                                : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                            }`}
                          >
                            <span>{optName}</span>
                            <span className={`text-[9.5px] px-2 py-0.5 rounded-full font-bold ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {optPrice > 0 ? `+₹${optPrice}/unit` : 'Included'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* STEP: UPLOAD PRINT ARTWORK DROPZONE */}
              <div className="space-y-2 pt-2">
                <label className="font-extrabold text-sm text-[#0B1633] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#07152F] text-white flex items-center justify-center text-xs font-black">{stepCounter++}</span>
                  <span>Upload Print Artwork File (PDF, AI, PSD, PNG):</span>
                </label>
                <label className="border-2 border-dashed border-[#E7EAF0] hover:border-[#FF5A1F] rounded-2xl p-5 text-center block bg-[#F7F8FA] cursor-pointer transition-all duration-200 group">
                  <FiUploadCloud className="w-8 h-8 text-[#FF5A1F] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-slate-800 font-extrabold block">
                    {uploadedFile ? `Uploaded: ${uploadedFile.name}` : 'Click to select artwork file or drag here'}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium block mt-1">
                    Accepts 300 DPI High-Res PDF, PSD, AI, EPS, PNG up to 100MB
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                </label>
              </div>

            </div>

            {/* ACTION BUTTONS: ADD TO CART & BUY NOW */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 px-6 rounded-2xl bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-black text-sm tracking-wider uppercase shadow-xl shadow-[#FF5A1F]/25 flex items-center justify-center gap-2 cursor-pointer transition border-none hover:scale-[1.02]"
              >
                {addedSuccess ? (
                  <>
                    <FiCheckCircle className="w-5 h-5 text-white" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-5 h-5" /> Add to Cart (₹{totalPrice.toLocaleString()})
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-4 px-8 rounded-2xl bg-[#07152F] hover:bg-slate-800 text-white font-black text-sm tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 cursor-pointer transition border-none hover:scale-[1.02]"
              >
                <FiZap className="w-4 h-4 text-amber-400 fill-amber-400" /> Buy Now / Checkout
              </button>
            </div>

            {/* PRODUCT INFORMATION ACCORDION DROPDOWN TABS */}
            <div className="bg-white rounded-3xl border border-[#E7EAF0] shadow-sm divide-y divide-slate-100 overflow-hidden text-xs">
              
              {/* TAB 1: PRODUCT DESCRIPTION & HIGHLIGHTS (OPEN BY DEFAULT) */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'description' ? null : 'description')}
                  className="w-full p-4 sm:p-5 text-left font-extrabold text-sm text-[#0B1633] flex items-center justify-between cursor-pointer border-none bg-transparent hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <FiFileText className="w-4.5 h-4.5 text-[#FF5A1F]" /> Product Description & Overview
                  </span>
                  {openAccordion === 'description' ? <FiChevronUp className="w-4 h-4 text-slate-500" /> : <FiChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openAccordion === 'description' && (
                  <div className="p-5 pt-1 text-slate-700 leading-relaxed text-xs space-y-4">
                    <p className="font-medium text-slate-800 text-xs sm:text-sm leading-relaxed">
                      {product.description || product.summary || 'High-quality custom print product crafted with premium finishing and industrial offset precision.'}
                    </p>

                    {/* Summary Quick Chips */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100">
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Selected Quantity</span>
                        <span className="font-extrabold text-[#0B1633] text-xs">{quantity.toLocaleString()} Units</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Category</span>
                        <span className="font-extrabold text-[#0B1633] text-xs truncate block">{product.category}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/70">
                        <span className="text-[9.5px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">Est. Turnaround</span>
                        <span className="font-extrabold text-emerald-700 text-xs">{product.specs?.turnaround || product.turnaround || '24-48 Hours Express'}</span>
                      </div>
                    </div>

                    {/* Active Variant Configuration Summary */}
                    {Object.keys(selectedVariants).length > 0 && (
                      <div className="pt-2 space-y-1.5">
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Selected Configuration:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(selectedVariants).map(([key, val]) => (
                            <span key={key} className="px-2.5 py-1 rounded-xl bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-800 flex items-center gap-1">
                              <span className="text-slate-400 font-semibold">{formatKeyToTitle(key)}:</span>
                              <span className="text-[#0B1633] font-black">{val}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* TAB 2: PRINT SPECIFICATIONS & PRE-FLIGHT RULES */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'overview' ? null : 'overview')}
                  className="w-full p-4 sm:p-5 text-left font-extrabold text-sm text-[#0B1633] flex items-center justify-between cursor-pointer border-none bg-transparent hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <FiInfo className="w-4.5 h-4.5 text-[#FF5A1F]" /> Print Guidelines & File Pre-flight Rules
                  </span>
                  {openAccordion === 'overview' ? <FiChevronUp className="w-4 h-4 text-slate-500" /> : <FiChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openAccordion === 'overview' && (
                  <div className="p-5 pt-1 text-slate-600 leading-relaxed space-y-2">
                    <p className="font-medium text-xs">
                      For optimal CMYK press calibration, submit artwork files with 3mm bleed margins and minimum 300 DPI resolution.
                    </p>
                    <ul className="list-disc pl-4 space-y-1 font-medium text-xs text-slate-700">
                      <li>Vector PDF, AI, or PSD preferred for crisp typography and vector logos</li>
                      <li>CMYK color space (RGB files automatically converted during RIP raster processing)</li>
                      <li>Font outlines enabled or fonts embedded inside vector files</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* TAB 3: PRODUCTION TURNAROUND & SHIPPING */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'shipping' ? null : 'shipping')}
                  className="w-full p-4 sm:p-5 text-left font-extrabold text-sm text-[#0B1633] flex items-center justify-between cursor-pointer border-none bg-transparent hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <FiTruck className="w-4.5 h-4.5 text-[#FF5A1F]" /> Production Turnaround & Shipping Logistics
                  </span>
                  {openAccordion === 'shipping' ? <FiChevronUp className="w-4 h-4 text-slate-500" /> : <FiChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openAccordion === 'shipping' && (
                  <div className="p-5 pt-1 text-slate-600 leading-relaxed space-y-1 font-medium text-xs">
                    <p className="text-slate-800 font-bold">⚡ Standard Production: 3-5 business days after artwork approval.</p>
                    <p className="text-slate-800 font-bold">⚡ Same-Day Express: Select Express at checkout for 24-hour priority dispatch.</p>
                  </div>
                )}
              </div>

              {/* TAB 4: 100% QUALITY & RE-PRINT GUARANTEE */}
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'guarantee' ? null : 'guarantee')}
                  className="w-full p-4 sm:p-5 text-left font-extrabold text-sm text-[#0B1633] flex items-center justify-between cursor-pointer border-none bg-transparent hover:bg-slate-50 transition"
                >
                  <span className="flex items-center gap-2.5">
                    <FiShield className="w-4.5 h-4.5 text-[#FF5A1F]" /> 100% Quality & Re-print Guarantee
                  </span>
                  {openAccordion === 'guarantee' ? <FiChevronUp className="w-4 h-4 text-slate-500" /> : <FiChevronDown className="w-4 h-4 text-slate-500" />}
                </button>
                {openAccordion === 'guarantee' && (
                  <div className="p-5 pt-1 text-slate-600 leading-relaxed font-medium text-xs">
                    If your print order arrives with any press defects, trim alignment errors, or courier transit damage, we will re-print and re-ship your complete order at zero additional cost.
                  </div>
                )}
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
}
