import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '../services/services';
import PostCard from '../components/community/PostCard';
import { transformPost } from '../utils/transformPost';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const rankColors = {
  'Beginner Farmer': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'Growing Farmer': 'bg-green-900/20 text-green-400 border-green-500/20',
  'Trusted Farmer': 'bg-blue-900/20 text-blue-400 border-blue-500/20',
  'Advanced Farmer': 'bg-amber-900/20 text-amber-400 border-amber-500/20',
  'Community Mentor': 'bg-purple-900/20 text-purple-400 border-purple-500/20',
  'Farmer': 'bg-surface-container-high text-on-surface-variant border-outline-variant/30',
  'expert': 'bg-primary/10 text-primary border-primary/30',
  'admin': 'bg-error/10 text-error border-error/30'
};

export default function PublicProfile() {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const [user, setUser] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      setLoading(true);
      userService.getUserProfile(userId)
        .then(res => {
          setUser(res.data.data.user);
          setRecentPosts(res.data.data.recentPosts.map(transformPost));
        })
        .catch(err => {
          toast.error('Failed to load user profile');
          navigate(-1);
        })
        .finally(() => setLoading(false));
    }
  }, [userId, navigate]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)] w-full">
        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4"></div>
        <p className="text-on-surface-variant text-sm font-medium">Loading profile...</p>
      </div>
    );
  }

  if (!user) return null;

  const isExpert = user?.role === 'expert' || user?.isExpert;
  const rankStyle = rankColors[user?.role] || rankColors[user?.rank] || rankColors['Farmer'];
  const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Recently';

  return (
    <div className="w-full max-w-4xl mx-auto pb-12">
      {/* Back Button */}
      <div className="px-4 md:px-8 py-4">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-medium"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Back
        </button>
      </div>

      <div className="px-4 md:px-8">
        <div className="bg-surface-container-low border border-outline-variant/30 rounded-3xl overflow-hidden shadow-sm flex flex-col mb-8">
          
          {/* Header Banner (Gradient) */}
          <div className={`h-32 md:h-48 w-full ${isExpert ? 'bg-gradient-to-r from-primary/20 to-primary/40' : 'bg-gradient-to-r from-surface-variant to-surface-container-high'}`}>
          </div>

          <div className="px-6 sm:px-8 pb-8">
            {/* Profile Info Header */}
            <div className="relative -mt-16 md:-mt-20 mb-6 flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="relative inline-block shrink-0">
                <img 
                  src={user.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'} 
                  alt={user.name} 
                  className={`w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-surface-container-low shadow-lg bg-surface-container-low ${isExpert ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface-container-low' : ''}`}
                />
                {isExpert && (
                  <span className="absolute bottom-1 right-1 md:bottom-2 md:right-2 material-symbols-outlined text-primary text-[28px] md:text-[36px] bg-surface rounded-full shadow-md border-2 border-surface-container-low" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                )}
              </div>
              
              <div className="flex-1 pb-2">
                <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-on-surface flex items-center gap-2">
                  {user.name}
                </h2>
                <div className="flex flex-wrap items-center gap-3 mt-1.5 md:mt-2">
                  <span className={`px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[11px] md:text-xs font-bold border ${rankStyle}`}>
                    {isExpert ? '✓ Verified Expert' : user.rank || 'Farmer'}
                  </span>
                  {user.location && (
                    <span className="flex items-center gap-1 text-on-surface-variant text-[13px] md:text-sm">
                      <span className="material-symbols-outlined text-[16px]">location_on</span>
                      {user.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-on-surface-variant text-[13px] md:text-sm">
                    <span className="material-symbols-outlined text-[16px]">calendar_month</span>
                    Joined {joinedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Bio & Details */}
            <div className="bg-surface-container rounded-2xl p-5 md:p-6 mb-8 border border-outline-variant/20">
              <h3 className="font-label-lg text-on-surface font-semibold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">person</span>
                About
              </h3>
              <p className="text-on-surface-variant text-[14px] leading-relaxed whitespace-pre-wrap">
                {user.bio || 'This user hasn\'t written a bio yet.'}
              </p>
              
              {isExpert && user.specialization && (
                <div className="mt-4 pt-4 border-t border-outline-variant/20">
                  <span className="text-[12px] font-semibold text-on-surface-variant uppercase tracking-wider block mb-1">Expertise</span>
                  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-lg text-[13px] font-medium border border-primary/20">
                    {user.specialization}
                  </span>
                </div>
              )}
            </div>

            {/* Recent Activity */}
            <div>
              <h3 className="font-headline-sm text-lg md:text-xl font-bold text-on-surface mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">history</span>
                Recent Posts
              </h3>
              
              {recentPosts.length === 0 ? (
                <div className="text-center py-10 bg-surface-container/50 rounded-2xl border border-outline-variant/20 border-dashed">
                  <span className="material-symbols-outlined text-4xl text-on-surface-variant/40 mb-3">post_add</span>
                  <p className="text-on-surface-variant text-sm md:text-base">No recent posts from this user.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-5 md:gap-6">
                  {recentPosts.map(post => (
                    <PostCard 
                      key={post.id} 
                      post={post} 
                      currentUserId={currentUser?._id}
                      onDeleted={() => {}} 
                      onProfileClick={(id) => navigate(`/dashboard/user/${id}`)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
