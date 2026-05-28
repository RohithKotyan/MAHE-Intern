import React from 'react';

export default function TabOverview({ user, isExpert }) {
  const stats = [
    { label: 'Total Scans', value: '127', icon: 'qr_code_scanner', color: 'text-primary' },
    { label: 'Plants Monitored', value: '34', icon: 'potted_plant', color: 'text-green-500' },
    { label: 'Recovery Success', value: '91%', icon: 'healing', color: 'text-teal-500' },
    { label: 'Current Streak', value: '26 Days', icon: 'local_fire_department', color: 'text-amber-500' },
  ];

  const expertStats = [
    { label: 'Diagnoses Provided', value: '1,432', icon: 'stethoscope', color: 'text-amber-500' },
    { label: 'Farmers Helped', value: '892', icon: 'groups', color: 'text-primary' },
    { label: 'Posts Published', value: '45', icon: 'article', color: 'text-blue-500' },
    { label: 'Average Rating', value: '4.9/5', icon: 'star', color: 'text-yellow-400' },
  ];

  const displayStats = isExpert ? expertStats : stats;

  const badges = [
    { name: 'Disease Hunter', icon: 'bug_report', level: 'Gold' },
    { name: 'Community Helper', icon: 'handshake', level: 'Silver' },
    { name: '100 Scans Club', icon: 'center_focus_strong', level: 'Bronze' },
    { name: 'Healthy Harvest', icon: 'eco', level: 'Emerald' },
  ];

  const timeline = [
    { action: 'Scanned Tomato Plant', detail: 'Early Blight detected (93%)', time: '2 hours ago', icon: 'qr_code_scanner' },
    { action: 'Posted a question', detail: 'In Community Hub', time: '1 day ago', icon: 'forum' },
    { action: 'Achievement Unlocked', detail: 'Disease Hunter (Gold)', time: '3 days ago', icon: 'emoji_events' },
    { action: 'Followed Dr. Aris Thorne', detail: 'Expert connection', time: '1 week ago', icon: 'person_add' },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      {/* Left Column: Stats & Badges */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        
        {/* Activity Overview */}
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="font-body-md text-on-surface font-semibold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">bar_chart</span>
            Activity Overview
          </h2>
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 snap-x snap-mandatory hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
            {displayStats.map((stat, i) => (
              <div key={i} className="min-w-[140px] sm:min-w-0 flex-1 bg-surface-container/50 border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-primary/30 transition-colors snap-center shrink-0">
                <span className={`material-symbols-outlined mb-2 ${stat.color}`}>{stat.icon}</span>
                <span className="font-headline-lg-mobile text-on-surface mb-1">{stat.value}</span>
                <span className="font-label-sm text-on-surface-variant text-[10px] uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Achievement Showcase */}
        <section className="glass-panel rounded-2xl p-6">
          <h2 className="font-body-md text-on-surface font-semibold mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-amber-500">workspace_premium</span>
            Achievement Showcase
          </h2>
          <div className="flex overflow-x-auto sm:grid sm:grid-cols-2 sm:grid-cols-4 gap-4 snap-x snap-mandatory hide-scrollbar pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0">
            {badges.map((badge, i) => (
              <div key={i} className="min-w-[140px] sm:min-w-0 flex-1 bg-gradient-to-b from-surface-container to-surface-container-low border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center text-center relative overflow-hidden group cursor-pointer hover:border-amber-500/30 transition-all snap-center shrink-0">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3 relative z-10 shadow-inner">
                  <span className={`material-symbols-outlined text-[24px] ${
                    badge.level === 'Gold' ? 'text-yellow-400' :
                    badge.level === 'Silver' ? 'text-gray-300' :
                    badge.level === 'Emerald' ? 'text-emerald-400' : 'text-amber-700'
                  }`} style={{ fontVariationSettings: "'FILL' 1" }}>
                    {badge.icon}
                  </span>
                </div>
                <span className="font-body-md text-on-surface text-xs font-semibold mb-1 relative z-10">{badge.name}</span>
                <span className="font-label-sm text-on-surface-variant text-[9px] uppercase tracking-wider relative z-10">{badge.level}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Right Column: Timeline */}
      <div className="lg:col-span-1">
        <section className="glass-panel rounded-2xl p-6 h-full">
          <h2 className="font-body-md text-on-surface font-semibold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">history</span>
            Recent Activity
          </h2>
          <div className="relative border-l border-outline-variant/30 ml-3 space-y-6 pb-4">
            {timeline.map((item, i) => (
              <div key={i} className="relative pl-6">
                <div className="absolute -left-[13px] top-1 w-6 h-6 rounded-full bg-surface-container-high border-2 border-surface flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-[12px] text-primary">{item.icon}</span>
                </div>
                <div className="font-body-md text-on-surface text-sm font-semibold">{item.action}</div>
                <div className="font-label-sm text-on-surface-variant text-[11px] mt-0.5">{item.detail}</div>
                <div className="font-label-sm text-outline text-[10px] mt-1">{item.time}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

    </div>
  );
}
