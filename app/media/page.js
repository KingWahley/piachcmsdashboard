'use client';

import React, { useState, useRef } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import EmptyState from '@/components/shared/EmptyState';
import { useStore } from '@/hooks/useStore';
import { mediaStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import { useViewMode } from '@/hooks/useViewMode';

export default function MediaPage() {
  const { data, createItem, updateItem, deleteItem } = useStore(mediaStore);
  const [selectedType, setSelectedType] = useState('All Media Types');
  const [selectedUsage, setSelectedUsage] = useState('All Usage');
  
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'dateAdded', order: 'desc' });
  
  // Apply additional filters for Type and Usage
  const finalData = filteredAndSortedData.filter(item => {
    const matchesType = selectedType === 'All Media Types' || item.type.includes(selectedType.toLowerCase());
    const matchesUsage = selectedUsage === 'All Usage' || (item.usage && item.usage === selectedUsage);
    return matchesType && matchesUsage;
  });

  const [view, setView] = useViewMode('list');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showUploadZone, setShowUploadZone] = useState(true); // Default to true based on image
  const fileInputRef = useRef(null);

  const stats = [
    { label: 'Total Files', value: data.length },
    { label: 'Project Images', value: data.filter(i => i.usage === 'Project').length },
    { label: 'Team Photos', value: data.filter(i => i.usage === 'Team').length },
    { label: 'Storage Used', value: '2.4GB' }
  ];

  const handleAssetClick = (asset) => {
    if (selectedAsset?.id === asset.id) {
      setSelectedAsset(null);
    } else {
      setSelectedAsset(asset);
    }
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this asset?')) {
      deleteItem(id);
      if (selectedAsset?.id === id) setSelectedAsset(null);
    }
  };

  const handleUpdate = (updates) => {
    if (!selectedAsset) return;
    const updated = { ...selectedAsset, ...updates };
    setSelectedAsset(updated);
    updateItem(selectedAsset.id, updated);
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
        usage: 'Project', // Default usage
        dimensions: '---'
      };
      createItem(newAsset);
    });
    
    setShowUploadZone(false);
  };

  return (
    <DashboardLayout title="Media Library" subtitle="Upload, manage, and reuse photos across projects, team profiles, and blog posts">
      <div className="media-wrapper">
        <div className="media-container-inner">
          {/* Main Content Area */}
          <div className="media-main-scroll">
            <div className="media-page-header">
              <div>
                <h1 className="media-title">Media Library</h1>
                <p className="media-subtitle">Upload and manage media assets used across project galleries, team profiles, and blog posts.</p>
              </div>
              {showUploadZone && (
                <button className="close-upload-btn" onClick={() => setShowUploadZone(false)}>
                  <Icons.close style={{ width: '14px', height: '14px' }} />
                  Close Upload
                </button>
              )}
              {!showUploadZone && (
                <button className="primary-btn" onClick={() => setShowUploadZone(true)}>
                    <Icons.plus style={{ width: '14px', height: '14px' }} />
                    Upload Assets
                </button>
              )}
            </div>

            {/* Stats Grid */}
            <div className="media-stats-grid">
              {stats.map(stat => (
                <div key={stat.label} className="media-stat-card">
                  <div className="media-stat-value">{stat.value}</div>
                  <div className="media-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Filter Bar */}
            <div className="media-filter-bar">
              <div className="relative flex-1">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-light)]">
                  <Icons.search style={{ width: '16px', height: '16px' }} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search media by filename, type, tag, or usage" 
                  className="w-full pl-10 pr-4 py-2 text-sm border-none focus:outline-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="h-6 w-px bg-[var(--stone-dark)]"></div>

              <select 
                className="bg-transparent text-sm font-semibold text-[var(--ink-mid)] focus:outline-none cursor-pointer"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option>All Media Types</option>
                <option>Images</option>
                <option>Documents</option>
              </select>

              <div className="h-6 w-px bg-[var(--stone-dark)]"></div>

              <select 
                className="bg-transparent text-sm font-semibold text-[var(--ink-mid)] focus:outline-none cursor-pointer"
                value={selectedUsage}
                onChange={(e) => setSelectedUsage(e.target.value)}
              >
                <option>All Usage</option>
                <option>Project</option>
                <option>Team</option>
              </select>

              <div className="h-6 w-px bg-[var(--stone-dark)]"></div>

              <div className="flex items-center gap-1">
                <button 
                  className={`w-8 h-8 flex items-center justify-center rounded ${view === 'grid' ? 'bg-[var(--burgundy)] text-[var(--gold)]' : 'text-[var(--ink-light)]'}`}
                  onClick={() => setView('grid')}
                >
                  <Icons.grid style={{ width: '16px', height: '16px' }} />
                </button>
                <button 
                  className={`w-8 h-8 flex items-center justify-center rounded ${view === 'list' ? 'bg-[var(--burgundy)] text-[var(--gold)]' : 'text-[var(--ink-light)]'}`}
                  onClick={() => setView('list')}
                >
                  <Icons.list style={{ width: '16px', height: '16px' }} />
                </button>
              </div>
            </div>

            {/* Upload Section */}
            {showUploadZone && (
              <div className="media-upload-section">
                <div className="media-section-header">
                  <h2 className="media-section-title">Upload New Media</h2>
                  <button className="media-section-link" onClick={() => fileInputRef.current?.click()}>Choose from device →</button>
                </div>
                <div className="media-dropzone" onClick={() => fileInputRef.current?.click()}>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    multiple 
                    onChange={handleFileUpload}
                  />
                  <div className="media-dropzone-icon">
                    <Icons.media style={{ width: '24px', height: '24px' }} />
                  </div>
                  <h3 className="media-dropzone-text">Drag and drop files here</h3>
                  <p className="media-dropzone-subtext">Upload images for project galleries, team member photos, blog featured images, and other CMS content.</p>
                  <button className="media-select-btn">Select Files</button>
                </div>
              </div>
            )}

            {/* Media List / Grid */}
            <div className="media-list-section">
              <div className="media-section-header">
                <h2 className="media-section-title">Media List</h2>
                <button className="media-section-link" onClick={() => setView(view === 'grid' ? 'list' : 'grid')}>
                  {view === 'grid' ? 'Switch to list →' : 'Switch to grid →'}
                </button>
              </div>

              <div className="media-list-container">
                {view === 'list' ? (
                  <table className="media-table">
                    <thead>
                      <tr>
                        <th>File</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Uploaded</th>
                        <th>Usage</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {finalData.map(asset => (
                        <tr key={asset.id} className={selectedAsset?.id === asset.id ? 'bg-[var(--gold-light)]/10' : ''}>
                          <td>
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-[var(--cream)] rounded overflow-hidden border border-[var(--stone-dark)] flex items-center justify-center p-1">
                                {asset.type.includes('image') ? (
                                  <img src={asset.url} alt="" className="w-full h-full object-cover rounded" />
                                ) : (
                                  <Icons.document style={{ width: '20px', height: '20px', color: 'var(--ink-light)' }} />
                                )}
                              </div>
                              <div>
                                <div className="text-sm font-bold text-[var(--ink)]">{asset.filename}</div>
                                <div className="text-[10px] text-[var(--ink-light)] mt-0.5">{asset.dimensions || '---'}</div>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="text-sm text-[var(--ink-mid)]">{asset.type.split('/')[1]?.toUpperCase() || 'File'}</div>
                          </td>
                          <td>
                            <div className="text-sm text-[var(--ink-mid)]">{asset.size}</div>
                          </td>
                          <td>
                            <div className="text-sm text-[var(--ink-mid)]">{asset.dateAdded}</div>
                          </td>
                          <td>
                            <span className={`media-usage-tag ${
                              asset.usage === 'Project' ? 'media-usage-project' : 
                              asset.usage === 'Team' ? 'media-usage-team' : 
                              asset.usage === 'Blog' ? 'media-usage-blog' : 
                              'bg-gray-100 text-gray-500'
                            }`}>
                              {asset.usage || 'Unassigned'}
                            </span>
                          </td>
                          <td>
                            <div className="media-action-group">
                              <button className="media-action-btn" title="View" onClick={() => handleAssetClick(asset)}><Icons.search style={{ width: '14px', height: '14px' }} /></button>
                              <button className="media-action-btn" title="Edit" onClick={() => handleAssetClick(asset)}><Icons.pencil style={{ width: '14px', height: '14px' }} /></button>
                              <button className="media-action-btn text-red-500 hover:border-red-200" title="Delete" onClick={() => handleDelete(asset.id)}><Icons.close style={{ width: '14px', height: '14px' }} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="media-grid-auto p-6">
                    {finalData.map(asset => (
                      <div 
                        key={asset.id} 
                        className={`media-card ${selectedAsset?.id === asset.id ? 'selected' : ''}`}
                        onClick={() => handleAssetClick(asset)}
                      >
                        {asset.type.includes('image') ? (
                          <img src={asset.url} alt={asset.filename} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-[var(--cream)]">
                            <Icons.document style={{ width: '40px', height: '40px', color: 'var(--ink-light)' }} />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <div className="text-white text-xs font-bold truncate">{asset.filename}</div>
                          <div className="text-white/70 text-[10px] mt-1">{asset.size}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Details Sidebar */}
          {selectedAsset && (
            <div className="details-sidebar-panel">
              <div className="p-6 border-b border-[var(--stone-dark)] flex items-center justify-between bg-[var(--cream)]/40 sticky top-0 z-10 backdrop-blur-md">
                <h3 className="text-[11px] font-black text-[var(--burgundy)] uppercase tracking-[0.2em]">Asset Details</h3>
                <button 
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[var(--stone)] transition-all" 
                  onClick={() => setSelectedAsset(null)}
                >
                  <Icons.close style={{ width: '20px', height: '20px' }} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-8 space-y-10">
                <div className="aspect-[4/3] bg-[var(--cream)] rounded-2xl border border-[var(--stone-dark)] overflow-hidden shadow-2xl flex items-center justify-center p-6 relative group">
                  {selectedAsset.type.includes('image') ? (
                    <img src={selectedAsset.url} alt={selectedAsset.filename} className="max-w-full max-h-full object-contain drop-shadow-2xl transition-transform group-hover:scale-105 duration-700" />
                  ) : (
                    <Icons.document style={{ width: '100px', height: '100px', color: 'var(--ink-light)' }} />
                  )}
                </div>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-[var(--ink-light)] uppercase tracking-[0.15em]">File Name</label>
                    <input 
                      className="w-full bg-[var(--cream)] border border-[var(--stone-dark)] rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-[var(--gold)] shadow-sm" 
                      value={selectedAsset.filename} 
                      onChange={(e) => handleUpdate({ filename: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-px bg-[var(--stone-dark)] border border-[var(--stone-dark)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-white p-5">
                      <div className="text-[9px] font-black text-[var(--ink-light)] uppercase tracking-widest mb-1 opacity-50">Format</div>
                      <div className="text-xs font-black text-[var(--burgundy)]">{selectedAsset.type.split('/')[1]?.toUpperCase()}</div>
                    </div>
                    <div className="bg-white p-5">
                      <div className="text-[9px] font-black text-[var(--ink-light)] uppercase tracking-widest mb-1 opacity-50">File Size</div>
                      <div className="text-xs font-black text-[var(--burgundy)]">{selectedAsset.size}</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-[var(--ink-light)] uppercase tracking-[0.15em]">Direct Link</label>
                    <div className="flex gap-2">
                      <input 
                        className="flex-1 bg-[var(--cream)] border border-[var(--stone-dark)] rounded-xl px-4 py-3 text-[11px] text-[var(--ink-mid)] font-mono shadow-inner" 
                        value={selectedAsset.url} 
                        readOnly 
                      />
                      <button 
                        className="w-12 h-12 flex items-center justify-center bg-white border border-[var(--stone-dark)] rounded-xl hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all shadow-sm active:scale-95"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedAsset.url);
                          alert('Link copied to clipboard');
                        }}
                      >
                        <Icons.copy style={{ width: '18px', height: '18px' }} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
