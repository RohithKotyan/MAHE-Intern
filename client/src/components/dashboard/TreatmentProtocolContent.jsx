import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function TreatmentProtocolContent() {
  const { cropId } = useParams();

  return (
    <div className="pt-6 pb-32 md:pb-12 px-container-margin max-w-7xl mx-auto space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 text-primary/80 mb-2 font-label-sm">
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <Link to="/dashboard/crops" className="hover:text-primary">Back to My Plants</Link>
          </div>
          <h2 className="font-display-lg text-[32px] md:text-display-lg text-on-surface flex flex-col sm:flex-row items-start sm:items-center gap-4">
            Treatment Protocol
            <span className="px-3 py-1 rounded-full bg-error-container/20 text-error border border-error/30 text-sm font-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              Action Required
            </span>
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg border border-[#30363d] bg-transparent text-on-surface hover:border-primary hover:bg-primary/5 font-label-sm transition-all flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">share</span>
            Share
          </button>
          <button className="px-4 py-2 rounded-lg bg-primary-container text-white font-label-sm flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all">
            <span className="material-symbols-outlined text-[18px]">print</span>
            Print Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Content Left */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Diagnosis Hero Card */}
          <div className="glass-card rounded-xl p-6 relative overflow-hidden atmospheric-glow">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3 aspect-square rounded-lg border border-outline-variant/30 overflow-hidden relative">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAWYn2GkCOt4QCAxTigPMHun4E5kIzG1Ovw_xD0TQMY2A0nwpGSAhrz_jzHkJR52q4OKXyUPdaqmuHM6xW2tk7y6824iNNGVa_bTFOTZhxMVB3EJjP1jzT5bnVkjL2TdQNy5zVrTI-flM9Q8dhFtUhl6unr1lwwS9fP66irPWPXO1SEUNWzQq4pPSdBvn5pgwgn_WA6C5zKwAYBZJOwqp0Fqrmk6jtr7WlPNLP1bcqS94PpeViN4I5nEbsFPDt8qlmoTfhfVOOtZQ" 
                  alt="Chlorosis on Monstera Deliciosa leaf" 
                />
                <div className="absolute bottom-2 right-2 bg-surface/80 backdrop-blur px-2 py-1 rounded text-xs font-label-sm border border-outline-variant/50 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-primary">center_focus_strong</span>
                  AI Scanned
                </div>
              </div>
              <div className="flex-1 flex flex-col justify-between z-10">
                <div>
                  <h3 className="font-headline-lg text-[24px] text-on-surface mb-1">Monstera Deliciosa {cropId && `(${cropId})`}</h3>
                  <p className="text-error font-body-md mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px]">coronavirus</span>
                    Primary Diagnosis: Potassium Deficiency (Chlorosis)
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-surface-container-high/50 p-3 rounded-lg border border-outline-variant/10">
                      <div className="text-on-surface-variant font-label-sm mb-1">Confidence Score</div>
                      <div className="text-2xl font-bold text-primary text-glow">94.8%</div>
                    </div>
                    <div className="bg-surface-container-high/50 p-3 rounded-lg border border-outline-variant/10">
                      <div className="text-on-surface-variant font-label-sm mb-1">Severity Level</div>
                      <div className="text-lg font-bold text-error">Moderate</div>
                    </div>
                  </div>
                </div>
                <div className="bg-surface-container-high/30 p-4 rounded-lg border border-primary/20 relative overflow-hidden">
                  <div className="absolute left-0 top-0 w-1 h-full bg-primary shadow-[0_0_10px_rgba(78,222,163,0.8)]"></div>
                  <p className="font-body-md text-sm text-on-surface-variant leading-relaxed pl-2">
                    <span className="text-primary font-semibold">AI Rationale:</span> The distinct pattern of interveinal yellowing originating at the leaf margins strongly indicates a systemic Potassium (K) deficiency. This is likely exacerbated by recorded low localized humidity (42%) limiting transpiration rates and nutrient uptake from the root zone. Immediate intervention recommended to prevent necrosis.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Granular Data Charts */}
          <div className="glass-card rounded-xl p-6">
            <h4 className="font-body-md font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">bar_chart</span>
              Biometric Telemetry
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* NPK Gauges */}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-label-sm mb-1">
                    <span className="text-on-surface-variant">Nitrogen (N)</span>
                    <span className="text-primary">Optimal (65 ppm)</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden border border-[#30363d]">
                    <div className="h-full bg-primary w-[65%] shadow-[0_0_10px_rgba(78,222,163,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-label-sm mb-1">
                    <span className="text-on-surface-variant">Phosphorus (P)</span>
                    <span className="text-primary">Optimal (40 ppm)</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden border border-[#30363d]">
                    <div className="h-full bg-primary w-[55%] shadow-[0_0_10px_rgba(78,222,163,0.5)]"></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs font-label-sm mb-1">
                    <span className="text-on-surface-variant text-error">Potassium (K)</span>
                    <span className="text-error">Critical Low (12 ppm)</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest rounded-full overflow-hidden border border-[#30363d]">
                    <div className="h-full bg-error w-[15%] shadow-[0_0_10px_rgba(255,180,171,0.5)] relative">
                      <div className="absolute right-0 top-0 bottom-0 w-1 bg-white animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Environment Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="border border-[#30363d] rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden bg-[#05070a]/50">
                  <span className="material-symbols-outlined text-secondary mb-1">water_drop</span>
                  <span className="text-xl font-bold text-on-surface">42%</span>
                  <span className="text-xs text-on-surface-variant font-label-sm">Soil Moisture</span>
                </div>
                <div className="border border-[#30363d] rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden bg-[#05070a]/50">
                  <span className="material-symbols-outlined text-tertiary mb-1">light_mode</span>
                  <span className="text-xl font-bold text-on-surface">6.2h</span>
                  <span className="text-xs text-on-surface-variant font-label-sm">Daily DLI</span>
                </div>
                <div className="border border-[#30363d] rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden bg-[#05070a]/50">
                  <span className="material-symbols-outlined text-primary mb-1">device_thermostat</span>
                  <span className="text-xl font-bold text-on-surface">24°C</span>
                  <span className="text-xs text-on-surface-variant font-label-sm">Temp avg</span>
                </div>
                <div className="border border-error/50 rounded-lg p-3 flex flex-col items-center justify-center relative overflow-hidden bg-error/5">
                  <span className="material-symbols-outlined text-error mb-1">air</span>
                  <span className="text-xl font-bold text-error">42%</span>
                  <span className="text-xs text-error font-label-sm">RH (Low)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Content Right */}
        <div className="lg:col-span-4 space-y-6">
          {/* Protocol Validation */}
          <div className="glass-card rounded-xl p-6 border-t-primary/50">
            <h4 className="font-body-md font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">verified_user</span>
              Protocol Validation
            </h4>
            <div className="bg-[#05070a] rounded-lg p-4 mb-4 border border-[#30363d]">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  className="w-10 h-10 rounded-full border border-primary/30" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBV9dEPblfW96w-pu-ex_fDiQO7ti7tyA_OJdhv8iwmEHScH1Vkjx6mqk4A3UmHxcSafIUS96vfjkBbfMMfG4C-DhEVCplnt8YK0Uu9OkM5q8FxPxgvFtlk9NXf-93vQC-mYpoOkczE90LVaIgJj4RW7L6U5jCrN4-9nB7nrmRgdLh7XWAEjh-tmh4NNG9wlSNyMzUiGotYoaaR9XwE8ktE3n1hqg4I5rV8uIPL8p_22pEz8A2-TBrdhQRpUVc8c4YkaWifygEboA" 
                  alt="Dr. Aris Thorne" 
                />
                <div>
                  <div className="text-sm font-semibold text-on-surface">Dr. Aris Thorne</div>
                  <div className="text-[10px] font-label-sm text-primary">Lead Agronomist</div>
                </div>
              </div>
              <p className="text-xs text-on-surface-variant italic mb-0">
                "The AI has correctly identified the K-deficiency pattern. Ensure the foliar spray in Phase 2 is applied post-dusk to prevent phytotoxicity."
              </p>
            </div>
            <button className="w-full py-2 bg-transparent border border-outline-variant rounded-lg text-on-surface-variant font-label-sm hover:border-primary hover:text-primary transition-colors flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[16px]">chat</span>
              Message Expert
            </button>
          </div>

          {/* Recovery Forecast */}
          <div className="glass-card rounded-xl p-6">
            <h4 className="font-body-md font-semibold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">trending_up</span>
              Recovery Forecast
            </h4>
            
            {/* Simple CSS Chart Representation */}
            <div className="relative h-32 mb-4 mt-6 border-b border-l border-outline-variant/30 px-2 pb-2">
              {/* Curve implementation using SVG */}
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Gradient Fill */}
                <defs>
                  <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(16, 185, 129, 0.4)" />
                    <stop offset="100%" stopColor="rgba(16, 185, 129, 0.0)" />
                  </linearGradient>
                </defs>
                <path d="M0,90 Q30,85 50,50 T100,10 L100,100 L0,100 Z" fill="url(#chartFill)" />
                <path className="progress-ring" d="M0,90 Q30,85 50,50 T100,10" fill="none" stroke="#4edea3" strokeWidth="3" strokeLinecap="round" />
                <circle cx="50" cy="50" r="3" fill="#4edea3" className="atmospheric-glow" />
              </svg>
            </div>
            
            <div className="flex justify-between text-[10px] font-label-sm text-on-surface-variant mb-4">
              <span>Day 0</span>
              <span className="text-primary">Day 7 (Est)</span>
              <span>Day 14</span>
            </div>
            
            <div className="bg-surface-container-highest p-3 rounded-lg border border-outline-variant/20">
              <p className="text-xs text-on-surface text-center">
                Expected return to optimal health metrics by <span className="text-primary font-bold">Day 14</span>. Chlorosis should halt progression within 48h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
