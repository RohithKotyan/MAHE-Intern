import React from 'react';

export default function ProfileHero({ user, isExpert }) {
  // SVG properties for the circular score gauge
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const score = isExpert ? user.trustScore : user.aiScore;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="relative glass-card rounded-3xl p-6 md:p-8 overflow-hidden">
      {/* Decorative background glow */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none ${isExpert ? 'bg-amber-500/10' : 'bg-primary/10'}`}></div>

      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8 relative z-10">
        
        {/* Left Side: Avatar & Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
          <div className="relative shrink-0">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className={`w-28 h-28 rounded-full object-cover border-4 shadow-xl ${isExpert ? 'border-amber-500/50' : 'border-outline-variant/30'}`} 
            />
            {isExpert && (
              <span className="absolute bottom-0 right-0 material-symbols-outlined text-amber-500 text-[32px] bg-surface rounded-full shadow-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
            )}
          </div>
          
          <div className="flex flex-col justify-center pt-2">
            <h1 className="font-headline-lg text-3xl font-bold text-on-surface mb-1 flex items-center justify-center md:justify-start gap-2">
              {user.name}
            </h1>
            
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-[11px] font-bold border uppercase tracking-wider ${
                isExpert ? 'bg-amber-500/10 text-amber-500 border-amber-500/30' : 'bg-primary/10 text-primary border-primary/30'
              }`}>
                {isExpert ? 'Verified Pathologist' : user.rank}
              </span>
              <span className="text-on-surface-variant font-label-sm text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">location_on</span>
                {user.location}
              </span>
            </div>

            <p className="text-on-surface-variant font-body-md text-sm max-w-md leading-relaxed mb-4">
              {user.bio}
            </p>

            <div className="flex items-center justify-center md:justify-start gap-6">
              <div className="text-center md:text-left">
                <div className="font-headline-lg-mobile text-on-surface">{user.followers}</div>
                <div className="text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider">Followers</div>
              </div>
              <div className="h-6 w-px bg-outline-variant/30"></div>
              <div className="text-center md:text-left">
                <div className="font-headline-lg-mobile text-on-surface">{user.following || (isExpert ? '15 Yrs' : 0)}</div>
                <div className="text-on-surface-variant font-label-sm text-[10px] uppercase tracking-wider">{isExpert ? 'Experience' : 'Following'}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Primary Score Ring */}
        <div className="shrink-0 flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-surface-container-high fill-none"
                strokeWidth="8"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                className={`fill-none transition-all duration-1000 ease-out ${isExpert ? 'stroke-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'stroke-primary drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`}
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-3xl font-bold ${isExpert ? 'text-amber-500' : 'text-primary'}`}>{score}</span>
            </div>
          </div>
          <div className="text-center mt-2">
            <div className="text-on-surface font-body-md font-semibold text-sm">
              {isExpert ? 'Trust Score' : 'AI Farming Score'}
            </div>
            <div className="text-on-surface-variant font-label-sm text-[10px]">
              {isExpert ? `${user.accuracy} Diagnosis Accuracy` : 'Top 10% in region'}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
