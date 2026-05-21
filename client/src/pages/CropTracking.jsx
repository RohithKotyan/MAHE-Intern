import React from 'react';
import DashboardShell from '../components/dashboard/DashboardShell';
import CropTrackingContent from '../components/dashboard/CropTrackingContent';

export default function CropTracking() {
  return (
    <DashboardShell activeRoute="crops">
      <CropTrackingContent />
    </DashboardShell>
  );
}
