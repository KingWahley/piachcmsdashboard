'use client';

import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function SettingsPage() {
  return (
    <DashboardLayout title="System Settings" subtitle="Configure CMS preferences and global settings">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>System Settings</h1>
          <p>Global preferences, integrations, and security settings.</p>
        </div>
      </div>
      
      <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '40px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '18px', color: 'var(--ink)' }}>Coming Soon</h2>
        <p style={{ color: 'var(--ink-mid)' }}>System settings are currently under development.</p>
      </div>
    </DashboardLayout>
  );
}
