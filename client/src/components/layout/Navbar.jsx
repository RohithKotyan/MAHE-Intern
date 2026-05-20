import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../common/Avatar';
import Logo from '../common/Logo';

const navLinks = [
  { label: 'Features', to: '/features' },
  { label: 'About', to: '/about' },
  { label: 'Community', to: '/community' },
  { label: 'Contact', to: '/contact' },
];

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-full px-6 py-3 border border-eo-outline-variant/30 backdrop-blur-xl bg-eo-surface/80 shadow-2xl shadow-primary-500/10 flex justify-between items-center z-50">
        {/* Logo */}
        <Logo size="md" linkTo="/" />

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`text-xs font-medium uppercase tracking-wider transition-colors ${
                isActive(link.to)
                  ? 'text-primary-500 font-bold border-b-2 border-primary-500 pb-1'
                  : 'text-[var(--text-secondary)] hover:text-primary-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 p-1.5 rounded-full hover:bg-eo-surface-container-high transition-colors cursor-pointer"
              >
                <Avatar name={user?.name} src={user?.avatar} size="sm" />
                <span className="hidden sm:block text-sm font-medium text-[var(--text-primary)]">
                  {user?.name?.split(' ')[0]}
                </span>
                <span className={`material-symbols-outlined text-[var(--text-muted)] text-base transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}>
                  expand_more
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-eo-outline-variant/30 bg-eo-surface-container shadow-lg py-1 glass-panel">
                  <div className="px-4 py-3 border-b border-eo-outline-variant/20">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{user?.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">{user?.email}</p>
                  </div>
                  <Link
                    to="/dashboard"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-eo-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">dashboard</span>
                    Dashboard
                  </Link>
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:bg-eo-surface-container-high transition-colors"
                  >
                    <span className="material-symbols-outlined text-lg">person</span>
                    Profile
                  </Link>
                  <div className="border-t border-eo-outline-variant/20 mt-1 pt-1">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/5 transition-colors cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-lg">logout</span>
                      Log out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden sm:block text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-primary-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-primary-500 text-white px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all"
              >
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl hover:bg-eo-surface-container-high transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[var(--text-secondary)]">
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[72px] z-40 px-4 md:hidden">
          <div className="glass-panel rounded-2xl p-6 space-y-4 shadow-2xl mx-auto max-w-7xl">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className={`block text-sm font-medium py-2 transition-colors ${
                  isActive(link.to) ? 'text-primary-500' : 'text-[var(--text-secondary)] hover:text-primary-500'
                }`}
              >
                {link.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <div className="flex gap-3 pt-4 border-t border-eo-outline-variant/20">
                <Link to="/login" className="flex-1 text-center py-2.5 rounded-xl border border-eo-outline-variant/30 text-sm font-medium text-[var(--text-secondary)] hover:bg-eo-surface-container-high transition-colors">
                  Login
                </Link>
                <Link to="/signup" className="flex-1 text-center py-2.5 rounded-xl bg-primary-500 text-white text-sm font-bold hover:bg-primary-600 transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
