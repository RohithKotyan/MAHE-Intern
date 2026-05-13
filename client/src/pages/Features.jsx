import { motion } from 'motion/react';
import { ScanLine, Brain, Shield, BarChart3, Users, Bell, Globe, Smartphone, Check } from 'lucide-react';
import Card from '../components/common/Card';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const features = [
  { icon: ScanLine, title: 'Instant Scanning', desc: 'Snap a photo and get results in seconds. Our AI processes images on the cloud for fast, reliable detection.', color: 'text-emerald-500 bg-emerald-500/10' },
  { icon: Brain, title: 'AI Analysis', desc: 'Deep learning models trained on millions of images provide accurate disease identification with confidence scores.', color: 'text-blue-500 bg-blue-500/10' },
  { icon: Shield, title: 'Treatment Plans', desc: 'Receive expert-backed treatment recommendations customized for your specific plant disease and environment.', color: 'text-purple-500 bg-purple-500/10' },
  { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track your crop health over time with detailed charts, trends, and historical scan data.', color: 'text-amber-500 bg-amber-500/10' },
  { icon: Users, title: 'Community Forum', desc: 'Share experiences, ask questions, and learn from a global network of farmers and agricultural experts.', color: 'text-pink-500 bg-pink-500/10' },
  { icon: Bell, title: 'Smart Alerts', desc: 'Get notified about disease outbreaks in your area and receive seasonal crop care reminders.', color: 'text-red-500 bg-red-500/10' },
  { icon: Globe, title: 'Multi-Language', desc: 'Available in multiple languages to reach farmers worldwide, breaking down barriers to technology access.', color: 'text-teal-500 bg-teal-500/10' },
  { icon: Smartphone, title: 'Mobile Ready', desc: 'Fully responsive design that works seamlessly on any device — scan plants right from your phone.', color: 'text-indigo-500 bg-indigo-500/10' },
];

const plans = [
  { name: 'Free', price: '$0', period: '/forever', features: ['5 scans/month', 'Basic disease detection', 'Community access', 'Email support'], popular: false },
  { name: 'Pro', price: '$9', period: '/month', features: ['Unlimited scans', 'Advanced AI analysis', 'Treatment plans', 'Priority support', 'Analytics dashboard', 'Expert consultations'], popular: true },
  { name: 'Enterprise', price: 'Custom', period: '', features: ['Everything in Pro', 'API access', 'Custom integrations', 'Dedicated support', 'Team management', 'On-premise deployment'], popular: false },
];

export default function Features() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 font-medium text-sm">Features</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2 mb-6">Powerful Tools for <span className="gradient-text">Smart Farming</span></h1>
          <p className="text-lg text-[var(--text-secondary)]">Everything you need to detect, prevent, and manage plant diseases — all in one platform.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {features.map((f, i) => (
            <motion.div key={f.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.05 }}>
              <Card hover className="h-full">
                <div className={`w-12 h-12 rounded-xl ${f.color} flex items-center justify-center mb-4`}>
                  <f.icon size={24} />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{f.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{f.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pricing */}
        <motion.div {...fadeUp} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">Simple, Transparent Pricing</h2>
          <p className="text-[var(--text-muted)]">Choose the plan that fits your farming needs.</p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div key={plan.name} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className={`p-6 rounded-2xl border ${plan.popular ? 'border-primary-500 shadow-[var(--shadow-glow)]' : 'border-[var(--border-color)]'} bg-[var(--bg-card)] relative`}>
              {plan.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-medium bg-primary-500 text-white rounded-full">Most Popular</span>}
              <h3 className="text-xl font-bold text-[var(--text-primary)]">{plan.name}</h3>
              <div className="mt-4 mb-6">
                <span className="text-4xl font-bold text-[var(--text-primary)]">{plan.price}</span>
                <span className="text-[var(--text-muted)]">{plan.period}</span>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                    <Check size={16} className="text-primary-500 flex-shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer ${plan.popular ? 'bg-primary-500 hover:bg-primary-600 text-white' : 'bg-[var(--bg-tertiary)] hover:bg-[var(--border-color)] text-[var(--text-primary)]'}`}>
                Get Started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
