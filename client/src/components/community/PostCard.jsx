import React, { useState } from 'react';
import ScanResultEmbed from './ScanResultEmbed';

const rankColors = {
  'Beginner Farmer': 'bg-gray-500/10 text-gray-400 border-gray-500/20',
  'Growing Farmer': 'bg-green-900/20 text-green-400 border-green-500/20',
  'Trusted Farmer': 'bg-blue-900/20 text-blue-400 border-blue-500/20',
  'Advanced Farmer': 'bg-amber-900/20 text-amber-400 border-amber-500/20',
  'Community Mentor': 'bg-purple-900/20 text-purple-400 border-purple-500/20',
  'Farmer': 'bg-surface-container-high text-on-surface-variant border-outline-variant/30',
};

const typeConfig = {
  disease_question: { label: 'Disease Help', color: 'bg-error/10 text-error border-error/20', icon: 'help' },
  scan_result: { label: 'Scan Result', color: 'bg-primary/10 text-primary border-primary/20', icon: 'center_focus_strong' },
  farming_tip: { label: 'Farming Tip', color: 'bg-green-500/10 text-green-400 border-green-500/20', icon: 'lightbulb' },
  success_story: { label: 'Success Story', color: 'bg-amber-500/10 text-amber-500 border-amber-500/20', icon: 'celebration' },
  expert_advice: { label: 'Expert Advice', color: 'bg-primary/10 text-primary border-primary/20', icon: 'school' },
};

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [helpful, setHelpful] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes || 0);
  const [helpfulCount, setHelpfulCount] = useState(post.helpfulVotes || 0);
  const [showComments, setShowComments] = useState(false);

  const isExpert = post.author?.isExpert;
  const type = typeConfig[post.type] || typeConfig.farming_tip;
  const rankStyle = rankColors[post.author?.rank] || rankColors['Farmer'];

  const handleLike = () => {
    setLiked(!liked);
    setLikeCount(prev => liked ? prev - 1 : prev + 1);
  };

  const handleHelpful = () => {
    setHelpful(!helpful);
    setHelpfulCount(prev => helpful ? prev - 1 : prev + 1);
  };

  return (
    <article className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 ${
      isExpert ? 'border-l-[3px] border-l-primary atmospheric-glow' : ''
    }`}>
      {/* Author Header */}
      <div className="p-5 pb-0">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative shrink-0">
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
                <span className="text-on-surface font-body-md text-sm font-semibold">{post.author?.name}</span>
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
          <button className="text-on-surface-variant hover:text-primary transition-colors p-1">
            <span className="material-symbols-outlined text-[20px]">more_horiz</span>
          </button>
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
      </div>

      {/* Engagement Stats */}
      <div className="px-5 py-2 mt-2 flex items-center justify-between text-on-surface-variant font-label-sm text-[11px]">
        <div className="flex items-center gap-3">
          {likeCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>thumb_up</span>
              </span>
              {likeCount}
            </span>
          )}
          {helpfulCount > 0 && (
            <span className="flex items-center gap-1">
              <span className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-[10px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }}>handshake</span>
              </span>
              {helpfulCount} helpful
            </span>
          )}
        </div>
        <span>{post.comments || 0} comments</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-outline-variant/20 mx-5"></div>

      {/* Action Bar */}
      <div className="px-3 py-1.5 flex items-center justify-between">
        <button onClick={handleLike} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-sm ${liked ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'}`}>
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
          <span className="font-label-sm text-[11px] hidden sm:inline">Like</span>
        </button>
        <button onClick={() => setShowComments(!showComments)} className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface transition-all text-sm">
          <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
          <span className="font-label-sm text-[11px] hidden sm:inline">Comment</span>
        </button>
        <button onClick={handleHelpful} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-sm ${helpful ? 'text-amber-500 bg-amber-500/10' : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'}`}>
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: helpful ? "'FILL' 1" : "'FILL' 0" }}>handshake</span>
          <span className="font-label-sm text-[11px] hidden sm:inline">Helpful</span>
        </button>
        <button onClick={() => setSaved(!saved)} className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-all text-sm ${saved ? 'text-primary bg-primary/10' : 'text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface'}`}>
          <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: saved ? "'FILL' 1" : "'FILL' 0" }}>bookmark</span>
          <span className="font-label-sm text-[11px] hidden sm:inline">Save</span>
        </button>
        <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-on-surface-variant hover:bg-surface-container-high/50 hover:text-on-surface transition-all text-sm">
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span className="font-label-sm text-[11px] hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Comment Section Preview */}
      {showComments && (
        <div className="px-5 pb-4 pt-2 border-t border-outline-variant/20">
          <div className="flex items-start gap-3 mb-3">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAF534OOD6MQtE1HdOyBiNkKycRZA0RzZNRRjIZ89YH-Wdh5XAWoyOIuPclMb87uWpT40cd-zm90r-BMMPHlVpidBTddGR9y5aRv5le0pxg0UXBypn_BjvOS5D2KC7OK1U-wL-2h_Dc0HhXpbCNyYkDg9UO4m54pZpfMt8M3V8RFv0PCfh3yRlCFCybiblJhU14fMYB7A7-mwE5PLmTRYzylceFwTAn-3mEuhlGJwSiaw6tRxEYFla544qe8o7EcCWd99T8daL5NQ" alt="You" className="w-8 h-8 rounded-full object-cover border border-outline-variant/30 shrink-0" />
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Write a comment..."
                className="w-full bg-surface-container-high/50 border border-outline-variant/20 rounded-full px-4 py-2 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary-fixed transition-colors">
                <span className="material-symbols-outlined text-[18px]">send</span>
              </button>
            </div>
          </div>
          {/* Sample comment */}
          <div className="flex items-start gap-3 ml-0 bg-surface-container-high/30 rounded-xl p-3">
            <img src={post.author?.avatar} alt="Commenter" className="w-7 h-7 rounded-full object-cover border border-outline-variant/30 shrink-0" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-on-surface font-body-md text-[12px] font-semibold">Community Member</span>
                <span className="text-on-surface-variant font-label-sm text-[9px]">1h ago</span>
              </div>
              <p className="text-on-surface-variant text-[12px] mt-0.5">Thanks for sharing! Very helpful information.</p>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
