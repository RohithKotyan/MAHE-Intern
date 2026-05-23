import React from 'react';

const trendingDiseases = [
  { name: 'Tomato Blight', posts: 128, trend: 'up', severity: 'High' },
  { name: 'Powdery Mildew', posts: 94, trend: 'up', severity: 'Medium' },
  { name: 'Leaf Curl Virus', posts: 76, trend: 'stable', severity: 'High' },
  { name: 'Root Rot', posts: 53, trend: 'down', severity: 'Low' },
];

export default function TrendingWidget() {
  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <span className="material-symbols-outlined text-primary text-[20px]">trending_up</span>
        <h4 className="font-body-md text-sm font-semibold text-on-surface">Trending Diseases</h4>
      </div>
      <div className="space-y-3">
        {trendingDiseases.map((disease, i) => (
          <div key={i} className="flex items-center gap-3 group cursor-pointer">
            <span className="text-on-surface-variant font-label-sm text-[10px] w-4 text-right">{i + 1}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-on-surface font-body-md text-sm font-medium truncate group-hover:text-primary transition-colors">{disease.name}</span>
                {disease.trend === 'up' && <span className="material-symbols-outlined text-error text-[14px]">north_east</span>}
                {disease.trend === 'down' && <span className="material-symbols-outlined text-primary text-[14px]">south_west</span>}
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-on-surface-variant font-label-sm text-[10px]">{disease.posts} posts</span>
                <span className={`px-1.5 py-0 rounded text-[8px] font-bold ${
                  disease.severity === 'High' ? 'bg-error/10 text-error' :
                  disease.severity === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                  'bg-primary/10 text-primary'
                }`}>{disease.severity}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
