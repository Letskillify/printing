import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  setDoc,
  getDoc,
  updateDoc, 
  deleteDoc,
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';

// Firebase Config initialized with live project credentials & env var fallback
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBhjJ-PpJRsPwa7jk7FIcbfhWj5rmG4TRM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "printing-1620d.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "printing-1620d",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "printing-1620d.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "805681838557",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:805681838557:web:8b222db2ea987cd90f9e34",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-F1K3KBMDGW"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);

// ── Firebase Auth Helpers ──
export const signUpUser = async (email, password, displayName, phone = '', company = '') => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;
  
  if (displayName) {
    await updateProfile(user, { displayName });
  }

  // Save user profile document in Firestore
  await setDoc(doc(db, 'users', user.uid), {
    uid: user.uid,
    email: user.email,
    displayName: displayName || user.email.split('@')[0],
    phone,
    company,
    createdAt: new Date().toISOString(),
    cart: [],
    wishlist: []
  });

  return user;
};

export const signInUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const subscribeToAuth = (onUserChanged) => {
  return onAuthStateChanged(auth, onUserChanged);
};

// ── Cart & Wishlist Firestore Sync ──
export const syncUserCartToFirestore = async (userId, cartItems) => {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { cart: cartItems }, { merge: true });
  } catch (err) {
    console.warn("Cart Firestore sync warning:", err.message);
  }
};

export const getUserCartFromFirestore = async (userId) => {
  if (!userId) return [];
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().cart || [];
    }
  } catch (err) {
    console.warn("Error fetching user cart:", err.message);
  }
  return [];
};

export const syncUserWishlistToFirestore = async (userId, wishlistItems) => {
  if (!userId) return;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, { wishlist: wishlistItems }, { merge: true });
  } catch (err) {
    console.warn("Wishlist Firestore sync warning:", err.message);
  }
};

export const getUserWishlistFromFirestore = async (userId) => {
  if (!userId) return [];
  try {
    const userRef = doc(db, 'users', userId);
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      return docSnap.data().wishlist || [];
    }
  } catch (err) {
    console.warn("Error fetching user wishlist:", err.message);
  }
  return [];
};

// ── User Profile & Address Book Firestore Helpers ──
export const subscribeToUserProfile = (userId, onUpdate) => {
  if (!userId) return () => {};
  try {
    const userRef = doc(db, 'users', userId);
    return onSnapshot(userRef, (docSnap) => {
      if (docSnap.exists()) {
        onUpdate(docSnap.data());
      }
    }, (err) => {
      console.warn("User profile listener note:", err.message);
    });
  } catch (err) {
    return () => {};
  }
};

export const saveUserProfileToFirestore = async (userId, profileData) => {
  if (!userId) return false;
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, {
      ...profileData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Error saving user profile to Firestore:", err.message);
    return false;
  }
};

export const subscribeToUserOrders = (userId, userEmail, onUpdate) => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const allOrders = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      const userOrders = allOrders.filter(o => 
        (userId && o.userId === userId) || 
        (userEmail && o.customer?.email?.toLowerCase() === userEmail.toLowerCase())
      );
      onUpdate(userOrders);
    }, (err) => {
      console.warn("User orders subscription note:", err.message);
      onUpdate([]);
    });
  } catch (err) {
    onUpdate([]);
    return () => {};
  }
};

// ── Real-time Firestore Subscriptions for Admin & Storefront ──
export const subscribeToOrders = (onUpdate, onError) => {
  try {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      onUpdate(orders);
    }, (err) => {
      console.warn("Firestore subscription note:", err.message);
      if (onError) onError(err);
    });
  } catch (err) {
    console.warn("Firebase listener fallback active.");
    return () => {};
  }
};

export const subscribeToProducts = (onUpdate) => {
  try {
    const q = query(collection(db, 'products'));
    return onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      onUpdate(prods);
    }, (err) => {
      console.warn("Firestore products subscription note:", err.message);
    });
  } catch (err) {
    return () => {};
  }
};

export const subscribeToDesignRequests = (onUpdate) => {
  try {
    const q = query(collection(db, 'design_requests'));
    return onSnapshot(q, (snapshot) => {
      const reqs = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      onUpdate(reqs);
    }, (err) => {
      console.warn("Firestore design requests subscription note:", err.message);
    });
  } catch (err) {
    return () => {};
  }
};

