import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Package, Truck, Leaf } from 'lucide-react';
import { useWeb3 } from '../../Web3Context';
import { ethers } from 'ethers';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { contract, account, connectWallet } = useWeb3();

  // Helper function to safely convert BigNumber to string
  const safeToString = (value) => {
    try {
      if (ethers.BigNumber.isBigNumber(value)) {
        return value.toString();
      }
      return String(value);
    } catch (err) {
      console.error('Error converting value:', value);
      return '0';
    }
  };

  useEffect(() => {
    const initializeAndFetch = async () => {
      if (!contract || !account) {
        const connected = await connectWallet();
        if (!connected) return;
      }
      fetchOrders();
    };

    initializeAndFetch();
  }, [contract, account]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!contract || !account) {
        setError('Web3 not properly initialized');
        return;
      }

      const purchasedProductIds = await contract.getVendorPurchasedProducts(account);
      console.log('Product IDs:', purchasedProductIds);
      
      if (!purchasedProductIds || purchasedProductIds.length === 0) {
        setOrders([]);
        return;
      }

      const orderPromises = purchasedProductIds.map(async (productId) => {
        try {
          const productDetails = await contract.getProduct(productId);
          console.log('Raw product details:', productDetails);
          
          const journeyDetails = await contract.getProductJourney(productId);
          console.log('Raw journey details:', journeyDetails);

          const purchaseStep = journeyDetails.steps.find(
            step => step.vendor.toLowerCase() === account.toLowerCase() &&
                   step.status === "Purchased"
          );

          const processedOrder = {
            id: safeToString(productId),
            name: String(productDetails[0] || ''),
            category: String(productDetails[1] || ''),
            description: String(productDetails[2] || ''),
            price: safeToString(productDetails[3]),
            currentQuantity: safeToString(productDetails[4]),
            purchasedQuantity: purchaseStep ? safeToString(purchaseStep.quantity) : '0',
            barcodeNo: String(productDetails[5] || ''),
            greenScore: safeToString(productDetails[7] || '0'),
            purchaseDate: purchaseStep ? 
              new Date(Number(safeToString(purchaseStep.timestamp)) * 1000) : 
              new Date(),
            status: purchaseStep ? String(purchaseStep.status) : 'Unknown',
            vendor: {
              address: String(productDetails[8] || ''),
              organization: String(productDetails[9] || ''),
              location: String(productDetails[10] || '')
            }
          };

          console.log('Processed order:', processedOrder);
          return processedOrder;
        } catch (err) {
          console.error('Error processing product:', productId, err);
          return null;
        }
      });

      const orderDetails = (await Promise.all(orderPromises))
        .filter(order => order !== null && order.purchasedQuantity !== '0');
      
      console.log('Final orders:', orderDetails);
      setOrders(orderDetails);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (String(status).toLowerCase()) {
      case 'purchased':
        return 'bg-green-100 text-green-800';
      case 'in transit':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatPrice = (priceString) => {
    try {
      if (!priceString) return '0.00 USD';
      const formattedPrice = ethers.utils.formatEther(priceString);
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(parseFloat(formattedPrice));
    } catch (error) {
      console.error('Error formatting price:', error);
      return '0.00 USD';
    }
  };

  const renderValue = (value) => {
    try {
      return String(value || '');
    } catch (err) {
      console.error('Error rendering value:', err);
      return '';
    }
  };

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">Error: {error}</p>
          <button 
            onClick={connectWallet}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Purchased Products History</h1>
          <p className="text-gray-600">No purchased products found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Purchased Products History</h1>
        <p className="text-gray-600">Track your purchased inventory and their sustainability metrics</p>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Product Details</p>
                  <p className="font-medium">{renderValue(order.name)}</p>
                  <p className="text-sm text-gray-500">Category: {renderValue(order.category)}</p>
                  <p className="text-sm text-gray-500">Barcode: {renderValue(order.barcodeNo)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Purchase Date</p>
                  <p className="font-medium">{order.purchaseDate.toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Supplier</p>
                  <p className="font-medium">{renderValue(order.vendor.organization)}</p>
                  <p className="text-sm text-gray-500">{renderValue(order.vendor.location)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Leaf className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Green Score</p>
                  <div className="flex items-center">
                    <div className="w-24 h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-green-500 rounded-full"
                        style={{ width: `${Math.min(parseInt(order.greenScore || '0'), 100)}%` }}
                      />
                    </div>
                    <span className="ml-2 font-medium">{parseInt(order.greenScore || '0')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Purchase Price</p>
                    <p className="font-medium">{formatPrice(order.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Purchase Quantity</p>
                    <p className="font-medium">{renderValue(order.purchasedQuantity)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Current Stock</p>
                    <p className="font-medium">{renderValue(order.currentQuantity)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span className={`px-2 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {renderValue(order.status)}
                    </span>
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