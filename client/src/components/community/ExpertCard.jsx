import React, { useState } from 'react';

export default function ExpertCard({ name, specialization, avatar, trustScore, followers }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-high/50 transition-colors group">
      <div className="relative shrink-0">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full border border-primary/30 object-cover" />
        <span className="absolute -bottom-0.5 -right-0.5 material-symbols-outlined text-primary text-[14px] bg-surface rounded-full" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="text-on-surface font-body-md text-sm font-semibold truncate">{name}</span>
        </div>
        <div className="text-on-surface-variant font-label-sm text-[10px] truncate">{specialization}</div>
        <div className="flex items-center gap-2 mt-0.5">
          <span className="text-primary font-label-sm text-[10px] font-bold">Trust: {trustScore}</span>
          <span className="text-on-surface-variant font-label-sm text-[10px]">{followers} followers</span>
        </div>
      </div>
      <button
        onClick={() => setFollowing(!following)}
        className={`shrink-0 px-3 py-1 rounded-full font-label-sm text-[10px] font-bold transition-all ${
          following
            ? 'bg-surface-container-high text-on-surface-variant border border-outline-variant'
            : 'bg-primary/10 text-primary border border-primary/30 hover:bg-primary/20'
        }`}
      >
        {following ? 'Following' : 'Follow'}
      </button>
    </div>
  );
}
