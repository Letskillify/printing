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
        finishes: [{ name: 'Matte Lamination', priceModifier: 0 }, { name: 'Gold Foil Accent', priceModifier: 2.0 }],
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
    setFormData({
      ...prod,
      minOrderQty: prod.minOrderQty || 100,
      variants: {
        paperStock: prod.variants?.paperStock || [{ name: '350 GSM Matte', priceModifier: 0 }],
        finishes: prod.variants?.finishes || [{ name: 'Matte Lamination', priceModifier: 0 }],
        sides: prod.variants?.sides || [
          { name: 'Single-sided', priceModifier: 0 },
          { name: 'Double-sided', priceModifier: 1.5 }
        ],
        corners: prod.variants?.corners || [
          { name: 'Standard', priceModifier: 0 },
          { name: 'Edge Cutting', priceModifier: 1.0 },
          { name: 'Rounded Corners', priceModifier: 0.5 }
        ],
        lamination: prod.variants?.lamination || [
          { name: 'No Lamination', priceModifier: 0 },
          { name: 'Gloss Lamination', priceModifier: 0.5 },
          { name: 'Matte Lamination', priceModifier: 0.8 },
          { name: 'Velvet Soft-Touch Lamination', priceModifier: 1.5 }
        ],
        sizeFormat: prod.variants?.sizeFormat || [
          { name: 'Standard (90x55mm)', priceModifier: 0 },
          { name: 'Square (60x60mm)', priceModifier: 0.5 },
          { name: 'Slim (90x45mm)', priceModifier: 0.3 },
          { name: 'Foldable 4-Panel', priceModifier: 1.8 }
        ],
        foilAccents: prod.variants?.foilAccents || [
          { name: 'No Metallic Foil', priceModifier: 0 },
          { name: 'Raised Gold Foil', priceModifier: 2.2 },
          { name: 'Raised Silver Foil', priceModifier: 2.0 },
          { name: 'Rose Gold Foil', priceModifier: 2.5 },
          { name: 'Holographic Laser Foil', priceModifier: 3.0 }
        ],
        spotUV: prod.variants?.spotUV || [
          { name: 'No Spot UV', priceModifier: 0 },
          { name: 'Single-Sided Spot UV Logo', priceModifier: 1.2 },
          { name: 'Double-Sided Spot UV Accent', priceModifier: 2.0 },
          { name: '3D Embossed Raised UV', priceModifier: 2.8 }
        ],
        proofService: prod.variants?.proofService || [
          { name: 'Print-Ready (Self Upload)', priceModifier: 0 },
          { name: 'Prepress CMYK Proofing (+₹99)', priceModifier: 0.5 },
          { name: 'Full Designer Support (+₹299)', priceModifier: 1.5 }
        ],
        packagingStyle: prod.variants?.packagingStyle || [
          { name: 'Standard Eco Bulk Shrink', priceModifier: 0 },
          { name: 'Acrylic Desk Storage Box', priceModifier: 1.2 },
          { name: 'Luxury Gift Presentation Box', priceModifier: 3.5 }
        ]
      }
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
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#07152F] p-6 rounded-3xl border border-slate-800 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[100px] pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-extrabold border border-blue-500/30 uppercase tracking-wider">
              Admin Enterprise Catalog
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-[#FF5A1F]" />
            Print Product Matrix & Pricing Engine
          </h2>
          <p className="text-xs text-slate-300 max-w-2xl mt-1">
            Manage live print SKUs, volume tier pricing matrices, Cloudinary galleries, and multi-variant pricing rules.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10">
          <button
            onClick={() => setIsCategorySidebarOpen(true)}
            className="px-4 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-extrabold text-xs flex items-center gap-2 border border-white/20 transition-all cursor-pointer"
          >
            <FolderPlus className="w-4 h-4 text-blue-400" /> Manage Categories
          </button>
          <button
            onClick={openCreateForm}
            className="px-5 py-3 rounded-2xl bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#FF5A1F]/30 transition-all cursor-pointer border-none"
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
                  ? 'bg-[#07152F] text-white border-[#07152F] shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-400'
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

      {/* Form Editor Mode - 100% RELIABLE SCROLLABLE MODAL OVERLAY */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-[#07152F]/85 backdrop-blur-md overflow-y-auto p-3 sm:p-6 flex justify-center items-start">
          <form 
            onSubmit={handleFormSubmit} 
            className="bg-white rounded-3xl w-full max-w-5xl my-6 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in zoom-in duration-200 relative"
          >
            {/* Sticky Top Header */}
            <div className="sticky top-0 z-30 bg-[#07152F] px-6 py-4 text-white flex items-center justify-between border-b border-slate-800 rounded-t-3xl shadow-md">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  <Sparkles className="w-5 h-5 text-[#FF5A1F]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base tracking-tight text-white">
                    {editingProduct ? `Edit Product: ${formData.title}` : 'Create New Custom Print Product'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">Configure core pricing, MOQ safeguards, and multi-variant pricing matrix</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreating(false)}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 font-bold text-xs text-white transition cursor-pointer border border-white/10"
              >
                Close & Cancel
              </button>
            </div>

            {/* Native Scrollable Form Body */}
            <div className="p-6 space-y-6 text-xs">
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

              <div className="grid grid-cols-3 gap-3">
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
                  <label className="block font-bold text-slate-700 mb-1">Min Pieces (MOQ)</label>
                  <input
                    type="number"
                    min="1"
                    value={formData.minOrderQty || 100}
                    onChange={(e) => setFormData({ ...formData, minOrderQty: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700">Category</label>
                    <button
                      type="button"
                      onClick={() => setShowInlineCatInput(!showInlineCatInput)}
                      className="text-[10px] font-bold text-blue-600 hover:text-blue-800 bg-blue-50 px-2 py-0.5 rounded flex items-center gap-1 cursor-pointer border-none"
                    >
                      <Plus className="w-3 h-3" /> Quick Add
                    </button>
                  </div>

                  {showInlineCatInput ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="text"
                        value={inlineCatInput}
                        onChange={(e) => setInlineCatInput(e.target.value)}
                        placeholder="e.g. Stickers & Labels"
                        className="flex-1 p-2 rounded-xl border border-blue-400 font-semibold text-xs focus:outline-none focus:border-blue-600 bg-blue-50/50"
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
                        className="px-3 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 cursor-pointer border-none shrink-0"
                      >
                        Save
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
                      className="w-full p-2.5 rounded-xl border border-slate-200 font-semibold focus:outline-none focus:border-blue-500 bg-white"
                    >
                      {(categories && categories.length > 0 ? categories : ['Business Stationery', 'Large Format Display', 'Custom Packaging', 'Apparel & Merch']).map((cat, idx) => (
                        <option key={idx} value={cat}>{cat}</option>
                      ))}
                    </select>
                  )}
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

              {/* 3. Sides Printing Options & Prices */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">3. Print Sides Options & Prices</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.sides || [];
                      setFormData({
                        ...formData,
                        variants: {
                          ...formData.variants,
                          sides: [...current, { name: 'New Side Option', priceModifier: 0 }]
                        }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Side Option
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Side Option Name</span>
                    <span className="col-span-5">Added Price (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.sides || []).map((side, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={side.name}
                        onChange={(e) => {
                          const newSides = [...(formData.variants?.sides || [])];
                          newSides[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, sides: newSides } });
                        }}
                        placeholder="e.g. Single-sided, Double-sided"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
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
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSides = (formData.variants?.sides || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, sides: newSides } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. Edge Cutting & Corner Options & Prices */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">4. Edge Cutting & Corner Options & Prices</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.corners || [];
                      setFormData({
                        ...formData,
                        variants: {
                          ...formData.variants,
                          corners: [...current, { name: 'New Cut Option', priceModifier: 0 }]
                        }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Cut Option
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Finishing Cut Name</span>
                    <span className="col-span-5">Added Price (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.corners || []).map((cut, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={cut.name}
                        onChange={(e) => {
                          const newCorners = [...(formData.variants?.corners || [])];
                          newCorners[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, corners: newCorners } });
                        }}
                        placeholder="e.g. Standard, Edge Cutting, Rounded Corners"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
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
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newCorners = (formData.variants?.corners || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, corners: newCorners } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 5. Lamination Options & Charges */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">5. Lamination Options & Charges</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.lamination || [];
                      setFormData({
                        ...formData,
                        variants: {
                          ...formData.variants,
                          lamination: [...current, { name: 'New Lamination Option', priceModifier: 0 }]
                        }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Lamination
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Lamination Type</span>
                    <span className="col-span-5">Added Charge (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.lamination || []).map((lam, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={lam.name}
                        onChange={(e) => {
                          const newLam = [...(formData.variants?.lamination || [])];
                          newLam[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, lamination: newLam } });
                        }}
                        placeholder="e.g. Gloss Lamination, Velvet Soft-Touch"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
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
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newLam = (formData.variants?.lamination || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, lamination: newLam } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 Settings */}
            <div className="space-y-4">
              {/* 6. Card Size & Format Options */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">6. Card Size & Format Options</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.sizeFormat || [];
                      setFormData({
                        ...formData,
                        variants: { ...formData.variants, sizeFormat: [...current, { name: 'New Format', priceModifier: 0 }] }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Size Format
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Format Name</span>
                    <span className="col-span-5">Added Price (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.sizeFormat || []).map((sz, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={sz.name}
                        onChange={(e) => {
                          const newSz = [...(formData.variants?.sizeFormat || [])];
                          newSz[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, sizeFormat: newSz } });
                        }}
                        placeholder="e.g. Standard (90x55mm), Square (60x60mm)"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
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
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newSz = (formData.variants?.sizeFormat || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, sizeFormat: newSz } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 7. Metallic Foil Accents & Stamping */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">7. Metallic Foil Accents & Stamping</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.foilAccents || [];
                      setFormData({
                        ...formData,
                        variants: { ...formData.variants, foilAccents: [...current, { name: 'New Foil Color', priceModifier: 0 }] }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Foil Option
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Foil Accent Type</span>
                    <span className="col-span-5">Added Charge (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.foilAccents || []).map((foil, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={foil.name}
                        onChange={(e) => {
                          const newFoil = [...(formData.variants?.foilAccents || [])];
                          newFoil[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, foilAccents: newFoil } });
                        }}
                        placeholder="e.g. Raised Gold Foil, Silver Foil, Laser Holographic"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
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
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newFoil = (formData.variants?.foilAccents || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, foilAccents: newFoil } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 8. Spot UV & 3D Textures */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">8. Spot UV & Selective Textures</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.spotUV || [];
                      setFormData({
                        ...formData,
                        variants: { ...formData.variants, spotUV: [...current, { name: 'New Spot UV Option', priceModifier: 0 }] }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Spot UV
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Spot UV Option</span>
                    <span className="col-span-5">Added Charge (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.spotUV || []).map((uv, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={uv.name}
                        onChange={(e) => {
                          const newUv = [...(formData.variants?.spotUV || [])];
                          newUv[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, spotUV: newUv } });
                        }}
                        placeholder="e.g. Single-Sided Spot UV, 3D Embossed Raised UV"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
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
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newUv = (formData.variants?.spotUV || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, spotUV: newUv } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 9. Proofing & Design Support */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">9. Artwork Proofing & Prepress Level</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.proofService || [];
                      setFormData({
                        ...formData,
                        variants: { ...formData.variants, proofService: [...current, { name: 'New Proofing Level', priceModifier: 0 }] }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Proofing Level
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Proofing Level</span>
                    <span className="col-span-5">Added Charge (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.proofService || []).map((proof, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={proof.name}
                        onChange={(e) => {
                          const newProof = [...(formData.variants?.proofService || [])];
                          newProof[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, proofService: newProof } });
                        }}
                        placeholder="e.g. Print-Ready, Prepress CMYK Check (+₹99)"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <input
                        type="number"
                        step="0.1"
                        value={proof.priceModifier}
                        onChange={(e) => {
                          const newProof = [...(formData.variants?.proofService || [])];
                          newProof[idx].priceModifier = parseFloat(e.target.value) || 0;
                          setFormData({ ...formData, variants: { ...formData.variants, proofService: newProof } });
                        }}
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newProof = (formData.variants?.proofService || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, proofService: newProof } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* 10. Packaging & Presentation Styles */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600">10. Packaging & Presentation Styles</h4>
                  <button
                    type="button"
                    onClick={() => {
                      const current = formData.variants?.packagingStyle || [];
                      setFormData({
                        ...formData,
                        variants: { ...formData.variants, packagingStyle: [...current, { name: 'New Packaging Option', priceModifier: 0 }] }
                      });
                    }}
                    className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 border-none cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" /> Add Packaging
                  </button>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="text-[10px] font-bold text-slate-500 grid grid-cols-12 gap-2">
                    <span className="col-span-6">Packaging Style</span>
                    <span className="col-span-5">Added Charge (₹/unit)</span>
                    <span className="col-span-1"></span>
                  </div>
                  {(formData.variants?.packagingStyle || []).map((pkg, idx) => (
                    <div key={idx} className="grid grid-cols-12 gap-2 items-center">
                      <input
                        type="text"
                        value={pkg.name}
                        onChange={(e) => {
                          const newPkg = [...(formData.variants?.packagingStyle || [])];
                          newPkg[idx].name = e.target.value;
                          setFormData({ ...formData, variants: { ...formData.variants, packagingStyle: newPkg } });
                        }}
                        placeholder="e.g. Eco Bulk Shrink, Acrylic Desk Box, Luxury Gift Box"
                        className="col-span-6 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <input
                        type="number"
                        step="0.1"
                        value={pkg.priceModifier}
                        onChange={(e) => {
                          const newPkg = [...(formData.variants?.packagingStyle || [])];
                          newPkg[idx].priceModifier = parseFloat(e.target.value) || 0;
                          setFormData({ ...formData, variants: { ...formData.variants, packagingStyle: newPkg } });
                        }}
                        className="col-span-5 p-1.5 rounded-lg border bg-white font-semibold text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const newPkg = (formData.variants?.packagingStyle || []).filter((_, i) => i !== idx);
                          setFormData({ ...formData, variants: { ...formData.variants, packagingStyle: newPkg } });
                        }}
                        className="col-span-1 text-red-500 hover:text-red-700 flex justify-center border-none bg-transparent cursor-pointer"
                        title="Delete Option"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SEO Controls */}
              <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider text-blue-600 pt-2">6. SEO Meta Controls</h4>
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

            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="sticky bottom-0 z-30 bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between rounded-b-3xl shadow-lg">
              <span className="text-[11px] font-semibold text-slate-500 hidden sm:inline-block">
                💡 Live matrix updates instantly calculate accurate pricing for customers.
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-5 py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-xl bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-xs shadow-md shadow-[#FF5A1F]/20 transition cursor-pointer flex items-center gap-2 border-none"
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
