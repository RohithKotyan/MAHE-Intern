import React from 'react';

export default function MetricsGrid() {
  return (
    <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 snap-x snap-mandatory hide-scrollbar pb-2 -mx-container-margin px-container-margin md:mx-0 md:px-0 md:pb-0">
      {/* Metric 1: Total Scans */}
      <div className="min-w-[260px] md:min-w-0 flex-1 glass-panel p-5 rounded-2xl relative overflow-hidden group snap-center shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/20 transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 text-on-surface-variant group-hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
          </div>
          <h3 className="font-label-md text-sm text-on-surface-variant font-medium">Total Scans</h3>
        </div>
        <div className="flex items-end gap-3">
          <span className="font-display-md text-3xl font-bold text-on-surface">342</span>
          <span className="font-label-sm text-xs text-primary flex items-center mb-1 bg-primary/10 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            12%
          </span>
        </div>
        <p className="font-label-sm text-xs text-outline mt-2">vs last 30 days</p>
      </div>

      {/* Metric 2: Farm Health Score */}
      <div className="min-w-[260px] md:min-w-0 flex-1 glass-panel p-5 rounded-2xl relative overflow-hidden group border-primary/20 shadow-[0_0_15px_rgba(16,185,129,0.05)] snap-center shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/30 transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 text-primary">
            <span className="material-symbols-outlined text-[20px] icon-fill">favorite</span>
          </div>
          <h3 className="font-label-md text-sm text-on-surface-variant font-medium">Farm Health Score</h3>
        </div>
        <div className="flex items-end gap-3">
          <span className="font-display-md text-3xl font-bold text-on-surface">87<span className="text-xl text-on-surface-variant">/100</span></span>
          <span className="font-label-sm text-xs text-primary flex items-center mb-1 bg-primary/10 px-2 py-0.5 rounded-full">
            <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
            4%
          </span>
        </div>
        <div className="w-full h-1.5 bg-surface-container-highest rounded-full mt-3 overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-secondary w-[87%] rounded-full shadow-[0_0_10px_theme(colors.primary.DEFAULT)]"></div>
        </div>
      </div>

      {/* Metric 3: Disease Cases Detected */}
      <div className="min-w-[260px] md:min-w-0 flex-1 glass-panel p-5 rounded-2xl relative overflow-hidden group snap-center shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-error/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-error/20 transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 text-error">
            <span className="material-symbols-outlined text-[20px]">coronavirus</span>
          </div>
          <h3 className="font-label-md text-sm text-on-surface-variant font-medium">Detected Cases</h3>
        </div>
        <div className="flex items-end gap-3 mb-2">
          <span className="font-display-md text-3xl font-bold text-on-surface">25</span>
        </div>
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-outline flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-error"></span> Early Blight</span>
            <span className="text-on-surface font-medium">12</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-outline flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary"></span> Leaf Spot</span>
            <span className="text-on-surface font-medium">8</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-outline flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning"></span> Other</span>
            <span className="text-on-surface font-medium">5</span>
          </div>
        </div>
      </div>

      {/* Metric 4: Recovered Plants */}
      <div className="min-w-[260px] md:min-w-0 flex-1 glass-panel p-5 rounded-2xl relative overflow-hidden group snap-center shrink-0">
        <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-[40px] -translate-y-1/2 translate-x-1/2 group-hover:bg-secondary/20 transition-all duration-500"></div>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 text-secondary">
            <span className="material-symbols-outlined text-[20px]">healing</span>
          </div>
          <h3 className="font-label-md text-sm text-on-surface-variant font-medium">Recovered Plants</h3>
        </div>
        <div className="flex items-end gap-3">
          <span className="font-display-md text-3xl font-bold text-on-surface">18</span>
        </div>
        <p className="font-label-sm text-xs text-outline mt-2 leading-relaxed">
          Plants successfully rehabilitated following AI treatment plans this month.
        </p>
      </div>

    </div>
  );
}
