import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Box, 
  QrCode, 
  Filter, 
  Link as LinkIcon, 
  Shield, 
  History,
  Check 
} from 'lucide-react';

export const SearchProducts = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample products data
  const products = [
    {
      id: '0x1234...',
      name: 'Organic Coffee Beans',
      manufacturer: 'Green Hills Farm',
      status: 'Verified',
      location: 'Distribution Center, NY',
      lastUpdated: '2024-12-20',
      category: 'Food & Beverage',
      verificationScore: 98,
      image: '/api/placeholder/400/300'
    },
    {
      id: '0x5678...',
      name: 'Fair Trade Cotton T-Shirt',
      manufacturer: 'EcoWear Industries',
      status: 'In Transit',
      location: 'Port of Los Angeles',
      lastUpdated: '2024-12-19',
      category: 'Apparel',
      verificationScore: 95,
      image: '/api/placeholder/400/300'
    }
  ];

  const categories = [
    'All Categories',
    'Food & Beverage',
    'Apparel',
    'Electronics',
    'Pharmaceuticals',
    'Raw Materials'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Search Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verify product authenticity and track supply chain information
          </p>
        </div>
      </div>

      {/* Search Section */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg 
                         focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by product name, ID, or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* QR Code Scanner Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg 
                       hover:bg-blue-700 transition-colors"
          >
            <QrCode className="h-5 w-5 mr-2" />
            Scan QR Code
          </motion.button>

          {/* Filter Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg 
                       hover:bg-gray-200 transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </motion.button>
        </div>

        {/* Filter Panel */}
        {filterOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 bg-white rounded-lg shadow"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm ${
                    selectedCategory === category
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium
                    ${product.status === 'Verified' 
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    {product.status}
                  </span>
                </div>
                
                <p className="mt-2 text-sm text-gray-600">{product.manufacturer}</p>
                
                {/* Verification Score */}
                <div className="mt-4 flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-gray-700">
                    Verification Score: {product.verificationScore}%
                  </span>
                </div>

                {/* Location */}
                <div className="mt-2 flex items-center">
                  <Box className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{product.location}</span>
                </div>

                {/* Last Updated */}
                <div className="mt-2 flex items-center">
                  <History className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    Updated: {product.lastUpdated}
                  </span>
                </div>

                {/* Blockchain ID */}
                <div className="mt-2 flex items-center">
                  <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{product.id}</span>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex gap-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center px-4 py-2 
                             bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                             transition-colors"
                  >
                    View Details
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 flex items-center justify-center px-4 py-2 
                             bg-green-100 text-green-700 rounded-lg hover:bg-green-200 
                             transition-colors"
                  >
                    <Check className="h-5 w-5 mr-2" />
                    Verify
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};