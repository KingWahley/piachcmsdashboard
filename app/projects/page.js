'use client';

import React, { useState, useMemo, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import StatusPill from '@/components/shared/StatusPill';
import SearchToolbar from '@/components/shared/SearchToolbar';
import EmptyState from '@/components/shared/EmptyState';
import GridToggle from '@/components/shared/GridToggle';
import { useStore } from '@/hooks/useStore';
import { projectsStore, projectCategoriesStore } from '@/lib/store';
import { useFilterSort } from '@/hooks/useFilterSort';
import Link from 'next/link';
import { useViewMode } from '@/hooks/useViewMode';
import Pagination from '@/components/shared/Pagination';

export default function ProjectsPage() {
  const { data, deleteItem } = useStore(projectsStore);
  const { data: projectCategories } = useStore(projectCategoriesStore);
  const { filteredAndSortedData, searchQuery, setSearchQuery, filters, updateFilter } = useFilterSort(data, { category: 'all' }, { key: 'date', order: 'desc' });
  
  const [view, setView] = useViewMode();
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 7;

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filters]);

  const filterOptions = [
    { value: 'all', label: 'All Categories' },
    ...projectCategories.map(c => ({ value: c.name, label: c.name }))
  ];

  // Pagination logic
  const totalPages = Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = filteredAndSortedData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <DashboardLayout title="Projects" subtitle="Manage portfolio projects, categories, and media galleries">
      <div className="page-head">
        <div className="page-title-wrap">
          <h1>Project List</h1>
          <p>Add, edit, view, delete, and publish architectural portfolio projects.</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Link href="/projects/new" style={{ textDecoration: 'none' }}>
            <button className="primary-btn">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginRight: '8px' }}><path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
              Add Project
            </button>
          </Link>
        </div>
      </div>

      <SearchToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        placeholder="Search projects by title, location, or status"
        filterOptions={[{ value: 'all', label: 'All Statuses' }, { value: 'Completed', label: 'Completed' }, { value: 'Ongoing', label: 'Ongoing' }, { value: 'On Hold', label: 'On Hold' }]}
        currentFilter={filters.status || 'all'}
        onFilterChange={(v) => updateFilter('status', v)}
      >
        <select className="filter-select" value={filters.category || 'all'} onChange={(e) => updateFilter('category', e.target.value)}>
          {filterOptions.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
        </select>
        <GridToggle view={view} onViewChange={setView} />
      </SearchToolbar>

      {filteredAndSortedData.length === 0 ? (
        <div style={{ padding: '30px', background: 'var(--white)', border: '1px solid var(--stone-dark)', borderRadius: '8px' }}>
          <EmptyState title="No projects found" message="Try a different search query or add a new project." />
        </div>
      ) : view === 'list' ? (
        <div className="card" style={{ marginBottom: '24px' }}>
          <div className="card-header" style={{ padding: '14px 18px', borderBottom: '1px solid var(--stone)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--cream)' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--burgundy)', textTransform: 'uppercase', letterSpacing: '0.07em' }}>List View</span>
            <Link href="/project-categories" style={{ fontSize: '10px', color: 'var(--gold-dark)', textDecoration: 'underline' }}>Manage categories →</Link>
          </div>
          <div style={{ background: 'var(--white)', overflow: 'hidden' }}>
            <table className="project-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Project Title</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Location</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Status</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Description</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Gallery</th>
                  <th style={{ textAlign: 'left', padding: '13px 16px', fontSize: '10px', textTransform: 'uppercase', letterSpacing: '0.07em', color: 'var(--burgundy)', borderBottom: '1px solid var(--stone-dark)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((project) => (
                  <tr key={project.id} style={{ borderBottom: '1px solid var(--stone)' }} className="table-row-hover">
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div style={{ fontWeight: 'bold', color: 'var(--ink)', fontSize: '12px' }}>{project.title}</div>
                      <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '3px', maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{project.subtitle}</div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '12px', color: 'var(--ink-mid)' }}>
                      <div style={{ maxWidth: '120px' }}>
                        {project.location ? project.location.split(', ').map((part, i) => <div key={i}>{part}{i < project.location.split(', ').length -1 ? ',' : ''}</div>) : '-'}
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <span className={`status-pill ${project.status === 'Completed' ? 's-approved' : project.status === 'Ongoing' ? 's-pending' : 's-opened'}`}>
                        {project.status.toUpperCase()}
                      </span>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle', fontSize: '12px', color: 'var(--ink-mid)' }}>
                      <div style={{ maxWidth: '180px' }}>{project.description}</div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div className="gallery-count" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                        {project.galleryCount || 0} Photos
                      </div>
                    </td>
                    <td style={{ padding: '14px 16px', verticalAlign: 'middle' }}>
                      <div className="action-group" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <button className="action-btn" title="View" style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>👁</button>
                        <Link href={`/projects/${project.id}/edit`} style={{ textDecoration: 'none' }}>
                          <button className="action-btn" title="Edit" style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>✎</button>
                        </Link>
                        <button className="action-btn delete" title="Delete" onClick={() => deleteItem(project.id)} style={{ border: '1px solid var(--stone-dark)', background: 'var(--white)', color: 'var(--ink-mid)', width: '30px', height: '30px', borderRadius: '5px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>×</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
          />
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px', marginBottom: '24px' }}>
            {paginatedData.map((project) => (
              <div key={project.id} style={{ border: '1px solid var(--stone-dark)', borderRadius: '8px', background: 'var(--white)', overflow: 'hidden' }}>
                <div style={{ height: '118px', background: 'linear-gradient(135deg, var(--burgundy) 0%, var(--burgundy-mid) 45%, var(--gold-dark) 100%)', position: 'relative', display: 'flex', alignItems: 'flex-end', padding: '12px' }}>
                  <div style={{ position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.92)', color: 'var(--burgundy)', fontSize: '10px', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                    {project.category}
                  </div>
                </div>
                <div style={{ padding: '13px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--ink)', marginBottom: '5px' }}>{project.title}</div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginBottom: '10px', display: 'flex', gap: '8px' }}>
                    <StatusPill status={project.status} /> <span>{project.date}</span>
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--ink-mid)', lineHeight: '1.45', minHeight: '42px' }}>{project.description}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 13px', borderTop: '1px solid var(--stone)', background: 'var(--cream)' }}>
                   <div className="gallery-count" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px', fontSize: '10px', color: 'var(--blue)', background: 'var(--blue-light)', padding: '4px 8px', borderRadius: '12px', fontWeight: 'bold' }}>
                     <Icons.media style={{ width: '12px', height: '12px' }} /> {project.galleryCount || 0} images
                   </div>
                   <Link href={`/projects/${project.id}/edit`} style={{ textDecoration: 'none' }}>
                     <button className="secondary-btn" style={{ padding: '6px 10px', fontSize: '10px' }}>Edit Project</button>
                   </Link>
                </div>
              </div>
            ))}
          </div>
          <Pagination 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredAndSortedData.length}
            pageSize={pageSize}
          />
        </>
      )}
    </DashboardLayout>
  );
}
