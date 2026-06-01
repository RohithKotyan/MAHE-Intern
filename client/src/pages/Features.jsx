import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } };

const features = [
  { icon: 'center_focus_strong', title: 'Instant AI Scanning', desc: 'Snap a photo and get results in seconds. Our deep learning models, trained on millions of crop images, provide immediate identification of 500+ plant diseases with over 98.4% accuracy.', badges: ['Sub-second Inference', 'Offline Processing Support'], large: true },
  { icon: 'satellite_alt', title: 'Field Monitoring', desc: 'Connect IoT sensors and satellite feeds to track soil moisture, humidity, and health across your entire land.', large: false },
  { icon: 'insights', title: 'Advanced Analytics', desc: 'Predictive modeling for yield forecasting and risk assessment. Turn raw field data into actionable business intelligence.', large: false },
  { icon: 'groups', title: 'Expert Collaboration', desc: 'Instant access to a global network of plant pathologists. Share scan reports with licensed specialists to get verified treatment plans within hours.', large: true },
  { icon: 'notifications_active', title: 'Smart Alerts', desc: 'Get notified about disease outbreaks in your area and receive seasonal crop care reminders.', large: false },
  { icon: 'translate', title: 'Multi-Language', desc: 'Available in multiple languages to reach farmers worldwide, breaking down barriers to technology access.', large: false },
  { icon: 'smartphone', title: 'Mobile Ready', desc: 'Fully responsive design that works seamlessly on any device — scan plants right from your phone.', large: false },
  { icon: 'psychology', title: 'AI Analysis', desc: 'Deep learning models with confidence scores and explainability for transparent diagnostics.', large: false },
];

const workflow = [
  { icon: 'photo_camera', label: 'Capture', active: false },
  { icon: 'cloud_sync', label: 'Neural Analysis', active: false },
  { icon: 'verified', label: 'Validation', active: false },
  { icon: 'medical_services', label: 'Treatment Plan', active: true },
];


export default function Features() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* ═══ HERO ═══════════════════════════════════════ */}
        <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-500 text-xs font-medium uppercase tracking-widest block mb-4">Features</span>
          <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Powerful Tools for <span className="text-primary-500">Smart Farming</span>
          </h1>
          <p className="text-base text-gray-300">
            Everything you need to detect, prevent, and manage plant diseases — all in one platform driven by state-of-the-art AI.
          </p>
        </motion.div>

        {/* ═══ FEATURE BENTO GRID ═════════════════════════ */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-24">
          {/* Instant AI Scanning - Large */}
          <motion.section {...fadeUp} className="md:col-span-8 glass-card rounded-xl p-8 group">
            <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary-500">center_focus_strong</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Instant AI Scanning</h3>
            <p className="text-gray-300 leading-relaxed mb-6">{features[0].desc}</p>
            <div className="flex flex-wrap gap-3">
              {features[0].badges.map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-xs font-medium text-primary-500">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {badge}
                </span>
              ))}
            </div>
          </motion.section>

          {/* Field Monitoring */}
          <motion.section {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.1 }} className="md:col-span-4 glass-card rounded-xl p-8 group">
            <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary-500">satellite_alt</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Field Monitoring</h3>
            <p className="text-gray-300 leading-relaxed mb-6">{features[1].desc}</p>
            <div className="p-4 bg-surface-container-low rounded-lg border border-outline-variant/30 flex items-center gap-4">
              <div className="flex-1">
                <div className="h-2 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary-500 w-3/4 rounded-full" />
                </div>
                <span className="text-[10px] uppercase font-bold text-primary-500 mt-2 block">Optimal Soil Health</span>
              </div>
              <span className="text-xl font-bold text-white">78%</span>
            </div>
          </motion.section>

          {/* Advanced Analytics */}
          <motion.section {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="md:col-span-4 glass-card rounded-xl p-8 group">
            <div className="w-12 h-12 rounded-lg bg-tertiary/10 border border-tertiary/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-tertiary">insights</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-4">Advanced Analytics</h3>
            <p className="text-gray-300 leading-relaxed">{features[2].desc}</p>
            <div className="mt-8 flex items-end gap-1 h-24">
              {[40, 60, 30, 70, 50].map((h, i) => (
                <div key={i} className={`w-full bg-tertiary/${i === 4 ? '60' : '20'} rounded-t transition-all duration-500 group-hover:h-[${h + 20}%]`} style={{ height: `${h}%` }} />
              ))}
            </div>
          </motion.section>

          {/* Expert Collaboration - Large */}
          <motion.section {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.2 }} className="md:col-span-8 glass-card rounded-xl p-8 group">
            <div className="w-12 h-12 rounded-lg bg-primary-500/10 border border-primary-500/20 flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary-500">groups</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Expert Collaboration</h3>
            <p className="text-gray-300 leading-relaxed mb-6">{features[3].desc}</p>
            <div className="flex -space-x-3">
              {['🧑‍🔬', '👩‍🌾', '👨‍💻'].map((emoji, i) => (
                <div key={i} className="w-10 h-10 rounded-full bg-surface-container border-2 border-eo-bg flex items-center justify-center text-lg">
                  {emoji}
                </div>
              ))}
              <div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center text-xs font-bold border-2 border-eo-bg">
                +120
              </div>
            </div>
          </motion.section>
        </div>

        {/* ═══ AI WORKFLOW ═════════════════════════════════ */}
        <section className="py-20 text-center">
          <motion.h2 {...fadeUp} className="text-2xl lg:text-3xl font-bold text-white mb-12">
            The AI Decision Engine
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500/0 via-primary-500/30 to-primary-500/0 -translate-y-1/2 -z-10" />
            {workflow.map((step, i) => (
              <motion.div key={step.label} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.1 }} className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-transform hover:scale-110 ${
                  step.active
                    ? 'bg-primary-500 animate-pulse-slow emerald-glow'
                    : 'bg-surface-container border border-outline-variant emerald-glow'
                }`}>
                  <span className={`material-symbols-outlined ${step.active ? 'text-white' : 'text-primary-500'}`}>
                    {step.icon}
                  </span>
                </div>
                <span className={`text-xs uppercase tracking-tighter font-medium ${step.active ? 'text-primary-500 font-bold' : 'text-gray-400'}`}>
                  {step.label}
                </span>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
