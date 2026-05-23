import React, { useState } from 'react';
import PostCard from '../community/PostCard';
import ExpertCard from '../community/ExpertCard';
import TrendingWidget from '../community/TrendingWidget';
import SeasonalAlerts from '../community/SeasonalAlerts';
import TopContributors from '../community/TopContributors';

// --- MOCK DATA ---

const currentUser = {
  name: 'Rohith Kotyan',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ',
  rank: 'Growing Farmer'
};

const mockPosts = [
  {
    id: 1,
    type: 'disease_question',
    author: {
      name: 'Rohith Kotyan',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ',
      rank: 'Growing Farmer',
      isExpert: false
    },
    timestamp: '2 hours ago',
    content: 'My tomato plants show yellow leaves with dark concentric spots starting from the lower leaves. Is this Early Blight?',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAG0wLElSY9RNYBf1Oz8Qea6qRyt74PWaNry9ilftQidLyFflzXLSbBdUxvDGyA0868a7TQ-KVN5bwuz16x2I_SBY2RIyjOhI_qOYll4MQZJQwwf29lzT9eOZiRo96CYrgIYg87fpV_fKsmTZ7xZHWkjRoHl854hYbF1sZX0lkVsU83xuu0NPsmKSHvz-J86HJ9UO9XU5IdyWO_GXkoapfNWcmSWMF_uNwlBGeeYMVvT_XT8PhLZjqGWiKiyktHsNrhxNsyMbG4aA',
    tags: ['Tomato', 'Disease', 'Help'],
    likes: 5,
    helpfulVotes: 2,
    comments: 4
  },
  {
    id: 2,
    type: 'expert_advice',
    author: {
      name: 'Dr. Aris Thorne',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD06ebSFYCOZmbIJGg0Ugo9pwHtbJ2CEtzN5pmx7pR82iz2Sz1ThMVXoPhYSKVvlxZZAMI45bDZi7cAklEgmBu2yJGf1_X1EOxODgea5RLa-6E9vXj2e2tiJWb_joBeq2YwbLIPA-s3PndPNxfsiVIQo1mz009s81iDXDis6JaIsOxwPk51NVSE9Hn07zIL5vqiUnic5ehcN8l5GMaOLGFJdVuR2Z3cT3r0sfcK8HvmTQRdNHDlEkzDFvgWAOjtWwAIAOEP7TvQg',
      isExpert: true,
      specialization: 'Pest Management & Biological Control Expert',
      trustScore: 98,
      accuracy: '96%'
    },
    timestamp: '5 hours ago',
    content: 'With the upcoming humidity spike in the southern region, preemptive application of Trichoderma viride is highly recommended for all nightshade crops to prevent fungal outbreaks.',
    tags: ['Prevention', 'Fungal', 'Weather'],
    likes: 124,
    helpfulVotes: 89,
    comments: 12
  },
  {
    id: 3,
    type: 'scan_result',
    author: {
      name: 'Sarah Jenkins',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUgCi8obCg6CrWuESZXaIGCyHgTW-gAUIGVHP80hfMRI4IROWOCJN7O6FcDAXMU1ol4OTNGrYrOHXtfiN0FxenU4mImFayt-sSyli7xGm-sVjHhNlhTEB-wau7nb8C4ZZHW2mqkjmuLrDGQtnoOe2_MPYK7P1Mlg0YoFCRJcHD8qo6izbsbeMZslI_OdR-9mCUTWN9zHwrC7BgFjqvmzFa12Z_xsCn82oYr34QtWRAE71SW4yFIYClhoD8Y3n3JZPJy6rLOgmFIQ',
      rank: 'Advanced Farmer',
      isExpert: false
    },
    timestamp: '1 day ago',
    content: 'Just ran a scan on Sector 4. The AI picked up early signs of Powdery Mildew. Glad I caught this early before it spread!',
    scanResult: {
      disease: 'Powdery Mildew',
      confidence: 94,
      severity: 'Medium',
      cropId: 'crop-123'
    },
    tags: ['Scan', 'PowderyMildew', 'EarlyDetection'],
    likes: 34,
    helpfulVotes: 12,
    comments: 3
  },
  {
    id: 4,
    type: 'success_story',
    author: {
      name: 'Marcus Vane',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9iIM4uWRIQjAA5y8UP7BjT9sKAvR50PhXRaGqxQvLC1KDkp_HF7cnpuR_MwWQEsO2WbycMzgbrJnYkz8Pmpm16G1MiMbXDIQNO7sbfqIqle3jUEf4p7TTF68VStIRadnSZWnGg6qkRfVheJZlKBjxVtm06LuNkYo05wMvPHpD1E7SMx1WFDUFEKZZox5UO3TEGlDHHco6ulJ4lIbWye9zsdIiZpEtUVW54XoC3wc-fZBlw0YJuBAM_7LFJxkXH-c0QhXXHQArcQ',
      rank: 'Trusted Farmer',
      isExpert: false
    },
    timestamp: '2 days ago',
    content: 'Implemented the new targeted fertigation schedule recommended by the AI. Seeing a 15% improvement in leaf vitality metrics already within the first week!',
    tags: ['Success', 'Fertigation', 'Yield'],
    likes: 88,
    helpfulVotes: 45,
    comments: 8
  }
];

