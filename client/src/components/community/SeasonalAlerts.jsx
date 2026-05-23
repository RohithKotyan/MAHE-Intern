import React from 'react';

const alerts = [
  { icon: 'thunderstorm', label: 'Heavy Rainfall', desc: 'Southwest monsoon approaching', color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
  { icon: 'bug_report', label: 'Pest Outbreak', desc: 'Whitefly reported in region', color: 'text-error', bg: 'bg-error/10 border-error/20' },
  { icon: 'water_drop', label: 'High Fungal Risk', desc: 'Humidity > 85% expected', color: 'text-amber-500', bg: 'bg-amber-500/10 border-amber-500/20' },
];

export default function SeasonalAlerts() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-amber-500 text-[20px]">warning</span>
        <h4 className="font-body-md text-sm font-semibold text-on-surface">Seasonal Alerts</h4>
      </div>
      <div className="space-y-2">
        {alerts.map((alert, i) => (
          <div key={i} className={`flex items-start gap-3 p-3 rounded-lg border ${alert.bg} cursor-pointer hover:scale-[1.02] transition-transform`}>
            <span className={`material-symbols-outlined text-[18px] mt-0.5 ${alert.color}`}>{alert.icon}</span>
            <div>
              <div className="text-on-surface font-body-md text-sm font-semibold">{alert.label}</div>
              <div className="text-on-surface-variant font-label-sm text-[10px]">{alert.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
