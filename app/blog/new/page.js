'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';

export default function NewBlogPostPage() {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Architecture',
    author: 'Admin',
    status: 'Draft',
    publishDate: '',
    excerpt: '',
    content: '',
    tags: ['Architecture', 'Interior Design', 'Residential'],
    tagInput: '',
    seoTitle: '',
    metaDescription: '',
    urlSlug: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && formData.tagInput.trim()) {
      e.preventDefault();
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: ''
      }));
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  return (
    <DashboardLayout title="" subtitle="">
      <div className="max-w-5xl mx-auto px-4">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-[28px] font-bold text-[#32171B] mb-1">Add New Post</h1>
            <p className="text-[12px] text-[#9A8C82]">Create a new entry for add new post.</p>
          </div>

          <Link href="/blog" className="px-6 py-2.5 border border-[#DDD5C8] rounded-md text-[13px] font-bold text-[#32171B] bg-white hover:bg-gray-50 transition-all">
            Cancel
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex flex-col gap-8 mb-12">
          {/* Main Form Section */}
          <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
            <div className="px-8 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2]">
              <h2 className="text-[11px] font-bold text-[#32171B] tracking-[0.2em] uppercase">ADD BLOG POST FORM</h2>
            </div>
            
            <div className="p-8 flex flex-col gap-6">
              {/* Post Title */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">POST TITLE</label>
                <input 
                  type="text" 
                  placeholder="Enter blog post title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
              </div>

              {/* Category & Author */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">CATEGORY</label>
                  <select 
                    value={formData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] text-[#32171B]"
                  >
                    <option>Architecture</option>
                    <option>Interior Design</option>
                    <option>Project Insights</option>
                    <option>Studio News</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">AUTHOR</label>
                  <input 
                    type="text" 
                    value={formData.author}
                    onChange={(e) => handleChange('author', e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                  />
                </div>
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">POST STATUS</label>
                  <select 
                    value={formData.status}
                    onChange={(e) => handleChange('status', e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] text-[#32171B]"
                  >
                    <option>Draft</option>
                    <option>Published</option>
                    <option>Scheduled</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">PUBLISH DATE</label>
                  <input 
                    type="date" 
                    value={formData.publishDate}
                    onChange={(e) => handleChange('publishDate', e.target.value)}
                    className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                  />
                </div>
              </div>

              {/* Featured Image */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">FEATURED IMAGE</label>
                <div className="aspect-[21/6] border-2 border-dashed border-[#D5A73F] bg-[#FAF7F2] rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-[#F5E9C8] transition-all group">
                  <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-[#D5A73F]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-bold text-[#32171B]">Upload featured image</span>
                </div>
              </div>

              {/* Excerpt */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">EXCERPT</label>
                <textarea 
                  placeholder="Write a short summary for the blog listing page."
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[100px] resize-none"
                />
              </div>

              {/* Blog Content */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">BLOG CONTENT</label>
                <textarea 
                  placeholder="Write the full blog post content here."
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[150px] resize-none"
                />
                <p className="text-[9px] text-[#9A8C82] italic">This area can later be replaced with a rich text editor for headings, images, links, lists, and formatting.</p>
              </div>

              {/* Tags */}
              <div className="flex flex-col gap-3">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">TAGS</label>
                <input 
                  type="text" 
                  placeholder="Enter tags separated by commas, e.g. architecture, interiors, residential design"
                  value={formData.tagInput}
                  onChange={(e) => handleChange('tagInput', e.target.value)}
                  onKeyDown={handleAddTag}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.tags.map((tag, i) => (
                    <div key={i} className="px-4 py-1.5 bg-[#FAF7F2] border border-[#D5A73F] rounded-full text-[11px] font-bold text-[#32171B] flex items-center gap-2">
                      {tag}
                      <button onClick={() => removeTag(i)} className="text-[#D5A73F] hover:text-[#32171B] transition-colors">&times;</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SEO Section */}
          <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
            <div className="px-8 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2]">
              <h2 className="text-[11px] font-bold text-[#32171B] tracking-[0.2em] uppercase">SEO SETTINGS</h2>
            </div>
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">SEO TITLE</label>
                <input 
                  type="text" 
                  placeholder="Enter SEO title"
                  value={formData.seoTitle}
                  onChange={(e) => handleChange('seoTitle', e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">META DESCRIPTION</label>
                <textarea 
                  placeholder="Enter meta description for search engines."
                  value={formData.metaDescription}
                  onChange={(e) => handleChange('metaDescription', e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[100px] resize-none"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">URL SLUG</label>
                <input 
                  type="text" 
                  placeholder="e.g. designing-homes-that-breathe"
                  value={formData.urlSlug}
                  onChange={(e) => handleChange('urlSlug', e.target.value)}
                  className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Page Actions Footer */}
        <div className="flex justify-end gap-4 pb-12">
          <button className="px-8 py-3 bg-white border border-[#DDD5C8] rounded-md text-[13px] font-bold text-[#32171B] hover:bg-gray-50 transition-all shadow-sm">
            Save Draft
          </button>
          <button className="px-8 py-3 bg-[#32171B] text-white rounded-md text-[13px] font-bold hover:bg-[#4a2228] transition-all shadow-sm">
            Save and Publish
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
