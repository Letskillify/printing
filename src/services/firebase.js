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
