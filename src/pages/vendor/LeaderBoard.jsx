import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

export const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: "EcoVendors Ltd", score: 95, change: "up", type: "Vendor" },
    { rank: 2, name: "Green Co", score: 92, change: "down", type: "Consumer" },
    { rank: 3, name: "Sustainable Solutions", score: 88, change: "up", type: "Vendor" },
    { rank: 4, name: "EarthFirst Trading", score: 85, change: "up", type: "Vendor" },
    { rank: 5, name: "Sustain Growth Ltd", score: 82, change: "down", type: "Consumer" }
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Impact Leaderboard</h1>
        <p className="text-gray-600">Top performers in sustainable practices and eco-friendly transactions</p>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-4 bg-green-50 p-4 font-semibold text-gray-700 ">
          <div>Rank</div>
          <div className="col-span-2">Name</div>
          <div>Green Score</div>
          
        </div>

        {leaderboardData.map((item) => (
          <div 
            key={item.rank}
            className="grid grid-cols-4 p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors "
          >
            <div className="flex items-center">
              <span className={`
                ${item.rank <= 3 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                rounded-full w-8 h-8 flex items-center justify-center font-bold
              `}>
                {item.rank}
              </span>
            </div>
            <div className="col-span-2 flex items-center">
              {item.name}
              {item.change === 'up' ? (
                <ArrowUp className="ml-2 w-4 h-4 text-green-500" />
              ) : (
                <ArrowDown className="ml-2 w-4 h-4 text-red-500" />
              )}
            </div>
            <div className="flex items-center">
              <div className="w-full bg-gray-200 rounded-full h-2.5 mr-2">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${item.score}%` }}
                ></div>
              </div>
              <span>{item.score}</span>
            </div>
            {/* <div className="flex items-center">
              {/* <span className={`
                px-3 py-1 rounded-full text-sm
                ${item.type === 'Vendor' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'}
              `}>
                {item.type}
              </span> 
            </div> */}
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Your Performance</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Current Rank</span>
                <span className="font-semibold">#12</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-600">Green Score</span>
                <span className="font-semibold">78/100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly Change</span>
                <span className="text-green-600 font-semibold">+5 positions</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Tips to Improve</h2>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Optimize transportation routes to reduce emissions
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Choose eco-friendly packaging materials
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Partner with sustainable suppliers
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};