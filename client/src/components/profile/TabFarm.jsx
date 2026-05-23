import React from 'react';

export default function TabFarm() {
  const myPlants = [
    { name: 'Tomato Crop (Sector A)', health: 92, lastScan: '2 Days Ago', status: 'Healthy', trend: 'up' },
    { name: 'Chilli Plants (Sector B)', health: 65, lastScan: '1 Day Ago', status: 'At Risk', trend: 'down' },
    { name: 'Bell Peppers (Sector C)', health: 88, lastScan: '4 Days Ago', status: 'Healthy', trend: 'stable' },
  ];

  const scanHistory = [
    { disease: 'Early Blight', confidence: 93, severity: 'Medium', date: '5 Jun 2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG0wLElSY9RNYBf1Oz8Qea6qRyt74PWaNry9ilftQidLyFflzXLSbBdUxvDGyA0868a7TQ-KVN5bwuz16x2I_SBY2RIyjOhI_qOYll4MQZJQwwf29lzT9eOZiRo96CYrgIYg87fpV_fKsmTZ7xZHWkjRoHl854hYbF1sZX0lkVsU83xuu0NPsmKSHvz-J86HJ9UO9XU5IdyWO_GXkoapfNWcmSWMF_uNwlBGeeYMVvT_XT8PhLZjqGWiKiyktHsNrhxNsyMbG4aA' },
    { disease: 'Healthy Leaf', confidence: 98, severity: 'Low', date: '2 Jun 2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCS5a5-i4X3ej2rB3fJvnPZke7Na-HZwBWpJd38jVXvqpR3mm9VGVSxtVaiYetKdCkiBG9wwaqLPGHXA9ybMNDYBxYduKI0etbTkDtL7OQKKWuMB7Aj85k2Xk9Y0gQgN2suYmavYLNRUzYVQxD7SFxvF1BP7vnKNa8SX2cA5mFOPGN2Bw4gg7ro0WE13u_CTo-Hn0NK3KCjmmhJknuNG-DmWcyNjI-fNYEaJJU3LvmHt123TiSEVnPX4-NyyoQcSxUtCgaEcDhRrA' },
    { disease: 'Powdery Mildew', confidence: 87, severity: 'High', date: '28 May 2026', image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgCi8obCg6CrWuESZXaIGCyHgTW-gAUIGVHP80hfMRI4IROWOCJN7O6FcDAXMU1ol4OTNGrYrOHXtfiN0FxenU4mImFayt-sSyli7xGm-sVjHhNlhTEB-wau7nb8C4ZZHW2mqkjmuLrDGQtnoOe2_MPYK7P1Mlg0YoFCRJcHD8qo6izbsbeMZslI_OdR-9mCUTWN9zHwrC7BgFjqvmzFa12Z_xsCn82oYr34QtWRAE71SW4yFIYClhoD8Y3n3JZPJy6rLOgmFIQ' },
  ];

  const severityColor = {
    Low: 'text-primary border-primary/30 bg-primary/10',
    Medium: 'text-amber-500 border-amber-500/30 bg-amber-500/10',
    High: 'text-error border-error/30 bg-error/10',
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Plant Health Analytics (Mock) */}
      <section className="glass-panel rounded-2xl p-6 relative overflow-hidden">
        {/* Background mesh grid for the chart feel */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="font-body-md text-on-surface font-semibold flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-primary">monitoring</span>
            Plant Health Analytics
          </h2>
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold border border-primary/20">30 Days</span>
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-[10px] font-bold border border-outline-variant/20 hover:text-on-surface cursor-pointer">Overall</span>
          </div>
        </div>
        
        {/* Mock Chart Area */}
        <div className="h-48 border-b border-l border-outline-variant/30 flex items-end gap-2 p-2 relative z-10">
          {[40, 60, 45, 80, 75, 90, 85, 95, 92, 88].map((val, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-primary/20 to-primary/60 rounded-t-sm hover:from-primary/40 hover:to-primary transition-colors cursor-pointer group relative" style={{ height: `${val}%` }}>
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-surface text-on-surface text-[10px] px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity font-bold shadow-md">{val}%</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-[10px] text-on-surface-variant mt-2 px-2 relative z-10">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Week 4</span>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* My Plants */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-body-md text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-green-500">potted_plant</span>
              My Plants
            </h2>
            <button className="text-primary text-[11px] font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {myPlants.map((plant, i) => (
              <div key={i} className="bg-surface-container/50 border border-outline-variant/30 rounded-xl p-3 flex items-center justify-between group hover:border-primary/30 transition-colors cursor-pointer">
                <div>
                  <div className="font-body-md text-sm font-semibold text-on-surface group-hover:text-primary transition-colors">{plant.name}</div>
                  <div className="font-label-sm text-[10px] text-on-surface-variant flex items-center gap-1 mt-0.5">
                    <span className="material-symbols-outlined text-[12px]">schedule</span>
                    Last Scan: {plant.lastScan}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 font-headline-lg-mobile text-sm text-on-surface">
                    {plant.health}%
                    {plant.trend === 'up' && <span className="material-symbols-outlined text-[14px] text-primary">arrow_upward</span>}
                    {plant.trend === 'down' && <span className="material-symbols-outlined text-[14px] text-error">arrow_downward</span>}
                    {plant.trend === 'stable' && <span className="material-symbols-outlined text-[14px] text-on-surface-variant">horizontal_rule</span>}
                  </div>
                  <div className={`font-label-sm text-[10px] font-bold ${plant.status === 'Healthy' ? 'text-primary' : 'text-error'}`}>
                    {plant.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scan History */}
        <section className="glass-panel rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-body-md text-on-surface font-semibold flex items-center gap-2">
              <span className="material-symbols-outlined text-[20px] text-primary">qr_code_scanner</span>
              Recent Scans
            </h2>
            <button className="text-primary text-[11px] font-bold hover:underline">Full History</button>
          </div>
          <div className="space-y-3">
            {scanHistory.map((scan, i) => (
              <div key={i} className="flex items-center gap-3 bg-surface-container/50 border border-outline-variant/30 rounded-xl p-2 hover:border-primary/30 transition-colors cursor-pointer">
                <img src={scan.image} alt={scan.disease} className="w-14 h-14 rounded-lg object-cover border border-outline-variant/20" />
                <div className="flex-1 min-w-0">
                  <div className="font-body-md text-sm font-semibold text-on-surface truncate">{scan.disease}</div>
                  <div className="font-label-sm text-[10px] text-primary font-bold">{scan.confidence}% Confidence</div>
                  <div className="font-label-sm text-[9px] text-on-surface-variant mt-0.5">{scan.date}</div>
                </div>
                <div className="shrink-0 pr-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${severityColor[scan.severity]}`}>
                    {scan.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
