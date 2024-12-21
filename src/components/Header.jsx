import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Profile from '../assets/profile.png';
const isAuthenticated = () => {
  // Replace this with your actual authentication check
  return localStorage.getItem('token') !== null;
};

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = isAuthenticated();

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
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 shadow-md sticky top-0 z-50 max-width-screen"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Website Name */}
        <motion.h1
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-bold text-blue-600 cursor-pointer"
          onClick={() => navigate('/')}
        >
          TrackBack
        </motion.h1>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          {/* Notification Bell */}
          <div className="relative">
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
                      <li
                        key={notice.id}
                        className="p-4 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-700">{notice.title}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(notice.date).toLocaleDateString()}
                          </p>
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

          {/* Profile or Login Button */}
          {isLoggedIn ? (
            <div className="relative">
              <button
                className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-gray-300 transition"
                onClick={toggleProfileMenu}
              >
                <img
                  src={Profile}
                  alt="Profile"
                  className="w-12 h-12 rounded-full"
                />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg z-50">
                  <ul className="divide-y divide-gray-200">
                    <li
                      className="p-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate('/profile')}
                    >
                      My Profile
                    </li>
                    <li
                      className="p-4 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                      onClick={() => {
                        localStorage.removeItem('token');
                        navigate('/login');
                      }}
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Header;


// import React, { useState } from 'react';
// import { Bell, AlertCircle, Info } from 'lucide-react';

// const Header = () => {
//   const [notices] = useState([
//     {
//       id: 1,
//       type: 'update',
//       title: 'New Feature: Enhanced Product Tracking',
//       date: '2024-03-20',
//     },
//     {
//       id: 2,
//       type: 'alert',
//       title: 'System Maintenance Notice',
//       date: '2024-03-18',
//     },
//     {
//       id: 3,
//       type: 'info',
//       title: 'Updated Certification Requirements',
//       date: '2024-03-15',
//     },
//   ]);

//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const getIcon = (type) => {
//     switch (type) {
//       case 'alert':
//         return <AlertCircle className="w-4 h-4 text-red-500" />;
//       case 'update':
//         return <Bell className="w-4 h-4 text-blue-500" />;
//       case 'info':
//         return <Info className="w-4 h-4 text-gray-500" />;
//       default:
//         return null;
//     }
//   };

//   return (
//     <header className="bg-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center py-4">
//           {/* Logo/Title */}
//           <div className="text-xl font-bold text-gray-800">My Platform</div>

//           {/* Navigation Links */}
//           <nav className="hidden md:flex space-x-6">
//             <a href="#" className="text-gray-600 hover:text-gray-800">
//               Home
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-800">
//               Features
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-800">
//               Pricing
//             </a>
//             <a href="#" className="text-gray-600 hover:text-gray-800">
//               About
//             </a>
//           </nav>

        //   {/* Notification Bell */}
        //   <div className="relative">
        //     <button
        //       className="relative p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
        //       onClick={toggleDropdown}
        //     >
        //       <Bell className="w-6 h-6 text-gray-600" />
        //       <span className="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
        //         {notices.length}
        //       </span>
        //     </button>

        //     {/* Dropdown */}
        //     {isDropdownOpen && (
        //       <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50">
        //         <div className="p-4 border-b border-gray-200">
        //           <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
        //         </div>
        //         <ul className="divide-y divide-gray-200">
        //           {notices.length > 0 ? (
        //             notices.map((notice) => (
        //               <li
        //                 key={notice.id}
        //                 className="p-4 flex items-start space-x-3 hover:bg-gray-50 cursor-pointer"
        //               >
        //                 {getIcon(notice.type)}
        //                 <div>
        //                   <p className="text-sm font-medium text-gray-700">{notice.title}</p>
        //                   <p className="text-xs text-gray-500">
        //                     {new Date(notice.date).toLocaleDateString()}
        //                   </p>
        //                 </div>
        //               </li>
        //             ))
        //           ) : (
        //             <li className="p-4 text-sm text-gray-500 text-center">No notifications</li>
        //           )}
        //         </ul>
        //       </div>
        //     )}
        //   </div>
        // </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
