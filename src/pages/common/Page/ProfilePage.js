import React from 'react';
import { Trophy, Medal, Target, User, Mail, Calendar, Award } from 'lucide-react';

const ProfileDashboard = () => {
  // Sample data
  const achievements = [
    { title: 'Carbon Warrior', description: 'Reduced carbon footprint by 50%', icon: <Trophy className="w-5 h-5" /> },
    { title: 'Eco Champion', description: 'Completed 10 eco-challenges', icon: <Medal className="w-5 h-5" /> },
    { title: 'Green Influencer', description: 'Inspired 5 friends to join', icon: <Target className="w-5 h-5" /> }
  ];

  const carbonData = [
    { month: 'Jan', footprint: 120 },
    { month: 'Feb', footprint: 100 },
    { month: 'Mar', footprint: 90 },
    { month: 'Apr', footprint: 85 },
    { month: 'May', footprint: 75 }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
          Edit Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {['Average Monthly Footprint', 'Monthly Reduction', 'Total Emissions'].map((title, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
            <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
            <div className="text-3xl font-bold text-green-600">
              {index === 0 ? '85.5 kg' : index === 1 ? '12.5%' : '1,240 kg'}
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full mt-2">
              <div 
                className="h-2 bg-green-500 rounded-full"
                style={{ width: `${index === 0 ? 85 : index === 1 ? 12 : 75}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Graph Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Carbon Footprint Trend</h2>
          <div className="h-64 w-full flex items-end justify-between gap-2">
            {carbonData.map((data, index) => (
              <div key={index} className="flex flex-col items-center w-full">
                <div 
                  className="w-full bg-green-500 rounded-t"
                  style={{ height: `${(data.footprint / 120) * 200}px` }}
                />
                <span className="text-sm text-gray-600 mt-2">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Personal Details Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <User className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Full Name</div>
                <div className="font-medium">John Doe</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Mail className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div className="font-medium">john@example.com</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Award className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Eco Score</div>
                <div className="font-medium">85</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Calendar className="w-4 h-4 text-gray-500" />
              <div>
                <div className="text-sm text-gray-500">Member Since</div>
                <div className="font-medium">10-11-24</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Card */}
        <div className="bg-white p-6 rounded-xl shadow-sm md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="p-2 bg-blue-50 rounded-full">
                  {achievement.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                  <p className="text-sm text-gray-500">
                    {achievement.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;