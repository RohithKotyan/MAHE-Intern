import api from './api';

export const cropService = {
  // Get all crops with filters, search, sorting, and pagination
  getCrops: async (params = {}, options = {}) => {
    const { data } = await api.get('/crops', { params, ...options });
    return data;
  },

  // Get dashboard statistics
  getCropStats: async (options = {}) => {
    const { data } = await api.get('/crops/stats', { ...options });
    return data;
  },

  // Get a single crop
  getCropById: async (id) => {
    const { data } = await api.get(`/crops/${id}`);
    return data;
  },

  // Create a new crop
  createCrop: async (cropData) => {
    const { data } = await api.post('/crops', cropData);
    return data;
  },

  // Update a crop
  updateCrop: async (id, cropData) => {
    const { data } = await api.put(`/crops/${id}`, cropData);
    return data;
  },

  // Log watering for a crop
  logWater: async (id) => {
    const { data } = await api.post(`/crops/${id}/water`);
    return data;
  },

  // Archive a crop
  archiveCrop: async (id) => {
    const { data } = await api.post(`/crops/${id}/archive`);
    return data;
  },

  // Restore an archived crop
  restoreCrop: async (id) => {
    const { data } = await api.post(`/crops/${id}/restore`);
    return data;
  },

  // Hard delete a crop
  deleteCrop: async (id) => {
    const { data } = await api.delete(`/crops/${id}`);
    return data;
  }
};
