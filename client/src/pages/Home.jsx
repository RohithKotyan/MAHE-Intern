import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ScanLine, Shield, Users, BarChart3, ArrowRight, Leaf, Zap, Globe } from 'lucide-react';
import Button from '../components/common/Button';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const features = [
  { icon: ScanLine, title: 'AI Disease Detection', desc: 'Upload a photo and get instant AI-powered diagnosis for your plants.' },
  { icon: Shield, title: 'Expert Recommendations', desc: 'Receive treatment plans from agricultural experts and AI analysis.' },
  { icon: Users, title: 'Farmer Community', desc: 'Connect with farmers worldwide to share knowledge and tips.' },
  { icon: BarChart3, title: 'Health Tracking', desc: 'Monitor your crop health trends with detailed reports and analytics.' },
];

const stats = [
  { value: '50K+', label: 'Scans Completed' },
  { value: '98%', label: 'Accuracy Rate' },
  { value: '12K+', label: 'Active Farmers' },
  { value: '200+', label: 'Plant Species' },
];

export default function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium border border-primary-500/20 mb-6">
                <Leaf size={14} /> AI-Powered Agriculture Platform
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-[var(--text-primary)] mb-6">
              Protect Your Crops with{' '}
              <span className="gradient-text">AI Intelligence</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">
              Detect plant diseases instantly, get expert recommendations, and join a community of smart farmers. Powered by cutting-edge AI technology.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button size="lg" className="w-full sm:w-auto">Get Started Free <ArrowRight size={18} /></Button>
              </Link>
              <Link to="/features">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">Learn More</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-[var(--border-color)] bg-[var(--bg-secondary)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="text-center">
                <p className="text-3xl lg:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-[var(--text-muted)] mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-4">Everything You Need to Grow</h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">Comprehensive tools designed to help farmers detect, prevent, and manage plant diseases efficiently.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover">
                <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                  <f.icon size={24} className="text-primary-500" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="relative rounded-3xl gradient-bg p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvc3ZnPg==')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Ready to Protect Your Crops?</h2>
              <p className="text-emerald-100 max-w-xl mx-auto mb-8">Join thousands of farmers using AI to detect plant diseases early and improve crop yields.</p>
              <Link to="/signup">
                <Button variant="secondary" size="lg" className="bg-white text-primary-700 hover:bg-emerald-50">
                  Start Free Trial <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
