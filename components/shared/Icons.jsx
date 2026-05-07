import React from 'react';

export const Icons = {
  dashboard: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.55"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.55"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.3"/>
    </svg>
  ),
  projects: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2" y="2" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="6" y="15" width="8" height="2.5" rx="1" fill="currentColor" opacity="0.5"/>
    </svg>
  ),
  team: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M3 18c0-3.866 3.134-6 7-6s7 2.134 7 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  appointments: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 5V4a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  messages: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M3 3h14a1 1 0 011 1v9a1 1 0 01-1 1H6l-4 3V4a1 1 0 011-1z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  blog: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 4h12v2H4zM4 9h12v2H4zM4 14h7v2H4z" fill="currentColor" opacity="0.75"/>
    </svg>
  ),
  media: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="2" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="2" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="2" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="11" y="11" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  vacancies: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <rect x="3" y="5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M6 5V4a2 2 0 012-2h4a2 2 0 012 2v1" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  applications: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M4 4h12v2H4zM4 9h10v2H4zM4 14h7v2H4z" fill="currentColor" opacity="0.75"/>
    </svg>
  ),
  analytics: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <path d="M10 3v3M10 14v3M3 10h3M14 10h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  settings: (props) => (
    <svg viewBox="0 0 20 20" fill="none" {...props}>
      <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="10" cy="10" r="2.5" fill="currentColor" opacity="0.7"/>
    </svg>
  ),
  notification: (props) => (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" {...props}>
      <path d="M8 2C5.79 2 4 3.79 4 6v3L2 11v1h12v-1l-2-2V6c0-2.21-1.79-4-4-4z" stroke="currentColor" strokeWidth="1.3"/>
      <path d="M6 12a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3"/>
    </svg>
  ),
  search: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  close: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  grid: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
      <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  list: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  document: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  link: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  info: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M12 8h.01M11 12h1v4h1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  eye: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ),
  reply: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M9 10l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M20 4v7a4 4 0 01-4 4H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  check: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  trash: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  pencil: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  plus: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  download: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M12 15V3m0 12l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  chevronDown: (props) => (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};
