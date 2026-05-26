import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { userService } from '../../services/services';

export default function TabSettings() {
  const [activeMenu, setActiveMenu] = useState('account');
  const { user, logout, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  // --- Profile Form State ---
  const [formData, setFormData] = useState({
    name: user?.name || '',
    location: user?.location || '',
    bio: user?.bio || '',
    phone: user?.phone || ''
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfileSave = async () => {
    try {
      setIsSaving(true);
      setMessage({ type: '', text: '' });
      const res = await userService.updateProfile(formData);
      updateUser(res.data.data.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to update profile' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      setMessage({ type: '', text: '' });
      const uploadData = new FormData();
      uploadData.append('image', file);
      const res = await userService.updateAvatar(uploadData);
      updateUser({ avatar: res.data.data.avatar });
      setMessage({ type: 'success', text: 'Avatar updated successfully!' });
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to upload avatar' });
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      
      {/* Settings Navigation Sidebar */}
      <div className="w-full md:w-64 shrink-0 flex flex-col gap-2">
        <button 
          onClick={() => setActiveMenu('account')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body-md text-sm transition-colors border-l-4 ${
            activeMenu === 'account' 
              ? 'bg-primary/10 text-primary font-semibold border-l-primary' 
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeMenu === 'account' ? "'FILL' 1" : "'FILL' 0" }}>person</span>
          Account Settings
        </button>
        <button 
          onClick={() => setActiveMenu('notifications')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body-md text-sm transition-colors border-l-4 ${
            activeMenu === 'notifications' 
              ? 'bg-primary/10 text-primary font-semibold border-l-primary' 
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeMenu === 'notifications' ? "'FILL' 1" : "'FILL' 0" }}>notifications</span>
          Notifications
        </button>
        <button className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface rounded-xl font-body-md text-sm transition-colors border-l-4 border-transparent">
          <span className="material-symbols-outlined text-[20px]">security</span>
          Security
        </button>
        <button 
          onClick={() => setActiveMenu('appearance')}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl font-body-md text-sm transition-colors border-l-4 ${
            activeMenu === 'appearance' 
              ? 'bg-primary/10 text-primary font-semibold border-l-primary' 
              : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface border-transparent'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeMenu === 'appearance' ? "'FILL' 1" : "'FILL' 0" }}>palette</span>
          Appearance
        </button>
      </div>

      {/* Settings Content Area */}
      <div className="flex-1 glass-panel rounded-2xl p-6 relative min-h-[400px]">
        {activeMenu === 'account' && (
          <div className="animate-in fade-in duration-300">
            <div className="flex justify-between items-center border-b border-outline-variant/20 pb-4 mb-6">
              <h2 className="font-body-md text-xl font-bold text-on-surface">Account Profile</h2>
              {message.text && (
                <span className={`text-sm font-semibold px-3 py-1 rounded-full ${message.type === 'success' ? 'bg-primary/20 text-primary' : 'bg-error/20 text-error'}`}>
                  {message.text}
                </span>
              )}
            </div>
            
            <div className="space-y-6 max-w-2xl">
              <div className="flex items-center gap-6">
                <div className="relative">
                  <img src={user?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-outline-variant/30" />
                  {isUploading && (
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <div>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/png, image/jpeg, image/gif" onChange={handleAvatarUpload} />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="px-4 py-2 bg-surface-container-high hover:bg-surface-variant text-on-surface text-sm font-semibold rounded-lg transition-colors border border-outline-variant/30 mb-2 disabled:opacity-50"
                  >
                    {isUploading ? 'Uploading...' : 'Change Avatar'}
                  </button>
                  <div className="text-on-surface-variant text-[10px]">JPG, GIF or PNG. Max size of 2MB.</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-label-sm text-[11px] text-on-surface-variant mb-1 ml-1 uppercase tracking-wider">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="block font-label-sm text-[11px] text-on-surface-variant mb-1 ml-1 uppercase tracking-wider">Location</label>
                  <input type="text" name="location" value={formData.location} onChange={handleInputChange} className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="block font-label-sm text-[11px] text-on-surface-variant mb-1 ml-1 uppercase tracking-wider">Phone</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all" />
                </div>
                <div>
                  <label className="block font-label-sm text-[11px] text-on-surface-variant mb-1 ml-1 uppercase tracking-wider">Email (Read Only)</label>
                  <input type="email" value={user?.email || ''} readOnly className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl px-4 py-3 text-sm text-on-surface-variant/50 focus:outline-none cursor-not-allowed" />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-label-sm text-[11px] text-on-surface-variant mb-1 ml-1 uppercase tracking-wider">Short Bio</label>
                  <textarea name="bio" value={formData.bio} onChange={handleInputChange} rows="3" className="w-full bg-surface-container/50 border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all resize-none"></textarea>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/20 flex justify-end gap-3">
                <button className="px-5 py-2 text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors">Cancel</button>
                <button 
                  onClick={handleProfileSave}
                  disabled={isSaving}
                  className="px-5 py-2 bg-primary text-on-primary-fixed hover:scale-[1.02] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100 min-w-[140px]"
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-on-primary-fixed/30 border-t-on-primary-fixed rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>

              {/* Logout Section */}
              <div className="pt-6 mt-6 border-t border-error/20">
                <h3 className="font-body-md text-sm font-semibold text-error mb-2">Danger Zone</h3>
                <p className="text-xs text-on-surface-variant mb-4">Sign out of your AgroCare AI account on this device.</p>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2.5 bg-error/10 border border-error/30 text-error hover:bg-error hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'notifications' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-body-md text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Notification Preferences</h2>
            
            <div className="space-y-6 max-w-2xl">
              <p className="text-sm text-on-surface-variant mb-4">Choose which notifications you receive in your Notification Center and via email.</p>
              
              <div className="space-y-4">
                {[
                  { id: 'scans', label: 'Scan Results', desc: 'Alerts when your AI crop scans are finished processing.' },
                  { id: 'community', label: 'Community Replies', desc: 'When someone comments on or likes your post.' },
                  { id: 'expert', label: 'Expert Responses', desc: 'When a verified expert answers your question.' },
                  { id: 'reminders', label: 'Treatment Reminders', desc: 'Scheduled reminders for fertilizer, irrigation, and pesticides.' },
                  { id: 'weather', label: 'Weather Alerts', desc: 'Critical weather warnings that might affect your farm.' },
                  { id: 'ai', label: 'AI Insights', desc: 'Weekly automated insights and farm health trends.' }
                ].map((pref) => (
                  <label key={pref.id} className="flex items-start gap-4 p-4 rounded-xl bg-surface-container/30 border border-outline-variant/20 hover:bg-surface-container/60 transition-colors cursor-pointer group">
                    <div className="pt-0.5">
                      <div className="w-5 h-5 rounded border-2 border-primary bg-primary/20 flex items-center justify-center relative">
                        <span className="material-symbols-outlined text-[14px] text-primary" style={{ fontVariationSettings: "'wght' 700" }}>check</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-on-surface mb-0.5">{pref.label}</h4>
                      <p className="text-xs text-on-surface-variant">{pref.desc}</p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-6 border-t border-outline-variant/20 flex justify-end gap-3">
                <button className="px-5 py-2 text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors">Cancel</button>
                <button className="px-5 py-2 bg-primary text-on-primary-fixed hover:scale-[1.02] rounded-xl font-bold text-sm shadow-md transition-all">Save Preferences</button>
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'appearance' && (
          <div className="animate-in fade-in duration-300">
            <h2 className="font-body-md text-xl font-bold text-on-surface mb-6 border-b border-outline-variant/20 pb-4">Appearance Settings</h2>
            
            <div className="space-y-8 max-w-2xl">
              
              {/* Theme Selection */}
              <div>
                <h3 className="text-sm font-semibold text-on-surface mb-4">Color Theme</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Dark Theme Option */}
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="theme" 
                      value="dark" 
                      className="peer sr-only" 
                      checked={theme === 'dark'}
                      onChange={() => setTheme('dark')}
                    />
                    <div className="rounded-2xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/5 p-4 hover:bg-surface-container/50 transition-all flex flex-col items-center gap-3">
                      <div className="w-full h-24 bg-[#111318] rounded-xl border border-[#44474e] flex flex-col p-2 gap-2 overflow-hidden shadow-inner">
                        <div className="h-2 w-1/3 bg-[#44474e] rounded-full"></div>
                        <div className="flex-1 bg-[#1c1f26] rounded-lg border border-[#44474e]/50 p-2 flex flex-col gap-1.5">
                          <div className="h-1.5 w-1/2 bg-[#51D2A1] rounded-full"></div>
                          <div className="h-1.5 w-full bg-[#44474e]/50 rounded-full"></div>
                          <div className="h-1.5 w-4/5 bg-[#44474e]/50 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant peer-checked:text-primary">dark_mode</span>
                        <span className="text-sm font-medium text-on-surface">Dark Mode</span>
                      </div>
                    </div>
                  </label>

                  {/* Light Theme Option */}
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="theme" 
                      value="light" 
                      className="peer sr-only" 
                      checked={theme === 'light'}
                      onChange={() => setTheme('light')}
                    />
                    <div className="rounded-2xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/5 p-4 hover:bg-surface-container/50 transition-all flex flex-col items-center gap-3">
                      <div className="w-full h-24 bg-[#fdfdfd] rounded-xl border border-[#e0e2ec] flex flex-col p-2 gap-2 overflow-hidden shadow-sm">
                        <div className="h-2 w-1/3 bg-[#c4c6d0] rounded-full"></div>
                        <div className="flex-1 bg-[#f0f0f4] rounded-lg border border-[#e0e2ec]/50 p-2 flex flex-col gap-1.5">
                          <div className="h-1.5 w-1/2 bg-[#006C4A] rounded-full"></div>
                          <div className="h-1.5 w-full bg-[#c4c6d0]/50 rounded-full"></div>
                          <div className="h-1.5 w-4/5 bg-[#c4c6d0]/50 rounded-full"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant peer-checked:text-primary">light_mode</span>
                        <span className="text-sm font-medium text-on-surface">Light Mode</span>
                      </div>
                    </div>
                  </label>

                  {/* System Default Option */}
                  <label className="cursor-pointer group">
                    <input 
                      type="radio" 
                      name="theme" 
                      value="system" 
                      className="peer sr-only" 
                      checked={theme === 'system'}
                      onChange={() => setTheme('system')}
                    />
                    <div className="rounded-2xl border-2 border-outline-variant/30 peer-checked:border-primary peer-checked:bg-primary/5 p-4 hover:bg-surface-container/50 transition-all flex flex-col items-center gap-3">
                      <div className="w-full h-24 rounded-xl border border-outline-variant flex overflow-hidden shadow-sm">
                        <div className="flex-1 bg-[#fdfdfd] p-2 flex flex-col gap-2">
                           <div className="h-2 w-2/3 bg-[#c4c6d0] rounded-full"></div>
                           <div className="flex-1 bg-[#f0f0f4] rounded-lg border border-[#e0e2ec]/50"></div>
                        </div>
                        <div className="flex-1 bg-[#111318] p-2 flex flex-col gap-2 border-l border-outline-variant">
                           <div className="h-2 w-2/3 bg-[#44474e] rounded-full"></div>
                           <div className="flex-1 bg-[#1c1f26] rounded-lg border border-[#44474e]/50"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-on-surface-variant peer-checked:text-primary">settings_brightness</span>
                        <span className="text-sm font-medium text-on-surface">System</span>
                      </div>
                    </div>
                  </label>

                </div>
              </div>

              {/* Accent Color Selection */}
              <div>
                <h3 className="text-sm font-semibold text-on-surface mb-4">Material Accent Color</h3>
                <p className="text-xs text-on-surface-variant mb-4">Customize the primary color scheme of AgroCare AI.</p>
                <div className="flex flex-wrap gap-4">
                  {/* Default Green */}
                  <label className="cursor-pointer relative">
                    <input type="radio" name="accent" value="green" className="peer sr-only" defaultChecked />
                    <div className="w-12 h-12 rounded-full bg-[#51D2A1] ring-2 ring-transparent peer-checked:ring-[#51D2A1] peer-checked:ring-offset-2 peer-checked:ring-offset-surface transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#003825] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                    </div>
                  </label>
                  {/* Blue */}
                  <label className="cursor-pointer relative">
                    <input type="radio" name="accent" value="blue" className="peer sr-only" />
                    <div className="w-12 h-12 rounded-full bg-[#60A5FA] ring-2 ring-transparent peer-checked:ring-[#60A5FA] peer-checked:ring-offset-2 peer-checked:ring-offset-surface transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#1E3A8A] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                    </div>
                  </label>
                  {/* Purple */}
                  <label className="cursor-pointer relative">
                    <input type="radio" name="accent" value="purple" className="peer sr-only" />
                    <div className="w-12 h-12 rounded-full bg-[#C084FC] ring-2 ring-transparent peer-checked:ring-[#C084FC] peer-checked:ring-offset-2 peer-checked:ring-offset-surface transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#4C1D95] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                    </div>
                  </label>
                  {/* Amber */}
                  <label className="cursor-pointer relative">
                    <input type="radio" name="accent" value="amber" className="peer sr-only" />
                    <div className="w-12 h-12 rounded-full bg-[#FBBF24] ring-2 ring-transparent peer-checked:ring-[#FBBF24] peer-checked:ring-offset-2 peer-checked:ring-offset-surface transition-all flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#78350F] opacity-0 peer-checked:opacity-100 transition-opacity">check</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Data Density */}
              <div>
                <h3 className="text-sm font-semibold text-on-surface mb-4">Dashboard Density</h3>
                <div className="bg-surface-container/50 border border-outline-variant/30 rounded-xl overflow-hidden">
                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container transition-colors border-b border-outline-variant/20">
                    <div>
                      <h4 className="text-sm font-semibold text-on-surface">Comfortable (Default)</h4>
                      <p className="text-xs text-on-surface-variant">More whitespace, easier to read.</p>
                    </div>
                    <input type="radio" name="density" value="comfortable" className="w-4 h-4 text-primary focus:ring-primary/50" defaultChecked />
                  </label>
                  <label className="flex items-center justify-between p-4 cursor-pointer hover:bg-surface-container transition-colors">
                    <div>
                      <h4 className="text-sm font-semibold text-on-surface">Compact</h4>
                      <p className="text-xs text-on-surface-variant">Fit more data on the screen.</p>
                    </div>
                    <input type="radio" name="density" value="compact" className="w-4 h-4 text-primary focus:ring-primary/50" />
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-outline-variant/20 flex justify-end gap-3">
                <button className="px-5 py-2 text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors">Cancel</button>
                <button className="px-5 py-2 bg-primary text-on-primary-fixed hover:scale-[1.02] rounded-xl font-bold text-sm shadow-md transition-all">Save Preferences</button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
