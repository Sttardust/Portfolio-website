// ── Project content data ─────────────────────────────────────────────────────
// Content extracted from case study briefs. No images yet — placeholder slots
// are indicated by { type: 'placeholder', label, aspect } in screenSets.

export type Stat        = { num: string; label: string }
export type ProcessStep = { num: string; title: string; body: string }
export type Decision    = { label: string; title: string; body: string }
export type UserRole    = { icon: string; title: string; subtitle: string; body: string; flows: string[] }
export type Outcome     = { heading: string; body: string[]; points?: string[] }

export interface Project {
  slug:      string
  num:       string            // "01", "02", …
  title:     string
  subtitle?: string
  tagline:   string
  badge:     string            // e.g. "Mobile App · FinTech"
  accent:    string            // per-project muted accent (CSS colour string)
  accentBg:  string            // very light tint for pull-quote bg
  meta: { label: string; value: string }[]

  // Sections
  overview:  string[]
  stats:     Stat[]
  problem:   { heading: string; body: string[]; quote?: string }
  users?:    { heading: string; body?: string; roles: UserRole[] }
  process:   { heading: string; steps: ProcessStep[] }
  decisions: { heading: string; items: Decision[] }
  outcome:   Outcome

  // Media
  video?: string           // path relative to /public, e.g. '/novalut/final-comps.mp4'

  // Navigation
  prev?: { slug: string; title: string }
  next?: { slug: string; title: string }
}

