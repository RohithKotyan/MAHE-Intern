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
  const { register } = useAuth();
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

          <p className="mt-6 text-xs text-center text-[var(--text-muted)]">
            By signing up, you agree to our <a href="#" className="text-primary-500">Terms</a> and <a href="#" className="text-primary-500">Privacy Policy</a>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
