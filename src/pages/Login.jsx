import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EyeIcon, EyeOffIcon, AlertCircle } from 'lucide-react';

export const Login = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('consumer');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [touched, setTouched] = useState({
    email: false,
    password: false
  });

  // Validation
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const getValidationErrors = () => {
    const errors = [];
    if (touched.email && !validateEmail(formData.email)) {
      errors.push('Please enter a valid email address');
    }
    if (touched.password && !validatePassword(formData.password)) {
      errors.push('Password must be at least 6 characters long');
    }
    return errors;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate all fields before submission
    setTouched({ email: true, password: true });
    const errors = getValidationErrors();
    if (errors.length > 0) {
      setError(errors[0]);
      return;
    }

    setLoading(true);
    try {
      // Simulate API call - replace with your actual login logic
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store authentication token
      localStorage.setItem('token', 'your-auth-token');
      localStorage.setItem('userType', userType);
      
      // Navigate to dashboard
      //navigate('/'); // This will take user to the main dashboard page
      if (userType === 'consumer') {
        navigate('/consumer/dashboard');
      } else {
        navigate('/vendor/dashboard');
      }
    } catch (error) {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Rest of the component remains the same...
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {/* User Type Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                userType === 'consumer'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setUserType('consumer')}
            >
              Consumer
            </button>
            <button
              className={`px-6 py-2 rounded-md transition-all duration-200 ${
                userType === 'vendor'
                  ? 'bg-white shadow-md text-blue-600'
                  : 'text-gray-600 hover:bg-gray-200'
              }`}
              onClick={() => setUserType('vendor')}
            >
              Vendor
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 flex items-center gap-2"
          >
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              className={`block w-full px-3 py-2 border ${
                touched.email && !validateEmail(formData.email)
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
              } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              onBlur={() => handleBlur('email')}
              placeholder="Enter your email"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                className={`block w-full px-3 py-2 border ${
                  touched.password && !validatePassword(formData.password)
                    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                    : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                } rounded-lg shadow-sm focus:outline-none focus:ring-2`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                onBlur={() => handleBlur('password')}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Forgot your password?
            </motion.a>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 px-4 border border-transparent rounded-lg shadow-md text-white 
              ${loading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 
              transition-colors duration-200`}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </motion.button>
        </form>

        {/* Register Link */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/register"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Register here
            </motion.a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};