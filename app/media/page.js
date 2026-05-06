'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import Panel from '@/components/panels/Panel';
import GridToggle from '@/components/shared/GridToggle';
import { useStore } from '@/hooks/useStore';
import { mediaStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import { useViewMode } from '@/hooks/useViewMode';

export default function MediaPage() {
  const { data, createItem, updateItem, deleteItem } = useStore(mediaStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'dateAdded', order: 'desc' });
  
  const [view, setView] = useViewMode();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleEdit = (file) => {
    setSelectedFile(file);
  };

  const handleClosePanel = () => {
    setSelectedFile(null);
  };

  return (
    <DashboardLayout title="Media Library" subtitle="Manage images, documents, and other assets">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Media Library</h1>
          <p>Manage images, documents, and other assets</p>
        </div>
        <button className="primary-btn" onClick={() => handleEdit({ id: 'new', filename: 'New Upload', type: '', size: '0 KB', dateAdded: new Date().toISOString().split('T')[0], url: '' })}>
          <Icons.media style={{ width: '16px', height: '16px' }} />
          Upload Files
        </button>
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search files by name..."
      >
        <GridToggle view={view} onViewChange={setView} />
      </SearchToolbar>

      {filteredAndSortedData.length === 0 ? (
        <div style={{ padding: '30px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px' }}>
          <EmptyState title="No media found" message="Try a different search query or upload new files." />
        </div>
      ) : view === 'list' ? (
        <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px', overflow: 'hidden' }}>
          <table className="project-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>File Name</th>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Size</th>
                <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Date Added</th>
                <th style={{ width: '80px', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((file) => (
                <tr key={file.id} style={{ cursor: 'pointer' }} onClick={() => handleEdit(file)}>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ width: '32px', height: '32px', background: 'var(--cream)', border: '1px solid var(--stone-dark)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                         {file.type.includes('image') ? <Icons.media style={{width: 16, height: 16, color: 'var(--burgundy)'}} /> : <Icons.document style={{width: 16, height: 16, color: 'var(--ink-light)'}} />}
                       </div>
                       <div>
                         <div style={{ fontWeight: 'bold', color: 'var(--ink)', fontSize: '12px' }}>{file.filename}</div>
                         <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '3px' }}>{file.type}</div>
                       </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)', fontSize: '12px', color: 'var(--ink-mid)' }}>
                    {file.size}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)', fontSize: '12px', color: 'var(--ink-mid)' }}>
                    {file.dateAdded}
                  </td>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)', textAlign: 'right' }}>
                    <button className="secondary-btn" onClick={(e) => { e.stopPropagation(); handleEdit(file); }}>Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
          {filteredAndSortedData.map((file) => (
            <div key={file.id} className="project-card" style={{ border: '1px solid var(--stone-dark)', borderRadius: '8px', background: 'var(--white)', overflow: 'hidden', cursor: 'pointer' }} onClick={() => handleEdit(file)}>
              <div style={{ height: '140px', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                {file.type.includes('image') && file.url ? (
                  <img src={file.url} alt={file.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Icons.document style={{ width: '32px', height: '32px', color: 'var(--ink-light)' }} />
                )}
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.filename}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--ink-light)' }}>
                  <span>{file.size}</span>
                  <span>{file.dateAdded}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Panel 
        isOpen={!!selectedFile} 
        onClose={handleClosePanel} 
        title={selectedFile?.id === 'new' ? "Upload Files" : "File Details"}
        actions={
          <>
            {selectedFile?.id !== 'new' && (
              <button className="secondary-btn" onClick={() => { deleteItem(selectedFile.id); handleClosePanel(); }} style={{ color: 'var(--red)', borderColor: 'var(--red)', marginRight: 'auto' }}>Delete</button>
            )}
            <button className="secondary-btn" onClick={handleClosePanel}>Close</button>
            <button className="primary-btn" onClick={() => {
               if(selectedFile.id === 'new') {
                 createItem(selectedFile);
               } else {
                 updateItem(selectedFile.id, selectedFile);
               }
               handleClosePanel();
            }}>Save Changes</button>
          </>
        }
      >
        {selectedFile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {selectedFile.id !== 'new' && selectedFile.type.includes('image') && selectedFile.url && (
              <div style={{ width: '100%', height: '200px', borderRadius: '6px', overflow: 'hidden', background: 'var(--stone)', border: '1px solid var(--stone-dark)' }}>
                <img src={selectedFile.url} alt={selectedFile.filename} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>File Name</label>
              <input type="text" value={selectedFile.filename} onChange={e => setSelectedFile({...selectedFile, filename: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }} />
            </div>
            {selectedFile.id !== 'new' && (
              <div style={{ display: 'flex', gap: '14px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Type</label>
                  <div style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{selectedFile.type}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Size</label>
                  <div style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{selectedFile.size}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Date</label>
                  <div style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{selectedFile.dateAdded}</div>
                </div>
              </div>
            )}
            <div>
              <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Image URL</label>
              <input type="text" value={selectedFile.url} onChange={e => setSelectedFile({...selectedFile, url: e.target.value})} style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', background: 'var(--cream)' }} placeholder="https://" />
            </div>
          </div>
        )}
      </Panel>
    </DashboardLayout>
  );
}
