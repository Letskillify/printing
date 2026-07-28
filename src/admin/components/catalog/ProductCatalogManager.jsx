import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  CheckCircle2, 
  Search,
  Grid,
  Layers,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { uploadToCloudinary } from '../../../services/cloudinary';

export const ProductCatalogManager = () => {
  const { products, saveProduct, removeProduct } = useAdmin();
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const handleDeleteProduct = (productId, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}" from the catalog? This action cannot be undone.`)) {
      removeProduct(productId);
    }
  };

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Business Stationery',
    basePrice: 5.0,
    summary: '',
    description: '',
    specs: {
      paperGsm: '350 GSM',
      dimensions: '91mm x 53mm',
      printTech: 'Offset Litho',
      turnaround: '24-48 Hours'
    },
    images: [],
    variants: {
      paperStock: [{ name: '350 GSM Matte', priceModifier: 0 }],
      finishes: [{ name: 'Matte Lamination', priceModifier: 0 }],
      corners: [{ name: 'Standard Square', priceModifier: 0 }]
    },
    tieredPricing: [
      { tierMin: 100, pricePerUnit: 6.0 },
      { tierMin: 500, pricePerUnit: 5.0 },
      { tierMin: 1000, pricePerUnit: 4.0 }
    ],
    seo: {
      metaTitle: '',
      metaDescription: '',
      indexable: true
    }
  });

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Business Stationery',
      basePrice: 5.0,
      summary: '',
      description: '',
      specs: { paperGsm: '350 GSM', dimensions: '91mm x 53mm', printTech: 'Offset Litho', turnaround: '24 Hours' },
      images: [],
      variants: {
        paperStock: [{ name: '350 GSM Matte', priceModifier: 0 }, { name: '400 GSM Velvet', priceModifier: 1.5 }],
        finishes: [{ name: 'Matte Lamination', priceModifier: 0 }, { name: 'Gold Foil Accent', priceModifier: 2.0 }],
        corners: [{ name: 'Standard Square', priceModifier: 0 }, { name: 'Rounded Corners', priceModifier: 0.5 }]
      },
      tieredPricing: [
        { tierMin: 300, pricePerUnit: 5.5 },
        { tierMin: 500, pricePerUnit: 4.8 },
        { tierMin: 1000, pricePerUnit: 4.0 },
        { tierMin: 2500, pricePerUnit: 3.2 }
      ],
      seo: { metaTitle: '', metaDescription: '', indexable: true }
    });
    setIsCreating(true);
  };

  const openEditForm = (prod) => {
    setFormData(prod);
    setEditingProduct(prod);
    setIsCreating(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImage(true);
    const res = await uploadToCloudinary(file, 'products');
    if (res.success) {
      setFormData(prev => ({ ...prev, images: [...prev.images, res.url] }));
    }
    setUploadingImage(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    saveProduct(formData);
    setIsCreating(false);
    setEditingProduct(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            Product Catalog & Dynamic Multi-Variant Matrix Manager
          </h2>
          <p className="text-xs text-slate-500">
            Define custom print SKUs, Cloudinary gallery media, variant price modifiers, and volume pricing grids
          </p>
        </div>

        <button
          onClick={openCreateForm}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" /> Add New Print Product
        </button>
      </div>

      {/* Product List Grid */}
      {!isCreating ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((prod) => (
            <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group">
              <div className="h-44 bg-slate-100 relative overflow-hidden">
                {prod.images && prod.images[0] ? (
                  <img 
                    src={prod.images[0]} 
                    alt={prod.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                    <Package className="w-8 h-8 mb-1 text-slate-300" />
                    <span className="text-[10px] font-bold">No Image Uploaded</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-xs text-white font-black text-xs">
                  Base ₹{prod.basePrice}
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {prod.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{prod.id}</span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{prod.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{prod.summary}</p>

                {/* Variants Preview Pills */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1 text-[10px] text-slate-600">
                  {prod.variants?.paperStock?.map((v, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {v.name}
                    </span>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditForm(prod)}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 font-bold text-xs flex items-center justify-center gap-1 text-slate-700 transition-colors border-none cursor-pointer"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(prod.id, prod.title)}
                    className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs flex items-center justify-center gap-1 transition-colors border-none cursor-pointer"
                    title="Delete Product"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Form Editor Mode */
        <form onSubmit={handleFormSubmit} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <h3 className="font-extrabold text-base text-slate-900">
              {editingProduct ? `Edit Product: ${formData.title}` : 'Create New Custom Print Product'}
            </h3>
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-600"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* General Settings */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">1. Core Information</h4>
              
              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  required
                  className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Luxury Velvet Soft-Touch Business Cards"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Base Price (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Business Stationery">Business Stationery</option>
                    <option value="Large Format Display">Large Format Display</option>
                    <option value="Custom Packaging">Custom Packaging</option>
                    <option value="Apparel & Merch">Apparel & Merch</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Short Summary</label>
                <input
                  type="text"
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                  placeholder="Summary for product card view..."
                />
              </div>

              {/* Cloudinary Gallery Manager */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cloudinary Gallery Images</label>
                <div className="flex items-center gap-3 flex-wrap mb-2">
                  {formData.images.map((imgUrl, i) => (
                    <div key={i} className="relative group/img">
                      <img src={imgUrl} alt="Gallery" className="w-16 h-16 object-cover rounded-xl border border-slate-200" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                        className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center shadow-md hover:bg-red-600 border-none cursor-pointer"
                        title="Remove Image"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <label className="w-16 h-16 rounded-xl border-2 border-dashed border-blue-300 hover:border-blue-500 bg-blue-50/50 flex flex-col items-center justify-center text-blue-600 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    <span className="text-[9px] font-bold mt-1">Upload</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </label>
                </div>
              </div>
            </div>

            {/* Specifications & Tiered Pricing Matrix */}
            <div className="space-y-4">
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">2. Tiered Quantity Pricing Grid</h4>
              
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <div className="text-[11px] font-bold text-slate-600 grid grid-cols-2">
                  <span>Minimum Quantity Tier</span>
                  <span>Price Per Unit (₹)</span>
                </div>
                {formData.tieredPricing.map((tier, idx) => (
                  <div key={idx} className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={tier.tierMin}
                      onChange={(e) => {
                        const newTiers = [...formData.tieredPricing];
                        newTiers[idx].tierMin = parseInt(e.target.value);
                        setFormData({ ...formData, tieredPricing: newTiers });
                      }}
                      className="p-1.5 rounded-lg border bg-white font-semibold"
                    />
                    <input
                      type="number"
                      step="0.01"
                      value={tier.pricePerUnit}
                      onChange={(e) => {
                        const newTiers = [...formData.tieredPricing];
                        newTiers[idx].pricePerUnit = parseFloat(e.target.value);
                        setFormData({ ...formData, tieredPricing: newTiers });
                      }}
                      className="p-1.5 rounded-lg border bg-white font-semibold"
                    />
                  </div>
                ))}
              </div>

              {/* SEO Controls */}
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 pt-2">3. SEO Meta Controls</h4>
              <div>
                <label className="block font-bold text-slate-700 mb-1">SEO Title Tag</label>
                <input
                  type="text"
                  value={formData.seo?.metaTitle || ''}
                  onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                  className="w-full p-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
            >
              Save Product & Update Matrix
            </button>
          </div>
        </form>
      )}

    </div>
  );
};
