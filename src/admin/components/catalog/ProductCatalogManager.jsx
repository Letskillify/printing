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
  DollarSign,
  FolderPlus
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { uploadToCloudinary } from '../../../services/cloudinary';

export const ProductCatalogManager = () => {
  const { products, saveProduct, removeProduct, categories, addCategory, deleteCategory } = useAdmin();
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Category Sidebar Drawer & Quick-Add States
  const [isCategorySidebarOpen, setIsCategorySidebarOpen] = useState(false);
  const [newCatSidebarInput, setNewCatSidebarInput] = useState('');
  const [showInlineCatInput, setShowInlineCatInput] = useState(false);
  const [inlineCatInput, setInlineCatInput] = useState('');
  const [formActiveTab, setFormActiveTab] = useState('general'); // 'general', 'tiered', 'variants'

  const filteredProducts = products.filter(prod => {
    const matchesSearch = (prod.title || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (prod.category || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (prod.summary || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'All' || prod.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

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
    minOrderQty: 100,
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
      sides: [
        { name: 'Single-sided', priceModifier: 0 },
        { name: 'Double-sided', priceModifier: 1.5 }
      ],
      corners: [
        { name: 'Standard', priceModifier: 0 },
        { name: 'Edge Cutting', priceModifier: 1.0 },
        { name: 'Rounded Corners', priceModifier: 0.5 }
      ],
      lamination: [
        { name: 'No Lamination', priceModifier: 0 },
        { name: 'Gloss Lamination', priceModifier: 0.5 },
        { name: 'Matte Lamination', priceModifier: 0.8 },
        { name: 'Velvet Soft-Touch Lamination', priceModifier: 1.5 }
      ],
      sizeFormat: [
        { name: 'Standard (90x55mm)', priceModifier: 0 },
        { name: 'Square (60x60mm)', priceModifier: 0.5 },
        { name: 'Slim (90x45mm)', priceModifier: 0.3 },
        { name: 'Foldable 4-Panel', priceModifier: 1.8 }
      ],
      foilAccents: [
        { name: 'No Metallic Foil', priceModifier: 0 },
        { name: 'Raised Gold Foil', priceModifier: 2.2 },
        { name: 'Raised Silver Foil', priceModifier: 2.0 },
        { name: 'Rose Gold Foil', priceModifier: 2.5 },
        { name: 'Holographic Laser Foil', priceModifier: 3.0 }
      ],
      spotUV: [
        { name: 'No Spot UV', priceModifier: 0 },
        { name: 'Single-Sided Spot UV Logo', priceModifier: 1.2 },
        { name: 'Double-Sided Spot UV Accent', priceModifier: 2.0 },
        { name: '3D Embossed Raised UV', priceModifier: 2.8 }
      ],
      proofService: [
        { name: 'Print-Ready (Self Upload)', priceModifier: 0 },
        { name: 'Prepress CMYK Proofing (+₹99)', priceModifier: 0.5 },
        { name: 'Full Designer Support (+₹299)', priceModifier: 1.5 }
      ],
      packagingStyle: [
        { name: 'Standard Eco Bulk Shrink', priceModifier: 0 },
        { name: 'Acrylic Desk Storage Box', priceModifier: 1.2 },
        { name: 'Luxury Gift Presentation Box', priceModifier: 3.5 }
      ]
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
    setFormActiveTab('general');
    setFormData({
      title: '',
      slug: '',
      category: 'Business Stationery',
      basePrice: 5.0,
      minOrderQty: 100,
      summary: '',
      description: '',
      specs: { paperGsm: '350 GSM', dimensions: '91mm x 53mm', printTech: 'Offset Litho', turnaround: '24 Hours' },
      images: [],
      variants: {
        paperStock: [{ name: '350 GSM Matte', priceModifier: 0 }, { name: '400 GSM Velvet', priceModifier: 1.5 }],
        sides: [
          { name: 'Single-sided', priceModifier: 0 },
          { name: 'Double-sided', priceModifier: 1.5 }
        ]
      },
      tieredPricing: [
        { tierMin: 100, pricePerUnit: 5.5 },
        { tierMin: 500, pricePerUnit: 4.8 },
        { tierMin: 1000, pricePerUnit: 4.0 }
      ],
      seo: { metaTitle: '', metaDescription: '', indexable: true }
    });
    setIsCreating(true);
  };

  const openEditForm = (prod) => {
    setFormActiveTab('general');
    setFormData({
      ...prod,
      minOrderQty: prod.minOrderQty || 100,
      variants: prod.variants ? JSON.parse(JSON.stringify(prod.variants)) : {}
    });
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
      {/* Top Banner & Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-blue-50/50 via-white to-slate-50 p-6 rounded-3xl border border-slate-200/80 text-slate-800 shadow-xs relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 text-[10px] font-extrabold border border-blue-200 uppercase tracking-wider">
              Admin Enterprise Catalog
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-blue-600" />
            Print Product Matrix & Pricing Engine
          </h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-1 font-medium">
            Manage live print SKUs, volume tier pricing matrices, Cloudinary galleries, and multi-variant pricing rules.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setIsCategorySidebarOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs flex items-center gap-2 border border-slate-200 shadow-3xs transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-blue-600" /> Manage Categories
          </button>
          <button
            onClick={openCreateForm}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs flex items-center gap-2 shadow-md shadow-blue-500/20 transition-all cursor-pointer border-none"
          >
            <Plus className="w-4 h-4" /> Add New Print Product
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{products.length}</div>
            <div className="text-[11px] font-semibold text-slate-500">Active Product SKUs</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-extrabold">
            <Grid className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">{new Set(products.map(p => p.category)).size}</div>
            <div className="text-[11px] font-semibold text-slate-500">Print Categories</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-extrabold">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">
              {products.reduce((acc, p) => acc + (p.tieredPricing?.length || 0), 0)}
            </div>
            <div className="text-[11px] font-semibold text-slate-500">Volume Tier Rules</div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-extrabold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-black text-slate-900">10 Matrices</div>
            <div className="text-[11px] font-semibold text-slate-500">Custom Options Active</div>
          </div>
        </div>
      </div>

      {/* Search & Category Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search SKUs or categories..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500 text-slate-800"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['All', ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 cursor-pointer transition border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((prod) => (
          <div key={prod.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between">
            <div>
              <div className="h-48 bg-slate-100 relative overflow-hidden">
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
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white font-black text-xs border border-white/20">
                  Base ₹{prod.basePrice}
                </div>
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-[10px]">
                  MOQ {prod.minOrderQty || 100} pcs
                </div>
              </div>

              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
                    {prod.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">{prod.id}</span>
                </div>

                <h3 className="font-extrabold text-sm text-slate-900 line-clamp-1">{prod.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{prod.summary}</p>

                {/* Variants Preview Pills */}
                <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-1 text-[10px] text-slate-600">
                  {prod.variants?.paperStock?.map((v, i) => (
                    <span key={`p-${i}`} className="px-1.5 py-0.5 rounded bg-slate-100 border border-slate-200">
                      {v.name}
                    </span>
                  ))}
                  {prod.variants?.sides?.map((v, i) => (
                    <span key={`s-${i}`} className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 font-semibold">
                      {v.name} (+₹{v.priceModifier})
                    </span>
                  ))}
                  {prod.variants?.corners?.map((v, i) => (
                    <span key={`c-${i}`} className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 font-semibold">
                      {v.name} (+₹{v.priceModifier})
                    </span>
                  ))}
                  {prod.variants?.lamination?.map((v, i) => (
                    <span key={`l-${i}`} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
                      {v.name} (+₹{v.priceModifier})
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-slate-100 flex items-center gap-2 mt-2">
              <button
                type="button"
                onClick={() => openEditForm(prod)}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-blue-50 hover:text-blue-600 font-bold text-xs flex items-center justify-center gap-1 text-slate-700 transition-colors border-none cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" /> Edit SKU & Options
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
        ))}
      </div>

      {/* Form Editor Mode - 100% RELIABLE ULTRA-PREMIUM TABBED MODAL OVERLAY */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs overflow-y-auto p-3 sm:p-6 flex justify-center items-start">
          <form 
            onSubmit={handleFormSubmit} 
            className="bg-white rounded-3xl w-full max-w-5xl my-4 sm:my-8 shadow-2xl border border-slate-200/90 text-slate-800 animate-in fade-in zoom-in-95 duration-200 relative overflow-hidden flex flex-col max-h-[90vh]"
          >
            {/* Sticky Top Header */}
            <div className="bg-white px-6 py-4 border-b border-slate-200/80 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold border border-blue-100 shadow-3xs">
                  <Sparkles className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg tracking-tight text-slate-900">
                    {editingProduct ? `Edit SKU: ${formData.title}` : 'Create New Custom Print Product'}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Configure core product details, gallery images, tiered quantity pricing, and multi-variant rules
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 font-extrabold text-sm transition flex items-center justify-center border-none cursor-pointer"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* Form Section Navigation Tab Bar */}
            <div className="bg-slate-50/80 px-6 py-2 border-b border-slate-200/80 flex items-center gap-2 overflow-x-auto shrink-0 select-none">
              <button
                type="button"
                onClick={() => setFormActiveTab('general')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  formActiveTab === 'general'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Package className="w-4 h-4" /> 1. Core Info & Cloudinary Gallery
              </button>

              <button
                type="button"
                onClick={() => setFormActiveTab('tiered')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  formActiveTab === 'tiered'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <DollarSign className="w-4 h-4" /> 2. Tiered Quantity Pricing Grid ({formData.tieredPricing?.length || 0} tiers)
              </button>

              <button
                type="button"
                onClick={() => setFormActiveTab('variants')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${
                  formActiveTab === 'variants'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Layers className="w-4 h-4" /> 3. Print Options & Finishes
              </button>
            </div>

            {/* Tabbed Form Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs custom-scrollbar bg-slate-50/30">
              
              {/* TAB 1: GENERAL INFO & CLOUDINARY GALLERY */}
              {formActiveTab === 'general' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600 flex items-center gap-2">
                      <Package className="w-4 h-4" /> Basic Details & Classification
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1.5 uppercase text-[10px] tracking-wider">Product Title *</label>
                        <input
                          type="text"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                          required
                          className="w-full p-3 rounded-xl border border-slate-200 font-bold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs"
                          placeholder="e.g. Luxury Velvet Soft-Touch Business Cards"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5 uppercase text-[10px] tracking-wider">Base Price (₹) *</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.basePrice}
                          onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) || 0 })}
                          className="w-full p-3 rounded-xl border border-slate-200 font-extrabold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1.5 uppercase text-[10px] tracking-wider">Minimum Order Qty (MOQ) *</label>
                        <input
                          type="number"
                          min="1"
                          value={formData.minOrderQty || 100}
                          onChange={(e) => setFormData({ ...formData, minOrderQty: parseInt(e.target.value) || 1 })}
                          className="w-full p-3 rounded-xl border border-slate-200 font-extrabold text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs"
                        />
                      </div>

                      <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block font-bold text-slate-700 uppercase text-[10px] tracking-wider">Print Category</label>
                          <button
                            type="button"
                            onClick={() => setShowInlineCatInput(!showInlineCatInput)}
                            className="text-[10px] font-extrabold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded-lg flex items-center gap-1 cursor-pointer border-none"
                          >
                            <Plus className="w-3 h-3" /> Quick Add Category
                          </button>
                        </div>

                        {showInlineCatInput ? (
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={inlineCatInput}
                              onChange={(e) => setInlineCatInput(e.target.value)}
                              placeholder="e.g. Stickers & Labels"
                              className="flex-1 p-2.5 rounded-xl border border-blue-400 font-semibold text-xs focus:outline-none focus:border-blue-600 bg-blue-50/50"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (inlineCatInput.trim()) {
                                  addCategory(inlineCatInput.trim());
                                  setFormData({ ...formData, category: inlineCatInput.trim() });
                                  setInlineCatInput('');
                                  setShowInlineCatInput(false);
                                }
                              }}
                              className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 cursor-pointer border-none shrink-0 shadow-3xs"
                            >
                              Save Category
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowInlineCatInput(false)}
                              className="px-2 py-2 text-slate-400 hover:text-slate-600 border-none bg-transparent cursor-pointer shrink-0"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full p-3 rounded-xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:border-blue-500 bg-white text-xs"
                          >
                            {(categories && categories.length > 0 ? categories : ['Business Stationery', 'Large Format Display', 'Custom Packaging', 'Apparel & Merch']).map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                            ))}
                          </select>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block font-bold text-slate-700 mb-1.5 uppercase text-[10px] tracking-wider">Short Product Summary</label>
                        <textarea
                          rows={2}
                          value={formData.summary}
                          onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                          className="w-full p-3 rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-xs"
                          placeholder="Brief description visible on product cards..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Cloudinary Image Gallery Dropzone */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600 flex items-center gap-2">
                        <Upload className="w-4 h-4" /> Cloudinary Product Gallery ({formData.images.length} uploaded)
                      </h4>
                      <span className="text-[10px] text-slate-400 font-medium">PNG, JPG, WEBP up to 10MB</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {formData.images.map((imgUrl, i) => (
                        <div key={i} className="relative group/img aspect-square rounded-2xl overflow-hidden border border-slate-200 shadow-3xs bg-slate-100">
                          <img src={imgUrl} alt="Gallery" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200" />
                          {i === 0 && (
                            <span className="absolute top-1.5 left-1.5 px-2 py-0.5 rounded-md bg-blue-600 text-white font-black text-[9px] uppercase tracking-wider shadow-2xs">
                              Main Image
                            </span>
                          )}
                          <button
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, images: prev.images.filter((_, idx) => idx !== i) }))}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center shadow-md hover:bg-red-700 border-none cursor-pointer transition-colors"
                            title="Remove Image"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {/* Dropzone Upload Button */}
                      <label className="aspect-square rounded-2xl border-2 border-dashed border-blue-200 hover:border-blue-500 bg-blue-50/30 hover:bg-blue-50 flex flex-col items-center justify-center text-blue-600 cursor-pointer transition-colors p-3 text-center">
                        <Upload className="w-6 h-6 mb-1 text-blue-500" />
                        <span className="text-[11px] font-bold text-slate-800">
                          {uploadingImage ? 'Uploading...' : 'Upload Image'}
                        </span>
                        <span className="text-[9px] text-slate-400 font-medium mt-0.5">Click to browse</span>
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                      </label>
                    </div>
                  </div>

                  {/* SEO Section */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">
                      SEO Optimization Controls
                    </h4>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1 uppercase text-[10px] tracking-wider">Meta Title Tag</label>
                      <input
                        type="text"
                        value={formData.seo?.metaTitle || ''}
                        onChange={(e) => setFormData({ ...formData, seo: { ...formData.seo, metaTitle: e.target.value } })}
                        placeholder="e.g. Buy Luxury Business Cards Online | Printigly"
                        className="w-full p-2.5 rounded-xl border border-slate-200 font-medium text-slate-800 focus:outline-none focus:border-blue-500 text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: TIERED QUANTITY PRICING GRID */}
              {formActiveTab === 'tiered' && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600 flex items-center gap-2">
                          <DollarSign className="w-4 h-4" /> Volume Quantity Discount Matrix
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-0.5">Automatically calculates tiered discounts based on order quantity threshold</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const currentTiers = formData.tieredPricing || [];
                          const lastMin = currentTiers.length > 0 ? currentTiers[currentTiers.length - 1].tierMin + 500 : 500;
                          const lastPrice = currentTiers.length > 0 ? Math.max(currentTiers[currentTiers.length - 1].pricePerUnit - 0.5, 1) : 4.0;
                          setFormData({
                            ...formData,
                            tieredPricing: [...currentTiers, { tierMin: lastMin, pricePerUnit: lastPrice }]
                          });
                        }}
                        className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 font-extrabold text-xs flex items-center gap-1.5 border border-blue-200 cursor-pointer shadow-3xs"
                      >
                        <Plus className="w-3.5 h-3.5" /> Add Tier Rule
                      </button>
                    </div>

                    <div className="space-y-2">
                      <div className="grid grid-cols-12 gap-3 px-3 py-2 bg-slate-100/70 rounded-xl text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                        <span className="col-span-5">Minimum Quantity (pcs)</span>
                        <span className="col-span-5">Price Per Unit (₹)</span>
                        <span className="col-span-2 text-right">Action</span>
                      </div>

                      {formData.tieredPricing.map((tier, idx) => (
                        <div key={idx} className="grid grid-cols-12 gap-3 items-center p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition">
                          <div className="col-span-5">
                            <input
                              type="number"
                              min="1"
                              value={tier.tierMin}
                              onChange={(e) => {
                                const newTiers = [...formData.tieredPricing];
                                newTiers[idx].tierMin = parseInt(e.target.value) || 1;
                                setFormData({ ...formData, tieredPricing: newTiers });
                              }}
                              className="w-full p-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="col-span-5">
                            <input
                              type="number"
                              step="0.01"
                              value={tier.pricePerUnit}
                              onChange={(e) => {
                                const newTiers = [...formData.tieredPricing];
                                newTiers[idx].pricePerUnit = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, tieredPricing: newTiers });
                              }}
                              className="w-full p-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-900 text-xs focus:outline-none focus:border-blue-500"
                            />
                          </div>
                          <div className="col-span-2 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                const newTiers = formData.tieredPricing.filter((_, i) => i !== idx);
                                setFormData({ ...formData, tieredPricing: newTiers });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition border-none bg-transparent cursor-pointer"
                              title="Delete Tier"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PRINT OPTIONS & FINISHES */}
              {formActiveTab === 'variants' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    
                    {/* 1. Print Sides */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">1. Print Sides</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.variants?.sides || [];
                            setFormData({
                              ...formData,
                              variants: { ...formData.variants, sides: [...current, { name: 'New Side', priceModifier: 0 }] }
                            });
                          }}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Option
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.variants?.sides || []).map((side, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={side.name}
                              onChange={(e) => {
                                const newSides = [...(formData.variants?.sides || [])];
                                newSides[idx].name = e.target.value;
                                setFormData({ ...formData, variants: { ...formData.variants, sides: newSides } });
                              }}
                              placeholder="Side Name"
                              className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={side.priceModifier}
                              onChange={(e) => {
                                const newSides = [...(formData.variants?.sides || [])];
                                newSides[idx].priceModifier = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, variants: { ...formData.variants, sides: newSides } });
                              }}
                              className="w-20 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSides = (formData.variants?.sides || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, variants: { ...formData.variants, sides: newSides } });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 2. Edge Cutting & Corners */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">2. Edge Cuts & Corners</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.variants?.corners || [];
                            setFormData({
                              ...formData,
                              variants: { ...formData.variants, corners: [...current, { name: 'New Cut', priceModifier: 0 }] }
                            });
                          }}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Cut Option
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.variants?.corners || []).map((cut, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={cut.name}
                              onChange={(e) => {
                                const newCorners = [...(formData.variants?.corners || [])];
                                newCorners[idx].name = e.target.value;
                                setFormData({ ...formData, variants: { ...formData.variants, corners: newCorners } });
                              }}
                              placeholder="Cut Type"
                              className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={cut.priceModifier}
                              onChange={(e) => {
                                const newCorners = [...(formData.variants?.corners || [])];
                                newCorners[idx].priceModifier = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, variants: { ...formData.variants, corners: newCorners } });
                              }}
                              className="w-20 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newCorners = (formData.variants?.corners || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, variants: { ...formData.variants, corners: newCorners } });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Lamination Options */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">3. Lamination Finish</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.variants?.lamination || [];
                            setFormData({
                              ...formData,
                              variants: { ...formData.variants, lamination: [...current, { name: 'New Lamination', priceModifier: 0 }] }
                            });
                          }}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Lamination
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.variants?.lamination || []).map((lam, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={lam.name}
                              onChange={(e) => {
                                const newLam = [...(formData.variants?.lamination || [])];
                                newLam[idx].name = e.target.value;
                                setFormData({ ...formData, variants: { ...formData.variants, lamination: newLam } });
                              }}
                              placeholder="Lamination Type"
                              className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={lam.priceModifier}
                              onChange={(e) => {
                                const newLam = [...(formData.variants?.lamination || [])];
                                newLam[idx].priceModifier = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, variants: { ...formData.variants, lamination: newLam } });
                              }}
                              className="w-20 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newLam = (formData.variants?.lamination || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, variants: { ...formData.variants, lamination: newLam } });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 4. Size & Format */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">4. Size Formats</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.variants?.sizeFormat || [];
                            setFormData({
                              ...formData,
                              variants: { ...formData.variants, sizeFormat: [...current, { name: 'New Size Format', priceModifier: 0 }] }
                            });
                          }}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Format
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.variants?.sizeFormat || []).map((sz, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={sz.name}
                              onChange={(e) => {
                                const newSz = [...(formData.variants?.sizeFormat || [])];
                                newSz[idx].name = e.target.value;
                                setFormData({ ...formData, variants: { ...formData.variants, sizeFormat: newSz } });
                              }}
                              placeholder="Size Format Name"
                              className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={sz.priceModifier}
                              onChange={(e) => {
                                const newSz = [...(formData.variants?.sizeFormat || [])];
                                newSz[idx].priceModifier = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, variants: { ...formData.variants, sizeFormat: newSz } });
                              }}
                              className="w-20 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newSz = (formData.variants?.sizeFormat || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, variants: { ...formData.variants, sizeFormat: newSz } });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 5. Metallic Foil Accents */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">5. Metallic Foil Options</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.variants?.foilAccents || [];
                            setFormData({
                              ...formData,
                              variants: { ...formData.variants, foilAccents: [...current, { name: 'New Foil Option', priceModifier: 0 }] }
                            });
                          }}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Foil
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.variants?.foilAccents || []).map((foil, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={foil.name}
                              onChange={(e) => {
                                const newFoil = [...(formData.variants?.foilAccents || [])];
                                newFoil[idx].name = e.target.value;
                                setFormData({ ...formData, variants: { ...formData.variants, foilAccents: newFoil } });
                              }}
                              placeholder="Foil Color/Type"
                              className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={foil.priceModifier}
                              onChange={(e) => {
                                const newFoil = [...(formData.variants?.foilAccents || [])];
                                newFoil[idx].priceModifier = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, variants: { ...formData.variants, foilAccents: newFoil } });
                              }}
                              className="w-20 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newFoil = (formData.variants?.foilAccents || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, variants: { ...formData.variants, foilAccents: newFoil } });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 6. Spot UV & Textures */}
                    <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">6. Spot UV & Textures</h4>
                        <button
                          type="button"
                          onClick={() => {
                            const current = formData.variants?.spotUV || [];
                            setFormData({
                              ...formData,
                              variants: { ...formData.variants, spotUV: [...current, { name: 'New Spot UV', priceModifier: 0 }] }
                            });
                          }}
                          className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add Spot UV
                        </button>
                      </div>

                      <div className="space-y-2">
                        {(formData.variants?.spotUV || []).map((uv, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              value={uv.name}
                              onChange={(e) => {
                                const newUv = [...(formData.variants?.spotUV || [])];
                                newUv[idx].name = e.target.value;
                                setFormData({ ...formData, variants: { ...formData.variants, spotUV: newUv } });
                              }}
                              placeholder="Spot UV Option"
                              className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="number"
                              step="0.1"
                              value={uv.priceModifier}
                              onChange={(e) => {
                                const newUv = [...(formData.variants?.spotUV || [])];
                                newUv[idx].priceModifier = parseFloat(e.target.value) || 0;
                                setFormData({ ...formData, variants: { ...formData.variants, spotUV: newUv } });
                              }}
                              className="w-20 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newUv = (formData.variants?.spotUV || []).filter((_, i) => i !== idx);
                                setFormData({ ...formData, variants: { ...formData.variants, spotUV: newUv } });
                              }}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              )}

            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="bg-white px-6 py-3.5 border-t border-slate-200/80 flex items-center justify-between rounded-b-3xl shrink-0 shadow-md">
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline-block">
                💡 Live matrix updates instantly calculate accurate pricing for storefront customers.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition cursor-pointer border-none"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs shadow-md shadow-blue-500/20 transition cursor-pointer flex items-center gap-2 border-none"
                >
                  <CheckCircle2 className="w-4 h-4 text-white" /> Save Product & Live Matrix
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Category Management Sidebar Drawer */}
      {isCategorySidebarOpen && (
        <div className="fixed inset-0 z-50 bg-[#07152F]/70 backdrop-blur-xs flex justify-end transition-opacity animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                    <FolderPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-slate-900">Manage Categories</h3>
                    <p className="text-[11px] text-slate-500">Create & control product categories across shop & admin</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsCategorySidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center font-bold border-none cursor-pointer"
                >
                  ✕
                </button>
              </div>

              {/* Add Category Input Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <label className="block font-extrabold text-xs text-slate-800 uppercase tracking-wider">Add New Print Category</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={newCatSidebarInput}
                    onChange={(e) => setNewCatSidebarInput(e.target.value)}
                    placeholder="e.g. Stickers & Decals, Corporate Gifts"
                    className="flex-1 p-2.5 rounded-xl border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500 bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newCatSidebarInput.trim()) {
                        addCategory(newCatSidebarInput.trim());
                        setNewCatSidebarInput('');
                      }
                    }}
                    className="px-4 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-xs shadow-md shadow-[#FF5A1F]/20 cursor-pointer border-none flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </div>

              {/* Active Categories List */}
              <div className="space-y-3">
                <h4 className="font-extrabold text-xs text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Active Print Categories ({categories.length})</span>
                </h4>
                <div className="space-y-2">
                  {categories.map((cat, idx) => {
                    const prodCount = products.filter(p => p.category === cat).length;
                    return (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white shadow-xs hover:border-slate-300 transition">
                        <div className="flex items-center gap-2.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
                          <span className="font-extrabold text-xs text-slate-800">{cat}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-extrabold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full border border-slate-200">
                            {prodCount} {prodCount === 1 ? 'product' : 'products'}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete category "${cat}"? Products in this category will keep their label.`)) {
                                deleteCategory(cat);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition border-none bg-transparent cursor-pointer"
                            title="Delete Category"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsCategorySidebarOpen(false)}
                className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs cursor-pointer border-none"
              >
                Done / Close Sidebar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
