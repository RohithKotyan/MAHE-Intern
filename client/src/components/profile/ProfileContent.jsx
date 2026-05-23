import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import ProfileHero from './ProfileHero';
import TabOverview from './TabOverview';
import TabFarm from './TabFarm';
import TabCommunity from './TabCommunity';

// --- MOCK DATA ---
const currentUser = {
  name: 'Rohith Kotyan',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ',
  location: 'Udupi, Karnataka',
  rank: 'Growing Farmer',
  bio: 'Growing smarter with AI farming. Specializing in greenhouse tomatoes and organic pest control.',
  followers: 240,
  following: 92,
  aiScore: 84, // Out of 100
  isExpert: false
};

const expertUser = {
  name: 'Dr. Aris Thorne',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD06ebSFYCOZmbIJGg0Ugo9pwHtbJ2CEtzN5pmx7pR82iz2Sz1ThMVXoPhYSKVvlxZZAMI45bDZi7cAklEgmBu2yJGf1_X1EOxODgea5RLa-6E9vXj2e2tiJWb_joBeq2YwbLIPA-s3PndPNxfsiVIQo1mz009s81iDXDis6JaIsOxwPk51NVSE9Hn07zIL5vqiUnic5ehcN8l5GMaOLGFJdVuR2Z3cT3r0sfcK8HvmTQRdNHDlEkzDFvgWAOjtWwAIAOEP7TvQg',
  location: 'Bangalore, Karnataka',
  rank: 'Verified Pathologist',
  bio: 'Plant pathologist focusing on nightshade crops. Dedicated to helping farmers transition to biological control methods.',
  followers: '12.4k',
  following: 15, // Years of experience for experts
  trustScore: 96,
  accuracy: '94%',
  isExpert: true
};

export default function ProfileContent() {
  const [activeTab, setActiveTab] = useState('Overview');
  // Toggle this to see the expert view!
  const [isExpertView, setIsExpertView] = useState(false); 

  const activeUser = isExpertView ? expertUser : currentUser;

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
    <div className="pt-20 pb-12 px-container-margin max-w-6xl mx-auto flex flex-col gap-8">
      
      {/* Dev Toggle - Remove in production */}
      <div className="flex justify-end mb-[-20px] relative z-20">
        <button 
          onClick={() => setIsExpertView(!isExpertView)}
          className="text-[10px] bg-surface-container-high px-3 py-1 rounded-full border border-outline-variant/30 text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[12px]">swap_horiz</span>
          Preview as {isExpertView ? 'Farmer' : 'Expert'}
        </button>
      </div>

      {/* Main Profile Header */}
      <ProfileHero user={activeUser} isExpert={activeUser.isExpert} />

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
