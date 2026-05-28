import { formatTimeAgo } from './formatTimeAgo';

export const transformPost = (raw) => ({
  id:           raw._id,
  title:        raw.title,
  content:      raw.content,
  category:     raw.category,
  tags:         raw.tags || [],
  image:        raw.images?.[0]?.url || null,
  images:       raw.images || [],
  likeCount:    raw.likeCount || 0,
  commentCount: raw.commentCount || 0,
  likes:        raw.likes || [],
  author:       {
    id:             raw.author?._id,
    name:           raw.author?.name,
    avatar:         raw.author?.avatar,
    role:           raw.author?.role,
    rank:           raw.author?.rank,
    specialization: raw.author?.specialization,
  },
  createdAt:    raw.createdAt,
  timestamp:    formatTimeAgo(raw.createdAt),
  isPinned:     raw.isPinned || false,
  isResolved:   raw.isResolved || false,
});
