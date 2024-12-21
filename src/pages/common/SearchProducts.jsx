import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
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
  // State management
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
      category: 'Apparel',
      verificationScore: 98,
      image: 'https://sakiproducts.com/cdn/shop/articles/20230202120418-dibek-coffee-recipe-blog_1200x1200.webp?v=1694506959'
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
      image: 'https://sakiproducts.com/cdn/shop/articles/20230202120418-dibek-coffee-recipe-blog_1200x1200.webp?v=1694506959'
    }
  ];

  // Available categories
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
        <div className="flex flex-col gap-6">
          {products.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex h-52 bg-white rounded-xl shadow-md overflow-hidden"
            >
              {/* Left Section - Image */}
              <div className="w-1/4 min-w-[200px]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Middle Section - Product Info */}
              <div className="w-1/2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-start">
                    <h3 className="text-xl mr-4 font-semibold text-gray-900">{product.name}</h3>
                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700">
                      {product.status}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600">{product.manufacturer}</p>
                  <div className="mt-4 flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium text-gray-700">
                      Category: {product.category}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex gap-4">
                  <Link to='/product-tracking'><button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    View Details
                  </button></Link>
                </div>
              </div>

              {/* Right Section - Details */}
              <div className="w-1/4 p-6 flex flex-col justify-center space-y-6">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium">
                    Verification Score: {product.verificationScore}%
                  </span>
                </div>
                
                <div className="flex items-center">
                  <Box className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{product.location}</span>
                </div>

                <div className="flex items-center">
                  <History className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">
                    Updated: {product.lastUpdated}
                  </span>
                </div>

                <div className="flex items-center">
                  <LinkIcon className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{product.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchProducts;