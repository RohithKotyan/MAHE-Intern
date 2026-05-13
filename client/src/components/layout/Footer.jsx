import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const footerLinks = {
  Product: [
    { label: 'Features', to: '/features' },
    { label: 'Pricing', to: '#' },
    { label: 'API', to: '#' },
  ],
  Company: [
    { label: 'About', to: '/about' },
    { label: 'Blog', to: '#' },
    { label: 'Careers', to: '#' },
  ],
  Support: [
    { label: 'Contact', to: '/contact' },
    { label: 'Documentation', to: '#' },
    { label: 'FAQ', to: '#' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-3 text-sm text-[var(--text-muted)] max-w-xs">AI-powered plant disease detection for smarter, healthier farming.</p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-[var(--text-muted)] hover:text-primary-500 transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="py-6 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">© {new Date().getFullYear()} AgroCare AI. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Privacy</a>
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
