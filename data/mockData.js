export const projectsData = [
  {
    id: 'p1',
    title: 'Lekki Courtyard Residence',
    subtitle: 'Modern private residence with courtyard living and natural ventilation.',
    description: 'Residential architecture focused on light, privacy, and calm interiors.',
    location: 'Lekki, Lagos, Nigeria',
    status: 'Completed',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    date: '2025-10-15',
    galleryCount: 8,
    city: 'Lekki',
    state: 'Lagos',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features', body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' }
    ]
  },
  {
    id: 'p2',
    title: 'Victoria Island Office Fit-Out',
    subtitle: 'Corporate office redesign with flexible workspaces and executive suites.',
    description: 'Commercial interior project for a growing professional services firm.',
    location: 'Victoria Island, Lagos, Nigeria',
    status: 'Ongoing',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1541888086925-ebb96f5b7298?w=800&q=80',
    date: '2025-11-20',
    galleryCount: 12,
    city: 'Victoria Island',
    state: 'Lagos',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features', body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' }
    ]
  },
  {
    id: 'p3',
    title: 'Abuja Mixed-Use Concept',
    subtitle: 'Concept development for retail, office, and residential uses.',
    description: 'Mixed-use proposal awaiting client approval and revised project scope.',
    location: 'Maitama, Abuja, Nigeria',
    status: 'On Hold',
    category: 'Commercial',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
    date: '2025-09-05',
    galleryCount: 5,
    city: 'Maitama',
    state: 'Abuja',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features', body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' }
    ]
  },
  {
    id: 'p4',
    title: 'Ikoyi Apartment Renovation',
    subtitle: 'High-end apartment renovation with custom joinery and refined finishes.',
    description: 'Interior renovation combining warm material palettes with modern planning.',
    location: 'Ikoyi, Lagos, Nigeria',
    status: 'Completed',
    category: 'Residential',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    date: '2025-08-12',
    galleryCount: 16,
    city: 'Ikoyi',
    state: 'Lagos',
    country: 'Nigeria',
    additionalFields: [
      { id: 'desc-1', title: 'Design Approach', body: 'Describe the architectural thinking, materials, and planning considerations.' },
      { id: 'desc-2', title: 'Key Features', body: 'Add custom project highlights such as floor planning, lighting, landscape, or finishes.' }
    ]
  }
];

export const projectCategories = [
  { id: 'cat1', name: 'Commercial', slug: 'commercial', status: 'Active', description: 'Office buildings, retail spaces, and corporate campuses.', projectCount: 45 },
  { id: 'cat2', name: 'Residential', slug: 'residential', status: 'Active', description: 'Private homes, apartments, and housing developments.', projectCount: 32 },
  { id: 'cat3', name: 'Civic', slug: 'civic', status: 'Active', description: 'Museums, libraries, and government buildings.', projectCount: 12 },
  { id: 'cat4', name: 'Hospitality', slug: 'hospitality', status: 'Active', description: 'Hotels, resorts, and restaurants.', projectCount: 18 },
  { id: 'cat5', name: 'Masterplanning', slug: 'masterplanning', status: 'Active', description: 'Urban design and large-scale community planning.', projectCount: 8 }
];

