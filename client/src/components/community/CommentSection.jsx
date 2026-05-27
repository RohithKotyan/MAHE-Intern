import React, { useState, useRef } from 'react';
import { communityService } from '../../services/services';
import { formatTimeAgo } from '../../utils/formatTimeAgo';
import toast from 'react-hot-toast';

/**
 * A single comment row — YouTube style.
 * Shows: avatar · @handle · timestamp
 *        content
 *        👍 count 👎   Reply   [Delete]
 *        🗨 N replies ▼  (toggle drawer)
 */
function CommentItem({ comment, postId, currentUserId, onDelete, onReplyAdded, depth = 0 }) {
  const [liked, setLiked] = useState(comment.likes?.includes(currentUserId));
  const [likeCount, setLikeCount] = useState(comment.likeCount || 0);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const replyInputRef = useRef(null);

  // Replies drawer state (only for top-level comments)
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [loadingReplies, setLoadingReplies] = useState(false);
  const [replyCount, setReplyCount] = useState(comment.replyCount || 0);

  const isTopLevel = depth === 0;
  const handle = '@' + (comment.author?.name?.split(' ').join('').toLowerCase() || 'user');
  const isExpert = comment.author?.role === 'expert';
  const isOwn = currentUserId === comment.author?._id;

  const handleLike = async () => {
    if (!currentUserId) { toast.error('Login to like'); return; }
    const prev = liked;
    const prevCount = likeCount;
    setLiked(!prev);
    setLikeCount(prev ? prevCount - 1 : prevCount + 1);
    try {
      await communityService.toggleCommentLike(postId, comment._id);
    } catch {
      setLiked(prev);
      setLikeCount(prevCount);
      toast.error('Failed to like');
    }
  };

  const handleReplySubmit = async () => {
    if (!replyText.trim() || isSubmitting) return;
    if (!currentUserId) { toast.error('Login to reply'); return; }
    setIsSubmitting(true);
    try {
      const parentId = isTopLevel ? comment._id : comment.parentComment || comment._id;
      const res = await communityService.addComment(postId, {
        content: replyText,
        parentComment: parentId,
      });
      const newReply = res.data.data.comment;
      if (isTopLevel) {
        setReplies(prev => [...prev, newReply]);
        setReplyCount(prev => prev + 1);
        setShowReplies(true);
        setRepliesLoaded(true);
      }
      if (onReplyAdded) onReplyAdded(newReply);
      setReplyText('');
      setShowReplyInput(false);
      toast.success('Reply posted');
    } catch {
      toast.error('Failed to post reply');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleReplies = async () => {
    if (!showReplies && !repliesLoaded) {
      setLoadingReplies(true);
      try {
        const res = await communityService.getReplies(postId, comment._id);
        setReplies(res.data.data.replies);
        setRepliesLoaded(true);
      } catch {
        toast.error('Failed to load replies');
      } finally {
        setLoadingReplies(false);
      }
    }
    setShowReplies(!showReplies);
  };

  const handleDelete = async () => {
    try {
      await communityService.deleteComment(postId, comment._id);
      if (onDelete) onDelete(comment._id);
      toast.success('Comment deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const handleReplyDelete = (replyId) => {
    setReplies(prev => prev.filter(r => r._id !== replyId));
    setReplyCount(prev => Math.max(0, prev - 1));
  };

  return (
    <div className={`flex gap-3 ${depth > 0 ? 'ml-12 mt-3' : 'mt-5'}`}>
      {/* Avatar */}
      <img
        src={comment.author?.avatar || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'}
        alt={comment.author?.name}
        className={`rounded-full object-cover shrink-0 ${depth > 0 ? 'w-6 h-6' : 'w-9 h-9'}`}
      />

      {/* Body */}
      <div className="flex-1 min-w-0">
        {/* Header: @handle · time */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-on-surface text-[13px] font-semibold leading-none">{handle}</span>
          {isExpert && (
            <span className="material-symbols-outlined text-primary text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
          )}
          <span className="text-on-surface-variant text-[12px] leading-none">
            {comment.createdAt ? formatTimeAgo(comment.createdAt) : 'Just now'}
          </span>
        </div>

        {/* Content */}
        <p className="text-on-surface text-[14px] leading-relaxed mt-1 whitespace-pre-wrap break-words">{comment.content}</p>

        {/* Actions: 👍 count 👎  Reply  [Delete] */}
        <div className="flex items-center gap-1 mt-1.5 -ml-2">
          {/* Like */}
          <button onClick={handleLike} className={`flex items-center gap-0.5 p-1.5 rounded-full transition-colors ${liked ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'}`}>
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: liked ? "'FILL' 1" : "'FILL' 0" }}>thumb_up</span>
          </button>
          {likeCount > 0 && (
            <span className={`text-[12px] font-medium -ml-0.5 ${liked ? 'text-primary' : 'text-on-surface-variant'}`}>{likeCount}</span>
          )}

          {/* Dislike (visual only) */}
          <button className="flex items-center p-1.5 rounded-full text-on-surface-variant hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">thumb_down</span>
          </button>

          {/* Reply */}
          <button
            onClick={() => {
              setShowReplyInput(!showReplyInput);
              setTimeout(() => replyInputRef.current?.focus(), 100);
            }}
            className="text-[12px] font-semibold text-on-surface-variant hover:text-on-surface px-3 py-1.5 rounded-full hover:bg-surface-variant/40 transition-all ml-1"
          >
            Reply
          </button>

          {/* Delete (own comment only) */}
          {isOwn && (
            <button onClick={handleDelete} className="text-[12px] font-semibold text-on-surface-variant hover:text-error px-3 py-1.5 rounded-full hover:bg-error/10 transition-all">
              Delete
            </button>
          )}
        </div>

        {/* Inline Reply Input */}
        {showReplyInput && (
          <div className="flex items-start gap-3 mt-2 ml-0">
            <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[14px]">person</span>
            </div>
            <div className="flex-1">
              <input
                ref={replyInputRef}
                type="text"
                value={replyText}
                onChange={e => setReplyText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleReplySubmit()}
                placeholder={`Reply to ${handle}...`}
                className="w-full bg-transparent border-b border-outline-variant/40 focus:border-primary text-sm text-on-surface placeholder:text-on-surface-variant/50 py-1.5 focus:outline-none transition-colors"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => { setShowReplyInput(false); setReplyText(''); }}
                  className="text-[12px] font-semibold text-on-surface-variant px-3 py-1.5 rounded-full hover:bg-surface-variant/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleReplySubmit}
                  disabled={!replyText.trim() || isSubmitting}
                  className="text-[12px] font-semibold text-surface bg-primary px-4 py-1.5 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Posting...' : 'Reply'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Replies Drawer Toggle (top-level only) */}
        {isTopLevel && replyCount > 0 && (
          <button
            onClick={toggleReplies}
            className="flex items-center gap-1.5 mt-1 text-primary text-[13px] font-semibold hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors -ml-3"
          >
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              {showReplies ? 'expand_less' : 'expand_more'}
            </span>
            {loadingReplies ? 'Loading...' : showReplies ? 'Hide replies' : `${replyCount} ${replyCount === 1 ? 'reply' : 'replies'}`}
          </button>
        )}

        {/* Replies List */}
        {isTopLevel && showReplies && (
          <div className="mt-1">
            {replies.map(reply => (
              <CommentItem
                key={reply._id}
                comment={reply}
                postId={postId}
                currentUserId={currentUserId}
                onDelete={handleReplyDelete}
                depth={1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * CommentSection — the full comments area for a post.
 * Includes the top-level input + scrollable comment list.
 */
export default function CommentSection({ postId, currentUserId }) {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef(null);

  // Load top-level comments on mount
  React.useEffect(() => {
    let cancelled = false;
    setLoading(true);
    communityService.getComments(postId)
      .then(res => {
        if (!cancelled) {
          setComments(res.data.data.comments);
          setLoaded(true);
        }
      })
      .catch(() => { if (!cancelled) toast.error('Failed to load comments'); })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [postId]);

  const handleSubmit = async () => {
    if (!commentText.trim() || isSubmitting) return;
    if (!currentUserId) { toast.error('Login to comment'); return; }
    setIsSubmitting(true);
    try {
      const res = await communityService.addComment(postId, { content: commentText });
      setComments(prev => [...prev, { ...res.data.data.comment, replyCount: 0 }]);
      setCommentText('');
      setShowInput(false);
      toast.success('Comment posted');
    } catch {
      toast.error('Failed to post comment');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = (commentId) => {
    setComments(prev => prev.filter(c => c._id !== commentId));
  };

  return (
    <div className="px-5 pb-5 pt-3 border-t border-outline-variant/10">
      {/* Top-level comment input */}
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-primary text-[18px]">person</span>
        </div>
        <div className="flex-1">
          {showInput ? (
            <>
              <input
                ref={inputRef}
                type="text"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="Add a comment..."
                className="w-full bg-transparent border-b-2 border-outline-variant/30 focus:border-primary text-sm text-on-surface placeholder:text-on-surface-variant/50 py-2 focus:outline-none transition-colors"
                autoFocus
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  onClick={() => { setShowInput(false); setCommentText(''); }}
                  className="text-[13px] font-semibold text-on-surface-variant px-4 py-2 rounded-full hover:bg-surface-variant/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!commentText.trim() || isSubmitting}
                  className="text-[13px] font-semibold text-surface bg-primary px-5 py-2 rounded-full hover:bg-primary/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-surface/30 border-t-surface rounded-full animate-spin"></div>
                  ) : 'Comment'}
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => { setShowInput(true); setTimeout(() => inputRef.current?.focus(), 50); }}
              className="w-full text-left text-on-surface-variant/50 text-sm py-2 border-b border-outline-variant/20 hover:border-outline-variant/40 transition-colors cursor-text"
            >
              Add a comment...
            </button>
          )}
        </div>
      </div>

      {/* Comments List */}
      <div className="mt-2">
        {loading ? (
          <div className="flex justify-center py-6">
            <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
          </div>
        ) : !loaded ? null : comments.length === 0 ? (
          <div className="text-center py-6 text-sm text-on-surface-variant">
            No comments yet. Be the first to comment!
          </div>
        ) : (
          comments.map(comment => (
            <CommentItem
              key={comment._id}
              comment={comment}
              postId={postId}
              currentUserId={currentUserId}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
