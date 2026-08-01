import React, { useState } from 'react';
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
  FiLayers,
  FiPackage
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';

export function ProductDetailPage({ product, onBack, onNavigateCart }) {
  const { addToCart, toggleWishlist, isInWishlist } = useAuth();

  const imagesList = product.images && product.images.length > 0 
    ? product.images 
    : (product.image ? [product.image] : []);

  const [selectedImage, setSelectedImage] = useState(
    imagesList.length > 0 ? imagesList[0] : null
  );

  // Minimum Order Quantity (Min Pieces) from product or default 100
  const minPieces = product.minOrderQty || 100;

  // Dynamic Quantity Tiers from product object or default
  const quantityTiers = (product.tieredPricing && product.tieredPricing.length > 0)
    ? product.tieredPricing.map(t => t.tierMin)
    : [100, 250, 500, 1000, 2500];

  const [isCustomQty, setIsCustomQty] = useState(true);
  const [customQtyInput, setCustomQtyInput] = useState(minPieces);
  const [quantity, setQuantity] = useState(minPieces);

  // Paper variants from product object
  const paperOptions = (product.variants?.paperStock && product.variants.paperStock.length > 0)
    ? product.variants.paperStock.map(v => v.name)
    : ['350gsm Premium Matte', '400gsm Heavy Velvet Card', '300gsm FSC Kraft'];

  const [paperStock, setPaperStock] = useState(paperOptions[0]);

  // Finish variants from product object
  const finishOptions = (product.variants?.finishes && product.variants.finishes.length > 0)
    ? product.variants.finishes.map(v => v.name)
    : ['Matte Lamination', 'Gold Foil Accent', 'Spot UV Gloss'];

  const [finish, setFinish] = useState(finishOptions[0]);

  // Sides Printing variants (Single-sided, Double-sided)
  const sidesVariants = (product.variants?.sides && product.variants.sides.length > 0)
    ? product.variants.sides
    : [
        { name: 'Single-sided', priceModifier: 0 },
        { name: 'Double-sided', priceModifier: 1.5 }
      ];

  const [selectedSides, setSelectedSides] = useState(sidesVariants[0]?.name || 'Single-sided');

  // Corner & Edge Cutting variants (Standard, Edge Cutting, Rounded Corners)
  const cornersVariants = (product.variants?.corners && product.variants.corners.length > 0)
    ? product.variants.corners
    : [
        { name: 'Standard', priceModifier: 0 },
        { name: 'Edge Cutting', priceModifier: 1.0 },
        { name: 'Rounded Corners', priceModifier: 0.5 }
      ];

  const [selectedCorners, setSelectedCorners] = useState(cornersVariants[0]?.name || 'Standard');

  // Lamination variants from product object
  const laminationVariants = (product.variants?.lamination && product.variants.lamination.length > 0)
    ? product.variants.lamination
    : [
        { name: 'No Lamination', priceModifier: 0 },
        { name: 'Gloss Lamination', priceModifier: 0.5 },
        { name: 'Matte Lamination', priceModifier: 0.8 },
        { name: 'Velvet Soft-Touch Lamination', priceModifier: 1.5 }
      ];

  const [selectedLamination, setSelectedLamination] = useState(laminationVariants[0]?.name || 'No Lamination');

  // Size & Aspect Ratio Formats
  const sizeFormatVariants = (product.variants?.sizeFormat && product.variants.sizeFormat.length > 0)
    ? product.variants.sizeFormat
    : [
        { name: 'Standard (90x55mm)', priceModifier: 0 },
        { name: 'Square (60x60mm)', priceModifier: 0.5 },
        { name: 'Slim (90x45mm)', priceModifier: 0.3 },
        { name: 'Foldable 4-Panel', priceModifier: 1.8 }
      ];
  const [selectedSizeFormat, setSelectedSizeFormat] = useState(sizeFormatVariants[0]?.name || 'Standard (90x55mm)');

  // Metallic Foil Accents
  const foilAccentsVariants = (product.variants?.foilAccents && product.variants.foilAccents.length > 0)
    ? product.variants.foilAccents
    : [
        { name: 'No Metallic Foil', priceModifier: 0 },
        { name: 'Raised Gold Foil', priceModifier: 2.2 },
        { name: 'Raised Silver Foil', priceModifier: 2.0 },
        { name: 'Rose Gold Foil', priceModifier: 2.5 },
        { name: 'Holographic Laser Foil', priceModifier: 3.0 }
      ];
  const [selectedFoil, setSelectedFoil] = useState(foilAccentsVariants[0]?.name || 'No Metallic Foil');

  // Spot UV & 3D Textures
  const spotUVVariants = (product.variants?.spotUV && product.variants.spotUV.length > 0)
    ? product.variants.spotUV
    : [
        { name: 'No Spot UV', priceModifier: 0 },
        { name: 'Single-Sided Spot UV Logo', priceModifier: 1.2 },
        { name: 'Double-Sided Spot UV Accent', priceModifier: 2.0 },
        { name: '3D Embossed Raised UV', priceModifier: 2.8 }
      ];
  const [selectedSpotUV, setSelectedSpotUV] = useState(spotUVVariants[0]?.name || 'No Spot UV');

  // Artwork Proofing Level
  const proofServiceVariants = (product.variants?.proofService && product.variants.proofService.length > 0)
    ? product.variants.proofService
    : [
        { name: 'Print-Ready (Self Upload)', priceModifier: 0 },
        { name: 'Prepress CMYK Proofing (+₹99)', priceModifier: 0.5 },
        { name: 'Full Designer Support (+₹299)', priceModifier: 1.5 }
      ];
  const [selectedProof, setSelectedProof] = useState(proofServiceVariants[0]?.name || 'Print-Ready (Self Upload)');

  // Packaging & Presentation Style
  const packagingStyleVariants = (product.variants?.packagingStyle && product.variants.packagingStyle.length > 0)
    ? product.variants.packagingStyle
    : [
        { name: 'Standard Eco Bulk Shrink', priceModifier: 0 },
        { name: 'Acrylic Desk Storage Box', priceModifier: 1.2 },
        { name: 'Luxury Gift Presentation Box', priceModifier: 3.5 }
      ];
  const [selectedPackaging, setSelectedPackaging] = useState(packagingStyleVariants[0]?.name || 'Standard Eco Bulk Shrink');

  const [uploadedFile, setUploadedFile] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isSaved = isInWishlist(product.id);

  // Active pricing tier lookup (Listed prices apply UP TO the given units limit)
  const getActiveTier = () => {
    if (!product.tieredPricing || product.tieredPricing.length === 0) return null;
    const sortedTiers = [...product.tieredPricing].sort((a, b) => a.tierMin - b.tierMin);
    // Find first tier where quantity <= tierMin
    const matched = sortedTiers.find(t => quantity <= t.tierMin);
    return matched || sortedTiers[sortedTiers.length - 1];
  };

  const activeTier = getActiveTier();

  // Dynamic Price Calculator based on Admin Panel Uploaded Tiers & Modifiers
  const calculatePrice = () => {
    const base = product.basePrice || 199;
    
    // Side modifier
    const sideObj = sidesVariants.find(s => s.name === selectedSides);
    const sideModifier = sideObj ? (sideObj.priceModifier || 0) : 0;

    // Corner/Edge modifier
    const cornerObj = cornersVariants.find(c => c.name === selectedCorners);
    const cornerModifier = cornerObj ? (cornerObj.priceModifier || 0) : 0;

    // Lamination modifier
    const lamObj = laminationVariants.find(l => l.name === selectedLamination);
    const lamModifier = lamObj ? (lamObj.priceModifier || 0) : 0;

    // Size format modifier
    const sizeObj = sizeFormatVariants.find(s => s.name === selectedSizeFormat);
    const sizeModifier = sizeObj ? (sizeObj.priceModifier || 0) : 0;

    // Foil accents modifier
    const foilObj = foilAccentsVariants.find(f => f.name === selectedFoil);
    const foilModifier = foilObj ? (foilObj.priceModifier || 0) : 0;

    // Spot UV modifier
    const uvObj = spotUVVariants.find(u => u.name === selectedSpotUV);
    const uvModifier = uvObj ? (uvObj.priceModifier || 0) : 0;

    // Proofing modifier
    const proofObj = proofServiceVariants.find(p => p.name === selectedProof);
    const proofModifier = proofObj ? (proofObj.priceModifier || 0) : 0;

    // Packaging modifier
    const pkgObj = packagingStyleVariants.find(k => k.name === selectedPackaging);
    const pkgModifier = pkgObj ? (pkgObj.priceModifier || 0) : 0;

    const finishPrice = finish.toLowerCase().includes('gold') ? 350 : finish.toLowerCase().includes('uv') ? 250 : 0;

    // Base price per unit for UP TO given units from admin panel tier matrix
    let baseUnitPrice = product.pricePerUnit || 1.2;
    if (activeTier) {
      baseUnitPrice = activeTier.pricePerUnit;
    }

    const totalModifiers = sideModifier + cornerModifier + lamModifier + sizeModifier + foilModifier + uvModifier + proofModifier + pkgModifier;
    const calculatedTotal = (baseUnitPrice + totalModifiers) * quantity + finishPrice;
    return Math.max(1, Math.round(calculatedTotal));
  };

  const totalPrice = calculatePrice();
  const unitPrice = Math.max(0.5, Math.round((totalPrice / quantity) * 100) / 100);

  const handleAddToCart = () => {
    if (quantity < minPieces) {
      alert(`Minimum order quantity for this product is ${minPieces} pieces.`);
      return;
    }

    addToCart({
      id: product.id,
      name: product.title || product.name,
      qty: quantity,
      paper: paperStock,
      finish: finish,
      sides: selectedSides,
      corners: selectedCorners,
      lamination: selectedLamination,
      sizeFormat: selectedSizeFormat,
      foil: selectedFoil,
      spotUV: selectedSpotUV,
      proof: selectedProof,
      packaging: selectedPackaging,
      unitPrice: unitPrice,
      totalPrice: totalPrice,
      image: selectedImage || (imagesList.length > 0 ? imagesList[0] : null)
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    if (onNavigateCart) onNavigateCart();
  };

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
          
          {/* Left Column: Image Gallery (5 cols) */}
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
            {product.specs && (
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

          {/* Right Column: Specifications & Configuration (7 cols) */}
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

              {/* 1. Select Quantity */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <label className="block font-bold text-[#0B1633]">1. Select Quantity Tier (Listed prices apply UP TO given units):</label>
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
                    { tierMin: 100, pricePerUnit: 6.5 },
                    { tierMin: 250, pricePerUnit: 5.5 },
                    { tierMin: 500, pricePerUnit: 4.8 },
                    { tierMin: 1000, pricePerUnit: 4.0 },
                    { tierMin: 2500, pricePerUnit: 3.2 }
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

                {/* Custom Quantity Input Box (Default Active) */}
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

              {/* 2. Paper Stock */}
              {paperOptions.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">2. Paper Stock & Board Weight:</label>
                  <select
                    value={paperStock}
                    onChange={(e) => setPaperStock(e.target.value)}
                    className="w-full bg-[#F7F8FA] border border-[#E7EAF0] rounded-[12px] p-3 font-semibold text-[#0B1633] focus:outline-none focus:border-[#FF5A1F]"
                  >
                    {paperOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* 3. Sides Printing */}
              {sidesVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">3. Print Sides Option:</label>
                  <div className="grid grid-cols-2 gap-3">
                    {sidesVariants.map((side, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSides(side.name)}
                        className={`py-3 px-4 rounded-[12px] font-bold text-xs transition border flex items-center justify-between cursor-pointer ${
                          selectedSides === side.name
                            ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{side.name}</span>
                        <span className={`text-[11px] px-2 py-0.5 rounded-full ${
                          selectedSides === side.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {side.priceModifier > 0 ? `+₹${side.priceModifier}/unit` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Edge Cutting & Corner Finishing */}
              {cornersVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">4. Edge Cutting & Corner Finishing:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {cornersVariants.map((cut, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedCorners(cut.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedCorners === cut.name
                            ? 'bg-[#07152F] text-white border-[#07152F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{cut.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedCorners === cut.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {cut.priceModifier > 0 ? `+₹${cut.priceModifier}/unit` : 'Standard'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. Card Size & Format */}
              {sizeFormatVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">5. Card Size & Aspect Ratio Format:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {sizeFormatVariants.map((sz, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSizeFormat(sz.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedSizeFormat === sz.name
                            ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{sz.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedSizeFormat === sz.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {sz.priceModifier > 0 ? `+₹${sz.priceModifier}/unit` : 'Standard'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. Lamination Finishing Options */}
              {laminationVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">6. Lamination Option & Coating:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {laminationVariants.map((lam, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedLamination(lam.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedLamination === lam.name
                            ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{lam.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedLamination === lam.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {lam.priceModifier > 0 ? `+₹${lam.priceModifier}/unit` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 7. Metallic Foil Accents & Stamping */}
              {foilAccentsVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">7. Metallic Foil Accents & Hot Stamping:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {foilAccentsVariants.map((foil, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedFoil(foil.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedFoil === foil.name
                            ? 'bg-[#07152F] text-white border-[#07152F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{foil.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedFoil === foil.name ? 'bg-amber-400 text-slate-900 font-extrabold' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {foil.priceModifier > 0 ? `+₹${foil.priceModifier}/unit` : 'No Foil'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 8. Spot UV & 3D Textures */}
              {spotUVVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">8. Spot UV & Selective Gloss Textures:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {spotUVVariants.map((uv, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedSpotUV(uv.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedSpotUV === uv.name
                            ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{uv.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedSpotUV === uv.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {uv.priceModifier > 0 ? `+₹${uv.priceModifier}/unit` : 'No UV'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 9. Artwork Proofing & Prepress Level */}
              {proofServiceVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">9. Prepress File Check & Proofing Service:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {proofServiceVariants.map((proof, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedProof(proof.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedProof === proof.name
                            ? 'bg-[#07152F] text-white border-[#07152F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{proof.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedProof === proof.name ? 'bg-emerald-400 text-slate-900 font-extrabold' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {proof.priceModifier > 0 ? `+₹${proof.priceModifier}/unit` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 10. Packaging & Presentation Box */}
              {packagingStyleVariants.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">10. Packaging & Presentation Box:</label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {packagingStyleVariants.map((pkg, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedPackaging(pkg.name)}
                        className={`py-3 px-3 rounded-[12px] font-bold text-xs transition border flex flex-col items-center justify-center gap-1 cursor-pointer text-center ${
                          selectedPackaging === pkg.name
                            ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        <span>{pkg.name}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                          selectedPackaging === pkg.name ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {pkg.priceModifier > 0 ? `+₹${pkg.priceModifier}/unit` : 'Standard'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 11. Upload Artwork File Dropzone */}
              <div>
                <label className="block font-bold text-[#0B1633] mb-2">11. Upload Print Artwork File (PDF, AI, PSD, PNG):</label>
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
                className="flex-1 py-4 rounded-[14px] bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-sm shadow-md shadow-[#FF5A1F]/20 flex items-center justify-center gap-2 cursor-pointer transition"
              >
                {addedSuccess ? (
                  <>
                    <FiCheckCircle className="w-5 h-5 text-white" /> Added to Cart!
                  </>
                ) : (
                  <>
                    <FiShoppingBag className="w-5 h-5" /> Add to Cart (₹{totalPrice})
                  </>
                )}
              </button>

              <button
                onClick={handleBuyNow}
                className="py-4 px-8 rounded-[14px] bg-[#07152F] hover:bg-slate-800 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition"
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
