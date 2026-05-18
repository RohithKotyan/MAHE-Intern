import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Logo from '../components/common/Logo';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'farmer' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { register, continueWithGoogle } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.trim()) errs.email = 'Email is required';
    if (form.password.length < 6) errs.password = 'Min 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await register({ name: form.name, email: form.email, password: form.password, role: form.role });
      toast.success('Account created! Welcome to AgroCare AI.');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    try {
      await continueWithGoogle();
      toast.success('Account created! Welcome to AgroCare AI.');
      navigate('/dashboard');
    } catch (err) {
      if (err.code !== 'auth/popup-closed-by-user' && err.code !== 'auth/cancelled-popup-request') {
        toast.error(err.message || 'Google registration failed');
      }
    } finally {
      setGoogleLoading(false);
    }
  };

  const roles = [
    { value: 'farmer', label: '🌾 Farmer', desc: 'Grow and manage crops' },
    { value: 'expert', label: '🔬 Expert', desc: 'Provide agricultural advice' },
  ];

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden gradient-bg">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-40" />
        <div className="relative z-10 flex flex-col justify-center px-16">
          <h2 className="text-4xl font-bold text-white mb-4">Join AgroCare AI</h2>
          <p className="text-emerald-100 text-lg max-w-md">Create your account and start detecting plant diseases with AI-powered technology.</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="mb-8">
            <Link to="/"><Logo size="lg" /></Link>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mt-6 mb-2">Create your account</h1>
            <p className="text-[var(--text-muted)]">Already have an account? <Link to="/login" className="text-primary-500 hover:text-primary-600 font-medium">Sign in</Link></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input label="Full Name" placeholder="John Doe" icon={User} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} required />
            <Input label="Email" type="email" placeholder="you@example.com" icon={Mail} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} required />
            <Input label="Password" type="password" placeholder="••••••••" icon={Lock} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} error={errors.password} required />
            <Input label="Confirm Password" type="password" placeholder="••••••••" icon={Lock} value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} error={errors.confirmPassword} required />

            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">I am a</label>
              <div className="grid grid-cols-2 gap-3">
                {roles.map((r) => (
                  <button key={r.value} type="button" onClick={() => setForm({ ...form, role: r.value })}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${form.role === r.value ? 'border-primary-500 bg-primary-500/5' : 'border-[var(--border-color)] bg-[var(--bg-card)]'}`}>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{r.label}</span>
                    <p className="text-xs text-[var(--text-muted)] mt-0.5">{r.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <Button type="submit" loading={loading} className="w-full" size="lg">Create Account <ArrowRight size={18} /></Button>
          </form>
          
          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-[var(--border-color)]" /></div>
            <div className="relative flex justify-center"><span className="px-4 bg-[var(--bg-primary)] text-xs text-[var(--text-muted)]">Or continue with</span></div>
          </div>
          <div className="mt-4 flex justify-center">
            <button onClick={handleGoogleLogin} disabled={googleLoading} className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed">
              {googleLoading ? (
                <svg className="w-5 h-5 animate-spin text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              )}
              {googleLoading ? 'Connecting...' : 'Continue with Google'}
            </button>
          </div>

          <p className="mt-6 text-xs text-center text-[var(--text-muted)]">
            By signing up, you agree to our <a href="#" className="text-primary-500">Terms</a> and <a href="#" className="text-primary-500">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
