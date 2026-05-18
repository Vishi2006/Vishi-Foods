import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

const OrderManagement = () => {
  const { orders, sendOrder, removeOrder } = useApp();
  const [formData, setFormData] = useState({
    orderId: '',
    customerName: '',
    deliveryamount: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateTotal = (items) => {
    if (!items || !Array.isArray(items)) return 0;
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getItemNames = (items) => {
    if (!items || !Array.isArray(items)) return 'No items';
    return items.map(item => `${item.name}`).join(', ');
  };

  const handleSelectOrder = async (order) => {
    const total = calculateTotal(order.items);
    setFormData({
      orderId: order.id,
      customerName: order.table || `Table ${order.table}`,
      deliveryamount: total.toFixed(2)
    });
    // Remove order from list and store its data
    await removeOrder(order.id, order);
  };

  const handleSendOrder = () => {
    if (!formData.orderId || !formData.customerName || !formData.deliveryamount) {
      alert('Please fill in all fields');
      return;
    }

    const success = sendOrder(formData);
    if (success) {
      setSuccessMessage(`Order ${formData.orderId} sent successfully!`);
      setFormData({
        orderId: '',
        customerName: '',
        deliveryamount: ''
      });
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      alert('Order not found. Please select an order from the list.');
    }

    
  };

  // Filter out completed orders
  const incomingOrders = orders.filter(order => order.status !== 'completed');

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Order Management</h1>
        <p className="text-slate-400 mt-2">Orders are received automatically from customer checkouts</p>
      </div>

      {successMessage && (
        <div className="mb-4 bg-green-900 border border-green-700 text-green-300 px-4 py-3 rounded-lg flex items-center gap-2">
          <CheckCircle size={18} />
          {successMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Incoming Orders */}
        <div className="lg:col-span-2 bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Incoming Orders ({incomingOrders.length})</h2>

          {incomingOrders.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <p>No incoming orders</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-slate-400 text-sm border-b border-slate-700">
                    <th className="text-left pb-4 font-medium">Order ID</th>
                    <th className="text-left pb-4 font-medium">Table</th>
                    <th className="text-left pb-4 font-medium">Items</th>
                    <th className="text-left pb-4 font-medium">Total</th>
                    <th className="text-left pb-4 font-medium">Name</th>
                    <th className="text-left pb-4 font-medium">Status</th>
                    <th className="text-left pb-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {incomingOrders.map((order) => {
                    const itemCount = order.items?.length || 0;
                    const total = calculateTotal(order.items);
                    const itemNames = getItemNames(order.items);
                    return (
                      <tr key={order.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition">
                        <td className="py-4 text-slate-300 font-mono text-sm">{order.id.slice(0, 8)}...</td>
                        <td className="py-4 text-slate-300">Table {order.table}</td>
                        <td className="py-4 text-slate-300">{itemCount} items</td>
                        <td className="py-4 text-slate-300">{total.toFixed(2)} ₹</td>
                        <td className="py-4 text-slate-300">
                          <div className="max-w-xs">
                            <p className="truncate" title={itemNames}>
                              {itemNames}
                            </p>
                          </div>
                        </td>
                        <td className="py-4">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' : 
                            order.status === 'completed' ? 'bg-green-900 text-green-300' : 
                            'bg-slate-700 text-slate-300'
                          }`}>
                            {order.status || 'pending'}
                          </span>
                        </td>
                        <td className="py-4 flex gap-2">
                          <button
                            onClick={() => handleSelectOrder(order)}
                            className="text-blue-500 hover:text-blue-400 text-sm font-medium"
                          >
                            Select
                          </button>
                          <button
                            onClick={async () => {
                              if(window.confirm('Delete this order?')) {
                                await deleteOrder(order.id);
                              }
                            }}
                            className="text-red-500 hover:text-red-400 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Send Order */}
        <div className="bg-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-6">Send Order</h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-2">Order ID</label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Table Number
              </label>
              <input
                type="text"
                name="customerName"
                value={formData.customerName}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500"
                placeholder="e.g., Table 1"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-400 mb-2">
                Total paid amount
              </label>
              <input
                name="deliveryamount"
                value={formData.deliveryamount}
                onChange={handleInputChange}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 focus:outline-none focus:border-blue-500 resize-none"
              />
            </div>

            <button
              onClick={handleSendOrder}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition"
            >
              <Send size={18} />
              Send Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;