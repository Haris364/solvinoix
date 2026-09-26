/**
 * TEAM DATA — edit this file to add, remove or re-role team members.
 *
 * To change a role, edit the `role` field on the relevant object. Nothing else
 * needs to be touched: cards, grids and the profile modal all read from here.
 *
 * To add someone, copy an existing object, change `id`, `name`, `role` and
 * `initials`, and the site picks it up automatically.
 *
 * Fields
 *   id             unique key, also used for the modal's focus restore
 *   name           full name
 *   role           job title shown on the card and in the modal
 *   location       optional
 *   initials       used by the generated monogram portrait (2-3 letters)
 *   summary        short line shown on the card
 *   bio            full biography shown in the profile modal
 *   skills         short chips shown on the card
 *   technologies   wider stack list shown in the modal
 *   responsibilities what they own day to day
 *   linkedin       profile URL or null
 *   github         profile URL or null
 */

export const teamMembers = [
  {
    id: 'haris-naseer',
    name: 'Haris Naseer',
    role: 'Full Stack Developer',
    location: null,
    initials: 'HN',
    summary:
      'Building modern web applications, APIs and technology solutions focused on solving practical business problems.',
    bio: 'Haris builds modern web applications, APIs and the integrations that hold business systems together. His work starts from the operational problem rather than the stack: understanding the process first, then choosing the technology that actually resolves it. He works across the front end, the API layer and the database, and is comfortable taking a system from a rough requirement to something a business can depend on day to day.',
    skills: ['React', 'Python', 'Django', 'Flask', 'REST APIs', 'MySQL', 'PostgreSQL'],
    technologies: [
      'React',
      'JavaScript',
      'TypeScript',
      'Python',
      'Django',
      'Flask',
      'REST API Design',
      'PostgreSQL',
      'MySQL',
      'Git',
    ],
    responsibilities: [
      'Design and build web applications and dashboards',
      'Develop REST APIs and service integrations',
      'Model and maintain relational databases',
      'Integrate third-party services and AI endpoints',
      'Turn business process requirements into working systems',
    ],
    linkedin: null,
    github: null,
  },
]

export default teamMembers
