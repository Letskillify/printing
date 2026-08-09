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
  const { 
    products, 
    saveProduct, 
    removeProduct, 
    categories, 
    addCategory, 
    deleteCategory,
    catalogOptions,
    updateCatalogOptions,
    addCustomCatalogOption
  } = useAdmin();

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

  // Dynamic Custom Tech Spec Row state
  const [newSpecKey, setNewSpecKey] = useState('');
  const [newSpecVal, setNewSpecVal] = useState('');

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
    variants: catalogOptions || {},
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
      category: categories[0] || 'Business Stationery',
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
        paperStock: catalogOptions?.paperStock || [
          { name: '350 GSM Matte Art Card', priceModifier: 0 },
          { name: '400 GSM Velvet Soft-Touch Card', priceModifier: 1.5 },
          { name: '300 GSM Recycled Kraft Board', priceModifier: 0.8 },
        ],
        finishes: catalogOptions?.finishes || [
          { name: 'Matte Lamination', priceModifier: 0 },
          { name: 'Gloss Lamination', priceModifier: 0.5 },
          { name: 'Raised 3D Gold Foil Stamping', priceModifier: 2.5 },
        ],
        sides: catalogOptions?.sides || [
          { name: 'Single-sided Print (1/0 CMYK)', priceModifier: 0 },
          { name: 'Double-sided Print (4/4 CMYK)', priceModifier: 1.5 }
        ],
        corners: catalogOptions?.corners || [
          { name: 'Standard Square Corners', priceModifier: 0 },
          { name: '3mm Rounded Corners (4 Edges)', priceModifier: 0.5 }
        ],
        lamination: catalogOptions?.lamination || [
          { name: 'No Lamination Coating', priceModifier: 0 },
          { name: 'Thermal Gloss Lamination', priceModifier: 0.5 },
          { name: 'Velvet Soft-Touch Lamination', priceModifier: 1.5 }
        ],
        sizeFormat: catalogOptions?.sizeFormat || [
          { name: 'Standard Business Card (90x55mm)', priceModifier: 0 },
          { name: 'Square Mini Card (60x60mm)', priceModifier: 0.5 }
        ],
        foilAccents: catalogOptions?.foilAccents || [
          { name: 'No Metallic Foil Accent', priceModifier: 0 },
          { name: 'Raised 3D Gold Foil Accent', priceModifier: 2.2 },
          { name: 'Raised 3D Silver Foil Accent', priceModifier: 2.0 }
        ],
        spotUV: catalogOptions?.spotUV || [
          { name: 'No Spot UV Gloss', priceModifier: 0 },
          { name: 'Single-Sided Spot UV Logo Accent', priceModifier: 1.2 },
          { name: '3D High-Build Embossed UV Glass', priceModifier: 2.8 }
        ],
        bindingStyle: catalogOptions?.bindingStyle || [
          { name: 'No Binding (Loose Sheets)', priceModifier: 0 },
          { name: 'Saddle-Stitch Wire Staple', priceModifier: 1.0 },
          { name: 'Perfect Glue Book Binding', priceModifier: 2.5 }
        ],
        proofService: catalogOptions?.proofService || [
          { name: 'Print-Ready Artwork (Self Upload)', priceModifier: 0 },
          { name: 'Prepress CMYK Digital Soft Proof (+₹99)', priceModifier: 0.5 },
          { name: 'Full Designer Support (+₹299)', priceModifier: 1.5 }
        ],
        packagingStyle: catalogOptions?.packagingStyle || [
          { name: 'Standard Eco Bulk Shrink Wrap', priceModifier: 0 },
          { name: 'Acrylic Clear Desk Presentation Box', priceModifier: 1.2 },
          { name: 'Luxury Rigid Gift Packaging Box', priceModifier: 3.5 }
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
    setFormActiveTab('general');
    setFormData({
      ...prod,
      minOrderQty: prod.minOrderQty || 100,
      specs: prod.specs || { paperGsm: '350 GSM', dimensions: '91mm x 53mm', printTech: 'Offset Litho', turnaround: '24 Hours' },
      variants: {
        paperStock: prod.variants?.paperStock || catalogOptions?.paperStock || [{ name: '350 GSM Matte', priceModifier: 0 }],
        finishes: prod.variants?.finishes || catalogOptions?.finishes || [{ name: 'Matte Lamination', priceModifier: 0 }],
        sides: prod.variants?.sides || catalogOptions?.sides || [{ name: 'Single-sided', priceModifier: 0 }],
        corners: prod.variants?.corners || catalogOptions?.corners || [{ name: 'Standard', priceModifier: 0 }],
        lamination: prod.variants?.lamination || catalogOptions?.lamination || [{ name: 'No Lamination', priceModifier: 0 }],
        sizeFormat: prod.variants?.sizeFormat || catalogOptions?.sizeFormat || [{ name: 'Standard (90x55mm)', priceModifier: 0 }],
        foilAccents: prod.variants?.foilAccents || catalogOptions?.foilAccents || [{ name: 'No Metallic Foil', priceModifier: 0 }],
        spotUV: prod.variants?.spotUV || catalogOptions?.spotUV || [{ name: 'No Spot UV', priceModifier: 0 }],
        bindingStyle: prod.variants?.bindingStyle || catalogOptions?.bindingStyle || [{ name: 'No Binding', priceModifier: 0 }],
        proofService: prod.variants?.proofService || catalogOptions?.proofService || [{ name: 'Print-Ready', priceModifier: 0 }],
        packagingStyle: prod.variants?.packagingStyle || catalogOptions?.packagingStyle || [{ name: 'Standard Bulk', priceModifier: 0 }]
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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await saveProduct(formData);
    // Sync all options back to Firebase catalogOptions so all future products load them
    if (formData.variants) {
      await updateCatalogOptions({
        ...catalogOptions,
        ...formData.variants
      });
    }
    setIsCreating(false);
    setEditingProduct(null);
  };

  const handleUpdateVariantItems = (groupKey, newItemsList) => {
    setFormData(prev => ({
      ...prev,
      variants: {
        ...prev.variants,
        [groupKey]: newItemsList
      }
    }));
  };

  const handlePersistCustomOption = async (groupKey, newOptionObj) => {
    await addCustomCatalogOption(groupKey, newOptionObj);
  };

  // Reusable Component for Option Categories with "+ Add Custom Option at Last"
  const VariantSectionCard = ({ title, groupKey, items }) => {
    const [newOptName, setNewOptName] = useState('');
    const [newOptPrice, setNewOptPrice] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddCustom = async () => {
      if (!newOptName.trim()) return;
      const priceVal = parseFloat(newOptPrice) || 0;
      const newObj = { name: newOptName.trim(), priceModifier: priceVal };

      const updatedList = [...(items || []), newObj];
      handleUpdateVariantItems(groupKey, updatedList);
      await handlePersistCustomOption(groupKey, newObj);

      setNewOptName('');
      setNewOptPrice('');
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2500);
    };

    return (
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-3xs space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600">{title}</h4>
          <span className="text-[10px] font-bold text-slate-400">({(items || []).length} active)</span>
        </div>

        <div className="space-y-2">
          {(items || []).map((opt, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={opt.name}
                onChange={(e) => {
                  const updated = [...items];
                  updated[idx].name = e.target.value;
                  handleUpdateVariantItems(groupKey, updated);
                }}
                placeholder="Option Name"
                className="flex-1 p-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500 bg-white"
              />
              <div className="relative w-24 shrink-0">
                <span className="absolute left-2 top-2 text-[10px] text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  step="0.1"
                  value={opt.priceModifier}
                  onChange={(e) => {
                    const updated = [...items];
                    updated[idx].priceModifier = parseFloat(e.target.value) || 0;
                    handleUpdateVariantItems(groupKey, updated);
                  }}
                  className="w-full pl-5 pr-2 py-2 rounded-lg border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const updated = items.filter((_, i) => i !== idx);
                  handleUpdateVariantItems(groupKey, updated);
                }}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                title="Delete Option"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}

          {/* DEDICATED AT-LAST POSITION: "+ Add Custom Option at Last" Form */}
          <div className="pt-2.5 border-t border-dashed border-blue-200 bg-blue-50/40 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-black uppercase text-blue-700 tracking-wider flex items-center gap-1">
                <Plus className="w-3.5 h-3.5 text-blue-600" /> + Add Custom Option 
              </span>
              {showSuccess && (
                <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ Saved to Firebase!
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newOptName}
                onChange={(e) => setNewOptName(e.target.value)}
                placeholder="Custom Option Name"
                className="flex-1 p-2 rounded-lg border border-blue-300 font-bold text-xs focus:outline-none focus:border-blue-600 bg-white"
              />
              <div className="relative w-24 shrink-0">
                <span className="absolute left-2 top-2 text-[10px] text-slate-400 font-bold">₹</span>
                <input
                  type="number"
                  step="0.1"
                  value={newOptPrice}
                  onChange={(e) => setNewOptPrice(e.target.value)}
                  placeholder="+Mod"
                  className="w-full pl-5 pr-2 py-2 rounded-lg border border-blue-300 font-bold text-xs focus:outline-none focus:border-blue-600 bg-white"
                />
              </div>
              <button
                type="button"
                onClick={handleAddCustom}
                className="px-3.5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-xs cursor-pointer border-none shrink-0 shadow-3xs"
              >
                Add Option
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
            Manage live print SKUs, volume tier pricing matrices, Cloudinary galleries, and multi-variant pricing rules synced with Firebase.
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
            <div className="text-lg font-black text-slate-900">{Object.keys(catalogOptions || {}).length} Matrices</div>
            <div className="text-[11px] font-semibold text-slate-500">Firebase Options Active</div>
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
              className={`px-3 py-1.5 rounded-xl font-bold text-xs shrink-0 cursor-pointer transition border ${selectedCategory === cat
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
                  {prod.variants?.finishes?.map((v, i) => (
                    <span key={`f-${i}`} className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200 font-semibold">
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

      {/* Form Editor Mode - 100% RELIABLE TABBED MODAL OVERLAY */}
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${formActiveTab === 'general'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Package className="w-4 h-4" /> 1. Core Info, Tech Specs & Gallery
              </button>

              <button
                type="button"
                onClick={() => setFormActiveTab('tiered')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${formActiveTab === 'tiered'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <DollarSign className="w-4 h-4" /> 2. Tiered Quantity Pricing Grid ({formData.tieredPricing?.length || 0} tiers)
              </button>

              <button
                type="button"
                onClick={() => setFormActiveTab('variants')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer border ${formActiveTab === 'variants'
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
              >
                <Layers className="w-4 h-4" /> 3. Print Options & Finishes Matrix
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

                  {/* Technical Specifications Custom Key-Values Card */}
                  <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-3xs space-y-4">
                    <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider text-blue-600 flex items-center justify-between">
                      <span>Technical Specifications & Custom Attributes</span>
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {Object.entries(formData.specs || {}).map(([key, val]) => (
                        <div key={key} className="flex items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-200">
                          <span className="font-bold text-slate-700 text-[11px] w-28 truncate shrink-0">{key}:</span>
                          <input
                            type="text"
                            value={val}
                            onChange={(e) => {
                              setFormData({
                                ...formData,
                                specs: { ...formData.specs, [key]: e.target.value }
                              });
                            }}
                            className="flex-1 p-1.5 rounded-lg border border-slate-200 bg-white font-semibold text-xs focus:outline-none focus:border-blue-500"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedSpecs = { ...formData.specs };
                              delete updatedSpecs[key];
                              setFormData({ ...formData, specs: updatedSpecs });
                            }}
                            className="p-1 text-slate-400 hover:text-red-600 border-none bg-transparent cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Inline Add Custom Spec Row */}
                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Spec Name (e.g. Grammage, Inks)"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        className="flex-1 p-2 rounded-xl border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Spec Value (e.g. 350 GSM, CMYK Soy)"
                        value={newSpecVal}
                        onChange={(e) => setNewSpecVal(e.target.value)}
                        className="flex-1 p-2 rounded-xl border border-slate-200 font-semibold text-xs focus:outline-none focus:border-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (newSpecKey.trim()) {
                            setFormData({
                              ...formData,
                              specs: { ...formData.specs, [newSpecKey.trim()]: newSpecVal.trim() || 'Standard' }
                            });
                            setNewSpecKey('');
                            setNewSpecVal('');
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-blue-600 text-white font-extrabold text-xs hover:bg-blue-700 cursor-pointer border-none shrink-0"
                      >
                        + Add Spec
                      </button>
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

              {/* TAB 3: PRINT OPTIONS & FINISHES MATRIX WITH "+ ADD CUSTOM OPTION AT LAST" */}
              {formActiveTab === 'variants' && (
                <div className="space-y-6 animate-in fade-in duration-150">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-blue-900 text-xs flex items-center justify-between">
                    <span className="font-bold">
                      💡 All newly added custom options are automatically persisted to Firebase and loaded into all future products.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <VariantSectionCard
                      title="1. Paper Stock & Board Weight"
                      groupKey="paperStock"
                      items={formData.variants?.paperStock || []}
                    />

                    <VariantSectionCard
                      title="2. Special Finishes"
                      groupKey="finishes"
                      items={formData.variants?.finishes || []}
                    />

                    <VariantSectionCard
                      title="3. Print Sides Option"
                      groupKey="sides"
                      items={formData.variants?.sides || []}
                    />

                    <VariantSectionCard
                      title="4. Edge Cuts & Corner Finishing"
                      groupKey="corners"
                      items={formData.variants?.corners || []}
                    />

                    <VariantSectionCard
                      title="5. Lamination Finish & Coating"
                      groupKey="lamination"
                      items={formData.variants?.lamination || []}
                    />

                    <VariantSectionCard
                      title="6. Size Formats & Aspect Ratio"
                      groupKey="sizeFormat"
                      items={formData.variants?.sizeFormat || []}
                    />

                    <VariantSectionCard
                      title="7. Metallic Foil Accents & Stamping"
                      groupKey="foilAccents"
                      items={formData.variants?.foilAccents || []}
                    />

                    <VariantSectionCard
                      title="8. Spot UV & Raised Gloss Textures"
                      groupKey="spotUV"
                      items={formData.variants?.spotUV || []}
                    />

                    <VariantSectionCard
                      title="9. Binding & Booklet Construction"
                      groupKey="bindingStyle"
                      items={formData.variants?.bindingStyle || []}
                    />

                    <VariantSectionCard
                      title="10. Prepress Proofing Service"
                      groupKey="proofService"
                      items={formData.variants?.proofService || []}
                    />

                    <VariantSectionCard
                      title="11. Packaging & Presentation Style"
                      groupKey="packagingStyle"
                      items={formData.variants?.packagingStyle || []}
                    />
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
