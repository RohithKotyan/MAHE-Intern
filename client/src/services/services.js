import api from './api';

export const authService = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  getMe: () => api.get('/auth/me'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  updateAvatar: (formData) => api.put('/users/avatar', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  changePassword: (data) => api.put('/users/change-password', data),
};

export const scanService = {
  createScan: (formData) => api.post('/scans', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  getScans: (params) => api.get('/scans', { params }),
  getScan: (id) => api.get(`/scans/${id}`),
  deleteScan: (id) => api.delete(`/scans/${id}`),
};

export const communityService = {
  getPosts: (params) => api.get('/community/posts', { params }),
  getPost: (id) => api.get(`/community/posts/${id}`),
  createPost: (formData) => api.post('/community/posts', formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
  toggleLike: (id) => api.post(`/community/posts/${id}/like`),
  getComments: (id) => api.get(`/community/posts/${id}/comments`),
  getReplies: (postId, commentId) => api.get(`/community/posts/${postId}/comments/${commentId}/replies`),
  addComment: (id, data) => api.post(`/community/posts/${id}/comments`, data),
  toggleCommentLike: (postId, commentId) => api.post(`/community/posts/${postId}/comments/${commentId}/like`),
  deletePost: (id) => api.delete(`/community/posts/${id}`),
  deleteComment: (postId, commentId) => api.delete(`/community/posts/${postId}/comments/${commentId}`),
};

export const notificationService = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
};
