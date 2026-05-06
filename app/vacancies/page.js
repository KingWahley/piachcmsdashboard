'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import Panel from '@/components/panels/Panel';
import GridToggle from '@/components/shared/GridToggle';
import { useStore } from '@/hooks/useStore';
import { vacanciesStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import { useViewMode } from '@/hooks/useViewMode';

export default function VacanciesPage() {
  const { data, createItem, updateItem, deleteItem } = useStore(vacanciesStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'datePosted', order: 'desc' });
  
  const [view, setView] = useViewMode();
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = (vacancy) => {
    setSelectedVacancy(vacancy);
    setIsEditing(true);
  };

  const handleClosePanel = () => {
    setSelectedVacancy(null);
    setIsEditing(false);
  };

  return (
    <DashboardLayout title="Vacancies" subtitle="Manage job postings and open positions">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Vacancies</h1>
          <p>Manage job postings and open positions</p>
        </div>
        <button className="primary-btn" onClick={() => handleEdit({ id: 'new', title: '', department: '', location: '', type: 'Full-time', status: 'draft', applicantsCount: 0, datePosted: new Date().toISOString().split('T')[0] })}>
          <Icons.settings style={{ width: '16px', height: '16px' }} />
          Post New Job
        </button>
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search job titles, departments..."
      >
        <GridToggle view={view} onViewChange={setView} />
      </SearchToolbar>

      {filteredAndSortedData.length === 0 ? (
        <div style={{ padding: '30px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px' }}>
          <EmptyState title="No vacancies found" message="Try a different search query or post a new job." />
        </div>
      ) : view === 'list' ? (
        <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden' }}>
          <table className="project-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Job Title</th>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Details</th>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Applicants</th>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Status</th>
                <th style={{ width: '80px', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((vacancy) => (
                <tr key={vacancy.id} style={{ cursor: 'pointer' }} onClick={() => handleEdit(vacancy)}>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)' }}>
                    <div style={{ fontWeight: 'bold', color: 'var(--ink)', fontSize: '12px' }}>{vacancy.title}</div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '3px' }}>{vacancy.department}</div>
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)', fontSize: '12px', color: 'var(--ink-mid)' }}>
                    <div>{vacancy.location}</div>
                    <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '2px' }}>{vacancy.type}</div>
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)' }}>
                    <div className="gallery-count" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                      {vacancy.applicantsCount} applications
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)' }}>
                    <StatusPill status={vacancy.status} />
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)', textAlign: 'right' }}>
                    <button className="secondary-btn" onClick={(e) => { e.stopPropagation(); handleEdit(vacancy); }}>Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '14px' }}>
          {filteredAndSortedData.map((vacancy) => (
            <div key={vacancy.id} className="project-card" style={{ border: '1px solid var(--stone-dark)', borderRadius: '8px', background: 'var(--white)', overflow: 'hidden', cursor: 'pointer' }} onClick={() => handleEdit(vacancy)}>
              <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <StatusPill status={vacancy.status} />
                  <span style={{ fontSize: '10px', color: 'var(--ink-light)' }}>{vacancy.datePosted}</span>
                </div>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '4px' }}>{vacancy.title}</div>
                <div style={{ fontSize: '11px', color: 'var(--gold-dark)', fontWeight: 'bold', marginBottom: '14px' }}>{vacancy.department}</div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: 'var(--ink-mid)' }}>
                  <span>📍 {vacancy.location}</span>
                  <span>⏱ {vacancy.type}</span>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 16px', borderTop: '1px solid var(--stone)', background: 'var(--cream)' }}>
                 <div style={{ fontSize: '10px', color: 'var(--ink-light)' }}>
                   <strong>{vacancy.applicantsCount}</strong> Applicants
                 </div>
                 <button className="secondary-btn" style={{ padding: '6px 10px', fontSize: '10px' }} onClick={(e) => { e.stopPropagation(); handleEdit(vacancy); }}>Edit Details</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Panel 
        isOpen={isEditing && !!selectedVacancy} 
        onClose={handleClosePanel} 
        title={selectedVacancy?.id === 'new' ? "Post New Job" : "Edit Vacancy"}
        actions={
          <>
            {selectedVacancy?.id !== 'new' && (
              <button className="secondary-btn" onClick={() => { deleteItem(selectedVacancy.id); handleClosePanel(); }} style={{ color: 'var(--red)', borderColor: 'var(--red)', marginRight: 'auto' }}>Delete</button>
            )}
            <button className="secondary-btn" onClick={handleClosePanel}>Cancel</button>
            <button className="primary-btn" onClick={() => {
               if(selectedVacancy.id === 'new') {
                 createItem(selectedVacancy);
               } else {
                 updateItem(selectedVacancy.id, selectedVacancy);
               }
               handleClosePanel();
            }}>Save Changes</button>
          </>
        }
      >
        {selectedVacancy && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Job Title</label>
              <input type="text" value={selectedVacancy.title} onChange={e => setSelectedVacancy({...selectedVacancy, title: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Department</label>
              <input type="text" value={selectedVacancy.department} onChange={e => setSelectedVacancy({...selectedVacancy, department: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }} />
            </div>
            <div style={{ display: 'flex', gap: '14px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Location</label>
                <input type="text" value={selectedVacancy.location} onChange={e => setSelectedVacancy({...selectedVacancy, location: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Type</label>
                <select value={selectedVacancy.type} onChange={e => setSelectedVacancy({...selectedVacancy, type: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }}>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Internship">Internship</option>
                </select>
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Status</label>
              <select value={selectedVacancy.status} onChange={e => setSelectedVacancy({...selectedVacancy, status: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }}>
                <option value="published">Published (Active)</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived (Closed)</option>
              </select>
            </div>
          </div>
        )}
      </Panel>
    </DashboardLayout>
  );
}
