import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';


import { useAuth } from './context/AuthContext';

import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AllRestaurants from './pages/AllRestaurants';
import RestaurantMenu from './pages/RestaurantMenu';
import Profile from './pages/Profile';
import Orders from './pages/Orders';
import Settings from './pages/Settings';
import Cart from './pages/Cart';
import SplashScreen from './pages/SplashScreen'; 

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPanel from './pages/admin/AdminPanel';
import AdminManageRestaurant from './pages/admin/AdminManageRestaurant';
import AdminLogin from './pages/admin/AdminLogin';
import AdminAllOrders from './pages/admin/AdminAllOrders';
import AdminOrders from './pages/admin/AdminOrders';

import Layout from './pages/Layout';

import { Toaster } from 'react-hot-toast';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Router>
        {showSplash ? <SplashScreen /> : <AppRoutes />}
      </Router>
      <Toaster position="bottom-right" reverseOrder={false} />
    </>
  );
}

const AppRoutes = () => {
  const { isAdmin } = useAuth();

  return (
    <Routes>
      {/* 🌐 Public Pages */}
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restaurants" element={<AllRestaurants />} />
        <Route path="/restaurant/:id" element={<RestaurantMenu />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
      </Route>

      {/* 🔐 Admin Public */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* 🔐 Admin Protected */}
      <Route
        path="/admin"
        element={isAdmin ? <AdminDashboard /> : <Navigate to="/admin/login" />}
      >
        <Route index element={<AdminPanel />} />
        <Route path="manage/:id" element={<AdminManageRestaurant />} />
        <Route path="all-orders" element={<AdminAllOrders />} />
        <Route path="orders" element={<AdminOrders />} />
      </Route>

      {/* 🧭 Redirect Old Admin Dashboard */}
      <Route path="/admin/dashboard" element={<Navigate to="/admin" />} />
    </Routes>
  );
};

export default App;
