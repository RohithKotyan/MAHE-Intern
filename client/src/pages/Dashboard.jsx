import React from 'react';
import DashboardDesktop from '../components/dashboard/DashboardDesktop';
import DashboardMobile from '../components/dashboard/DashboardMobile';

export default function Dashboard() {
  return (
    <>
      {/* Desktop Layout - visible only on md screens and up */}
      <div className="hidden md:block h-full">
        <DashboardDesktop />
      </div>

      {/* Mobile Layout - visible only on screens smaller than md */}
      <div className="block md:hidden h-full">
        <DashboardMobile />
      </div>
    </>
  );
}

