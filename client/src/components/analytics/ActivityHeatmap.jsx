import React, { useMemo } from 'react';

// Generate mock activity data for the last 12 weeks
const generateHeatmapData = () => {
  const weeks = 12;
  const daysPerWeek = 7;
  const data = [];
  
  for (let w = 0; w < weeks; w++) {
    const weekData = [];
    for (let d = 0; d < daysPerWeek; d++) {
      // Random activity level: 0 (none) to 4 (high)
      // Make weekends slightly less active, and recent weeks more active
      const isWeekend = d === 0 || d === 6;
      const recencyBoost = w > 8 ? 1 : 0;
      
      let level = Math.floor(Math.random() * 3); // 0, 1, 2
      if (!isWeekend && Math.random() > 0.5) level += 1;
      if (recencyBoost && Math.random() > 0.5) level += 1;
      if (level > 4) level = 4;
      
      // Randomly zero out some days
      if (Math.random() > 0.7) level = 0;
      
      weekData.push({ day: d, week: w, level });
    }
    data.push(weekData);
  }
  return data;
};

const getColorClass = (level) => {
  switch (level) {
    case 0: return 'bg-surface-container-high/40 border border-outline-variant/10'; // empty
    case 1: return 'bg-primary/30 border border-primary/20 shadow-[0_0_5px_rgba(16,185,129,0.1)]'; // light
    case 2: return 'bg-primary/60 border border-primary/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'; // medium
    case 3: return 'bg-primary/90 border border-primary/60 shadow-[0_0_12px_rgba(16,185,129,0.4)]'; // high
    case 4: return 'bg-primary border border-primary shadow-[0_0_15px_rgba(16,185,129,0.6)] glow-primary'; // intense
    default: return 'bg-surface-container-high/40';
  }
};

export default function ActivityHeatmap() {
  const heatmapData = useMemo(() => generateHeatmapData(), []);
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Mar', 'Apr', 'May'];

  return (
    <section className="glass-panel p-6 rounded-2xl border border-outline-variant/30 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="font-headline-sm text-lg font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">calendar_month</span>
            Scan Activity
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">Daily AI diagnostic usage over the last 90 days.</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-on-surface-variant">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className={`w-3 h-3 rounded-sm ${getColorClass(level)}`}></div>
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="overflow-x-auto hide-scrollbar pb-2">
        <div className="min-w-[600px] flex">
          {/* Y Axis (Days) */}
          <div className="flex flex-col gap-[3px] pr-2 pt-[20px] text-[10px] text-on-surface-variant justify-between font-medium h-[112px]">
            <span className="h-3 leading-3">Sun</span>
            <span className="h-3 leading-3">Tue</span>
            <span className="h-3 leading-3">Thu</span>
            <span className="h-3 leading-3">Sat</span>
          </div>

          {/* Heatmap Grid */}
          <div className="flex-1">
            {/* X Axis (Months - simplified mapping) */}
            <div className="flex text-[10px] text-on-surface-variant font-medium mb-1 pl-1">
              <span className="flex-1">Mar</span>
              <span className="flex-1">Apr</span>
              <span className="flex-1">May</span>
            </div>
            
            <div className="flex gap-[3px]">
              {heatmapData.map((week, wIndex) => (
                <div key={wIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dIndex) => (
                    <div 
                      key={`${wIndex}-${dIndex}`} 
                      className={`w-3.5 h-3.5 rounded-sm transition-all hover:scale-125 cursor-pointer ${getColorClass(day.level)}`}
                      title={`Activity level: ${day.level}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
