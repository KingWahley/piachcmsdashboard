import React, { useState, useRef } from 'react';
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
  const fileInputRef = useRef(null);

  const stats = [
    { label: 'Total Files', value: data.length },
    { label: 'Project Images', value: data.filter(i => i.usage === 'Project' || i.type?.includes('image')).length },
    { label: 'Documents', value: data.filter(i => !i.type?.includes('image')).length },
    { label: 'Storage Used', value: '2.4GB' }
  ];

  const handleEdit = (file) => {
    setSelectedFile(file);
  };

  const handleClosePanel = () => {
    setSelectedFile(null);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const newAsset = {
        id: Math.random().toString(36).substr(2, 9),
        filename: file.name,
        type: file.type,
        size: (file.size / (1024 * 1024)).toFixed(1) + ' MB',
        dateAdded: new Date().toISOString().split('T')[0],
        url: URL.createObjectURL(file),
        usage: 'Project',
        altText: '',
        caption: '',
        usedIn: ['Unassigned']
      };
      createItem(newAsset);
    });
  };

  return (
    <DashboardLayout title="Media Library" subtitle="Manage images, documents, and other assets">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Media Library</h1>
          <p>Manage images, documents, and other assets</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            multiple 
            style={{ display: 'none' }} 
          />
          <button className="primary-btn" onClick={() => fileInputRef.current?.click()}>
            <Icons.plus style={{ width: '16px', height: '16px' }} />
            Upload Files
          </button>
        </div>
      </div>

      <div className="kpi-row" style={{ gridTemplateColumns: 'repeat(4, 1fr)', marginBottom: '25px' }}>
        {stats.map((stat, i) => (
          <div key={i} className="kpi-card" style={{ cursor: 'default' }}>
            <div className="kpi-value">{stat.value}</div>
            <div className="kpi-label">{stat.label}</div>
          </div>
        ))}
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search files by name, type, or usage..."
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
                <th>File Name</th>
                <th>Usage</th>
                <th>Size</th>
                <th>Date Added</th>
                <th style={{ width: '80px' }}></th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedData.map((file) => (
                <tr key={file.id} style={{ cursor: 'pointer' }} onClick={() => handleEdit(file)}>
                  <td style={{ padding: '14px 16px', borderBottom: '1px solid var(--stone)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                       <div style={{ width: '40px', height: '40px', background: 'var(--cream)', border: '1px solid var(--stone-dark)', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                         {file.type?.includes('image') && file.url ? (
                           <img src={file.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                         ) : (
                           <Icons.document style={{width: 20, height: 20, color: 'var(--ink-light)'}} />
                         )}
                       </div>
                       <div>
                         <div style={{ fontWeight: 'bold', color: 'var(--ink)', fontSize: '12px' }}>{file.filename}</div>
                         <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '3px' }}>{file.type || 'Unknown'}</div>
                       </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ 
                      fontSize: '9px', fontWeight: 'bold', padding: '4px 8px', borderRadius: '12px', textTransform: 'uppercase',
                      background: file.usage === 'Project' ? 'var(--blue-light)' : 'var(--stone)',
                      color: file.usage === 'Project' ? 'var(--blue)' : 'var(--ink-mid)'
                    }}>
                      {file.usage || 'Unassigned'}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{file.size}</td>
                  <td style={{ fontSize: '12px', color: 'var(--ink-mid)' }}>{file.dateAdded}</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="icon-btn" onClick={(e) => { e.stopPropagation(); handleEdit(file); }}>
                      <Icons.eye style={{ width: '14px', height: '14px' }} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '16px' }}>
          {filteredAndSortedData.map((file) => (
            <div key={file.id} className="card" style={{ cursor: 'pointer', transition: 'all 0.2s' }} onClick={() => handleEdit(file)}>
              <div style={{ height: '160px', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                {file.type?.includes('image') && file.url ? (
                  <img src={file.url} alt={file.filename} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Icons.document style={{ width: '40px', height: '40px', color: 'var(--ink-light)' }} />
                )}
                <div style={{ position: 'absolute', top: '8px', right: '8px' }}>
                  <span style={{ fontSize: '8px', fontWeight: 'bold', background: 'rgba(255,255,255,0.9)', padding: '2px 6px', borderRadius: '4px', textTransform: 'uppercase' }}>{file.type?.split('/')[1] || 'File'}</span>
                </div>
              </div>
              <div style={{ padding: '12px' }}>
                <div style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{file.filename}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'var(--ink-light)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
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
        title="Asset Details"
        actions={
          <>
            <button 
              className="secondary-btn" 
              onClick={() => { deleteItem(selectedFile.id); handleClosePanel(); }} 
              style={{ color: 'var(--red)', borderColor: 'var(--red)', marginRight: 'auto' }}
            >
              Delete Asset
            </button>
            <button className="secondary-btn" onClick={handleClosePanel}>Close</button>
            <button className="primary-btn" onClick={() => {
              updateItem(selectedFile.id, selectedFile);
              handleClosePanel();
            }}>Save Details</button>
          </>
        }
      >
        {selectedFile && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ width: '100%', height: '240px', borderRadius: '8px', overflow: 'hidden', background: '#2a1a10', border: '1px solid var(--stone-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {selectedFile.type?.includes('image') && selectedFile.url ? (
                <img src={selectedFile.url} alt={selectedFile.filename} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              ) : (
                <Icons.document style={{ width: '60px', height: '60px', color: 'rgba(255,255,255,0.2)' }} />
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '9px', fontBlack: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-light)', marginBottom: '6px' }}>File Name</label>
                <input 
                  type="text" 
                  value={selectedFile.filename} 
                  onChange={e => setSelectedFile({...selectedFile, filename: e.target.value})} 
                  style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', background: 'var(--white)', fontWeight: 'bold' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '9px', fontBlack: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-light)', marginBottom: '6px' }}>File URL</label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={selectedFile.url} 
                    readOnly
                    style={{ flex: 1, border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 12px', fontSize: '11px', background: 'var(--cream)', color: 'var(--ink-mid)' }} 
                  />
                  <button 
                    className="secondary-btn" 
                    style={{ padding: '8px 12px', fontSize: '10px' }}
                    onClick={() => {
                      navigator.clipboard.writeText(selectedFile.url);
                      alert('URL copied to clipboard');
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '9px', fontBlack: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-light)', marginBottom: '6px' }}>Alt Text</label>
                <input 
                  type="text" 
                  value={selectedFile.altText || ''} 
                  placeholder="Describe image for accessibility..."
                  onChange={e => setSelectedFile({...selectedFile, altText: e.target.value})} 
                  style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', background: 'var(--white)' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '9px', fontBlack: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-light)', marginBottom: '6px' }}>Caption</label>
                <textarea 
                  value={selectedFile.caption || ''} 
                  placeholder="Enter a brief caption..."
                  onChange={e => setSelectedFile({...selectedFile, caption: e.target.value})} 
                  style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 12px', fontSize: '13px', background: 'var(--white)', minHeight: '80px', resize: 'none' }} 
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '9px', fontBlack: 'bold', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--ink-light)', marginBottom: '6px' }}>Used In</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {(selectedFile.usedIn || ['Unassigned']).map((tag, i) => (
                    <span key={i} style={{ fontSize: '10px', fontWeight: 'bold', padding: '5px 12px', borderRadius: '15px', background: 'var(--blue-light)', color: 'var(--blue)', textTransform: 'uppercase' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>
    </DashboardLayout>
  );
}
