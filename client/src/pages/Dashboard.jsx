import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import DashboardDesktop from '../components/dashboard/DashboardDesktop';
import DashboardMobile from '../components/dashboard/DashboardMobile';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // TODO: Pass handleLogout and user down to DashboardDesktop/DashboardMobile when wiring up functionality

  return (
    <div className="h-screen w-full bg-background overflow-hidden selection:bg-primary-container selection:text-white">
      {/* Desktop Layout - visible only on md screens and up */}
      <div className="hidden md:block h-full">
        <DashboardDesktop />
      </div>

      {/* Mobile Layout - visible only on screens smaller than md */}
      <div className="block md:hidden h-full">
        <DashboardMobile />
      </div>
    </div>
  );
}
