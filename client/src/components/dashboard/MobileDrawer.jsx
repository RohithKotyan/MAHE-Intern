import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function MobileDrawer({ isOpen, onClose }) {
  const { user } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path) => {
    if (path === '/dashboard' && currentPath === '/dashboard') return true;
    if (path !== '/dashboard' && currentPath.startsWith(path)) return true;
    return false;
  };

  const NavLink = ({ to, icon, label, badge }) => {
    const active = isActive(to);
    return (
      <Link 
        to={to} 
        onClick={onClose}
        className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
          active 
            ? 'bg-primary/10 text-primary font-semibold' 
            : 'text-on-surface hover:bg-surface-variant/50'
        }`}
      >
        <span className="material-symbols-outlined" style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}>
          {icon}
        </span>
        <span className="font-body-md flex-1">{label}</span>
        {badge && (
          <span className="bg-error/10 text-error px-2 py-0.5 rounded-full font-label-sm text-[10px] font-bold">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-[#0A0C10]/40 backdrop-blur-sm z-[60] md:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 left-0 h-full w-[280px] bg-surface-container-lowest z-[70] shadow-2xl flex flex-col md:hidden transform transition-transform duration-300 ease-[cubic-bezier(0.2,0,0,1)] ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Profile Area */}
        <div className="bg-primary/5 p-6 border-b border-outline-variant/20 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-[40px]"></div>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-sm">
                <span className="material-symbols-outlined text-on-primary-container text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="font-headline-lg text-[16px] font-bold text-primary leading-tight">AgroCare AI</h1>
              </div>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface hover:bg-surface-variant/80 relative z-10 pointer-events-auto">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <Link to="/dashboard/profile" onClick={onClose} className="flex items-center gap-3 relative z-10 p-2 -ml-2 rounded-xl hover:bg-surface-variant/50 transition-colors pointer-events-auto">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 overflow-hidden bg-surface-container flex items-center justify-center">
              <img alt="User profile" className="w-full h-full object-cover" src={user?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} />
            </div>
            <div>
              <div className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-widest">{user?.role || 'Farmer'}</div>
              <div className="font-body-md text-[16px] text-on-surface font-semibold">{user?.name || 'AgroCare User'}</div>
            </div>
          </Link>
        </div>

        {/* Scrollable Nav List */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
          <NavLink to="/dashboard" icon="home" label="Home" />
          <NavLink to="/dashboard/crops" icon="potted_plant" label="Crop Tracking" />
          <NavLink to="/dashboard/community" icon="groups" label="Community" badge="NEW" />
          <NavLink to="/dashboard/reports" icon="analytics" label="Reports & Analytics" />
          
          <div className="h-px bg-outline-variant/30 my-4 mx-2"></div>
          
          <NavLink to="/dashboard/weather" icon="partly_cloudy_day" label="Weather" />
          <NavLink to="/dashboard/diseases" icon="health_and_safety" label="Disease Scanner" />
          <NavLink to="/dashboard/chat" icon="forum" label="AgroBrain Chat" />
          
          <div className="h-px bg-outline-variant/30 my-4 mx-2"></div>
          
          <NavLink to="/dashboard/settings" icon="settings" label="Settings" />
          <NavLink to="/dashboard/support" icon="help" label="Help & Support" />
        </div>

        {/* Upgrade Banner */}
        <div className="p-4">
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-4 flex flex-col relative overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.3)]">
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/20 rounded-full blur-[20px] -translate-y-1/2 translate-x-1/3"></div>
            <div className="flex items-center gap-2 mb-1 relative z-10">
              <span className="material-symbols-outlined text-white text-[18px]">workspace_premium</span>
              <span className="font-label-sm text-[12px] text-white font-bold uppercase tracking-widest">Agri AI Expert</span>
            </div>
            <span className="font-label-sm text-[11px] text-white/90 relative z-10">Unlock all advanced features</span>
            <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-[20px]">chevron_right</span>
          </div>
        </div>
      </div>
    </>
  );
}
