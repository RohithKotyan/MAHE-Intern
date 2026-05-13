/**
 * Cloudinary Service
 * Upload and delete images from Cloudinary CDN
 */
import { v2 as cloudinary } from 'cloudinary';
import ApiError from '../utils/ApiError.js';

/**
 * Upload a single image buffer to Cloudinary
 * @param {Buffer} fileBuffer - The image buffer from multer
 * @param {string} folder - Cloudinary folder name
 * @returns {Promise<{url: string, publicId: string}>}
 */
export const uploadToCloudinary = (fileBuffer, folder = 'agrocare') => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `agrocare-ai/${folder}`,
        resource_type: 'image',
        transformation: [
          { width: 1200, crop: 'limit' }, // Max width 1200px
          { quality: 'auto' },
          { fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) {
          reject(new ApiError(500, 'Image upload failed'));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      }
    );
    uploadStream.end(fileBuffer);
  });
};

/**
 * Delete an image from Cloudinary by public ID
 * @param {string} publicId - Cloudinary public ID
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    if (!publicId) return;
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error.message);
  }
};

/**
 * Upload multiple image buffers
 * @param {Array<Buffer>} fileBuffers
 * @param {string} folder
 * @returns {Promise<Array<{url: string, publicId: string}>>}
 */
export const uploadMultipleToCloudinary = async (fileBuffers, folder = 'agrocare') => {
  const uploadPromises = fileBuffers.map((buffer) => uploadToCloudinary(buffer, folder));
  return Promise.all(uploadPromises);
};
