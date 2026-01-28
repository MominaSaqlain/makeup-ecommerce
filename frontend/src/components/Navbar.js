// src/components/Navbar.js - SIMPLE WORKING VERSION
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const { cartItems = [] } = useCart();
  const navigate = useNavigate();
  
  // Local state to track auth
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    userData: null
  });

  // Update auth state based on localStorage (more reliable)
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          setAuthState({
            isLoggedIn: true,
            userData: JSON.parse(userData)
          });
        } catch (error) {
          setAuthState({ isLoggedIn: false, userData: null });
        }
      } else {
        setAuthState({ isLoggedIn: false, userData: null });
      }
    };
    
    checkAuth();
    
    // Listen for storage changes (when login/logout happens in other tabs)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Also update when context changes
  useEffect(() => {
    console.log('Auth Context Changed:', { isAuthenticated, user, loading });
  }, [isAuthenticated, user, loading]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Calculate cart items
  const cartItemCount = Array.isArray(cartItems) 
    ? cartItems.reduce((total, item) => total + (item.quantity || 0), 0)
    : 0;

  // Decide what to show based on BOTH context and localStorage
  const isUserLoggedIn = authState.isLoggedIn || isAuthenticated;
  const currentUser = user || authState.userData;

  console.log('Navbar Rendering:', { 
    isAuthenticated, 
    authState,
    isUserLoggedIn,
    currentUser 
  });

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          💄 Makeup Store
        </Link>

        {/* Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Content */}
        <div className="collapse navbar-collapse" id="navbarContent">
          {/* Left Side - Navigation Links */}
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Products</Link>
            </li>
            {isUserLoggedIn && (
              <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
              </li>
            )}
          </ul>

          {/* Right Side - Auth & Cart */}
          <div className="d-flex align-items-center gap-3">
            {/* Cart */}
            <Link className="nav-link position-relative" to="/cart">
              <span className="fs-5">🛒</span>
              {cartItemCount > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {cartItemCount}
                </span>
              )}
            </Link>

            {/* Auth Section - SIMPLE LOGIC */}
            {isUserLoggedIn ? (
              // ✅ LOGGED IN - Show User Menu
              <div className="dropdown">
                <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                  👤 {currentUser?.name || currentUser?.email || 'User'}
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/cart">
                      Cart ({cartItemCount})
                    </Link>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              // ✅ NOT LOGGED IN - Show Login/Signup
              <div className="d-flex gap-2">
                <Link className="btn btn-outline-primary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/register">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;