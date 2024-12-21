import React, { useState } from 'react';
import { Bell, AlertCircle, Info, Filter } from 'lucide-react';

const Notices = () => {
  const [notices] = useState([
    {
      id: 1,
      type: 'update',
      title: 'New Feature: Enhanced Product Tracking',
      message: 'We have added real-time tracking capabilities for all products in transit. You can now see exact locations and estimated delivery times.',
      date: '2024-03-20',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'alert',
      title: 'System Maintenance Notice',
      message: 'Scheduled maintenance will occur on March 25th from 2 AM to 4 AM UTC. Some features may be temporarily unavailable.',
      date: '2024-03-18',
      priority: 'high'
    },
    {
      id: 3,
      type: 'info',
      title: 'Updated Certification Requirements',
      message: 'New sustainability certification requirements will be effective from April 1st. Please review the updated guidelines in your dashboard.',
      date: '2024-03-15',
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const getNoticeStyle = (type, priority) => {
    const baseStyle = "rounded-lg p-6 mb-4 transition-all hover:shadow-md";
    switch (type) {
      case 'alert':
        return `${baseStyle} bg-red-50 border-l-4 border-red-500`;
      case 'update':
        return `${baseStyle} bg-blue-50 border-l-4 border-blue-500`;
      case 'info':
        return `${baseStyle} bg-gray-50 border-l-4 border-gray-500`;
      default:
        return baseStyle;
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-6 h-6 text-red-500" />;
      case 'update':
        return <Bell className="w-6 h-6 text-blue-500" />;
      case 'info':
        return <Info className="w-6 h-6 text-gray-500" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    const baseStyle = "text-xs font-medium px-2.5 py-0.5 rounded-full";
    switch (priority) {
      case 'high':
        return `${baseStyle} bg-red-100 text-red-800`;
      case 'medium':
        return `${baseStyle} bg-yellow-100 text-yellow-800`;
      case 'low':
        return `${baseStyle} bg-green-100 text-green-800`;
      default:
        return baseStyle;
    }
  };

  const filteredNotices = notices.filter(notice => {
    if (filter === 'all') return true;
    return notice.type === filter;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Notices & Updates</h1>
        <p className="text-gray-600">Stay informed about platform changes and important announcements</p>
      </div>

      <div className="mb-6 flex flex-wrap items-center gap-4">
        <div className="flex items-center">
          <Filter className="w-5 h-5 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600">Filter by:</span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'all' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('alert')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'alert' 
                ? 'bg-red-100 text-red-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Alerts
          </button>
          <button
            onClick={() => setFilter('update')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'update' 
                ? 'bg-blue-100 text-blue-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Updates
          </button>
          <button
            onClick={() => setFilter('info')}
            className={`px-3 py-1 rounded-full text-sm ${
              filter === 'info' 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Information
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotices.map((notice) => (
          <div
            key={notice.id}
            className={getNoticeStyle(notice.type, notice.priority)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getIcon(notice.type)}
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-medium text-gray-900">
                    {notice.title}
                  </h3>
                  <span className={getPriorityBadge(notice.priority)}>
                    {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                  </span>
                </div>
                <p className="mt-1 text-gray-600">{notice.message}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Posted on {new Date(notice.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
        {filteredNotices.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No notices found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notices;