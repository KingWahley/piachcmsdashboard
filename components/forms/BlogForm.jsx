'use client';

import React, { useState, useEffect } from 'react';
import { Icons } from '@/components/shared/Icons';

export default function BlogForm({ initialData, onSave, onCancel, isNew = false }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Architecture',
    author: 'Admin',
    status: 'draft',
    date: new Date().toISOString().split('T')[0],
    excerpt: '',
    content: '',
    tags: [],
    tagInput: '',
    seoTitle: '',
    metaDescription: '',
    slug: '',
    image: '',
    ...initialData
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ 
        ...prev, 
        ...initialData,
        tags: Array.isArray(initialData.tags) ? initialData.tags : []
      }));
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && formData.tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(formData.tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, prev.tagInput.trim()],
          tagInput: ''
        }));
      } else {
        setFormData(prev => ({ ...prev, tagInput: '' }));
      }
    }
  };

  const removeTag = (index) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { tagInput, ...finalData } = formData;
    onSave(finalData);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Main Form Section */}
      <div className="bg-white border border-[#DDD5C8] rounded-lg overflow-hidden shadow-sm">
        <div className="px-8 py-5 border-b border-[#DDD5C8] bg-[#FAF7F2]">
          <h2 className="text-[11px] font-bold text-[#32171B] tracking-[0.2em] uppercase">
            {isNew ? 'ADD BLOG POST FORM' : 'EDIT BLOG POST FORM'}
          </h2>
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
                <option value="Architecture">Architecture</option>
                <option value="Interior Design">Interior Design</option>
                <option value="Project Insights">Project Insights</option>
                <option value="Studio News">Studio News</option>
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
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">PUBLISH DATE</label>
              <input 
                type="date" 
                value={formData.date}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
              />
            </div>
          </div>

          {/* Featured Image URL */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">FEATURED IMAGE URL</label>
            <input 
              type="text" 
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
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
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F] min-h-[150px] resize-vertical"
            />
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold text-[#32171B] uppercase tracking-wider">TAGS</label>
            <input 
              type="text" 
              placeholder="Enter tag and press Enter"
              value={formData.tagInput}
              onChange={(e) => handleChange('tagInput', e.target.value)}
              onKeyDown={handleAddTag}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
            <div className="flex flex-wrap gap-2 mt-1">
              {formData.tags.map((tag, i) => (
                <div key={i} className="px-4 py-1.5 bg-[#FAF7F2] border border-[#D5A73F] rounded-full text-[11px] font-bold text-[#32171B] flex items-center gap-2">
                  {tag}
                  <button type="button" onClick={() => removeTag(i)} className="text-[#D5A73F] hover:text-[#32171B] transition-colors">&times;</button>
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
              value={formData.slug}
              onChange={(e) => handleChange('slug', e.target.value)}
              className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-sm outline-none focus:border-[#D5A73F]"
            />
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-4 pb-4">
        <button 
          type="button"
          onClick={onCancel}
          className="px-8 py-3 bg-white border border-[#DDD5C8] rounded-md text-[13px] font-bold text-[#32171B] hover:bg-gray-50 transition-all shadow-sm"
        >
          Cancel
        </button>
        <button 
          type="button"
          onClick={handleSubmit}
          className="px-8 py-3 bg-[#32171B] text-white rounded-md text-[13px] font-bold hover:bg-[#4a2228] transition-all shadow-sm"
        >
          {isNew ? 'Save and Publish' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