export const teamData = [
  {
    id: 't1',
    name: 'Adaora Okeke',
    title: 'Arch.',
    role: 'Principal Architect',
    qualifications: 'M.Arch, ARCON',
    bio: 'Leads concept development, design strategy, and client engagement across residential and commercial projects.',
    email: 'adaora.o@pieach.com',
    phone: '+234 801 234 5678',
    image: '',
    status: 'active',
    displayOrder: 1
  },
  {
    id: 't2',
    name: 'Tunde Nwosu',
    title: 'Mr.',
    role: 'Senior Architect',
    qualifications: 'B.Sc Architecture',
    bio: 'Supports technical drawings, project coordination, site reviews, and documentation for active client projects.',
    email: 'tunde.n@pieach.com',
    phone: '+234 802 345 6789',
    image: '',
    status: 'active',
    displayOrder: 1
  },
  {
    id: 't3',
    name: 'Chidinma Eze',
    title: 'Mrs.',
    role: 'Interior Designer',
    qualifications: 'BA Interior Design',
    bio: 'Develops interior concepts, material palettes, furniture layouts, and finishes for residential and office spaces.',
    email: 'chidinma.e@pieach.com',
    phone: '+234 803 456 7890',
    image: '',
    status: 'active',
    displayOrder: 1
  },
  {
    id: 't4',
    name: 'Kelechi Amadi',
    title: 'Mr.',
    role: 'Project Architect',
    qualifications: 'B.Arch, NIA',
    bio: 'Coordinates project timelines, contractors, site activities, and ensures design compliance with regulations.',
    email: 'kelechi.a@pieach.com',
    phone: '+234 804 567 8901',
    image: '',
    status: 'active',
    displayOrder: 1
  },
  {
    id: 't5',
    name: 'Sarah Johnson',
    title: 'Ms.',
    role: 'Admin Officer',
    qualifications: 'B.Sc Admin',
    bio: 'Manages office operations, procurement, and front-desk activities for the studio.',
    email: 'sarah.j@pieach.com',
    phone: '+234 805 678 9012',
    image: '',
    status: 'inactive',
    displayOrder: 5
  }
];


export const jobApplicationsData = [
  {
    id: 'app1',
    jobId: 'v2',
    applicantName: 'Michael Chen',
    roleApplied: 'Junior Architect',
    date: '2026-05-04',
    status: 'new',
    email: 'm.chen.arch@email.com',
    phone: '+1 555-0198',
    experience: '2 years',
    portfolioUrl: 'https://portfolio.mchen.design',
    coverLetter: 'I have followed Pieach CMS work for years and am deeply inspired by your sustainable approach to urban residential projects.',
    cvFileName: 'M_Chen_Resume_2026.pdf'
  },
  {
    id: 'app2',
    jobId: 'v4',
    applicantName: 'Sarah Jenkins',
    roleApplied: 'Interior Designer',
    date: '2026-05-02',
    status: 'shortlisted',
    email: 'sarah.j.designs@email.com',
    phone: '+44 7700 900123',
    experience: '5 years',
    portfolioUrl: 'https://sarahj.artstation.com',
    coverLetter: 'My background in biophilic design aligns perfectly with your upcoming Lumina Residences project.',
    cvFileName: 'S_Jenkins_CV.pdf'
  },
  {
    id: 'app3',
    jobId: 'v1',
    applicantName: 'Robert Adebayo',
    roleApplied: 'Senior Project Manager',
    date: '2026-04-28',
    status: 'rejected',
    email: 'robert.adebayo@email.com',
    phone: '+234 805 678 9012',
    experience: '12 years',
    portfolioUrl: null,
    coverLetter: 'Enclosed is my application for the Senior Project Manager position. I have overseen $500M+ in commercial developments.',
    cvFileName: 'RAdebayo_Resume.pdf'
  },
  {
    id: 'app4',
    jobId: 'v2', // Another one for Junior Architect or 3D Visualizer?
    applicantName: 'Elena Rostova',
    roleApplied: '3D Visualizer',
    date: '2026-04-25',
    status: 'interview',
    email: 'elena.rostova.3d@email.com',
    phone: '+1 555-0456',
    experience: '4 years',
    portfolioUrl: 'https://behance.net/elenarostova',
    coverLetter: 'I specialize in photorealistic architectural renderings using Unreal Engine 5 and V-Ray.',
    cvFileName: 'E_Rostova_Visuals.pdf'
  }
];

export const messagesData = [
  {
    id: 'msg1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@email.com',
    phone: '+234 800 000 0000',
    subject: 'Inquiry regarding Commercial Tower project',
    date: '2026-05-05T14:30:00Z',
    status: 'unread',
    body: 'I need consultation for a residential project and would like to understand your process.',
  },
  {
    id: 'msg2',
    firstName: 'Ada',
    lastName: 'Obi',
    email: 'ada@email.com',
    phone: '+234 900 000 0000',
    subject: 'Permit updates for Oasis Cultural Center',
    date: '2026-05-04T09:15:00Z',
    status: 'read',
    body: 'Interested in interior design services for a short-let apartment in Lagos.',
  },
  {
    id: 'msg3',
    firstName: 'Linda',
    lastName: 'Nwosu',
    email: 'linda@email.com',
    phone: '+234 801 234 5678',
    subject: 'Feature: Echo Valley Estate',
    date: '2026-05-01T11:45:00Z',
    status: 'unread',
    body: 'Please share your availability for a commercial office redesign consultation.',
  }
];

