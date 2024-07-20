import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

function Layout() {
  const { isLoggedIn, checkAuthStatus } = useAuth();

  useEffect(() => {
    // Check authentication status when the component mounts
    checkAuthStatus();
  }, [checkAuthStatus]);

  return (
    <>
      <Navbar isLoggedIn={isLoggedIn} />
      <Outlet />
    </>
  );
}

export default Layout;
