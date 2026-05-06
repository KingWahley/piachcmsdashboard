'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';

export default function ProjectCategoriesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen);
  };

  return (
    <DashboardLayout title="Project Categories" subtitle="Create and manage reusable project categories for portfolio entries">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Project Categories</h1>
          <p>Add, edit, and manage categories that can be selected when creating or editing projects.</p>
        </div>
        <button className="primary-btn" onClick={toggleForm}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          Add Category
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>7</div>
          <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Categories</div>
        </div>
        <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>24</div>
          <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Linked Projects</div>
        </div>
        <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>3</div>
          <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Most Used</div>
        </div>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <input placeholder="Search categories by name or description" />
        </div>
        <select className="filter-select">
          <option>Sort by newest</option>
          <option>Sort by name</option>
          <option>Sort by project count</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: isFormOpen ? '360px 1fr' : '1fr', gap: '18px', alignItems: 'start', transition: 'grid-template-columns 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)' }}>
        {/* Form Card */}
        {isFormOpen && (
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '6px', overflow: 'hidden', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--cream)' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Add Category</span>
            </div>
            <div style={{ padding: '16px' }}>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Category Name</label>
                <input placeholder="e.g. Residential" style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', color: 'var(--ink)', background: 'var(--cream)' }} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Slug</label>
                <input placeholder="e.g. residential" style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', color: 'var(--ink)', background: 'var(--cream)' }} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Description</label>
                <textarea placeholder="Briefly describe where this category should be used." style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', color: 'var(--ink)', background: 'var(--cream)', minHeight: '86px', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--burgundy)', fontWeight: 'bold', marginBottom: '6px' }}>Status</label>
                <select style={{ width: '100%', border: '1px solid var(--stone-dark)', borderRadius: '6px', padding: '10px 11px', fontFamily: 'Verdana, sans-serif', fontSize: '12px', color: 'var(--ink)', background: 'var(--cream)' }}>
                  <option>Active</option>
                  <option>Inactive</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '14px' }}>
                <button className="secondary-btn" onClick={toggleForm}>Clear</button>
                <button className="primary-btn">Save Category</button>
              </div>
              <div style={{ marginTop: '10px', padding: '10px', background: 'var(--gold-light)', border: '1px solid var(--gold)', borderRadius: '6px', fontSize: '10px', color: 'var(--burgundy)', lineHeight: 1.5 }}>
                Categories created here will appear as selectable options in the Add New Project form.
              </div>
            </div>
          </div>
        )}

        {/* Table Card */}
        <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '6px', overflow: 'hidden' }}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--cream)' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>Category List</span>
            <button style={{ fontSize: '10px', color: 'var(--gold-dark)', cursor: 'pointer', background: 'none', border: 'none', fontFamily: 'Verdana', textDecoration: 'underline' }}>Export list →</button>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Category</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Slug</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Projects</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Last Updated</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', background: 'var(--cream)', borderBottom: '1px solid var(--stone-dark)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'Residential', desc: 'Homes, private residences, apartments, and housing projects.', slug: 'residential', count: 9, status: 'Active', date: 'May 5, 2026' },
                  { name: 'Commercial', desc: 'Offices, retail spaces, hotels, and corporate environments.', slug: 'commercial', count: 12, status: 'Active', date: 'May 1, 2026' },
                  { name: 'Interior', desc: 'Interior design projects, renovations, and styling.', slug: 'interior', count: 3, status: 'Active', date: 'Apr 28, 2026' },
                ].map((cat, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid var(--stone)' }}>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 'bold', color: 'var(--ink)', fontSize: '12px' }}>{cat.name}</div>
                      <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '3px', lineHeight: 1.45 }}>{cat.desc}</div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '12px', color: 'var(--ink-mid)' }}>{cat.slug}</td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--burgundy)', background: 'var(--gold-light)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>{cat.count} Projects</span>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <span className="status-pill s-approved">{cat.status}</span>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '12px', color: 'var(--ink-mid)' }}>{cat.date}</td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✎</button>
                        <button style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>×</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-15px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}} />
    </DashboardLayout>
  );
}