export const vacanciesData = [
  {
    id: 'v1',
    title: 'Senior Project Manager',
    department: 'Management',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    status: 'published',
    applicantsCount: 14,
    datePosted: '2026-04-15',
    deadline: '2026-06-30',
    description: 'We are looking for an experienced Project Manager to oversee our high-end residential projects.',
    skills: [
      { title: 'Project Management', description: 'Lead complex architectural projects from concept to completion.' },
      { title: 'Stakeholder Communication', description: 'Liaise with clients, contractors, and regulatory bodies.' }
    ]
  },
  {
    id: 'v2',
    title: 'Junior Architect',
    department: 'Design',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    status: 'published',
    applicantsCount: 42,
    datePosted: '2026-04-20',
    deadline: '2026-07-15',
    description: 'Join our design team as a Junior Architect to work on innovative concepts.',
    skills: [
      { title: 'Revit & BIM', description: 'Strong proficiency in Revit for architectural documentation.' },
      { title: 'Concept Design', description: 'Ability to translate ideas into compelling visual concepts.' }
    ]
  },
  {
    id: 'v3',
    title: '3D Visualizer',
    department: 'Visualization',
    location: 'Remote',
    type: 'Contract',
    status: 'draft',
    applicantsCount: 0,
    datePosted: '2026-05-01',
    deadline: '2026-08-01',
    description: 'Create stunning 3D visualizations and walk-throughs for our architectural projects.',
    skills: [
      { title: '3ds Max / V-Ray', description: 'Expertise in high-end architectural rendering.' },
      { title: 'Unreal Engine 5', description: 'Experience with real-time architectural visualization.' }
    ]
  },
  {
    id: 'v4',
    title: 'Interior Designer',
    department: 'Design',
    location: 'Lagos, Nigeria',
    type: 'Full-time',
    status: 'published',
    applicantsCount: 8,
    datePosted: '2026-05-02',
    deadline: '2026-08-15',
    description: 'We are seeking a creative Interior Designer to lead high-end residential interiors.',
    skills: [
      { title: 'Interior Styling', description: 'Curating materials, finishes, and furniture.' },
      { title: 'AutoCAD', description: 'Precision technical drafting for interior layouts.' }
    ]
  }
];

export const blogData = [
  {
    id: 'b1',
    title: 'Designing Homes That Breathe',
    excerpt: 'A short guide to natural ventilation, daylighting, and spatial comfort i...',
    category: 'Architecture',
    author: 'Admin',
    date: '2026-05-05',
    status: 'published',
    reads: 1240,
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80',
    content: 'Full content of the blog post goes here...',
    tags: ['Architecture', 'Sustainability', 'Design'],
    seoTitle: 'Designing Homes That Breathe | Pieach CMS',
    metaDescription: 'A guide to natural ventilation and spatial comfort in modern residential design.',
    slug: 'designing-homes-that-breathe'
  },
  {
    id: 'b2',
    title: 'Choosing Materials for Warm Minimalist Interiors',
    excerpt: 'Practical notes on texture, lighting, and finishes for refined interior sp...',
    category: 'Interior Design',
    author: 'Admin',
    date: '2026-05-02',
    status: 'draft',
    reads: 890,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80',
    content: 'Full content of the blog post goes here...',
    tags: ['Interior Design', 'Minimalism', 'Materials'],
    seoTitle: 'Warm Minimalist Interior Materials | Pieach CMS',
    metaDescription: 'Practical notes on texture, lighting, and finishes for refined interior spaces.',
    slug: 'warm-minimalist-interiors'
  },
  {
    id: 'b3',
    title: 'Behind the Design: Lekki Courtyard Residence',
    excerpt: 'A project insight article on planning, privacy, and courtyard living.',
    category: 'Project Insights',
    author: 'Admin',
    date: '2026-05-10',
    status: 'scheduled',
    reads: 0,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80',
    content: 'Full content of the blog post goes here...',
    tags: ['Project Insights', 'Courtyard Residence', 'Lekki'],
    seoTitle: 'Behind the Design: Lekki Courtyard | Pieach CMS',
    metaDescription: 'An inside look at the planning and design of the Lekki Courtyard Residence.',
    slug: 'lekki-courtyard-residence'
  }
];

