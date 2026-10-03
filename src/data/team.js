/**
 * TEAM — edit this file to add, remove or re-role team members.
 *
 * To change a role, edit the `role` field. The card, the profile page and the
 * chatbot all read from here, so nothing else needs changing.
 *
 * To add someone, copy an object, change `id`, `name`, `role` and `initials`.
 *
 * Fields
 *   id              unique key, used in the URL /team/<id>
 *   name            full name
 *   role            job title
 *   initials        shown on the generated portrait when there is no photo
 *   image           optional photo path; falls back to a generated monogram
 *   summary         1–2 lines, shown on the card
 *   about           full text, shown on the profile page
 *   skills          main skills
 *   responsibilities what this person is responsible for on a project
 *   experience     optional work history. The section only renders when this
 *                  has entries, so nothing is invented. Format:
 *                  { title: 'Role', period: '2023 – now', detail: 'One line.' }
 *   linkedin        profile URL or null
 *   github          profile URL or null
 *
 * Do not add a member who has not agreed to be listed, and do not fill in a
 * field with a guess. An empty field simply does not render.
 */

export const teamMembers = [
  {
    id: 'haris-naseer',
    name: 'Haris Naseer',
    role: 'Full Stack Developer',
    initials: 'HN',
    image: null,
    summary: 'Builds web apps, APIs and the systems that connect them.',
    about:
      'Haris works across the whole build: the front end your team sees, the API behind it and the database underneath. He starts by understanding how a business actually works today, then builds the simplest thing that genuinely improves it.',
    skills: ['React', 'Python', 'Django', 'REST APIs', 'PostgreSQL', 'MySQL'],
    responsibilities: [
      'Front-end build and the parts of the product a customer actually sees',
      'APIs and the data model behind them',
      'Integrations between the systems a client already uses',
      'Testing, deployment and handover documentation',
    ],
    experience: [],
    linkedin: null,
    github: null,
  },
]

/** Used by /team/:id. Returns null for an unknown id, so the page can 404. */
export function getTeamMember(id) {
  return teamMembers.find((member) => member.id === id) ?? null
}

export default teamMembers