// ── 1 — Novalut ─────────────────────────────────────────────────────────────
const novalut: Project = {
  slug:     'novalut',
  num:      '01',
  title:    'Novalut',
  subtitle: 'Wedaje Neo',
  tagline:  'A full-featured neo-banking app for Ethiopians worldwide.',
  badge:    'Mobile App · FinTech',
  accent:   '#1E3A5F',
  accentBg: '#EFF6FF',
  video:    '/novalut/final-comps.mp4',
  meta: [
    { label: 'Client',    value: 'Amhara Bank' },
    { label: 'Role',      value: 'UX Designer (Solo)' },
    { label: 'Platform',  value: 'Mobile App + Web Portal' },
    { label: 'Status',    value: 'Shipped · 2025 – 2026' },
  ],
  overview: [
    'Wedaje Neo — branded as Novalut — is a full-featured neo-banking app commissioned by Amhara Bank, one of Ethiopia\'s major commercial banks. The mission: deliver a seamless, inclusive, and intelligent mobile-first banking experience for Ethiopians worldwide — from urban tech-savvy youth in Addis Ababa to rural first-time bankers, diaspora users abroad, and merchants managing growing businesses.',
    'I joined as the sole UX Designer, responsible for the complete UX strategy — from initial research, competitive analysis, and persona development through to user flows, feature architecture, and a high-fidelity design system spanning 14 product modules across the full financial lifecycle.',
  ],
  stats: [
    { num: '14', label: 'Feature modules' },
    { num: '4',  label: 'User personas' },
    { num: '7',  label: 'User flow charts' },
    { num: '4',  label: 'Languages supported' },
  ],
  problem: {
    heading: 'No existing product treated Ethiopians as the primary user.',
    body: [
      'I ran a two-layer competitive audit — global fintech platforms (Wise, Revolut, Payoneer) and local Ethiopian apps (Dashen Bank, Telebirr, Michu). The finding was consistent: no existing product addressed the full spectrum of Ethiopian users\' needs. Novalut was designed to close every gap simultaneously.',
      'The platform needed to serve four radically different users: a digital-native university student who refuses to visit a branch; a first-time rural banker who needs Amharic UI and offline capability; a diaspora engineer sending money from Minnesota who expects Revolut-level transparency; and a boutique owner in Bahir Dar who needs QR payments, a sales dashboard, and merchant loans in one app.',
    ],
    quote: 'The gap wasn\'t just one missing feature. It was a product built to treat Ethiopians as the primary user — not an afterthought. That became the north star for every decision.',
  },
  users: {
    heading: 'Four personas. One platform. Wildly different needs.',
    body: 'The defining challenge was designing one coherent system for users with genuinely distinct mental models, technical capabilities, and financial needs.',
    roles: [
      {
        icon: '👨🏾‍💻',
        title: 'Yared',
        subtitle: 'The Digital Native · 22 · Addis Ababa',
        body: 'University student. Wants banking that feels like social media — fast, modern, rewarding. Refuses to visit a branch.',
        flows: ['One-click microloan with clear repayment terms', 'Gamified loyalty and rewards', 'QR and tap-to-pay'],
      },
      {
        icon: '👩🏾‍🌾',
        title: 'Mulu',
        subtitle: 'The First-Time Banker · 39 · Debre Tabor',
        body: 'Farmer and informal trader. Recently got her first smartphone. Motivated by secure saving and small loans for her poultry business.',
        flows: ['Offline or low-data capability', 'Amharic UI and voice guidance', 'Save without visiting a branch'],
      },
      {
        icon: '👨🏾‍💼',
        title: 'Abdi',
        subtitle: 'The Global Connector · 35 · Minnesota, USA',
        body: 'Software engineer sending money monthly to family in Dire Dawa. Values transparency, efficiency, and security. Uses Wise and Revolut.',
        flows: ['Remote onboarding with passport/NID', 'Transparent FX rates + virtual USD card', 'Real-time remittance tracking'],
      },
      {
        icon: '👩🏾‍💼',
        title: 'Hanna',
        subtitle: 'The Hustler · 29 · Bahir Dar',
        body: 'Boutique owner with 2 employees. Tired of juggling payment platforms. Wants payments, sales tracking, loans, and growth in one app.',
        flows: ['QR generator + SoftPOS on her phone', 'Real-time sales dashboard', 'Merchant loans based on sales volume'],
      },
    ],
  },
  process: {
    heading: 'From research to a 14-module design system.',
    steps: [
      {
        num: '01',
        title: 'Competitive Analysis',
        body: 'Audited global fintech platforms (Wise, Revolut, Payoneer) and local Ethiopian apps (Dashen Bank, Telebirr, Michu). Finding: no existing product served the full Ethiopian user spectrum. Novalut was designed to close every identified gap.',
      },
      {
        num: '02',
        title: 'Persona Development & User Research',
        body: 'Built four detailed personas — each with a genuinely distinct mental model, technical capability, and financial need. Every design decision was evaluated against all four before moving forward.',
      },
      {
        num: '03',
        title: 'User Flow Architecture',
        body: 'Designed and iterated seven comprehensive flow charts in FigJam covering every core product journey. After the first client review, four gaps were identified and incorporated — a loan application flow, a dispute handling system, notification flows, and QR payment paths.',
      },
      {
        num: '04',
        title: 'Feature Architecture (14 Modules)',
        body: 'Mapped the full product scope: Onboarding + KYC, Core Banking, Card Service, Neo Wallet, Payments, Lending, Foreign Exchange, Merchant Tools, AI Support, Loyalty & VIP, Offline Capability, and BaaS + 3rd Party API. Each module got its own information architecture before UI design began.',
      },
      {
        num: '05',
        title: 'High-Fidelity Design System',
        body: 'Built the complete mobile UI in Figma — navy and gold palette reflecting premium banking, with Amharic and English typography considerations throughout. Delivered a full component library with annotated developer specs.',
      },
    ],
  },
  decisions: {
    heading: 'The choices that defined the product.',
    items: [
      {
        label: 'Onboarding',
        title: 'Feature-first onboarding — value before signup',
        body: 'Rather than asking users to sign up cold, the welcome screen leads with five clear benefit statements — instant credit loans, Visa card, FX account, merchant tools, and savings. Users understand what they\'re getting before committing.',
      },
      {
        label: 'Authentication',
        title: 'Identity-first, friction-last login',
        body: 'The login screen shows the user\'s profile photo and masked phone number immediately — confirming identity before asking for a PIN. A biometric fingerprint button offers a one-touch alternative, communicating personalisation and security simultaneously.',
      },
      {
        label: 'Transfer UX',
        title: 'Reducing the most common action to its essential steps',
        body: 'The transfer screen opens with recent recipients as contact bubbles for one-tap "Send again." Four transfer destinations are clearly separated. A floating QR scan button handles the payment path added after client feedback. Every element earns its place.',
      },
      {
        label: 'Personalisation',
        title: 'Drag-and-drop action customisation',
        body: 'Users can rearrange their 11 quick actions across the home screen. Personalisation as a core feature — not an afterthought. This directly addressed Yared\'s need for a banking app that feels like a product built for him.',
      },
      {
        label: 'Multilingual',
        title: 'Four languages from the ground up',
        body: 'Amharic, Oromo, Somali, and English were designed as equal-priority language options — not translations of an English-first product. This shaped text field sizing, font choices, and content-heavy screen layouts throughout.',
      },
    ],
  },
  outcome: {
    heading: 'A platform that treats Ethiopians as the primary user.',
    body: [
      'Novalut was delivered as a complete, developer-ready design system — 14 modules, 7 user flow charts, and a full component library with annotated specifications, covering all four persona groups.',
      'The design demonstrated that a single platform can serve users as different as a rural first-time banker and an overseas diaspora professional — when the information architecture is built around their actual mental models rather than a Western fintech default.',
    ],
    points: [
      '14 product modules fully designed and documented',
      '7 user flow charts reviewed and approved by client',
      'Shipped and deployed · 2025–2026',
    ],
  },
  prev: { slug: 'cache',  title: 'Cache Menu App' },
  next: { slug: 'aiqem', title: 'AiQEM AdTech Dashboard' },
}