export const blogCategoriesData = [
  { id: 'bc1', name: 'Architecture Trends', slug: 'architecture-trends', status: 'Active', description: 'Latest movements and concepts shaping modern architecture.', postCount: 12 },
  { id: 'bc2', name: 'Interior Design', slug: 'interior-design', status: 'Active', description: 'Insights into creating beautiful, functional interior spaces.', postCount: 8 },
  { id: 'bc3', name: 'Industry News', slug: 'industry-news', status: 'Active', description: 'Updates from the world of construction and design.', postCount: 5 },
  { id: 'bc4', name: 'Sustainable Building', slug: 'sustainable-building', status: 'Active', description: 'Eco-friendly materials, practices, and certifications.', postCount: 15 }
];

export const mediaData = [
  {
    id: 'm1',
    filename: 'lekki-courtyard-hero.jpg',
    type: 'image/jpeg',
    size: '1.8 MB',
    dateAdded: '2026-05-05',
    url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    usage: 'Project',
    dimensions: '1920×1080'
  },
  {
    id: 'm2',
    filename: 'team-adaora-okeke.png',
    type: 'image/png',
    size: '820 KB',
    dateAdded: '2026-05-03',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    usage: 'Team',
    dimensions: '900×900'
  },
  {
    id: 'm3',
    filename: 'oasis-center-blueprints.pdf',
    type: 'application/pdf',
    size: '12.5 MB',
    dateAdded: '2026-04-28',
    url: '',
    usage: 'Project',
    dimensions: '---'
  }
];

export const calendarData = [
  {
    id: 'c1',
    title: 'Initial Concept Review - Vertex',
    type: 'Client Meeting',
    date: '2026-05-06',
    time: '10:00 AM',
    participants: 'Eleanor Vance, Jonathan Davis'
  },
  {
    id: 'c2',
    title: 'Site Visit - Lumina Residences',
    type: 'Site Visit',
    date: '2026-05-06',
    time: '02:00 PM',
    participants: 'David Okafor, Marcus Thorne'
  },
  {
    id: 'c3',
    title: 'Zoning Board Hearing',
    type: 'Regulatory',
    date: '2026-05-08',
    time: '09:00 AM',
    participants: 'Eleanor Vance'
  }
];

export const MOCK_APPOINTMENTS = [
  {
    id: 'a1',
    client: 'Jonathan Davis',
    email: 'jdavis@vertexcorp.com',
    date: '2026-05-06',
    time: '10:00 AM',
    type: 'Consultation',
    status: 'Confirmed',
    notes: 'Initial discussion for a new commercial tower project in downtown.'
  },
  {
    id: 'a2',
    client: 'Amanda Lewis',
    email: 'alewis@cityplanning.gov',
    date: '2026-05-06',
    time: '02:00 PM',
    type: 'Review',
    status: 'Pending',
    notes: 'Review of zoning permits for Oasis Cultural Center.'
  },
  {
    id: 'a3',
    client: 'Rachel Green',
    email: 'rgreen@example.com',
    date: '2026-05-08',
    time: '11:30 AM',
    type: 'Consultation',
    status: 'Cancelled',
    notes: 'Client requested to reschedule for next week.'
  },
  {
    id: 'a4',
    client: 'Tom Hanks',
    email: 'thanks@example.com',
    date: '2026-05-09',
    time: '03:00 PM',
    type: 'Site Visit',
    status: 'Confirmed',
    notes: 'Site visit for the new residential complex.'
  }
];