// ── Firestore Write Operations ──
export const addOrderToFirestore = async (orderData) => {
  try {
    const docRef = await addDoc(collection(db, 'orders'), {
      ...orderData,
      createdAt: new Date().toISOString(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Error adding order to Firestore:", err.message);
    return null;
  }
};

export const addProductToFirestore = async (productData) => {
  try {
    const docRef = await addDoc(collection(db, 'products'), {
      ...productData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Error adding product to Firestore:", err.message);
    return null;
  }
};

export const addDesignRequestToFirestore = async (designData) => {
  try {
    const docRef = await addDoc(collection(db, 'design_requests'), {
      ...designData,
      createdAt: new Date().toISOString()
    });
    return docRef.id;
  } catch (err) {
    console.warn("Error adding design request to Firestore:", err.message);
    return null;
  }
};

export const updateProductInFirestore = async (productId, productData) => {
  try {
    const prodRef = doc(db, 'products', productId);
    await setDoc(prodRef, {
      ...productData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Updating product in Firestore note:", err.message);
    return false;
  }
};

export const deleteProductFromFirestore = async (productId) => {
  try {
    const prodRef = doc(db, 'products', productId);
    await deleteDoc(prodRef);
    return true;
  } catch (err) {
    console.warn("Deleting product from Firestore note:", err.message);
    return false;
  }
};

export const updateOrderStatusInFirestore = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (err) {
    console.warn("Updating order status in local state:", err.message);
    return false;
  }
};

// ── Default Homepage Settings & Catalog Options ──
export const DEFAULT_HOMEPAGE_SETTINGS = {
  hero: {
    eyebrowText: "Enterprise Print & Packaging",
    headlineLine1: "Print Your Imagination,",
    headlineLine2: "Perfected.",
    description: "Enterprise-grade print production engineered for ambitious brands. Enjoy tactile luxury textures, vibrant color accuracy, instant quotes, and rapid doorstep delivery.",
    bannerImage: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=1000",
    badgeText: "Verified High-Resolution Output",
    productTitle: "Enterprise Packaging & Cards",
    productSubtitle: "Gold Foil, Soft-Touch Matte & Spot UV",
    ratingText: "4.98 / 5.0 Rating",
    ratingSubtext: "From 50,000+ Verified Clients",
    primaryCtaText: "Shop All Products",
    secondaryCtaText: "Get Custom Quote",
  },
  categoriesSection: {
    badgeText: "EXPLORE OUR COLLECTION",
    headingLine1: "Shop by",
    headingHighlight: "Category",
    description: "Explore our wide range of premium printing products engineered for high precision and vibrant colors.",
    categories: [
      {
        id: "cat_1",
        name: 'Business Cards',
        sub: 'Premium quality cards with foil & matte finishes',
        img: 'https://images.unsplash.com/photo-1612831819695-7e71f5ccf16c?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiCreditCard',
      },
      {
        id: "cat_2",
        name: 'Brochures & Flyers',
        sub: 'Professional marketing & tri-fold materials',
        img: 'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiBookOpen',
      },
      {
        id: "cat_3",
        name: 'Posters & Banners',
        sub: 'Large format outdoor & event displays',
        img: 'https://images.unsplash.com/photo-1608502374980-67d5c35a5302?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiTv',
      },
      {
        id: "cat_4",
        name: 'Invitations & Cards',
        sub: 'Special occasions & luxury embossed cards',
        img: 'https://images.unsplash.com/photo-1607344645866-009c320b63e0?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiGift',
      },
      {
        id: "cat_5",
        name: 'Stickers & Labels',
        sub: 'Custom die-cut vinyl & roll labels',
        img: 'https://images.unsplash.com/photo-1591981730169-05e8e57a7c04?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiTag',
      },
      {
        id: "cat_6",
        name: 'Custom Packaging',
        sub: 'Custom mailer boxes, pouches & packaging',
        img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiBox',
      },
      {
        id: "cat_7",
        name: 'Stationery',
        sub: 'Branded letterheads, envelopes & notebooks',
        img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiFileText',
      },
      {
        id: "cat_8",
        name: 'Photo Printing',
        sub: 'High quality prints & canvas frames',
        img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=600',
        iconName: 'FiImage',
      },
    ]
  }
};

export const DEFAULT_CATALOG_OPTIONS = {
  paperStock: [
    { name: '350 GSM Matte Art Card', priceModifier: 0 },
    { name: '400 GSM Velvet Soft-Touch Card', priceModifier: 1.5 },
    { name: '300 GSM Recycled Kraft Board', priceModifier: 0.8 },
    { name: '450 GSM Ultra-Heavy Cotton Card', priceModifier: 2.5 },
    { name: '250 GSM Glossy Coated Paper', priceModifier: -0.5 },
    { name: 'Translucent Frosted Poly Plastic', priceModifier: 3.0 },
    { name: 'Waterproof Synthetic Plastic Sheet', priceModifier: 2.2 }
  ],
  finishes: [
    { name: 'Matte Lamination', priceModifier: 0 },
    { name: 'Gloss Lamination', priceModifier: 0.5 },
    { name: 'Velvet Soft-Touch Lamination', priceModifier: 1.2 },
    { name: 'Raised 3D Gold Foil Stamping', priceModifier: 2.5 },
    { name: 'Metallic Silver Hot Stamping', priceModifier: 2.2 },
    { name: 'Rose Gold Foil Finish', priceModifier: 2.8 },
    { name: 'Holographic Rainbow Laser Foil', priceModifier: 3.5 },
    { name: 'Selective Gloss Spot UV', priceModifier: 1.5 },
    { name: '3D Embossed Raised UV Texture', priceModifier: 2.8 },
    { name: 'Blind Letterpress Embossing', priceModifier: 3.0 },
    { name: 'Custom Contour Die-Cutting', priceModifier: 2.0 }
  ],
  sides: [
    { name: 'Single-sided Print (1/0 CMYK)', priceModifier: 0 },
    { name: 'Double-sided Print (4/4 CMYK)', priceModifier: 1.5 },
    { name: 'Double-sided (4/4 + Metallic Spot)', priceModifier: 2.5 }
  ],
  corners: [
    { name: 'Standard Square Corners', priceModifier: 0 },
    { name: '3mm Rounded Corners (4 Edges)', priceModifier: 0.5 },
    { name: '6mm Rounded Corners (4 Edges)', priceModifier: 0.8 },
    { name: 'Beveled Edge Cutting', priceModifier: 1.2 },
    { name: 'Custom Die-Cut Shape', priceModifier: 2.5 }
  ],
  lamination: [
    { name: 'No Lamination Coating', priceModifier: 0 },
    { name: 'Thermal Gloss Lamination', priceModifier: 0.5 },
    { name: 'Scratch-Resistant Matte Lamination', priceModifier: 0.8 },
    { name: 'Velvet Soft-Touch Lamination', priceModifier: 1.5 },
    { name: 'Anti-Bacterial Protective Film', priceModifier: 2.0 }
  ],
  sizeFormat: [
    { name: 'Standard Business Card (90x55mm)', priceModifier: 0 },
    { name: 'US Standard Card (89x51mm)', priceModifier: 0 },
    { name: 'Square Mini Card (60x60mm)', priceModifier: 0.3 },
    { name: 'Slim Euro Format (90x45mm)', priceModifier: 0.3 },
    { name: 'Foldable 4-Panel Tent Card (90x110mm)', priceModifier: 1.8 },
    { name: 'Custom Bespoke Cut Size', priceModifier: 2.5 }
  ],
  foilAccents: [
    { name: 'No Metallic Foil Accent', priceModifier: 0 },
    { name: 'Raised 3D Gold Foil Accent', priceModifier: 2.2 },
    { name: 'Raised 3D Silver Foil Accent', priceModifier: 2.0 },
    { name: 'Rose Gold Luxury Metallic Foil', priceModifier: 2.5 },
    { name: 'Holographic Laser Diffraction Foil', priceModifier: 3.0 },
    { name: 'Copper Bronze Metallic Foil', priceModifier: 2.2 },
    { name: 'Emerald Green Metallic Foil', priceModifier: 2.5 }
  ],
  spotUV: [
    { name: 'No Spot UV Gloss', priceModifier: 0 },
    { name: 'Single-Sided Spot UV Logo Accent', priceModifier: 1.2 },
    { name: 'Double-Sided Spot UV Pattern', priceModifier: 2.0 },
    { name: '3D High-Build Embossed UV Glass', priceModifier: 2.8 }
  ],
  bindingStyle: [
    { name: 'No Binding (Loose Sheets)', priceModifier: 0 },
    { name: 'Saddle-Stitch Wire Staple', priceModifier: 1.0 },
    { name: 'Perfect Glue Book Binding', priceModifier: 2.5 },
    { name: 'Spiral Twin-Loop Wire-O', priceModifier: 2.0 },
    { name: 'Hardcover Case Bound', priceModifier: 5.0 }
  ],
  proofService: [
    { name: 'Print-Ready Artwork (Self Upload)', priceModifier: 0 },
    { name: 'Prepress CMYK Digital Soft Proof (+₹99)', priceModifier: 0.5 },
    { name: 'Full Graphic Designer Support (+₹299)', priceModifier: 1.5 },
    { name: 'Physical Printed Hardcopy Sample Proof (+₹499)', priceModifier: 3.0 }
  ],
  packagingStyle: [
    { name: 'Standard Eco Bulk Shrink Wrap', priceModifier: 0 },
    { name: 'Acrylic Clear Desk Presentation Box', priceModifier: 1.2 },
    { name: 'Luxury Rigid Gift Packaging Box', priceModifier: 3.5 },
    { name: 'Custom Branded Sleeve Outer Packaging', priceModifier: 2.0 }
  ]
};

// ── Firestore Subscriptions for Homepage Settings & Catalog Options ──
const HOMEPAGE_SETTINGS_KEY = 'printigly_homepage_settings';
const CATALOG_OPTIONS_KEY = 'printigly_catalog_options';

export const subscribeToHomepageSettings = (onUpdate) => {
  const getLocal = () => {
    try {
      const stored = localStorage.getItem(HOMEPAGE_SETTINGS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_HOMEPAGE_SETTINGS;
    } catch (e) {
      return DEFAULT_HOMEPAGE_SETTINGS;
    }
  };

  // Immediate synchronous emit from local storage cache
  onUpdate(getLocal());

  try {
    const docRef = doc(db, 'site_settings', 'homepage');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const firestoreData = docSnap.data();
        try {
          localStorage.setItem(HOMEPAGE_SETTINGS_KEY, JSON.stringify(firestoreData));
        } catch (e) {}
        onUpdate(firestoreData);
      } else {
        onUpdate(getLocal());
      }
    }, (err) => {
      console.warn("Homepage settings listener note:", err.message);
      onUpdate(getLocal());
    });
  } catch (err) {
    onUpdate(getLocal());
    return () => {};
  }
};

export const saveHomepageSettingsToFirestore = async (settingsData) => {
  try {
    localStorage.setItem(HOMEPAGE_SETTINGS_KEY, JSON.stringify(settingsData));
    window.dispatchEvent(new Event('homepage_settings_updated'));
  } catch (e) {}

  try {
    const docRef = doc(db, 'site_settings', 'homepage');
    await setDoc(docRef, {
      ...settingsData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Saving homepage settings note:", err.message);
    return false;
  }
};

export const subscribeToCatalogOptions = (onUpdate) => {
  const getLocal = () => {
    try {
      const stored = localStorage.getItem(CATALOG_OPTIONS_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_CATALOG_OPTIONS;
    } catch (e) {
      return DEFAULT_CATALOG_OPTIONS;
    }
  };

  onUpdate(getLocal());

  try {
    const docRef = doc(db, 'site_settings', 'catalog_options');
    return onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        const firestoreData = docSnap.data();
        try {
          localStorage.setItem(CATALOG_OPTIONS_KEY, JSON.stringify(firestoreData));
        } catch (e) {}
        onUpdate(firestoreData);
      } else {
        onUpdate(getLocal());
      }
    }, (err) => {
      console.warn("Catalog options listener note:", err.message);
      onUpdate(getLocal());
    });
  } catch (err) {
    onUpdate(getLocal());
    return () => {};
  }
};

export const saveCatalogOptionsToFirestore = async (optionsData) => {
  try {
    localStorage.setItem(CATALOG_OPTIONS_KEY, JSON.stringify(optionsData));
    window.dispatchEvent(new Event('catalog_options_updated'));
  } catch (e) {}

  try {
    const docRef = doc(db, 'site_settings', 'catalog_options');
    await setDoc(docRef, {
      ...optionsData,
      updatedAt: serverTimestamp()
    }, { merge: true });
    return true;
  } catch (err) {
    console.warn("Saving catalog options note:", err.message);
    return false;
  }
};

