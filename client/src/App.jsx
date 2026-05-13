import { Routes, Route, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Home from './pages/Home';
import About from './pages/About';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import ToastContainer from './components/common/Toast';

function App() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <header className="border-b border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link to="/" className="text-xl font-bold text-[var(--text-primary)]">AgroCare AI</Link>
          <nav className="flex flex-wrap gap-3 text-sm text-[var(--text-secondary)]">
            <Link to="/features" className="hover:text-primary-500">Features</Link>
            <Link to="/about" className="hover:text-primary-500">About</Link>
            <Link to="/contact" className="hover:text-primary-500">Contact</Link>
            <Link to="/login" className="hover:text-primary-500">Login</Link>
            <Link to="/signup" className="text-primary-500 font-medium hover:text-primary-600">Sign Up</Link>
          </nav>
        </div>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/features" element={<Features />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <ToastContainer />
    </div>
  );
}

export default App;
