import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] px-4 py-12 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-primary-500">Dashboard</p>
            <h1 className="text-3xl font-bold">Welcome back, {user?.name || 'Farmer'}.</h1>
            <p className="mt-2 text-[var(--text-secondary)]">This is your authentication-ready dashboard placeholder. Your account is connected and protected.</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>Sign out</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
            <h2 className="text-xl font-semibold mb-4">Account summary</h2>
            <div className="space-y-3 text-sm text-[var(--text-secondary)]">
              <p><span className="font-semibold text-[var(--text-primary)]">Name:</span> {user?.name}</p>
              <p><span className="font-semibold text-[var(--text-primary)]">Email:</span> {user?.email}</p>
              <p><span className="font-semibold text-[var(--text-primary)]">Role:</span> {user?.role}</p>
            </div>
          </div>

          <div className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6">
            <h2 className="text-xl font-semibold mb-4">Next steps</h2>
            <ul className="space-y-3 text-sm text-[var(--text-secondary)]">
              <li>• Upload a plant image from the scan page.</li>
              <li>• Review your profile and account settings.</li>
              <li>• Return to the homepage for more product info.</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/" className="text-sm font-medium text-primary-500 hover:text-primary-600">Go to homepage</Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
