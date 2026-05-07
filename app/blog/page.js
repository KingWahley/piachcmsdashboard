'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import EmptyState from '@/components/shared/EmptyState';
import Panel from '@/components/panels/Panel';
import { useStore } from '@/hooks/useStore';
import { blogStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';

export default function BlogPage() {
  const { data, createItem, updateItem, deleteItem } = useStore(blogStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery } = useFilterSort(data, {}, { key: 'date', order: 'desc' });
  
  const [selectedPost, setSelectedPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Stats calculation
  const totalPosts = data.length;
  const publishedCount = data.filter(p => p.status === 'published').length;
  const draftCount = data.filter(p => p.status === 'draft').length;
  const scheduledCount = data.filter(p => p.status === 'scheduled').length;

  const handleEdit = (post) => {
    setSelectedPost(post);
    setIsEditing(true);
  };

  const handleClosePanel = () => {
    setSelectedPost(null);
    setIsEditing(false);
  };

  // Final filtering including status and category
  const finalData = filteredAndSortedData.filter(post => {
    const matchesStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || post.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  const categories = [...new Set(data.map(p => p.category))];

  return (
    <DashboardLayout title="" subtitle="">
      {/* Page Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-[28px] font-bold text-[#32171B] mb-1">Blog Posts</h1>
          <p className="text-[12px] text-[#9A8C82]">Create, edit, publish, and manage blog articles for the Pieach website.</p>
        </div>

        <button 
          onClick={() => handleEdit({ id: 'new', title: '', excerpt: '', category: '', author: 'Admin', date: new Date().toISOString().split('T')[0], status: 'draft', reads: 0, image: '', content: '', tags: [], seoTitle: '', metaDescription: '', slug: '' })}
          className="bg-[#32171B] text-white px-6 py-3 rounded-md text-xs font-bold hover:bg-[#4a2228] transition-all flex items-center gap-2 shadow-sm"
        >
          <Icons.plus className="w-4 h-4" />
          Add Blog Post
        </button>
      </div>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '32px' }}>
        {[
          { label: 'TOTAL POSTS', value: totalPosts },
          { label: 'PUBLISHED', value: publishedCount },
          { label: 'DRAFTS', value: draftCount },
          { label: 'SCHEDULED', value: scheduledCount }
        ].map((stat, i) => (
          <div key={i} style={{ 
            background: 'var(--white)', 
            border: '1px solid var(--stone-dark)', 
            borderTop: '3px solid var(--gold)', 
            borderRadius: '6px', 
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1, fontFamily: 'Verdana, Geneva, sans-serif' }}>{stat.value}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em', fontFamily: 'Verdana, Geneva, sans-serif' }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg p-5 mb-8 flex items-center gap-4">
        <div className="search-box" style={{ flex: '1', maxWidth: '100%' }}>
          <Icons.search className="w-4 h-4 text-[#9A8C82]" />
          <input 
            type="text"
            placeholder="Search blog posts by title, author, category, or keyword"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
        </div>
        <select 
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-[13px] text-[#32171B] outline-none min-w-[150px]"
        >
          <option value="all">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
          <option value="scheduled">Scheduled</option>
        </select>
        <select 
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-[13px] text-[#32171B] outline-none min-w-[150px]"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2] flex justify-between items-center">
          <h2 className="text-[11px] font-bold text-[#32171B] tracking-widest uppercase">POST LIST</h2>
          <button className="text-[10px] text-[#A87E28] hover:underline font-bold">Manage categories →</button>
        </div>

        {finalData.length === 0 ? (
          <div className="p-12">
            <EmptyState title="No posts found" message="Try adjusting your filters or search query." />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#DDD5C8]">
                  <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">BLOG POST</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">CATEGORY</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">AUTHOR</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">STATUS</th>
                  <th className="text-left px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">DATE</th>
                  <th className="text-center px-6 py-4 text-[10px] font-bold text-[#32171B] uppercase tracking-wider">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {finalData.map((post) => (
                  <tr key={post.id} className="border-b border-[#F0EBE3] hover:bg-[#FAF7F2] transition-colors">
                    <td className="px-6 py-5 min-w-[400px]">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-12 rounded bg-[#32171B] overflow-hidden flex-shrink-0 shadow-sm">
                          {post.image ? (
                            <img src={post.image} alt="" className="w-full h-full object-cover opacity-80" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[#D5A73F]">
                              <Icons.blog className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-[13px] font-bold text-[#32171B] leading-snug">{post.title}</div>
                          <div className="text-[10px] text-[#9A8C82] line-clamp-1 italic">{post.excerpt}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-[12px] font-medium text-[#32171B]">{post.category}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-[12px] text-[#32171B]">{post.author}</div>
                    </td>
                    <td className="px-6 py-5">
                      <StatusPill status={post.status} />
                    </td>
                    <td className="px-6 py-5">
                      <div className="text-[11px] text-[#1A1410] whitespace-nowrap">
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        <button className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-[#D5A73F] hover:text-white hover:border-[#D5A73F] transition-all">
                          <Icons.eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleEdit(post)}
                          className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-[#32171B] hover:text-white hover:border-[#32171B] transition-all"
                        >
                          <Icons.pencil className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => { if(confirm('Delete this post?')) deleteItem(post.id); }}
                          className="w-8 h-8 rounded border border-[#DDD5C8] flex items-center justify-center text-[#9A8C82] hover:bg-red-600 hover:text-white hover:border-red-600 transition-all"
                        >
                          <Icons.close className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Panel */}
      <Panel 
        isOpen={isEditing && !!selectedPost} 
        onClose={handleClosePanel} 
        title={selectedPost?.id === 'new' ? "New Article" : "Edit Article"}
        actions={
          <div className="flex w-full gap-3">
            {selectedPost?.id !== 'new' && (
              <button 
                className="px-6 py-2 border border-red-500 text-red-500 rounded-md text-[11px] font-bold uppercase hover:bg-red-50 transition-all mr-auto"
                onClick={() => { deleteItem(selectedPost.id); handleClosePanel(); }}
              >
                Delete
              </button>
            )}
            <button className="px-6 py-2 border border-[#DDD5C8] text-[#32171B] rounded-md text-[11px] font-bold uppercase" onClick={handleClosePanel}>Cancel</button>
            <button className="px-6 py-2 bg-[#32171B] text-white rounded-md text-[11px] font-bold uppercase" onClick={() => {
               if(selectedPost.id === 'new') {
                 createItem(selectedPost);
               } else {
                 updateItem(selectedPost.id, selectedPost);
               }
               handleClosePanel();
            }}>Save Changes</button>
          </div>
        }
      >
        {selectedPost && (
          <div className="flex flex-col gap-6 p-1">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Article Title</label>
              <input 
                type="text" 
                value={selectedPost.title} 
                onChange={e => setSelectedPost({...selectedPost, title: e.target.value})} 
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Excerpt / Short Description</label>
              <textarea 
                value={selectedPost.excerpt} 
                onChange={e => setSelectedPost({...selectedPost, excerpt: e.target.value})} 
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[80px] resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Category</label>
                <input 
                  type="text" 
                  value={selectedPost.category} 
                  onChange={e => setSelectedPost({...selectedPost, category: e.target.value})} 
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Author</label>
                <input 
                  type="text" 
                  value={selectedPost.author} 
                  onChange={e => setSelectedPost({...selectedPost, author: e.target.value})} 
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Date</label>
                <input 
                  type="date" 
                  value={selectedPost.date} 
                  onChange={e => setSelectedPost({...selectedPost, date: e.target.value})} 
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Status</label>
                <select 
                  value={selectedPost.status} 
                  onChange={e => setSelectedPost({...selectedPost, status: e.target.value})} 
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                  <option value="scheduled">Scheduled</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Featured Image URL</label>
              <input 
                type="text" 
                value={selectedPost.image} 
                onChange={e => setSelectedPost({...selectedPost, image: e.target.value})} 
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Full Content</label>
              <textarea 
                value={selectedPost.content} 
                onChange={e => setSelectedPost({...selectedPost, content: e.target.value})} 
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[200px] resize-vertical"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Tags (comma separated)</label>
              <input 
                type="text" 
                value={Array.isArray(selectedPost.tags) ? selectedPost.tags.join(', ') : selectedPost.tags} 
                onChange={e => setSelectedPost({...selectedPost, tags: e.target.value.split(',').map(t => t.trim())})} 
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
              />
            </div>

            <div className="border-t border-[#DDD5C8] pt-6 mt-2">
              <h3 className="text-[11px] font-bold text-[#32171B] uppercase tracking-widest mb-4">SEO & Metadata</h3>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">SEO Title</label>
                  <input 
                    type="text" 
                    value={selectedPost.seoTitle} 
                    onChange={e => setSelectedPost({...selectedPost, seoTitle: e.target.value})} 
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Meta Description</label>
                  <textarea 
                    value={selectedPost.metaDescription} 
                    onChange={e => setSelectedPost({...selectedPost, metaDescription: e.target.value})} 
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[80px] resize-none"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">URL Slug</label>
                  <input 
                    type="text" 
                    value={selectedPost.slug} 
                    onChange={e => setSelectedPost({...selectedPost, slug: e.target.value})} 
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Panel>
    </DashboardLayout>
  );
}