// ── 2 — AiQEM AdTech ─────────────────────────────────────────────────────────
const aiqem: Project = {
  slug:    'aiqem',
  num:     '02',
  title:   'AiQEM AdTech',
  tagline: 'A data-driven advertising dashboard that makes complex campaign data instantly actionable.',
  badge:   'Web Dashboard · AdTech',
  accent:  '#4C1D95',
  accentBg:'#F5F3FF',
  meta: [
    { label: 'Client',   value: 'AiQEM Tech' },
    { label: 'Role',     value: 'UX Designer (Solo)' },
    { label: 'Platform', value: 'Web Dashboard' },
    { label: 'Timeline', value: '2023 – 2025' },
  ],
  overview: [
    'AiQEM Tech is an Ethiopian AI and blockchain company providing advertising analytics services to businesses. As their in-house UX Designer, I designed an end-to-end advertising analytics dashboard that gave marketing teams and their clients a single place to track, analyse, and act on campaign performance data.',
    'The product surfaced five core data types — impressions, click-through rates, campaign spend, audience segments, and conversion funnels — across a modular dashboard interface. The challenge: presenting this breadth of data without overwhelming users who needed to make fast, confident decisions.',
    'I was the sole UX Designer on the project, working across the full design process from initial research through to the high-fidelity Figma handoff delivered to AiQEM\'s development team.',
  ],
  stats: [
    { num: '5',  label: 'Core data modules' },
    { num: '2',  label: 'User types served' },
    { num: '1',  label: 'Design system built' },
    { num: '↓',  label: 'Complexity, not data' },
  ],
  problem: {
    heading: 'Five data categories. Multiple campaigns. One dashboard that can\'t overwhelm.',
    body: [
      'AiQEM\'s campaign managers spent significant time each week manually assembling data from separate tools to create client reports. The dashboard needed to eliminate that entirely — while serving two fundamentally different users at the same time.',
      'AiQEM\'s internal team needed to move fast: scanning across campaigns, spotting anomalies, and adjusting targeting in real time. External clients needed confidence that their budget was being spent well — without needing to understand the underlying data complexity.',
    ],
    quote: 'The hardest design problem wasn\'t finding the right chart type. It was deciding what not to show — and when.',
  },
  users: {
    heading: 'Two types of users — different goals, same dashboard.',
    body: 'The dashboard served two distinct groups. Designing for both simultaneously without fragmenting the experience was one of the core UX challenges.',
    roles: [
      {
        icon: '📊',
        title: 'AiQEM Internal Team',
        subtitle: 'Campaign managers',
        body: 'Needed to move fast — scanning across campaigns, spotting anomalies, and adjusting targeting or spend in real time.',
        flows: ['Cross-campaign overview at a glance', 'Quick anomaly detection (CTR drops, budget overruns)', 'Efficient filtering across campaigns and timeframes', 'Export data for client reporting'],
      },
      {
        icon: '🏢',
        title: 'Clients & Advertisers',
        subtitle: 'View-only access',
        body: 'Not deep analytics users — they needed confidence that their budget was being spent well and their ads were reaching the right people.',
        flows: ['Clear progress against campaign goals', 'Understandable data — no jargon', 'Proof of reach and audience quality', 'Simple date range filtering'],
      },
    ],
  },
  process: {
    heading: 'From stakeholder interviews to developer handoff.',
    steps: [
      {
        num: '01',
        title: 'Stakeholder Interviews & Discovery',
        body: 'Interviewed AiQEM\'s campaign managers to understand their daily workflow — how they moved between tools, what decisions they needed to make quickly, and where the biggest frustrations were. Key finding: they spent significant time each week manually assembling data from separate sources. The dashboard needed to eliminate that entirely.',
      },
      {
        num: '02',
        title: 'Competitive Audit',
        body: 'Audited Google Ads, Meta Ads Manager, and HubSpot\'s analytics dashboards — mapping how each handled data density, filtering, and dual-user scenarios. Identified that the best-in-class tools used progressive disclosure and persistent global filters — two patterns I carried directly into the design.',
      },
      {
        num: '03',
        title: 'Information Architecture',
        body: 'Defined the module structure and navigation model before touching any UI. Key decision: a left-rail nav with five fixed modules, each containing its own filters and sub-views. A persistent global header with date range and campaign selectors applies context across all modules simultaneously.',
      },
      {
        num: '04',
        title: 'Wireframes & Iteration',
        body: 'Lo-fi wireframes tested with AiQEM\'s internal team across 3 rounds. Most significant feedback: the initial design surfaced too many chart types simultaneously. Added a view-toggle pattern (table vs. chart vs. summary card) to all modules as a result.',
      },
      {
        num: '05',
        title: 'High-Fidelity Design & Design System',
        body: 'Built the full high-fidelity dashboard in Figma. Designed a complete component library covering charts, filter components, data tables, KPI cards, and modal patterns, with full developer handoff annotations.',
      },
    ],
  },
  decisions: {
    heading: 'The choices that made the difference.',
    items: [
      {
        label: 'Data hierarchy',
        title: 'Summary first, detail on demand',
        body: 'Every module opens with a summary card showing the single most important number — total impressions, overall CTR, total spend. Detail is one click away, not immediately visible. Users could scan the entire dashboard in under 10 seconds to get a health check, then drill down where needed.',
      },
      {
        label: 'Filtering system',
        title: 'Global filters that persist across all modules',
        body: 'A global campaign selector and date range picker persists in the top navigation — any filter applied there applies to all modules simultaneously. This solved the navigation confusion problem: users always know that what they\'re looking at is consistent across views.',
      },
      {
        label: 'Chart language',
        title: 'Standardised visual patterns across modules',
        body: 'Defined a consistent chart grammar: time-series data always uses area charts, breakdowns always use horizontal bar charts, funnels always use the same step-down visual. Users only had to learn the visual language once — after that, pattern recognition made navigating between modules fast and intuitive.',
      },
      {
        label: 'Dual-user design',
        title: 'One dashboard, two permission levels',
        body: 'Rather than building separate interfaces for the internal team and clients, the same dashboard adapts based on permission level. Internal users see all campaigns; clients see only theirs. The underlying UI is identical — reducing design and development complexity.',
      },
    ],
  },
  outcome: {
    heading: 'A single source of truth — delivered under a competitive deadline.',
    body: [
      'The dashboard was delivered as a complete Figma handoff covering all five data modules with a fully documented design system, component library, and annotated specifications.',
      'AiQEM needed to ship the product before a competitor entered the market. This meant making fast, well-reasoned design decisions rather than over-deliberating. The discipline of progressive disclosure and persistent filtering solved the data-density problem cleanly — and was also the most buildable solution.',
      'The dashboard consolidated what previously required multiple separate tools into a single, coherent experience — giving AiQEM\'s team a platform they could confidently demo to clients as a differentiator.',
    ],
    points: [
      '5 data modules fully designed and documented',
      'Complete design system and component library delivered',
      'Shipped before competitor entered the market',
    ],
  },
  prev: { slug: 'novalut', title: 'Novalut Fintech App' },
  next: { slug: 'fema',    title: 'FEMA LMS' },
}

