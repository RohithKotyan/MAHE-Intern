import React from 'react';

export default function TabCommunity({ isExpert }) {
  const reputationMetrics = [
    { label: 'Helpful Votes', value: '562', icon: 'handshake', color: 'text-amber-500' },
    { label: 'Post Engagement', value: '1.2k', icon: 'forum', color: 'text-primary' },
    { label: 'Contributions', value: '148', icon: 'auto_awesome', color: 'text-blue-500' },
    { label: 'Community Rank', value: isExpert ? 'Top 1% Expert' : 'Trusted Farmer', icon: 'military_tech', color: 'text-purple-500' },
  ];

  const savedContent = [
    { title: 'Best fertilizer schedule for chilli plants', type: 'Farming Tip', author: 'Dr. Aris Thorne', saves: 245 },
    { title: 'Early Blight Treatment Protocol', type: 'Expert Advice', author: 'Dr. Elena Rostova', saves: 892 },
    { title: 'Organic Pest Control Methods 2026', type: 'Report', author: 'AgroCare Research', saves: 1204 },
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Reputation Metrics */}
      <section className="glass-panel rounded-2xl p-6">
        <h2 className="font-body-md text-on-surface font-semibold mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-amber-500">star</span>
          Community Reputation
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reputationMetrics.map((metric, i) => (
            <div key={i} className="bg-surface-container/50 border border-outline-variant/30 rounded-xl p-4 flex flex-col items-center justify-center text-center hover:border-amber-500/30 transition-colors group">
              <span className={`material-symbols-outlined mb-2 ${metric.color} group-hover:scale-110 transition-transform`}>{metric.icon}</span>
              <span className="font-headline-lg-mobile text-on-surface mb-1">{metric.value}</span>
              <span className="font-label-sm text-on-surface-variant text-[10px] uppercase tracking-wider">{metric.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Saved Content */}
      <section className="glass-panel rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-body-md text-on-surface font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">bookmark</span>
            Saved Bookmarks
          </h2>
          <button className="text-primary text-[11px] font-bold hover:underline">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {savedContent.map((item, i) => (
            <div key={i} className="bg-surface-container/50 border border-outline-variant/30 rounded-xl p-4 flex flex-col hover:border-primary/30 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-2">
                <span className="px-2 py-0.5 bg-surface-container-high rounded text-[9px] font-bold text-on-surface-variant uppercase tracking-wider border border-outline-variant/20">
                  {item.type}
                </span>
                <span className="material-symbols-outlined text-[16px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
              </div>
              <h3 className="font-body-md text-sm font-semibold text-on-surface mb-2 group-hover:text-primary transition-colors leading-tight">
                {item.title}
              </h3>
              <div className="mt-auto pt-3 flex items-center justify-between border-t border-outline-variant/20">
                <div className="font-label-sm text-[10px] text-on-surface-variant">{item.author}</div>
                <div className="font-label-sm text-[10px] text-primary flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">favorite</span>
                  {item.saves}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Expert Library (Mock conditional) */}
      {isExpert && (
        <section className="glass-panel rounded-2xl p-6 border-l-4 border-l-primary atmospheric-glow">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-body-md text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">local_library</span>
              Expert Knowledge Library
            </h2>
            <button className="bg-primary text-on-primary-fixed px-4 py-1.5 rounded-full text-[11px] font-bold hover:scale-105 transition-transform">
              Publish Article
            </button>
          </div>
          <div className="p-8 text-center border-2 border-dashed border-outline-variant/30 rounded-xl">
            <span className="material-symbols-outlined text-[32px] text-on-surface-variant mb-2">article</span>
            <p className="font-body-md text-sm text-on-surface-variant">Your published expert articles will appear here.</p>
          </div>
        </section>
      )}

    </div>
  );
}