const topExperts = [
  { name: 'Dr. Aris Thorne', specialization: 'Pest Management', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAD06ebSFYCOZmbIJGg0Ugo9pwHtbJ2CEtzN5pmx7pR82iz2Sz1ThMVXoPhYSKVvlxZZAMI45bDZi7cAklEgmBu2yJGf1_X1EOxODgea5RLa-6E9vXj2e2tiJWb_joBeq2YwbLIPA-s3PndPNxfsiVIQo1mz009s81iDXDis6JaIsOxwPk51NVSE9Hn07zIL5vqiUnic5ehcN8l5GMaOLGFJdVuR2Z3cT3r0sfcK8HvmTQRdNHDlEkzDFvgWAOjtWwAIAOEP7TvQg', trustScore: 98, followers: '12.4k' },
  { name: 'Dr. Elena Rostova', specialization: 'Soil Pathology', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaLKs5JyAmWJetNFji2sn7D7jwlPY5oQhiQ5ui0p-LMvuD6SnwhXTz-bcxErJYGzparrDoaSX5WNTO6uXfLZRHfKcwZQgsMWYJXdKh05NayugHlGM-f5ExF0wWAaRY9rMhxIOQgimxOSR6CNoE6u5uwIM1pUom1cB784LW8y319q5xGI_Ya2-fQ6fZznFM6-icGhk6MMREqoSqaL68VSaG5p7qM_RQpDqEN3-UUY9ogQFDESNA7lbwxOWsyc2yBaU2DAeZIUlVIQ', trustScore: 95, followers: '8.2k' },
  { name: 'Prof. Ankit Patel', specialization: 'Precision Agriculture', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZgZ32cmVoByyARjAvio2xbDLsCq2MwsWefs6ReH7UunBfLSXNISaauhVOLK7qWWCKiUjKIsRnbknC6qwoId_VIAG0wZyXYHFKiiEYzmUh1vkLwCdvhTBzYa5bJn7jiUxLRcqPqPLFYwjxvsXogA6DfJguj4F72zIPREpqp0YzEUTdSDoloZfN85RSK6l9gETuTg90Arbn9X-ZjtgYHpBBVohBBpD_Kgffvl5ED8f4an9lZaea2Qq1p7C2ETJPi67C_NLYgoY9LQ', trustScore: 92, followers: '5.1k' },
];

export default function CommunityHubContent() {
  const [activeTab, setActiveTab] = useState('All');
  const tabs = ['All', 'My Region', 'Diseases', 'Expert Advice', 'Trending'];

  return (
    <div className="pt-6 pb-12 px-container-margin max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
      
      {/* Main Feed Column */}
      <div className="flex-1 w-full max-w-3xl mx-auto lg:mx-0 flex flex-col gap-6">
        
        {/* Header / Title (Mobile only) */}
        <div className="lg:hidden mb-2">
          <h1 className="font-headline-lg-mobile text-on-surface">Community Hub</h1>
          <p className="font-body-md text-on-surface-variant text-sm">Connect with farmers and experts.</p>
        </div>

        {/* Create Post Bar */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-4">
          <img src={currentUser.avatar} alt="You" className="w-10 h-10 rounded-full border border-outline-variant/30 object-cover shrink-0" />
          <button className="flex-1 bg-surface-container/50 hover:bg-surface-container transition-colors rounded-full border border-outline-variant/30 px-4 py-2.5 text-left text-on-surface-variant font-body-md text-sm cursor-text">
            What's happening on your farm?
          </button>
          <div className="flex items-center gap-1 shrink-0">
            <button className="w-9 h-9 rounded-full text-primary hover:bg-primary/10 flex items-center justify-center transition-colors tooltip-trigger relative group">
              <span className="material-symbols-outlined text-[20px]">image</span>
              <span className="absolute -top-8 bg-surface-container-high text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Upload Image</span>
            </button>
            <button className="w-9 h-9 rounded-full text-primary hover:bg-primary/10 flex items-center justify-center transition-colors tooltip-trigger relative group">
              <span className="material-symbols-outlined text-[20px]">center_focus_strong</span>
              <span className="absolute -top-8 bg-surface-container-high text-on-surface text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">Share Scan Result</span>
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-2 -mx-4 px-4 md:mx-0 md:px-0">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 px-4 py-1.5 rounded-full font-label-sm text-sm font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-primary text-on-primary-fixed shadow-[0_0_10px_rgba(16,185,129,0.3)]' 
                  : 'bg-surface-container border border-outline-variant/30 text-on-surface-variant hover:text-on-surface hover:border-outline-variant'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Post Feed */}
        <div className="flex flex-col gap-5">
          {mockPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

      </div>

      {/* Right Intelligence Panel (Desktop Only) */}
      <div className="hidden lg:flex flex-col w-[320px] xl:w-[340px] shrink-0 gap-5 pb-12">
        
        {/* Desktop Header */}
        <div className="mb-2">
          <h1 className="font-headline-lg text-on-surface">Intelligence Network</h1>
          <p className="font-body-md text-on-surface-variant">Global agricultural insights.</p>
        </div>

        <TrendingWidget />
        
        <SeasonalAlerts />

        {/* Top Experts Widget */}
        <div className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              <h4 className="font-body-md text-sm font-semibold text-on-surface">Top Experts</h4>
            </div>
            <a href="#" className="text-primary hover:underline font-label-sm text-[11px]">View All</a>
          </div>
          <div className="space-y-1">
            {topExperts.map((expert, i) => (
              <ExpertCard key={i} {...expert} />
            ))}
          </div>
        </div>

        <TopContributors />

      </div>

    </div>
  );
}
