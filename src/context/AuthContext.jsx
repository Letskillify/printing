import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  auth, 
  subscribeToAuth, 
  signUpUser, 
  signInUser, 
  signOutUser,
  syncUserCartToFirestore,
  getUserCartFromFirestore,
  syncUserWishlistToFirestore,
  getUserWishlistFromFirestore
} from '../services/firebase';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState('login'); // 'login' or 'signup'

  // Cart & Wishlist Global State
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);

  // Subscribe to Firebase Auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      setCurrentUser(user);
      if (user) {
        // Fetch saved cart & wishlist from Firestore for logged in user
        const savedCart = await getUserCartFromFirestore(user.uid);
        const savedWishlist = await getUserWishlistFromFirestore(user.uid);
        if (savedCart && savedCart.length > 0) setCartItems(savedCart);
        if (savedWishlist && savedWishlist.length > 0) setWishlistItems(savedWishlist);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Cart Operations
  const addToCart = (product) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(item => item.id === product.id && item.finish === product.finish);
      let updatedCart;
      if (existingIdx > -1) {
        updatedCart = [...prev];
        updatedCart[existingIdx].qty += (product.qty || 1);
        updatedCart[existingIdx].totalPrice = updatedCart[existingIdx].qty * updatedCart[existingIdx].unitPrice;
      } else {
        const newItem = {
          id: product.id || Date.now(),
          name: product.name || product.title,
          qty: product.qty || 100,
          paper: product.paper || '350gsm Premium Matte',
          finish: product.finish || 'Standard Matte',
          unitPrice: product.unitPrice || product.basePrice || 1.5,
          totalPrice: (product.qty || 100) * (product.unitPrice || product.basePrice || 1.5),
          image: product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600'
        };
        updatedCart = [newItem, ...prev];
      }

      if (currentUser) {
        syncUserCartToFirestore(currentUser.uid, updatedCart);
      }
      return updatedCart;
    });
  };

  const removeFromCart = (id) => {
    setCartItems(prev => {
      const updated = prev.filter(item => item.id !== id);
      if (currentUser) {
        syncUserCartToFirestore(currentUser.uid, updated);
      }
      return updated;
    });
  };

  const clearCart = () => {
    setCartItems([]);
    if (currentUser) {
      syncUserCartToFirestore(currentUser.uid, []);
    }
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id);
      let updated;
      if (exists) {
        updated = prev.filter(item => item.id !== product.id);
      } else {
        const newItem = {
          id: product.id || Date.now(),
          name: product.name || product.title,
          price: product.basePrice || product.price || 4.5,
          image: product.image || (product.images && product.images[0]) || 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600'
        };
        updated = [newItem, ...prev];
      }

      if (currentUser) {
        syncUserWishlistToFirestore(currentUser.uid, updated);
      }
      return updated;
    });
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const login = async (email, password) => {
    const user = await signInUser(email, password);
    setAuthModalOpen(false);
    return user;
  };

  const signup = async (email, password, displayName, phone, company) => {
    const user = await signUpUser(email, password, displayName, phone, company);
    setAuthModalOpen(false);
    return user;
  };

  const logout = async () => {
    await signOutUser();
    setCartItems([]);
    setWishlistItems([]);
  };

  return (
    <AuthContext.Provider value={{
      currentUser,
      loading,
      authModalOpen,
      setAuthModalOpen,
      authModalTab,
      setAuthModalTab,
      login,
      signup,
      logout,
      cartItems,
      setCartItems,
      addToCart,
      removeFromCart,
      clearCart,
      wishlistItems,
      toggleWishlist,
      isInWishlist
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
