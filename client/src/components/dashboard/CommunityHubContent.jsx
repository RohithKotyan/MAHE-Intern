import { useState, useEffect } from 'react';
import PostCard from '../community/PostCard';
import TrendingWidget from '../community/TrendingWidget';
import SeasonalAlerts from '../community/SeasonalAlerts';
import TopContributors from '../community/TopContributors';
import CreatePostModal from '../community/CreatePostModal';
import { communityService } from '../../services/services';
import { useAuth } from '../../context/AuthContext';
import { transformPost } from '../../utils/transformPost';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { PostSkeleton } from '../common/Skeletons';

const TAB_CATEGORY_MAP = {
  'All': null,
  'Questions': 'question',
  'Tips & Advice': 'tip',
  'Showcases': 'showcase',
  'Discussions': 'discussion',
};

export default function CommunityHubContent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const tabs = Object.keys(TAB_CATEGORY_MAP);

  useEffect(() => {
    let mounted = true;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);

    const category = TAB_CATEGORY_MAP[activeTab];
    const params = { page: 1, limit: 10 };
    if (category) params.category = category;

    communityService.getPosts(params)
      .then(res => {
        if (!mounted) return;
        const fetchedPosts = res.data.data.posts.map(transformPost);
        setPosts(fetchedPosts);
      })
      .catch(() => {
        if (mounted) {
          setPosts([]);
          toast.error('Failed to load posts');
        }
      })
      .finally(() => {
        if (mounted) setIsLoading(false);
      });

    return () => { mounted = false; };
  }, [activeTab]);

  const handlePostCreated = (rawPost) => {
    setPosts(prev => [transformPost(rawPost), ...prev]);
    setShowCreateModal(false);
  };

  const handlePostDeleted = (postId) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  return (
    <div className="w-full pt-6 pb-12 px-container-margin max-w-7xl mx-auto flex flex-col lg:flex-row gap-6 lg:gap-8">
      
      {/* Main Feed Column */}
      <div className="flex-1 min-w-0 w-full max-w-3xl mx-auto lg:mx-0 flex flex-col gap-6">
        
        {/* Header / Title (Mobile only) */}
        <div className="lg:hidden mb-2">
          <h1 className="font-headline-lg-mobile text-on-surface">Community Hub</h1>
          <p className="font-body-md text-on-surface-variant text-sm">Connect with farmers and experts.</p>
        </div>

        {/* Create Post Bar */}
        <div className="glass-panel rounded-2xl p-4 flex items-center gap-4">
          <img src={user?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} alt="You" className="w-10 h-10 rounded-full border border-outline-variant/30 object-cover shrink-0" />
          <button 
            onClick={() => setShowCreateModal(true)}
            className="flex-1 bg-surface-container/50 hover:bg-surface-container transition-colors rounded-full border border-outline-variant/30 px-4 py-2.5 text-left text-on-surface-variant font-body-md text-sm cursor-text"
          >
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
        <div className="flex flex-col gap-5 min-h-[50vh]">
          {isLoading ? (
            <div className="flex flex-col gap-5 w-full h-full min-h-[300px]">
              {[1, 2, 3].map(i => (
                <PostSkeleton key={i} />
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center p-8 glass-card rounded-2xl w-full min-h-[300px] flex flex-col items-center justify-center">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/50 mb-3">forum</span>
              <h3 className="font-headline-sm text-on-surface mb-1">
                {activeTab === 'All' ? 'No posts yet.' : `No ${activeTab.toLowerCase()} yet.`}
              </h3>
              <p className="text-sm text-on-surface-variant mb-4">Be the first to share something with the community!</p>
              <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg text-sm font-semibold transition-colors">Create a Post</button>
            </div>
          ) : (
            posts.map(post => (
              <PostCard 
                key={post.id} 
                post={post} 
                currentUserId={user?._id} 
                onDeleted={handlePostDeleted} 
                onProfileClick={(id) => navigate(`/dashboard/user/${id}`)}
              />
            ))
          )}
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
          <div className="space-y-1 text-center py-4 text-on-surface-variant text-sm">
            Expert leaderboard coming soon!
          </div>
        </div>

        <TopContributors />

      </div>
      
      <CreatePostModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
        onPostCreated={handlePostCreated} 
      />
    </div>
  );
}
