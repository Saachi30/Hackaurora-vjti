import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, TruckIcon, HistoryIcon, ChartBarIcon, BellIcon, LeafIcon } from 'lucide-react';

const DashboardCard = ({ icon: Icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white p-6 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg"
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

export const ConsumerDashboard = () => {
  const navigate = useNavigate();

  const dashboardItems = [
    {
      icon: SearchIcon,
      title: 'Search Products',
      description: 'Find and verify products using blockchain',
      path: '/search-products'
    },
    {
      icon: TruckIcon,
      title: 'Product Tracking',
      description: 'Track products and verify authenticity',
      path: '/product-tracking'
    },
    {
      icon: HistoryIcon,
      title: 'Order History',
      description: 'View your past purchases and their impact',
      path: '/order-history'
    },
    {
      icon: ChartBarIcon,
      title: 'Leaderboard',
      description: 'See how you rank in sustainable shopping',
      path: '/leaderboard'
    },
    {
      icon: BellIcon,
      title: 'Notices',
      description: 'Important updates and announcements',
      path: '/notices'
    },
    {
      icon: LeafIcon,
      title: 'Environmental Impact',
      description: 'Track your carbon footprint and green score',
      path: '/environmental-impact'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome Back!</h1>
            <p className="text-gray-600 mt-1">Track and verify your sustainable purchases</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={() => navigate('/ar-vr')}
          >
            AR/VR Scan
          </motion.button>
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

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Green Score</h3>
              <p className="text-2xl font-bold text-green-600">85/100</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Verified Purchases</h3>
              <p className="text-2xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm text-gray-600">Carbon Saved</h3>
              <p className="text-2xl font-bold text-purple-600">142 kg</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};