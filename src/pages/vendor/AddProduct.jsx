import React, { useState } from 'react';
import { Upload, Plus, X } from 'lucide-react';
import { useWeb3 } from '../../Web3Context';
import { ethers } from 'ethers';

const AddProduct = () => {
  const { contract, account, connectWallet } = useWeb3();
  const [formData, setFormData] = useState({
    productName: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    sourceLocation: '',
    manufacturingLocation: '',
    certifications: [],
    barcode: '',
    rawMaterials: []
  });

  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (!contract || !account) {
        const connected = await connectWallet();
        if (!connected) {
          throw new Error('Please connect your wallet first');
        }
      }

      // Convert price to wei
      const priceWei = ethers.utils.parseEther(formData.price.toString());
      const quantity = parseInt(formData.quantity);
      const barcode = parseInt(formData.barcode);
      
      // Default raw materials array
      const rawMaterials = [];

      // Call the smart contract method
      const transaction = await contract.addProduct(
        formData.productName,
        formData.category,
        formData.description,
        priceWei,
        quantity,
        barcode,
        rawMaterials
      );

      // Wait for the transaction to be mined
      await transaction.wait();

      setSuccess('Product successfully added to the blockchain!');
      // Reset form after successful submission
      setFormData({
        productName: '',
        description: '',
        category: '',
        price: '',
        quantity: '',
        sourceLocation: '',
        manufacturingLocation: '',
        certifications: [],
        barcode: '',
        rawMaterials: []
      });
    } catch (err) {
      setError(err.message || 'Failed to add product to blockchain');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-gray-600">Enter product details to add to the blockchain</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <h3 className="text-red-800 font-medium">Error</h3>
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-md">
          <h3 className="text-green-800 font-medium">Success</h3>
          <p className="text-green-700">{success}</p>
        </div>
      )}

      {!account && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
         
          <p className="text-blue-700">
            <button 
              onClick={connectWallet}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Connect your wallet
            </button>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Product Name
              </label>
              <input
                type="text"
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select a category</option>
                <option value="clothing">Clothing</option>
                <option value="furniture">Furniture</option>
                <option value="electronics">Electronics</option>
                <option value="food">Food & Beverages</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (ETH)
              </label>
              <input
                type="number"
                step="0.0001"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Barcode Number
              </label>
              <input
                type="number"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Source Location
              </label>
              <input
                type="text"
                name="sourceLocation"
                value={formData.sourceLocation}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mt-6 md:col-span-2 flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                disabled={loading || !account}
              >
                {loading ? 'Adding Product...' : 'Add Product'}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;