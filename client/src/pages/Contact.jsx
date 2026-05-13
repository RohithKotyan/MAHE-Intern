import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useToast } from '../context/ToastContext';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'support@agrocare.ai', href: 'mailto:support@agrocare.ai' },
  { icon: MapPin, label: 'Address', value: 'Manipal, Karnataka, India', href: '#' },
  { icon: Phone, label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
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
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 font-medium text-sm">Contact</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2 mb-6">Get in Touch</h1>
          <p className="text-lg text-[var(--text-secondary)]">Have a question or feedback? We'd love to hear from you.</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <motion.div {...fadeUp} className="space-y-6">
            {contactInfo.map((info) => (
              <a key={info.label} href={info.href} className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] card-hover">
                <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center flex-shrink-0">
                  <info.icon size={20} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{info.label}</p>
                  <p className="text-sm text-[var(--text-muted)]">{info.value}</p>
                </div>
              </a>
            ))}
          </motion.div>

          <motion.form {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} onSubmit={handleSubmit} className="lg:col-span-2 space-y-5 p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)]">
            <div className="grid sm:grid-cols-2 gap-5">
              <Input label="Name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
            </div>
            <Input label="Subject" placeholder="How can we help?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required />
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-[var(--text-secondary)]">Message</label>
              <textarea rows={5} placeholder="Tell us more..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required
                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 resize-none transition-all" />
            </div>
            <Button type="submit" loading={loading} icon={Send}>Send Message</Button>
          </motion.form>
        </div>
      </div>
    </div>
  );
}
