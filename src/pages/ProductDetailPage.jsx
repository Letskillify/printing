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
  FiPackage
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

// Helper to convert camelCase keys like 'boxStyle' -> 'Box Style'
const formatKeyToTitle = (key) => {
  const titles = {
    paperStock: 'Paper Stock & Board Weight',
    finishes: 'Special Finishes',
    sides: 'Print Sides Option',
    corners: 'Edge Cutting & Corner Finishing',
    sizeFormat: 'Card Size & Aspect Ratio Format',
    lamination: 'Lamination Option & Coating',
    foilAccents: 'Metallic Foil Accents & Hot Stamping',
    spotUV: 'Spot UV & Selective Gloss Textures',
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

  // Parse available variants dynamically from product object ONLY
  // Only include keys that exist in product.variants and have non-empty arrays
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

    const calculatedTotal = (baseUnitPrice + totalModifiers) * quantity;
    return Math.max(1, Math.round(calculatedTotal));
  };

  const totalPrice = calculatePrice();
  const unitPrice = Math.max(0.01, Math.round((totalPrice / quantity) * 100) / 100);

  const handleOptionChange = (key, optionName) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [key]: optionName,
    }));
  };

  const handleAddToCart = () => {
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
    handleAddToCart();
    if (onNavigateCart) onNavigateCart();
  };

  // Step Counter tracking variable for dynamic section numbers
  let stepCounter = 1;

  return (
    <div className="bg-[#FAFBFD] font-sans min-h-screen text-[#0B1633] pb-16">
      {/* Top Breadcrumbs Bar */}
      <div className="bg-[#07152F] text-white py-6 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white transition cursor-pointer bg-transparent border-none"
          >
            <FiArrowLeft className="w-4 h-4 text-[#FF5A1F]" /> Back to Products Catalog
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Catalog</span>
            <span>/</span>
            <span className="text-[#FF5A1F] font-bold">{product.category}</span>
            <span>/</span>
            <span className="text-white font-bold truncate max-w-[150px]">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Detail Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image Gallery & Specs (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative bg-white rounded-[20px] overflow-hidden border border-[#E7EAF0] shadow-sm h-[380px] sm:h-[420px]">
              {selectedImage ? (
                <img 
                  src={selectedImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                  <FiPackage className="w-16 h-16 text-slate-300 mb-2" />
                  <span className="text-xs font-bold">No Image Uploaded</span>
                </div>
              )}

              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs shadow-md flex items-center justify-center transition border-none cursor-pointer ${
                  isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
                }`}
                title="Save to Wishlist"
              >
                <FiHeart className={`w-5 h-5 ${isSaved ? 'fill-rose-600' : ''}`} />
              </button>
            </div>

            {/* Thumbnail Row */}
            {imagesList.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {imagesList.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 rounded-[14px] overflow-hidden border-2 transition cursor-pointer shrink-0 ${
                      selectedImage === img ? 'border-[#FF5A1F]' : 'border-[#E7EAF0] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Technical Specifications Card if available */}
            {product.specs && Object.keys(product.specs).length > 0 && (
              <div className="bg-white rounded-[16px] p-5 border border-[#E7EAF0] space-y-3 text-xs">
                <h4 className="font-extrabold text-[#0B1633] flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <FiFileText className="w-4 h-4 text-[#FF5A1F]" /> Technical Specs & Print Specifications
                </h4>
                <div className="grid grid-cols-2 gap-2 text-slate-600 font-medium">
                  {product.specs.paperGsm && <div><span className="font-bold text-slate-900">Paper GSM:</span> {product.specs.paperGsm}</div>}
                  {product.specs.dimensions && <div><span className="font-bold text-slate-900">Dimensions:</span> {product.specs.dimensions}</div>}
                  {product.specs.printTech && <div><span className="font-bold text-slate-900">Print Tech:</span> {product.specs.printTech}</div>}
                  {product.specs.turnaround && <div><span className="font-bold text-slate-900">Turnaround:</span> {product.specs.turnaround}</div>}
                </div>
              </div>
            )}

            {/* Trust Badges */}
            <div className="bg-white rounded-[16px] p-4 border border-[#E7EAF0] grid grid-cols-3 gap-2 text-center text-[11px] font-bold text-slate-700">
              <div className="flex flex-col items-center gap-1">
                <FiTruck className="w-5 h-5 text-[#FF5A1F]" />
                <span>Express Shipping</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FiCheckCircle className="w-5 h-5 text-emerald-600" />
                <span>300 DPI Proof</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <FiShield className="w-5 h-5 text-blue-600" />
                <span>Quality Guarantee</span>
              </div>
            </div>
          </div>

          {/* Right Column: Configuration & Price (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Title & Category Header */}
            <div>
              <span className="inline-block bg-[#FF5A1F]/10 text-[#FF5A1F] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider mb-2">
                {product.category}
              </span>
              <h1 className="text-3xl font-extrabold text-[#0B1633] tracking-tight">
                {product.title}
              </h1>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                {product.description || product.summary}
              </p>
            </div>

            {/* Price Preview Card */}
            <div className="bg-white rounded-[16px] p-5 border border-[#E7EAF0] shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-[#667085] font-semibold block">Calculated Total (Incl. 18% GST)</span>
                <span className="text-3xl font-black text-[#FF5A1F]">₹{totalPrice.toLocaleString()}</span>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs text-slate-700 font-bold font-mono">₹{unitPrice} / unit</span>
                  {activeTier && (
                    <span className="text-[11px] bg-blue-50 text-blue-700 font-bold px-2.5 py-0.5 rounded-full border border-blue-200">
                      Listed rate for up to {activeTier.tierMin} units: ₹{activeTier.pricePerUnit}/unit
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-extrabold border border-emerald-200 inline-block">
                  In Stock & Ready for Press
                </span>
              </div>
            </div>

            {/* Product Customizer Form */}
            <div className="bg-white rounded-[20px] p-6 border border-[#E7EAF0] shadow-sm space-y-5 text-left text-xs">
              <h3 className="font-extrabold text-sm text-[#0B1633] uppercase tracking-wider text-[#FF5A1F] border-b border-slate-100 pb-2">
                Configure Print Specs
              </h3>

              {/* Step: Select Quantity Tier */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <label className="block font-bold text-[#0B1633]">
                      {stepCounter++}. Select Quantity Tier (Listed prices apply UP TO given units):
                    </label>
                    <span className="text-[10px] font-extrabold text-slate-700 bg-slate-100 border border-slate-300 px-2 py-0.5 rounded-full">
                      Min {minPieces} pcs
                    </span>
                  </div>
                  <span className="text-[11px] font-bold text-[#FF5A1F] bg-[#FF5A1F]/10 px-2.5 py-0.5 rounded-full">
                    {quantity} units selected
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-3">
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
                      className={`py-2 px-2 rounded-[12px] font-bold text-xs transition border cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                        !isCustomQty && quantity === t.tierMin
                          ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                          : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                      }`}
                    >
                      <span>Up to {t.tierMin} units</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
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
                    className={`py-2 px-2 rounded-[12px] font-bold text-xs transition border cursor-pointer flex flex-col items-center justify-center gap-0.5 ${
                      isCustomQty
                        ? 'bg-[#07152F] text-white border-[#07152F] shadow-sm'
                        : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                    }`}
                  >
                    <span>Custom Qty</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                      isCustomQty ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      Any Units
                    </span>
                  </button>
                </div>

                {/* Custom Quantity Input Box */}
                {isCustomQty && (
                  <div className="bg-[#F7F8FA] p-3 rounded-[14px] border border-[#E7EAF0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      <span className="font-bold text-xs text-[#0B1633] shrink-0">Enter Custom Units:</span>
                      <input
                        type="number"
                        min={minPieces}
                        value={customQtyInput}
                        onChange={(e) => {
                          const val = parseInt(e.target.value) || '';
                          setCustomQtyInput(val);
                          setQuantity(val ? Math.max(1, val) : 1);
                        }}
                        placeholder={`Min ${minPieces} pcs`}
                        className="w-32 bg-white border border-[#E7EAF0] rounded-xl px-3 py-1.5 font-bold text-xs text-[#0B1633] focus:outline-none focus:border-[#FF5A1F]"
                      />
                    </div>
                    {activeTier && (
                      <span className="text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-3 py-1 rounded-full">
                        Tier Rate (Up to {activeTier.tierMin} units): ₹{activeTier.pricePerUnit}/unit
                      </span>
                    )}
                  </div>
                )}

                {/* MOQ Warning Banner if quantity is below minimum */}
                {quantity < minPieces && (
                  <div className="mt-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold flex items-center gap-2">
                    <span>⚠️ Minimum order requirement for this product is <span className="font-black text-amber-900">{minPieces} pieces</span>. Please increase your quantity.</span>
                  </div>
                )}
              </div>

              {/* DYNAMIC VARIANT OPTION SECTIONS — ONLY rendered if uploaded/configured in product data! */}
              {availableVariantEntries.map(([key, optionsList]) => {
                const stepNum = stepCounter++;
                const title = formatKeyToTitle(key);
                const currentSelected = selectedVariants[key];

                // Dropdown layout for paperStock and finishes
                if (key === 'paperStock' || key === 'finishes') {
                  return (
                    <div key={key}>
                      <label className="block font-bold text-[#0B1633] mb-2">{stepNum}. {title}:</label>
                      <select
                        value={currentSelected}
                        onChange={(e) => handleOptionChange(key, e.target.value)}
                        className="w-full bg-[#F7F8FA] border border-[#E7EAF0] rounded-[12px] p-3 font-semibold text-[#0B1633] focus:outline-none focus:border-[#FF5A1F]"
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
                  <div key={key}>
                    <label className="block font-bold text-[#0B1633] mb-2">{stepNum}. {title}:</label>
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
                            className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                              isSelected
                                ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                                : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                            }`}
                          >
                            <span>{optName}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                              isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                            }`}>
                              {optPrice > 0 ? `+₹${optPrice}/unit` : 'Standard'}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}

              {/* Step: Upload Artwork File Dropzone */}
              <div>
                <label className="block font-bold text-[#0B1633] mb-2">
                  {stepCounter++}. Upload Print Artwork File (PDF, AI, PSD, PNG):
                </label>
                <label className="border-2 border-dashed border-[#E7EAF0] hover:border-[#FF5A1F] rounded-[14px] p-4 text-center block bg-[#F7F8FA] cursor-pointer transition">
                  <FiUploadCloud className="w-7 h-7 text-[#FF5A1F] mx-auto mb-1" />
                  <span className="text-xs text-[#667085] font-semibold block">
                    {uploadedFile ? uploadedFile.name : 'Click to select artwork file or drag here'}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => setUploadedFile(e.target.files[0])}
                  />
                </label>
              </div>

            </div>

            {/* Add to Cart & Buy Now Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-[14px] bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-sm shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-2 cursor-pointer transition border-none"
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
                className="py-4 px-8 rounded-[14px] bg-[#07152F] hover:bg-slate-800 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition border-none"
              >
                <FiZap className="w-4 h-4 text-amber-400 fill-amber-400" /> Buy Now / Checkout
              </button>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
}

