import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bell, Search, Menu, LogOut, User, Settings, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../common/ThemeToggle';
import Avatar from '../common/Avatar';
import Logo from '../common/Logo';

export default function Navbar({ onMenuClick }) {
  const { user, isAuthenticated, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClick = (e) => { if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false); };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <nav className="sticky top-0 z-40 h-16 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/80 backdrop-blur-xl">
      <div className="flex items-center justify-between h-full px-4 lg:px-6">
        <div className="flex items-center gap-3">
          {onMenuClick && (
            <button onClick={onMenuClick} className="lg:hidden p-2 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
              <Menu size={20} className="text-[var(--text-secondary)]" />
            </button>
          )}
          <Link to="/" className="flex items-center"><Logo /></Link>
        </div>

        {/* Search bar - desktop */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-primary-500 transition-colors" />
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button onClick={() => setSearchOpen(!searchOpen)} className="md:hidden p-2 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
            <Search size={20} className="text-[var(--text-secondary)]" />
          </button>
          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <button className="relative p-2 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
                <Bell size={20} className="text-[var(--text-secondary)]" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-500 rounded-full" />
              </button>

              {/* Profile dropdown */}
              <div className="relative ml-1" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer">
                  <Avatar name={user?.name} src={user?.avatar} size="sm" />
                  <span className="hidden sm:block text-sm font-medium text-[var(--text-primary)]">{user?.name?.split(' ')[0]}</span>
                  <ChevronDown size={14} className={`text-[var(--text-muted)] transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] shadow-lg py-1 animate-in fade-in slide-in-from-top-2">
                    <div className="px-4 py-3 border-b border-[var(--border-color)]">
                      <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name}</p>
                      <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
                    </div>
                    <Link to="/dashboard/profile" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                      <User size={16} /> Profile
                    </Link>
                    <Link to="/dashboard/settings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors">
                      <Settings size={16} /> Settings
                    </Link>
                    <div className="border-t border-[var(--border-color)] mt-1 pt-1">
                      <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer">
                        <LogOut size={16} /> Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Link to="/login" className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">Log in</Link>
              <Link to="/signup" className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-xl transition-colors">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
