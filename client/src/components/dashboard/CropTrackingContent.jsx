import { Suspense, lazy, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useCrops, useCropStats } from '../../services/cropQueries';
import CropCard from './CropCard';
import AddCropModal from './AddCropModal';
import EditCropModal from './EditCropModal';
import { CropCardSkeleton } from '../common/Skeletons';

const CropDrawer = lazy(() => import('./CropDrawer'));

export default function CropTrackingContent() {
  const { crops, loading, fetchCrops, waterCrop, addCrop, editCrop, removeCrop } = useCrops();
  const { stats, fetchStats } = useCropStats();

  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingCrop, setEditingCrop] = useState(null);

  // Initial load — stats only (fetchCrops is handled by the filter effect below)
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch when filters change
  useEffect(() => {
    const params = {};
    if (debouncedSearch) params.q = debouncedSearch;
    if (filterLocation && filterLocation !== 'All') params.location = filterLocation;
    fetchCrops(params);
  }, [debouncedSearch, filterLocation, fetchCrops]);

  const handleCardClick = useCallback((crop) => {
    setSelectedCrop(crop);
    setIsDrawerOpen(true);
  }, []);

  const handleWater = useCallback(async (cropId) => {
    const updatedCrop = await waterCrop(cropId);
    if (selectedCrop && selectedCrop._id === cropId) {
      setSelectedCrop(updatedCrop);
    }
    fetchStats();
  }, [waterCrop, selectedCrop, fetchStats]);

  const handleAddCrop = async (cropData) => {
    await addCrop(cropData);
    fetchStats();
  };

  const handleEditCrop = async (id, cropData) => {
    const updated = await editCrop(id, cropData);
    // Update the drawer's selected crop so it reflects changes immediately
    if (selectedCrop && selectedCrop._id === id) {
      setSelectedCrop(updated);
    }
    fetchStats();
  };

  return (
    <div className="pt-6 pb-32 md:pb-12 px-gutter md:px-container-margin min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto space-y-section-gap">
        
        {/* Header & Smart Stats */}
        <section className="space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">Crop Intelligence</h2>
              <p className="font-body-lg text-on-surface-variant mt-2 max-w-xl">
                Monitor plant health, track growth stages, and log critical care routines across all sectors.
              </p>
            </div>
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3 bg-primary hover:brightness-110 text-on-primary rounded-xl font-label-md transition-all shadow-[0_4px_20px_rgba(16,185,129,0.25)] flex items-center justify-center gap-2 self-start md:self-auto"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
              Add Crop
            </button>
          </div>

          {/* Premium Linear-inspired Stats Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-1">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-500"></span> Total Tracking</span>
              <span className="font-display-sm text-3xl font-bold text-on-surface">{stats.totalCrops}</span>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-1">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> Thriving</span>
              <span className="font-display-sm text-3xl font-bold text-primary">{stats.healthy}</span>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-1">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span> Needs Attention</span>
              <span className="font-display-sm text-3xl font-bold text-amber-500">{stats.warning + stats.critical}</span>
            </div>
            <div className="glass-panel p-5 rounded-2xl border border-outline-variant/30 flex flex-col gap-1">
              <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-blue-400"></span> Water Action</span>
              <span className="font-display-sm text-3xl font-bold text-blue-400">{stats.needsWater}</span>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="flex flex-col md:flex-row gap-4 md:items-center bg-surface-container-low p-2 rounded-2xl border border-outline-variant/30">
          <div className="relative flex-1 group">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">search</span>
            <input 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-transparent text-on-surface font-body-md placeholder:text-on-surface-variant/70 focus:outline-none transition-all" 
              placeholder="Search by crop name or species..." 
              type="text" 
            />
          </div>
          <div className="h-px md:h-8 w-full md:w-px bg-outline-variant/30"></div>
          <div className="flex space-x-2 overflow-x-auto no-scrollbar py-2 px-2">
            {['All', 'Indoor', 'Outdoor', 'Greenhouse', 'Hydroponic'].map((loc) => (
              <button 
                key={loc}
                onClick={() => setFilterLocation(loc === filterLocation ? '' : loc)}
                className={`shrink-0 px-4 py-2 rounded-xl font-label-sm transition-all ${
                  (filterLocation === loc || (loc === 'All' && !filterLocation))
                    ? 'bg-primary/10 text-primary border border-primary/30'
                    : 'bg-transparent text-on-surface-variant border border-outline-variant/50 hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                {loc}
              </button>
            ))}
          </div>
        </section>

        {/* Crop Grid */}
        <section>
          {loading && crops.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <CropCardSkeleton key={i} />
              ))}
            </div>
          ) : crops.length > 0 ? (
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {crops.map((crop) => (
                  <CropCard 
                    key={crop._id} 
                    crop={crop} 
                    onClick={handleCardClick}
                    onWater={handleWater}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <div className="py-24 flex flex-col items-center justify-center text-center border border-dashed border-outline-variant/30 rounded-[32px] bg-surface-container-lowest">
              <div className="w-20 h-20 bg-surface-container rounded-full flex items-center justify-center mb-6 text-on-surface-variant/50">
                <span className="material-symbols-outlined text-[40px]">eco</span>
              </div>
              <h3 className="font-headline-sm text-2xl text-on-surface mb-2">No crops found</h3>
              <p className="font-body-md text-on-surface-variant max-w-sm mb-6">
                You haven't added any crops matching this criteria. Start tracking your first plant.
              </p>
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="px-6 py-2 border border-primary/30 text-primary hover:bg-primary/10 rounded-xl font-label-sm transition-colors"
              >
                Add Crop
              </button>
            </div>
          )}
        </section>
      </div>

      <Suspense fallback={null}>
        <CropDrawer 
          crop={selectedCrop} 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          onWater={handleWater}
          onEdit={(crop) => setEditingCrop(crop)}
          onDelete={async (id) => {
            await removeCrop(id);
            setIsDrawerOpen(false);
            fetchStats();
          }}
        />
      </Suspense>

      <AddCropModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCrop}
      />

      <EditCropModal
        isOpen={!!editingCrop}
        onClose={() => setEditingCrop(null)}
        crop={editingCrop}
        onSave={handleEditCrop}
      />
    </div>
  );
}
