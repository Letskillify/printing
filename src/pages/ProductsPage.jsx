import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { 
  FiArrowRight, 
  FiCheck, 
  FiFilter, 
  FiUploadCloud, 
  FiX, 
  FiShoppingBag, 
  FiStar, 
  FiSliders, 
  FiHeart, 
  FiPlusCircle, 
  FiSearch,
  FiZap,
  FiClock,
  FiTag,
  FiRotateCcw,
  FiGrid
} from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import { subscribeToProducts } from '../services/firebase'
import { ProductDetailPage } from './ProductDetailPage'

export const FALLBACK_PRODUCTS = [
  // ── Business Cards ──
  {
    id: 'prod-bc-1',
    title: 'Standard Business Cards',
    slug: 'standard-business-cards',
    category: 'Business Cards',
    subcategory: 'Standard Cards',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 299,
    summary: 'Classic 350 GSM premium art card with crisp offset color printing.',
    description: 'High quality executive business cards printed on thick 350 GSM paper stock with smooth matte or gloss lamination.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800',
    tags: ['Standard Cards', 'Business Cards', 'Stationery']
  },
  {
    id: 'prod-bc-2',
    title: 'Spot UV Business Cards',
    slug: 'spot-uv-business-cards',
    category: 'Business Cards',
    subcategory: 'Spot UV Cards',
    finish: 'Spot UV',
    turnaround: 'Express (24-48h)',
    basePrice: 599,
    summary: 'Tactile 3D raised gloss UV varnish accents on logo and titles.',
    description: 'Make your logo pop with elevated 3D high-gloss UV coating over a velvet soft-touch matte finish.',
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=800',
    tags: ['Spot UV Cards', 'Spot UV', 'Business Cards']
  },
  {
    id: 'prod-bc-3',
    title: 'Die Cut Custom Business Cards',
    slug: 'die-cut-business-cards',
    category: 'Business Cards',
    subcategory: 'Die Cut Cards',
    finish: 'Die Cut',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 699,
    summary: 'Unique custom shape die-cutting with rounded corners or custom contours.',
    description: 'Break away from rectangle standards with precision laser and punch die cutting.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
    tags: ['Die Cut Cards', 'Die Cut', 'Business Cards']
  },
  {
    id: 'prod-bc-4',
    title: 'Metallic Foil Business Cards',
    slug: 'metallic-foil-business-cards',
    category: 'Business Cards',
    subcategory: 'Metallic Foil Cards',
    finish: 'Metallic Foil',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 899,
    summary: 'Hot stamped Gold, Silver, or Rose Gold foil accents.',
    description: 'Luxury hot-stamping foil press on premium matte textured cotton cards.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800',
    tags: ['Metallic Foil Cards', 'Gold Foil', 'Business Cards']
  },
  {
    id: 'prod-bc-5',
    title: 'Soft-Touch Velvet Business Cards',
    slug: 'velvet-business-cards',
    category: 'Business Cards',
    subcategory: 'Soft-Touch Velvet Cards',
    finish: 'Soft-Touch Velvet',
    turnaround: 'Express (24-48h)',
    basePrice: 799,
    summary: 'Ultra-soft suede touch velvet lamination on 400 GSM cardstock.',
    description: 'Experience pure luxury under your fingertips with silk velvet soft-touch coating.',
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=800',
    tags: ['Soft-Touch Velvet Cards', 'Velvet Cards', 'Business Cards']
  },
  {
    id: 'prod-bc-6',
    title: 'Luxury Ultra-Thick Duplex Cards',
    slug: 'luxury-thick-cards',
    category: 'Business Cards',
    subcategory: 'Luxury Thick Cards',
    finish: 'Textured Paper',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 999,
    summary: 'Heavyweight 600 GSM triple-layer card with colored seam edge.',
    description: 'Command respect in C-suite meetings with ultra-thick cotton duplex cards.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800',
    tags: ['Luxury Thick Cards', 'Thick Cards', 'Business Cards']
  },

  // ── Invitations ──
  {
    id: 'prod-inv-1',
    title: 'Luxury Wedding Invitation Suites',
    slug: 'wedding-cards',
    category: 'Invitations',
    subcategory: 'Wedding Cards',
    finish: 'Metallic Foil',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 1299,
    summary: 'Royal textured paper invitations with gold foil stamping and vellum wrap.',
    description: 'Bespoke wedding card collection crafted with metallic foil embossing and wax seals.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    tags: ['Wedding Cards', 'Invitations', 'Cards']
  },
  {
    id: 'prod-inv-2',
    title: 'Custom Birthday Invitation Cards',
    slug: 'birthday-cards',
    category: 'Invitations',
    subcategory: 'Birthday Cards',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 499,
    summary: 'Vibrant theme birthday invites on 300 GSM silk art paper.',
    description: 'Personalized birthday party invitations with matching custom envelopes.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800',
    tags: ['Birthday Cards', 'Invitations', 'Cards']
  },
  {
    id: 'prod-inv-3',
    title: 'Personalized Thank You Note Cards',
    slug: 'thank-you-cards',
    category: 'Invitations',
    subcategory: 'Thank You Cards',
    finish: 'Textured Paper',
    turnaround: 'Express (24-48h)',
    basePrice: 399,
    summary: 'Folded thank you note cards on cotton textured paper.',
    description: 'Express heartfelt gratitude with elegant custom printed thank you notes.',
    image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=800',
    tags: ['Thank You Cards', 'Invitations', 'Cards']
  },
  {
    id: 'prod-inv-4',
    title: 'Save the Date Cards & Envelopes',
    slug: 'save-the-date-cards',
    category: 'Invitations',
    subcategory: 'Save the Date Cards',
    finish: 'Metallic Foil',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 599,
    summary: 'Elegant metallic foil press announcements.',
    description: 'Share your milestone date in unforgettable luxury styling.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800',
    tags: ['Save the Date Cards', 'Save the Date', 'Invitations']
  },
  {
    id: 'prod-inv-5',
    title: 'Luxury Foil Invitations',
    slug: 'luxury-foil-invitations',
    category: 'Invitations',
    subcategory: 'Luxury Foil Invitations',
    finish: 'Metallic Foil',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 999,
    summary: 'Deep embossed foil detailing on imported Italian paper.',
    description: 'Gleaming gold and silver foil accents on heavy linen textured stock.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800',
    tags: ['Luxury Foil Invitations', 'Foil Invitations', 'Invitations']
  },
  {
    id: 'prod-inv-6',
    title: 'Custom Envelope & Wax Seal Sets',
    slug: 'envelope-seal-sets',
    category: 'Invitations',
    subcategory: 'Envelope & Seal Sets',
    finish: 'Textured Paper',
    turnaround: 'Express (24-48h)',
    basePrice: 349,
    summary: 'Handcrafted wax seals with custom foil-lined envelopes.',
    description: 'Pair your invitations with custom monogrammed envelopes and self-adhesive wax seals.',
    image: 'https://images.unsplash.com/photo-1557053910-d9eadeed1c58?q=80&w=800',
    tags: ['Envelope & Seal Sets', 'Envelopes', 'Invitations']
  },

  // ── Printing & Marketing ──
  {
    id: 'prod-prt-1',
    title: 'Brochures & Promotional Flyers',
    slug: 'brochures-flyers',
    category: 'Printing',
    subcategory: 'Brochures & Flyers',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 349,
    summary: 'A4 / A5 Tri-fold & Bi-fold marketing flyers on 170 GSM gloss paper.',
    description: 'High impact sales flyers and folded corporate brochures with ultra-sharp color accuracy.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800',
    tags: ['Brochures & Flyers', 'Flyers', 'Brochures', 'Printing']
  },
  {
    id: 'prod-prt-2',
    title: 'Roll-Up Banners & Standees',
    slug: 'banners-standees',
    category: 'Printing',
    subcategory: 'Banners & Standees',
    finish: 'Vinyl Waterproof',
    turnaround: 'Express (24-48h)',
    basePrice: 1750,
    summary: 'Non-tear PET flex roll up standee with anodized aluminum base.',
    description: 'Portable retractable flex standee for trade shows, expos, and showroom displays.',
    image: 'https://images.unsplash.com/photo-1542744094-3a3121699563?q=80&w=800',
    tags: ['Banners & Standees', 'Banners', 'Standees', 'Printing']
  },
  {
    id: 'prod-prt-3',
    title: 'Waterproof Stickers & Roll Labels',
    slug: 'stickers-labels',
    category: 'Printing',
    subcategory: 'Stickers & Labels',
    finish: 'Vinyl Waterproof',
    turnaround: 'Express (24-48h)',
    basePrice: 249,
    summary: 'Custom die-cut vinyl stickers & jar product roll labels.',
    description: 'Weatherproof UV-resistant vinyl stickers for product packaging and branding.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    tags: ['Stickers & Labels', 'Stickers', 'Labels', 'Printing']
  },
  {
    id: 'prod-prt-4',
    title: 'Executive Letterheads & Stationery',
    slug: 'letterheads-stationery',
    category: 'Printing',
    subcategory: 'Letterheads & Stationery',
    finish: 'Textured Paper',
    turnaround: 'Express (24-48h)',
    basePrice: 499,
    summary: '100 GSM premium sunshine bond paper letterheads.',
    description: 'Printer-safe corporate letterheads and matching branded envelopes.',
    image: 'https://images.unsplash.com/photo-1568658176307-bfbd2873ab57?q=80&w=800',
    tags: ['Letterheads & Stationery', 'Letterheads', 'Stationery', 'Printing']
  },
  {
    id: 'prod-prt-5',
    title: 'Gallery Posters & Wall Art Prints',
    slug: 'posters-wall-art',
    category: 'Printing',
    subcategory: 'Posters & Wall Art',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 599,
    summary: 'High-definition 12-color pigment ink art prints on 260 GSM photo paper.',
    description: 'Vivid gallery grade wall posters for decor, exhibitions, and marketing events.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=800',
    tags: ['Posters & Wall Art', 'Posters', 'Printing']
  },
  {
    id: 'prod-prt-6',
    title: 'Multi-Page Catalogs & Booklets',
    slug: 'booklets-catalogs',
    category: 'Printing',
    subcategory: 'Booklets & Catalogs',
    finish: 'Matte/Gloss',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 899,
    summary: 'Saddle-stitched product catalogs and annual report booklets.',
    description: 'High gloss cover booklets with 8 to 48 internal pages printed in full CMYK.',
    image: 'https://images.unsplash.com/photo-1568658176307-bfbd2873ab57?q=80&w=800',
    tags: ['Booklets & Catalogs', 'Booklets', 'Printing']
  },

  // ── Packaging ──
  {
    id: 'prod-pkg-1',
    title: 'Custom Product Packaging Boxes',
    slug: 'custom-product-boxes',
    category: 'Packaging',
    subcategory: 'Custom Product Boxes',
    finish: 'Spot UV',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 129,
    summary: 'Custom printed folding carton product boxes with spot UV.',
    description: 'Tailored retail folding boxes engineered for cosmetic, food, and tech products.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800',
    tags: ['Custom Product Boxes', 'Product Boxes', 'Packaging']
  },
  {
    id: 'prod-pkg-2',
    title: 'Rigid Gift Packaging Boxes',
    slug: 'rigid-gift-boxes',
    category: 'Packaging',
    subcategory: 'Rigid Gift Boxes',
    finish: 'Soft-Touch Velvet',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 399,
    summary: '1200 GSM Kappa board rigid gift boxes with magnetic lid.',
    description: 'Ultra luxury rigid box with satin pull ribbon and gold foil branding.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800',
    tags: ['Rigid Gift Boxes', 'Gift Boxes', 'Packaging']
  },
  {
    id: 'prod-pkg-3',
    title: 'Mailer Boxes & Heavy Shipping Mailers',
    slug: 'mailer-boxes-shipping',
    category: 'Packaging',
    subcategory: 'Mailer Boxes & Shipping',
    finish: 'Matte/Gloss',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 189,
    summary: '3-ply E-flute corrugated custom printed ecommerce mailers.',
    description: 'Durable eco-friendly shipping mailer boxes printed inside and outside.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800',
    tags: ['Mailer Boxes & Shipping', 'Mailer Boxes', 'Packaging']
  },
  {
    id: 'prod-pkg-4',
    title: 'Custom Printed Kraft Paper Bags',
    slug: 'paper-bags-pouches',
    category: 'Packaging',
    subcategory: 'Paper Bags & Pouches',
    finish: 'Textured Paper',
    turnaround: 'Express (24-48h)',
    basePrice: 149,
    summary: 'Eco kraft paper shopping bags with twisted or satin handles.',
    description: 'Bespoke retail paper carrier bags with custom screen or offset logo print.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=800',
    tags: ['Paper Bags & Pouches', 'Paper Bags', 'Packaging']
  },
  {
    id: 'prod-pkg-5',
    title: 'Branded Shipping & Packing Tape',
    slug: 'custom-printed-tapes',
    category: 'Packaging',
    subcategory: 'Custom Printed Tapes',
    finish: 'Vinyl Waterproof',
    turnaround: 'Express (24-48h)',
    basePrice: 299,
    summary: 'Reinforced custom logo gummed paper or BOPP shipping tape.',
    description: 'Secure package tamper-evident packing tape with continuous logo repeat.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800',
    tags: ['Custom Printed Tapes', 'Printed Tape', 'Packaging']
  },
  {
    id: 'prod-pkg-6',
    title: 'Custom Garment & Retail Hang Tags',
    slug: 'product-hang-tags',
    category: 'Packaging',
    subcategory: 'Product Hang Tags',
    finish: 'Die Cut',
    turnaround: 'Express (24-48h)',
    basePrice: 199,
    summary: '350 GSM string hole-punched apparel price hang tags.',
    description: 'Elevate your clothing brand with custom spot UV or foil stamped product tags.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800',
    tags: ['Product Hang Tags', 'Hang Tags', 'Packaging']
  },

  // ── Corporate & Merch ──
  {
    id: 'prod-corp-1',
    title: 'Custom Embroidered Polo T-Shirts',
    slug: 'custom-t-shirts-polos',
    category: 'Corporate & Merch',
    subcategory: 'Custom T-Shirts & Polos',
    finish: 'Textured Paper',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 450,
    summary: '240 GSM Matty cotton polo shirts with custom chest logo embroidery.',
    description: 'Premium corporate uniform t-shirts available in 12 colors with long-lasting embroidery.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
    tags: ['Custom T-Shirts & Polos', 'T-Shirts', 'Corporate & Merch']
  },
  {
    id: 'prod-corp-2',
    title: 'Custom Ceramic Mugs & Drinkware',
    slug: 'custom-mugs-drinkware',
    category: 'Corporate & Merch',
    subcategory: 'Mugs & Drinkware',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 249,
    summary: '325ml glossy ceramic mugs with full wrap sublimation printing.',
    description: 'Microwave safe branded coffee mugs and stainless steel insulated tumblers.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
    tags: ['Mugs & Drinkware', 'Mugs', 'Corporate & Merch']
  },
  {
    id: 'prod-corp-3',
    title: 'Corporate ID Cards & Lanyards',
    slug: 'id-cards-lanyards',
    category: 'Corporate & Merch',
    subcategory: 'ID Cards & Lanyards',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 149,
    summary: 'Smart PVC employee ID cards with satin lanyard print.',
    description: 'High durability RFID compatible employee badges with breakaway safety clip lanyards.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
    tags: ['ID Cards & Lanyards', 'ID Cards', 'Corporate & Merch']
  },
  {
    id: 'prod-corp-4',
    title: 'Executive Corporate Swag Gift Kits',
    slug: 'corporate-gift-kits',
    category: 'Corporate & Merch',
    subcategory: 'Corporate Gift Kits',
    finish: 'Soft-Touch Velvet',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 1250,
    summary: 'Custom boxed welcome set with diary, metal pen, mug & USB.',
    description: 'Onboard new hires or impress VIP clients with premium custom branded gift hampers.',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800',
    tags: ['Corporate Gift Kits', 'Gift Kits', 'Corporate & Merch']
  },
  {
    id: 'prod-corp-5',
    title: 'Executive Desk Calendars & Planners',
    slug: 'calendars-diaries',
    category: 'Corporate & Merch',
    subcategory: 'Calendars & Diaries',
    finish: 'Matte/Gloss',
    turnaround: 'Standard (3-5 Days)',
    basePrice: 399,
    summary: 'Spiral bound 12-month table calendars with hard stand.',
    description: 'Keep your company brand visible on clients desk 365 days a year.',
    image: 'https://images.unsplash.com/photo-1568658176307-bfbd2873ab57?q=80&w=800',
    tags: ['Calendars & Diaries', 'Calendars', 'Corporate & Merch']
  },
  {
    id: 'prod-corp-6',
    title: 'Self-Inking Rubber Stamps & Seals',
    slug: 'rubber-stamps-seals',
    category: 'Corporate & Merch',
    subcategory: 'Rubber Stamps & Seals',
    finish: 'Matte/Gloss',
    turnaround: 'Express (24-48h)',
    basePrice: 299,
    summary: 'Laser-engraved self-inking company seal & address stamps.',
    description: 'Clean impression self-inking stamps available in blue, black, and red ink.',
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800',
    tags: ['Rubber Stamps & Seals', 'Stamps', 'Corporate & Merch']
  }
];

