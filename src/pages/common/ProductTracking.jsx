import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from 'react-router-dom';
import {
  Search,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
  ArrowLeft
} from "lucide-react";
import { useWeb3 } from '../../Web3Context';

export const ProductTracking = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { contract, account, loading: web3Loading, error: web3Error } = useWeb3();
  

  // State management
  const [product, setProduct] = useState(null);
  const [journey, setJourney] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseLoading, setPurchaseLoading] = useState(false);
  const [purchaseError, setpError] = useState(null);
  

  // Fetch product data and journey
  useEffect(() => {
    if (!productId) {
      navigate('/search');
      return;
    }

    fetchProductData();
  }, [contract, productId]);

  const fetchProductData = async () => {
    try {
      if (!contract || !productId) return;

      setLoading(true);
      
      // Fetch product details
      const productData = await contract.getProduct(productId);
      
      // Format product data
      const formattedProduct = {
        id: productId,
        name: productData.name,
        description: productData.description,
        features: ["Sustainable Manufacturing", "Chemical-free Process", "Fair Trade Certified"],
        currentStatus: "In Transit",
        carbonFootprint: 2.5,
        price: Number(productData.price),
        quantity: Number(productData.quantity),
        category: productData.category,
        barcodeNo: productData.barcodeNo.toString(),
        greenScore: Number(productData.greenScore),
        currentVendor: productData.currentVendor,
        currentVendorOrg: productData.currentVendorOrg,
        currentVendorLocation: productData.currentVendorLocation
      };

      // Fetch journey data
      const journeyData = await contract.getProductJourney(productId);
      
      // Format journey steps
      const formattedJourney = journeyData.steps.map(step => ({
        stage: step.status,
        location: step.location,
        timestamp: new Date(Number(step.timestamp) * 1000).toISOString().split('T')[0],
        emissions: 0.8,
        verified: true,
        organization: step.organization,
        vendor: step.vendor,
        consumer: step.consumer,
        quantity: Number(step.quantity)
      }));

      setProduct(formattedProduct);
      setJourney(formattedJourney);
      setError(null);
    } catch (err) {
      console.error('Error fetching product data:', err);
      setError('Failed to fetch product data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Add a back button handler
  const handleBack = () => {
    navigate('/search-products');
  };

  useEffect(() => {
    fetchProductData();
  }, [contract, productId]);

  const handleIncrement = () => {
    if (orderQuantity < (product?.quantity || 0)) {
      setOrderQuantity((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (orderQuantity > 1) {
      setOrderQuantity((prev) => prev - 1);
    }
  };

  const handleBuy = () => {
    alert(
      `Purchasing ${orderQuantity} items for $${(
        orderQuantity * (product?.price || 0)
      ).toFixed(2)}`
    );
  };

  if (loading || web3Loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-gray-600">Loading product data...</div>
      </div>
    );
  }

  if (error || web3Error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6 flex items-center justify-center">
        <div className="text-red-600">{error || web3Error}</div>
      </div>
    );
  }

  if (!product) return null;
  const handlePurchase = async (userType) => {
    try {
      setPurchaseLoading(true);
      setError(null);

      if (!contract || !account) {
        throw new Error("Web3 connection not available");
      }

      if (userType === 'vendor') {
        await contract.purchaseProduct(productId, orderQuantity);
      } else {
        await contract.consumerPurchaseProduct(productId, orderQuantity);
      }

      // Refresh product data after purchase
      await fetchProductData();
      setShowPurchaseModal(false);
    } catch (err) {
      console.error('Purchase error:', err);
      setError(err.message || 'Failed to complete purchase. Please try again.');
    } finally {
      setPurchaseLoading(false);
    }
  };

  const PurchaseModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
        <h3 className="text-xl font-semibold mb-4">Select Purchase Type</h3>
        <div className="space-y-4">
          <button
            onClick={() => handlePurchase('consumer')}
            disabled={purchaseLoading}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-lg transition duration-200"
          >
            <span>Purchase as Consumer</span>
          </button>
          
          <button
            onClick={() => handlePurchase('vendor')}
            disabled={purchaseLoading}
            className="w-full flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white p-4 rounded-lg transition duration-200"
          >
            <span>Purchase as Vendor</span>
          </button>
        </div>
        
        {purchaseError && (
          <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg">
            {purchaseError}
          </div>
        )}
        
        <button
          onClick={() => setShowPurchaseModal(false)}
          className="mt-4 w-full p-2 text-gray-600 hover:text-gray-800 transition duration-200"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  // Modify the original buy button to show the modal
  const handleBuyClick = () => {
    setShowPurchaseModal(true);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-800 mb-4"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Search
        </button>
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Tracking</h1>
          <p className="text-gray-600 mt-1">
            Track and verify products across the supply chain
          </p>
        </div>

        {/* Product Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-xl shadow-md mb-8 relative overflow-hidden"
        >
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-green-50 rounded-full -mr-32 -mt-32 opacity-20" />
          
          <div className="flex justify-between items-start relative">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {product.name}
              </h2>
              <p className="text-gray-600 mb-4">ID: {product.id}</p>
              
              {/* Description Section */}
              <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
                <h3 className="text-lg font-medium text-gray-700 mb-2">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {showFullDescription 
                    ? product.description 
                    : `${product.description.slice(0, 100)}...`}
                  <button 
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="text-blue-600 hover:text-blue-700 ml-2 font-medium"
                  >
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </button>
                </p>
                
                {/* Features List */}
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleBuyClick}
                className="bg-blue-700 px-12 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200 text-lg font-semibold text-white"
              >
                Buy
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-blue-500" />
                <span className="text-gray-600">
                  Green Score: {product.greenScore}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-green-500" />
                <span className="text-gray-600">
                  Price: ${product.price}
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <div className="flex items-center space-x-2">
                <Package className="w-5 h-5 text-purple-500" />
                <span className="text-gray-600">
                  Available Stock: {product.quantity}
                </span>
              </div>
            </div>
          </div>

          {/* Quantity Controls and Buy Button */}
          <div className="mt-6 space-y-4 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Quantity:</span>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleDecrement}
                  className="p-1 rounded-full bg-white hover:bg-gray-200 transition-colors border border-gray-200"
                  disabled={orderQuantity <= 1}
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-12 text-center font-medium">
                  {orderQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  className="p-1 rounded-full bg-white hover:bg-gray-200 transition-colors border border-gray-200"
                  disabled={orderQuantity >= product.quantity}
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="inline-block py-2 px-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
              Total Price - ${(orderQuantity * product.price).toFixed(2)}
            </div>
          </div>
        </motion.div>

        {/* Journey Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Product Journey
          </h2>
          <div className="space-y-8">
            {journey.map((step, index) => (
              <div key={index} className="relative">
                {index !== journey.length - 1 && (
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
                    <h3 className="font-medium text-gray-800">
                      {step.stage}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {step.organization} - {step.location}
                    </p>
                    <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                      <span>{step.timestamp}</span>
                      <span>Quantity: {step.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      {showPurchaseModal && <PurchaseModal />}
    </div>
  );
};

export default ProductTracking;