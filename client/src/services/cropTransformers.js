// Transform Backend Enums to UI Data

export const getHealthStatusColor = (status) => {
  switch (status) {
    case 'Excellent': return 'text-primary bg-primary/10 border-primary/20';
    case 'Good': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    case 'Warning': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
    case 'Critical': return 'text-error bg-error/10 border-error/20';
    default: return 'text-on-surface-variant bg-surface-variant border-outline-variant';
  }
};

export const getCropStatusBadge = (status) => {
  switch (status) {
    case 'Healthy': return { icon: 'check_circle', color: 'text-primary' };
    case 'Warning': return { icon: 'warning', color: 'text-amber-500' };
    case 'Diseased': return { icon: 'coronavirus', color: 'text-error' };
    case 'Harvested': return { icon: 'inventory_2', color: 'text-on-surface-variant' };
    default: return { icon: 'eco', color: 'text-primary' };
  }
};

export const formatRelativeTime = (dateString) => {
  if (!dateString) return 'Never';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now - date) / 1000);
  
  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const getWateringStatus = (nextWateringAt) => {
  if (!nextWateringAt) return { label: 'Unknown', urgency: 'normal' };
  
  const next = new Date(nextWateringAt);
  const now = new Date();
  
  const diffInHours = (next - now) / (1000 * 60 * 60);
  
  if (diffInHours <= 0) return { label: 'Needs Water Now', urgency: 'critical', icon: 'water_drop', color: 'text-blue-500' };
  if (diffInHours <= 24) return { label: 'Water Within 24h', urgency: 'warning', icon: 'water_drop', color: 'text-amber-500' };
  
  const days = Math.ceil(diffInHours / 24);
  return { label: `In ${days} day${days > 1 ? 's' : ''}`, urgency: 'normal', icon: 'water_drop', color: 'text-blue-400' };
};
