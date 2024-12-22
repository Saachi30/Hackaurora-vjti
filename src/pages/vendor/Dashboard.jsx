import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import { useWeb3 } from '../../Web3Context';
import GTranslate from '../../components/GTranslate';
import { 
  PlusCircleIcon, 
  SearchIcon, 
  ChartBarIcon, 
  BellIcon, 
  HistoryIcon, 
  LeafIcon,
  ShoppingCartIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from 'lucide-react';
import BarcodeScanner from '../../components/BarcodeScanner';

const DashboardCard = ({ icon: Icon, title, description, onClick, className }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className={`bg-white p-6 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg ${className}`}
    onClick={onClick}
  >
    <div className="flex items-center space-x-4">
      <div className="bg-blue-100 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </motion.div>
);

export const VendorDashboard = () => {
  const navigate = useNavigate();
  const { contract, account, connectWallet } = useWeb3();
  const [recentProducts, setRecentProducts] = useState([]);
  const [currentStock, setCurrentStock] = useState([]);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (contract && account) {
        try {
          // Get vendor's purchased products
          const purchasedProductIds = await contract.getVendorPurchasedProducts(account);
          
          // Fetch details for each product
          const productPromises = purchasedProductIds.map(async (id) => {
            const product = await contract.getProduct(id);
            return {
              id: id.toString(),
              name: product.name,
              quantity: product.quantity.toString(),
              unit: 'pieces',
              reorderPoint: Math.floor(product.quantity.toString() * 0.3), // 30% of current quantity
              sustainabilityScore: product.greenScore.toString(),
              status: getStockStatus(product.quantity.toString(), Math.floor(product.quantity.toString() * 0.3))
            };
          });

          const products = await Promise.all(productPromises);
          setCurrentStock(products);

          // Set recent products (last 3)
          setRecentProducts(products.slice(0, 3).map(product => ({
            id: product.id,
            name: product.name,
            timestamp: Date.now() - Math.random() * 7200000 // Random time within last 2 hours
          })));
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      }
    };

    fetchProducts();
  }, [contract, account]);

  const getStockStatus = (quantity, reorderPoint) => {
    if (quantity <= reorderPoint) return 'low';
    if (quantity >= reorderPoint * 3) return 'excess';
    return 'optimal';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'low': return 'text-red-600 bg-red-50';
      case 'optimal': return 'text-green-600 bg-green-50';
      case 'excess': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const dashboardItems = [
    {
      icon: PlusCircleIcon,
      title: 'Add Product',
      description: 'Register new products on the blockchain',
      className: 'border-2 border-blue-500',
      path: '/vendor/add-product'
    },
    {
      icon: SearchIcon,
      title: 'Search Products',
      description: 'Find products and vendors in the network',
      path: '/search-products'
    },
    {
      icon: ChartBarIcon,
      title: 'Leaderboard',
      description: 'View sustainability rankings',
      path: '/vendor/leaderboard'
    },
    {
      icon: BellIcon,
      title: 'Notices',
      description: 'Updates and network announcements',
      path: '/notices'
    },
    {
      icon: HistoryIcon,
      title: 'Order History',
      description: 'Track your transactions',
      path: '/order-history'
    },
    {
      icon: LeafIcon,
      title: 'Environmental Impact',
      description: 'Monitor your sustainability metrics',
      path: '/environmental-impact'
    },
  ];
 



  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/10 to-blue-500/50 pt-2 pb-6 flex flex-col gap-7">
      <Header />
      <GTranslate />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header section with buttons */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Vendor Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your sustainable supply chain</p>
          </div>
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-blue-600"
              onClick={connectWallet}
            >
              Connect Wallet
            </motion.button>
            <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg 
                     hover:bg-blue-700 transition-colors"
            onClick={() => setIsScannerOpen(true)}
          >
            {/* <QrCode className="h-5 w-5 mr-2" /> */}
            <BarcodeScanner
            className="h-5 w-5 mr-2"
          isOpen={isScannerOpen}
          onClose={() => setIsScannerOpen(false)}
          onScan={(barcode) => {
            // Handle the scanned barcode
            setIsScannerOpen(false);
            // Navigate to product tracking or handle the barcode as needed
          }}
        />
            Scan Barcode
          </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => navigate('/labor')}
            >
              Labor List
            </motion.button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <DashboardCard 
                {...item} 
                onClick={() => navigate(item.path)}
              />
            </motion.div>
          ))}
        </div>

        {/* Stats and Analytics Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Performance Metrics</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Sustainability Score</h3>
                <p className="text-2xl font-bold text-green-600">92/100</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Products Tracked</h3>
                <p className="text-2xl font-bold text-blue-600">1,234</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Carbon Footprint</h3>
                <p className="text-2xl font-bold text-purple-600">-25%</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg">
                <h3 className="text-sm text-gray-600">Network Trust Score</h3>
                <p className="text-2xl font-bold text-orange-600">4.8/5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Product: {product.name}</p>
                      <p className="text-xs text-gray-600">ID: {product.id}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">
                    {Math.floor((Date.now() - product.timestamp) / 3600000)} hours ago
                  </span>
                </div>
              ))}
            </div>
        </div>
        
        </div>
           {/* Add the new Current Stock section */}
           <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">Current Stock</h2>
            <div className="flex space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                onClick={() => navigate('/search-products')}
              >
                <ShoppingCartIcon className="w-4 h-4" />
                <span>Purchase Stock</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/vendor/manage-inventory')}
              >
                <LeafIcon className="w-4 h-4" />
                <span>Manage Inventory</span>
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sustainability</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentStock.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        <div className="text-sm text-gray-500">ID: {item.id}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.quantity} {item.unit}</div>
                      <div className="text-xs text-gray-500">Reorder at: {item.reorderPoint}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                        {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.sustainabilityScore}/100</div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium space-x-2">
                      <button 
                        className="text-green-600 hover:text-green-900"
                        onClick={() => navigate(`/vendor/purchase-stock/${item.id}`)}
                      >
                        <TrendingUpIcon className="w-5 h-5" />
                      </button>
                      <button 
                        className="text-blue-600 hover:text-blue-900"
                        onClick={() => navigate(`/vendor/sell-stock/${item.id}`)}
                      >
                        <TrendingDownIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};