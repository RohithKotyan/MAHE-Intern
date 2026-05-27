import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import toast from 'react-hot-toast';
import { communityService } from '../../services/services';

const MAX_IMAGES = 5;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB

export default function CreatePostModal({ isOpen, onClose, onPostCreated }) {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('discussion');
  const [tags, setTags] = useState('');
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

  if (!isOpen) return null;

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > MAX_IMAGES) {
      toast.error(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const validFiles = files.filter(file => {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.error(`Image ${file.name} is too large (max 5MB).`);
        return false;
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        toast.error(`Image ${file.name} is not a supported format (jpg/png/webp only).`);
        return false;
      }
      return true;
    });

    setImages(prev => [...prev, ...validFiles]);
  };

  const removeImage = (indexToRemove) => {
    setImages(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) {
      toast.error('Post content is required.');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('title', content.substring(0, 50)); // Generate a simple title from content
      formData.append('content', content);
      formData.append('category', category);
      
      const tagArray = tags.split(',').map(t => t.trim()).filter(t => t);
      if (tagArray.length > 0) {
        formData.append('tags', tagArray.join(','));
      }

      images.forEach(img => formData.append('images', img));

      const res = await communityService.createPost(formData);
      toast.success('Post created successfully!');
      onPostCreated(res.data.data.post);
      
      // Reset form
      setContent('');
      setCategory('discussion');
      setTags('');
      setImages([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create post. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-surface-container rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        >
          <div className="flex items-center justify-between p-4 border-b border-outline-variant/20">
            <h2 className="font-headline-sm text-on-surface">Create Post</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container-highest transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="p-6 overflow-y-auto hide-scrollbar flex-1">
            <form id="create-post-form" onSubmit={handleSubmit} className="space-y-5">
              
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 ml-1 uppercase">Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)}
                    className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  >
                    <option value="discussion">Discussion</option>
                    <option value="question">Question</option>
                    <option value="tip">Farming Tip</option>
                    <option value="showcase">Showcase</option>
                    <option value="alert">Alert</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-on-surface-variant mb-1 ml-1 uppercase">Tags (comma separated)</label>
                  <input 
                    type="text" 
                    value={tags} 
                    onChange={e => setTags(e.target.value)}
                    placeholder="e.g. Tomatoes, Pest Control"
                    className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-on-surface-variant mb-1 ml-1 uppercase">Content</label>
                <textarea 
                  value={content} 
                  onChange={e => setContent(e.target.value)}
                  placeholder="What's happening on your farm?"
                  rows="5"
                  className="w-full bg-surface border border-outline-variant/30 rounded-xl px-4 py-3 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 resize-none"
                ></textarea>
              </div>

              {images.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-on-surface-variant mb-2 ml-1 uppercase">Attached Images</label>
                  <div className="flex flex-wrap gap-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative group w-24 h-24 rounded-lg overflow-hidden border border-outline-variant/30">
                        <img src={URL.createObjectURL(img)} alt={`Upload ${i}`} className="w-full h-full object-cover" />
                        <button 
                          type="button" 
                          onClick={() => removeImage(i)}
                          className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </form>
          </div>

          <div className="p-4 border-t border-outline-variant/20 flex items-center justify-between bg-surface-container-lowest">
            <div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                multiple 
                accept="image/jpeg, image/png, image/webp" 
                onChange={handleImageSelect} 
              />
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={images.length >= MAX_IMAGES}
                className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors font-semibold text-sm disabled:opacity-50 disabled:hover:bg-transparent"
              >
                <span className="material-symbols-outlined">image</span>
                Add Photo
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                type="button" 
                onClick={onClose}
                className="px-5 py-2 text-on-surface-variant hover:text-on-surface font-semibold text-sm transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                form="create-post-form"
                disabled={isSubmitting || !content.trim()}
                className="px-6 py-2 bg-primary text-on-primary-fixed hover:scale-[1.02] rounded-xl font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-on-primary-fixed/30 border-t-on-primary-fixed rounded-full animate-spin"></div>
                    Posting...
                  </>
                ) : 'Post'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
