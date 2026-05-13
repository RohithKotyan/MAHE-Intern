/**
 * Community Controller
 * CRUD for community posts, likes, and comments
 */
import CommunityPost from '../models/CommunityPost.js';
import Comment from '../models/Comment.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { uploadMultipleToCloudinary } from '../services/cloudinary.service.js';

export const createPost = asyncHandler(async (req, res) => {
  const { title, content, tags, category } = req.body;
  let images = [];
  if (req.files && req.files.length > 0) {
    const buffers = req.files.map((f) => f.buffer);
    images = await uploadMultipleToCloudinary(buffers, 'community');
  }
  const post = await CommunityPost.create({
    author: req.user.id, title, content,
    tags: tags ? tags.split(',').map((t) => t.trim()) : [],
    category: category || 'discussion', images,
  });
  await post.populate('author', 'name avatar role');
  res.status(201).json({ success: true, message: 'Post created', data: { post } });
});

export const getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const { tag, category, search } = req.query;
  const filter = {};
  if (tag) filter.tags = tag;
  if (category) filter.category = category;
  if (search) filter.$or = [
    { title: { $regex: search, $options: 'i' } },
    { content: { $regex: search, $options: 'i' } },
  ];
  const [posts, total] = await Promise.all([
    CommunityPost.find(filter).populate('author', 'name avatar role').skip(skip).limit(limit).sort('-createdAt'),
    CommunityPost.countDocuments(filter),
  ]);
  res.status(200).json({ success: true, data: { posts, pagination: { page, limit, total, pages: Math.ceil(total / limit) } } });
});

export const getPostById = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id).populate('author', 'name avatar role bio');
  if (!post) throw ApiError.notFound('Post not found');
  res.status(200).json({ success: true, data: { post } });
});

export const toggleLike = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');
  const userId = req.user.id;
  const isLiked = post.likes.includes(userId);
  if (isLiked) { post.likes.pull(userId); post.likeCount = Math.max(0, post.likeCount - 1); }
  else { post.likes.push(userId); post.likeCount += 1; }
  await post.save();
  res.status(200).json({ success: true, data: { liked: !isLiked, likeCount: post.likeCount } });
});

export const addComment = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');
  const comment = await Comment.create({ post: req.params.id, author: req.user.id, content: req.body.content, parentComment: req.body.parentComment || null });
  post.commentCount += 1;
  await post.save();
  await comment.populate('author', 'name avatar role');
  res.status(201).json({ success: true, data: { comment } });
});

export const getComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ post: req.params.id }).populate('author', 'name avatar role').sort('createdAt');
  res.status(200).json({ success: true, data: { comments } });
});

export const deletePost = asyncHandler(async (req, res) => {
  const post = await CommunityPost.findById(req.params.id);
  if (!post) throw ApiError.notFound('Post not found');
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') throw ApiError.forbidden('Not authorized');
  await Comment.deleteMany({ post: post._id });
  await post.deleteOne();
  res.status(200).json({ success: true, message: 'Post deleted' });
});
