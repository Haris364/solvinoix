/**
 * SERVICES DATA
 *
 * `icon` is a Lucide React component name, resolved by
 * components/ui/IconBox.jsx. `capabilities` shows the first three on the card;
 * the rest reveal when the visitor expands it.
 *
 * `page` links to a dedicated route when one exists, otherwise to an anchor on
 * /services. Set to null to keep a card link-free.
 */

export const services = [
  {
    id: 'ai-solutions',
    title: 'AI Solutions',
    icon: 'BrainCircuit',
    page: '/services/ai',
    summary:
      'Practical AI systems that handle real workloads — from customer conversations to internal document work.',
    capabilities: [
      'AI chatbots and assistants',
      'Retrieval-augmented knowledge bases',
      'AI agents that complete defined tasks',
      'AI API integration into existing tools',
    ],
  },
  {
    id: 'business-automation',
    title: 'Business Automation',
    icon: 'Workflow',
    page: '/services/automation',
    summary:
      'Connect the manual steps between your tools so information moves without re-typing.',
    capabilities: [
      'Lead capture and routing automation',
      'CRM and database synchronisation',
      'Email and follow-up sequences',
      'Appointment and scheduling flows',
    ],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    icon: 'Monitor',
    page: null,
    summary:
      'Fast, accessible websites and web applications built to be maintained, not just launched.',
    capabilities: [
      'Marketing sites and landing pages',
      'Web applications and dashboards',
      'Responsive, accessible front ends',
      'Performance and SEO foundations',
    ],
  },
  {
    id: 'custom-software',
    title: 'Custom Software',
    icon: 'Braces',
    page: null,
    summary:
      'Software shaped around how your organisation actually works, rather than forcing it into a generic tool.',
    capabilities: [
      'Internal tools and operations platforms',
      'Process and case management systems',
      'Reporting and back-office software',
      'Legacy system modernisation',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    icon: 'BarChart3',
    page: null,
    summary:
      'Turn scattered business data into a single view you can actually make decisions from.',
    capabilities: [
      'Data pipelines and consolidation',
      'Dashboards and reporting',
      'KPI and performance tracking',
      'Data quality and validation',
    ],
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning',
    icon: 'ChartNoAxesCombined',
    page: null,
    summary:
      'Models that predict, classify and recommend — built and evaluated against measurable outcomes.',
    capabilities: [
      'Forecasting and demand prediction',
      'Classification and scoring models',
      'Recommendation logic',
      'Model evaluation and monitoring',
    ],
  },
  {
    id: 'mobile-apps',
    title: 'Mobile App Development',
    icon: 'Smartphone',
    page: null,
    summary:
      'Mobile products your customers and team can rely on day to day.',
    capabilities: [
      'iOS and Android applications',
      'Cross-platform development',
      'App Store release and maintenance',
      'Offline support and notifications',
    ],
  },
  {
    id: 'api-integration',
    title: 'API & System Integration',
    icon: 'Share2',
    page: null,
    summary:
      'Make separate systems behave as one, with authentication, error handling and documentation.',
    capabilities: [
      'REST and third-party API integration',
      'Authentication and webhooks',
      'Payment and billing integration',
      'Documented, maintainable interfaces',
    ],
  },
  {
    id: 'digital-growth',
    title: 'Digital Marketing & Growth',
    icon: 'TrendingUp',
    page: null,
    summary:
      'Technical growth work that improves how prospects find, evaluate and convert.',
    capabilities: [
      'Technical SEO and site performance',
      'Analytics and conversion tracking',
      'Landing pages and experimentation',
      'Marketing automation',
    ],
  },
]

export const aiCapabilities = [
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description:
      'Conversational assistants that answer real questions from your own content, available on your site or inside your tools.',
  },
  {
    id: 'ai-customer-support',
    title: 'AI Customer Support',
    description:
      'First-line support that handles common enquiries and routes the complex cases to your team with context attached.',
  },
  {
    id: 'ai-receptionists',
    title: 'AI Receptionists',
    description:
      'Answer calls, qualify enquiries and book appointments outside working hours, then hand over cleanly.',
  },
  {
    id: 'ai-document-assistants',
    title: 'AI Document Assistants',
    description:
      'Extract, summarise and cross-reference the contracts, forms and reports your business deals with daily.',
  },
  {
    id: 'knowledge-bases',
    title: 'Knowledge Bases',
    description:
      'Structured internal or customer-facing knowledge, built so answers stay accurate as the business changes.',
  },
  {
    id: 'rag-systems',
    title: 'RAG Systems',
    description:
      'Retrieval-augmented generation that grounds every answer in your own documents rather than guesswork.',
  },
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description:
      'Task-scoped agents that read context, call your systems and complete defined steps without supervision.',
  },
  {
    id: 'ai-api-integration',
    title: 'AI API Integration',
    description:
      'Model APIs embedded into existing products and workflows, with usage limits and fallbacks handled.',
  },
]

export const aiFlow = [
  { id: 'user', label: 'User Message', caption: 'Asked in natural language' },
  { id: 'ai', label: 'AI Reasoning', caption: 'Grounded in your data' },
  { id: 'system', label: 'Business System', caption: 'CRM, database, tools' },
  { id: 'action', label: 'Automated Action', caption: 'Completed without handoff' },
]

export const automationSystems = [
  { id: 'website', label: 'Website' },
  { id: 'leads', label: 'Leads' },
  { id: 'crm', label: 'CRM' },
  { id: 'email', label: 'Email' },
  { id: 'ai', label: 'AI' },
  { id: 'database', label: 'Database' },
  { id: 'appointments', label: 'Appointments' },
  { id: 'analytics', label: 'Analytics' },
]

export const automationFlow = [
  { id: 'visitor', label: 'Visitor', caption: 'Arrives on a page' },
  { id: 'website', label: 'Website', caption: 'Captures the enquiry' },
  { id: 'assistant', label: 'AI Assistant', caption: 'Answers and qualifies' },
  { id: 'qualification', label: 'Lead Qualification', caption: 'Scores against criteria' },
  { id: 'crm', label: 'CRM', caption: 'Record created automatically' },
  { id: 'followup', label: 'Automated Follow-up', caption: 'Sequence starts instantly' },
  { id: 'appointment', label: 'Appointment', caption: 'Booked without chasing' },
]

export default services
