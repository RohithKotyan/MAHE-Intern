/**
 * File Upload Middleware
 * Multer memory storage for Cloudinary streaming uploads
 */
import multer from 'multer';
import ApiError from '../utils/ApiError.js';

// Use memory storage — files are buffered in memory then streamed to Cloudinary
const storage = multer.memoryStorage();

// File filter — only allow images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, 'Only JPEG, PNG, and WebP images are allowed'), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB max file size
    files: 5, // Max 5 files per request
  },
});

// Export pre-configured upload handlers
export const uploadSingle = upload.single('image');
export const uploadMultiple = upload.array('images', 5);

export default upload;
