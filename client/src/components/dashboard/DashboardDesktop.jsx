import React from 'react';

export default function DashboardDesktop() {
  return (
    <div className="pt-24 pb-12 px-container-margin max-w-7xl mx-auto space-y-6 flex flex-col gap-gutter md:gap-container-margin h-full">
          {/* Page Header */}
          <header className="mb-4 md:mb-8 hidden md:flex justify-between items-end">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Farm Operations</h1>
              <p className="font-body-md text-body-md text-on-surface-variant">Real-time health telemetry and environmental conditions.</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="glass-panel text-on-surface px-6 py-3 rounded-full font-label-sm text-label-sm uppercase tracking-widest hover:bg-surface-variant transition-all duration-300 flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Filter Data
              </button>
              <button className="bg-primary text-on-primary-fixed px-6 py-3 rounded-full font-label-sm text-label-sm uppercase tracking-widest font-bold hover:bg-primary-fixed transition-all duration-300 flex items-center gap-2 glow-primary">
                <span className="material-symbols-outlined text-[18px] icon-fill">add</span>
                New Batch
              </button>
            </div>
          </header>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter md:gap-container-margin">
            {/* Plant Health Overview Widget */}
            <section className="md:col-span-8 glass-panel rounded-2xl p-6 md:p-8 relative overflow-hidden group animate-fade-in-up">
              {/* Decorative background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
              <div className="flex justify-between items-start mb-8 relative z-10">
                <div>
                  <h2 className="font-body-md text-body-md text-on-surface-variant uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_theme(colors.primary.DEFAULT)]"></span>
                    System Status
                  </h2>
                  <h3 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface">Optimal Health</h3>
                </div>
                <div className="bg-surface-container-high border border-outline-variant rounded-xl p-3 flex flex-col items-center justify-center min-w-[80px]">
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary font-bold">98%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">VITALITY</span>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                {/* Metric Card 1 */}
                <div className="bg-surface-container/50 border border-outline-variant/50 rounded-xl p-4 hover:border-primary/30 transition-colors duration-300">
                  <span className="material-symbols-outlined text-outline mb-2">water_drop</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Soil Moisture</div>
                  <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">42%</div>
                  <div className="w-full bg-surface-variant h-1 mt-3 rounded-full overflow-hidden">
                    <div className="bg-primary h-full w-[42%] rounded-full"></div>
                  </div>
                </div>
                {/* Metric Card 2 */}
                <div className="bg-surface-container/50 border border-outline-variant/50 rounded-xl p-4 hover:border-primary/30 transition-colors duration-300">
                  <span className="material-symbols-outlined text-outline mb-2">light_mode</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Light Exposure</div>
                  <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">8.4k</div>
                  <div className="font-label-sm text-label-sm text-primary mt-1 flex items-center">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +2% today
                  </div>
                </div>
                {/* Metric Card 3 */}
                <div className="bg-surface-container/50 border border-outline-variant/50 rounded-xl p-4 hover:border-primary/30 transition-colors duration-300">
                  <span className="material-symbols-outlined text-outline mb-2">science</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Nutrient Level</div>
                  <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">High</div>
                  <div className="font-label-sm text-label-sm text-outline mt-1">N-P-K Balanced</div>
                </div>
                {/* Metric Card 4 */}
                <div className="bg-surface-container/50 border border-outline-variant/50 rounded-xl p-4 hover:border-primary/30 transition-colors duration-300">
                  <span className="material-symbols-outlined text-outline mb-2">pest_control</span>
                  <div className="font-label-sm text-label-sm text-on-surface-variant mb-1">Pest Risk</div>
                  <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Low</div>
                  <div className="font-label-sm text-label-sm text-outline mt-1">Scan clean 2h ago</div>
                </div>
              </div>
            </section>

            {/* Weather Intelligence Mini-Widget */}
            <section className="md:col-span-4 bg-surface-container border border-outline-variant rounded-2xl p-6 md:p-8 flex flex-col justify-between relative overflow-hidden glass-panel animate-fade-in-up">
              <div className="flex justify-between items-start mb-6">
                <h2 className="font-body-md text-body-md text-on-surface-variant uppercase tracking-widest flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">satellite_alt</span>
                  Local Climate
                </h2>
                <span className="material-symbols-outlined text-primary text-[32px] icon-fill">partly_cloudy_day</span>
              </div>
              <div className="mt-auto">
                <div className="font-display-lg text-display-lg text-on-surface mb-2">24°</div>
                <div className="font-body-md text-body-md text-on-surface-variant mb-6">Partly cloudy. Optimal conditions for indoor cultivation. High humidity expected tonight.</div>
                <div className="flex items-center gap-3 pt-4 border-t border-outline-variant/50">
                  <span className="material-symbols-outlined text-primary">eco</span>
                  <span className="font-label-sm text-label-sm text-on-surface">HVAC System running efficiently</span>
                </div>
              </div>
            </section>

            {/* My Plants Horizontal Scroll */}
            <section className="md:col-span-12 py-2">
              <div className="flex justify-between items-end mb-6">
                <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface">Active Inventory</h2>
                <a className="font-label-sm text-label-sm text-primary uppercase tracking-widest hover:text-primary-fixed transition-colors flex items-center gap-1" href="#">
                  View All <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar gap-4 md:gap-6 pb-4 -mx-gutter md:mx-0 px-gutter md:px-0">
                {/* Plant Card 1 */}
                <div className="shrink-0 w-[240px] md:w-[280px] bg-surface-container rounded-2xl overflow-hidden border border-outline-variant group cursor-pointer hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/5 glass-panel animate-fade-in-up">
                  <div className="h-48 relative overflow-hidden">
                    <img alt="Plant Image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCS5a5-i4X3ej2rB3fJvnPZke7Na-HZwBWpJd38jVXvqpR3mm9VGVSxtVaiYetKdCkiBG9wwaqLPGHXA9ybMNDYBxYduKI0etbTkDtL7OQKKWuMB7Aj85k2Xk9Y0gQgN2suYmavYLNRUzYVQxD7SFxvF1BP7vnKNa8SX2cA5mFOPGN2Bw4gg7ro0WE13u_CTo-Hn0NK3KCjmmhJknuNG-DmWcyNjI-fNYEaJJU3LvmHt123TiSEVnPX4-NyyoQcSxUtCgaEcDhRrA" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-primary-container/90 backdrop-blur-sm text-on-primary-container px-3 py-1 rounded-full font-label-sm text-label-sm font-medium flex items-center gap-1 border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Healthy
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest">Sector A-12</div>
                    <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-3">Monstera Deliciosa</h3>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                      <span className="font-label-sm text-label-sm text-outline">Planted 42 days ago</span>
                      <button className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plant Card 2 */}
                <div className="shrink-0 w-[240px] md:w-[280px] bg-surface-container rounded-2xl overflow-hidden border border-outline-variant group cursor-pointer hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/5 glass-panel animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                  <div className="h-48 relative overflow-hidden">
                    <img alt="Plant Image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWNpPwOpt-dlq8TqwL14RuMX_8KcC8yQaUDZp1HuNY5HlK1ri41OTXe-_k41tqK4B_kkcMOiljXxoOF1CzPpR8GdpFUszSRGQTvzLQfqQ_il1L-mebLb3NYlrEj96o8mscER213ymlmuyqla2i2N2yk9RxqhHsxCbxh2mid4K4Mqo9AWXPfyP823AeGWpiF2R8WxDn68e7Gg9ezO73jtXv-_YeUiyIcthQI-KxX4t6146JA4HhgzYYpDD0w8qyQEftXg7N0y-qQQ" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-surface-variant/90 backdrop-blur-sm text-on-surface-variant px-3 py-1 rounded-full font-label-sm text-label-sm font-medium flex items-center gap-1 border border-outline-variant">
                      <span className="material-symbols-outlined text-[14px]">water_drop</span>
                      Needs Water
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest">Sector B-04</div>
                    <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-3">Genovese Basil (Hydro)</h3>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                      <span className="font-label-sm text-label-sm text-outline">Planted 14 days ago</span>
                      <button className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Plant Card 3 */}
                <div className="shrink-0 w-[240px] md:w-[280px] bg-surface-container rounded-2xl overflow-hidden border border-outline-variant group cursor-pointer hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/5 glass-panel animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                  <div className="h-48 relative overflow-hidden">
                    <img alt="Plant Image" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDiQPC-DjRkVdsHoap_f5sHk1RV7q8racBrlV4WJaaEygdnF14bRBauPcHFjAFbfIieQr-zavt8bARAyXlGa1wFtkhlS6udvHd7bc9vXKZx9kAsx8XaZv1i651pKhKYOGltO-rIoFKPp6TqgFoSS2HClp9o_u-q4ETNt2jfEnNOD6vNjLRkXVxDwPg1A-fQ_p4ZaNg_i5Miv9vDHO62apFyCmd-zAOTfBO4zCscVVLssbjA1Aw5ujESu0kkul0iWeVqcsq-UYYGA" />
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-primary-container/90 backdrop-blur-sm text-on-primary-container px-3 py-1 rounded-full font-label-sm text-label-sm font-medium flex items-center gap-1 border border-primary/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                      Healthy
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="font-label-sm text-label-sm text-on-surface-variant mb-1 uppercase tracking-widest">Desk Unit 1</div>
                    <h3 className="font-body-md text-body-md text-on-surface font-semibold mb-3">Echeveria Elegans</h3>
                    <div className="flex justify-between items-center pt-3 border-t border-outline-variant/30">
                      <span className="font-label-sm text-label-sm text-outline">Planted 120 days ago</span>
                      <button className="w-8 h-8 rounded-full bg-surface-variant flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors">
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Recommendations List */}
            <section className="md:col-span-12 glass-panel rounded-2xl p-6 md:p-8 mt-4 animate-fade-in-up">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <span className="material-symbols-outlined text-primary">auto_awesome</span>
                </div>
                <div>
                  <h2 className="font-body-md text-body-md text-on-surface font-semibold">AI Insights &amp; Actions</h2>
                  <p className="font-label-sm text-label-sm text-on-surface-variant">Generated from real-time telemetry.</p>
                </div>
              </div>
              <div className="space-y-3">
                {/* Action Item 1 */}
                <div className="flex items-start md:items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:bg-surface-container transition-colors flex-col md:flex-row gap-4">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-secondary mt-1 md:mt-0">opacity</span>
                    <div>
                      <h4 className="font-body-md text-body-md text-on-surface mb-1">Adjust Irrigation Schedule</h4>
                      <p className="font-label-sm text-label-sm text-outline">Soil moisture in Sector B is drying faster than predicted due to HVAC activity. Increase watering duration by 15%.</p>
                    </div>
                  </div>
                  <button className="shrink-0 w-full md:w-auto px-6 py-2 rounded-lg border border-secondary text-secondary hover:bg-secondary/10 transition-colors font-label-sm text-label-sm uppercase tracking-wider font-medium">
                    Apply Fix
                  </button>
                </div>
                {/* Action Item 2 */}
                <div className="flex items-start md:items-center justify-between p-4 rounded-xl bg-surface-container/50 border border-outline-variant/50 hover:bg-surface-container transition-colors flex-col md:flex-row gap-4">
                  <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-outline mt-1 md:mt-0">energy_savings_leaf</span>
                    <div>
                      <h4 className="font-body-md text-body-md text-on-surface mb-1">Optimize Light Spectrum</h4>
                      <p className="font-label-sm text-label-sm text-outline">Transitioning Sector A to fruiting stage. Switch LED arrays to warmer spectrum profile.</p>
                    </div>
                  </div>
                  <button className="shrink-0 w-full md:w-auto px-6 py-2 rounded-lg border border-outline-variant text-on-surface-variant hover:bg-surface-variant transition-colors font-label-sm text-label-sm uppercase tracking-wider font-medium">
                    Review
                  </button>
                </div>
              </div>
            </section>
          </div>
    </div>
  );
}
