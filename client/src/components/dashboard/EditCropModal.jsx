import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export default function EditCropModal({ isOpen, onClose, crop, onSave }) {
  const [formData, setFormData] = useState({});
  const [saving, setSaving] = useState(false);

  // Populate form when crop changes
  useEffect(() => {
    if (crop) {
      setFormData({
        name: crop.name || '',
        species: crop.species || '',
        location: crop.location || 'Indoor',
        wateringFrequency: crop.wateringFrequency || 3,
        healthStatus: crop.healthStatus || 'Excellent',
        growthStage: crop.growthStage || 'Vegetative',
        notes: crop.notes || '',
      });
    }
  }, [crop]);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Map healthStatus to other health fields to keep them in sync
    const healthMapping = {
      'Excellent': { score: 95, status: 'Healthy' },
      'Good': { score: 85, status: 'Healthy' },
      'Warning': { score: 60, status: 'Warning' },
      'Critical': { score: 30, status: 'Diseased' }
    };
    const healthData = healthMapping[formData.healthStatus] || healthMapping['Excellent'];

    try {
      await onSave(crop._id, {
        ...formData,
        healthScore: healthData.score,
        status: healthData.status,
        wateringFrequency: parseInt(formData.wateringFrequency, 10),
      });
      onClose();
    } finally {
      setSaving(false);
    }
  };

  if (!isOpen || !crop) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#05070A]/80 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-surface-container rounded-[2rem] border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-6 md:px-8 md:py-6 border-b border-outline-variant/20 flex justify-between items-center relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            <div className="z-10 relative">
              <h2 className="font-headline-sm text-2xl font-bold text-on-surface flex items-center gap-2 tracking-tight">
                <span className="material-symbols-outlined text-tertiary text-[24px]">edit_note</span>
                Edit Crop
              </h2>
              <p className="font-body-md text-sm text-on-surface-variant mt-1">
                Update <span className="text-on-surface font-semibold">{crop.name}</span>
              </p>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors border border-outline-variant/30 z-10">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6 md:px-8 bg-surface-container-lowest/50">
            <form id="edit-crop-form" onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Crop Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md shadow-sm"
                />
              </div>

              {/* Species */}
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Species</label>
                <input
                  type="text"
                  name="species"
                  required
                  value={formData.species}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all font-body-md shadow-sm"
                />
              </div>

              {/* Location + Watering */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Location</label>
                  <div className="relative">
                    <select
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface appearance-none focus:outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-all font-body-md shadow-sm"
                    >
                      <option value="Indoor">Indoor</option>
                      <option value="Outdoor">Outdoor</option>
                      <option value="Greenhouse">Greenhouse</option>
                      <option value="Hydroponic">Hydroponic</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Water (Days)</label>
                  <input
                    type="number"
                    name="wateringFrequency"
                    min="1"
                    required
                    value={formData.wateringFrequency}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-body-md shadow-sm"
                  />
                </div>
              </div>

              {/* Health + Growth */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Health Status</label>
                  <div className="relative">
                    <select
                      name="healthStatus"
                      value={formData.healthStatus}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface appearance-none focus:outline-none focus:border-error focus:ring-1 focus:ring-error transition-all font-body-md shadow-sm"
                    >
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Warning">Warning</option>
                      <option value="Critical">Critical</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Growth Stage</label>
                  <div className="relative">
                    <select
                      name="growthStage"
                      value={formData.growthStage}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface appearance-none focus:outline-none focus:border-warning focus:ring-1 focus:ring-warning transition-all font-body-md shadow-sm"
                    >
                      <option value="Seed">Seed</option>
                      <option value="Germination">Germination</option>
                      <option value="Vegetative">Vegetative</option>
                      <option value="Flowering">Flowering</option>
                      <option value="Fruiting">Fruiting</option>
                      <option value="Harvest">Harvest</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Agronomist Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add notes about this crop..."
                  rows="3"
                  className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md shadow-sm resize-none"
                ></textarea>
              </div>

            </form>
          </div>

          {/* Footer */}
          <div className="p-6 md:px-8 md:py-5 border-t border-outline-variant/20 bg-surface/80 backdrop-blur-xl flex justify-end gap-4 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-label-sm text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              form="edit-crop-form"
              disabled={saving}
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:brightness-110 text-on-primary rounded-xl font-label-sm text-sm font-semibold transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] glow-primary disabled:opacity-50"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-primary/30 border-t-on-primary rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">check</span>
                  Save Changes
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
