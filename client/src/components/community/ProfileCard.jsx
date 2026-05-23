import React from 'react';

export default function ProfileCard({ user, isExpert }) {
  return (
    <div className="absolute top-full left-0 mt-2 w-72 glass-panel p-4 rounded-2xl z-50 shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none">
      <div className="flex items-start gap-3 mb-3">
        <div className="relative shrink-0">
          <img src={user.avatar} alt={user.name} className={`w-12 h-12 rounded-full object-cover border-2 ${isExpert ? 'border-primary/50' : 'border-outline-variant/30'}`} />
          {isExpert && (
            <span className="absolute -bottom-1 -right-1 material-symbols-outlined text-primary text-[18px] bg-surface rounded-full shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          )}
        </div>
        <div>
          <h4 className="font-body-md text-sm font-bold text-on-surface leading-tight">{user.name}</h4>
          <div className="text-on-surface-variant font-label-sm text-[10px] mt-0.5">{user.location}</div>
          <div className="mt-1">
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border inline-block ${isExpert ? 'bg-primary/10 text-primary border-primary/30' : 'bg-surface-container-high text-on-surface-variant border-outline-variant/30'}`}>
              {isExpert ? 'Verified Expert' : user.rank || 'Farmer'}
            </span>
          </div>
        </div>
      </div>
      
      {isExpert && (
        <div className="mb-3 p-2 bg-primary/5 border border-primary/10 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-on-surface-variant font-label-sm text-[10px]">Trust Score</span>
            <span className="text-primary font-bold text-xs">{user.trustScore}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant font-label-sm text-[10px]">Accuracy</span>
            <span className="text-on-surface font-semibold text-[11px]">{user.accuracy}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-outline-variant/20">
        <div>
          <div className="text-on-surface font-bold text-sm">{user.postsCount || 0}</div>
          <div className="text-on-surface-variant font-label-sm text-[9px] uppercase tracking-wider">Posts</div>
        </div>
        <div>
          <div className="text-on-surface font-bold text-sm">{user.helpfulVotes || 0}</div>
          <div className="text-on-surface-variant font-label-sm text-[9px] uppercase tracking-wider">Helpful</div>
        </div>
        <div>
          <div className="text-on-surface font-bold text-sm">{user.followers || 0}</div>
          <div className="text-on-surface-variant font-label-sm text-[9px] uppercase tracking-wider">Followers</div>
        </div>
      </div>
    </div>
  );
}
