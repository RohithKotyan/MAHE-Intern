import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { getHealthStatusColor, getCropStatusBadge, formatRelativeTime, getWateringStatus } from '../../services/cropTransformers';

export default function CropDrawer({ crop, isOpen, onClose, onWater, onEdit, onDelete }) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!crop) return null;

  const healthColorClasses = getHealthStatusColor(crop.healthStatus);
  const statusBadge = getCropStatusBadge(crop.status);
  const waterStatus = getWateringStatus(crop.nextWateringAt);
  const imgSource = crop.imageUrl || 'https://images.unsplash.com/photo-1592424001835-53f090715699?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      // Auto-reset after 3 seconds if user doesn't confirm
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    await onDelete(crop._id);
    setConfirmDelete(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#05070A]/80 backdrop-blur-sm z-40"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-surface border-l border-outline-variant/20 z-50 flex flex-col shadow-2xl"
          >
            {/* Drawer Content Container with custom scrollbar */}
            <div className="flex-1 overflow-y-auto no-scrollbar">
              
              {/* Header Image Area */}
              <div className="relative h-64 w-full bg-surface-container-lowest">
                <img 
                  src={imgSource} 
                  alt={crop.name} 
                  className="w-full h-full object-cover" 
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2310b981' opacity='0.2'%3E%3Cpath d='M17.5 4.5c-2.4 0-4.6.6-6.6 1.8-2-1.2-4.2-1.8-6.6-1.8-1.5 0-3 .3-4.3 1v10.5c1.3-.7 2.8-1 4.3-1 2.4 0 4.6.6 6.6 1.8 2-1.2 4.2-1.8 6.6-1.8 1.5 0 3 .3 4.3 1V5.5c-1.3-.7-2.8-1-4.3-1z'/%3E%3C/svg%3E";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                
                {/* Close Button */}
                <button 
                  onClick={onClose}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#05070A]/50 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-[#05070A]/80 transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Title & Core Info */}
              <div className="px-8 -mt-8 relative z-10 mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/30 font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">
                    {crop.species}
                  </span>
                  <span className="px-3 py-1 bg-surface-container-high rounded-full border border-outline-variant/30 font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">
                    {crop.location}
                  </span>
                </div>
                <h2 className="font-headline-lg text-4xl font-bold text-on-surface tracking-tight mb-2">{crop.name}</h2>
                <p className="font-body-md text-sm text-on-surface-variant">
                  Planted {formatRelativeTime(crop.plantedAt)}
                </p>
              </div>

              <div className="px-8 space-y-6 pb-24">
                
                {/* Status Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-panel p-4 rounded-2xl border border-outline-variant/30 flex flex-col gap-2">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">Overall Health</span>
                    <div className={`flex items-center gap-2 ${healthColorClasses.split(' ')[0]}`}>
                      <span className="font-display-sm text-3xl font-bold">{crop.healthScore}</span>
                      <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-current/10">{crop.healthStatus}</span>
                    </div>
                  </div>
                  <div className="glass-panel p-4 rounded-2xl border border-outline-variant/30 flex flex-col gap-2">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant">Current Status</span>
                    <div className={`flex items-center gap-2 ${statusBadge.color}`}>
                      <span className="material-symbols-outlined text-[28px]">{statusBadge.icon}</span>
                      <span className="font-label-sm text-base font-bold">{crop.status}</span>
                    </div>
                  </div>
                </div>

                {/* Growth & Disease Details */}
                <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="font-label-sm text-xs text-on-surface-variant">Growth Stage</span>
                    <span className="font-label-sm text-sm text-on-surface bg-surface-container px-3 py-1 rounded-md">{crop.growthStage}</span>
                  </div>
                  <div className="h-px w-full bg-outline-variant/20"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-label-sm text-xs text-on-surface-variant">Disease Status</span>
                    {crop.diseaseDetected ? (
                      <span className="font-label-sm text-sm text-error bg-error/10 px-3 py-1 rounded-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">coronavirus</span>
                        {crop.currentDisease || 'Unknown Disease'}
                      </span>
                    ) : (
                      <span className="font-label-sm text-sm text-primary bg-primary/10 px-3 py-1 rounded-md flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">check_circle</span>
                        Clean
                      </span>
                    )}
                  </div>
                </div>

                {/* Watering & Activity */}
                <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 space-y-4">
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center shrink-0 ${waterStatus.color}`}>
                      <span className="material-symbols-outlined">{waterStatus.icon}</span>
                    </div>
                    <div>
                      <h4 className={`font-label-sm text-sm mb-1 ${waterStatus.color}`}>{waterStatus.label}</h4>
                      <p className="font-body-md text-xs text-on-surface-variant">
                        Last watered {formatRelativeTime(crop.lastWateredAt)}
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-full bg-outline-variant/20"></div>
                  <div className="flex justify-between items-center text-xs text-on-surface-variant">
                    <span>Scan Count: {crop.scanCount}</span>
                    <span>Last Scan: {formatRelativeTime(crop.lastScanAt)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-outline pt-2 border-t border-outline-variant/10">
                    <span>Last Activity: {formatRelativeTime(crop.lastActivityAt)}</span>
                  </div>
                </div>

                {/* Notes (if any) */}
                {crop.notes && (
                  <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30">
                    <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Agronomist Notes</span>
                    <p className="font-body-md text-sm text-on-surface leading-relaxed">
                      {crop.notes}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Fixed Bottom Action Bar */}
            <div className="p-4 border-t border-outline-variant/20 bg-surface/80 backdrop-blur-xl flex gap-3">
              <button 
                onClick={() => onWater(crop._id)}
                className="flex-1 py-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-xl font-label-sm transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">water_drop</span>
                Log Water
              </button>
              <button 
                className="flex-1 py-3 bg-primary text-on-primary rounded-xl font-label-sm hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">document_scanner</span>
                Scan Plant
              </button>
              <button 
                onClick={() => onEdit(crop)}
                className="w-12 h-12 flex-shrink-0 bg-surface-container-high hover:bg-surface-variant border border-outline-variant/30 rounded-xl flex items-center justify-center text-on-surface transition-colors"
                title="Edit Crop"
              >
                <span className="material-symbols-outlined text-[20px]">edit</span>
              </button>
              <button 
                onClick={handleDelete}
                className={`w-12 h-12 flex-shrink-0 rounded-xl flex items-center justify-center transition-all ${
                  confirmDelete 
                    ? 'bg-error text-on-error animate-pulse border border-error' 
                    : 'bg-error/10 hover:bg-error/20 text-error border border-error/20'
                }`}
                title={confirmDelete ? 'Click again to confirm' : 'Delete Crop'}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {confirmDelete ? 'delete_forever' : 'delete'}
                </span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
