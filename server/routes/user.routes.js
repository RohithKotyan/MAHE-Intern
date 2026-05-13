import { Router } from 'express';
import { getProfile, updateProfile, updateAvatar, changePassword, getUsers } from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { uploadSingle } from '../middleware/upload.middleware.js';

const router = Router();

router.use(protect); // All user routes require authentication
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/avatar', uploadSingle, updateAvatar);
router.put('/change-password', changePassword);
router.get('/', authorize('admin'), getUsers);

export default router;
