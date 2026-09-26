/**
 * PROJECTS DATA
 *
 * Every entry is an internal demonstration. `badge` states this explicitly and
 * is rendered on the card, so nothing on this page can be mistaken for client
 * work. `liveUrl` and `caseStudyUrl` are null while nothing is published — the
 * card hides those buttons entirely rather than linking to a dead page.
 *
 * No client names, results or metrics are recorded here, because none have
 * been provided. When real client work is approved for publication, add a
 * `disclosure: 'Client Work'` entry and the badge will change with it.
 */

const DEMO = 'Demo Project'
const PROTOTYPE = 'Internal Prototype'

export const projects = [
  {
    id: 'lead-qualification-engine',
    title: 'Lead Qualification Engine',
    category: 'AI & Automation',
    badge: PROTOTYPE,
    problem:
      'Inbound enquiries arrive in a shared inbox with no consistent way of separating genuine opportunities from general questions.',
    solution:
      'A scoring pipeline that reads each enquiry, extracts the practical details, applies agreed qualification criteria and writes a structured record into the CRM with a recommended next action.',
    technology: ['React', 'Python', 'Django', 'PostgreSQL', 'LLM API'],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 'document-knowledge-assistant',
    title: 'Document Knowledge Assistant',
    category: 'AI Solutions',
    badge: PROTOTYPE,
    problem:
      'Reference material is spread across internal documents, so answers to common questions require someone to know exactly where to look.',
    solution:
      'A retrieval-augmented assistant that searches the organisation own document set and returns answers with the source passage attached, so a person can verify before acting.',
    technology: ['React', 'Python', 'Vector Search', 'RAG', 'REST API'],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 'operations-dashboard',
    title: 'Operations Dashboard',
    category: 'Data & Analytics',
    badge: DEMO,
    problem:
      'Operational performance is spread across several spreadsheets that disagree with each other, making the real picture hard to establish.',
    solution:
      'A single reporting layer that consolidates the source systems, applies validation, and presents the agreed metrics with drill-down to the underlying records.',
    technology: ['React', 'Django', 'PostgreSQL', 'Charting'],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 'appointment-automation-flow',
    title: 'Appointment Automation Flow',
    category: 'Automation',
    badge: DEMO,
    problem:
      'Enquiries are followed up manually, so scheduling depends on individual availability and leads go cold between messages.',
    solution:
      'An automated sequence that captures the enquiry, confirms details, offers available slots and books the appointment, with every step recorded in the CRM.',
    technology: ['Python', 'REST APIs', 'Email Integration', 'Scheduling API'],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 'customer-support-assistant',
    title: 'Customer Support Assistant',
    category: 'AI Solutions',
    badge: DEMO,
    problem:
      'Repetitive support questions consume staff time that would be better spent on complex customer issues.',
    solution:
      'A support assistant trained on product and policy content that resolves routine enquiries and escalates anything ambiguous with the conversation history intact.',
    technology: ['React', 'Python', 'Flask', 'RAG', 'LLM API'],
    liveUrl: null,
    caseStudyUrl: null,
  },
  {
    id: 'mobile-field-service-app',
    title: 'Mobile Field Service App',
    category: 'Mobile',
    badge: PROTOTYPE,
    problem:
      'Field staff record work on paper and return to base before any of it reaches the system, so status is never accurate in real time.',
    solution:
      'A mobile application that captures job details, photos and signatures on site and synchronises with the back office the moment connectivity is available.',
    technology: ['React Native', 'REST API', 'Offline Sync'],
    liveUrl: null,
    caseStudyUrl: null,
  },
]

/** Shown on the home page. */
export const featuredProjectIds = [
  'lead-qualification-engine',
  'operations-dashboard',
  'mobile-field-service-app',
]

export const disclosureNote =
  'Everything shown here is a Solvionix demonstration or internal prototype built to show how we work. No client work, client name or client result is presented on this page.'

export default projects
