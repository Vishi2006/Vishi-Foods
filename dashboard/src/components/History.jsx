import React, { useState, useMemo } from 'react'
import { useApp } from '../context/AppContext'

const History = () => {
  const { history } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = useMemo(() => {
    if (!searchTerm) return history;
    return history.filter(order => 
      (order.id || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.customer || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.status || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [history, searchTerm]);

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Order History</h1>

      <div className="bg-slate-800 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Past Orders ({history.length})</h2>
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-300 focus:outline-none focus:border-blue-500 w-64"
          />
        </div>

        {filteredHistory.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <p>{searchTerm ? 'No orders found matching your search' : 'No order history yet'}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-slate-400 text-sm border-b border-slate-700">
                  <th className="text-left pb-4 font-medium">Order ID</th>
                  <th className="text-left pb-4 font-medium">Table</th>
                  <th className="text-left pb-4 font-medium">Items</th>
                  <th className="text-left pb-4 font-medium">Date</th>
                  <th className="text-left pb-4 font-medium">Status</th>
                  <th className="text-left pb-4 font-medium">Amount</th>
                </tr>
              </thead>
              <tbody>
                {filteredHistory.map((order) => (
                <tr key={order.id} className="border-b border-slate-700">
                  <td className="py-4 text-slate-300">{order.id}</td>
                  <td className="py-4 text-slate-300">{order.customer}</td>
                    <td className="py-4 text-slate-300">{Array.isArray(order.items) ? order.items.length : 0} items</td>
                  <td className="py-4 text-slate-300">{order.date}</td>
                  <td className="py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'Delivered'
                          ? 'bg-green-900 text-green-300'
                          : 'bg-red-900 text-red-300'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                    <td className="py-4">{order.deliveryamount} ₹</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        )}
      </div>
    </div>
  );
};


export default History
