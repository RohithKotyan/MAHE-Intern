import React, { useRef, useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// --- Custom hook to replace ResponsiveContainer ---
function useContainerSize(ref) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        if (width > 0 && height > 0) {
          setSize({ width: Math.floor(width), height: Math.floor(height) });
        }
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return size;
}

// --- Mock Data ---

const healthTrendData = [
  { date: 'May 1', healthy: 82, diseased: 18 },
  { date: 'May 5', healthy: 84, diseased: 15 },
  { date: 'May 10', healthy: 81, diseased: 20 },
  { date: 'May 15', healthy: 86, diseased: 12 },
  { date: 'May 20', healthy: 88, diseased: 9 },
  { date: 'May 25', healthy: 92, diseased: 5 },
  { date: 'May 30', healthy: 95, diseased: 3 },
];

const diseaseDistributionData = [
  { name: 'Early Blight', value: 35 },
  { name: 'Leaf Spot', value: 25 },
  { name: 'Healthy', value: 20 },
  { name: 'Rust Disease', value: 12 },
  { name: 'Others', value: 8 },
];

const COLORS = ['#ef4444', '#f59e0b', '#10b981', '#f97316', '#64748b'];

const sectorPerformanceData = [
  { name: 'Sector A', vitality: 92 },
  { name: 'Sector B', vitality: 78 },
  { name: 'Sector C', vitality: 88 },
  { name: 'Sector D', vitality: 95 },
];

// Custom Tooltip for Area Chart
const CustomAreaTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/30 p-3 rounded-lg shadow-xl">
        <p className="text-on-surface text-sm font-medium mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-xs flex items-center gap-2" style={{ color: entry.color }}>
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
            {entry.name === 'healthy' ? 'Healthy Plants' : 'Diseased Plants'}: <span className="font-bold">{entry.value}%</span>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

// Custom Tooltip for Bar/Pie Charts
const CustomSimpleTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-surface-container-high/90 backdrop-blur-md border border-outline-variant/30 p-3 rounded-lg shadow-xl">
        <p className="text-on-surface text-sm font-medium flex items-center gap-2">
          {payload[0].name}: <span className="font-bold text-primary">{payload[0].value}%</span>
        </p>
      </div>
    );
  }
  return null;
};

export default function ChartsWidgets({ type }) {
  const containerRef = useRef(null);
  const { width, height } = useContainerSize(containerRef);
  
  if (type === 'healthTrend') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/30 h-[400px] flex flex-col relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] pointer-events-none transition-all group-hover:bg-primary/10"></div>
        <div className="mb-6 relative z-10">
          <h2 className="font-headline-sm text-lg font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">trending_up</span>
            Health Trend Overview
          </h2>
          <p className="text-sm text-on-surface-variant mt-1">Ratio of healthy to diseased plants over the last 30 days.</p>
        </div>
        <div ref={containerRef} className="flex-1 w-full relative z-10">
          {width > 0 && height > 0 && (
            <AreaChart width={width} height={height} data={healthTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorHealthy" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDiseased" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--md-outline-variant)" opacity={0.3} vertical={false} />
              <XAxis dataKey="date" stroke="var(--md-outline)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="var(--md-outline)" fontSize={12} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip content={<CustomAreaTooltip />} />
              <Area type="monotone" dataKey="healthy" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorHealthy)" />
              <Area type="monotone" dataKey="diseased" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorDiseased)" />
            </AreaChart>
          )}
        </div>
      </div>
    );
  }

  if (type === 'diseaseDistribution') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/30 flex flex-col">
        <div className="mb-2">
          <h2 className="font-headline-sm text-lg font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-warning">pie_chart</span>
            Disease Distribution
          </h2>
        </div>
        <div ref={containerRef} className="h-[250px] w-full relative">
          {width > 0 && height > 0 && (
            <PieChart width={width} height={height}>
              <Pie
                data={diseaseDistributionData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {diseaseDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomSimpleTooltip />} />
            </PieChart>
          )}
          {/* Centered text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-xs text-on-surface-variant uppercase tracking-widest">Top Issue</span>
            <span className="text-lg font-bold text-error">Blight</span>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 mt-2">
          {diseaseDistributionData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
              <span className="text-on-surface-variant truncate">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'sectorPerformance') {
    return (
      <div className="glass-panel p-6 rounded-2xl border border-outline-variant/30 flex flex-col">
        <div className="mb-4">
          <h2 className="font-headline-sm text-lg font-semibold text-on-surface flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary">bar_chart</span>
            Sector Vitality
          </h2>
        </div>
        <div ref={containerRef} className="h-[200px] w-full">
          {width > 0 && height > 0 && (
            <BarChart width={width} height={height} data={sectorPerformanceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--md-outline-variant)" opacity={0.3} vertical={false} />
              <XAxis dataKey="name" stroke="var(--md-outline)" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="var(--md-outline)" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'var(--md-surface-variant)'}} content={<CustomSimpleTooltip />} />
              <Bar dataKey="vitality" radius={[4, 4, 0, 0]}>
                {sectorPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.vitality > 90 ? '#10b981' : entry.vitality > 80 ? '#3b82f6' : '#f59e0b'} />
                ))}
              </Bar>
            </BarChart>
          )}
        </div>
      </div>
    );
  }

  return null;
}
