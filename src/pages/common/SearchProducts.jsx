import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Web3Provider } from "@web3-react/core";

import { 
  Search, 
  Box, 
  QrCode, 
  Filter, 
  Link as LinkIcon, 
  Shield, 
  History,
  Check,
  AlertCircle 
} from 'lucide-react';
import { useWeb3 } from '../../Web3Context';
import { ethers } from 'ethers';

export const SearchProducts = () => {
  // Web3 Context
  const { contract, account, loading, error, connectWallet } = useWeb3();

  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [products, setProducts] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Available categories
  const categories = [
    'All Categories',
    'Food & Beverage',
    'Apparel',
    'Electronics',
    'Pharmaceuticals',
    'Raw Materials'
  ];

  // Function to fetch product details
  const fetchProduct = async (productId) => {
    try {
      if (!contract) {
        throw new Error('Contract not initialized');
      }

      const productData = await contract.getProduct(productId);
      
      // Format the product data
      return {
        id: productId.toString(),
        name: productData.name,
        category: productData.category,
        description: productData.description,
        price: ethers.utils.formatEther(productData.price),
        quantity: productData.quantity.toString(),
        barcodeNo: productData.barcodeNo.toString(),
        rawMaterials: productData.rawMaterials.map(rm => rm.toString()),
        verificationScore: productData.greenScore.toString(),
        currentVendor: productData.currentVendor,
        manufacturer: productData.currentVendorOrg,
        location: productData.currentVendorLocation,
        status: 'Verified',
        lastUpdated: new Date().toISOString().split('T')[0]
      };
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    }
  };

  // Function to handle search
  const handleSearch = async () => {
    setIsLoading(true);
    setFetchError(null);
    
    try {
      // For demo purposes, let's fetch products with IDs 1-3
      // In a real application, you would implement proper search logic
      const productIds = [1, 2, 3];
      const fetchedProducts = await Promise.all(
        productIds.map(id => fetchProduct(id))
      );
      
      setProducts(fetchedProducts);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to handle initial product fetch
  useEffect(() => {
    if (contract) {
      handleSearch();
    }
  }, [contract]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Search Products</h1>
              <p className="mt-1 text-sm text-gray-500">
                Verify product authenticity and track supply chain information
              </p>
            </div>
            {!account && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={connectWallet}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Connect Wallet
              </motion.button>
            )}
          </div>
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
              placeholder="Search by product ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            disabled={!account || isLoading}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            Search
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

      {/* Error State */}
      {(error || fetchError) && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error || fetchError}</span>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-gray-600">
          Loading products...
        </div>
      )}

      {/* Products Grid */}
      {!isLoading && products.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col gap-6">
            {products.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-52 bg-white rounded-xl shadow-md overflow-hidden"
              >
                {/* Product Info */}
                <div className="w-2/3 p-6 flex flex-col justify-between">
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
                  <Link to={`/product-tracking/${product.id}`}>
  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
    View Details
  </button>
</Link>
                  </div>
                </div>

                {/* Right Section - Details */}
                <div className="w-1/3 p-6 bg-gray-50 flex flex-col justify-center space-y-4">
                  <div className="flex items-center">
                    <Shield className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm font-medium">
                      Green Score: {product.verificationScore}%
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
                    <span className="text-sm text-gray-600 truncate">{product.currentVendor}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;