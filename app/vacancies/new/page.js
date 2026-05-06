'use client';

import React from 'react';
import Link from 'next/link';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function NewVacancyPage() {
  return (
    <DashboardLayout title="Add New Vacancy" subtitle="Post a new job opening for the careers page">
      <div className="page-head">
        <div className="page-title-wrap">
          <Link href="/vacancies" style={{ fontSize: '12px', color: 'var(--ink-mid)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', marginBottom: '8px', fontFamily: 'Verdana, sans-serif' }}>
            <span style={{ marginRight: '6px' }}>←</span> Back to Vacancies
          </Link>
          <h1>Create New Vacancy</h1>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="secondary-btn">Save as Draft</button>
          <button className="primary-btn">Publish Vacancy</button>
        </div>
      </div>

      <div className="form-drawer">
        <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '24px', alignItems: 'start' }}>
          
          {/* Main Content Area */}
          <div className="form-main" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="panel-section">
              <h3 className="section-title">Job Details</h3>
              
              <div className="input-group">
                <label className="input-label">Job Title</label>
                <input type="text" className="input-field" placeholder="e.g. Senior Interior Designer" />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="input-group">
                  <label className="input-label">Department</label>
                  <select className="input-field">
                    <option>Architecture</option>
                    <option>Interior Design</option>
                    <option>Urban Planning</option>
                    <option>Administration</option>
                  </select>
                </div>
                <div className="input-group">
                  <label className="input-label">Location</label>
                  <input type="text" className="input-field" placeholder="e.g. Lagos, Nigeria" />
                </div>
              </div>
              
              <div className="input-group">
                <label className="input-label">Job Description</label>
                <textarea className="input-field" placeholder="Describe the role, responsibilities, and impact..." style={{ minHeight: '150px', resize: 'vertical' }}></textarea>
              </div>

              <div className="input-group">
                <label className="input-label">Requirements</label>
                <textarea className="input-field" placeholder="List the required skills, experience, and qualifications..." style={{ minHeight: '150px', resize: 'vertical' }}></textarea>
              </div>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="form-sidebar" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="panel-section">
              <h3 className="section-title">Employment Type</h3>
              
              <div className="input-group">
                <select className="input-field">
                  <option>Full-Time</option>
                  <option>Part-Time</option>
                  <option>Contract</option>
                  <option>Internship</option>
                </select>
              </div>
            </div>

            <div className="panel-section">
              <h3 className="section-title">Status & Visibility</h3>
              
              <div className="input-group">
                <label className="input-label">Status</label>
                <select className="input-field">
                  <option>Open</option>
                  <option>Draft</option>
                  <option>Closed</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Application Deadline</label>
                <input type="date" className="input-field" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </DashboardLayout>
  );
}
