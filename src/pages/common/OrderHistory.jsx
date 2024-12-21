import React, { useState } from 'react';
import { Calendar, Clock, Package, Truck } from 'lucide-react';

const OrderHistory = () => {
  const [orders] = useState([
    {
      id: '1',
      date: '2024-03-15',
      productName: 'Organic Cotton T-Shirt',
      status: 'Delivered',
      price: '$29.99',
      carbonScore: 85,
      trackingId: 'TRK293847'
    },
    {
      id: '2',
      date: '2024-03-10',
      productName: 'Sustainable Bamboo Chair',
      status: 'In Transit',
      price: '$149.99',
      carbonScore: 78,
      trackingId: 'TRK293848'
    }
  ]);

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Order History</h1>
        <p className="text-gray-600">Track your past orders and their environmental impact</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Product</p>
                  <p className="font-medium">{order.productName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Order Date</p>
                  <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Status</p>
                  <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Tracking ID</p>
                  <p className="font-medium">{order.trackingId}</p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-500">Price</p>
                  <p className="font-medium">{order.price}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carbon Score</p>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${order.carbonScore}%` }}
                      />
                    </div>
                    <span className="ml-2 font-medium">{order.carbonScore}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;