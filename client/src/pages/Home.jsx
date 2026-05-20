import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  useEffect(() => {
    // Micro-interaction for hero cards
    const handleMouseMove = (e) => {
      const cards = document.querySelectorAll('.tilt-effect');
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardX = rect.left + rect.width / 2;
        const cardY = rect.top + rect.height / 2;

        const angleX = (mouseY - cardY) / 40;
        const angleY = (cardX - mouseX) / 40;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-6 overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            className="w-full h-full object-cover opacity-30 grayscale brightness-50" 
            alt="Cinematic indoor vertical farm" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhDVO7I5ExKIBzA8oBpOFqGrDtwsoBRuSIq6UwjJHwZZ3Oj-vipVBjlPaltDvGhDM4GYMD2fwXbnxAyZ_2FXC0eVLUzGy46JFbA-QNnUPM_FT2ZfLFASQoVZsoAL45KB_TmsPL_MzajKX0MUVF_4gufKPq8LEkLgtQbxbo95rBASGvwhMazgitimJjce2eYQQqau6ataUkmFNHzy9qtRfGip0cHJdRQqGe-sic1Aei_AhN6tLdoWK8V6a0rFwlt6CbvBbBC4lfOA"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-eo-bg via-transparent to-eo-bg"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 text-xs font-medium uppercase tracking-widest mb-6 emerald-glow">
            INTRODUCING THE NEXT GENERATION
          </span>
          <h1 className="text-4xl md:text-[64px] font-bold leading-tight mb-8 max-w-4xl mx-auto text-[var(--text-primary)]">
            The Future of Farming is <span className="text-primary-500">Intelligent</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto mb-12">
            Empower your fields with AgroCare AI. Real-time disease detection, precision analytics, and autonomous health monitoring delivered through a cinematic data interface.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/signup">
              <button className="bg-primary-500 text-white px-8 py-4 rounded-full text-lg font-bold emerald-glow hover:scale-105 transition-all cursor-pointer">
                Start Scanning Now
              </button>
            </Link>
            <Link to="/features">
              <button className="glass-card text-[var(--text-primary)] px-8 py-4 rounded-full text-lg font-bold flex items-center gap-2 hover:bg-white/10 transition-all cursor-pointer">
                <span className="material-symbols-outlined">play_circle</span> Watch Demo
              </button>
            </Link>
          </div>
        </div>

        {/* Floating UI Elements */}
        <div className="hidden lg:block absolute bottom-24 left-24 w-72 glass-card tilt-effect rounded-2xl p-6 emerald-glow" style={{ animation: 'float 4s ease-in-out infinite' }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary-500/20 flex items-center justify-center text-primary-500">
              <span className="material-symbols-outlined">monitoring</span>
            </div>
            <div>
              <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">Health Index</div>
              <div className="text-xl font-bold text-[var(--text-primary)]">98.4% Optimal</div>
            </div>
          </div>
          <div className="h-2 bg-eo-surface-container-highest rounded-full overflow-hidden">
            <div className="w-[98%] h-full bg-primary-500"></div>
          </div>
        </div>
        
        <div className="hidden lg:block absolute top-1/2 right-24 w-64 glass-card tilt-effect rounded-2xl p-4 emerald-glow">
          <div className="text-xs text-[var(--text-muted)] mb-2">Live AI Feed</div>
          <img 
            className="w-full h-32 object-cover rounded-lg mb-3" 
            alt="AI Scanning leaf" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFbzQWmjW2g15N0LgKbjegpZg7G3dxHN4s6DHDzvZqRGrtoXTnVh1ry0CZGloSYCu_-mHfe-F9xpK0Po5LPXBdrUaFXa-kWhmP5BvHfiaPPHJv1hX3St4QVodLlLjbLncAEhzglSEBpWPp30exNx0-aMMs_wo69iLnMLFvAJc78xeEp-5ENk5qaiPiyaYKIpZGMSSejfVe_w2Se7v9yrMpAVEUaStdQHylU-bPlssFtk_Q-lheS3doWYUAjbXBUH9FiPFQ09WS8g"
          />
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold text-primary-500">SCANNING...</span>
            <span className="text-xs text-[var(--text-muted)]">0.4s lat.</span>
          </div>
        </div>
      </section>

      {/* Trust Metrics */}
      <section className="py-20 bg-eo-surface-container-lowest border-y border-eo-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          <div>
            <div className="text-primary-500 text-4xl md:text-5xl font-bold mb-2">12k+</div>
            <div className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-medium">Active Farmers</div>
          </div>
          <div>
            <div className="text-primary-500 text-4xl md:text-5xl font-bold mb-2">99.8%</div>
            <div className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-medium">Accuracy Rate</div>
          </div>
          <div>
            <div className="text-primary-500 text-4xl md:text-5xl font-bold mb-2">50m+</div>
            <div className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-medium">Crops Scanned</div>
          </div>
          <div>
            <div className="text-primary-500 text-4xl md:text-5xl font-bold mb-2">24/7</div>
            <div className="text-[var(--text-muted)] text-xs uppercase tracking-widest font-medium">Expert Support</div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-[48px] font-bold mb-4 text-[var(--text-primary)]">Precision Tools for Modern Yield</h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">Advanced neural networks meet traditional expertise to revolutionize your harvest cycle.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-min md:auto-rows-[250px]">
          {/* Large Feature */}
          <div className="md:col-span-2 md:row-span-2 glass-card tilt-effect rounded-3xl p-8 flex flex-col justify-end relative overflow-hidden group min-h-[400px] md:min-h-auto">
            <img 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:scale-110 transition-transform duration-700" 
              alt="Drone scanning field" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDA5Jsi43vqoxc_KtP08QS6iqnzLT49BTnsedwri4XuXh_dTiEf-Pg3K8OHDrBW7C6uGg8fZVN3UYTM6D5o5ufrjKiz_dHB7XDbxaMfWyNAzuEM0sOL0XQX2GoRhUFGf61gBqT-KEq8NwdhSIyxESHqNeEQw2xhOBAQ3cLaLUd-Ll4TH17DBzSEHRB5yutHZHFPPkZyf5fQhR_z5vowhal2RPtOGGVEV9oESfd664_UUU_p2AZzIwuuSaYrvNOF8FddPFCqbJQzGg"
            />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-primary-500 flex items-center justify-center text-white mb-6">
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>biotech</span>
              </div>
              <h3 className="text-3xl font-bold mb-3 text-[var(--text-primary)]">Instant Disease Diagnosis</h3>
              <p className="text-[var(--text-secondary)] mb-6 text-base">Identify over 150+ plant pathogens in seconds using our proprietary deep learning models trained on 50 million images.</p>
              <Link to="/features" className="text-primary-500 flex items-center gap-2 font-bold hover:gap-3 transition-all cursor-pointer inline-flex">
                Learn More <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="md:col-span-2 glass-card tilt-effect rounded-3xl p-8 flex flex-col justify-center border-l-4 border-primary-500 min-h-[200px]">
            <h4 className="text-2xl font-bold mb-2 text-[var(--text-primary)]">Central Analytics</h4>
            <p className="text-[var(--text-secondary)] mb-4 text-sm md:text-base">A unified command center for your entire agricultural operation. Monitor moisture, soil health, and pest pressure in one glass interface.</p>
            <div className="flex gap-2">
              <div className="h-1.5 flex-1 bg-primary-500/40 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-primary-500/20 rounded-full"></div>
              <div className="h-1.5 flex-1 bg-primary-500/10 rounded-full"></div>
            </div>
          </div>
          
          {/* Mini Feature 1 */}
          <div className="glass-card tilt-effect rounded-3xl p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-eo-surface-container flex items-center justify-center text-primary-500 mb-4 border border-eo-outline-variant/30">
              <span className="material-symbols-outlined">notifications_active</span>
            </div>
            <h5 className="font-bold mb-2 text-lg text-[var(--text-primary)]">Smart Alerts</h5>
            <p className="text-sm text-[var(--text-secondary)]">Instant notifications for localized pest outbreaks.</p>
          </div>
          
          {/* Mini Feature 2 */}
          <div className="glass-card tilt-effect rounded-3xl p-6 flex flex-col items-center justify-center text-center min-h-[200px]">
            <div className="w-12 h-12 rounded-full bg-eo-surface-container flex items-center justify-center text-primary-500 mb-4 border border-eo-outline-variant/30">
              <span className="material-symbols-outlined">forum</span>
            </div>
            <h5 className="font-bold mb-2 text-lg text-[var(--text-primary)]">Expert Network</h5>
            <p className="text-sm text-[var(--text-secondary)]">Connect directly with certified agronomists.</p>
          </div>
        </div>
      </section>

      {/* Scan Button FAB */}
      <Link to="/dashboard">
        <button className="fixed bottom-8 right-8 z-50 bg-primary-500 text-white flex items-center gap-3 px-8 py-5 rounded-full shadow-2xl emerald-glow pulse-emerald active:scale-90 transition-transform md:flex hidden cursor-pointer">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>photo_camera</span>
          <span className="font-bold tracking-tight text-sm uppercase">START SCAN</span>
        </button>
      </Link>
    </div>
  );
}
