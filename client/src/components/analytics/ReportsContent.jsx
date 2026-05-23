import React from 'react';
import MetricsGrid from './MetricsGrid';
import ChartsWidgets from './ChartsWidgets';
import ActivityHeatmap from './ActivityHeatmap';

export default function ReportsContent() {
  return (
    <div className="pt-20 pb-12 px-container-margin max-w-7xl mx-auto flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      
      {/* Page Header */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 relative z-20">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Reports & Analytics</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Comprehensive insights into farm health and AI activity.</p>
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          {/* Time Range Selector */}
          <div className="bg-surface-container border border-outline-variant/50 rounded-lg p-1 flex relative z-30">
            <button className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors bg-surface-container-high text-on-surface shadow-sm">
              30 Days
            </button>
            <button className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50">
              Season
            </button>
            <button className="px-4 py-1.5 rounded-md text-sm font-medium transition-colors text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50">
              All Time
            </button>
          </div>
          
          {/* Export Button */}
          <button className="hidden md:flex bg-primary text-on-primary-fixed px-4 py-2 rounded-lg font-label-sm text-sm font-semibold hover:bg-primary-fixed transition-colors items-center gap-2 glow-primary relative z-30">
            <span className="material-symbols-outlined text-[18px]">download</span>
            Export PDF
          </button>
        </div>
      </header>

      {/* KPI Metrics */}
      <MetricsGrid />

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ChartsWidgets type="healthTrend" />
        </div>
        <div className="lg:col-span-1 space-y-6">
          <ChartsWidgets type="diseaseDistribution" />
          <ChartsWidgets type="sectorPerformance" />
        </div>
      </div>

      {/* Activity Heatmap */}
      <ActivityHeatmap />

      {/* Automated Reports Table */}
      <section className="glass-panel rounded-2xl border border-outline-variant/30 overflow-hidden">
        <div className="p-6 border-b border-outline-variant/30 bg-surface-container/30">
          <h2 className="font-headline-sm text-lg font-semibold text-on-surface">Automated Reports</h2>
          <p className="text-sm text-on-surface-variant mt-1">Generated weekly based on your scan activity.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container/20 text-xs uppercase tracking-wider text-on-surface-variant font-medium">
                <th className="px-6 py-4">Report Name</th>
                <th className="px-6 py-4">Date Generated</th>
                <th className="px-6 py-4">Key Insight</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/20 text-sm text-on-surface">
              {[
                { id: 1, name: 'Weekly Health Summary', date: 'May 18, 2026', insight: 'Blight risk decreased by 12% in Sector B' },
                { id: 2, name: 'Nutrient Analysis', date: 'May 11, 2026', insight: 'Nitrogen levels optimal across all sectors' },
                { id: 3, name: 'Monthly Overview', date: 'May 01, 2026', insight: 'Overall farm vitality improved +4% month-over-month' },
              ].map((report) => (
                <tr key={report.id} className="hover:bg-surface-container/10 transition-colors group">
                  <td className="px-6 py-4 font-medium flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-[20px]">description</span>
                    {report.name}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{report.date}</td>
                  <td className="px-6 py-4 text-outline">{report.insight}</td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors">
                      <span className="material-symbols-outlined text-[20px]">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}
