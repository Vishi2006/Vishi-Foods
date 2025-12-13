import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { addDoc, collection, serverTimestamp, query, where, onSnapshot } from 'firebase/firestore';

// creating my custom hook for cart context
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [tableId, setTableId] = useState(null);

  // Play beep sound
const playBeep = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  } catch (error) {
    console.log('Audio not available');
  }
};

  // Listen for order completion notifications
  useEffect(() => {
    if (!tableId) return;

    const q = query(
      collection(db, "orders"),
      where("table", "==", tableId)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "modified") {
          const order = change.doc.data();
          if (order.status === "completed") {
            playBeep();
            alert("🔔 Your order is ready! Chef has sent your order, Take it from counter");
          }
        }
      });
    });

    return () => unsubscribe();
  }, [tableId]);

  // Add item to cart
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        // If already in cart → increase quantity
        return prev.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If new → add with quantity 1
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, change) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Get total items count
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Get total price
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // order collection that saved in firestore
  const checkoutOrder = async (cart, tableNo) => {

    const confirmed = window.confirm("Did you pay at the counter?");
    if (!confirmed) {
      // User clicked "Cancel" - don't place order
      return false;
    }
    try {
      await addDoc(collection(db, "orders"), {
        table: tableNo,
        items: cart,
        status: "pending",
        createdAt: serverTimestamp()
      });
      
      setTableId(tableNo);
      alert("Order sent to kitchen!");
      alert("Do not close the app!");
      setCartItems([]); // Clear cart after checkout
    } catch (error) {
      console.error("Error sending order:", error);
    }
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    checkoutOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};