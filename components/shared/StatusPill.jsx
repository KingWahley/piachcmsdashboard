import React from 'react';

const statusConfig = {
  published: { className: 's-approved', label: 'Published' },
  draft: { className: 's-opened', label: 'Draft' },
  archived: { className: 's-rejected', label: 'Archived' },
  active: { className: 's-approved', label: 'Active' },
  new: { className: 's-new', label: 'New' },
  shortlisted: { className: 's-shortlisted', label: 'Shortlisted' },
  rejected: { className: 's-rejected', label: 'Rejected' },
  interview: { className: 's-pending', label: 'Interview' },
  read: { className: 's-opened', label: 'Read' },
  unread: { className: 's-new', label: 'Unread' },
  replied: { className: 's-approved', label: 'Replied' },
  scheduled: { className: 's-pending', label: 'Scheduled' },
};

export default function StatusPill({ status }) {
  const config = statusConfig[status?.toLowerCase()] || { className: 's-opened', label: status };
  return (
    <span className={`status-pill ${config.className}`}>
      {config.label}
    </span>
  );
}
