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
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'dateAdded', order: 'desc' });
  
  const [view, setView] = useViewMode('grid');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const fileInputRef = useRef(null);

  const handleAssetClick = (asset) => {
    if (selectedAsset?.id === asset.id) {
      setSelectedAsset(null);
    } else {
      setSelectedAsset(asset);
    }
  };

  const handleDelete = () => {
    if (!selectedAsset) return;
    if (confirm('Are you sure you want to delete this asset?')) {
      deleteItem(selectedAsset.id);
      setSelectedAsset(null);
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
        alt: '',
        dimensions: '---'
      };
      createItem(newAsset);
    });
    
    setShowUploadZone(false);
  };

  return (
    <DashboardLayout title="Media Library" subtitle="Manage images, documents, and other assets">
      <div className="media-wrapper">
        <div className="media-container-inner">
          {/* Main Content Area */}
          <div className="media-main-scroll">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-white rounded-full border border-[var(--stone-dark)] shadow-sm">
                  <span className="text-[10px] font-bold text-[var(--burgundy)] uppercase tracking-wider">
                    {data.length} Assets
                  </span>
                </div>
              </div>
              <button className="primary-btn" onClick={() => setShowUploadZone(!showUploadZone)}>
                {showUploadZone ? <Icons.close style={{ width: '14px', height: '14px' }} /> : <Icons.plus style={{ width: '14px', height: '14px' }} />}
                {showUploadZone ? 'Cancel Upload' : 'Upload Assets'}
              </button>
            </div>

            <div className="flex items-center justify-between mb-8 gap-4">
              <div className="relative w-full max-w-md">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-light)]">
                  <Icons.search style={{ width: '16px', height: '16px' }} />
                </div>
                <input 
                  type="text" 
                  placeholder="Search assets..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[var(--stone-dark)] rounded-xl text-sm focus:outline-none focus:border-[var(--gold)] shadow-sm transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 p-1 bg-white border border-[var(--stone-dark)] rounded-xl shadow-sm">
                <button 
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${view === 'grid' ? 'bg-[var(--burgundy)] text-[var(--gold)] shadow-sm' : 'text-[var(--ink-mid)] hover:bg-[var(--cream)]'}`} 
                  onClick={() => setView('grid')}
                  title="Grid View"
                >
                  <Icons.grid style={{ width: '18px', height: '18px' }} />
                </button>
                <button 
                  className={`w-9 h-9 flex items-center justify-center rounded-lg transition-all ${view === 'list' ? 'bg-[var(--burgundy)] text-[var(--gold)] shadow-sm' : 'text-[var(--ink-mid)] hover:bg-[var(--cream)]'}`} 
                  onClick={() => setView('list')}
                  title="List View"
                >
                  <Icons.list style={{ width: '18px', height: '18px' }} />
                </button>
              </div>
            </div>

            {showUploadZone && (
              <div 
                className="mb-8 p-12 border-2 border-dashed border-[var(--gold)] bg-[var(--gold-light)]/20 rounded-2xl text-center cursor-pointer hover:bg-[var(--gold-light)]/40 transition-all group"
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  style={{ display: 'none' }} 
                  multiple 
                  onChange={handleFileUpload}
                />
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-110 transition-transform">
                  <Icons.media style={{ width: '32px', height: '32px', color: 'var(--gold)' }} />
                </div>
                <div className="text-xl font-bold text-[var(--burgundy)]">Drag files here</div>
                <div className="text-sm text-[var(--ink-light)] mt-1">or click to browse your computer</div>
              </div>
            )}

            {filteredAndSortedData.length === 0 ? (
              <div className="py-20 flex flex-col items-center justify-center bg-white/50 rounded-2xl border border-dashed border-[var(--stone-dark)]">
                <EmptyState 
                  title="No assets found" 
                  message={searchQuery ? "Try refining your search query." : "Start by uploading your first asset."} 
                />
              </div>
            ) : view === 'grid' ? (
              <div className="media-grid-auto">
                {filteredAndSortedData.map(asset => (
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
                    <div className="absolute top-3 right-3 bg-white/95 backdrop-blur shadow-sm px-2 py-1 rounded-lg text-[9px] font-extrabold text-[var(--burgundy)] uppercase tracking-tighter">
                      {asset.type.split('/')[1]?.toUpperCase().substring(0, 4)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-[var(--stone-dark)] rounded-2xl overflow-hidden shadow-sm">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-[var(--cream)]/50 border-b border-[var(--stone-dark)]">
                      <th className="px-6 py-5 text-left text-[10px] font-extrabold text-[var(--ink-light)] uppercase tracking-[0.15em] w-[100px]">Preview</th>
                      <th className="px-6 py-5 text-left text-[10px] font-extrabold text-[var(--ink-light)] uppercase tracking-[0.15em]">File Name</th>
                      <th className="px-6 py-5 text-left text-[10px] font-extrabold text-[var(--ink-light)] uppercase tracking-[0.15em]">Format</th>
                      <th className="px-6 py-5 text-left text-[10px] font-extrabold text-[var(--ink-light)] uppercase tracking-[0.15em]">Size</th>
                      <th className="px-6 py-5 text-left text-[10px] font-extrabold text-[var(--ink-light)] uppercase tracking-[0.15em]">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--stone)]">
                    {filteredAndSortedData.map(asset => (
                      <tr 
                        key={asset.id} 
                        className={`cursor-pointer transition-colors hover:bg-[var(--cream)]/30 ${selectedAsset?.id === asset.id ? 'bg-[var(--gold-light)]/20' : ''}`}
                        onClick={() => handleAssetClick(asset)}
                      >
                        <td className="px-6 py-4">
                          <div className="w-14 h-14 bg-[var(--cream)] rounded-xl overflow-hidden border border-[var(--stone-dark)] flex items-center justify-center p-1 shadow-inner">
                            {asset.type.includes('image') ? (
                              <img src={asset.url} alt="" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                              <Icons.document style={{ width: '24px', height: '24px', color: 'var(--ink-light)' }} />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-[var(--ink)]">{asset.filename}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2.5 py-1 bg-[var(--stone)] text-[10px] font-bold rounded-lg text-[var(--ink-mid)] uppercase tracking-tight">
                            {asset.type.split('/')[1]?.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[var(--ink-mid)]">{asset.size}</td>
                        <td className="px-6 py-4 text-sm text-[var(--ink-light)]">{asset.dateAdded}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
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
                      className="w-full bg-[var(--cream)] border border-[var(--stone-dark)] rounded-xl px-5 py-3 text-sm font-bold focus:outline-none focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold)]/10 transition-all shadow-sm" 
                      value={selectedAsset.filename} 
                      onChange={(e) => handleUpdate({ filename: e.target.value })}
                    />
                  </div>

                  {selectedAsset.type.includes('image') && (
                    <div className="space-y-2">
                      <label className="block text-[10px] font-black text-[var(--ink-light)] uppercase tracking-[0.15em]">Alternative Text</label>
                      <textarea 
                        className="w-full bg-[var(--cream)] border border-[var(--stone-dark)] rounded-xl px-5 py-3 text-sm font-medium focus:outline-none focus:border-[var(--gold)] focus:ring-4 focus:ring-[var(--gold)]/10 transition-all shadow-sm min-h-[100px] leading-relaxed" 
                        placeholder="Help search engines and screen readers understand this image..."
                        value={selectedAsset.alt || ''}
                        onChange={(e) => handleUpdate({ alt: e.target.value })}
                      />
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-px bg-[var(--stone-dark)] border border-[var(--stone-dark)] rounded-2xl overflow-hidden shadow-sm">
                    <div className="bg-white p-5">
                      <div className="text-[9px] font-black text-[var(--ink-light)] uppercase tracking-widest mb-1 opacity-50">Format</div>
                      <div className="text-xs font-black text-[var(--burgundy)]">{selectedAsset.type.split('/')[1]?.toUpperCase()}</div>
                    </div>
                    <div className="bg-white p-5">
                      <div className="text-[9px] font-black text-[var(--ink-light)] uppercase tracking-widest mb-1 opacity-50">File Size</div>
                      <div className="text-xs font-black text-[var(--burgundy)]">{selectedAsset.size}</div>
                    </div>
                    <div className="bg-white p-5">
                      <div className="text-[9px] font-black text-[var(--ink-light)] uppercase tracking-widest mb-1 opacity-50">Added On</div>
                      <div className="text-xs font-black text-[var(--burgundy)]">{selectedAsset.dateAdded}</div>
                    </div>
                    <div className="bg-white p-5">
                      <div className="text-[9px] font-black text-[var(--ink-light)] uppercase tracking-widest mb-1 opacity-50">Res</div>
                      <div className="text-xs font-black text-[var(--burgundy)]">{selectedAsset.dimensions || '1200x800'}</div>
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

                <div className="pt-10">
                  <button 
                    className="w-full py-4 px-6 rounded-2xl text-red-600 text-xs font-black border-2 border-red-50 hover:bg-red-50 hover:border-red-100 transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
                    onClick={handleDelete}
                  >
                    <Icons.trash style={{ width: '16px', height: '16px' }} />
                    Delete Asset Permanently
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
