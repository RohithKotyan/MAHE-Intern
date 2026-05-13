import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ScanLine, FileText, Users, User, Settings, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../common/Logo';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/dashboard/scan', icon: ScanLine, label: 'Scan Disease' },
  { to: '/dashboard/reports', icon: FileText, label: 'My Reports' },
  { to: '/dashboard/community', icon: Users, label: 'Community' },
  { to: '/dashboard/profile', icon: User, label: 'Profile' },
  { to: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar({ isOpen, onClose }) {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? 'bg-primary-500/10 text-primary-500'
        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
    }`;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 flex items-center justify-between lg:justify-center">
        <Logo />
        <button onClick={onClose} className="lg:hidden p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] cursor-pointer">
          <X size={20} className="text-[var(--text-muted)]" />
        </button>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.end} className={linkClasses} onClick={onClose}>
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-2xl bg-gradient-to-br from-primary-500/10 to-primary-600/5 border border-primary-500/10">
        <div className="flex items-center gap-2 mb-2">
          <Leaf size={18} className="text-primary-500" />
          <span className="text-sm font-semibold text-[var(--text-primary)]">AI Scanner</span>
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-3">Detect plant diseases instantly with our AI technology.</p>
        <NavLink to="/dashboard/scan" onClick={onClose} className="block w-full text-center px-3 py-2 text-xs font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors">
          Start Scanning
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-[var(--bg-sidebar)] border-r border-[var(--border-color)]">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden" onClick={onClose} />
            <motion.aside
              initial={{ x: -280 }} animate={{ x: 0 }} exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-50 w-64 bg-[var(--bg-sidebar)] border-r border-[var(--border-color)] lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
