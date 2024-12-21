// File: src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';

export const Register = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('consumer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    confirmPassword: '',
    gst: '',
    businessType: '',
    headOfficeLocation: '',
    companyName: '',
    website: '',
    documents: null
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.contact.trim()) newErrors.contact = 'Contact is required';
    if (!/^\d{10}$/.test(formData.contact)) newErrors.contact = 'Invalid contact number';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';

    if (userType === 'vendor') {
      if (!formData.gst.trim()) newErrors.gst = 'GST number is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.headOfficeLocation.trim()) newErrors.headOfficeLocation = 'Head office location is required';
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = {
          ...formData,
          userType,
          timestamp: new Date().toISOString()
        };

        const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (existingUsers.some(user => user.email === formData.email)) {
          setErrors({ email: 'Email already registered' });
          return;
        }

        existingUsers.push(userData);
        localStorage.setItem('users', JSON.stringify(existingUsers));

        navigate('/login');
      } catch (error) {
        console.error('Registration failed:', error);
        setErrors({ submit: 'Registration failed. Please try again.' });
      }
    }
  };

  const renderField = (name, label, type = 'text', required = true) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <input
          type={type === 'password' ? (name === 'password' ? (showPassword ? 'text' : 'password') : (showConfirmPassword ? 'text' : 'password')) : type}
          required={required}
          className={`block w-full px-3 py-2 border ${
            errors[name] ? 'border-red-500' : 'border-gray-300'
          } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
          value={formData[name]}
          onChange={(e) => {
            setFormData({ ...formData, [name]: e.target.value });
            if (errors[name]) {
              setErrors({ ...errors, [name]: null });
            }
          }}
        />
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => {
              if (name === 'password') {
                setShowPassword(!showPassword);
              } else {
                setShowConfirmPassword(!showConfirmPassword);
              }
            }}
          >
            {(name === 'password' ? showPassword : showConfirmPassword) ? (
              <EyeOff className="h-5 w-5 text-gray-400" />
            ) : (
              <Eye className="h-5 w-5 text-gray-400" />
            )}
          </button>
        )}
      </div>
      {errors[name] && (
        <p className="mt-1 text-sm text-red-600 flex items-center">
          <AlertCircle className="h-4 w-4 mr-1" />
          {errors[name]}
        </p>
      )}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
          <p className="text-gray-600 mt-2">Join our sustainable supply chain network</p>
        </div>

        <div className="flex justify-center mb-6">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                userType === 'consumer'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setUserType('consumer')}
            >
              Consumer
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md transition-all duration-200 ${
                userType === 'vendor'
                  ? 'bg-white shadow text-blue-600'
                  : 'text-gray-600'
              }`}
              onClick={() => setUserType('vendor')}
            >
              Vendor
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField('name', 'Full Name')}
            {renderField('email', 'Email', 'email')}
            {renderField('contact', 'Contact Number', 'tel')}
            
            {userType === 'vendor' && (
              <>
                {renderField('companyName', 'Company Name')}
                {renderField('gst', 'GST Number')}
                {renderField('website', 'Company Website', 'url', false)}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Business Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    className={`mt-1 block w-full px-3 py-2 border ${
                      errors.businessType ? 'border-red-500' : 'border-gray-300'
                    } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  >
                    <option value="">Select Business Type</option>
                    <option value="manufacturer">Manufacturer</option>
                    <option value="distributor">Distributor</option>
                    <option value="retailer">Retailer</option>
                    <option value="supplier">Supplier</option>
                  </select>
                  {errors.businessType && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.businessType}
                    </p>
                  )}
                </div>

                {renderField('headOfficeLocation', 'Head Office Location')}
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Business Documents
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        >
                          <span>Upload files</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={(e) => setFormData({ ...formData, documents: e.target.files[0] })}
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            {renderField('password', 'Password', 'password')}
            {renderField('confirmPassword', 'Confirm Password', 'password')}
          </div>

          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I agree to the{' '}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            type="submit"
          >
            Create Account
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Sign in
            </motion.a>
          </p>
        </div>
      </motion.div>
    </div>
  );
};