// ── 3 — FEMA LMS ─────────────────────────────────────────────────────────────
const fema: Project = {
  slug:     'fema',
  num:      '03',
  title:    'FEMA',
  subtitle: 'Future Education Mastery Accelerator',
  tagline:  'A learning platform built for Ethiopian students — from scratch.',
  badge:    'Mobile App · EdTech',
  accent:   '#065F46',
  accentBg: '#F0FDF4',
  meta: [
    { label: 'Context',  value: '10 Academy Accelerator' },
    { label: 'Role',     value: 'UX Designer (Solo)' },
    { label: 'Platform', value: 'Mobile App — iOS & Android' },
    { label: 'Timeline', value: '7 weeks · 2023–2024' },
  ],
  overview: [
    'FEMA — Future Education Mastery Accelerator, or as its Ge\'ez root translates, "the fire that is to be kindled within us" — is an Ethiopian educational technology platform designed to make quality learning accessible to students across the country.',
    'The project was undertaken during the 10 Academy UX Design Accelerator, where I was tasked with designing a complete mobile learning management system from the ground up — zero existing product, zero existing research.',
    'The scope was ambitious: a single app serving four entirely different user types — students, teachers, parents, and administrators — each with distinct goals, workflows, and permissions. The challenge was designing a system that felt cohesive and simple for every user, without building four separate apps.',
  ],
  stats: [
    { num: '4',   label: 'User types' },
    { num: '7',   label: 'Weeks end-to-end' },
    { num: '2',   label: 'Languages (EN + AM)' },
    { num: '40+', label: 'Screens designed' },
  ],
  problem: {
    heading: 'Ethiopian students are underserved by every existing digital tool.',
    body: [
      'Ethiopia has one of the youngest and fastest-growing populations in the world, yet its education system faces significant infrastructure gaps — overcrowded classrooms, limited access to supplementary learning materials, and almost no digital bridge between teachers, students, and parents.',
      'Existing LMS platforms (Moodle, Google Classroom) are built for Western contexts: they require stable internet, assume English literacy, and offer no pathway for parents to monitor a young child\'s progress or for administrators to approve content before it reaches students.',
      'FEMA needed to solve for this context specifically: low-bandwidth environments, bilingual content (Amharic and English), age-appropriate access controls, and a content approval workflow so administrators could gatekeep quality before it reached students.',
    ],
    quote: 'The opportunity wasn\'t just to make a learning app. It was to design the infrastructure layer that Ethiopian education was missing — a single trusted system connecting students, teachers, parents, and schools.',
  },
  users: {
    heading: 'Four roles. One shared system.',
    body: 'The most complex design challenge was architecting a system that felt tailored to each user type without fragmenting the experience.',
    roles: [
      {
        icon: '📚',
        title: 'Student',
        subtitle: 'Primary learner',
        body: 'The core user. Students above Grade 6 can create their own account. Those below require a parent to create and manage the account — an age-gate that shaped the entire onboarding architecture.',
        flows: ['Onboarding quiz → personalised course list', 'Video, text & file content', 'Chapter quizzes + final exam', 'Progress tracker + feedback'],
      },
      {
        icon: '🧑‍🏫',
        title: 'Teacher',
        subtitle: 'Content creator & grader',
        body: 'Teachers receive accounts created by admin. Primary jobs: create course content, grade assignments, track student progress, and answer questions from students and parents.',
        flows: ['Create course → submit for admin approval', 'Grade quizzes, exams & assignments', 'View pass/fail lists + contact parents', 'Answer student & parent questions'],
      },
      {
        icon: '👨‍👩‍👦',
        title: 'Parent',
        subtitle: 'Monitor & advocate',
        body: 'Parents manage child profiles, enrol their children in courses, monitor grades, and contact teachers. Unanswered questions escalate to FEMA admins after a set waiting period.',
        flows: ['Create & manage child profiles', 'Enrol children in courses', 'View progress + receive grade notifications', 'Contact teacher → escalate to FEMA'],
      },
      {
        icon: '🏫',
        title: 'Admin',
        subtitle: 'Gatekeeper & manager',
        body: 'Admins control the entire platform — approving or declining teacher-submitted content, managing roles, viewing platform-wide analytics, and handling escalated parent questions.',
        flows: ['Approve / decline course content', 'Create teacher & sub-admin accounts', 'Platform data & analytics dashboard', 'Handle escalated unanswered questions'],
      },
    ],
  },
  process: {
    heading: '7 weeks from blank canvas to prototype.',
    steps: [
      { num: 'W1',   title: 'Competitive Analysis', body: 'Audited Google Classroom, Moodle, Duolingo, and local Ethiopian edtech tools. Identified gaps: none offered bilingual support, offline-first thinking, or an age-gated parent/child account structure.' },
      { num: 'W1–2', title: 'Personas & User Flow Mapping', body: 'Built 4 detailed personas. Mapped complete user flow charts for all four roles — identifying where flows intersect (teacher grades → parent notification) and where they diverge. The student flow alone contained 15+ decision nodes including the Grade 6 age-gate branching.' },
      { num: 'W2–3', title: 'User Journey Mapping & IA', body: 'Created end-to-end journey maps for the student and teacher — mapping touchpoints, emotional states, and interaction moments from initial app launch through to course completion. Built the full site map covering all 4 user roles and 40+ screens.' },
      { num: 'W3–4', title: 'Lo-fi Wireframing', body: 'Wireframed all core screens for each role in Figma — prioritising information architecture before visual design. Key decisions: bottom tab navigation with a central action button for students/teachers; a simplified 2-level navigation for parents; a data-dense dashboard view for admin.' },
      { num: 'W5–6', title: 'Branding + High-Fidelity Design', body: 'Designed the FEMA logo, colour palette, and typography system. Then moved to high-fidelity screens — applying the brand across all 40+ screens with consistent components, motion patterns, and interaction states.' },
      { num: 'W7',   title: 'Prototype, Testing & Finalisation', body: 'Built a clickable Figma prototype and conducted walkthroughs with the team. Iterated based on feedback and finalised the design for developer handoff — including a complete component library and annotated specifications.' },
    ],
  },
  decisions: {
    heading: 'The choices that shaped the product.',
    items: [
      {
        label: 'Age-gated onboarding',
        title: 'Protecting younger users from day one',
        body: 'Students in Grade 6 and below cannot create accounts independently — the system routes them through a parent-created profile. This wasn\'t a technical constraint; it was a deliberate UX decision to protect younger users while keeping the parent informed and in control from day one.',
      },
      {
        label: 'Onboarding quiz',
        title: 'Skippable — but worth completing',
        body: 'New students are offered an optional course evaluation quiz at first launch. Completing it unlocks a personalised course recommendation list tailored to their grade and knowledge level. This creates immediate value for engaged users without blocking access for those who want to explore freely.',
      },
      {
        label: 'Content pipeline',
        title: 'Admin approval before anything reaches students',
        body: 'Teachers submit course content to admins before it goes live. This was a core trust mechanism — ensuring FEMA could maintain quality and curriculum integrity. Declined content came with clear admin feedback so teachers could iterate.',
      },
      {
        label: 'Bilingual design',
        title: 'Amharic and English — from the ground up',
        body: 'Every screen was designed with both Amharic and English content in mind — not as an afterthought. This influenced text field sizing, font choices, and how content-heavy screens were laid out to accommodate the longer word lengths common in Amharic script.',
      },
    ],
  },
  outcome: {
    heading: 'A complete, developer-ready design system for a platform that didn\'t exist.',
    body: [
      'Over 7 weeks, I delivered a fully documented design system covering all four user roles — student, teacher, parent, and admin — across 40+ screens with a complete component library, annotated specifications, and a clickable Figma prototype.',
      'The project demonstrated something important: complex multi-persona systems don\'t have to feel complex. By investing deeply in user flows and information architecture before touching visual design, the final product felt cohesive and approachable for every user type — despite the underlying system complexity.',
    ],
    points: [
      '40+ screens across 4 user roles — designed and documented',
      'Full design system and component library delivered',
      'Bilingual (Amharic + English) from the ground up',
    ],
  },
  prev: { slug: 'aiqem', title: 'AiQEM AdTech Dashboard' },
  next: { slug: 'cache', title: 'Cache Menu App' },
}

