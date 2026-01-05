import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home/Home';
import Lessons from '../pages/Lessons/Lessons';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import NotFound from '../pages/NotFound';
import Services from '../pages/Servicespage/Services';
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import Dashboard from '../pages/Dashboard';
import UserDashboard from '../pages/Dashboard/UserDashboard';
import MyServices from '../pages/Dashboard/MyServices';
import Tradelines from '../pages/Dashboard/Tradelines';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import AdminUsers from '../pages/Admin/AdminUsers';
import PrivacyPolicy from '../pages/PrivacyPolicy/PrivacyPolicy';
import TermsOfService from '../pages/TermsOfService/TermsOfService';

// A component to protect routes that require authentication
function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return <Outlet />;
}

// A component for admin-only routes
function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  if (user.role !== 'admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

// A component for user-only routes (non-admin)
function UserRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  if (user.role === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}

// A component for public-only routes (like login, signup)
function PublicRoute() {
  const { user } = useAuth();
  
  if (user) {
    const redirectUrl = user.role === 'admin' ? '/admin/dashboard' : '/dashboard';
    return <Navigate to={redirectUrl} replace />;
  }
  
  return <Outlet />;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      
      {/* Main layout routes (with header and footer) */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      
      {/* Dashboard routes (without header and footer) */}
      <Route element={<ProtectedRoute />}>
        {/* Admin routes */}
        <Route element={<AdminRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>
        
        {/* User routes */}
        <Route element={<UserRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/dashboard/services" element={<MyServices />} />
            <Route path="/dashboard/tradelines" element={<Tradelines />} />
            <Route path="/lessons" element={<Lessons />} />
            {/* Add more dashboard routes here */}
          </Route>
        </Route>
      </Route>

    </Routes>
  );
}
