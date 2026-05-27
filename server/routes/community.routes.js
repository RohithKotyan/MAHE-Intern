import { Router } from 'express';
import { createPost, getPosts, getPostById, toggleLike, addComment, getComments, getReplies, toggleCommentLike, deletePost, deleteComment } from '../controllers/community.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadMultiple } from '../middleware/upload.middleware.js';
import { validate, postValidation } from '../middleware/validate.middleware.js';

const router = Router();

router.get('/posts', getPosts); // Public: browse posts
router.get('/posts/:id', getPostById);
router.get('/posts/:id/comments', getComments);
router.get('/posts/:id/comments/:commentId/replies', getReplies);

// Protected routes
router.use(protect);
router.post('/posts', uploadMultiple, validate(postValidation), createPost);
router.post('/posts/:id/like', toggleLike);
router.post('/posts/:id/comments', addComment);
router.post('/posts/:id/comments/:commentId/like', toggleCommentLike);
router.delete('/posts/:id/comments/:commentId', deleteComment);
router.delete('/posts/:id', deletePost);

export default router;
