import React from 'react';
import DashboardShell from '../components/dashboard/DashboardShell';
import TreatmentProtocolContent from '../components/dashboard/TreatmentProtocolContent';

export default function TreatmentProtocol() {
  return (
    <DashboardShell activeRoute="crops">
      <TreatmentProtocolContent />
    </DashboardShell>
  );
}
