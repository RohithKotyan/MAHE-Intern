import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function DashboardShell({ children, activeRoute = 'dashboard' }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="h-screen w-full bg-background overflow-hidden selection:bg-primary-container selection:text-white">
      {/* Desktop Layout - visible only on md screens and up */}
      <div className="hidden md:flex h-full w-full">
        {/* SideNavBar */}
        <nav className="fixed left-0 top-0 h-full w-[280px] bg-surface-container-low dark:bg-surface-container-low/90 backdrop-blur-lg border-r border-outline-variant/20 shadow-2xl flex flex-col py-base z-40">
          <div className="px-container-margin py-6 border-b border-outline-variant/10 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary-container" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div>
                <h1 className="font-headline-lg text-[20px] font-bold text-primary">AgroCare AI</h1>
                <p className="font-label-sm text-label-sm text-on-surface-variant">Precision Agriculture</p>
              </div>
            </div>
            <button className="mt-6 w-full py-3 rounded-full bg-gradient-to-r from-primary-container to-secondary-container text-white font-label-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all relative overflow-hidden group">
              <span className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              New Scan
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-4 space-y-2">
            <Link to="/dashboard" className={`${activeRoute === 'dashboard' ? 'bg-secondary-container/20 text-secondary border-r-4 border-secondary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'} px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-300 ease-in-out`}>
              <span className="material-symbols-outlined">dashboard</span>
              Dashboard
            </Link>
            <Link to="/dashboard/crops" className={`${activeRoute === 'crops' ? 'bg-secondary-container/20 text-secondary border-r-4 border-secondary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'} px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-300 ease-in-out`}>
              <span className="material-symbols-outlined">potted_plant</span>
              Crop Tracking
            </Link>
            <Link to="#" className="text-on-surface-variant px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-surface-variant/50 hover:text-on-surface transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined">groups</span>
              Community
            </Link>
            <Link to="#" className="text-on-surface-variant px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-surface-variant/50 hover:text-on-surface transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined">forum</span>
              Expert Chat
            </Link>
            <Link to="#" className="text-on-surface-variant px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-surface-variant/50 hover:text-on-surface transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined">analytics</span>
              Reports
            </Link>
          </div>
          <div className="mt-auto px-4 pt-4 border-t border-outline-variant/10 space-y-2">
            <button onClick={handleLogout} className="w-full text-on-surface-variant px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-surface-variant/50 hover:text-error transition-all duration-300 ease-in-out text-left">
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
            <Link to="#" className="text-on-surface-variant px-4 py-3 flex items-center gap-3 rounded-lg hover:bg-surface-variant/50 hover:text-on-surface transition-all duration-300 ease-in-out">
              <span className="material-symbols-outlined">settings</span>
              Settings
            </Link>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 ml-[280px] h-full overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative bg-surface">
          {/* TopAppBar (Web) */}
          <header className="fixed top-0 right-0 w-[calc(100%-280px)] z-50 flex justify-between items-center px-container-margin h-16 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-md">
            <div className="flex items-center gap-4">
              <div className="relative group hidden md:block">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 group-focus-within:text-primary transition-colors">search</span>
                <input className="bg-[#05070a] border border-outline-variant/30 rounded-full py-2 pl-10 pr-4 w-64 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 text-sm text-on-surface transition-all" placeholder="Search crops, protocols..." type="text" />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container-high/50 hover:bg-surface-container-high relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error animate-pulse"></span>
              </button>
              <div className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden bg-surface-container-high flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
                <img alt="User profile photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ" />
              </div>
            </div>
          </header>

          {children}

        </main>
      </div>

      {/* Mobile Layout - visible only on screens smaller than md */}
      <div className="flex md:hidden flex-col h-full w-full">
        {/* TopAppBar (Mobile) */}
        <header className="fixed top-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/30 shadow-md">
          <div className="flex items-center gap-2 py-2">
            <img alt="AgroCare AI Logo" className="h-14 w-auto object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuClnDcMcUuNAkANX6gg8CUBE9SwrpKT8SkzlhFOrnZzCaNRPnGthoITR7QKASN2nOlHjxspbAJ3HUqkDJeUKInuxFb8b6U14rt84XYTgwoNB9D7lJWxR2a2p_7TLCE1KkR7KbiiTM9kp2LpWhHdKKa7g_JKM382YEQyuATrcGasTsa-TXW3NkaCJGtHDFmFn6ui9BR-dwjdEe4SFlKmk-Klfg909U1Cb86YNpAYUKPmpqWHS8cXffejOik30HCm3fAubdKbrJ6-uw" />
          </div>
          <div className="flex items-center gap-3">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container-high/50 hover:bg-surface-container-high">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors bg-surface-container-high/50 hover:bg-surface-container-high relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-error animate-pulse"></span>
            </button>
            <div onClick={handleLogout} className="w-8 h-8 rounded-full border border-primary/30 overflow-hidden bg-surface-container-high flex items-center justify-center cursor-pointer hover:border-primary transition-colors">
              <img alt="User profile photo" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ" />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 w-full h-full overflow-y-auto bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative pt-16 pb-24 bg-surface">
          {children}
        </main>

        {/* Bottom Navigation Bar (Mobile) */}
        <nav className="fixed bottom-0 left-0 w-full z-50 px-4 pb-4 pointer-events-none">
          <div className="bg-surface-container-low/95 backdrop-blur-xl border border-outline-variant/30 rounded-[2rem] px-6 h-[72px] flex justify-between items-center shadow-lg relative pointer-events-auto">
            
            <Link to="/dashboard" className={`flex flex-col items-center gap-1 ${activeRoute === 'dashboard' ? 'text-primary relative' : 'text-on-surface-variant hover:text-on-surface transition-colors'}`}>
              {activeRoute === 'dashboard' && <span className="absolute -top-2 w-1 h-1 rounded-full bg-primary"></span>}
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeRoute === 'dashboard' ? "'FILL' 1" : "'FILL' 0" }}>home</span>
              {activeRoute === 'dashboard' && <span className="text-[10px] font-medium">Home</span>}
            </Link>
            
            <Link to="/dashboard/crops" className={`flex flex-col items-center mr-6 ${activeRoute === 'crops' ? 'text-primary relative' : 'text-on-surface-variant hover:text-on-surface transition-colors'}`}>
              {activeRoute === 'crops' && <span className="absolute -top-2 w-1 h-1 rounded-full bg-primary"></span>}
              <span className="material-symbols-outlined" style={{ fontVariationSettings: activeRoute === 'crops' ? "'FILL' 1" : "'FILL' 0" }}>potted_plant</span>
              {activeRoute === 'crops' && <span className="text-[10px] font-medium">Crops</span>}
            </Link>
            
            {/* Center Floating Action Button */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-5">
              <button className="w-[68px] h-[68px] rounded-full bg-primary flex items-center justify-center text-[#003825] shadow-[0_0_20px_rgba(78,222,163,0.3)] border-[6px] border-surface hover:scale-105 transition-transform scan-pulse">
                <span className="material-symbols-outlined text-[28px]">qr_code_scanner</span>
              </button>
            </div>

            <Link to="#" className="flex flex-col items-center text-on-surface-variant hover:text-on-surface transition-colors ml-6">
              <span className="material-symbols-outlined text-[24px]">groups</span>
            </Link>
            
            <Link to="#" className="flex flex-col items-center text-on-surface-variant hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[24px]">person</span>
            </Link>

          </div>
        </nav>
      </div>
    </div>
  );
}