// ── 4 — Cache Menu App ───────────────────────────────────────────────────────
const cache: Project = {
  slug:    'cache',
  num:     '04',
  title:   'Cache',
  subtitle:'Menu App',
  tagline: 'Replacing paper menus and phone calls with a seamless digital ordering experience.',
  badge:   'Mobile App · Hospitality',
  accent:  '#92400E',
  accentBg:'#FFFBEB',
  meta: [
    { label: 'Client',   value: 'Platform Technologies PLC' },
    { label: 'Role',     value: 'UX Designer' },
    { label: 'Platform', value: 'Mobile App · Hospitality' },
    { label: 'Timeline', value: 'Jun 2022 – Jan 2023' },
  ],
  overview: [
    'Cache is the flagship product of Platform Technologies PLC — a digital room service and food ordering system for Ethiopian hotels. The app lets hotel guests browse menus, place orders, pay online, and track delivery from their phone, replacing the physical menu, phone-based ordering, and cash-only payment that dominated the market.',
    'I joined as UX Designer during a period of competitive urgency: Platform Technologies needed to ship Cache before a competitor launched a similar product. This shaped the entire design process — tight timelines, fast iteration, and a premium on decisions that were both good design and fast to build.',
  ],
  stats: [
    { num: '0',  label: 'Phone calls to order' },
    { num: '3',  label: 'Major iterations' },
    { num: '+',  label: 'Online payment added' },
    { num: '🏆', label: 'Shipped before competitor' },
  ],
  problem: {
    heading: 'The hotel guest experience was stuck in 1995.',
    body: [
      'Ethiopian hotels relied almost entirely on paper menus and phone-based room service. The guest experience was slow and friction-filled — menus were often out of date, ordering required calling the front desk and hoping someone picked up, and cash was the only payment option.',
      'For hotel staff, the situation was equally chaotic: handwritten orders, verbal miscommunications with the kitchen, and no centralised view of what was being ordered or when it was expected to arrive.',
    ],
    quote: 'The brief wasn\'t just "make a digital menu." It was to redesign the entire ordering loop — from first tap to food at the door — and make it feel as effortless as ordering from Uber Eats, but built for an Ethiopian hotel context.',
  },
  process: {
    heading: 'Fast, focused, and feedback-driven.',
    steps: [
      {
        num: '01',
        title: 'Contextual Research',
        body: 'Reviewed the existing room service process at partner hotels with Platform Technologies\' team. Mapped the full guest and staff journey to identify where friction was highest — ordering, payment, and communication emerged as the three critical pain points that needed to be solved first.',
      },
      {
        num: '02',
        title: 'Competitive Reference',
        body: 'Audited food ordering apps for mental model patterns: Uber Eats for ordering flow, Marriott Bonvoy for room service experience, and local Ethiopian apps for context on what patterns users were already familiar with. The goal was to build on existing mental models rather than invent new ones.',
      },
      {
        num: '03',
        title: 'Wireframes & Flow Design',
        body: 'Lo-fi wireframes of the full guest journey — browse, customise, cart, checkout, track. Shared with Platform Technologies\' team for feedback before moving to high fidelity. The wireframe stage is where the flat list → category tabs change and the multi-screen checkout → 2-step checkout simplification were identified.',
      },
      {
        num: '04',
        title: 'High-Fidelity Design & Handoff',
        body: 'Built the full mobile UI in Figma. Delivered a complete component library (cards, buttons, inputs, modals, nav patterns) with annotated specifications. The component library was designed for speed: minimal bespoke elements, maximum reuse.',
      },
    ],
  },
  decisions: {
    heading: 'Three iterations that defined the final product.',
    items: [
      {
        label: 'Menu display',
        title: 'From a single scroll to category-tab navigation',
        body: 'The initial design showed all menu items in a scrollable list. Feedback from the hotel team made clear that guests couldn\'t orient themselves. The final design uses a category-tab navigation (Starters / Mains / Drinks / Desserts) with item cards showing name, price, key ingredients, and a photo thumbnail.',
      },
      {
        label: 'Ordering flow',
        title: 'Reducing steps from "add" to "confirmed"',
        body: 'The first flow had too many screens between adding an item and confirming the order. The revised flow introduced a persistent cart drawer accessible from anywhere in the menu, and a streamlined 2-step checkout (review cart → confirm). Returning guests can reorder with a single tap from their history.',
      },
      {
        label: 'Online payment',
        title: 'From afterthought to core feature',
        body: 'Online payment was not in the original scope. Feedback from hotel partners made clear it was non-negotiable — guests increasingly expected digital payment, and cash-on-delivery alone was a reason not to use the app. Payment was added as a core feature: mobile money and room-charge options, cleanly integrated into checkout.',
      },
    ],
  },
  outcome: {
    heading: 'Shipped before the competition. Adopted as Platform Technologies\' flagship product.',
    body: [
      'Cache shipped within the competitive window — Platform Technologies brought the product to market before their competitor. The design became the foundation of Platform Technologies\' hospitality product line, with the component library and design system continuing to be used for subsequent iterations.',
      'The project taught an important lesson about design under pressure: constraints are not the enemy of good design. The competitive deadline forced clear thinking about what mattered — and the result was a product that did a small number of things extremely well.',
    ],
    points: [
      'Shipped before competitor entered the market',
      'Online payment — from out-of-scope to headline feature',
      'Adopted as Platform Technologies\' flagship product line',
    ],
  },
  prev: { slug: 'fema',    title: 'FEMA LMS' },
  next: { slug: 'novalut', title: 'Novalut Fintech App' },
}

// ── Export ────────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [novalut, aiqem, fema, cache]

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
