// File: src/pages/common/EnvironmentalImpact.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Leaf, Award, TrendingUp } from 'lucide-react';

const mockData = {
  monthlyScores: [
    { month: 'Jan', score: 75 },
    { month: 'Feb', score: 78 },
    { month: 'Mar', score: 82 },
    { month: 'Apr', score: 85 },
    { month: 'May', score: 83 },
    { month: 'Jun', score: 88 },
  ],
  stats: {
    totalEmissions: 142,
    ranking: 156,
    totalParticipants: 1000,
    greenScore: 88,
  }
};

export const EnvironmentalImpact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Environmental Impact</h1>
          <p className="text-gray-600 mt-1">Track your sustainability metrics and environmental contributions</p>
        </div>

        {/* Score Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Leaf className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Green Score</h3>
                <p className="text-3xl font-bold text-green-600">{mockData.stats.greenScore}/100</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Network Ranking</h3>
                <p className="text-3xl font-bold text-blue-600">
                  #{mockData.stats.ranking}/{mockData.stats.totalParticipants}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="bg-white p-6 rounded-xl shadow-md"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">Carbon Saved</h3>
                <p className="text-3xl font-bold text-purple-600">{mockData.stats.totalEmissions}kg</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Score Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-xl shadow-md mb-8"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Score Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockData.monthlyScores}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Improvement Suggestions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-xl shadow-md"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Improvement Suggestions</h2>
          <div className="space-y-4">
            {[
              {
                title: 'Optimize Transportation',
                description: 'Consider using electric vehicles or optimizing delivery routes to reduce emissions.',
                impact: 'High'
              },
              {
                title: 'Sustainable Packaging',
                description: 'Switch to eco-friendly packaging materials to reduce environmental impact.',
                impact: 'Medium'
              },
              {
                title: 'Energy Efficiency',
                description: 'Implement energy-saving measures in your operations.',
                impact: 'High'
              }
            ].map((suggestion, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className={`w-2 h-2 mt-2 rounded-full ${
                  suggestion.impact === 'High' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div>
                  <h3 className="font-medium text-gray-800">{suggestion.title}</h3>
                  <p className="text-sm text-gray-600">{suggestion.description}</p>
                  <span className={`text-xs font-medium ${
                    suggestion.impact === 'High' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {suggestion.impact} Impact
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};