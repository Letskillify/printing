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

  // Dynamic Quantity Tiers from product object or default
  const quantityTiers = (product.tieredPricing && product.tieredPricing.length > 0)
    ? product.tieredPricing.map(t => t.tierMin)
    : [100, 250, 500, 1000, 2500];

  const [quantity, setQuantity] = useState(quantityTiers[0] || 100);

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
  const [uploadedFile, setUploadedFile] = useState(null);
  const [addedSuccess, setAddedSuccess] = useState(false);

  const isSaved = isInWishlist(product.id);

  // Dynamic Price Calculator
  const calculatePrice = () => {
    const base = product.basePrice || 199;
    
    // Check if tiered price match exists
    if (product.tieredPricing && product.tieredPricing.length > 0) {
      const matchTier = product.tieredPricing.find(t => t.tierMin === quantity);
      if (matchTier) {
        return Math.round(quantity * matchTier.pricePerUnit);
      }
    }

    const qtyPrice = (quantity / 100) * (product.pricePerUnit || 1.2) * 80;
    const finishPrice = finish.toLowerCase().includes('gold') ? 350 : finish.toLowerCase().includes('uv') ? 250 : 0;
    return Math.round(base + qtyPrice + finishPrice);
  };

  const totalPrice = calculatePrice();
  const unitPrice = Math.max(0.5, Math.round((totalPrice / quantity) * 100) / 100);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title || product.name,
      qty: quantity,
      paper: paperStock,
      finish: finish,
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
                <span className="text-xs text-slate-500 font-mono block mt-0.5">₹{unitPrice} / unit</span>
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
                <label className="block font-bold text-[#0B1633] mb-2">1. Select Quantity Tier:</label>
                <div className="grid grid-cols-5 gap-2">
                  {quantityTiers.map((qty) => (
                    <button
                      key={qty}
                      onClick={() => setQuantity(qty)}
                      className={`py-2.5 rounded-[12px] font-bold text-xs transition border cursor-pointer ${
                        quantity === qty
                          ? 'bg-[#FF5A1F] text-white border-[#FF5A1F] shadow-sm'
                          : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                      }`}
                    >
                      {qty} units
                    </button>
                  ))}
                </div>
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

              {/* 3. Special Finishes */}
              {finishOptions.length > 0 && (
                <div>
                  <label className="block font-bold text-[#0B1633] mb-2">3. Special Luxury Finish Accent:</label>
                  <div className="grid grid-cols-3 gap-3">
                    {finishOptions.map((f, i) => (
                      <button
                        key={i}
                        onClick={() => setFinish(f)}
                        className={`py-2.5 px-3 rounded-[12px] font-bold text-xs transition border text-center cursor-pointer ${
                          finish === f
                            ? 'bg-[#07152F] text-white border-[#07152F] shadow-sm'
                            : 'bg-[#F7F8FA] text-[#0B1633] border-[#E7EAF0] hover:border-[#FF5A1F]'
                        }`}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Upload Artwork File Dropzone */}
              <div>
                <label className="block font-bold text-[#0B1633] mb-2">4. Upload Print Artwork File (PDF, AI, PSD, PNG):</label>
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
