import { useState, useCallback, useRef, useEffect } from 'react';
import { cropService } from './cropService';
import toast from 'react-hot-toast';

export const useCrops = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({ total: 0, page: 1, pages: 1 });
  const abortControllerRef = useRef(null);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const fetchCrops = useCallback(async (params = {}) => {
    // Cancel previous request if still running
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);
    try {
      const response = await cropService.getCrops(params, { signal });
      if (params.page > 1) {
        setCrops(prev => [...prev, ...response.data]);
      } else {
        setCrops(response.data);
      }
      setPagination(response.pagination);
      setError(null);
    } catch (err) {
      // Ignore abort errors
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      setError(err.response?.data?.message || 'Failed to fetch crops');
      toast.error('Could not load crops');
    } finally {
      // Prevent resetting loading state if a newer request is already running
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const waterCrop = async (id) => {
    // Optimistic UI update
    setCrops(prev => prev.map(c => 
      c._id === id ? { ...c, lastWateredAt: new Date().toISOString() } : c
    ));
    
    try {
      const response = await cropService.logWater(id);
      // Ensure real data replaces optimistic data
      setCrops(prev => prev.map(c => c._id === id ? response.data : c));
      toast.success('Watering logged successfully');
      return response.data;
    } catch (err) {
      // Revert is complex without keeping previous state history, so we refetch on fail
      fetchCrops(); 
      toast.error(err.response?.data?.message || 'Failed to log watering');
      throw err;
    }
  };

  const addCrop = async (cropData) => {
    try {
      const response = await cropService.createCrop(cropData);
      setCrops(prev => [response.data, ...prev]);
      toast.success('Crop added successfully');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add crop');
      throw err;
    }
  };

  const editCrop = async (id, cropData) => {
    try {
      const response = await cropService.updateCrop(id, cropData);
      setCrops(prev => prev.map(c => c._id === id ? response.data : c));
      toast.success('Crop updated successfully');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update crop');
      throw err;
    }
  };

  const removeCrop = async (id) => {
    // Optimistic UI
    const previousCrops = [...crops];
    setCrops(prev => prev.filter(c => c._id !== id));
    
    try {
      await cropService.deleteCrop(id);
      toast.success('Crop deleted');
    } catch (err) {
      setCrops(previousCrops);
      toast.error('Failed to delete crop');
      throw err;
    }
  };

  return {
    crops,
    loading,
    error,
    pagination,
    fetchCrops,
    waterCrop,
    addCrop,
    editCrop,
    removeCrop
  };
};

export const useCropStats = () => {
  const [stats, setStats] = useState({
    totalCrops: 0,
    healthy: 0,
    warning: 0,
    critical: 0,
    needsWater: 0,
    averageHealth: 0,
  });
  const [loading, setLoading] = useState(false);
  const abortControllerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  const fetchStats = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    setLoading(true);
    try {
      const response = await cropService.getCropStats({ signal });
      setStats(response.data);
    } catch (err) {
      if (err.name === 'CanceledError' || err.code === 'ERR_CANCELED') return;
      console.error('Failed to load crop stats', err);
    } finally {
      if (!signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  return { stats, loading, fetchStats };
};
