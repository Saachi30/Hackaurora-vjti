// File: src/pages/common/ProductTracking.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Truck, Package, CheckCircle, AlertCircle } from 'lucide-react';

const mockProduct = {
  id: 'BT1234567',
  name: 'Organic Cotton T-Shirt',
  currentStatus: 'In Transit',
  carbonFootprint: 2.5,
  journey: [
    {
      stage: 'Raw Material',
      location: 'Gujarat, India',
      timestamp: '2024-01-15',
      emissions: 0.8,
      verified: true
    },
    {
      stage: 'Manufacturing',
      location: 'Mumbai, India',
      timestamp: '2024-02-01',
      emissions: 1.2,
      verified: true
    },
    {
      stage: 'Distribution',
      location: 'Delhi, India',
      timestamp: '2024-02-15',
      emissions: 0.5,
      verified: true
    }
  ]
};

export const ProductTracking = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProduct, setShowProduct] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Tracking</h1>
          <p className="text-gray-600 mt-1">Track and verify products across the supply chain</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product ID or scan barcode"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Track Product
            </motion.button>
          </div>
        </div>

        {showProduct && (
          <>
            {/* Product Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-6 rounded-xl shadow-md mb-8"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">{mockProduct.name}</h2>
                  <p className="text-gray-600">ID: {mockProduct.id}</p>
                </div>
                <div className="flex items-center space-x-2 bg-blue-100 px-3 py-1 rounded-full">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">{mockProduct.currentStatus}</span>
                </div>
              </div>
              <div className="mt-4 flex items-center space-x-2">
                <Package className="w-5 h-5 text-gray-400" />
                <span className="text-gray-600">Carbon Footprint: {mockProduct.carbonFootprint}kg CO2</span>
              </div>
            </motion.div>

            {/* Journey Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Product Journey</h2>
              <div className="space-y-8">
                {mockProduct.journey.map((step, index) => (
                  <div key={index} className="relative">
                    {index !== mockProduct.journey.length - 1 && (
                      <div className="absolute top-8 left-4 w-0.5 h-full bg-gray-200" />
                    )}
                    <div className="flex items-start space-x-4">
                      <div className="bg-green-100 rounded-full p-2">
                        {step.verified ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{step.stage}</h3>
                        <p className="text-sm text-gray-600">{step.location}</p>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{step.timestamp}</span>
                          <span>Emissions: {step.emissions}kg CO2</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  );
};