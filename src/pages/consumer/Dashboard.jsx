import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { SearchIcon, TruckIcon, HistoryIcon, ChartBarIcon, BellIcon, LeafIcon } from 'lucide-react';
import Header from '../../components/Header';
import DashImg from '../../assets/dashimg.png';

// Voice recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = false;
recognition.lang = 'en-US';

// Helper function to check if user is authenticated
const isAuthenticated = () => {
  // Replace this with your actual authentication check
  return localStorage.getItem('token') !== null;
};

const DashboardCard = ({ icon: Icon, title, description, onClick }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    whileTap={{ scale: 0.98 }}
    className="bg-white p-6 rounded-xl shadow-md cursor-pointer transition-all duration-200 hover:shadow-lg"
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={`${title}: ${description}`}
    onKeyPress={(e) => e.key === 'Enter' && onClick()}
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
  const isLoggedIn = isAuthenticated();
  const [isListening, setIsListening] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const dashboardItems = [
    {
      icon: SearchIcon,
      title: 'Search Products',
      description: 'Find and verify products using blockchain',
      path: '/search-products',
      requiresAuth: false
    },
    {
      icon: TruckIcon,
      title: 'Product Tracking',
      description: 'Track products and verify authenticity',
      path: '/product-tracking',
      requiresAuth: true
    },
    {
      icon: HistoryIcon,
      title: 'Order History',
      description: 'View your past purchases and their impact',
      path: '/order-history',
      requiresAuth: true
    },
    {
      icon: ChartBarIcon,
      title: 'Leaderboard',
      description: 'See how you rank in sustainable shopping',
      path: '/leaderboard',
      requiresAuth: true
    },
    {
      icon: BellIcon,
      title: 'Notices',
      description: 'Important updates and announcements',
      path: '/notices',
      requiresAuth: true
    },
    {
      icon: LeafIcon,
      title: 'Environmental Impact',
      description: 'Track your carbon footprint and green score',
      path: '/environmental-impact',
      requiresAuth: true
    },
  ];

  const handleNavigation = (path, requiresAuth) => {
    if (requiresAuth && !isAuthenticated()) {
      localStorage.setItem('redirectAfterLogin', path);
      navigate('/login');
      return;
    }
    navigate(path);
  };

  // Announce available options using screen reader
  const announceOptions = () => {
    const options = dashboardItems.map(item => item.title).join(', ');
    const announcement = `Available options are: ${options}. Please say the option you'd like to select.`;
    setAnnouncement(announcement);
    const utterance = new SpeechSynthesisUtterance(announcement);
    window.speechSynthesis.speak(utterance);
  };

  // Handle voice commands
  const handleVoiceCommand = (command) => {
    const item = dashboardItems.find(item => 
      item.title.toLowerCase() === command.toLowerCase()
    );
    if (item) {
      handleNavigation(item.path, item.requiresAuth);
      setAnnouncement(`Navigating to ${item.title}`);
    }
  };

  // Set up voice recognition
  useEffect(() => {
    recognition.onresult = (event) => {
      const command = event.results[event.results.length - 1][0].transcript.trim();
      handleVoiceCommand(command);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setAnnouncement('Voice recognition error. Please try again.');
    };

    return () => {
      recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  // Toggle voice recognition
  const toggleListening = () => {
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      setAnnouncement('Voice recognition stopped');
    } else {
      recognition.start();
      setIsListening(true);
      announceOptions();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500/10 to-blue-500/50 pt-2 pb-6 flex flex-col gap-7">
      <Header />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto px-4"
      >
        {/* Voice Recognition Controls */}
        <div className="mb-6">
          <button
            onClick={toggleListening}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            aria-label={isListening ? 'Stop voice recognition' : 'Start voice recognition'}
          >
            {isListening ? 'Stop Listening' : 'Start Voice Recognition'}
          </button>
          {/* Hidden announcement for screen readers */}
          <div className="sr-only" role="status" aria-live="polite">
            {announcement}
          </div>
        </div>

        {!isLoggedIn && (
          <div className="mb-12 flex items-center justify-between">
            <div className="max-w-xl">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">
                Track Your Sustainable Journey
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Join our community of conscious consumers making a difference. 
                Verify product authenticity, track your environmental impact, 
                and be part of the sustainable revolution.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
                onClick={() => navigate('/login')}
              >
                Get Started
              </motion.button>
            </div>
            <img 
              src={DashImg} 
              alt="Sustainable Shopping" 
            />
          </div>
        )}

        <div className="SECTION flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {isLoggedIn ? 'Welcome Back!' : 'Explore Sustainable Products'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoggedIn 
                ? 'Track and verify your sustainable purchases'
                : 'Discover and verify eco-friendly products with blockchain technology'}
            </p>
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
                onClick={() => handleNavigation(item.path, item.requiresAuth)}
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