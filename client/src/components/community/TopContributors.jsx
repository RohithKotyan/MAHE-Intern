import React from 'react';

const contributors = [
  { name: 'Community Member 1', role: 'Expert', avatar: 'https://ui-avatars.com/api/?name=C1&background=random', helpful: 48 },
  { name: 'Community Member 2', role: 'Advanced Farmer', avatar: 'https://ui-avatars.com/api/?name=C2&background=random', helpful: 36 },
  { name: 'Community Member 3', role: 'Expert', avatar: 'https://ui-avatars.com/api/?name=C3&background=random', helpful: 29 },
];

export default function TopContributors() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[20px]">emoji_events</span>
        <h4 className="font-body-md text-sm font-semibold text-on-surface">Top This Week</h4>
      </div>
      <div className="space-y-3">
        {contributors.map((c, i) => (
          <div key={i} className="flex items-center gap-3 group cursor-pointer">
            <div className="relative shrink-0">
              <div className={`absolute -top-1 -left-1 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold z-10 ${
                i === 0 ? 'bg-amber-500 text-white' : i === 1 ? 'bg-gray-400 text-white' : 'bg-amber-700 text-white'
              }`}>{i + 1}</div>
              <img src={c.avatar} alt={c.name} className="w-9 h-9 rounded-full object-cover border border-outline-variant/30" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-on-surface font-body-md text-sm font-medium truncate group-hover:text-primary transition-colors">{c.name}</div>
              <div className="text-on-surface-variant font-label-sm text-[10px]">{c.role}</div>
            </div>
            <div className="text-right shrink-0">
              <div className="text-primary font-label-sm text-[10px] font-bold">{c.helpful}</div>
              <div className="text-on-surface-variant font-label-sm text-[8px]">helpful</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
