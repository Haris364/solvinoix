/**
 * WORK — projects presented as systems.
 *
 * Entries are labelled `Client Project`, `Internal Project` or
 * `Demonstration Project`, and the label is rendered on the card and repeated in
 * the page header so a build can never be read as the wrong kind of work.
 *
 * OUTCOME RULES, and they are not relaxed for a named client: never a number, a
 * percentage, a revenue figure or an unmeasured result. Use the `status` and
 * `capabilitiesImplemented` fields instead. Inventing a result because a project
 * has a name attached to it would be the single most damaging thing this page
 * could do — a demonstrable capability can be checked, a fabricated metric cannot
 * be, so a client project gets the same discipline as every other entry.
 *
 * Each project follows the same nine-part case study structure, in this order:
 *
 *   01 Business Context        what the organisation was doing
 *   02 The Challenge           the specific operational failure
 *   03 Solution Strategy       the approach, and what was deliberately excluded
 *   04 Product / System Design the flows, states and data model
 *   05 Architecture            the layers and how they connect
 *   06 Implementation          how it was built and what that implies
 *   07 Integrations            the systems it talks to
 *   08 Outcome                 implemented capabilities and current status
 *   09 Next Evolution          what would come next
 *
 * OUTCOME RULES: see the note at the top of this file.
 *
 * Fields
 *   id                 URL segment under /work
 *   label              'Client Project' | 'Internal Project' | 'Demonstration Project'
 *   client             organisation's name; present only when label is CLIENT
 *   title              project name
 *   summary            one line for the card
 *   domain             the operating environment it models
 *   relatedSolutions   ids from solutions.js
 *   relatedIndustries  ids from industries.js
 *   architecture       the layer stack, rendered by SystemFlow
 *   userFlow           the primary path through the system
 *   caseStudy          { context, challenge, strategy, design, implementation,
 *                        integrations, outcome, next }
 *   status             current state, in words
 *   capabilitiesImplemented  what the build demonstrably does
 *   technology         supporting, shown last
 *   liveUrl            null until something is genuinely public
 *   repoUrl            null
 *
 * There is no `screenshots` field. An earlier version had one and nothing ever
 * rendered it. The card now carries a generated abstract plate instead — see
 * ProjectVisual for why it is a diagram and not a screenshot.
 */

const CLIENT = 'Client Project'
const DEMONSTRATION = 'Demonstration Project'
const INTERNAL = 'Internal Project'

