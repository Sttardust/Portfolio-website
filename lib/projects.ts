// ── Project content data ─────────────────────────────────────────────────────
// One entry per case study. Structural fields (slug, accents, card visuals, meta)
// are consumed by the routes and homepage cards; the rest is the case study copy.

export type Stat        = { num: string; label: string }
export type ProcessStep = { num: string; title: string; body: string }
export type Decision    = { label: string; title: string; body: string }
export type UserRole    = { icon: string; title: string; subtitle: string; body: string; flows: string[] }
export type Outcome     = { heading: string; body: string[]; points?: string[] }

// Homepage project card (rendered by components/CaseStudies.tsx)
export type HomeCard = {
  description: string
  role:        string
  timeline:    string
  imgBg:       string        // gradient background
  chromeBg:    string        // browser-chrome bar tint
  dark:        boolean       // dark gradient → light abstract shapes
  shapes:      number[][]    // [x%, y%, w%, h%, alpha]
}

export interface Project {
  slug:      string
  num:       string            // "01", "02", …
  title:     string
  subtitle?: string
  tagline:   string
  navLabel:  string            // full label used in nav + footer, e.g. "Novalut Fintech App"
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

  // Homepage card
  card: HomeCard

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
  navLabel: 'Novalut Fintech App',
  badge:    'Mobile App · FinTech',
  accent:   '#1E3A5F',
  accentBg: '#EFF6FF',
  video:    '/novalut/final-comps.mp4',
  card: {
    description: 'A full-featured neo-banking app for Ethiopians worldwide. It spans 14 modules, from onboarding and core banking to merchant tools, FX, and AI-assisted lending, built for four very different users in one coherent system.',
    role:        'UX Designer (Solo)',
    timeline:    '2025–2026',
    chromeBg:    'rgba(0,0,0,0.4)',
    imgBg:       'linear-gradient(160deg, #070A13 0%, #0E1220 30%, #14182A 55%, #1E2B4A 80%, #1E3A5F 100%)',
    dark:        true,
    shapes: [
      [30, 10, 40, 60, 0.08],
      [10, 15, 20, 40, 0.07],
      [62, 15, 26, 40, 0.07],
      [10, 60, 80, 5,  0.12],
      [10, 70, 55, 4,  0.09],
    ],
  },
  meta: [
    { label: 'Client',    value: 'Amhara Bank' },
    { label: 'Role',      value: 'UX Designer (Solo)' },
    { label: 'Platform',  value: 'Mobile App + Web Portal' },
    { label: 'Status',    value: 'Shipped · 2025–2026' },
  ],
  overview: [
    'Wedaje Neo, branded as Novalut, is a full-featured neo-banking app commissioned by Amhara Bank, one of Ethiopia\'s major commercial banks. The goal was a mobile-first banking experience that works for Ethiopians everywhere: tech-savvy students in Addis Ababa, first-time bankers in rural towns, diaspora users abroad, and merchants running growing businesses.',
    'I was the sole UX Designer and owned the full UX strategy: research, competitive analysis, and personas, through to user flows, feature architecture, and a high-fidelity design system covering 14 modules across the whole financial lifecycle.',
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
      'I ran a two-layer competitive audit: global fintech platforms (Wise, Revolut, Payoneer) and local Ethiopian apps (Dashen Bank, Telebirr, Michu). The finding was consistent. No product covered the full range of Ethiopian users\' needs, so Novalut set out to close those gaps in one place.',
      'The platform had to serve four very different people: a university student who refuses to set foot in a branch, a first-time rural banker who needs an Amharic interface and offline access, a diaspora engineer sending money home from Minnesota who expects Revolut-level transparency, and a boutique owner in Bahir Dar who needs QR payments, a sales dashboard, and merchant loans in one app.',
    ],
    quote: 'The problem was never a single missing feature. It was that no one had built banking around Ethiopians first. That idea guided every decision that followed.',
  },
  users: {
    heading: 'Four personas. One platform. Wildly different needs.',
    body: 'The hard part was designing one coherent system for users with genuinely different mental models, skill levels, and financial needs.',
    roles: [
      {
        icon: '👨🏾‍💻',
        title: 'Yared',
        subtitle: 'The Digital Native · 22 · Addis Ababa',
        body: 'University student. Wants banking that feels like social media: fast, modern, rewarding. Refuses to visit a branch.',
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
        body: 'Audited global fintech platforms (Wise, Revolut, Payoneer) and local Ethiopian apps (Dashen Bank, Telebirr, Michu). The finding: no product served the full range of Ethiopian users, so Novalut was scoped to close each gap I found.',
      },
      {
        num: '02',
        title: 'Persona Development & User Research',
        body: 'Built four detailed personas, each with a genuinely different mental model, skill level, and financial need. Every design decision was checked against all four before it moved forward.',
      },
      {
        num: '03',
        title: 'User Flow Architecture',
        body: 'Designed and iterated seven flow charts in FigJam covering every core journey. The first client review surfaced four gaps, which I built in: a loan application flow, dispute handling, notifications, and QR payment paths.',
      },
      {
        num: '04',
        title: 'Feature Architecture (14 Modules)',
        body: 'Mapped the full product scope: Onboarding and KYC, Core Banking, Card Service, Neo Wallet, Payments, Lending, Foreign Exchange, Merchant Tools, AI Support, Loyalty and VIP, Offline Capability, and BaaS plus third-party APIs. Each module got its own information architecture before any UI work began.',
      },
      {
        num: '05',
        title: 'High-Fidelity Design System',
        body: 'Built the complete mobile UI in Figma, using a navy and gold palette to signal premium banking, with Amharic and English typography handled throughout. Delivered a full component library with annotated developer specs.',
      },
    ],
  },
  decisions: {
    heading: 'The choices that defined the product.',
    items: [
      {
        label: 'Onboarding',
        title: 'Feature-first onboarding: value before signup',
        body: 'Rather than asking people to sign up cold, the welcome screen leads with five clear benefits: instant credit, a Visa card, an FX account, merchant tools, and savings. People see what they get before they commit.',
      },
      {
        label: 'Authentication',
        title: 'Identity-first, friction-last login',
        body: 'The login screen shows the user\'s profile photo and masked phone number straight away, confirming who they are before asking for a PIN. A fingerprint button offers a one-touch alternative, signalling both personalisation and security.',
      },
      {
        label: 'Transfer UX',
        title: 'Reducing the most common action to its essential steps',
        body: 'The transfer screen opens with recent recipients as contact bubbles for one-tap "Send again." Four transfer destinations are clearly separated, and a floating QR scan button handles the payment path added after client feedback.',
      },
      {
        label: 'Personalisation',
        title: 'Drag-and-drop action customisation',
        body: 'Users can rearrange their 11 quick actions on the home screen. Personalisation is built in rather than bolted on, which speaks directly to Yared\'s wish for an app that feels made for him.',
      },
      {
        label: 'Multilingual',
        title: 'Four languages, treated as equals',
        body: 'Amharic, Oromo, Somali, and English were treated as equal options, not translations layered onto an English-first product. That shaped field sizing, font choices, and the layout of text-heavy screens throughout.',
      },
    ],
  },
  outcome: {
    heading: 'A platform that treats Ethiopians as the primary user.',
    body: [
      'Novalut shipped as a complete, developer-ready design system: 14 modules, 7 user flow charts, and a full component library with annotated specs, covering all four persona groups.',
      'It showed that one platform can serve people as different as a first-time rural banker and a diaspora professional abroad, as long as the information architecture follows their real mental models instead of a Western fintech default.',
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
  navLabel:'AiQEM AdTech Dashboard',
  badge:   'Web Dashboard · AdTech',
  accent:  '#4C1D95',
  accentBg:'#F5F3FF',
  card: {
    description: 'An end-to-end advertising analytics dashboard for AiQEM Tech. It surfaces five core data types across a modular interface for two distinct user types, built to do away with manual reporting.',
    role:        'UX Designer (Solo)',
    timeline:    '2023–2025',
    chromeBg:    'rgba(255,255,255,0.07)',
    imgBg:       'linear-gradient(160deg, #1E0459 0%, #3B0764 25%, #4C1D95 55%, #5B21B6 80%, #6D28D9 100%)',
    dark:        true,
    shapes: [
      [4,  16, 18, 55, 0.12],
      [26, 16, 70, 22, 0.10],
      [26, 42, 33, 8,  0.10],
      [62, 42, 34, 8,  0.10],
      [26, 55, 70, 14, 0.08],
    ],
  },
  meta: [
    { label: 'Client',   value: 'AiQEM Tech' },
    { label: 'Role',     value: 'UX Designer (Solo)' },
    { label: 'Platform', value: 'Web Dashboard' },
    { label: 'Timeline', value: '2023–2025' },
  ],
  overview: [
    'AiQEM Tech is an Ethiopian AI and blockchain company providing advertising analytics services to businesses. As their in-house UX Designer, I designed an end-to-end advertising analytics dashboard that gave marketing teams and their clients a single place to track, analyse, and act on campaign performance data.',
    'The product surfaced five core data types (impressions, click-through rates, campaign spend, audience segments, and conversion funnels) across a modular dashboard. The challenge was presenting that much data without overwhelming people who needed to make fast, confident decisions.',
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
      'AiQEM\'s campaign managers spent significant time each week manually assembling data from separate tools to build client reports. The dashboard needed to remove that work entirely while serving two very different users at once.',
      'The internal team needed to move fast: scanning across campaigns, spotting anomalies, and adjusting targeting in real time. Clients needed confidence that their budget was working, without having to understand the data underneath.',
    ],
    quote: 'The hardest problem wasn\'t choosing the right chart type. It was deciding what not to show, and when.',
  },
  users: {
    heading: 'Two types of users, different goals, same dashboard.',
    body: 'The dashboard served two distinct groups. Designing for both at once without fragmenting the experience was one of the core UX challenges.',
    roles: [
      {
        icon: '📊',
        title: 'AiQEM Internal Team',
        subtitle: 'Campaign managers',
        body: 'Needed to move fast: scanning across campaigns, spotting anomalies, and adjusting targeting or spend in real time.',
        flows: ['Cross-campaign overview at a glance', 'Quick anomaly detection (CTR drops, budget overruns)', 'Efficient filtering across campaigns and timeframes', 'Export data for client reporting'],
      },
      {
        icon: '🏢',
        title: 'Clients & Advertisers',
        subtitle: 'View-only access',
        body: 'Not deep analytics users. They needed confidence that their budget was working and their ads were reaching the right people.',
        flows: ['Clear progress against campaign goals', 'Understandable data, no jargon', 'Proof of reach and audience quality', 'Simple date range filtering'],
      },
    ],
  },
  process: {
    heading: 'From stakeholder interviews to developer handoff.',
    steps: [
      {
        num: '01',
        title: 'Stakeholder Interviews & Discovery',
        body: 'Interviewed AiQEM\'s campaign managers about their daily workflow: how they moved between tools, what decisions they had to make quickly, and where the friction was. The key finding was how much time went each week into assembling data by hand. The dashboard needed to remove that.',
      },
      {
        num: '02',
        title: 'Competitive Audit',
        body: 'Audited Google Ads, Meta Ads Manager, and HubSpot\'s analytics, looking at how each handled data density, filtering, and dual-user access. The best tools leaned on progressive disclosure and persistent global filters, two patterns I carried straight into the design.',
      },
      {
        num: '03',
        title: 'Information Architecture',
        body: 'Defined the module structure and navigation model before touching any UI. Key decision: a left-rail nav with five fixed modules, each containing its own filters and sub-views. A persistent global header with date range and campaign selectors applies context across all modules at once.',
      },
      {
        num: '04',
        title: 'Wireframes & Iteration',
        body: 'Lo-fi wireframes tested with AiQEM\'s internal team across 3 rounds. The most useful feedback: the first design surfaced too many chart types at once. I added a view-toggle pattern (table vs. chart vs. summary card) to every module as a result.',
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
        body: 'Every module opens with a summary card showing the single most important number: total impressions, overall CTR, total spend. Detail sits one click away rather than on screen by default. Someone could scan the whole dashboard in under ten seconds for a health check, then drill in where needed.',
      },
      {
        label: 'Filtering system',
        title: 'Global filters that persist across all modules',
        body: 'A global campaign selector and date-range picker live in the top navigation, and any filter set there applies to every module at once. That solved the orientation problem: people always know what they are looking at is consistent across views.',
      },
      {
        label: 'Chart language',
        title: 'Standardised visual patterns across modules',
        body: 'I defined a consistent chart grammar: time-series data always uses area charts, breakdowns always use horizontal bars, funnels always use the same step-down shape. People learn the visual language once, and after that pattern recognition makes moving between modules quick.',
      },
      {
        label: 'Dual-user design',
        title: 'One dashboard, two permission levels',
        body: 'Rather than building separate interfaces for the internal team and clients, one dashboard adapts to permission level. Internal users see all campaigns, clients see only theirs, and the underlying UI is identical, which kept design and build simpler.',
      },
    ],
  },
  outcome: {
    heading: 'A single source of truth, delivered under a tight deadline.',
    body: [
      'The dashboard was delivered as a complete Figma handoff covering all five data modules with a fully documented design system, component library, and annotated specifications.',
      'AiQEM needed to ship before a competitor reached the market, which meant making fast, well-reasoned calls instead of over-deliberating. Progressive disclosure and persistent filtering solved the data-density problem cleanly, and happened to be the most buildable option too.',
      'It pulled together what used to take several separate tools into one coherent experience, and gave AiQEM something they could confidently demo to clients.',
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
  tagline:  'A learning platform built for Ethiopian students, from scratch.',
  navLabel: 'FEMA LMS',
  badge:    'Mobile App · EdTech',
  accent:   '#065F46',
  accentBg: '#F0FDF4',
  card: {
    description: 'A mobile learning management system built from scratch for Ethiopian students. It serves four user types (student, teacher, parent, admin) in one bilingual platform, designed in 7 weeks at the 10 Academy Accelerator.',
    role:        'UX Designer (Solo)',
    timeline:    '2023–2024',
    chromeBg:    'rgba(255,255,255,0.09)',
    imgBg:       'linear-gradient(160deg, #022C22 0%, #065F46 40%, #0F766E 70%, #14B8A6 100%)',
    dark:        true,
    shapes: [
      [28, 12, 44, 62, 0.09],
      [8,  14, 17, 55, 0.08],
      [75, 14, 17, 55, 0.08],
      [8,  72, 84, 5,  0.12],
      [8,  80, 60, 4,  0.09],
    ],
  },
  meta: [
    { label: 'Context',  value: '10 Academy Accelerator' },
    { label: 'Role',     value: 'UX Designer (Solo)' },
    { label: 'Platform', value: 'Mobile App · iOS & Android' },
    { label: 'Timeline', value: '7 weeks · 2023–2024' },
  ],
  overview: [
    'FEMA (Future Education Mastery Accelerator, from a Ge\'ez root meaning "the fire that is to be kindled within us") is an Ethiopian education platform built to make quality learning reachable for students across the country.',
    'I designed it during the 10 Academy UX Design Accelerator: a complete mobile learning management system built from nothing, with no existing product and no prior research to lean on.',
    'The scope was broad. One app had to serve four very different users (students, teachers, parents, and administrators), each with their own goals, workflows, and permissions, and still feel cohesive and simple rather than like four apps stitched together.',
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
      'Ethiopia has one of the youngest, fastest-growing populations in the world, but its education system carries real infrastructure gaps: overcrowded classrooms, little access to extra learning material, and almost no digital link between teachers, students, and parents.',
      'Existing LMS platforms (Moodle, Google Classroom) are built for Western contexts: they require stable internet, assume English literacy, and offer no pathway for parents to monitor a young child\'s progress or for administrators to approve content before it reaches students.',
      'FEMA needed to solve for this context specifically: low-bandwidth environments, bilingual content (Amharic and English), age-appropriate access controls, and a content approval workflow so administrators could check quality before it reached students.',
    ],
    quote: 'The opportunity wasn\'t only a learning app. It was the trusted system Ethiopian education was missing: one place connecting students, teachers, parents, and schools.',
  },
  users: {
    heading: 'Four roles. One shared system.',
    body: 'The most complex part was building a system that felt tailored to each user type without fragmenting the experience.',
    roles: [
      {
        icon: '📚',
        title: 'Student',
        subtitle: 'Primary learner',
        body: 'The core user. Students above Grade 6 can create their own account; younger ones go through a parent-created profile, an age gate that shaped the whole onboarding flow.',
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
        body: 'Admins run the whole platform: approving or declining teacher-submitted content, managing roles, viewing platform-wide analytics, and handling escalated parent questions.',
        flows: ['Approve / decline course content', 'Create teacher & sub-admin accounts', 'Platform data & analytics dashboard', 'Handle escalated unanswered questions'],
      },
    ],
  },
  process: {
    heading: '7 weeks from blank canvas to prototype.',
    steps: [
      { num: 'W1',   title: 'Competitive Analysis', body: 'Audited Google Classroom, Moodle, Duolingo, and local Ethiopian edtech tools. Identified gaps: none offered bilingual support, offline-first thinking, or an age-gated parent/child account structure.' },
      { num: 'W1–2', title: 'Personas & User Flow Mapping', body: 'Built 4 detailed personas and mapped full user-flow charts for all four roles, noting where flows intersect (a teacher\'s grade triggers a parent notification) and where they diverge. The student flow alone had 15+ decision nodes, including the Grade 6 age-gate branch.' },
      { num: 'W2–3', title: 'User Journey Mapping & IA', body: 'Created end-to-end journey maps for the student and teacher, tracking touchpoints, emotional states, and key moments from first launch to course completion. Built the full site map across all 4 roles and 40+ screens.' },
      { num: 'W3–4', title: 'Lo-fi Wireframing', body: 'Wireframed every core screen for each role in Figma, putting information architecture ahead of visual design. Key calls: bottom-tab navigation with a central action button for students and teachers, simpler 2-level navigation for parents, and a data-dense dashboard for admins.' },
      { num: 'W5–6', title: 'Branding + High-Fidelity Design', body: 'Designed the FEMA logo, colour palette, and type system, then moved to high-fidelity screens, applying the brand across all 40+ screens with consistent components, motion, and interaction states.' },
      { num: 'W7',   title: 'Prototype, Testing & Finalisation', body: 'Built a clickable Figma prototype and ran walkthroughs with the team, then iterated on the feedback and finalised the design for developer handoff, including a full component library and annotated specs.' },
    ],
  },
  decisions: {
    heading: 'The choices that shaped the product.',
    items: [
      {
        label: 'Age-gated onboarding',
        title: 'Protecting younger users from day one',
        body: 'Students in Grade 6 and below can\'t create accounts on their own; the system routes them through a parent-created profile. This wasn\'t a technical limitation, it was a deliberate choice to protect younger users while keeping parents informed and in control from day one.',
      },
      {
        label: 'Onboarding quiz',
        title: 'Skippable, but worth doing',
        body: 'New students are offered an optional course evaluation quiz at first launch. Completing it unlocks a personalised course recommendation list tailored to their grade and knowledge level. This creates immediate value for engaged users without blocking access for those who want to explore freely.',
      },
      {
        label: 'Content pipeline',
        title: 'Admin approval before anything reaches students',
        body: 'Teachers submit course content to admins before it goes live. This was a core trust mechanism, so FEMA could hold a consistent bar on quality and curriculum. Declined content came back with clear admin feedback so teachers could revise.',
      },
      {
        label: 'Bilingual design',
        title: 'Amharic and English, side by side',
        body: 'Every screen was designed with both Amharic and English in mind from the start, not bolted on later. That shaped field sizing, font choices, and how text-heavy screens were laid out to handle the longer word lengths common in Amharic script.',
      },
    ],
  },
  outcome: {
    heading: 'A complete, developer-ready design system for a platform that didn\'t exist.',
    body: [
      'Over 7 weeks I delivered a fully documented design system for all four roles (student, teacher, parent, and admin) across 40+ screens, with a complete component library, annotated specs, and a clickable Figma prototype.',
      'It made a point I keep coming back to: complex multi-role systems don\'t have to feel complex. Investing early in user flows and information architecture meant the final product felt cohesive and approachable for every user type, despite everything happening underneath.',
    ],
    points: [
      '40+ screens across 4 user roles, designed and documented',
      'Full design system and component library delivered',
      'Bilingual (Amharic and English) from day one',
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
  navLabel:'Cache Menu App',
  badge:   'Mobile App · Hospitality',
  accent:  '#92400E',
  accentBg:'#FFFBEB',
  card: {
    description: 'A digital room-service and food-ordering system for Ethiopian hotels, replacing paper menus, phone calls, and cash-only payment with a smooth mobile experience. Shipped before a competitor reached the market.',
    role:        'UX Designer',
    timeline:    '2022–2023',
    chromeBg:    'rgba(0,0,0,0.35)',
    imgBg:       'linear-gradient(160deg, #1C0A00 0%, #451A03 30%, #78350F 60%, #92400E 80%, #B45309 100%)',
    dark:        true,
    shapes: [
      [30, 10, 40, 60, 0.09],
      [10, 14, 17, 55, 0.08],
      [73, 14, 17, 55, 0.08],
      [10, 72, 80, 5,  0.13],
      [10, 80, 56, 4,  0.10],
    ],
  },
  meta: [
    { label: 'Client',   value: 'Platform Technologies PLC' },
    { label: 'Role',     value: 'UX Designer' },
    { label: 'Platform', value: 'Mobile App · Hospitality' },
    { label: 'Timeline', value: 'Jun 2022 – Jan 2023' },
  ],
  overview: [
    'Cache is the flagship product of Platform Technologies PLC, a digital room-service and food-ordering system for Ethiopian hotels. Guests can browse menus, place orders, pay online, and track delivery from their phone, replacing the printed menu, phone-based ordering, and cash-only payment that dominated the market.',
    'I joined as UX Designer under real competitive pressure: Platform Technologies needed to ship Cache before a rival launched something similar. That shaped everything, from tight timelines and fast iteration to a bias toward decisions that were both good design and quick to build.',
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
      'Ethiopian hotels ran almost entirely on paper menus and phone-based room service. It was slow and full of friction: menus were often out of date, ordering meant calling the front desk and hoping someone picked up, and cash was the only way to pay.',
      'For hotel staff, the situation was equally chaotic: handwritten orders, verbal miscommunications with the kitchen, and no centralised view of what was being ordered or when it was expected to arrive.',
    ],
    quote: 'The brief wasn\'t simply "make a digital menu." It was to redesign the whole ordering loop, from first tap to food at the door, and make it feel as easy as ordering from Uber Eats but built for an Ethiopian hotel.',
  },
  process: {
    heading: 'Fast, focused, and feedback-driven.',
    steps: [
      {
        num: '01',
        title: 'Contextual Research',
        body: 'Walked through the existing room-service process at partner hotels with the Platform Technologies team and mapped the full guest and staff journey to find the worst friction. Ordering, payment, and communication came out as the three pain points to solve first.',
      },
      {
        num: '02',
        title: 'Competitive Reference',
        body: 'Audited food ordering apps for mental model patterns: Uber Eats for ordering flow, Marriott Bonvoy for room service experience, and local Ethiopian apps for context on what patterns users were already familiar with. The goal was to build on existing mental models rather than invent new ones.',
      },
      {
        num: '03',
        title: 'Wireframes & Flow Design',
        body: 'Lo-fi wireframes of the full guest journey: browse, customise, cart, checkout, track. I shared them with the team for feedback before going to high fidelity. This stage is where two big simplifications surfaced: a flat list became category tabs, and a multi-screen checkout became two steps.',
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
        body: 'The first flow had too many screens between adding an item and confirming an order. The revised flow added a persistent cart drawer reachable from anywhere in the menu and a two-step checkout (review cart, then confirm). Returning guests can reorder in a single tap from their history.',
      },
      {
        label: 'Online payment',
        title: 'From afterthought to core feature',
        body: 'Online payment wasn\'t in the original scope. Hotel partners made clear it was non-negotiable: guests increasingly expected to pay digitally, and cash-on-delivery alone was a reason to skip the app. It became a core feature, with mobile money and room-charge options built cleanly into checkout.',
      },
    ],
  },
  outcome: {
    heading: 'Shipped before the competition. Adopted as Platform Technologies\' flagship product.',
    body: [
      'Cache shipped inside the competitive window, ahead of the rival product. It became the foundation of Platform Technologies\' hospitality line, and the component library and design system carried on into later versions.',
      'The project taught me something about working under pressure: constraints aren\'t the enemy of good design. The deadline forced clear thinking about what actually mattered, and the result did a small number of things really well.',
    ],
    points: [
      'Shipped before competitor entered the market',
      'Online payment, from out-of-scope to headline feature',
      'Adopted as Platform Technologies\' flagship product line',
    ],
  },
  prev: { slug: 'fema',    title: 'FEMA LMS' },
  next: { slug: 'novalut', title: 'Novalut Fintech App' },
}

// ── Export ────────────────────────────────────────────────────────────────────
export const PROJECTS: Project[] = [novalut, aiqem, fema, cache]

// Single source of truth for nav + footer link lists.
export const PROJECT_LINKS = PROJECTS.map(p => ({ label: p.navLabel, href: `/${p.slug}` }))

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
