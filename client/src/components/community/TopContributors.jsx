import React from 'react';

const contributors = [
  { name: 'Dr. Aris Thorne', role: 'Expert', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD06ebSFYCOZmbIJGg0Ugo9pwHtbJ2CEtzN5pmx7pR82iz2Sz1ThMVXoPhYSKVvlxZZAMI45bDZi7cAklEgmBu2yJGf1_X1EOxODgea5RLa-6E9vXj2e2tiJWb_joBeq2YwbLIPA-s3PndPNxfsiVIQo1mz009s81iDXDis6JaIsOxwPk51NVSE9Hn07zIL5vqiUnic5ehcN8l5GMaOLGFJdVuR2Z3cT3r0sfcK8HvmTQRdNHDlEkzDFvgWAOjtWwAIAOEP7TvQg', helpful: 48 },
  { name: 'Rohith Kotyan', role: 'Advanced Farmer', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ', helpful: 36 },
  { name: 'Sarah Jenkins', role: 'Expert', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgCi8obCg6CrWuESZXaIGCyHgTW-gAUIGVHP80hfMRI4IROWOCJN7O6FcDAXMU1ol4OTNGrYrOHXtfiN0FxenU4mImFayt-sSyli7xGm-sVjHhNlhTEB-wau7nb8C4ZZHW2mqkjmuLrDGQtnoOe2_MPYK7P1Mlg0YoFCRJcHD8qo6izbsbeMZslI_OdR-9mCUTWN9zHwrC7BgFjqvmzFa12Z_xsCn82oYr34QtWRAE71SW4yFIYClhoD8Y3n3JZPJy6rLOgmFIQ', helpful: 29 },
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
