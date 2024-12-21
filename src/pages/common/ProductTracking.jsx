import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Truck,
  Package,
  CheckCircle,
  AlertCircle,
  Plus,
  Minus,
} from "lucide-react";

const mockProduct = {
  id: "BT1234567",
  name: "Organic Cotton T-Shirt",
  description: "Experience ultimate comfort with our premium organic cotton t-shirt. Ethically sourced from the finest cotton fields of Gujarat, this sustainable piece features a perfect blend of style and consciousness. Each shirt is carefully crafted to ensure durability while maintaining breathability, making it perfect for any occasion.",
  features: [
    "100% Organic Cotton",
    "Sustainable Manufacturing",
    "Chemical-free Process",
    "Fair Trade Certified"
  ],
  currentStatus: "In Transit",
  carbonFootprint: 2.5,
  price: 150,
  quantity: 100,
  journey: [
    {
      stage: "Raw Material",
      location: "Gujarat, India",
      timestamp: "2024-01-15",
      emissions: 0.8,
      verified: true,
    },
    {
      stage: "Manufacturing",
      location: "Mumbai, India",
      timestamp: "2024-02-01",
      emissions: 1.2,
      verified: true,
    },
    {
      stage: "Distribution",
      location: "Delhi, India",
      timestamp: "2024-02-15",
      emissions: 0.5,
      verified: true,
    },
  ],
};

export const ProductTracking = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showProduct, setShowProduct] = useState(true);
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleIncrement = () => {
    if (orderQuantity < mockProduct.quantity) {
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
        orderQuantity * mockProduct.price
      ).toFixed(2)}`
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Product Tracking</h1>
          <p className="text-gray-600 mt-1">
            Track and verify products across the supply chain
          </p>
        </div>

        {showProduct && (
          <>
            {/* Enhanced Product Overview */}
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
                    {mockProduct.name}
                  </h2>
                  <p className="text-gray-600 mb-4">ID: {mockProduct.id}</p>
                  
                  {/* New Description Section */}
                  <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-100 shadow-sm mb-6">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed">
                      {showFullDescription 
                        ? mockProduct.description 
                        : `${mockProduct.description.slice(0, 100)}...`}
                      <button 
                        onClick={() => setShowFullDescription(!showFullDescription)}
                        className="text-blue-600 hover:text-blue-700 ml-2 font-medium"
                      >
                        {showFullDescription ? 'Read Less' : 'Read More'}
                      </button>
                    </p>
                    
                    {/* Features List */}
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      {mockProduct.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 bg-blue-700 px-12 py-2 rounded-lg shadow-sm hover:bg-blue-600 transition duration-200 cursor-pointer">
                  <button className="text-lg font-semibold text-white">Buy</button>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">
                      Carbon Footprint: {mockProduct.carbonFootprint}kg CO2
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-green-500" />
                    <span className="text-gray-600">
                      Price: ${mockProduct.price}
                    </span>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Package className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-600">
                      Available Stock: {mockProduct.quantity}
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
                      disabled={orderQuantity >= mockProduct.quantity}
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <div className="inline-block py-2 px-3 rounded-lg bg-blue-50 text-blue-700 font-medium">
                  Total Price - ${(orderQuantity * mockProduct.price).toFixed(2)}
                </div>
              </div>
            </motion.div>

            {/* Journey Timeline - Kept unchanged */}
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
                        <h3 className="font-medium text-gray-800">
                          {step.stage}
                        </h3>
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

export default ProductTracking;