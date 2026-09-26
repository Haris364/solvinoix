/**
 * Single source of truth for company-level configuration.
 *
 * Anything Solvionix has not confirmed yet is stored as `null` together with
 * `configured: false`. The UI renders those as honest "details to be confirmed"
 * states instead of showing invented information.
 */

export const site = {
  name: 'Solvionix',
  wordmark: 'SOLVIONIX',
  concept: 'Solve + Innovation',
  positioning: 'AI, Software & Business Solutions',
  tagline: 'Turning Business Problems Into Technology Solutions.',
  brandPhrase: 'Solve. Innovate. Evolve.',
  disciplineLine: 'AI • Software • Data • Automation • Digital Growth',
  description:
    'Solvionix helps businesses identify problems, design practical technology solutions, and build the systems needed to solve them.',
  shortDescription:
    'Solvionix is a technology company focused on AI, software development, business automation, data and analytics, machine learning, mobile applications, API and system integration, and digital growth.',
}

/**
 * Where the contact form should POST.
 * Leave as null while no endpoint exists: the form then runs in demo mode and
 * says so honestly. Paste a Formspree / API endpoint here to go live.
 * e.g. 'https://formspree.io/f/xxxxxxxx'
 */
export const FORM_ENDPOINT = null

export const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Team', to: '/team' },
  { label: 'Projects', to: '/projects' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

export const footerColumns = [
  {
    title: 'Services',
    links: [
      { label: 'All Services', to: '/services' },
      { label: 'AI Solutions', to: '/services/ai' },
      { label: 'Business Automation', to: '/services/automation' },
      { label: 'Web Development', to: '/services#web-development' },
      { label: 'Data & Analytics', to: '/services#data-analytics' },
      { label: 'API & System Integration', to: '/services#api-integration' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Solvionix', to: '/about' },
      { label: 'Our Team', to: '/team' },
      { label: 'Projects', to: '/projects' },
      { label: 'Process', to: '/process' },
      { label: 'Contact', to: '/contact' },
    ],
  },
]

/**
 * Contact channels. `value` / `href` stay null until real details exist.
 */
export const contactChannels = [
  {
    id: 'email',
    label: 'Email',
    value: null,
    href: null,
    icon: 'Mail',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: null,
    href: null,
    icon: 'Linkedin',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: null,
    href: null,
    icon: 'MessageCircle',
  },
]

export const socialLinks = [
  { id: 'linkedin', label: 'LinkedIn', href: null, icon: 'Linkedin' },
  { id: 'github', label: 'GitHub', href: null, icon: 'Github' },
  { id: 'x', label: 'X', href: null, icon: 'Twitter' },
]

export const projectTypes = [
  'AI Solution',
  'Web Development',
  'Mobile App',
  'Automation',
  'Data & Analytics',
  'Custom Software',
  'API Integration',
  'Digital Growth',
  'Other',
]

export const budgetRanges = [
  'Not sure yet',
  'Under $2,000',
  '$2,000 - $5,000',
  '$5,000 - $15,000',
  '$15,000 - $50,000',
  '$50,000+',
  'Ongoing / Retainer',
]

export const principles = [
  {
    id: 'understand',
    title: 'Understand',
    description:
      'Understand the business process and identify where time, money, leads or efficiency are being lost.',
  },
  {
    id: 'build',
    title: 'Build',
    description:
      'Design and build a practical technology solution around the actual business problem.',
  },
  {
    id: 'improve',
    title: 'Improve',
    description:
      'Measure results, automate processes and continuously improve the system.',
  },
]

export const markets = [
  { id: 'usa', name: 'USA', flagNote: 'Initial Target Market' },
  { id: 'uk', name: 'United Kingdom', flagNote: 'Initial Target Market' },
  { id: 'au', name: 'Australia', flagNote: 'Initial Target Market' },
  { id: 'ca', name: 'Canada', flagNote: 'Initial Target Market' },
]

export const capabilities = [
  'AI',
  'Software Development',
  'Business Automation',
  'Data & Analytics',
  'Machine Learning',
  'Mobile Applications',
  'API & System Integration',
  'Digital Growth',
]

/** Case shared by every page so routes stay in sync. */
export const APP_NAME = 'Solvionix'
export const APP_DESCRIPTION = site.tagline
export const COMPANY_URL = 'https://solvionix.com'
