/**
 * CommunityPost Model
 * Forum-style posts for farmer community knowledge sharing
 */
import mongoose from 'mongoose';

const communityPostSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Post title is required'],
      trim: true,
      maxlength: [150, 'Title cannot exceed 150 characters'],
    },
    content: {
      type: String,
      required: [true, 'Post content is required'],
      maxlength: [5000, 'Content cannot exceed 5000 characters'],
    },
    images: [
      {
        url: String,
        publicId: String,
      },
    ],
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    likeCount: {
      type: Number,
      default: 0,
    },
    commentCount: {
      type: Number,
      default: 0,
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    isResolved: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
      enum: ['question', 'discussion', 'tip', 'showcase', 'alert'],
      default: 'discussion',
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for feed queries
communityPostSchema.index({ createdAt: -1 });
communityPostSchema.index({ tags: 1 });
communityPostSchema.index({ author: 1 });
communityPostSchema.index({ category: 1 });

const CommunityPost = mongoose.model('CommunityPost', communityPostSchema);
export default CommunityPost;
