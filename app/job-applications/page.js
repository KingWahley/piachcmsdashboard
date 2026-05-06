'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import Panel from '@/components/panels/Panel';
import { useStore } from '@/hooks/useStore';
import { jobApplicationsStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';

export default function JobApplicationsPage() {
  const { data, updateItem, deleteItem } = useStore(jobApplicationsStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery, filters, updateFilter } = useFilterSort(data, { status: 'all' }, { key: 'date', order: 'desc' });
  
  const [selectedApp, setSelectedApp] = useState(null);

  const filterOptions = [
    { value: 'all', label: 'All Statuses' },
    { value: 'new', label: 'New' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'interview', label: 'Interview' },
    { value: 'rejected', label: 'Rejected' },
  ];

  return (
    <DashboardLayout title="Job Applications" subtitle="Review candidates, schedule interviews, and manage hiring pipeline">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Job Applications</h1>
          <p>Review candidates, schedule interviews, and manage hiring pipeline</p>
        </div>
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search candidates, roles..."
        filterOptions={filterOptions}
        currentFilter={filters.status}
        onFilterChange={(v) => updateFilter('status', v)}
      />

      <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden' }}>
        {filteredAndSortedData.length > 0 ? (
          filteredAndSortedData.map((app) => (
            <div 
              key={app.id} 
              className="app-item"
              onClick={() => setSelectedApp(app)}
            >
              <div className="app-avatar">
                {app.applicantName.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div className="app-info">
                <div className="app-name">{app.applicantName}</div>
                <div className="app-role">{app.roleApplied} • {app.experience} exp</div>
              </div>
              <div className="app-meta">
                <div className="app-date">{app.date}</div>
                <StatusPill status={app.status} />
                {app.cvFileName && <div className="cv-tag">CV Attached</div>}
              </div>
            </div>
          ))
        ) : (
          <div style={{ padding: '30px' }}>
            <EmptyState title="No applications found" message="Try adjusting your filters or search terms." />
          </div>
        )}
      </div>

      <Panel 
        isOpen={!!selectedApp} 
        onClose={() => setSelectedApp(null)} 
        title="Application Review"
        actions={
          <>
            <button className="secondary-btn" onClick={() => { deleteItem(selectedApp.id); setSelectedApp(null); }} style={{ color: 'var(--red)', borderColor: 'var(--red)' }}>Reject Candidate</button>
            <button className="primary-btn" onClick={() => updateItem(selectedApp.id, { status: 'shortlisted' })}>Mark as Shortlisted</button>
          </>
        }
      >
        {selectedApp && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <div className="app-avatar" style={{ width: '48px', height: '48px', fontSize: '16px' }}>
                {selectedApp.applicantName.split(' ').map(n => n[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', color: 'var(--burgundy)', marginBottom: '4px' }}>{selectedApp.applicantName}</h3>
                <p style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>Applied for: <strong>{selectedApp.roleApplied}</strong></p>
              </div>
            </div>

            <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '24px' }}>
              <div className="detail-box" style={{ background: 'var(--cream)', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '12px' }}>
                <div className="detail-label" style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Email</div>
                <div className="detail-value" style={{ fontSize: '12px', color: 'var(--ink)' }}>{selectedApp.email}</div>
              </div>
              <div className="detail-box" style={{ background: 'var(--cream)', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '12px' }}>
                <div className="detail-label" style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Phone</div>
                <div className="detail-value" style={{ fontSize: '12px', color: 'var(--ink)' }}>{selectedApp.phone}</div>
              </div>
              <div className="detail-box" style={{ background: 'var(--cream)', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '12px' }}>
                <div className="detail-label" style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Experience</div>
                <div className="detail-value" style={{ fontSize: '12px', color: 'var(--ink)' }}>{selectedApp.experience}</div>
              </div>
              <div className="detail-box" style={{ background: 'var(--cream)', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '12px' }}>
                <div className="detail-label" style={{ fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 'bold', marginBottom: '5px' }}>Current Status</div>
                <div className="detail-value" style={{ fontSize: '12px', color: 'var(--ink)' }}><StatusPill status={selectedApp.status} /></div>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '11px', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Cover Letter</h4>
              <div className="message-box" style={{ background: '#FCFAF6', border: '1px solid var(--stone-dark)', borderLeft: '3px solid var(--gold)', borderRadius: '6px', padding: '14px', fontSize: '12px', color: 'var(--ink-mid)', lineHeight: '1.6' }}>
                {selectedApp.coverLetter}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <h4 style={{ fontSize: '11px', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Attachments</h4>
              <div style={{ display: 'flex', gap: '10px' }}>
                {selectedApp.cvFileName && (
                  <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink)', fontSize: '12px', fontWeight: 'bold' }}>
                    <Icons.document style={{ width: '16px', height: '16px', color: 'var(--burgundy)' }} />
                    {selectedApp.cvFileName}
                  </a>
                )}
                {selectedApp.portfolioUrl && (
                  <a href={selectedApp.portfolioUrl} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink)', fontSize: '12px', fontWeight: 'bold' }}>
                    <Icons.link style={{ width: '16px', height: '16px', color: 'var(--burgundy)' }} />
                    Portfolio Link
                  </a>
                )}
              </div>
            </div>

            <div>
              <h4 style={{ fontSize: '11px', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>Update Status</h4>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                 <button className="secondary-btn" onClick={() => updateItem(selectedApp.id, { status: 'new' })}>New</button>
                 <button className="secondary-btn" onClick={() => updateItem(selectedApp.id, { status: 'interview' })}>Interview</button>
                 <button className="secondary-btn" onClick={() => updateItem(selectedApp.id, { status: 'rejected' })}>Rejected</button>
              </div>
            </div>
          </div>
        )}
      </Panel>

    </DashboardLayout>
  );
}
