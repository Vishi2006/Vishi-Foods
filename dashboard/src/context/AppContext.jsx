import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Orders come from Firestore (real-time)
  const [orders, setOrders] = useState([]);
  const [selectedOrderData, setSelectedOrderData] = useState(null);
  
  // History and Inventory use localStorage
  const getStoredHistory = () => {
    const stored = localStorage.getItem('history');
    return stored ? JSON.parse(stored) : [];
  };

  const getStoredInventory = () => {
    const stored = localStorage.getItem('inventory');
    return stored ? JSON.parse(stored) : [
      { id: 1, name: 'Fresh Apples', category: 'Fruits', stock: 150, unit: 'kg', status: 'In Stock' },
      { id: 2, name: 'Organic Carrots', category: 'Vegetables', stock: 85, unit: 'kg', status: 'In Stock' },
      { id: 3, name: 'Whole Milk', category: 'Dairy', stock: 45, unit: 'liters', status: 'Low Stock' },
      { id: 4, name: 'Brown Bread', category: 'Bakery', stock: 200, unit: 'loaves', status: 'In Stock' },
      { id: 5, name: 'Orange Juice', category: 'Beverages', stock: 12, unit: 'liters', status: 'Low Stock' },
      { id: 6, name: 'Chicken Breast', category: 'Meat', stock: 75, unit: 'kg', status: 'In Stock' }
    ];
  };

  const [history, setHistory] = useState(getStoredHistory);
  const [inventory, setInventory] = useState(getStoredInventory);

  // Sync history and inventory to localStorage
  useEffect(() => {
    localStorage.setItem('history', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  // Fetch orders from Firestore (real-time)
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersArr = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersArr);
    });
    return () => unsubscribe();
  }, []);

  // Remove order from list (just store in memory, don't delete from Firestore yet)
  const removeOrder = async (orderId, orderData) => {
    try {
      setSelectedOrderData(orderData);
      return true;
    } catch (error) {
      console.error("Error storing order:", error);
      return false;
    }
  };

  // Send order (update status to completed, then delete after notification)
  const sendOrder = async (orderData) => {
    const orderToSend = selectedOrderData || orders.find(o => o.id === orderData.orderId);
    if (orderToSend) {
      try {
        // Update status to "completed" - this triggers user notification
        await updateDoc(doc(db, "orders", orderData.orderId), {
          status: "completed"
        });

        // Wait 2 seconds for notification to reach user
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Delete order from Firestore to keep database clean
        await deleteDoc(doc(db, "orders", orderData.orderId));

        // Add to history
        const historyEntry = {
          id: orderData.orderId,
          customer: orderToSend.table ? `Table ${orderToSend.table}` : (orderData.customerName || 'Unknown'),
          items: orderToSend.items || [],
          date: new Date().toISOString().split('T')[0],
          status: 'Delivered',
          deliveryamount: orderData.deliveryamount
        };
        setHistory(prev => [historyEntry, ...prev]);
        setSelectedOrderData(null);
        return true;
      } catch (error) {
        console.error("Error sending order:", error);
        return false;
      }
    }
    return false;
  };

  // Inventory CRUD operations
  const addInventoryItem = (item) => {
    const newItem = {
      ...item,
      id: Date.now(),
      status: item.stock > 50 ? 'In Stock' : item.stock > 10 ? 'Low Stock' : 'Out of Stock'
    };
    setInventory(prev => [...prev, newItem]);
  };

  const updateInventoryItem = (id, updates) => {
    setInventory(prev => prev.map(item => {
      if (item.id === id) {
        const updated = { ...item, ...updates };
        if (updates.stock !== undefined) {
          updated.status = updated.stock > 50 ? 'In Stock' : updated.stock > 10 ? 'Low Stock' : 'Out of Stock';
        }
        return updated;
      }
      return item;
    }));
  };

  const deleteInventoryItem = (id) => {
    setInventory(prev => prev.filter(item => item.id !== id));
  };

  const value = {
    orders,
    history,
    inventory,
    sendOrder,
    removeOrder,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};