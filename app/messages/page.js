'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Icons } from '@/components/shared/Icons';
import { useStore } from '@/hooks/useStore';
import { messagesStore } from '@/lib/store';

export default function MessagesPage() {
  const { data, updateItem, deleteItem } = useStore(messagesStore);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [sortOrder, setSortOrder] = useState('Newest First');
  const [selectedIds, setSelectedIds] = useState([]);

  // Stats calculation
  const totalEntries = data.length;
  const unreadCount = data.filter(m => m.status === 'unread').length;
  const readCount = data.filter(m => m.status === 'read').length;

  // Filter and Sort
  const filteredData = data.filter(m => {
    const matchesSearch = 
      m.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.body.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'All Statuses' || m.status === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    if (sortOrder === 'Newest First') return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(m => m.id));
    }
  };

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleBulkStatus = (status) => {
    selectedIds.forEach(id => {
      const item = data.find(m => m.id === id);
      if (item) updateItem(id, { ...item, status });
    });
    setSelectedIds([]);
  };

  const handleBulkDelete = () => {
    selectedIds.forEach(id => deleteItem(id));
    setSelectedIds([]);
  };

  return (
    <DashboardLayout 
      title="Messages" 
      subtitle="View, manage, reply to, and export messages submitted through the website contact form"
    >
      <div className="messages-page">
        {/* Page Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold text-[#32171B] mb-1">Contact Form Entries</h1>
            <p className="text-[11px] text-[#9A8C82]">View, manage, reply to, and export messages submitted through the website contact form.</p>
          </div>
          <button className="bg-[#32171B] text-white px-5 py-2.5 rounded-md text-xs font-bold hover:bg-[#4a2228] transition-colors">
            Export Entries
          </button>
        </div>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{totalEntries}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Total Entries</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{unreadCount}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Unread</div>
          </div>
          <div style={{ background: 'var(--white)', border: '1px solid var(--stone-dark)', borderTop: '3px solid var(--gold)', borderRadius: '6px', padding: '14px' }}>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: 'var(--burgundy)', lineHeight: 1 }}>{readCount}</div>
            <div style={{ fontSize: '10px', color: 'var(--ink-light)', marginTop: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Read</div>
          </div>
        </div>


        {/* Messages Container */}
        <div className="bg-[#FAF7F2] border border-[#DDD5C8] rounded-lg overflow-hidden">
          {/* Section Toolbar */}
          <div className="px-6 py-4 border-b border-[#DDD5C8] flex justify-between items-center bg-white">
            <span className="text-[11px] font-bold text-[#32171B] tracking-widest uppercase">Messages</span>
            <div className="flex gap-3">
              <button 
                onClick={() => handleBulkStatus('read')}
                disabled={selectedIds.length === 0}
                className="bg-white border border-[#DDD5C8] px-4 py-2 rounded-md text-[11px] font-bold text-[#32171B] hover:bg-[#FAF7F2] disabled:opacity-50 transition-colors"
              >
                Mark Read
              </button>
              <button 
                onClick={() => handleBulkStatus('unread')}
                disabled={selectedIds.length === 0}
                className="bg-white border border-[#DDD5C8] px-4 py-2 rounded-md text-[11px] font-bold text-[#32171B] hover:bg-[#FAF7F2] disabled:opacity-50 transition-colors"
              >
                Mark Unread
              </button>
              <button 
                onClick={handleBulkDelete}
                disabled={selectedIds.length === 0}
                className="bg-[#8B2525] text-white px-4 py-2 rounded-md text-[11px] font-bold hover:bg-[#a52a2a] disabled:opacity-50 transition-colors"
              >
                Bulk Delete
              </button>
            </div>
          </div>

          {/* Filters Row */}
          <div className="p-4 flex gap-3 bg-white border-b border-[#DDD5C8]">
            <div className="search-box" style={{ flex: '1', maxWidth: '100%' }}>
              <Icons.search className="w-4 h-4 text-[#9A8C82]" />
              <input 
                type="text" 
                placeholder="Search by first name, last name, email, phone, or message..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#5C4E45] font-medium outline-none"
            >
              <option>All Statuses</option>
              <option>Unread</option>
              <option>Read</option>
            </select>
            <select 
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="px-4 py-2.5 bg-[#FAF7F2] border border-[#DDD5C8] rounded-md text-xs text-[#5C4E45] font-medium outline-none"
            >
              <option>Newest First</option>
              <option>Oldest First</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto bg-[#FAF7F2]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-[#DDD5C8]">
                  <th className="p-4 text-left w-12">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-[#DDD5C8]"
                    />
                  </th>
                  <th className="p-4 text-left text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Name</th>
                  <th className="p-4 text-left text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Contact</th>
                  <th className="p-4 text-left text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Message</th>
                  <th className="p-4 text-center text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Status</th>
                  <th className="p-4 text-center text-[10px] font-bold text-[#32171B] uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((msg) => (
                  <tr key={msg.id} className="border-b border-[#F0EBE3] bg-white last:border-0">
                    <td className="p-4 align-top">
                      <input 
                        type="checkbox" 
                        checked={selectedIds.includes(msg.id)}
                        onChange={() => toggleSelect(msg.id)}
                        className="w-4 h-4 rounded border-[#DDD5C8]"
                      />
                    </td>
                    <td className="p-4 align-top">
                      <div className="font-bold text-[#1A1410] text-sm mb-0.5">{msg.firstName} {msg.lastName}</div>
                      <div className="text-[10px] text-[#9A8C82]">First Name: <span className="text-[#5C4E45]">{msg.firstName}</span></div>
                      <div className="text-[10px] text-[#9A8C82]">Last Name: <span className="text-[#5C4E45]">{msg.lastName}</span></div>
                    </td>
                    <td className="p-4 align-top">
                      <div className="text-[#5C4E45] text-xs mb-1">{msg.email}</div>
                      <div className="text-[#5C4E45] text-xs">{msg.phone}</div>
                      <div className="text-[10px] text-[#9A8C82] mt-1">ID: <span className="text-[#5C4E45] font-mono">{msg.id}</span></div>
                    </td>
                    <td className="p-4 align-top max-w-xs">
                      <p className="text-[#5C4E45] text-xs leading-relaxed line-clamp-3">
                        {msg.body}
                      </p>
                    </td>
                    <td className="p-4 align-top text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        msg.status === 'unread' 
                          ? 'bg-[#F5E9C8] text-[#A87E28]' 
                          : 'bg-[#E8F5EE] text-[#2D6A4F]'
                      }`}>
                        {msg.status}
                      </span>
                    </td>
                    <td className="p-4 align-top">
                      <div className="flex justify-center gap-1.5">
                        <button className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors">
                          <Icons.eye className="w-3.5 h-3.5" />
                        </button>
                        <button className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors">
                          <Icons.reply className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => updateItem(msg.id, { ...msg, status: msg.status === 'unread' ? 'read' : 'unread' })}
                          className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <Icons.check className="w-3.5 h-3.5" />
                        </button>
                        <button 
                          onClick={() => deleteItem(msg.id)}
                          className="p-1.5 border border-[#DDD5C8] rounded text-[#5C4E45] hover:bg-[#FAF7F2] transition-colors"
                        >
                          <Icons.close className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style jsx>{`
        .messages-page {
          max-width: 1200px;
          margin: 0 auto;
        }
        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%235C4E45'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 0.75rem center;
          background-size: 1rem;
          padding-right: 2.5rem;
        }
      `}</style>
    </DashboardLayout>
  );
}
