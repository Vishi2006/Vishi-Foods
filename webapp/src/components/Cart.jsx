
import React from 'react'
import { IoArrowBack } from "react-icons/io5"
import { IoMdAdd, IoMdRemove } from "react-icons/io"
import { NavLink, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cartItems, updateQuantity, getTotalPrice, checkoutOrder } = useCart();
  const { tableId } = useParams();

  // Simple table display name
  const getTableDisplayName = () => {
    return tableId ? `Table ${tableId}` : 'Unknown Table';
  };

  // Calculate totals
  const subtotal = getTotalPrice();
  const serviceFee = 5.00;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + serviceFee + tax;

  // Handle quantity changes
  const handleQuantityChange = (itemId, change) => {
    updateQuantity(itemId, change);
  };

  return (
    <div className="bg-[#0f1323] font-display text-white min-h-screen flex items-center justify-center ">
      <div className="w-full max-w-md min-h-screen flex flex-col overflow-hidden">
        <div className="relative flex h-auto min-h-screen w-full flex-col justify-between overflow-x-hidden border border-white/10">
          <div className="flex-grow">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-[#0f1323]/80 backdrop-blur-sm">
              <div className="flex items-center p-4 pb-2">
                <NavLink to={`/table/${tableId}`} className="flex items-center justify-center h-10 w-10 text-white">
                  <IoArrowBack className="text-xl" />
                </NavLink>
                <div className="flex-1 mr-10 text-center">
                  <h1 className="text-xl font-bold text-white">Your Cart</h1>
                  <p className="text-sm mt-2 text-[#607AFB]">{getTableDisplayName()}</p>
                </div>
              </div>
            </header>

            {/* Main Content */}
            <main className="p-4 space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                  <div key={item.id} className="glassmorphism p-4 rounded-xl flex items-center space-x-4">
                    {/* Item Image */}
                    <div 
                      className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0 bg-gray-700"
                      style={item.image ? { backgroundImage: `url("${item.image}")` } : {}}
                    ></div>
                    
                    {/* Item Details */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-white">{item.name}</h3>
                      <p className="text-sm text-[#607AFB] font-semibold">{item.price.toFixed(2)} ₹</p>
                    </div>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, -1)}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                      >
                        <IoMdRemove />
                      </button>
                      <span className="text-white font-semibold min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="flex items-center justify-center h-8 w-8 rounded-full bg-[#607AFB] text-white hover:bg-[#607AFB]/80 transition-colors"
                      >
                        <IoMdAdd />
                      </button>
                    </div>
                  </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-white/50 text-center">Your cart is empty</p>
                  </div>
                )}
              </div>

              {/* Order Summary */}
              {cartItems.length > 0 && (
                <div className="glassmorphism p-4 rounded-xl space-y-3">
                  <h3 className="text-lg font-bold text-white mb-3">Order Summary</h3>
                  
                  <div className="flex justify-between text-white/80">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} ₹</span>
                  </div>
                  
                  <div className="flex justify-between text-white/80">
                    <span>Service Fee</span>
                    <span>{serviceFee.toFixed(2)} ₹</span>
                  </div>
                  
                  <div className="flex justify-between text-white/80">
                    <span>Tax</span>
                    <span>{tax.toFixed(2)} ₹</span>
                  </div>
                  
                  <div className="border-t border-white/10 pt-3">
                    <div className="flex justify-between text-white font-bold text-lg">
                      <span>Total</span>
                      <span>{total.toFixed(2)} ₹</span>
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>

          {/* Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4">
              <button 
              onClick={() => checkoutOrder(cartItems, tableId)}
              className="w-full bg-[#607AFB] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#607AFB]/50 transition-colors">
                Pay {total.toFixed(2)} ₹
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Cart