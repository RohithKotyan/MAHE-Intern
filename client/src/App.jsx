import { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import ScrollToTop from './components/common/ScrollToTop';
import PublicLayout from './components/layout/PublicLayout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardShell from './components/dashboard/DashboardShell';
import ToastContainer from './components/common/Toast';
import { PageSuspenseLoader } from './components/common/Skeletons';

// Static imports for core/public pages (fast load)
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Lazy loaded routes (heavy pages)
const About = lazy(() => import('./pages/About'));
const Features = lazy(() => import('./pages/Features'));
const Contact = lazy(() => import('./pages/Contact'));
const Community = lazy(() => import('./pages/Community'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const CropTracking = lazy(() => import('./pages/CropTracking'));
const TreatmentProtocol = lazy(() => import('./pages/TreatmentProtocol'));
const CommunityHub = lazy(() => import('./pages/CommunityHub'));
const ProfileHub = lazy(() => import('./pages/ProfileHub'));
const ReportsHub = lazy(() => import('./pages/ReportsHub'));
const NotificationsHub = lazy(() => import('./pages/NotificationsHub'));
const SettingsHub = lazy(() => import('./pages/SettingsHub'));
const AIChatHub = lazy(() => import('./pages/AIChatHub'));
const PublicProfile = lazy(() => import('./pages/PublicProfile'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-[var(--md-surface)] text-[var(--md-on-surface)] transition-colors duration-300">
        <ScrollToTop />
        <Suspense fallback={<PageSuspenseLoader />}>
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
              <Route path="/dashboard/user/:id" element={<PublicProfile />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>

        <ToastContainer />
      </div>
    </ThemeProvider>
  );
}

export default App;
