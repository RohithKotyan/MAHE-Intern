import React from 'react';
import { Link } from 'react-router-dom';

export default function ScanResultEmbed({ disease, confidence, severity, cropId }) {
  const severityColor = {
    Low: 'text-primary border-primary/30 bg-primary/10',
    Medium: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
    High: 'text-error border-error/30 bg-error/10',
    Critical: 'text-error border-error/50 bg-error/20',
  };

  return (
    <div className="mt-3 rounded-xl border border-primary/20 bg-surface-container-low/50 p-4 relative overflow-hidden">
      <div className="absolute left-0 top-0 w-1 h-full bg-primary shadow-[0_0_10px_rgba(78,222,163,0.8)]"></div>
      <div className="flex items-center gap-2 mb-3 pl-2">
        <span className="material-symbols-outlined text-primary text-[18px]">center_focus_strong</span>
        <span className="font-label-sm text-primary font-bold uppercase tracking-wider">AI Scan Result</span>
      </div>
      <div className="grid grid-cols-3 gap-3 pl-2">
        <div>
          <div className="text-on-surface-variant font-label-sm mb-1">Disease</div>
          <div className="text-on-surface font-body-md font-semibold text-sm">{disease}</div>
        </div>
        <div>
          <div className="text-on-surface-variant font-label-sm mb-1">Confidence</div>
          <div className="text-primary font-body-md font-bold text-sm text-glow">{confidence}%</div>
        </div>
        <div>
          <div className="text-on-surface-variant font-label-sm mb-1">Severity</div>
          <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold border ${severityColor[severity] || severityColor.Low}`}>
            {severity}
          </span>
        </div>
      </div>
      {cropId && (
        <Link
          to={`/dashboard/crops/${cropId}/treatment`}
          className="mt-3 ml-2 inline-flex items-center gap-1 text-primary font-label-sm hover:underline"
        >
          View Treatment Protocol
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </Link>
      )}
    </div>
  );
}
