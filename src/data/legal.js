/**
 * LEGAL PAGE CONTENT
 *
 * This is a plain-language starting point, not legal advice. Solvionix should
 * have these reviewed and adapted (registered entity, jurisdiction, retention
 * periods, contact details) before publishing commercially.
 */

export const legalMeta = {
  privacy: {
    title: 'Privacy Policy',
    updated: 'Last updated: to be confirmed',
    intro:
      'This policy explains what information Solvionix collects through this website, why it is collected, and the choices available to you.',
  },
  terms: {
    title: 'Terms of Use',
    updated: 'Last updated: to be confirmed',
    intro:
      'These terms set out the conditions for using the Solvionix website and the information published on it.',
  },
}

export const privacySections = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    body: [
      'If you submit an enquiry, we collect the details you provide: your name, company, email address, phone number, the type of project you are interested in, an indicative budget range, and the message you write.',
      'Our hosting provider may also record standard technical information such as browser type, device type, and pages visited, in order to keep the site secure and working correctly.',
    ],
  },
  {
    id: 'how-we-use-it',
    title: 'How we use it',
    body: [
      'We use the information you provide to respond to your enquiry, understand what you are trying to achieve, and decide whether our services are a suitable fit. We do not sell your information and we do not share it for third-party marketing.',
    ],
  },
  {
    id: 'retention',
    title: 'How long we keep it',
    body: [
      'Enquiry records are kept only for as long as needed to respond and to maintain a record of our business correspondence, after which they are deleted. The exact retention period should be confirmed by Solvionix before publication.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies and analytics',
    body: [
      'This website does not use advertising cookies. If analytics are introduced in future, this section will be updated before they are enabled.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    body: [
      'You may ask what information we hold about you, request a correction or deletion of that information, or ask us to stop contacting you. Contact details for submitting such a request will be published on this site once confirmed.',
    ],
  },
  {
    id: 'security',
    title: 'Security',
    body: [
      'We take reasonable technical measures to protect information submitted through this site. No method of transmission or storage is completely secure, so we do not treat any channel as risk-free.',
    ],
  },
  {
    id: 'changes',
    title: 'Changes to this policy',
    body: [
      'We may update this policy as the site or our practices change. The most current version will always be the one published here.',
    ],
  },
]

export const termsSections = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    body: [
      'By using this website you agree to these terms. If you do not accept them, please stop using the site.',
    ],
  },
  {
    id: 'information-purpose',
    title: 'Purpose of the information on this site',
    body: [
      'Content is provided for general information about what Solvionix does. It explains our approach and capabilities; it is not a quotation, a contract, a guarantee of outcome, or professional advice.',
    ],
  },
  {
    id: 'demonstration-work',
    title: 'Demonstrations and internal projects',
    body: [
      'Work shown on this website as a demo project or internal prototype was built by Solvionix to demonstrate capability. It is not presented as client work, and no client relationship or client result is implied.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    body: [
      'The Solvionix name, branding and website content are the property of Solvionix unless stated otherwise. Third-party names and marks belong to their respective owners.',
    ],
  },
  {
    id: 'no-warranty',
    title: 'No warranty',
    body: [
      'The site is provided as is. We do not warrant that it will always be available, error-free, or that content will be current at every moment.',
    ],
  },
  {
    id: 'limitation',
    title: 'Limitation of liability',
    body: [
      'To the extent permitted by law, Solvionix is not liable for loss arising from reliance on general information published on this site. Any engagement is governed by a separate written agreement.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of the jurisdiction in which Solvionix is registered. That jurisdiction will be confirmed before publication.',
    ],
  },
]

/** Keyed by the `kind` prop the shared LegalPage route receives. */
export const legalSections = {
  privacy: privacySections,
  terms: termsSections,
}

export default legalSections
