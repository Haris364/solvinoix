/** Delivery process, used by the /process page and the home page strip. */

export const processSteps = [
  {
    id: 'discover',
    number: '01',
    title: 'Discover',
    summary: 'Understand the business.',
    description:
      'We start by understanding the business itself: how work is done today, which steps are manual, and what a better outcome would actually look like for the people involved.',
  },
  {
    id: 'analyze',
    number: '02',
    title: 'Analyze',
    summary: 'Identify the real problem.',
    description:
      'We separate the visible symptom from the underlying cause. A slow process is often a missing integration or an unclear rule, not a staffing problem.',
  },
  {
    id: 'design',
    number: '03',
    title: 'Design',
    summary: 'Create the solution architecture.',
    description:
      'We design the system shape, the data model and the interfaces before writing code, so the decisions are deliberate and reviewable.',
  },
  {
    id: 'build',
    number: '04',
    title: 'Build',
    summary: 'Develop the product.',
    description:
      'We build in short, visible increments with working software early, so direction can be corrected while it is still cheap to change.',
  },
  {
    id: 'integrate',
    number: '05',
    title: 'Integrate',
    summary: 'Connect APIs, databases, AI and business systems.',
    description:
      'We connect the system to what already exists, handling authentication, failure states and data consistency rather than assuming clean inputs.',
  },
  {
    id: 'launch',
    number: '06',
    title: 'Launch',
    summary: 'Deploy the solution.',
    description:
      'We deploy with the environments, monitoring and documentation needed to operate the system properly, not just to run it once.',
  },
  {
    id: 'improve',
    number: '07',
    title: 'Improve',
    summary: 'Measure and continuously improve.',
    description:
      'We measure against the original problem, then keep refining. A system that is never measured quietly drifts back to where it started.',
  },
]

/** Long-term company trajectory, used on the About page. */

export const growthStages = [
  {
    id: 'founder',
    label: 'Solo Founder',
    description:
      'Solvionix begins with one person taking on real problems end to end, from first conversation to shipped system.',
  },
  {
    id: 'first-clients',
    label: 'First Clients',
    description:
      'Early engagements establish the working method, the process and the standard of delivery that everything after is built on.',
  },
  {
    id: 'repeat-business',
    label: 'Repeat Business',
    description:
      'Systems are measured, improved and extended. The goal is not one delivery, but a relationship that keeps producing value.',
  },
  {
    id: 'small-team',
    label: 'Small Team',
    description:
      'Specialists are added where demand proves the need, giving clients a broader bench without losing the direct, accountable contact.',
  },
  {
    id: 'software-house',
    label: 'Software House',
    description:
      'A dependable technology company with a repeatable delivery process, a clear specialisation and long-term client relationships.',
  },
]

export const missionVision = [
  {
    id: 'mission',
    label: 'Mission',
    title: 'Solve the problem in front of us',
    description:
      'Solvionix exists to use technology and innovation to solve practical business problems. We measure our work by whether the problem is genuinely resolved, not by how much was shipped.',
  },
  {
    id: 'vision',
    label: 'Vision',
    title: 'A trusted technology partner, not a vendor',
    description:
      'To become the team a business turns to when technology needs to work properly — known for judgement, consistency and solutions that hold up after handover.',
  },
  {
    id: 'philosophy',
    label: 'Philosophy',
    title: 'The problem decides the technology',
    description:
      'We start from the business process and work backwards. A stack is a means, never the starting point. Solve first, then innovate, then evolve.',
  },
]

export default processSteps
