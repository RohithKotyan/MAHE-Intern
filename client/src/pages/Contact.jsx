import { useState } from 'react';
import { motion } from 'motion/react';
import { Send } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useToast } from '../context/ToastContext';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const contactInfo = [
  { icon: 'mail', label: 'Email Us', value: 'support@agrocare.ai', href: 'mailto:support@agrocare.ai' },
  { icon: 'location_on', label: 'Visit Us', value: 'Manipal, Karnataka, India', href: '#' },
  { icon: 'phone', label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
  { icon: 'schedule', label: 'Office Hours', value: 'Mon-Fri 9AM-6PM IST', href: '#' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    toast.success('Message sent! We\'ll get back to you soon.');
    setForm({ name: '', email: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* ═══ HERO ═══════════════════════════════════════ */}
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 text-xs font-medium uppercase tracking-widest block mb-4">Contact</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-[var(--text-primary)] mb-6 leading-tight">
            Get in <span className="text-primary-500">Touch</span>
          </h1>
          <p className="text-base text-[var(--text-secondary)]">
            Have a question, partnership inquiry, or feedback? We'd love to hear from you.
          </p>
        </motion.div>

        {/* ═══ CONTACT GRID ═══════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contact Info Cards */}
          <div className="lg:col-span-4 space-y-4">
            {contactInfo.map((info, i) => (
              <motion.a
                key={info.label}
                href={info.href}
                {...fadeUp}
                transition={{ ...fadeUp.transition, delay: i * 0.1 }}
                className="block glass-card rounded-xl p-6 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center group-hover:bg-primary-500 transition-colors">
                    <span className="material-symbols-outlined text-primary-500 group-hover:text-white transition-colors">
                      {info.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">{info.label}</p>
                    <p className="text-sm font-medium text-[var(--text-primary)]">{info.value}</p>
                  </div>
                </div>
              </motion.a>
            ))}

            {/* Map Placeholder */}
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.4 }} className="glass-card rounded-xl p-6 group">
              <div className="h-48 bg-eo-surface-container-high rounded-lg flex items-center justify-center group-hover:bg-eo-surface-container-highest transition-colors">
                <span className="material-symbols-outlined text-4xl text-primary-500 animate-pulse">map</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-4 text-center">📍 Manipal, Karnataka, India</p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.form
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="lg:col-span-8 glass-card rounded-xl p-8 md:p-10 space-y-6"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Send us a message</h2>
              <p className="text-sm text-[var(--text-muted)]">Fill out the form below and we'll respond within 24 hours.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input
                label="Name"
                materialIcon="person"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                materialIcon="mail"
                placeholder="you@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
            </div>
            <Input
              label="Subject"
              materialIcon="subject"
              placeholder="How can we help?"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
            />
            <div className="space-y-2">
              <label className="block text-xs font-medium text-[var(--text-secondary)] uppercase tracking-wider ml-1">
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us more about your inquiry..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                className="w-full rounded-xl border border-eo-outline-variant/30 bg-eo-surface-container-low px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)]/50 outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500/20 resize-none transition-all"
              />
            </div>
            <Button type="submit" loading={loading} variant="glow" size="lg" icon={Send} className="w-full sm:w-auto rounded-full">
              Send Message
            </Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
