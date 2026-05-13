import { Router } from 'express';
import { createPost, getPosts, getPostById, toggleLike, addComment, getComments, deletePost } from '../controllers/community.controller.js';
import { protect } from '../middleware/auth.middleware.js';
import { uploadMultiple } from '../middleware/upload.middleware.js';
import { validate, postValidation } from '../middleware/validate.middleware.js';

const router = Router();

router.get('/posts', getPosts); // Public: browse posts
router.get('/posts/:id', getPostById);
router.get('/posts/:id/comments', getComments);

// Protected routes
router.use(protect);
router.post('/posts', uploadMultiple, validate(postValidation), createPost);
router.post('/posts/:id/like', toggleLike);
router.post('/posts/:id/comments', addComment);
router.delete('/posts/:id', deletePost);

export default router;
