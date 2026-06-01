import { motion } from 'motion/react';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const values = [
  { icon: 'target', title: 'Mission-Driven', desc: 'Empowering farmers with technology to ensure food security worldwide.' },
  { icon: 'visibility', title: 'Innovation First', desc: 'Leveraging cutting-edge AI and machine learning for agricultural solutions.' },
  { icon: 'favorite', title: 'Community Focused', desc: 'Building a global network of farmers sharing knowledge and experiences.' },
  { icon: 'verified', title: 'Reliability', desc: 'Delivering accurate, dependable results farmers can trust for their livelihoods.' },
];

const timeline = [
  { year: '2024', title: 'Idea Born', desc: 'Initial research into transformer-based computer vision for multi-spectral plant disease detection begins in an academic lab.', side: 'left' },
  { year: '2024', title: 'Prototype Launch', desc: 'First version of the AgroCare engine trained on over 50,000+ localized plant disease images with 98% accuracy.', side: 'right' },
  { year: '2025', title: 'Beta Release', desc: 'Closed beta deployment across 500 family farms in three continents. Interactive community features go live.', side: 'left' },
  { year: '2025', title: 'Public Launch', desc: 'Full global rollout of the mobile app ecosystem and advanced enterprise predictive analytics suite.', side: 'right' },
];

const team = [
  { name: 'Dr. Elena Vance', role: 'Chief Scientist', emoji: '👩‍🔬' },
  { name: 'Marcus Thorne', role: 'Head of AI Engine', emoji: '👨‍💻' },
  { name: 'Sarah Chen', role: 'VP of Sustainability', emoji: '👩‍🌾' },
  { name: 'Julian Reed', role: 'Product Director', emoji: '🧑‍💼' },
];

export default function About() {
  return (
    <div className="pt-32 pb-24">
      {/* ═══ HERO ═══════════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 mb-24 text-center relative">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-500/20 blur-[120px] -z-10 rounded-full" />
        <motion.div {...fadeUp}>
          <span className="text-primary-500 text-xs font-medium uppercase tracking-widest block mb-4">About Us</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-4xl mx-auto">
            Revolutionizing Agriculture with <span className="text-primary-500">AI Technology</span>
          </h1>
          <p className="text-base text-gray-300 max-w-2xl mx-auto">
            We're building the future of farming — where every farmer has access to AI-powered tools for healthier crops and better yields.
          </p>
        </motion.div>

        {/* ═══ VALUES GRID ══════════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="glass-card p-8 rounded-xl text-center group"
            >
              <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center mx-auto mb-6 text-primary-500 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {v.icon}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mb-3">{v.title}</h3>
              <p className="text-sm text-gray-300">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ VISION SECTION ═════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeUp} className="relative group">
            <div className="absolute inset-0 bg-primary-500/10 rounded-3xl blur-2xl group-hover:bg-primary-500/20 transition-all" />
            <div className="relative z-10 rounded-3xl border border-outline-variant/30 overflow-hidden bg-surface-container-high h-[500px] flex items-center justify-center">
              <div className="text-center p-12">
                <span className="material-symbols-outlined text-primary-500 text-7xl mb-4" style={{ fontVariationSettings: "'FILL' 1" }}>
                  agriculture
                </span>
                <p className="text-gray-400 text-sm mt-4">Sustainable Agriculture AI</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass-panel p-6 rounded-2xl z-20 max-w-xs emerald-glow">
              <p className="text-primary-500 font-bold mb-2">Sustainable Impact</p>
              <p className="text-sm text-gray-300">Reducing pesticide use by up to 40% through precision detection.</p>
            </div>
          </motion.div>

          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }}>
            <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 leading-tight">
              Blending Sustainability with <span className="text-primary-500 italic">Deep Intelligence</span>
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              Our vision transcends simple automation. We are architecting a symbiotic ecosystem where biological resilience meets silicon-based calculation. By interpreting the subtle signals of soil health and plant stress, AgroCare AI bridges the gap between traditional wisdom and future scalability.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary-500">
                  <span className="material-symbols-outlined">eco</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Ecological Restoration</h4>
                  <p className="text-sm text-gray-300">Targeted treatments that protect local biodiversity and soil microbes.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 text-primary-500">
                  <span className="material-symbols-outlined">analytics</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">Data Sovereignty</h4>
                  <p className="text-sm text-gray-300">Empowering individual land owners with enterprise-grade analytic tools.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TIMELINE ═══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <motion.div {...fadeUp} className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white">Our Journey</h2>
          <div className="w-24 h-1 bg-primary-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="relative max-w-4xl mx-auto pl-12 md:pl-0">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-500/0 -translate-x-1/2" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.15 }}
              className={`relative mb-20 md:flex items-center justify-between group ${item.side === 'right' ? 'md:flex-row-reverse' : ''}`}
            >
              <div className={`md:w-[45%] ${item.side === 'left' ? 'md:text-right' : ''}`}>
                <span className="text-primary-500 font-bold text-xs uppercase tracking-widest">{item.year}</span>
                <h3 className="text-xl font-bold text-white mt-1 group-hover:text-primary-500 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-300 mt-2">{item.desc}</p>
              </div>
              <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-primary-500 border-4 border-eo-bg -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
              <div className="hidden md:block md:w-[45%]" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ TEAM GRID ══════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div {...fadeUp} className="mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">Innovation Team</h2>
          <p className="text-gray-300 max-w-xl">Meet the world-class researchers and engineers dedicated to the future of precision agriculture.</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-2xl glass-card"
            >
              <div className="aspect-[3/4] bg-surface-container-high flex items-center justify-center group-hover:bg-surface-container-highest transition-colors">
                <span className="text-7xl group-hover:scale-110 transition-transform duration-500">{member.emoji}</span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-eo-bg to-transparent pt-20">
                <h4 className="text-lg font-bold text-white">{member.name}</h4>
                <p className="text-primary-500 text-xs font-medium uppercase tracking-wider">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ JOIN US CTA ════════════════════════════════ */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div {...fadeUp} className="relative glass-card rounded-[2.5rem] p-12 md:p-24 overflow-hidden text-center emerald-glow">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/20 blur-[100px] -z-10 animate-pulse" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-500/10 blur-[80px] -z-10" />
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8 max-w-2xl mx-auto">
            Help us shape the future of <span className="text-primary-500">food security.</span>
          </h2>
          <p className="text-gray-300 mb-12 max-w-xl mx-auto">
            We are always looking for visionary engineers, designers, and agronomists to join our growing team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="w-full sm:w-auto bg-primary-500 text-white px-10 py-4 rounded-full font-bold hover:scale-105 transition-all glow-button cursor-pointer">
              View Openings
            </button>
            <button className="w-full sm:w-auto border border-outline-variant text-white px-10 py-4 rounded-full font-bold hover:bg-surface-container-high transition-all cursor-pointer">
              Contact HR
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
