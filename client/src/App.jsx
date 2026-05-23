import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'motion/react';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/common/ScrollToTop';
import PublicLayout from './components/layout/PublicLayout';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Community from './pages/Community';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import CropTracking from './pages/CropTracking';
import TreatmentProtocol from './pages/TreatmentProtocol';
import CommunityHub from './pages/CommunityHub';
import ProfileHub from './pages/ProfileHub';
import ReportsHub from './pages/ReportsHub';
import NotificationsHub from './pages/NotificationsHub';
import SettingsHub from './pages/SettingsHub';
import AIChatHub from './pages/AIChatHub';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardShell from './components/dashboard/DashboardShell';
import ToastContainer from './components/common/Toast';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--md-surface)] text-[var(--md-on-surface)] transition-colors duration-300">
        <ScrollToTop />
        <Routes location={location}>
          {/* Public pages with floating Navbar + Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/features" element={<Features />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/community" element={<Community />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>

          {/* Protected dashboard Layout */}
          <Route element={<ProtectedRoute><DashboardShell /></ProtectedRoute>}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/crops" element={<CropTracking />} />
            <Route path="/dashboard/crops/:cropId/treatment" element={<TreatmentProtocol />} />
            <Route path="/dashboard/community" element={<CommunityHub />} />
            <Route path="/dashboard/profile" element={<ProfileHub />} />
            <Route path="/dashboard/reports" element={<ReportsHub />} />
            <Route path="/dashboard/notifications" element={<NotificationsHub />} />
            <Route path="/dashboard/settings" element={<SettingsHub />} />
            <Route path="/dashboard/chat" element={<AIChatHub />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
