import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Button from '../components/common/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4 py-12">
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-10 text-center shadow-xl">
        <p className="text-5xl font-bold text-primary-500">404</p>
        <h1 className="mt-4 text-3xl font-semibold text-[var(--text-primary)]">Page not found</h1>
        <p className="mt-4 text-[var(--text-secondary)]">The route you tried doesn't exist. Use the button below to return to the home page.</p>
        <Link to="/" className="mt-8 inline-block">
          <Button size="lg">Back to Home</Button>
        </Link>
      </motion.div>
    </div>
  );
}