export const work = [
  {
    id: 'dami-practice-intake',
    label: CLIENT,
    client: 'Dami',
    title: 'Practice Intake & Matter Onboarding',
    summary: 'Takes a new instruction from first contact to a complete, checked matter file without re-keying anything.',
    domain: 'Professional services operations',
    relatedSolutions: ['business-systems', 'digital-products', 'intelligent-systems'],
    relatedIndustries: ['professional-services'],
    caseStudy: {
      context:
        'New instructions arrive by email, over the phone and in person, and each one is re-typed into the practice management system by whoever took it. The typing is quick; the checking afterwards is where the time goes, and it is where the mistakes survive.',
      challenge:
        'Completeness was never enforced anywhere along the chain. A matter could be opened with a missing party detail or an absent conflict check, and nothing would flag it until the file was picked up weeks later — at which point the error had already been inherited by everything derived from it.',
      strategy:
        'Make the instruction the record rather than the system entry. Capture happens once, at the point of contact, against a checklist the practice defines rather than one fixed in software. Anything the checklist cannot satisfy is escalated instead of carried forward as a guess, and the practice management system is written from the captured record rather than typed into directly.',
      design:
        'One intake form per matter type, with its required fields defined by the practice. Validation runs during capture, so an incomplete instruction is visible before it becomes a matter. Conflict checking is a mandatory step with its own recorded outcome — searched, clear, or referred — because an unchecked conflict check is indistinguishable from one that was never run.',
      implementation:
        'Capture works without a connection and writes an append-only local record, because a substantial share of instructions are taken somewhere with poor signal. Every derived record keeps a pointer back to the instruction it came from, so the practice management system can be rebuilt from capture if a field is ever disputed.',
      integrations:
        'Email capture for written instructions, document storage for identity and conflict evidence, and a write adapter into the practice management system. That adapter is the only path into the system; nothing else writes to it.',
      outcome:
        'The build implements the full path from instruction capture to a complete, checked matter record, with the conflict check recorded as an outcome rather than assumed. No performance figures are published: results against the previous process have not been measured, and a figure we have not measured does not mean anything on this page.',
      next: 'Extending conflict checking to beneficial ownership as well as the named parties, and a periodic review step where the practice confirms the checklist is still asking the right questions.',
    },
    architecture: [
      { label: 'Contact point', detail: 'Web, email or in person — captured once' },
      { label: 'Local capture record', detail: 'Append-only, works with no connection' },
      { label: 'Checklist validation', detail: 'Practice-defined required fields per matter type' },
      { label: 'Conflict check', detail: 'Mandatory, with the outcome recorded either way' },
      { label: 'Matter assembly', detail: 'A complete file built from the capture record' },
      { label: 'Practice system write', detail: 'Single adapter, and the sole write path' },
    ],
    userFlow: [
      'An instruction is taken and captured against the correct matter type',
      'Required fields are validated as the instruction is recorded',
      'An incomplete instruction is escalated rather than saved as a guess',
      'Conflict checking is performed and its outcome recorded',
      'A complete matter record is assembled from the capture record',
      'The practice system is updated through its single write adapter',
    ],
    status: 'Client project. The capture-to-matter path is implemented and deployed for Dami. Performance against the previous process has not yet been measured, so no figures are published.',
    capabilitiesImplemented: [
      'Single-capture intake with no re-keying into the practice system',
      'Practice-defined required fields enforced during capture',
      'Escalation of incomplete instructions rather than silent acceptance',
      'Conflict checking recorded as an explicit outcome',
    ],
    technology: ['React', 'Node.js', 'PostgreSQL', 'Document storage', 'Email ingestion', 'Offline storage'],
    liveUrl: null,
    repoUrl: null,
  },
  {
    id: 'lead-qualification-engine',
    label: INTERNAL,
    title: 'Lead Qualification Engine',
    summary: 'Reads an inbound enquiry, scores it against agreed criteria and files a record into the CRM.',
    domain: 'B2B enquiry handling',
    relatedSolutions: ['intelligent-systems', 'business-systems'],
    relatedIndustries: ['professional-services', 'real-estate'],
    caseStudy: {
      context:
        'A B2B organisation receives enquiries into one shared inbox. Each is read by whoever replies first, with no consistent way to tell a qualified opportunity from a general question, and no record of the reasoning.',
      challenge:
        'Qualification depended entirely on the individual reading the message. The same enquiry could be answered as an opportunity by one person and closed as spam by another, and the business could not see where enquiries were being lost.',
      strategy:
        'Automate reading and extraction, and keep the decision with a person. A pipeline parses each enquiry, extracts the details that matter, scores it against criteria the business defines, and writes a record with a suggested next step. Anything below the confidence threshold goes to a person rather than being auto-closed.',
      design:
        'Three states per enquiry: qualified, needs review, closed. The review queue is the default landing view, so a person only ever sees what the system was unsure about. Each record keeps the extracted fields, the score, the reason for the score and the original message, so a decision can be argued with later.',
      implementation:
        'A Python worker consumes the inbox by polling, and every stage writes its state so a partial run is resumable. Scoring is a transparent rule set rather than an opaque model, because a score a salesperson cannot explain is a score they will not use.',
      integrations: 'Inbound email, and a CRM write target. The CRM boundary is a single adapter so a different CRM changes one module.',
      outcome:
        'The build demonstrates the full path from raw enquiry to a qualified, explained record. It is a demonstration system and has not been run against a production inbox, so there is no measured result to report.',
      next: 'The natural extension is a feedback loop: record which suggestions a person accepted or overrode, and use that to tune the criteria rather than the model.',
    },
    architecture: [
      { label: 'Shared inbox', detail: 'Source of raw enquiries' },
      { label: 'Extraction worker', detail: 'Parse message, pull out fields, attach source' },
      { label: 'Scoring rules', detail: 'Transparent criteria, per-tenant configurable' },
      { label: 'Confidence gate', detail: 'Below threshold routes to human review' },
      { label: 'Review queue', detail: 'Operator interface for the uncertain cases' },
      { label: 'CRM record', detail: 'Fields, score, reasoning, original message' },
    ],
    userFlow: [
      'Enquiry arrives in the shared inbox',
      'Extraction worker reads it and pulls out the relevant fields',
      'Scoring rules assess it against the business’s own criteria',
      'Above the threshold: a record is proposed with its reasoning',
      'Below the threshold: it enters the review queue for a person',
      'The person confirms, corrects or closes, and the outcome is recorded',
    ],
    status: 'Demonstration build. End-to-end path implemented; not deployed against a live inbox.',
    capabilitiesImplemented: [
      'Message parsing with field extraction',
      'Explainable scoring against configurable criteria',
      'Confidence threshold with human review path',
      'CRM record written with the decision reason attached',
    ],
    technology: ['Python', 'PostgreSQL', 'React', 'Language model API', 'Email ingestion'],
    liveUrl: null,
    repoUrl: null,
    
  },
  {
    id: 'operations-dashboard',
    label: DEMONSTRATION,
    title: 'Operations Dashboard',
    summary: 'Replaces several disagreeing operational spreadsheets with one reporting layer that traces back to source.',
    domain: 'Operational reporting',
    relatedSolutions: ['data-decision-systems', 'business-systems'],
    relatedIndustries: ['hospitality', 'healthcare'],
    caseStudy: {
      context:
        'Operational performance is tracked in several spreadsheets maintained by different people. The figures do not agree, and nobody can say which version is correct or why.',
      challenge:
        'Reporting was a manual reconciliation rather than a measurement. Every month-end consumed effort to make the numbers match, and decisions were made on figures that had not been validated against the records behind them.',
      strategy:
        'Build one reporting layer over the source systems, and make validation part of the pipeline rather than a manual step. Data is ingested on a schedule, checked on arrival, and modelled into a single definition per metric. Nothing is displayed without a route back to the records it came from.',
      design:
        'A metric catalogue defines every measure in one place, with its owner and its calculation. The dashboard links each figure to its source records, so a disagreement about a number becomes an inspectable query instead of an argument. Failed validations surface as a status panel rather than disappearing into a log.',
      implementation:
        'Loads are idempotent and re-runnable: a failed window is retried rather than patched, so the pipeline cannot drift from the source. Metric definitions live in versioned modelling code, which means a changed definition is a reviewable change.',
      integrations: 'Read-only connections to the operational databases and a scheduled feed from an external system. No write-back, deliberately — this build reports, it does not act.',
      outcome:
        'The build demonstrates a validated pipeline, a defined metric model and a dashboard with traceability to source records. It is a demonstration system with synthetic data, so there is no measured result to report.',
      next: 'Adding forecasting against the validated history, and alerting on the metrics that indicate a process is starting to fail rather than waiting for month-end.',
    },
    architecture: [
      { label: 'Source systems', detail: 'Operational databases and an external feed' },
      { label: 'Ingestion', detail: 'Scheduled, idempotent, re-runnable' },
      { label: 'Validation', detail: 'Schema, volume and range checks, surfaced not swallowed' },
      { label: 'Metric model', detail: 'One version-controlled definition per measure' },
      { label: 'Dashboard', detail: 'Every figure links to its source records' },
      { label: 'Alerting', detail: 'Pipeline failure and metric threshold notifications' },
    ],
    userFlow: [
      'Sources are read on a schedule',
      'Incoming data is validated and rejected loudly if it fails',
      'Validated data lands in the modelled store',
      'Metrics are calculated from the model, not from the raw tables',
      'The dashboard presents them with a path to source',
      'A status panel reports any stage that is behind or failed',
    ],
    status: 'Demonstration build. Full pipeline implemented against synthetic data; synthetic data in, synthetic data out.',
    capabilitiesImplemented: [
      'Idempotent, re-runnable ingestion',
      'Boundary validation with visible failure states',
      'Version-controlled metric definitions',
      'Traceability from any figure to its source records',
    ],
    technology: ['Python', 'SQL', 'Airflow', 'PostgreSQL', 'React', 'Charting library'],
    liveUrl: null,
    repoUrl: null,
    
  },
  {
    id: 'appointment-automation',
    label: DEMONSTRATION,
    title: 'Appointment Automation',
    summary: 'Captures an enquiry, confirms the details, offers real availability and books, with every step logged.',
    domain: 'Scheduling operations',
    relatedSolutions: ['business-systems', 'connected-infrastructure'],
    relatedIndustries: ['healthcare', 'professional-services'],
    caseStudy: {
      context:
        'Appointment requests are followed up by hand. A person has to read the request, check the diary, offer times and confirm, which is slow and depends on who picks it up.',
      challenge:
        'Booking depended on response speed, so enquiries that arrived outside working hours waited. Offering times meant checking availability by hand, which meant double-booking when it was done under time pressure.',
      strategy:
        'Automate the sequence, but keep the calendar as the single source of availability. The system captures the requirement, confirms the details with the requester, reads real availability, offers slots and books — writing every step back so the whole conversation is reconstructable.',
      design:
        'The requester sees one thread that moves through captured, confirmed, offered and booked. A person can interrupt at any point, and the state is visible to both sides, which removes the "did you get my email?" problem. Availability is shown as slots rather than as a date picker, because a slot is a commitment and a date is not.',
      implementation:
        'Scheduling is handled by a job queue rather than in-request, so a slow calendar provider cannot block the thread. Booking runs through a compare-and-set on the slot, so two concurrent requests for the last appointment cannot both succeed.',
      integrations: 'Calendar provider for availability and writes, email for the thread, and a CRM record on booking. Each is an adapter, so a different calendar system touches one module.',
      outcome:
        'The build demonstrates the complete sequence from enquiry to a booked appointment, including the concurrency handling and the interrupt path. It is a demonstration system and has not run against a production diary, so there is no measured result to report.',
      next: 'Reminder and recall sequences, and a waitlist that offers a released slot automatically when a cancellation occurs.',
    },
    architecture: [
      { label: 'Enquiry channel', detail: 'Web form or inbound message' },
      { label: 'Requirement capture', detail: 'Details confirmed with the requester' },
      { label: 'Availability read', detail: 'Calendar provider, cached briefly' },
      { label: 'Slot offer', detail: 'Real openings only, held with a compare-and-set' },
      { label: 'Booking', detail: 'Atomic write, no double-booking' },
      { label: 'Audit trail', detail: 'Every step recorded against the thread' },
    ],
    userFlow: [
      'A requester describes what they need',
      'The system confirms the details before anything is booked',
      'Real availability is read and offered as concrete slots',
      'A slot is selected and reserved atomically',
      'The booking is written and confirmed to both sides',
      'A person can take over at any point, with state visible throughout',
    ],
    status: 'Demonstration build. Full sequence implemented including concurrency control; no production calendar connected.',
    capabilitiesImplemented: [
      'Requirement capture with confirmation step',
      'Availability read from a live source, not hard-coded',
      'Atomic slot reservation preventing double-booking',
      'Full thread reconstruction for support and audit',
    ],
    technology: ['Python', 'REST APIs', 'PostgreSQL', 'Job queue', 'Calendar API', 'Email delivery'],
    liveUrl: null,
    repoUrl: null,
    
  },
  {
    id: 'mobile-field-service',
    label: INTERNAL,
    title: 'Mobile Field Service App',
    summary: 'Captures jobs, photos and signatures on site and syncs when signal returns.',
    domain: 'Field operations',
    relatedSolutions: ['digital-products', 'business-systems'],
    relatedIndustries: ['real-estate', 'hospitality'],
    caseStudy: {
      context:
        'Field staff record work on paper and return to base before any of it reaches the system. Until then, the office has no accurate picture of what has actually been done.',
      challenge:
        'The record of a job exists in two places at once — on paper at the site, and in the office system later — and they disagree. A revisit is only discovered when a customer complains, because the office never knew the first visit was incomplete.',
      strategy:
        'Make the device the authority for the work captured, and treat the network as an optimisation rather than a requirement. The app must be fully usable with no connection, queue everything locally, and reconcile deterministically when it returns.',
      design:
        'One job screen per site visit: what was done, photos, and a signature. The interface is built for a gloved hand on a phone in poor light, which drove the target sizes and contrast. A visible sync state is permanent, because a field engineer who cannot trust the state will not use the app.',
      implementation:
        'Writes are appended to a local queue rather than overwritten, so a crash mid-sync cannot lose work. Reconciliation is deterministic: server records win on business state, while device-captured evidence — photos, signatures, timestamps — merges by identity. Conflicts are surfaced for a supervisor rather than resolved silently.',
      integrations: 'Back-office API for jobs and customers, object storage for media, and device storage for the offline queue.',
      outcome:
        'The build demonstrates offline capture, deferred sync, deterministic merge and conflict surfacing. It is an internal prototype run on test devices, so there is no measured result to report.',
      next: 'Route optimisation and offline reference material, and a scheduling view so the dispatcher can see job state as it is updated from the field rather than at end of day.',
    },
    architecture: [
      { label: 'Field interface', detail: 'Designed for one-handed use in poor conditions' },
      { label: 'Local store', detail: 'Append-only queue, survives a crash mid-sync' },
      { label: 'Sync engine', detail: 'Retry with backoff, resumable' },
      { label: 'Merge rules', detail: 'Deterministic, per-field, with conflicts surfaced' },
      { label: 'Back-office API', detail: 'Jobs, customers, business state' },
      { label: 'Object storage', detail: 'Photos and signatures as immutable evidence' },
    ],
    userFlow: [
      'A job is downloaded to the device before departure',
      'The engineer completes the job offline, with photos and a signature',
      'Everything is queued locally with a visible sync state',
      'On reconnection the queue syncs, resumably, with retries',
      'Server and device records merge by explicit per-field rules',
      'A conflict goes to a supervisor; nothing is overwritten in silence',
    ],
    status: 'Internal prototype. Offline capture, sync and merge implemented and exercised on test devices; not in field use.',
    capabilitiesImplemented: [
      'Full offline operation with append-only local queue',
      'Resumable sync with retry and backoff',
      'Deterministic per-field merge with conflict surfacing',
      'Evidence preserved as immutable attachments',
    ],
    technology: ['React Native', 'SQLite', 'Background sync', 'REST API', 'Object storage'],
    liveUrl: null,
    repoUrl: null,
    
  },
  {
    id: 'customer-support-assistant',
    label: DEMONSTRATION,
    title: 'Customer Support Assistant',
    summary: 'Answers routine questions from the organisation’s own material and escalates the rest with context attached.',
    domain: 'Customer support operations',
    relatedSolutions: ['intelligent-systems', 'digital-products'],
    relatedIndustries: ['hospitality', 'professional-services'],
    caseStudy: {
      context:
        'The same support questions arrive repeatedly and consume time that should go to problems needing a person. Staff answer from memory, so the quality of an answer depends on who picks it up.',
      challenge:
        'Documentation exists but is not organised for retrieval, so a support agent either knows an answer or has to go looking. Automating the wrong question is worse than not automating at all.',
      strategy:
        'Ground the assistant strictly in the organisation’s own material, and make escalation the default whenever grounding is weak. The assistant’s value is removing repetition, not making decisions.',
      design:
        'Answers are returned with the source cited, so a customer or an agent can verify them. Anything below the grounding threshold goes straight to a person with the conversation attached, and the handover screen opens on the summary rather than the transcript.',
      implementation:
        'Retrieval is evaluated before it is trusted: a question set with known-good answers measures whether the system can find the right material. The assistant is intentionally stateless about the customer — it answers from documents, and account actions stay outside its reach.',
      integrations: 'Document store for source material, the support channel for the conversation, and ticket creation on escalation.',
      outcome:
        'The build demonstrates grounded retrieval, source citation, confidence-based escalation and context-attached handover. It is a demonstration system and no real support data has been processed, so there is no measured result to report.',
      next: 'Closing the loop on resolution rate by ticket, and expanding source material to include resolved past conversations once the retrieval quality is proven.',
    },
    architecture: [
      { label: 'Source documents', detail: 'Product, policy and support material' },
      { label: 'Indexing', detail: 'Chunking and retrieval structure' },
      { label: 'Question', detail: 'Classified, then grounded retrieval' },
      { label: 'Answer with source', detail: 'Cited, or refused' },
      { label: 'Confidence gate', detail: 'Weak grounding escalates immediately' },
      { label: 'Handover', detail: 'Summary plus transcript, ticket created' },
    ],
    userFlow: [
      'A customer question arrives through the support channel',
      'The question is classified and relevant material is retrieved',
      'An answer is generated and returned with its source cited',
      'Grounding is scored; a weak score is never shown as an answer',
      'Below threshold, the conversation is escalated to a person',
      'The person receives a summary and the full transcript on the ticket',
    ],
    status: 'Demonstration build. Retrieval, citation and escalation implemented; evaluated against an internal test set, not live traffic.',
    capabilitiesImplemented: [
      'Retrieval grounded only in the organisation’s own material',
      'Every answer returned with its source cited',
      'Confidence-gated escalation with no ungrounded answers shown',
      'Handover with a summary and the full conversation attached',
    ],
    technology: ['Python', 'Vector search', 'Language model API', 'React', 'Ticket API'],
    liveUrl: null,
    repoUrl: null,
    
  },
  {
    id: 'inventory-sync',
    label: DEMONSTRATION,
    title: 'Inventory Sync',
    summary: 'Keeps stock levels consistent across selling channels with one source of truth per field.',
    domain: 'Multi-channel commerce operations',
    relatedSolutions: ['connected-infrastructure', 'business-systems'],
    relatedIndustries: ['hospitality', 'real-estate'],
    caseStudy: {
      context:
        'Stock levels are tracked separately in a physical location, a warehouse and an online store. Each is correct at the moment it is read and wrong by the next transaction.',
      challenge:
        'There is no agreed owner of stock, so overselling is treated as an occasional operational accident rather than an architectural defect. Reconciliation is manual and happens after a customer has been turned away.',
      strategy:
        'Assign ownership of every field to exactly one system, and synchronise the rest. A correction pushed outward is an explicit event rather than a polled snapshot, and anything that cannot be reconciled is quarantined and reported instead of applied.',
      design:
        'The console shows per-channel state, which system owns each field, and the queue depth of pending events. A conflict is presented with both candidate values and the rule that produced the decision, because an unexplained overwrite is how trust in an inventory is lost.',
      implementation:
        'Every write carries an idempotency key, so a retried delivery cannot decrement stock twice. Ordering is guaranteed per item, which removes the entire class of bug where two updates arrive out of sequence. The dead-letter path is inspected rather than ignored.',
      integrations: 'Storefront, warehouse system and a third-party marketplace, each behind an adapter with a rate-limit-aware retry.',
      outcome:
        'The build demonstrates single-owner field ownership, idempotent delivery, ordered updates and quarantined conflicts. It is a demonstration system running against mocked channels, so there is no measured result to report.',
      next: 'Reservation and release handling for basket timeouts, and demand forecasting that feeds reorder points back into the source system.',
    },
    architecture: [
      { label: 'Selling channels', detail: 'Storefront, marketplace, internal order desk' },
      { label: 'Ingress', detail: 'Adapters with rate-limit-aware retry' },
      { label: 'Ownership model', detail: 'Exactly one system of record per field' },
      { label: 'Event queue', detail: 'Idempotency keys, ordering guaranteed per item' },
      { label: 'Reconciliation', detail: 'Scheduled comparison, conflicts quarantined' },
      { label: 'Console', detail: 'Per-channel state, queue depth, decision reasons' },
    ],
    userFlow: [
      'A transaction occurs in one channel',
      'The event is published with an idempotency key',
      'The owning system decides the value for its fields',
      'Updates propagate to the remaining channels in order',
      'A retried delivery is deduplicated rather than applied twice',
      'Unreconcilable differences are quarantined and reported, not forced',
    ],
    status: 'Demonstration build. Ownership model, idempotency and ordering implemented against mocked channels; no live integration.',
    capabilitiesImplemented: [
      'Single source of truth per field, declared explicitly',
      'Idempotent delivery preventing double-decrement',
      'Per-item ordering guarantees',
      'Conflict quarantine with the decision rule shown',
    ],
    technology: ['Node.js', 'Python', 'PostgreSQL', 'Message queue', 'REST and webhook APIs'],
    liveUrl: null,
    repoUrl: null,
    
  },
]

export const getWork = (id) => work.find((project) => project.id === id) ?? null

/** How many projects the home page previews. */
export const featuredWorkCount = 3

export const featuredWork = work.slice(0, featuredWorkCount)

/** The nine case study headings, in order. Used on the case study format page. */
export const caseStudySections = [
  { number: '01', title: 'Business Context', hint: 'What the organisation was doing, and the environment it operated in.' },
  { number: '02', title: 'The Challenge', hint: 'The specific operational failure, stated without solution language.' },
  { number: '03', title: 'Solution Strategy', hint: 'The approach taken, including what was deliberately excluded.' },
  { number: '04', title: 'Product / System Design', hint: 'Flows, states and the data model, including failure states.' },
  { number: '05', title: 'Architecture', hint: 'The layers, how they connect, and the decisions behind them.' },
  { number: '06', title: 'Implementation', hint: 'How it was built and what that implies for maintenance.' },
  { number: '07', title: 'Integrations', hint: 'The systems it talks to, and how failures are handled.' },
  { number: '08', title: 'Outcome', hint: 'Implemented capabilities and current status. No unmeasured numbers.' },
  { number: '09', title: 'Next Evolution', hint: 'The next iteration, and what would trigger it.' },
]

export default work
