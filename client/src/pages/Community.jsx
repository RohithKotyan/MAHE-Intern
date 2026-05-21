import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnimatedStat from '../components/common/AnimatedStat';

export default function Community() {
  useEffect(() => {
    // You can add micro-interactions here if needed later
  }, []);

  return (
    <div className="overflow-x-hidden pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[716px] flex flex-col items-center justify-center text-center px-6 hero-mesh overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-500 rounded-full node-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-primary-400 rounded-full node-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-primary-500 rounded-full node-pulse" style={{ animationDelay: '2s' }}></div>
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg">
            <path d="M100,500 Q250,100 500,500 T900,500" fill="none" stroke="#10b981" strokeWidth="0.5"></path>
            <path d="M50,400 Q300,600 550,200 T950,400" fill="none" stroke="#10b981" strokeWidth="0.5"></path>
          </svg>
        </div>
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-eo-surface-container border border-eo-outline-variant/30 text-primary-500 text-xs font-semibold uppercase tracking-wider mb-6">
            <span className="material-symbols-outlined text-[14px]">language</span>
            A GLOBAL INTELLIGENCE NETWORK
          </div>
          <h1 className="text-4xl md:text-[64px] font-bold leading-[1.1] mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-[var(--text-secondary)]">
            Cultivating the Future, <br/><span className="text-primary-500 italic">Together.</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto mb-10">
            Connect with a world-class ecosystem of regenerative farmers, soil scientists, and AI engineers. Share data, harvest insights, and lead the agricultural revolution.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-primary-500 text-white text-sm font-bold px-8 py-4 rounded-full emerald-glow hover:scale-105 transition-transform cursor-pointer">
              Join the Network
            </button>
            <button className="border border-eo-outline-variant text-[var(--text-primary)] text-sm font-bold px-8 py-4 rounded-full backdrop-blur-sm hover:bg-white/5 transition-colors cursor-pointer">
              Explore Discussions
            </button>
          </div>
        </div>
      </section>

      {/* Community Stats Bar */}
      <section className="max-w-7xl mx-auto px-6 -mt-12 relative z-20">
        <div className="glass-card rounded-2xl p-8 flex flex-wrap justify-around items-center gap-8 shadow-2xl">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-1">
              <AnimatedStat value={12} suffix="k+" />
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-widest font-semibold">Active Farmers</div>
          </div>
          <div className="h-12 w-[1px] bg-eo-outline-variant/30 hidden md:block"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-1">
              <AnimatedStat value={500} suffix="+" />
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-widest font-semibold">Certified Agronomists</div>
          </div>
          <div className="h-12 w-[1px] bg-eo-outline-variant/30 hidden md:block"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-1">
              <AnimatedStat value={85} suffix="%" />
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-widest font-semibold">Yield Improvement</div>
          </div>
          <div className="h-12 w-[1px] bg-eo-outline-variant/30 hidden md:block"></div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-500 mb-1">
              <AnimatedStat value="24/7" />
            </div>
            <div className="text-[10px] md:text-xs text-[var(--text-secondary)] uppercase tracking-widest font-semibold">AI Expert Support</div>
          </div>
        </div>
      </section>

      {/* Featured Discussions */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Live Ecosystem Insights</h2>
            <p className="text-[var(--text-secondary)]">Real-time collaborative troubleshooting from the field.</p>
          </div>
          <button className="text-primary-500 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all cursor-pointer">
            View All Threads <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Discussion Card 1 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-primary-500/10 text-primary-500 rounded text-[10px] font-bold uppercase tracking-wider">Soil Health</span>
              <div className="flex items-center gap-1 text-primary-500 text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Expert Active
              </div>
            </div>
            <h3 className="text-xl font-bold leading-tight text-white mb-4">Optimizing Soil Microbiome in Karnataka's Red Soil</h3>
            <div className="mt-auto flex items-center justify-between border-t border-eo-outline-variant/30 pt-4">
              <div className="flex -space-x-2">
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-eo-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVkSEFw6F6HzJPwNN6LnJxyFml0eNtZNBTJETno3QwfqF-DQN9iwAO2B38ctpeSRsoCoEqXWPmDlj-kS2iSLraAJvdHGrY6j1Mu_FAGWv5n6a6L1h3yPJhG6tudM5TV0-sBmkL71i6nYOUKsWMOnHn45C-OoWEcH0n-gt8is0mS4apXnlono72kUguPecjoODn4ecp7CwRzN66Qdvj1ImfjJLOjYrXRoVrE_KjUAHNTgulLTwRx_nOGdVZE5kmkDwB9inV5MiTTg"/>
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-eo-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCxC6DnQjJIrR7QN1G2kWOgpXevgvgR0SC20Tx1rOPzTmgt_RWMN4zaXsFFKIRED9u4jGwYK1zDIeF_vyyNff0wuZS6f-B5wBOhnhXmZoGFoPTg7po9qvWFsf5W_x3krxbOvwBtJtYdb8UJb475ixS50BERuFAeuIG1JYlz8AfJ0FYqlqq74A2FY-oQnqFyiF5u09OTvM2vPBYUqAAvfeqI4DYL6ShYaDD4MWKbhVJaJAJycHaS6FHZ7Ahrb3jwQfDTH0WasmN2g"/>
                <div className="w-8 h-8 rounded-full border-2 border-eo-bg bg-eo-surface-container flex items-center justify-center text-[10px] font-bold text-[var(--text-secondary)]">+14</div>
              </div>
              <div className="text-[var(--text-secondary)] text-xs font-semibold">42 Replies</div>
            </div>
          </div>
          
          {/* Discussion Card 2 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-teal-400/10 text-teal-400 rounded text-[10px] font-bold uppercase tracking-wider">Precision Tech</span>
              <div className="flex items-center gap-1 text-primary-500 text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                Expert Active
              </div>
            </div>
            <h3 className="text-xl font-bold leading-tight text-white mb-4">Multispectral Drone Missions: Best Practices for Early Blight Detection</h3>
            <div className="mt-auto flex items-center justify-between border-t border-eo-outline-variant/30 pt-4">
              <div className="flex -space-x-2">
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-eo-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAG0wLElSY9RNYBf1Oz8Qea6qRyt74PWaNry9ilftQidLyFflzXLSbBdUxvDGyA0868a7TQ-KVN5bwuz16x2I_SBY2RIyjOhI_qOYll4MQZJQwwf29lzT9eOZiRo96CYrgIYg87fpV_fKsmTZ7xZHWkjRoHl854hYbF1sZX0lkVsU83xuu0NPsmKSHvz-J86HJ9UO9XU5IdyWO_GXkoapfNWcmSWMF_uNwlBGeeYMVvT_XT8PhLZjqGWiKiyktHsNrhxNsyMbG4aA"/>
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-eo-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaLKs5JyAmWJetNFji2sn7D7jwlPY5oQhiQ5ui0p-LMvuD6SnwhXTz-bcxErJYGzparrDoaSX5WNTO6uXfLZRHfKcwZQgsMWYJXdKh05NayugHlGM-f5ExF0wWAaRY9rMhxIOQgimxOSR6CNoE6u5uwIM1pUom1cB784LW8y319q5xGI_Ya2-fQ6fZznFM6-icGhk6MMREqoSqaL68VSaG5p7qM_RQpDqEN3-UUY9ogQFDESNA7lbwxOWsyc2yBaU2DAeZIUlVIQ"/>
                <div className="w-8 h-8 rounded-full border-2 border-eo-bg bg-eo-surface-container flex items-center justify-center text-[10px] font-bold text-[var(--text-secondary)]">+8</div>
              </div>
              <div className="text-[var(--text-secondary)] text-xs font-semibold">18 Replies</div>
            </div>
          </div>
          
          {/* Discussion Card 3 */}
          <div className="glass-card rounded-2xl p-6 flex flex-col h-full hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <span className="px-2 py-1 bg-primary-400/10 text-primary-400 rounded text-[10px] font-bold uppercase tracking-wider">Climate Resilience</span>
              <div className="flex items-center gap-1 text-[var(--text-secondary)] text-[11px] font-bold">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                Just Started
              </div>
            </div>
            <h3 className="text-xl font-bold leading-tight text-white mb-4">Transitioning to Dry-Seeded Rice in Water-Stressed Zones</h3>
            <div className="mt-auto flex items-center justify-between border-t border-eo-outline-variant/30 pt-4">
              <div className="flex -space-x-2">
                <img alt="User" className="w-8 h-8 rounded-full border-2 border-eo-bg" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZgZ32cmVoByyARjAvio2xbDLsCq2MwsWefs6ReH7UunBfLSXNISaauhVOLK7qWWCKiUjKIsRnbknC6qwoId_VIAG0wZyXYHFKiiEYzmUh1vkLwCdvhTBzYa5bJn7jiUxLRcqPqPLFYwjxvsXogA6DfJguj4F72zIPREpqp0YzEUTdSDoloZfN85RSK6l9gETuTg90Arbn9X-ZjtgYHpBBVohBBpD_Kgffvl5ED8f4an9lZaea2Qq1p7C2ETJPi67C_NLYgoY9LQ"/>
                <div className="w-8 h-8 rounded-full border-2 border-eo-bg bg-eo-surface-container flex items-center justify-center text-[10px] font-bold text-[var(--text-secondary)]">+3</div>
              </div>
              <div className="text-[var(--text-secondary)] text-xs font-semibold">5 Replies</div>
            </div>
          </div>
        </div>
      </section>

      {/* Expert Spotlights */}
      <section className="py-24 bg-eo-surface-container-low border-y border-eo-outline-variant/20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Elite Agronomy Council</h2>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto text-lg">Learn from verified professionals who are merging traditional wisdom with AI precision.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Expert 1 */}
            <div className="md:col-span-2 glass-card rounded-3xl overflow-hidden group hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
              <div className="grid md:grid-cols-2 h-full">
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img alt="Expert" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAD06ebSFYCOZmbIJGg0Ugo9pwHtbJ2CEtzN5pmx7pR82iz2Sz1ThMVXoPhYSKVvlxZZAMI45bDZi7cAklEgmBu2yJGf1_X1EOxODgea5RLa-6E9vXj2e2tiJWb_joBeq2YwbLIPA-s3PndPNxfsiVIQo1mz009s81iDXDis6JaIsOxwPk51NVSE9Hn07zIL5vqiUnic5ehcN8l5GMaOLGFJdVuR2Z3cT3r0sfcK8HvmTQRdNHDlEkzDFvgWAOjtWwAIAOEP7TvQg"/>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <div className="text-primary-500 text-[11px] font-bold mb-2 uppercase tracking-widest">Lead Scientist</div>
                  <h4 className="text-2xl font-bold text-white mb-1">Dr. Aris Thorne</h4>
                  <p className="text-[var(--text-secondary)] text-sm mb-6">Pest Management &amp; Biological Control Expert</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="px-2 py-1 bg-eo-surface-container rounded text-xs text-[var(--text-secondary)]">Entomology</span>
                    <span className="px-2 py-1 bg-eo-surface-container rounded text-xs text-[var(--text-secondary)]">AI-Vison</span>
                  </div>
                  <button className="w-full py-3 rounded-xl border border-primary-500/30 text-primary-500 text-sm font-bold hover:bg-primary-500/10 transition-colors cursor-pointer">Connect</button>
                </div>
              </div>
            </div>
            
            {/* Expert 2 */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
              <img alt="Expert" className="w-24 h-24 rounded-full mb-6 border-4 border-primary-500/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUgCi8obCg6CrWuESZXaIGCyHgTW-gAUIGVHP80hfMRI4IROWOCJN7O6FcDAXMU1ol4OTNGrYrOHXtfiN0FxenU4mImFayt-sSyli7xGm-sVjHhNlhTEB-wau7nb8C4ZZHW2mqkjmuLrDGQtnoOe2_MPYK7P1Mlg0YoFCRJcHD8qo6izbsbeMZslI_OdR-9mCUTWN9zHwrC7BgFjqvmzFa12Z_xsCn82oYr34QtWRAE71SW4yFIYClhoD8Y3n3JZPJy6rLOgmFIQ"/>
              <h4 className="text-xl font-bold text-white mb-1">Sarah Jenkins</h4>
              <p className="text-[var(--text-secondary)] text-xs mb-4">Sustainable Irrigation Systems</p>
              <div className="mt-auto">
                <div className="text-sm font-bold text-primary-500 mb-4">150+ Consultations</div>
                <button className="px-6 py-2 rounded-lg bg-eo-surface-container hover:bg-eo-surface-container-highest transition-colors text-sm font-semibold cursor-pointer">View Profile</button>
              </div>
            </div>
            
            {/* Expert 3 */}
            <div className="glass-card rounded-3xl p-8 flex flex-col items-center text-center hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
              <img alt="Expert" className="w-24 h-24 rounded-full mb-6 border-4 border-primary-500/20" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9iIM4uWRIQjAA5y8UP7BjT9sKAvR50PhXRaGqxQvLC1KDkp_HF7cnpuR_MwWQEsO2WbycMzgbrJnYkz8Pmpm16G1MiMbXDIQNO7sbfqIqle3jUEf4p7TTF68VStIRadnSZWnGg6qkRfVheJZlKBjxVtm06LuNkYo05wMvPHpD1E7SMx1WFDUFEKZZox5UO3TEGlDHHco6ulJ4lIbWye9zsdIiZpEtUVW54XoC3wc-fZBlw0YJuBAM_7LFJxkXH-c0QhXXHQArcQ"/>
              <h4 className="text-xl font-bold text-white mb-1">Marcus Vane</h4>
              <p className="text-[var(--text-secondary)] text-xs mb-4">Regenerative Viticulture Specialist</p>
              <div className="mt-auto">
                <div className="text-sm font-bold text-primary-500 mb-4">Expert Contributor</div>
                <button className="px-6 py-2 rounded-lg bg-eo-surface-container hover:bg-eo-surface-container-highest transition-colors text-sm font-semibold cursor-pointer">View Profile</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Library */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-white mb-12">Knowledge Commons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Resource 1 */}
          <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">menu_book</span>
            </div>
            <h5 className="text-lg font-bold text-white mb-2">Soil Restoration Guide</h5>
            <p className="text-[var(--text-secondary)] text-sm mb-4">A data-driven approach to reversing acidification in tropical zones.</p>
            <div className="flex items-center text-primary-500 text-xs font-bold gap-2">
              PDF (4.2 MB) <span className="material-symbols-outlined text-[16px]">download</span>
            </div>
          </div>
          
          {/* Resource 2 */}
          <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-primary-400/10 flex items-center justify-center text-primary-400 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <h5 className="text-lg font-bold text-white mb-2">Case Study: Wheat 2.0</h5>
            <p className="text-[var(--text-secondary)] text-sm mb-4">How AI-assisted nutrient timing increased yield by 22% in Punjab.</p>
            <div className="flex items-center text-primary-500 text-xs font-bold gap-2">
              Case Study <span className="material-symbols-outlined text-[16px]">open_in_new</span>
            </div>
          </div>
          
          {/* Resource 3 */}
          <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-teal-400/10 flex items-center justify-center text-teal-400 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">model_training</span>
            </div>
            <h5 className="text-lg font-bold text-white mb-2">Algorithm Insights</h5>
            <p className="text-[var(--text-secondary)] text-sm mb-4">Understanding the AgroCare AI crop stress detection logic.</p>
            <div className="flex items-center text-primary-500 text-xs font-bold gap-2">
              Technical Paper <span className="material-symbols-outlined text-[16px]">article</span>
            </div>
          </div>
          
          {/* Resource 4 */}
          <div className="glass-card rounded-2xl p-6 group cursor-pointer hover:border-primary-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.1)] transition-all">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined">shield</span>
            </div>
            <h5 className="text-lg font-bold text-white mb-2">Data Privacy Protocol</h5>
            <p className="text-[var(--text-secondary)] text-sm mb-4">Ensuring farm data sovereignty in a shared collaborative network.</p>
            <div className="flex items-center text-primary-500 text-xs font-bold gap-2">
              Read Policy <span className="material-symbols-outlined text-[16px]">verified_user</span>
            </div>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center border-primary-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-[56px] font-bold text-white mb-6 leading-tight">Ready to join the <br/><span className="text-primary-500">Intelligence Revolution?</span></h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-10 text-lg">
              Accelerate your farm's performance with collaborative data. Start your 30-day expert trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/signup">
                <button className="bg-primary-500 text-white text-lg font-bold px-10 py-5 rounded-full emerald-glow hover:scale-105 transition-transform w-full sm:w-auto cursor-pointer">
                  Join the Community Hub
                </button>
              </Link>
              <div className="flex items-center gap-4 text-[var(--text-secondary)] font-medium">
                <span className="text-primary-500 material-symbols-outlined">groups</span>
                <span>Join 12,000+ pioneers</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
