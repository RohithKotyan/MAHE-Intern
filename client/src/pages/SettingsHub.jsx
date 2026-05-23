import React from 'react';
import DashboardShell from '../components/dashboard/DashboardShell';
import TabSettings from '../components/profile/TabSettings';

export default function SettingsHub() {
  return (
    <div className="pt-20 pb-12 px-container-margin max-w-6xl mx-auto flex flex-col gap-8">
      <header className="mb-4">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight mb-2">Settings</h1>
        <p className="font-body-md text-body-md text-on-surface-variant">Manage your account preferences, notifications, and appearance.</p>
      </header>
      <TabSettings />
    </div>
  );
}
