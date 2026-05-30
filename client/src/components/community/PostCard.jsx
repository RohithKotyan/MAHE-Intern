import React, { useState } from 'react';
import ScanResultEmbed from './ScanResultEmbed';
import CommentSection from './CommentSection';
import { communityService } from '../../services/services';
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

const CATEGORY_CONFIG = {
  question:   { label: 'Question',    color: 'bg-error/10 text-error border-error/20',       icon: 'help' },
  discussion: { label: 'Discussion',  color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: 'forum' },
  tip:        { label: 'Farming Tip', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: 'lightbulb' },
  showcase:   { label: 'Showcase',    color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: 'celebration' },
  alert:      { label: 'Alert',       color: 'bg-error/10 text-error border-error/20',       icon: 'warning' },
};

function PostCard({ post, currentUserId, onDeleted, onProfileClick }) {
  // Optimistic like state
  const isLikedByMe = post.likes.includes(currentUserId);
  const [optimisticLiked, setOptimisticLiked] = useState(null);
  const [optimisticCount, setOptimisticCount] = useState(null);
  
  const liked = optimisticLiked ?? isLikedByMe;
  const likeCount = optimisticCount ?? post.likeCount;

  // Comments toggle
  const [showComments, setShowComments] = useState(false);

  // Delete state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isExpert = post.author?.role === 'expert' || post.author?.isExpert;
  const type = CATEGORY_CONFIG[post.category] || CATEGORY_CONFIG.discussion;
  const rankStyle = rankColors[post.author?.role] || rankColors[post.author?.rank] || rankColors['Farmer'];

  const handleLike = async () => {
    if (!currentUserId) { toast.error('You must be logged in to like posts'); return; }
    const prevLiked = liked;
    const prevCount = likeCount;
    setOptimisticLiked(!prevLiked);
    setOptimisticCount(prevLiked ? prevCount - 1 : prevCount + 1);
    try {
      await communityService.toggleLike(post.id);
    } catch {
      setOptimisticLiked(prevLiked);
      setOptimisticCount(prevCount);
      toast.error('Could not update like. Try again.');
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await communityService.deletePost(post.id);
      toast.success('Post deleted successfully');
      onDeleted(post.id);
    } catch {
      toast.error('Failed to delete post');
      setIsDeleting(false);
      setShowDeleteConfirm(false);
    }
  };

  const handleProfileClick = () => {
    if (onProfileClick && post.author?.id) {
      onProfileClick(post.author.id);
    }
  };

  return (
    <article className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
      isExpert ? 'border-l-[3px] border-l-primary atmospheric-glow' : ''
    }`}>
      {/* Author Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0 cursor-pointer hover:opacity-80 transition-opacity" onClick={handleProfileClick}>
              <img
                src={post.author?.avatar}
                alt={post.author?.name}
                className={`w-11 h-11 rounded-full object-cover border-2 ${isExpert ? 'border-primary/50' : 'border-outline-variant/30'}`}
              />
              {isExpert && (
                <span className="absolute -bottom-0.5 -right-0.5 material-symbols-outlined text-primary text-[16px] bg-surface rounded-full shadow-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span 
                  className="text-on-surface font-body-md text-sm font-semibold cursor-pointer hover:text-primary transition-colors hover:underline"
                  onClick={handleProfileClick}
                >
                  {post.author?.name}
                </span>
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${isExpert ? 'bg-primary/10 text-primary border-primary/30' : rankStyle}`}>
                  {isExpert ? '✓ Verified Expert' : post.author?.rank || 'Farmer'}
                </span>
              </div>
              {isExpert && post.author?.specialization && (
                <div className="text-primary/70 font-label-sm text-[10px]">{post.author.specialization}</div>
              )}
              <div className="text-on-surface-variant font-label-sm text-[10px] mt-0.5">{post.timestamp}</div>
            </div>
          </div>
          <div className="relative">
            {currentUserId === post.author?.id && (
              <button 
                onClick={() => setShowDeleteConfirm(true)}
                className="text-on-surface-variant hover:text-error hover:bg-error/10 rounded-full transition-colors p-1"
                title="Delete Post"
              >
                <span className="material-symbols-outlined text-[20px]">delete</span>
              </button>
            )}
            
            {showDeleteConfirm && (
              <div className="absolute right-0 top-10 w-48 bg-surface-container-high border border-outline-variant/30 rounded-xl shadow-lg p-3 z-10 flex flex-col gap-2">
                <span className="text-sm font-semibold text-on-surface">Delete post?</span>
                <div className="flex gap-2">
                  <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-2 py-1.5 text-xs font-semibold text-on-surface hover:bg-surface-variant rounded-lg transition-colors">Cancel</button>
                  <button onClick={handleDelete} disabled={isDeleting} className="flex-1 px-2 py-1.5 text-xs font-bold text-white bg-error hover:bg-error/90 rounded-lg transition-colors disabled:opacity-50">
                    {isDeleting ? '...' : 'Delete'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Post Type Badge */}
        <div className="mb-3">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${type.color}`}>
            <span className="material-symbols-outlined text-[12px]">{type.icon}</span>
            {type.label}
          </span>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-5">
        <p className="text-on-surface font-body-md text-sm leading-relaxed mb-3">{post.content}</p>

        {/* Post Image */}
        {post.image && (
          <div className="rounded-xl overflow-hidden border border-outline-variant/20 mb-3 max-h-80">
            <img src={post.image} alt="Post attachment" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Scan Result Embed */}
        {post.scanResult && (
          <ScanResultEmbed
            disease={post.scanResult.disease}
            confidence={post.scanResult.confidence}
            severity={post.scanResult.severity}
            cropId={post.scanResult.cropId}
          />
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3 mb-1">
            {post.tags.map((tag, i) => (
              <span key={i} className="text-primary/80 font-label-sm text-[11px] hover:text-primary cursor-pointer transition-colors">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {post.category === 'alert' && <div className="mt-3 bg-error/10 border border-error/20 rounded-xl p-3"><p className="text-error font-body-sm text-[12px]"><span className="font-bold">Important:</span> This alert was verified by the AgroCare Team.</p></div>}
      </div>

      {/* Divider */}
      <div className="h-px bg-outline-variant/20 mx-5 my-2"></div>

      {/* Action Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between mb-1">
        
        <button onClick={handleLike} className={`group flex items-center justify-center flex-1 gap-2 py-2.5 mx-1 rounded-xl transition-all duration-300 ${liked ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`}>
          <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${liked ? 'scale-110' : 'group-hover:scale-110'}`} style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
          <span className="font-body-sm font-semibold text-[13px] hidden sm:block">Like</span>
          {likeCount > 0 && (
            <span className={`ml-0.5 font-bold text-[13px] ${liked ? 'text-primary' : 'text-on-surface-variant'}`}>{likeCount}</span>
          )}
        </button>

        <button onClick={() => setShowComments(!showComments)} className={`group flex items-center justify-center flex-1 gap-2 py-2.5 mx-1 rounded-xl transition-all duration-300 ${showComments ? 'bg-blue-500/10 text-blue-500' : 'text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface'}`}>
          <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${showComments ? 'scale-110' : 'group-hover:scale-110'}`} style={{ fontVariationSettings: showComments ? "'FILL' 1" : "'FILL' 0" }}>chat_bubble</span>
          <span className="font-body-sm font-semibold text-[13px] hidden sm:block">Comment</span>
          {post.commentCount > 0 && (
            <span className={`ml-0.5 font-bold text-[13px] ${showComments ? 'text-blue-500' : 'text-on-surface-variant'}`}>{post.commentCount}</span>
          )}
        </button>

        <button className="group flex items-center justify-center flex-1 gap-2 py-2.5 mx-1 rounded-xl text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface transition-all duration-300">
          <span className="material-symbols-outlined text-[20px] group-hover:scale-110 transition-transform duration-300">share</span>
          <span className="font-body-sm font-semibold text-[13px] hidden sm:block">Share</span>
        </button>

      {/* YouTube-style Comment Section */}
      {showComments && (
        <CommentSection postId={post.id} currentUserId={currentUserId} onProfileClick={onProfileClick} />
      )}
    </article>
  );
}

export default React.memo(PostCard);