export function ProductsPage({ onNavigateCart, setCurrentPage }) {
  const { addToCart, toggleWishlist, isInWishlist } = useAuth()
  const prefersReducedMotion = useReducedMotion()

  const getSearchParams = () => new URLSearchParams(window.location.search);

  const [activeCategory, setActiveCategoryState] = useState(() => {
    return getSearchParams().get('category') || 'All';
  });

  const [searchTerm, setSearchTermState] = useState(() => {
    return getSearchParams().get('search') || '';
  });

  const [selectedSubcategory, setSelectedSubcategory] = useState('All');
  const [selectedFinish, setSelectedFinish] = useState('All');
  const [selectedTurnaround, setSelectedTurnaround] = useState('All');
  const [sortBy, setSortBy] = useState('featured');

  const [selectedProduct, setSelectedProductState] = useState(null);

  // Real-time Products State from Firestore
  const [liveProducts, setLiveProducts] = useState([])
  const [loadingProducts, setLoadingProducts] = useState(true)

  // Subscribe to live Firestore products
  useEffect(() => {
    const unsubscribe = subscribeToProducts((prods) => {
      setLiveProducts(prods && prods.length > 0 ? prods : FALLBACK_PRODUCTS);
      setLoadingProducts(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen & sync state automatically with URL searchParams (popstate & hashchange)
  useEffect(() => {
    const handleUrlSync = () => {
      const searchParams = getSearchParams();
      const cat = searchParams.get('category') || 'All';
      const q = searchParams.get('search') || '';
      const currentSku = searchParams.get('sku');

      setActiveCategoryState(cat);
      setSearchTermState(q);

      const allProds = liveProducts.length > 0 ? liveProducts : FALLBACK_PRODUCTS;
      if (currentSku && allProds.length > 0) {
        const found = allProds.find(p => p.id === currentSku || p.slug === currentSku);
        if (found) setSelectedProductState(found);
      } else if (!currentSku) {
        setSelectedProductState(null);
      }
    };

    handleUrlSync();
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('hashchange', handleUrlSync);
    return () => {
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('hashchange', handleUrlSync);
    };
  }, [liveProducts]);

  const setActiveCategory = (cat) => {
    setActiveCategoryState(cat);
    setSelectedSubcategory('All');
    if (setCurrentPage) {
      setCurrentPage('products', { category: cat === 'All' ? '' : cat, search: searchTerm }, '#catalog');
    }
  };

  const clearAllFilters = () => {
    setSearchTermState('');
    setActiveCategoryState('All');
    setSelectedSubcategory('All');
    setSelectedFinish('All');
    setSelectedTurnaround('All');
    setSortBy('featured');
    if (setCurrentPage) {
      setCurrentPage('products', {}, '#catalog');
    }
  };

  const setSelectedProduct = (prod) => {
    setSelectedProductState(prod);
    if (setCurrentPage) {
      if (prod) {
        setCurrentPage('products', { sku: prod.id, category: activeCategory !== 'All' ? activeCategory : '' }, '#specs');
      } else {
        setCurrentPage('products', { category: activeCategory !== 'All' ? activeCategory : '' }, '#catalog');
      }
    }
  };

  const categories = [
    'All', 
    'Business Cards', 
    'Invitations', 
    'Printing', 
    'Packaging', 
    'Corporate & Merch'
  ];

  // Subcategories mapping by main category
  const subcategoryMap = {
    'Business Cards': ['Standard Cards', 'Spot UV Cards', 'Die Cut Cards', 'Metallic Foil Cards', 'Soft-Touch Velvet Cards', 'Luxury Thick Cards'],
    'Invitations': ['Wedding Cards', 'Birthday Cards', 'Thank You Cards', 'Save the Date Cards', 'Luxury Foil Invitations', 'Envelope & Seal Sets'],
    'Printing': ['Brochures & Flyers', 'Banners & Standees', 'Stickers & Labels', 'Letterheads & Stationery', 'Posters & Wall Art', 'Booklets & Catalogs'],
    'Packaging': ['Custom Product Boxes', 'Rigid Gift Boxes', 'Mailer Boxes & Shipping', 'Paper Bags & Pouches', 'Custom Printed Tapes', 'Product Hang Tags'],
    'Corporate & Merch': ['Custom T-Shirts & Polos', 'Mugs & Drinkware', 'ID Cards & Lanyards', 'Corporate Gift Kits', 'Calendars & Diaries', 'Rubber Stamps & Seals']
  };

  const availableSubcategories = activeCategory !== 'All' && subcategoryMap[activeCategory]
    ? subcategoryMap[activeCategory]
    : Object.values(subcategoryMap).flat();

  const finishes = ['All', 'Spot UV', 'Metallic Foil', 'Soft-Touch Velvet', 'Die Cut', 'Textured Paper', 'Matte/Gloss', 'Vinyl Waterproof'];
  const turnarounds = ['All', 'Express (24-48h)', 'Standard (3-5 Days)'];

  const pool = liveProducts.length > 0 ? liveProducts : FALLBACK_PRODUCTS;

  const filteredProducts = pool.filter((p) => {
    const catLower = activeCategory.toLowerCase();
    const pCatLower = (p.category || '').toLowerCase();
    
    const matchesCategory = activeCategory === 'All' || 
      pCatLower === catLower ||
      pCatLower.includes(catLower) ||
      catLower.includes(pCatLower);

    const matchesSubcategory = selectedSubcategory === 'All' ||
      (p.subcategory || '').toLowerCase() === selectedSubcategory.toLowerCase() ||
      (p.tags && Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase() === selectedSubcategory.toLowerCase()));

    const matchesFinish = selectedFinish === 'All' ||
      (p.finish || '').toLowerCase().includes(selectedFinish.toLowerCase());

    const matchesTurnaround = selectedTurnaround === 'All' ||
      (p.turnaround || '').toLowerCase().includes(selectedTurnaround.toLowerCase());

    const searchLower = searchTerm.trim().toLowerCase();
    const matchesSearch = !searchLower || 
      (p.title || '').toLowerCase().includes(searchLower) ||
      (p.category || '').toLowerCase().includes(searchLower) ||
      (p.summary || p.description || '').toLowerCase().includes(searchLower) ||
      (p.tags && Array.isArray(p.tags) && p.tags.some(t => t.toLowerCase().includes(searchLower)));

    return matchesCategory && matchesSubcategory && matchesFinish && matchesTurnaround && matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.basePrice - b.basePrice;
    if (sortBy === 'price-high') return b.basePrice - a.basePrice;
    if (sortBy === 'title-az') return a.title.localeCompare(b.title);
    return 0;
  });

  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onNavigateCart={onNavigateCart}
      />
    );
  }

  const isAnyFilterActive = activeCategory !== 'All' || selectedSubcategory !== 'All' || selectedFinish !== 'All' || selectedTurnaround !== 'All' || searchTerm !== '' || sortBy !== 'featured';

  return (
    <div className="bg-[#FAFBFD] font-sans min-h-screen text-[#0B1633]">

      {/* Page Hero Header — Deep Navy #07152F */}
      <section className="bg-[#07152F] text-white py-14 sm:py-16 relative overflow-hidden border-b border-slate-800">
        <div className="absolute top-0 right-1/3 w-[500px] h-[300px] bg-[#FF5A1F]/10 blur-[120px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2 justify-center sm:justify-start text-xs font-semibold text-slate-400">
                <span>Home</span>
                <span>/</span>
                <span className="text-[#FF5A1F] font-bold">Shop Catalog</span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 text-center sm:text-left">
                Full Print & Packaging Catalog
              </h1>
              <p className="text-slate-300 text-[14px] max-w-xl leading-relaxed text-center sm:text-left">
                Explore custom business cards, invitations, boxes, standees, stickers & corporate swag.
              </p>
            </div>

            {/* In-Hero Live Search Bar */}
            <div className="w-full md:w-80 relative">
              <FiSearch className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTermState(e.target.value)}
                placeholder="Search cards, packaging..."
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-white text-xs font-medium placeholder-slate-400 focus:outline-none focus:border-[#FF5A1F] focus:ring-1 focus:ring-[#FF5A1F] transition"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTermState('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white border-none bg-transparent cursor-pointer"
                >
                  <FiX className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Catalog & Filter Area */}
      <div id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* ── Multi-Faceted Master Filter Panel ── */}
        <div className="bg-white border border-[#E7EAF0] rounded-3xl p-5 sm:p-6 shadow-sm mb-8 space-y-5">
          
          {/* Row 1: Category Tabs + Sort Selector */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-4 border-b border-slate-100">
            {/* Main Categories Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#07152F] mr-1 flex items-center gap-1.5 flex-shrink-0">
                <FiFilter className="text-[#FF5A1F]" /> Category:
              </span>
              {categories.map((cat) => {
                const count = cat === 'All' 
                  ? pool.length 
                  : pool.filter(p => (p.category || '').toLowerCase().includes(cat.toLowerCase())).length;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold transition-all duration-200 cursor-pointer border-none flex-shrink-0 flex items-center gap-1.5 ${
                      activeCategory === cat
                        ? 'bg-[#FF5A1F] text-white shadow-md shadow-[#FF5A1F]/20'
                        : 'bg-slate-50 text-[#0B1633] border border-[#E7EAF0] hover:bg-slate-100 hover:text-[#FF5A1F]'
                    }`}
                  >
                    <span>{cat}</span>
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                      activeCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2 shrink-0 self-end lg:self-center text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1 text-slate-400">
                <FiSliders className="text-[#FF5A1F]" /> Sort:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs font-extrabold text-[#0B1633] focus:outline-none focus:border-[#FF5A1F] cursor-pointer"
              >
                <option value="featured">Featured SKUs</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="title-az">Alphabetical (A-Z)</option>
              </select>
            </div>
          </div>

          {/* Row 2: Subcategory / Item Type Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1 shrink-0">
              <FiTag className="text-[#FF5A1F]" /> Subcategory:
            </span>
            <button
              onClick={() => setSelectedSubcategory('All')}
              className={`px-3 py-1 rounded-lg text-[11.5px] font-extrabold transition-all cursor-pointer border-none shrink-0 ${
                selectedSubcategory === 'All'
                  ? 'bg-[#07152F] text-white'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-[#FF5A1F] hover:text-[#FF5A1F]'
              }`}
            >
              All Types
            </button>
            {availableSubcategories.map((subcat) => (
              <button
                key={subcat}
                onClick={() => setSelectedSubcategory(subcat)}
                className={`px-3 py-1 rounded-lg text-[11.5px] font-extrabold transition-all cursor-pointer border-none shrink-0 ${
                  selectedSubcategory === subcat
                    ? 'bg-[#FF5A1F] text-white shadow-xs'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-[#FF5A1F] hover:text-[#FF5A1F]'
                }`}
              >
                {subcat}
              </button>
            ))}
          </div>

          {/* Row 3: Finishes & Speed Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100 text-xs">
            
            {/* Finishes Pills */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10.5px] shrink-0">
                Finish:
              </span>
              {finishes.map((f) => (
                <button
                  key={f}
                  onClick={() => setSelectedFinish(f)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer border-none shrink-0 ${
                    selectedFinish === f
                      ? 'bg-slate-900 text-white font-extrabold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Turnaround Speed */}
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-slate-400 uppercase tracking-wider text-[10.5px] shrink-0 flex items-center gap-1">
                <FiClock className="text-[#FF5A1F]" /> Dispatch:
              </span>
              {turnarounds.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTurnaround(t)}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all cursor-pointer border-none ${
                    selectedTurnaround === t
                      ? 'bg-emerald-600 text-white font-extrabold'
                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200/60 hover:bg-emerald-100'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Active Filters Bar & Result Counter */}
        {isAnyFilterActive && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 bg-white border border-[#FF5A1F]/30 p-3.5 px-5 rounded-2xl shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-slate-800">
              <span className="text-slate-500 font-extrabold">Active Filters:</span>
              
              {activeCategory !== 'All' && (
                <span className="bg-[#07152F] text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1">
                  Category: {activeCategory}
                  <button onClick={() => setActiveCategory('All')} className="hover:text-rose-400 border-none bg-transparent cursor-pointer"><FiX className="w-3 h-3" /></button>
                </span>
              )}

              {selectedSubcategory !== 'All' && (
                <span className="bg-[#FF5A1F] text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1">
                  Sub: {selectedSubcategory}
                  <button onClick={() => setSelectedSubcategory('All')} className="hover:text-slate-200 border-none bg-transparent cursor-pointer"><FiX className="w-3 h-3" /></button>
                </span>
              )}

              {selectedFinish !== 'All' && (
                <span className="bg-slate-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1">
                  Finish: {selectedFinish}
                  <button onClick={() => setSelectedFinish('All')} className="hover:text-rose-400 border-none bg-transparent cursor-pointer"><FiX className="w-3 h-3" /></button>
                </span>
              )}

              {selectedTurnaround !== 'All' && (
                <span className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1">
                  Speed: {selectedTurnaround}
                  <button onClick={() => setSelectedTurnaround('All')} className="hover:text-slate-200 border-none bg-transparent cursor-pointer"><FiX className="w-3 h-3" /></button>
                </span>
              )}

              {searchTerm && (
                <span className="bg-[#FF5A1F] text-white px-2.5 py-1 rounded-lg text-[11px] font-extrabold flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTermState('')} className="hover:text-slate-200 border-none bg-transparent cursor-pointer"><FiX className="w-3 h-3" /></button>
                </span>
              )}
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-500">
                Showing <strong className="text-[#0B1633]">{filteredProducts.length}</strong> of {pool.length} SKUs
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs font-extrabold text-[#FF5A1F] hover:text-[#d44512] transition border-none bg-transparent cursor-pointer flex items-center gap-1"
              >
                <FiRotateCcw className="w-3.5 h-3.5" /> Reset All
              </button>
            </div>
          </div>
        )}

        {/* Product Cards Grid */}
        {loadingProducts ? (
          <div className="py-20 text-center text-slate-500 font-bold text-sm">
            Loading Live Products Catalog...
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => {
              const isSaved = isInWishlist(prod.id);
              const imgSrc = (prod.images && prod.images[0]) || prod.image || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600';
              return (
                <div
                  key={prod.id}
                  onClick={() => setSelectedProduct(prod)}
                  className="group bg-white rounded-[16px] overflow-hidden border border-[#E7EAF0] hover:border-[#FF5A1F]/40 hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative h-[185px] w-full overflow-hidden bg-[#F7F8FA]">
                    <img
                      src={imgSrc}
                      alt={prod.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 right-3 bg-[#07152F] text-white text-[10px] font-extrabold px-2.5 py-0.5 rounded-full shadow-xs">
                      {prod.category}
                    </span>
                    {prod.turnaround && (
                      <span className="absolute bottom-3 left-3 bg-emerald-600/90 backdrop-blur-xs text-white text-[9.5px] font-black px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                        <FiClock className="w-3 h-3" /> {prod.turnaround}
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(prod);
                      }}
                      className={`absolute top-3 left-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center transition border-none cursor-pointer ${
                        isSaved ? 'text-rose-600' : 'text-slate-400 hover:text-rose-600'
                      }`}
                      title="Save to Wishlist"
                    >
                      <FiHeart className={`w-4 h-4 ${isSaved ? 'fill-rose-600' : ''}`} />
                    </button>
                  </div>

                  {/* Product Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 mb-1 text-[11px] font-extrabold text-[#FF5A1F]">
                        <span>{prod.subcategory || prod.category}</span>
                        {prod.finish && (
                          <span className="text-slate-400 font-normal">• {prod.finish}</span>
                        )}
                      </div>
                      <h3 className="text-[16px] font-extrabold text-[#0B1633] group-hover:text-[#FF5A1F] transition-colors mb-1.5 leading-snug">
                        {prod.title}
                      </h3>
                      <p className="text-[#667085] text-[12.5px] leading-relaxed mb-4 line-clamp-2">
                        {prod.summary || prod.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[#E7EAF0] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-[#667085] block font-semibold">Starting from</span>
                        <span className="text-[18px] font-extrabold text-[#0B1633]">₹{prod.basePrice}</span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(prod);
                        }}
                        className="inline-flex items-center gap-1.5 bg-[#FF5A1F] hover:bg-[#e44d15] text-white font-extrabold text-[12.5px] px-3.5 py-2 rounded-[10px] transition-all cursor-pointer border-none shadow-sm shadow-[#FF5A1F]/20"
                      >
                        View Detail <FiArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-[24px] p-12 text-center max-w-md mx-auto border border-[#E7EAF0] shadow-xs">
            <div className="w-14 h-14 rounded-full bg-orange-50 text-[#FF5A1F] flex items-center justify-center mx-auto mb-3">
              <FiShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-extrabold text-[#0B1633] mb-1">No SKUs Match Your Active Filters</h3>
            <p className="text-slate-500 text-xs mb-6">Try broadening your search criteria or resetting your active finish/subcategory filters.</p>
            <button
              onClick={clearAllFilters}
              className="bg-[#07152F] text-white font-extrabold text-xs px-5 py-3 rounded-xl inline-flex items-center gap-2 cursor-pointer border-none hover:bg-slate-800 transition"
            >
              <FiRotateCcw className="w-4 h-4 text-[#FF5A1F]" /> Reset All Filters & View Catalog
            </button>
          </div>
        )}
      </div>

    </div>
  )
}

