import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { VendorDashboard } from './pages/vendor/Dashboard';
import { ConsumerDashboard } from './pages/consumer/Dashboard';
import { Register } from './pages/Register';
import OrderHistory from './pages/common/OrderHistory';
import AddProduct from './pages/vendor/AddProduct';
import Notices from './pages/common/Notices';
import { ProductTracking } from './pages/common/ProductTracking';
import { Leaderboard } from './pages/consumer/Leaderboard';
import { EnvironmentalImpact } from './pages/common/EnvironmentalImpact';
import { SearchProducts } from './pages/common/SearchProducts';
import FloatingChatButton from './pages/common/FloatingChatButton';
import { Web3Provider } from './Web3Context';
import ProfileDashboard from './pages/common/Page/ProfilePage';
import Labor from './pages/vendor/Labor';
const App = () => {
  return (
    <Web3Provider>
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
        <Routes>
          {/* Auth Routes */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/" element={<ConsumerDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product-tracking/:productId" element={<ProductTracking />} />
          <Route path="/order-history" element={<OrderHistory />} />
          
          <Route path="/environmental-impact" element={<EnvironmentalImpact />} />
          <Route path="/notices" element={<Notices />} />
          <Route path="/profile" element={<ProfileDashboard />} />
          


          {/* Vendor Routes */}
        
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/add-product" element={<AddProduct />} />
            <Route path="/vendor/leaderboard" element={<Leaderboard />} />
            <Route path="/vendor/orders" element={<OrderHistory />} />
            <Route path="/vendor/notices" element={<Notices />} />
            <Route path='/search-products' element={<SearchProducts/>}/>
            <Route path='/labor' element={<Labor/>}/>

          {/* Consumer Routes */}
    
            <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
            <Route path="/consumer/leaderboard" element={<Leaderboard />} />
            <Route path="/consumer/orders" element={<OrderHistory />} />
            <Route path="/consumer/notices" element={<Notices />} />
          

          {/* Default Route */}
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        </Routes>
        <FloatingChatButton/>
      </div>
    </BrowserRouter>
    </Web3Provider>
  );
};

export default App;