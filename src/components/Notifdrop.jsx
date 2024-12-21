import React, { useState } from 'react';
import { Bell, AlertCircle, Info } from 'lucide-react';

const NotificationDropdown = () => {
  const [notices] = useState([
    {
      id: 1,
      type: 'update',
      title: 'New Feature: Enhanced Product Tracking',
      date: '2024-03-20',
    },
    {
      id: 2,
      type: 'alert',
      title: 'System Maintenance Notice',
      date: '2024-03-18',
    },
    {
      id: 3,
      type: 'info',
      title: 'Updated Certification Requirements',
      date: '2024-03-15',
    },
  ]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const getIcon = (type) => {
    switch (type) {
      case 'alert':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'update':
        return <Bell className="w-4 h-4 text-blue-500" />;
      case 'info':
        return <Info className="w-4 h-4 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        onClick={toggleDropdown}
      >
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
          {notices.length}
        </span>
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
          </div>
          <ul className="divide-y divide-gray-200">
            {notices.length > 0 ? (
              notices.map((notice) => (
                <li key={notice.id} className="p-4 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer">
                  {getIcon(notice.type)}
                  <div>
                    <p className="text-sm font-medium text-gray-700">{notice.title}</p>
                    <p className="text-xs text-gray-500">{new Date(notice.date).toLocaleDateString()}</p>
                  </div>
                </li>
              ))
            ) : (
              <li className="p-4 text-sm text-gray-500 text-center">No notifications</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
