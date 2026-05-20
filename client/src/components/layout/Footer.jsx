import { Link } from 'react-router-dom';
import Logo from '../common/Logo';

const footerLinks = {
  Product: [
    { label: 'Features', to: '/features' },
    { label: 'Disease Detection', to: '#' },
    { label: 'Soil Analysis', to: '#' },
    { label: 'Climate Insights', to: '#' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Careers', to: '#' },
    { label: 'Press Kit', to: '#' },
    { label: 'News', to: '#' },
  ],
  'Legal & Support': [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
    { label: 'Security', to: '#' },
    { label: 'Contact', to: '/contact' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full border-t border-eo-outline-variant/20 bg-eo-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="col-span-1">
            <Logo size="md" linkTo="/" />
            <p className="mt-4 text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
              Leading the transition to sustainable, data-driven agriculture through world-class AI technology.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-[var(--text-muted)] hover:text-primary-500 transition-colors">
                <span className="material-symbols-outlined text-xl">language</span>
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-primary-500 transition-colors">
                <span className="material-symbols-outlined text-xl">hub</span>
              </a>
              <a href="#" className="text-[var(--text-muted)] hover:text-primary-500 transition-colors">
                <span className="material-symbols-outlined text-xl">smart_display</span>
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-xs font-bold text-primary-500 uppercase tracking-wider mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-eo-outline-variant/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {new Date().getFullYear()} AgroCare AI. System Status:{' '}
            <span className="text-primary-500 font-medium">Optimal</span>
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">Twitter</a>
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">LinkedIn</a>
            <a href="#" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
