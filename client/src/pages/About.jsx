import { motion } from 'motion/react';
import { Target, Eye, Heart, Award } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const values = [
  { icon: Target, title: 'Mission-Driven', desc: 'Empowering farmers with technology to ensure food security worldwide.' },
  { icon: Eye, title: 'Innovation First', desc: 'Leveraging cutting-edge AI and machine learning for agricultural solutions.' },
  { icon: Heart, title: 'Community Focused', desc: 'Building a global network of farmers sharing knowledge and experiences.' },
  { icon: Award, title: 'Reliability', desc: 'Delivering accurate, dependable results farmers can trust for their livelihoods.' },
];

const timeline = [
  { year: '2024', title: 'Idea Born', desc: 'Research on AI-powered plant disease detection begins.' },
  { year: '2024', title: 'Prototype Launch', desc: 'First AI model trained on 50,000+ plant disease images.' },
  { year: '2025', title: 'Beta Release', desc: 'Platform launched with community features and expert network.' },
  { year: '2025', title: 'Public Launch', desc: 'Full platform launch with mobile app and advanced analytics.' },
];

export default function About() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-primary-500 font-medium text-sm">About Us</span>
          <h1 className="text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mt-2 mb-6">Revolutionizing Agriculture with <span className="gradient-text">AI Technology</span></h1>
          <p className="text-lg text-[var(--text-secondary)]">We're building the future of farming — where every farmer has access to AI-powered tools for healthier crops and better yields.</p>
        </motion.div>

        {/* Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {values.map((v, i) => (
            <motion.div key={v.title} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="p-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-card)] text-center">
              <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center mx-auto mb-4">
                <v.icon size={24} className="text-primary-500" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{v.title}</h3>
              <p className="text-sm text-[var(--text-muted)]">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Timeline */}
        <motion.div {...fadeUp} className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-[var(--text-primary)] text-center mb-12">Our Journey</h2>
          <div className="space-y-8">
            {timeline.map((item, i) => (
              <motion.div key={i} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.15 }} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{item.year.slice(2)}</div>
                  {i < timeline.length - 1 && <div className="w-px h-full bg-[var(--border-color)] mt-2" />}
                </div>
                <div className="pb-8">
                  <span className="text-xs text-primary-500 font-medium">{item.year}</span>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mt-1">{item.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
