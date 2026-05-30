import { memo } from 'react';
import { getHealthStatusColor, getCropStatusBadge, getWateringStatus } from '../../services/cropTransformers';

function CropCard({ crop, onClick, onWater }) {
  const healthColorClasses = getHealthStatusColor(crop.healthStatus);
  const statusBadge = getCropStatusBadge(crop.status);
  const waterStatus = getWateringStatus(crop.nextWateringAt);

  // Fallback image if none provided
  const imgSource = crop.imageUrl || 'https://images.unsplash.com/photo-1592424001835-53f090715699?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

  return (
    <article 
      onClick={() => onClick(crop)}
      className="glass-panel rounded-[24px] overflow-hidden group hover:shadow-[0_8px_30px_rgba(16,185,129,0.08)] transition-all duration-500 flex flex-col cursor-pointer border border-outline-variant/30 hover:border-primary/30 relative bg-surface-container-low hover:-translate-y-1"
    >
      {/* Premium Image Area */}
      <div className="relative h-48 overflow-hidden bg-surface-container-lowest">
        <img 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
          src={imgSource} 
          alt={crop.name} 
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981' opacity='0.2'%3E%3Cpath d='M17.5 4.5c-2.4 0-4.6.6-6.6 1.8-2-1.2-4.2-1.8-6.6-1.8-1.5 0-3 .3-4.3 1v10.5c1.3-.7 2.8-1 4.3-1 2.4 0 4.6.6 6.6 1.8 2-1.2 4.2-1.8 6.6-1.8 1.5 0 3 .3 4.3 1V5.5c-1.3-.7-2.8-1-4.3-1z'/%3E%3C/svg%3E";
          }}
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent"></div>
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {crop.diseaseDetected && (
            <div className="px-3 py-1 bg-error/90 backdrop-blur-md rounded-full border border-error/50 flex items-center shadow-lg">
              <span className="material-symbols-outlined text-[14px] text-on-error mr-1">coronavirus</span>
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-error font-bold">Disease Detected</span>
            </div>
          )}
        </div>
        
        <div className="absolute top-4 right-4">
          <div className={`px-3 py-1 backdrop-blur-md rounded-full border flex items-center shadow-lg ${healthColorClasses}`}>
            <div className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></div>
            <span className="font-label-sm text-xs font-bold">{crop.healthScore}</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-on-surface-variant/70 font-label-sm text-[10px] uppercase tracking-widest block">{crop.species}</span>
              <span className="w-1 h-1 rounded-full bg-outline-variant/50"></span>
              <span className="text-on-surface-variant/70 font-label-sm text-[10px] uppercase tracking-widest block">{crop.location}</span>
            </div>
            <h3 className="font-headline-sm text-xl text-on-surface font-semibold">{crop.name}</h3>
          </div>
        </div>

        {/* Quick Metrics */}
        <div className="mt-auto space-y-4">
          <div className="grid grid-cols-2 gap-3 mb-2">
            <div className="flex items-center space-x-2 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
              <div className={`w-7 h-7 rounded-full bg-surface-container flex items-center justify-center ${waterStatus.color}`}>
                <span className="material-symbols-outlined text-[16px]">{waterStatus.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Watering</span>
                <span className={`font-label-sm text-xs ${waterStatus.urgency === 'critical' || waterStatus.urgency === 'warning' ? 'font-bold' : ''} ${waterStatus.color}`}>{waterStatus.label}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 bg-surface-container-lowest p-2 rounded-xl border border-outline-variant/20">
              <div className={`w-7 h-7 rounded-full bg-surface-container flex items-center justify-center ${statusBadge.color}`}>
                <span className="material-symbols-outlined text-[16px]">{statusBadge.icon}</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-[9px] uppercase tracking-widest text-on-surface-variant">Status</span>
                <span className="font-label-sm text-xs text-on-surface truncate">{crop.status}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button 
              onClick={(e) => { e.stopPropagation(); onWater(crop._id); }} 
              className="flex-1 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/20 rounded-xl text-primary font-label-sm transition-colors flex items-center justify-center gap-1"
            >
              <span className="material-symbols-outlined text-[16px]">water_drop</span>
              Water
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onClick(crop); }} 
              className="flex-1 py-2 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/30 rounded-xl text-on-surface font-label-sm transition-colors"
            >
              Details
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default memo(CropCard);
