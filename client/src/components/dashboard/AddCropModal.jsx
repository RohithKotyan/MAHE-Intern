import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const POPULAR_CROPS = [
  { icon: '🍅', name: 'Tomato', species: 'Solanum lycopersicum' },
  { icon: '🥒', name: 'Cucumber', species: 'Cucumis sativus' },
  { icon: '🌶', name: 'Chilli', species: 'Capsicum annuum' },
  { icon: '🥬', name: 'Cabbage', species: 'Brassica oleracea' },
  { icon: '🌽', name: 'Corn', species: 'Zea mays' },
  { icon: '🌾', name: 'Rice', species: 'Oryza sativa' },
];

export default function AddCropModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    species: '',
    location: 'Indoor',
    wateringFrequency: 3,
    healthStatus: 'Healthy',
    growthStage: 'Vegetative',
    notes: '',
    imageUrl: '',
    plantedAt: new Date().toISOString().split('T')[0]
  });
  
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Use FileReader to convert image to base64 string so it persists in the database
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const selectPopularCrop = (crop) => {
    setFormData(prev => ({
      ...prev,
      species: crop.species,
      name: prev.name ? prev.name : `${crop.name} Batch A1`
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Map simplified condition to proper backend status and healthStatus
    const healthMapping = {
      'Healthy': { score: 95, healthStatus: 'Excellent', status: 'Healthy' },
      'Needs Attention': { score: 60, healthStatus: 'Warning', status: 'Warning' },
      'Diseased': { score: 30, healthStatus: 'Critical', status: 'Diseased' }
    };
    
    // Map simplified UI growth stage to backend growthStage enum
    const growthStageMapping = {
      'Seedling': 'Seed',
      'Vegetative': 'Vegetative',
      'Flowering': 'Flowering',
      'Fruiting': 'Fruiting',
      'Harvest': 'Harvest'
    };

    const healthData = healthMapping[formData.healthStatus] || healthMapping['Healthy'];
    const mappedGrowthStage = growthStageMapping[formData.growthStage] || 'Vegetative';
    
    await onAdd({
      ...formData,
      healthScore: healthData.score,
      healthStatus: healthData.healthStatus,
      status: healthData.status,
      growthStage: mappedGrowthStage,
      wateringFrequency: parseInt(formData.wateringFrequency, 10),
      plantedAt: new Date(formData.plantedAt).toISOString()
    });
    setFormData({ name: '', species: '', location: 'Indoor', wateringFrequency: 3, healthStatus: 'Healthy', growthStage: 'Vegetative', notes: '', imageUrl: '', plantedAt: new Date().toISOString().split('T')[0] });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
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
          className="relative w-full max-w-5xl bg-surface-container rounded-[2rem] border border-outline-variant/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh]"
        >
          {/* Header section */}
          <div className="p-6 md:px-10 md:py-8 border-b border-outline-variant/20 flex flex-col relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="flex justify-between items-start z-10 relative">
              <div>
                <h2 className="font-headline-sm text-3xl font-bold text-on-surface mb-2 flex items-center gap-3 tracking-tight">
                  <span className="text-3xl">🌱</span> Register New Crop
                </h2>
                <p className="font-body-md text-base text-on-surface-variant max-w-lg leading-relaxed">
                  Onboard a new crop into AgroCare AI to track health, optimize watering, and detect diseases automatically.
                </p>
              </div>
              <button onClick={onClose} className="w-10 h-10 rounded-full bg-surface-container-high hover:bg-surface-variant flex items-center justify-center text-on-surface-variant transition-colors border border-outline-variant/30">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto no-scrollbar bg-surface-container-lowest/50 flex flex-col lg:flex-row">
            
            {/* Left Side: Live Preview & AI Panel */}
            <div className="w-full lg:w-[380px] p-6 md:p-10 border-b lg:border-b-0 lg:border-r border-outline-variant/20 bg-surface-container-lowest/80 flex flex-col gap-8 shrink-0">
              
              {/* Live Preview Card */}
              <div>
                <h3 className="font-label-sm text-xs uppercase tracking-widest text-on-surface-variant mb-4 font-semibold">Live Preview</h3>
                <div className="glass-panel rounded-2xl overflow-hidden border border-outline-variant/30 shadow-lg flex flex-col bg-surface">
                  {/* Image Area */}
                  <div className="h-40 w-full bg-surface-container-high relative group overflow-hidden">
                    {formData.imageUrl ? (
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-on-surface-variant/40">
                        <span className="material-symbols-outlined text-4xl mb-2">park</span>
                        <span className="font-label-sm text-[10px] uppercase tracking-widest">Crop Photo</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-3 left-4 right-4 flex justify-between items-end">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-[10px] uppercase tracking-widest text-white/80">{formData.species || 'Species'}</span>
                        <span className="font-headline-sm text-lg font-bold text-white truncate w-48">{formData.name || 'Crop Name'}</span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-surface/20 backdrop-blur-md flex items-center justify-center border border-white/20">
                        <span className="material-symbols-outlined text-white text-[16px]">psychiatry</span>
                      </div>
                    </div>
                  </div>
                  {/* Details Area */}
                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-secondary">location_on</span>
                        <span className="font-label-sm text-xs">{formData.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-warning">moving</span>
                        <span className="font-label-sm text-xs">{formData.growthStage}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-error">monitor_heart</span>
                        <span className="font-label-sm text-xs">{formData.healthStatus}</span>
                      </div>
                      <div className="flex items-center gap-2 text-on-surface-variant">
                        <span className="material-symbols-outlined text-[16px] text-blue-500">water_drop</span>
                        <span className="font-label-sm text-xs">Every {formData.wateringFrequency}d</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Ready Panel */}
              <div className="glass-panel p-5 rounded-2xl border border-primary/20 bg-primary/5 flex flex-col gap-3 relative overflow-hidden">
                <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-[100px] text-primary/5 pointer-events-none">auto_awesome</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[20px]">auto_awesome</span>
                  <h4 className="font-body-md font-bold text-on-surface text-sm">AgroCare AI Ready</h4>
                </div>
                <p className="font-body-md text-xs text-on-surface-variant leading-relaxed mb-1">
                  Once registered, this crop will immediately connect to the intelligence network:
                </p>
                <ul className="space-y-2 font-label-sm text-xs text-on-surface-variant">
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-primary">check_circle</span> Automated Health Tracking</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-primary">check_circle</span> Disease Scanner Support</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-primary">check_circle</span> Smart Watering Alerts</li>
                  <li className="flex items-center gap-2"><span className="material-symbols-outlined text-[14px] text-primary">check_circle</span> Harvest Prediction</li>
                </ul>
              </div>

            </div>

            {/* Right Side: Form */}
            <div className="flex-1 p-6 md:p-10">
              <form id="add-crop-form" onSubmit={handleSubmit} className="space-y-8">
                
                {/* Section 1: Visuals & Core Identity */}
                <div className="space-y-6">
                  <div>
                    <h3 className="font-label-sm text-sm uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2 border-b border-outline-variant/20 pb-2 mb-4">
                      <span className="material-symbols-outlined text-[18px]">camera_alt</span>
                      Visuals
                    </h3>
                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full border-2 border-dashed border-outline-variant/40 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-surface-container hover:border-primary/50 transition-all group"
                    >
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                      />
                      <div className="w-12 h-12 rounded-full bg-surface-container-high flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary/10 transition-all">
                        <span className="material-symbols-outlined text-[24px] text-on-surface-variant group-hover:text-primary transition-colors">cloud_upload</span>
                      </div>
                      <span className="font-label-sm text-sm font-semibold text-on-surface mb-1">Click to browse or drag image here</span>
                      <span className="font-label-sm text-xs text-on-surface-variant">Supports JPG, PNG, WEBP (Max 5MB)</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-label-sm text-sm uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2 border-b border-outline-variant/20 pb-2 mb-4">
                      <span className="material-symbols-outlined text-[18px]">psychiatry</span>
                      Identity
                    </h3>
                    
                    <div className="mb-4">
                      <span className="font-label-sm text-[10px] uppercase tracking-widest text-on-surface-variant block mb-2">Popular Presets</span>
                      <div className="flex flex-wrap gap-2">
                        {POPULAR_CROPS.map(c => (
                          <button 
                            key={c.name}
                            type="button"
                            onClick={() => selectPopularCrop(c)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container rounded-full border border-outline-variant/30 hover:border-primary hover:bg-primary/5 font-label-sm text-xs transition-colors"
                          >
                            <span>{c.icon}</span>
                            <span>{c.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Crop Name</label>
                        <input 
                          type="text" 
                          name="name" 
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g. Tomato Batch A1"
                          className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md shadow-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Species</label>
                        <input 
                          type="text" 
                          name="species" 
                          required
                          value={formData.species}
                          onChange={handleChange}
                          placeholder="e.g. Solanum lycopersicum"
                          className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-tertiary focus:ring-1 focus:ring-tertiary transition-all font-body-md shadow-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Section 2: Environment & Status */}
                <div>
                  <h3 className="font-label-sm text-sm uppercase tracking-widest text-on-surface-variant font-bold flex items-center gap-2 border-b border-outline-variant/20 pb-2 mb-4">
                    <span className="material-symbols-outlined text-[18px]">dashboard</span>
                    Environment & Status
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Planting Date</label>
                      <input 
                        type="date" 
                        name="plantedAt" 
                        required
                        value={formData.plantedAt}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md shadow-sm"
                      />
                    </div>
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
                      <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Growth Stage</label>
                      <div className="relative">
                        <select 
                          name="growthStage" 
                          value={formData.growthStage}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface appearance-none focus:outline-none focus:border-warning focus:ring-1 focus:ring-warning transition-all font-body-md shadow-sm"
                        >
                          <option value="Seedling">Seedling</option>
                          <option value="Vegetative">Vegetative</option>
                          <option value="Flowering">Flowering</option>
                          <option value="Fruiting">Fruiting</option>
                          <option value="Harvest">Harvest</option>
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest flex items-center justify-between">
                      Current Condition
                      <span className="text-[9px] bg-primary/10 text-primary px-2 py-0.5 rounded-full lowercase">AI will track this</span>
                    </label>
                    <div className="relative">
                      <select 
                        name="healthStatus" 
                        value={formData.healthStatus}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface appearance-none focus:outline-none focus:border-error focus:ring-1 focus:ring-error transition-all font-body-md shadow-sm"
                      >
                        <option value="Healthy">🟢 Healthy</option>
                        <option value="Needs Attention">🟡 Needs Attention</option>
                        <option value="Diseased">🔴 Diseased</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">expand_more</span>
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="font-label-sm text-xs text-on-surface-variant uppercase tracking-widest">Agronomist Notes</label>
                    <textarea 
                      name="notes" 
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Optional notes..."
                      rows="1"
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-body-md shadow-sm resize-none"
                    ></textarea>
                  </div>
                </div>

              </form>
            </div>
          </div>

          {/* Footer Action Bar */}
          <div className="p-6 md:px-10 md:py-6 border-t border-outline-variant/20 bg-surface/80 backdrop-blur-xl flex justify-end gap-4 shrink-0">
            <button 
              type="button" 
              onClick={onClose}
              className="px-6 py-3 rounded-xl font-label-sm text-sm font-semibold text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              form="add-crop-form"
              className="flex items-center gap-2 px-8 py-3 bg-primary hover:brightness-110 text-on-primary rounded-xl font-label-sm text-sm font-semibold transition-all shadow-[0_4px_20px_rgba(16,185,129,0.3)] glow-primary"
            >
              <span className="text-lg leading-none">🚀</span> Create Crop Profile
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
