import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';


export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { login, continueWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await continueWithGoogle();
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        toast.error(err.message || 'Google login failed');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-eo-bg">
      {/* ═══ LEFT PANEL — Decorative ══════════════════════ */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden hero-gradient items-center justify-center p-12">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="relative z-10 w-full max-w-lg">
          <div className="mb-6 space-y-4">
            <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/40 text-emerald-100 text-xs font-medium uppercase tracking-widest">Enterprise Edition</span>
            <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">Welcome Back</h1>
            <p className="text-white/80 text-base max-w-md">
              Sign in to access your dashboard, scan plants with precision AI, and connect with our global precision farming community.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center mt-8">
            <div className="flex -space-x-3">
              <div className="w-10 h-10 rounded-full border-2 border-primary-500 bg-eo-surface-container overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDHivwOR-OAaWPN2cNcjw_MFS94FERVpScsxx_-C-LnFyMIWcycotTKJI8hCgYuHNlI5rS12Qyxb5hvlMi3ZGr4tFN43iaVd1nhgAvIYdBAsSm3WSzEm8UkAuuy824cuQDgdPFDzLzhCuoZiNmN6mZ2ZfCg1ycic7uP7teB2KeUrNNV-Np1_mx4b3SXnDbg9i0MFE-7gBhvQJChEpH3Tn5y6twCYt0QIbPPgUxX8HTp3faaMk5TDfUK9lhkeeMkvDrFcFg92F2EQ" alt="Modern Farmer" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-500 bg-eo-surface-container overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2HUlRtHi0TckZuvH1gbYP3H_UF3PO2TUSMvDYz7JAfgHhm9Ky_aX61p5ZCY3AXtdy9WzfzZcGZAelKHRSGhuuYgZuDxO6pArMCXVDBMZkC1qUq-os3T_UHPE_H8SVt6y5BH8nHEIroSG5A0p4JeCUNbQRoDovB5clxG3OcvCn85ycpxprFKFE6-OQFSutJ9mIWl1IIG87Jpx50U3-fIUVNtzGgrRe8jjTnfu1rm7OeeBUFDSGqSGf-yCwP-Sup_IKM-6Rb3pR_w" alt="Scientist" />
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-primary-500 bg-eo-surface-container overflow-hidden">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcXWITUFBuzaBWWWwGKA9fAv-iVNwdxHA5ZlA7YQwFfHuQUA_SHzvv0FFiF-I1_x1tr8geyF7iW7QrER6g7Harw_gxWi89ROiSlWd_u8LOMpQHJ5yA3dwAYdVSymBNmC6slMbtX7ilp5FAUSNb2LXF1HMvrS-MbTRNRvEXXpBmn48Edpwkte023cQXpQIdsCbsVD_i0ZibpwBnUEkAF0YCrB2sAclWgz7-s2IEvImcSTx02YxO8i1AL08BOX-nfQqmBls4vXLeDw" alt="Elderly Farmer" />
              </div>
            </div>
            <p className="text-sm font-medium text-white/90">Join 12,000+ active farmers</p>
          </div>
        </div>
        
        {/* Absolute Image Asset */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 md:w-96 md:h-96 opacity-30 md:opacity-60 pointer-events-none">
          <img className="w-full h-full object-contain rotate-12" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAbFUrZSyGORl6um6zh_QDojHiSq9LNOwK4AiTKytQpG4xgW2pKCftKdQ4_9u57rk-GQpkPUDkx2ahei5mA7BmsufLSq5H6tdPJZsSokneTpBkpJh-g2zjcU-kKf3p7qB6tfWhjZepMOea5g7KF2VqyuBRJ0exKIOcGKirxsLWT6pnaceqxLnGI202yfmsHBKqaokEz4rt8cxxfdm9me3OQLTqwmT36VbdaDnLJ9mzjiotS31n_ky6SPfXdfVcrnXF3PxoPAQTbg" alt="High-tech leaf" />
        </div>
      </div>

      {/* ═══ RIGHT PANEL — Form ═══════════════════════════ */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 relative">
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-500/5 blur-[120px] rounded-full -z-10" />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Sign in to your account</h1>
            <p className="text-[var(--text-muted)]">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary-500 hover:text-primary-400 font-medium transition-colors">
                Sign up
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Email"
              type="email"
              materialIcon="mail"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              materialIcon="lock"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-eo-outline-variant text-primary-500 focus:ring-primary-500 bg-eo-surface-container-low" />
                <span className="text-sm text-[var(--text-muted)]">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-400 font-medium transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" loading={loading} variant="glow" className="w-full" size="lg">
              Sign in
              <span className="material-symbols-outlined text-lg">arrow_forward</span>
            </Button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-eo-outline-variant/30" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-eo-bg text-xs text-[var(--text-muted)] uppercase tracking-wider">Or continue with</span>
            </div>
          </div>

          {/* Google Button */}
          <div className="mt-6">
            <button
              onClick={handleGoogleLogin}
              disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-eo-outline-variant/30 bg-eo-surface-container-low text-sm font-medium text-[var(--text-secondary)] hover:bg-eo-surface-container-high transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {googleLoading ? (
                <svg className="w-5 h-5 animate-spin text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              )}
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
