import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CropTrackingContent() {
  const navigate = useNavigate();

  const handleScanClick = (cropId) => {
    navigate(`/dashboard/crops/${cropId}/treatment`);
  };

  return (
    <div className="pt-24 pb-32 md:pb-12 px-gutter md:px-container-margin">
      <div className="max-w-7xl mx-auto space-y-section-gap">
        {/* Section: Tracking Controls & Search */}
        <section className="space-y-6">
          {/* Segmented Control & Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight hidden md:block">My Plants</h2>
            <div className="inline-flex p-1 bg-surface-container-high rounded-xl border border-outline-variant/20 self-start md:self-auto">
              <button className="px-6 py-2 rounded-lg bg-surface-variant text-on-surface font-body-md shadow-sm border border-outline-variant/50 transition-all">Active Tracking</button>
              <button className="px-6 py-2 rounded-lg text-on-surface-variant hover:text-on-surface font-body-md transition-colors">Archive</button>
            </div>
          </div>
          {/* Search & Filters */}
          <div className="flex flex-col xl:flex-row gap-4 xl:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">search</span>
              <input 
                className="w-full pl-12 pr-4 py-3 bg-[#05070A] border border-[#30363D] rounded-xl text-on-surface font-body-md placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary focus:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all duration-300" 
                placeholder="Search crops, batches, or species..." 
                type="text" 
              />
            </div>
            {/* Filters */}
            <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1 pt-1 -mx-gutter px-gutter xl:mx-0 xl:px-0">
              <button className="shrink-0 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/30 font-label-sm">All</button>
              <button className="shrink-0 px-4 py-2 rounded-full bg-transparent text-on-surface-variant border border-outline-variant hover:border-primary/50 hover:text-on-surface transition-colors font-label-sm">Indoor</button>
              <button className="shrink-0 px-4 py-2 rounded-full bg-transparent text-on-surface-variant border border-outline-variant hover:border-primary/50 hover:text-on-surface transition-colors font-label-sm">Hydroponic</button>
              <button className="shrink-0 px-4 py-2 rounded-full bg-transparent text-on-surface-variant border border-outline-variant hover:border-primary/50 hover:text-on-surface transition-colors font-label-sm">Sector A</button>
            </div>
          </div>
        </section>

        {/* Section: Crop Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <article className="glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-500 flex flex-col cursor-pointer border hover:border-primary/40 relative">
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden bg-surface-container-lowest">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC-hsvSn22mbzctR5RyRYGrUJzPuFcBKb4srEf77n1p3mptLc_2TYoHDFzVrNEin7ZXHVmzW7BQZ8sUAHCzbghPQLtQb96yqiN2xYKhwbEPUgt8cwESi7mkwxZWTNAdVRzOjGnrV71AVzO6pvAo5ps2KeZBsfXFilV-mOayQpZPy_Sy2qyeeGnabG1VnWG-zBEMnii9gFxj96tIUZfz8s5y27QcTFT6of2al7KAJ0aaQXWYorNhqU_cxT4j_Ht3ktV8EBtCT2fSCw" 
                  alt="Monstera Deliciosa" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent"></div>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-surface/80 backdrop-blur-md rounded-full border border-primary/30 flex items-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></div>
                  <span className="font-label-sm text-primary font-bold">Health: 98%</span>
                </div>
              </div>
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-on-surface-variant/70 font-label-sm uppercase tracking-wider mb-1 block">Batch A-01 • Indoor</span>
                    <h3 className="font-headline-lg-mobile text-[24px] text-on-surface font-semibold">Monstera Deliciosa</h3>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="h-px w-full bg-outline-variant/30"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">water_drop</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface-variant">Next Water</span>
                        <span className="font-body-md text-on-surface">In 2 days</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface-variant">Last Scan</span>
                        <span className="font-body-md text-on-surface">Today, 09:41</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-sm text-on-surface-variant">Health Progress</span>
                      <span className="text-[10px] text-primary">+2.4%</span>
                    </div>
                    <div className="h-12 w-full flex items-end space-x-[2px]">
                      <div className="flex-1 bg-primary/20 h-[40%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-[60%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/30 h-[55%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/40 h-[75%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/50 h-[85%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/60 h-[80%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary h-[98%] rounded-t-sm shadow-[0_0_10px_rgba(78,222,163,0.3)]"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-primary font-label-sm transition-colors">Log Water</button>
                    <button onClick={(e) => { e.stopPropagation(); handleScanClick('A-01'); }} className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:brightness-110 transition-all">Scan Now</button>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 2 */}
            <article className="glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-500 flex flex-col cursor-pointer border hover:border-primary/40 relative">
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden bg-surface-container-lowest">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtHaoe1AUxDSwyrN_GzCdQFOOGvw_xfU_x7eZQ7WuKLPSdwbl0jpe2uaWPC1PsuWayG7EZS7U9U1UjUG0RAPWPsEEU7DzNBboOCeBOld54UvC7INPJgKsLK-iBueDn53byJcMJuzUYN0JVbi-Wh1gCiNVklip0juAhGoCF-qKwf6Pwsi9naRRXtlZnKKYBlcd_t1Oi0g0wcw6y2JOWRQAjN5uQKFNPb2EeBH67lamTeg04uHDnsOb57pIK6a5554muL8T3RvX51Q" 
                  alt="Cherry Tomatoes" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent"></div>
                {/* Status Badge (Warning) */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-surface/80 backdrop-blur-md rounded-full border border-amber-500/30 flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <span className="font-label-sm text-amber-500 font-bold">Health: 72%</span>
                </div>
              </div>
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-on-surface-variant/70 font-label-sm uppercase tracking-wider mb-1 block">Batch T-44 • Hydroponics</span>
                    <h3 className="font-headline-lg-mobile text-[24px] text-on-surface font-semibold">Cherry Tomatoes</h3>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="h-px w-full bg-outline-variant/30"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-amber-500">
                        <span className="material-symbols-outlined text-[18px]">priority_high</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface-variant">Action Req.</span>
                        <span className="font-body-md text-amber-500 font-bold">Urgent Water</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface-variant">Last Scan</span>
                        <span className="font-body-md text-on-surface">2 days ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-sm text-on-surface-variant">Health Progress</span>
                      <span className="text-[10px] text-amber-500">-12.8%</span>
                    </div>
                    <div className="h-12 w-full flex items-end space-x-[2px]">
                      <div className="flex-1 bg-amber-500/60 h-[85%] rounded-t-sm"></div>
                      <div className="flex-1 bg-amber-500/50 h-[80%] rounded-t-sm"></div>
                      <div className="flex-1 bg-amber-500/40 h-[75%] rounded-t-sm"></div>
                      <div className="flex-1 bg-amber-500/30 h-[70%] rounded-t-sm"></div>
                      <div className="flex-1 bg-amber-500/20 h-[65%] rounded-t-sm"></div>
                      <div className="flex-1 bg-amber-500/10 h-[60%] rounded-t-sm"></div>
                      <div className="flex-1 bg-amber-500 h-[72%] rounded-t-sm shadow-[0_0_10px_rgba(245,158,11,0.3)]"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-amber-500 text-white rounded-lg font-label-sm hover:brightness-110 transition-all">Log Water</button>
                    <button onClick={(e) => { e.stopPropagation(); handleScanClick('T-44'); }} className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-primary font-label-sm transition-colors">Scan Now</button>
                  </div>
                </div>
              </div>
            </article>

            {/* Card 3 */}
            <article className="glass-panel rounded-2xl overflow-hidden group hover:shadow-[0_0_30px_rgba(16,185,129,0.05)] transition-all duration-500 flex flex-col cursor-pointer border hover:border-primary/40 relative">
              {/* Image Area */}
              <div className="relative h-56 overflow-hidden bg-surface-container-lowest">
                <img 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100 filter grayscale-[20%]" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVfkEs6APLr7dvofIUgUzdcVpkBYVaV8VePNl6TtQh3R4K6eDgUo9STAm3tZzchI1qMZERx-200_WdkW6sbryewFCQcHZ0Mqa4mVoSzKECuhQGARqfqdcCm1l-NgZnV1zSz8GUyk5NfCLO4NVItkKzEWNWoYl66JmFmt_94h6Gu79hrikVIkyxkL8C83UqIvM3oMzqHfiypWqPXcDCUwD0Y_8ID9h32W4OfhdNxwJHkDJolYlHjm3g5fDpMIIA1XG8IjcBrGFaOg" 
                  alt="Microgreens Mix" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent"></div>
                {/* Status Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-surface/80 backdrop-blur-md rounded-full border border-primary/30 flex items-center shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                  <div className="w-2 h-2 rounded-full bg-primary mr-2"></div>
                  <span className="font-label-sm text-primary font-bold">Health: 95%</span>
                </div>
              </div>
              {/* Content Area */}
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-on-surface-variant/70 font-label-sm uppercase tracking-wider mb-1 block">Batch G-12 • Greenhouse</span>
                    <h3 className="font-headline-lg-mobile text-[24px] text-on-surface font-semibold">Microgreens Mix</h3>
                  </div>
                  <button className="text-on-surface-variant hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
                <div className="mt-auto space-y-4">
                  <div className="h-px w-full bg-outline-variant/30"></div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[18px]">sync</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface-variant">Next Water</span>
                        <span className="font-body-md text-on-surface">Automated</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-tertiary">
                        <span className="material-symbols-outlined text-[18px]">history</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-on-surface-variant">Last Scan</span>
                        <span className="font-body-md text-on-surface">1h ago</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-label-sm text-on-surface-variant">Health Progress</span>
                      <span className="text-[10px] text-primary">Stable</span>
                    </div>
                    <div className="h-12 w-full flex items-end space-x-[2px]">
                      <div className="flex-1 bg-primary/20 h-[92%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-[95%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-[94%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-[95%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-[96%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary/20 h-[95%] rounded-t-sm"></div>
                      <div className="flex-1 bg-primary h-[95%] rounded-t-sm shadow-[0_0_10px_rgba(78,222,163,0.3)]"></div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-lg text-primary font-label-sm transition-colors">View Logs</button>
                    <button onClick={(e) => { e.stopPropagation(); handleScanClick('G-12'); }} className="flex-1 py-2 bg-primary text-on-primary rounded-lg font-label-sm hover:brightness-110 transition-all">Scan Now</button>
                  </div>
                </div>
              </div>
            </article>

          </div>
        </section>
      </div>
    </div>
  );
}
