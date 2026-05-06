export const MAIN_NAV = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Projects',
    icon: 'projects',
    badge: 24,
    submenu: [
      { label: 'Project List', href: '/projects' },
      { label: 'Project Categories', href: '/project-categories' },
      { label: 'Add New Project', href: '/projects/new' },
    ],
  },
  {
    label: 'Our Team',
    icon: 'team',
    submenu: [
      { label: 'Team List', href: '/team' },
      { label: 'Add Team Member', href: '/team/new' },
    ],
  },
  {
    label: 'Appointments',
    icon: 'appointments',
    badge: 6,
    submenu: [
      { label: 'Appointment List', href: '/appointments' },
      { label: 'Calendar View', href: '/appointments/calendar' },
      { label: 'Manage Calendar', href: '/appointments/manage' },
      { label: 'Approval Requests', href: '/appointments/approvals' },
    ],
  },
  {
    label: 'Messages',
    icon: 'messages',
    badge: 12,
    submenu: [
      { label: 'Contact Form Entries', href: '/messages' },
      { label: 'Edit Contact Details', href: '/messages/settings' },
    ],
  },
  {
    label: 'Blog',
    icon: 'blog',
    submenu: [
      { label: 'Blog Posts', href: '/blog' },
      { label: 'Blog Categories', href: '/blog-categories' },
      { label: 'Add New Post', href: '/blog/new' },
    ],
  },
  {
    label: 'Media Library',
    href: '/media',
    icon: 'media',
  },
];

export const CAREERS_NAV = [
  {
    label: 'Vacancies',
    icon: 'vacancies',
    badge: 4,
    submenu: [
      { label: 'Vacancy List', href: '/vacancies' },
      { label: 'Add New Vacancy', href: '/vacancies/new' },
    ],
  },
  {
    label: 'Job Applications',
    href: '/job-applications',
    icon: 'applications',
    badge: 18,
  },
];

export const SYSTEM_NAV = [
  {
    label: 'Analytics',
    href: '/analytics',
    icon: 'analytics',
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: 'settings',
  },
];
