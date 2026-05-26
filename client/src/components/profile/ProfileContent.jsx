import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import ProfileHero from './ProfileHero';
import TabOverview from './TabOverview';
import TabFarm from './TabFarm';
import TabCommunity from './TabCommunity';

import { useAuth } from '../../context/AuthContext';

export default function ProfileContent() {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('Overview');
  const navigate = useNavigate();

  if (loading || !user) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          <p className="text-on-surface-variant font-body-md text-sm">Loading Profile...</p>
        </div>
      </div>
    );
  }

  const isExpert = user.role === 'expert';

  // --- FALLBACK DATA FOR PHASE 1 ---
  // We merge the real DB fields with fallback stats so the UI doesn't break
  const activeUser = {
    ...user,
    avatar: user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    rank: isExpert ? 'Verified Pathologist' : 'Growing Farmer',
    followers: isExpert ? '12.4k' : 0,
    following: isExpert ? 15 : 0, // Years of exp for experts, following for farmers
    aiScore: 84,
    trustScore: 96,
    accuracy: '94%',
    isExpert: isExpert
  };

  const tabs = [
    { id: 'Overview', icon: 'dashboard' },
    { id: 'My Farm', icon: 'potted_plant' },
    { id: 'Community', icon: 'groups' }
  ];

  const renderTabContent = () => {
    switch(activeTab) {
      case 'Overview': return <TabOverview user={activeUser} isExpert={activeUser.isExpert} />;
      case 'My Farm': return <TabFarm user={activeUser} />;
      case 'Community': return <TabCommunity user={activeUser} isExpert={activeUser.isExpert} />;
      default: return <TabOverview user={activeUser} isExpert={activeUser.isExpert} />;
    }
  };

  return (
    <div className="pt-6 pb-20 px-4 max-w-7xl mx-auto flex flex-col gap-6">
      
      {/* Main Profile Header */}
      <ProfileHero user={activeUser} isExpert={activeUser.isExpert} onEditProfile={() => navigate('/dashboard/settings')} />

      {/* Tab Navigation */}
      <div className="glass-panel rounded-2xl p-2 flex overflow-x-auto hide-scrollbar gap-2 sticky top-[72px] z-40 relative">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex-1 min-w-[120px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-body-md text-sm font-semibold transition-colors duration-300 z-10 ${
                isActive 
                  ? 'text-on-primary-fixed' 
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="profile-tab-indicator"
                  className="absolute inset-0 bg-primary rounded-xl shadow-md z-[-1]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="material-symbols-outlined text-[20px] relative z-10">{tab.icon}</span>
              <span className="relative z-10">{tab.id}</span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Content Container */}
      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
