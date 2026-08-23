import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

const faqSeed = [
  {
    page: 'MAIN' as const,
    label: 'BOOKING & SCHEDULING',
    title: 'Booking your session.',
    sortOrder: 1,
    faqs: [
      {
        question: 'How do I book a session?',
        answer:
          'Book directly through our website, WhatsApp us on +961 76 577 070, or call. We confirm every booking within 2 hours during business hours.',
        sortOrder: 1,
      },
      {
        question: 'How far in advance should I book?',
        answer:
          'For weekend and evening slots, book 3–5 days ahead. Weekday morning and afternoon slots often have same-week availability. Package holders get priority booking.',
        sortOrder: 2,
      },
      {
        question: 'What if I need to cancel or reschedule?',
        answer:
          "We require 24 hours' notice. Within 24 hours, or no-shows, are charged in full. If KURE cancels last-minute, you receive a complimentary session.",
        sortOrder: 3,
      },
      {
        question: 'Can I book the same therapist every time?',
        answer:
          'Yes — we prioritize continuity of care. Just mention your preferred therapist when booking.',
        sortOrder: 4,
      },
    ],
  },
  {
    page: 'MAIN' as const,
    label: 'SESSIONS',
    title: 'During your session.',
    sortOrder: 2,
    faqs: [
      {
        question: 'What should I expect during my first KURE session?',
        answer:
          'Your therapist arrives on time, sets up quietly, and starts with a brief conversation to understand your body, tension, and preferences. Every session begins with intention.',
        sortOrder: 1,
      },
      {
        question: 'Are your therapists licensed?',
        answer:
          'Yes — all KURE therapists are licensed Lebanese professionals, KURE-trained, and members of the World Massage Federation.',
        sortOrder: 2,
      },
      {
        question: 'Gender-matching policy?',
        answer:
          'Female therapists treat female clients; male therapists treat male clients. No exceptions — this protects everyone.',
        sortOrder: 3,
      },
      {
        question: "What if the pressure isn't right?",
        answer:
          "Speak up anytime. Your therapist checks in during the session, but you're always in control. Pressure adjustments are welcome at any point.",
        sortOrder: 4,
      },
      {
        question: 'What should I wear?',
        answer:
          'Comfortable underwear is standard. Draping protects your modesty throughout the session — only the area being worked on is uncovered.',
        sortOrder: 5,
      },
    ],
  },
  {
    page: 'MAIN' as const,
    label: 'IN-HOME',
    title: 'In-home sessions.',
    sortOrder: 3,
    faqs: [
      {
        question: 'Do I need to provide anything?',
        answer:
          'Just a quiet space (about 2m × 3m) and 2 clean towels — one for draping, one for the massage bed. We bring the portable bed, oils, and music. Towels are not provided for in-home sessions.',
        sortOrder: 1,
      },
      {
        question: 'Do you cover my area?',
        answer:
          'We cover Mount Liban, Beirut, Batroun, Jbeil, Khalde, Hamra, Rabieh, Maten, and Kesserwan. WhatsApp us to check your specific location.',
        sortOrder: 2,
      },
      {
        question: 'Is there an extra fee for in-home?',
        answer:
          'In-home sessions include transportation within our coverage zones. Locations outside standard coverage may incur a small transport fee — confirmed at booking.',
        sortOrder: 3,
      },
    ],
  },
  {
    page: 'MAIN' as const,
    label: 'PACKAGES & PAYMENT',
    title: 'Packages & payment.',
    sortOrder: 4,
    faqs: [
      {
        question: 'How do I pay?',
        answer:
          'Card, bank transfer, Whish, or cash (at our wellness houses). In-home sessions require prepayment.',
        sortOrder: 1,
      },
      {
        question: 'How long are packages valid?',
        answer:
          '5-session package: 3 months. 10-session package: 6 months. Extensions for verified medical reasons only.',
        sortOrder: 2,
      },
      {
        question: 'Can I redeem my package sessions at home?',
        answer:
          'Yes — your paid package sessions are redeemable In-Home or in-clinic (KURE Dbayeh or KURE Verdun). Only the bonus/free sessions included with 5 & 10-session packages (+1 Free Facial, +1 Free Session) are in-clinic only.',
        sortOrder: 3,
      },
      {
        question: 'Are packages refundable?',
        answer:
          'Refunds are only granted for verified medical reasons, pro-rated on remaining sessions with a 10% admin fee.',
        sortOrder: 4,
      },
      {
        question: 'Can I gift a session?',
        answer:
          'Yes — see our Gift Vouchers page. Vouchers are transferable, valid for 2 months, and beautifully packaged.',
        sortOrder: 5,
      },
    ],
  },
  {
    page: 'PACKAGES' as const,
    label: 'COMMON QUESTIONS',
    title: 'Package FAQ.',
    sortOrder: 1,
    faqs: [
      {
        question: 'Can I use my package across different services?',
        answer:
          'Yes — any paid package session can be used on any signature service: massage, sculpting, drainage, or facial.',
        sortOrder: 1,
      },
      {
        question: 'Can I share my package with a friend or family member?',
        answer:
          'Packages are personal and non-transferable. For gifting, use a KURE gift voucher instead.',
        sortOrder: 2,
      },
      {
        question: "What if I don't finish my package in time?",
        answer:
          '5-session packages are valid for 3 months; 10-session packages for 6 months. Extensions are granted for verified medical reasons only.',
        sortOrder: 3,
      },
      {
        question: 'Can I upgrade from 5 to 10?',
        answer:
          'Yes — WhatsApp us and we’ll apply the difference so you move to the 10-session tier and validity window.',
        sortOrder: 4,
      },
      {
        question: 'Are packages refundable?',
        answer:
          'Refunds are only granted for verified medical reasons, pro-rated on remaining sessions with a 10% admin fee.',
        sortOrder: 5,
      },
    ],
  },
  {
    page: 'ACADEMY' as const,
    label: 'COMMON QUESTIONS',
    title: 'Academy FAQ.',
    sortOrder: 1,
    faqs: [
      {
        question: 'Do I need existing licensure to attend?',
        answer:
          'For most workshops, a massage therapy license (or equivalent) is required. Some introductory workshops are open to broader wellness professionals.',
        sortOrder: 1,
      },
      {
        question: 'Are workshops open to international students?',
        answer:
          'Yes. Workshops are held in Beirut. Students from GCC and neighboring countries are welcome.',
        sortOrder: 2,
      },
      {
        question: 'How much does a workshop cost?',
        answer:
          'Pricing varies by duration and certification level. Current pricing shared at enrollment.',
        sortOrder: 3,
      },
      {
        question: 'What language are the workshops taught in?',
        answer:
          'English and Arabic. French available upon request for full-cohort workshops.',
        sortOrder: 4,
      },
      {
        question: 'Can I work at KURE after completing a workshop?',
        answer:
          'Workshop completion does not guarantee employment. Top-performing students are invited to interview for our therapist team.',
        sortOrder: 5,
      },
      {
        question: 'How many students per workshop?',
        answer:
          'Small class sizes (typically 6–12) to ensure personalized instruction and hands-on practice.',
        sortOrder: 6,
      },
    ],
  },
];

const testimonialSeed = [
  {
    label: 'Signature Sessions',
    title: 'On the sessions.',
    sortOrder: 1,
    testimonials: [
      {
        name: 'Nada A.',
        subtitle: 'Madero · Dbayeh',
        content:
          "The session was great. I am super impressed how professional and talented the therapist is. It's rare to see this kind of service in Lebanon.",
        sortOrder: 1,
      },
      {
        name: 'Rania K.',
        subtitle: 'Package · In-Home',
        content:
          "I started the 5-session package thinking I'd try it. Three sessions in, I felt real change. KURE is not a spa — it is something else.",
        sortOrder: 2,
      },
      {
        name: 'Layal M.',
        subtitle: 'Facial · Verdun',
        content:
          'The therapist arrived exactly on time. Everything was prepared. The room was calm. This is how wellness should feel.',
        sortOrder: 3,
      },
    ],
  },
  {
    label: 'In-Home',
    title: 'On coming to you.',
    sortOrder: 2,
    testimonials: [
      {
        name: 'Karim S.',
        subtitle: 'Signature · In-Home Beirut',
        content:
          "I've had massages at spas across Europe. The KURE therapist who came to my apartment matched anything I've had abroad.",
        sortOrder: 1,
      },
      {
        name: 'Yara M.',
        subtitle: 'Body Massage · In-Home Jounieh',
        content:
          "Setup took 10 minutes. The session was 80 minutes. I fell asleep. That's a first at home.",
        sortOrder: 2,
      },
      {
        name: 'Rita K.',
        subtitle: 'Lymphatic · In-Home Kaslik',
        content:
          "My mother lives in Kaslik and doesn't drive. KURE arrives, cares for her, leaves. This changed her month.",
        sortOrder: 3,
      },
    ],
  },
  {
    label: 'Corporate & Events',
    title: 'On team & gathering wellness.',
    sortOrder: 3,
    testimonials: [
      {
        name: 'Nour H., Head of People',
        subtitle: 'Corporate Wellness Day',
        content:
          "Our wellness day boosted the entire team's mood for a week. The KURE therapists were professional, warm, and unforgettable.",
        sortOrder: 1,
      },
      {
        name: 'Marc J., Founder',
        subtitle: 'Corporate Retreat',
        content:
          "For our end-of-quarter retreat, KURE's morning stretching and evening massage program was the highlight — clients still mention it.",
        sortOrder: 2,
      },
      {
        name: 'Layla T.',
        subtitle: 'Bridal Event · Batroun',
        content:
          'KURE turned my bachelorette weekend into the most memorable moment for me and my girls. Every detail was thought through.',
        sortOrder: 3,
      },
    ],
  },
  {
    label: 'KURE Academy',
    title: 'On the training.',
    sortOrder: 4,
    testimonials: [
      {
        name: 'Sarah G.',
        subtitle: 'Madero Certification',
        content:
          'Coming from a physio background, KURE Academy elevated my touch. The Madero training changed how I work.',
        sortOrder: 1,
      },
      {
        name: 'Ali D.',
        subtitle: 'Lymphatic Drainage Cert.',
        content:
          'Small class, real hands-on time with the trainer, and a certificate that means something in the industry.',
        sortOrder: 2,
      },
      {
        name: 'Maya R.',
        subtitle: 'Body Massage Fundamentals',
        content:
          'The KURE method is beautiful — respectful, precise, and deeply human. I recommend the Academy to every therapist I meet.',
        sortOrder: 3,
      },
    ],
  },
];

const heroSeed = [
  {
    page: 'HOME' as const,
    eyebrow: 'MASSAGE · RITUALS · RESULTS',
    title: 'Wellness,',
    titleAccent: 'delivered.',
    description:
      'Premium massage therapy, sculpting, lymphatic, facial, and recovery — practiced by trained hands and delivered at home, at KURE Dbayeh, and at KURE Verdun.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
    secondaryCtaLabel: 'EXPLORE SERVICES',
    secondaryCtaHref: '/services',
    highlights: [
      'SINCE 2018',
      'WORLD MASSAGE FEDERATION MEMBER',
      'LICENSED LEBANESE THERAPISTS',
    ],
  },
  {
    page: 'SERVICES' as const,
    eyebrow: 'SIGNATURE SERVICES',
    title: 'Every service,',
    titleAccent: 'protocol by protocol.',
    description:
      "Full menu of KURE's signature treatments — with pricing, durations, and locations. Every service built on trained technique.",
    primaryCtaLabel: 'BOOK YOUR SESSION',
    secondaryCtaLabel: 'SAVE WITH A PACKAGE',
    secondaryCtaHref: '/packages',
  },
  {
    page: 'PACKAGES' as const,
    eyebrow: 'MAKE WELLNESS A HABIT',
    title: 'Save with a',
    titleAccent: 'package.',
    description:
      'Prepay for 5 or 10 sessions and save on every visit. Priority booking. Extended validity. Consistency is where results happen.',
    primaryCtaLabel: 'CHOOSE YOUR PACKAGE',
    primaryCtaHref: '/packages',
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    eyebrow: 'GIVE THE GIFT OF WELLNESS',
    title: 'KURE',
    titleAccent: 'Gift Vouchers.',
    description:
      'Give someone you love the gift of care — a signature session, a facial ritual, or a package to enjoy at their own rhythm.',
    primaryCtaLabel: 'BUY A VOUCHER',
    secondaryCtaLabel: 'WHATSAPP TO ORDER',
    secondaryCtaHref: 'https://wa.me/96176577070',
  },
  {
    page: 'LOCATIONS' as const,
    eyebrow: 'WHERE TO FIND US',
    title: 'Two houses.',
    titleAccent: 'One protocol.',
    description:
      'KURE Dbayeh, KURE Verdun, and in-home coverage across Lebanon — same trained hands, same standards, wherever you are.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
  },
  {
    page: 'CORPORATE' as const,
    eyebrow: 'ON-SITE · FOR TEAMS · PRIVATE GATHERINGS',
    title: 'Corporate',
    titleAccent: '& Events',
    tagline: 'BY KURE',
    description:
      'Wellness for the way your team works — and the moments worth remembering. On-site programs for offices, curated experiences for gatherings.',
    primaryCtaLabel: 'PLAN YOUR PROGRAM',
    secondaryCtaLabel: 'WHATSAPP US',
    secondaryCtaHref: 'https://wa.me/96176577070',
  },
  {
    page: 'ACADEMY' as const,
    eyebrow: 'TRAINING · CERTIFICATION',
    title: 'KURE',
    titleAccent: 'Academy',
    tagline: 'BY KURE',
    description:
      'Learn the KURE method. Practical wellness workshops for therapists, wellness professionals, and anyone drawn to the art of bodywork.',
    notice:
      'Current schedule live on Instagram @kure.lb — see the Academy highlight.',
    primaryCtaLabel: 'RESERVE YOUR SPOT',
    secondaryCtaLabel: 'SEE SCHEDULE ON INSTAGRAM',
    secondaryCtaHref: 'https://www.instagram.com/kure.lb/',
  },
  {
    page: 'ABOUT' as const,
    eyebrow: 'OUR STORY',
    title: 'Wellness,',
    titleAccent: 'delivered.',
    description:
      "From one therapist to Lebanon's leading wellness ecosystem — the story of KURE.",
    primaryCtaLabel: 'BOOK YOUR SESSION',
  },
  {
    page: 'CAREERS' as const,
    eyebrow: 'CAREERS',
    title: 'Build your practice where wellness is a',
    titleAccent: 'standard.',
    tagline: 'BY KURE',
    description:
      "KURE is Lebanon's premium wellness house — two clinics, an in-home service across nine regions, and a growing training academy. If you take your craft seriously, we do too.",
    primaryCtaLabel: 'VIEW OPEN ROLES',
    secondaryCtaLabel: 'HOW TO APPLY',
    highlights: ['Since 2018', 'WMF Member', 'Licensed Lebanese Therapists'],
  },
  {
    page: 'TESTIMONIALS' as const,
    eyebrow: 'IN THEIR WORDS',
    title: 'What our clients',
    titleAccent: 'say.',
    description:
      'Real reviews from real KURE clients — one-off sessions, packages, corporate programs, events, and Academy graduates.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
  },
  {
    page: 'FAQ' as const,
    eyebrow: 'FREQUENTLY ASKED',
    title: 'Questions,',
    titleAccent: 'answered.',
    description:
      'Everything you need to know about booking, sessions, and being cared for by KURE.',
  },
  {
    page: 'TERMS' as const,
    eyebrow: 'LEGAL',
    title: 'Terms & Conditions',
    highlights: ['Version 2.0', 'June 2026', 'Wellness, delivered.'],
  },
  {
    page: 'PRIVACY' as const,
    eyebrow: 'LEGAL',
    title: 'Privacy Policy',
    highlights: ['Version 1.0', 'July 2026', 'Wellness, delivered.'],
  },
];

const sectionIntroSeed = [
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_SIZES',
    eyebrow: 'CHOOSE YOUR RHYTHM',
    title: 'Two package sizes.',
    description:
      'Pick the pace that fits your life — save on every session, book with priority.',
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    eyebrow: 'PACKAGE BENEFITS',
    title: 'What a KURE package unlocks.',
    description: null,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGES_HOW_IT_WORKS',
    eyebrow: 'HOW PACKAGES WORK',
    title: 'Three steps to save.',
    description: null,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_OPTIONS',
    eyebrow: 'VOUCHER OPTIONS',
    title: 'Choose a moment.',
    description:
      'From a single session to a full ritual package — every voucher opens the door to KURE.',
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    eyebrow: 'VOUCHER POLICY',
    title: 'The fine print.',
    description: null,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_STEPS',
    eyebrow: 'HOW GIFTING WORKS',
    title: 'Three steps to give.',
    description: null,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_HOUSES',
    eyebrow: 'THE WELLNESS HOUSES',
    title: 'Curated spaces for signature care.',
    description: null,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    eyebrow: 'IN-HOME COVERAGE',
    title: 'We come to you.',
    description:
      'In-home wellness across Lebanon — same protocols, same quality, at your door.',
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_BOOKING_ARRIVAL',
    eyebrow: 'GETTING TO KURE',
    title: 'Booking & arrival.',
    description: null,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    eyebrow: 'WHAT KURE IS TODAY',
    title: 'A wellness ecosystem.',
    description: 'Not a spa. Not a service. Something larger.',
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'MILESTONES',
    eyebrow: 'BY THE NUMBERS',
    title: 'Eight years of care, in one glance.',
    description:
      'Proud members of the World Massage Federation. Licensed. Trained. Trusted.',
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_FAQ',
    eyebrow: 'COMMON QUESTIONS',
    title: 'Package FAQ.',
    description: null,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'WHY_WORK_HERE',
    eyebrow: '01 · WHY WORK HERE',
    title: 'A house of craft, not a chain.',
    titleAccent: 'craft',
    description:
      "We invest in the therapists who deliver the KURE Standard. Here's what that means in practice.",
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'OPEN_ROLES',
    eyebrow: '02 · OPEN ROLES',
    title: 'Current openings',
    titleAccent: 'openings',
    description:
      'Roles listed below are actively hiring. Applications outside these roles are welcome — we keep qualified CVs on file for future openings.',
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'ACADEMY_PATHWAY',
    eyebrow: '03 · THE KURE ACADEMY PATHWAY',
    title: 'Train with us. Then work with us.',
    titleAccent: 'work',
    description:
      'KURE Academy is our in-house training arm — professional workshops and courses built directly from the protocols we deliver to real clients.\n\nTop-performing graduates are considered first for on-call and part-time therapist roles at KURE. It\'s the most direct path from training to a working practice in Lebanon.',
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'HOW_TO_APPLY',
    eyebrow: '04 · HOW TO APPLY',
    title: 'Four simple steps',
    titleAccent: 'simple',
    description:
      'A straightforward process — designed to respect your time and ours.',
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'TWO_OCCASIONS',
    eyebrow: 'TWO WAYS KURE ARRIVES',
    title: 'One brand of care. Two occasions.',
    description: null,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'CORPORATE_WELLNESS',
    eyebrow: 'CORPORATE WELLNESS',
    title: 'Wellness at work — measurable impact.',
    description:
      'Teams that recover perform better. Teams that feel cared for stay longer. The first and only wellness house delivering corporate programs at scale in Lebanon.',
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    eyebrow: 'WELLNESS EVENTS',
    title: 'For every gathering that matters.',
    description:
      'Bridal, birthdays, retreats, and community moments — we bring the ritual to you.',
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    eyebrow: 'WE ARRIVE WITH EVERYTHING.',
    title: 'You provide the space. We handle the rest.',
    description: null,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WHY_PARTNERS',
    eyebrow: null,
    title: 'Why partners choose KURE.',
    description: null,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'TRAINED_BY_KURE',
    eyebrow: 'TRAINED BY KURE',
    title: "The education arm of Lebanon's leading wellness ecosystem.",
    description:
      'KURE Academy trains the next generation of therapists — sharing the protocols, techniques, and philosophy that have shaped 20,000+ sessions across 8 years.\n\nEvery workshop is built on hands-on practice, grounded in science, and designed to elevate your skill and your career.',
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'WHAT_WE_TEACH',
    eyebrow: 'WHAT WE TEACH',
    title: 'Four categories. Two formats.',
    description:
      'Programs are built around four categories of technique — and delivered in two formats: a focused 4-hour Workshop, or a full 4-day Course.',
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_HOW_IT_WORKS',
    eyebrow: 'FORMAT',
    title: 'How KURE Academy works',
    description: null,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'CERTIFICATION',
    eyebrow: 'CERTIFICATION',
    title: 'Two certificates. One standard.',
    description: null,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ENROLLMENT',
    eyebrow: 'ENROLLMENT',
    title: 'How to enroll.',
    description: null,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'RECEIVE_CARE',
    eyebrow: 'WHERE YOU CAN EXPERIENCE KURE',
    title: 'Three ways to receive care.',
    description: null,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'KURE_STANDARD',
    eyebrow: 'THE KURE STANDARD',
    title: 'Every session, held to a',
    titleAccent: 'standard.',
    description: null,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'CATEGORY_STANDARD',
    eyebrow: 'THE KURE STANDARD',
    title: 'Care, held to a',
    titleAccent: 'standard.',
    description:
      'We strive for perfection every day, aiming the highest level of detail and offering the most exclusive experience.',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_PACKAGES',
    eyebrow: 'THE KURE EXPERIENCE',
    title: 'Three ways to experience KURE',
    description:
      'Choose the rhythm that fits your life — from a single session to a full package.',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_CATEGORIES',
    eyebrow: 'SIGNATURE SERVICES',
    title: 'Four categories, protocol by protocol',
    description:
      'Every service at KURE lives inside one of four signature categories — built on trained technique, not improvisation.',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_HOW_IT_WORKS',
    eyebrow: 'HOW IT WORKS',
    title: 'Three steps to your session',
    description: 'Booking KURE is intentional — like the experience itself.',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_BEYOND',
    eyebrow: 'BEYOND INDIVIDUAL SESSIONS',
    title: 'By KURE.',
    description:
      'Three ways KURE brings wellness to teams, gatherings, and future therapists.',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_TESTIMONIALS',
    eyebrow: 'IN THEIR WORDS',
    title: 'What our clients say',
    description: 'Real reviews from real KURE members and one-off clients.',
    isActive: true,
  },
];

const sectionOutroSeed = [
  {
    page: 'PACKAGES' as const,
    title: 'Ready to make wellness a',
    titleAccent: 'rhythm?',
    description: 'Choose a package. Book with priority. Save on every session.',
    primaryCtaLabel: 'CHOOSE YOUR PACKAGE',
    primaryCtaHref: '/packages',
    secondaryCtaLabel: 'TALK TO US ON WHATSAPP',
    secondaryCtaHref: 'https://wa.me/96176577070',
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    title: 'Give the gift of',
    titleAccent: 'rest.',
    description: 'Wellness — packaged, delivered, remembered.',
    primaryCtaLabel: 'BUY A VOUCHER',
    primaryCtaHref: '/gift-vouchers',
    secondaryCtaLabel: null,
    secondaryCtaHref: null,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    title: 'Wherever, however — we',
    titleAccent: 'arrive.',
    description: 'Book your session at the location that fits your life.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
    primaryCtaHref: '$OPEN_BOOKING_MODAL',
    secondaryCtaLabel: 'EXPLORE SERVICES',
    secondaryCtaHref: '/services',
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    title: 'Learn the KURE',
    titleAccent: 'method.',
    description: 'Limited seats per workshop. Reserve early.',
    primaryCtaLabel: 'RESERVE YOUR SPOT',
    primaryCtaHref: '/academy',
    secondaryCtaLabel: 'SEE FULL CALENDAR ON INSTAGRAM',
    secondaryCtaHref: 'https://www.instagram.com/kure.lb/',
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    title: 'Your body is',
    titleAccent: 'asking.',
    description: 'Reconnect with yourself — one session at a time.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
    primaryCtaHref: '$OPEN_BOOKING_MODAL',
    secondaryCtaLabel: 'VIEW PACKAGES',
    secondaryCtaHref: '/packages',
    isActive: true,
  },
  {
    page: 'TESTIMONIALS' as const,
    title: 'Your body is',
    titleAccent: 'asking.',
    description: 'Join the KURE community — one session at a time.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
    primaryCtaHref: '$OPEN_BOOKING_MODAL',
    secondaryCtaLabel: 'VIEW PACKAGES',
    secondaryCtaHref: '/packages',
    isActive: true,
  },
  {
    page: 'FAQ' as const,
    title: 'Still have a',
    titleAccent: 'question?',
    description:
      'WhatsApp us — we respond within 2 hours during business hours.',
    primaryCtaLabel: 'WHATSAPP US',
    primaryCtaHref: 'https://wa.me/96176577070',
    secondaryCtaLabel: 'CALL +961 76 577 070',
    secondaryCtaHref: 'tel:+96176577070',
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    title: 'Save more with a',
    titleAccent: 'package.',
    description:
      'Prepaid 5 or 10-session packages — real savings, priority booking.',
    primaryCtaLabel: 'VIEW PACKAGES',
    primaryCtaHref: '/packages',
    secondaryCtaLabel: 'BOOK A SINGLE SESSION',
    secondaryCtaHref: '$OPEN_BOOKING_MODAL',
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    eyebrow: 'READY TO APPLY',
    title: 'Send us your',
    titleAccent: 'CV.',
    description:
      "Whether you're a licensed therapist, a hospitality professional, or an operations person who takes wellness seriously — we'd like to hear from you.",
    primaryCtaLabel: 'WHATSAPP US',
    primaryCtaHref: 'https://wa.me/96179424701',
    secondaryCtaLabel: null,
    secondaryCtaHref: null,
    isActive: true,
  },
  {
    page: 'HOME' as const,
    title: 'Your body is',
    titleAccent: 'asking.',
    description: 'Reconnect with yourself — one session at a time.',
    primaryCtaLabel: 'BOOK YOUR SESSION',
    primaryCtaHref: '$OPEN_BOOKING_MODAL',
    secondaryCtaLabel: 'VIEW PACKAGES',
    secondaryCtaHref: '/packages',
    isActive: true,
  },
];

const legalDocumentSeed = [
  {
    page: 'TERMS' as const,
    isActive: true,
    content: `
<div class="legal-notice">
  <p>These Terms &amp; Conditions form part of your agreement with KURE. By booking a service, purchasing a package, engaging KURE for corporate wellness or events, enrolling in KURE Academy, or redeeming a gift voucher, you agree to abide by the following policies. These are designed to maintain the quality, integrity, and safety of your experience with us.</p>
  <p><strong>Contact:</strong> +961 76 577 070 · support@getkured.co · www.getkured.co</p>
</div>

<section class="legal-section">
  <h3>1. Bookings &amp; Sessions</h3>
  <ul>
    <li>All bookings are personal and non-transferable. Only the individual named in the reservation may receive the service.</li>
    <li>Services must be scheduled via official KURE channels — website booking, WhatsApp, or direct contact.</li>
    <li>In line with KURE's gender-matching policy, female therapists treat female clients and male therapists treat male clients. No exceptions.</li>
    <li>Bookings may take place in-home or at our wellness houses (KURE Dbayeh or KURE Verdun).</li>
  </ul>
</section>

<section class="legal-section">
  <h3>2. Payments</h3>
  <ul>
    <li>All payments must be completed in full prior to the session, unless a package is in effect.</li>
    <li>Payments can be made via card, bank transfer, Whish, or cash (in-clinic only).</li>
    <li>For packages, sessions must be prepaid in full to activate.</li>
    <li>For corporate and events bookings, a 50% deposit confirms the booking.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>3. Cancellations &amp; Rescheduling (Individual Sessions)</h3>
  <ul>
    <li>A minimum of 24 hours' notice is required for cancellations or rescheduling.</li>
    <li>Cancellations within 24 hours, or no-shows, will be charged in full with no refund.</li>
    <li>If KURE cancels with less than 24 hours' notice, the client receives one complimentary session plus the missed one.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>4. Lateness Policy</h3>
  <ul>
    <li>For in-home services: a delay of up to 15 minutes may occasionally occur due to traffic — no compensation applies within this window.</li>
    <li>If your therapist is more than 20 minutes late, you are entitled to the full remaining session time PLUS one complimentary session.</li>
    <li>If you are late, your session will be shortened accordingly to protect the next client's booking.</li>
    <li>If you are more than 30 minutes late, the session may be cancelled and charged in full.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>5. Package Expiry &amp; Extensions</h3>
  <div class="legal-notice"><strong>Validity by package size:</strong> 5-session packages are valid for three (3) months from the date of purchase. 10-session packages are valid for six (6) months.</div>
  <ul>
    <li>Facial Lifting 5-session packages: valid for three (3) months from purchase.</li>
    <li>5-session packages (Slimming, Body Massage): valid for three (3) months from purchase.</li>
    <li>10-session packages: valid for six (6) months from purchase.</li>
    <li>Unused sessions after the validity period will be forfeited without refund.</li>
    <li>Extensions may be granted for valid medical reasons upon written request and documentation.</li>
    <li>Packages are personal and non-transferable.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>6. Gift Voucher Terms</h3>
  <ul>
    <li>Gift vouchers are valid for two (2) months from the date of purchase.</li>
    <li>Vouchers are transferable — the giver may name the recipient at redemption.</li>
    <li>Vouchers cannot be exchanged for cash or refunded.</li>
    <li>Partial redemption: any remaining balance stays on the voucher for the remainder of its validity.</li>
    <li>Vouchers require advance booking; they cannot be used for on-demand or same-day services.</li>
    <li>Lost vouchers may be reissued with proof of purchase.</li>
    <li>Vouchers cannot be combined with promotional discounts or package rates.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>7. Corporate Wellness Terms</h3>
  <ul>
    <li>Corporate wellness bookings require a minimum of 14 days lead time (30 days for Wellness Weeks).</li>
    <li>A 50% deposit confirms the booking. Balance due 7 days before program start.</li>
    <li>Cancellation: 7+ days notice = full refund minus 10% admin fee. Under 7 days = 50% forfeited. Under 48 hours = 100% charge.</li>
    <li>Corporate clients are responsible for providing the venue and access.</li>
    <li>Non-solicitation: Corporate clients agree not to directly hire KURE therapists outside the KURE relationship, during and for 12 months following the engagement.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>8. Wellness Events Terms</h3>
  <ul>
    <li>Wellness Events require booking at least 14 days in advance (60+ for bridal).</li>
    <li>A 50% deposit confirms the booking. Balance due 7 days before the event.</li>
    <li>Cancellation: 30+ days = full refund minus admin fee. 14–30 days = 50% forfeited. Under 14 days = 100% forfeited (except verified emergencies).</li>
    <li>Final guest count must be confirmed 7 days before the event.</li>
    <li>Damage to KURE equipment at the event will be charged at replacement value.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>9. KURE Academy Terms</h3>
  <ul>
    <li>Enrollment deposit is non-refundable after the workshop start date.</li>
    <li>Before the start date: 14+ days = full refund minus admin fee. Under 14 days = 50% forfeited.</li>
    <li>Full attendance required for Certificate of Completion. Missed portions may result in Certificate of Participation only.</li>
  </ul>
  <div class="legal-notice"><strong>KURE Method IP Protection:</strong> Students may practice the method professionally. Students may NOT teach the method as their own program, present as "KURE-certified trainers" outside of KURE, or reproduce KURE proprietary sequences in commercial training programs without written authorization. Breach is grounds for legal action.</div>
</section>

<section class="legal-section">
  <h3>10. Therapist Conduct</h3>
  <ul>
    <li>KURE therapists are licensed, trained professionals bound by the KURE Code of Conduct.</li>
    <li>They do not diagnose medical conditions or prescribe treatments.</li>
    <li>If necessary, they may refer you to a medical professional before continuing service.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>11. Client Conduct</h3>
  <ul>
    <li>Sexual misconduct or inappropriate behavior will result in immediate session termination with no refund. Legal action will be pursued.</li>
    <li>Our therapists reserve the right to leave any session they deem unsafe or uncomfortable, and full session fees remain payable.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>12. Refunds</h3>
  <ul>
    <li>Refunds are provided only for medical reasons preventing completion of a package, verified by healthcare documentation.</li>
    <li>Refunds are pro-rated based on sessions remaining, minus a 10% administrative fee.</li>
    <li>Discretionary refunds may be granted by KURE Management in exceptional circumstances.</li>
    <li>Gift vouchers, deposits, and enrollment fees are non-refundable except as specified above.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>13. Data &amp; Privacy</h3>
  <ul>
    <li>Client contact details, health notes, and session records are stored securely and used only to deliver KURE services.</li>
    <li>KURE does not share client data with third parties, except payment processors and where required by Lebanese law.</li>
    <li>Full details in our Privacy Policy at www.getkured.co/privacy.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>14. Governing Law &amp; Jurisdiction</h3>
  <p>These Terms are governed by the laws of Lebanon. Any dispute arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent Lebanese courts in Beirut.</p>
</section>

<div class="legal-notice legal-notice--footer">
  <p>KURE reserves the right to update these Terms &amp; Conditions at any time. Material updates will be communicated in advance. Continued use of KURE services after an update constitutes acceptance of the revised terms.</p>
  <p><strong>Version 2.0 · Last updated: June 2026</strong></p>
</div>
`.trim(),
  },
  {
    page: "PRIVACY" as const,
    isActive: true,
    content: `
<div class="legal-notice">
  <p>Your privacy matters. This Privacy Policy explains what personal data KURE collects, how we use it, who we share it with, and the rights you have. By booking a service, purchasing a package or voucher, engaging KURE for corporate or events services, or enrolling in KURE Academy, you consent to the practices described below.</p>
  <p><strong>Contact:</strong> +961 76 577 070 · support@getkured.co · www.getkured.co</p>
</div>

<section class="legal-section">
  <h3>1. What we collect</h3>
  <ul>
    <li>Contact details — name, phone number, email, address (for in-home bookings).</li>
    <li>Health &amp; body notes — relevant medical history, injuries, tension areas, treatment preferences.</li>
    <li>Booking data — session dates, service chosen, location, therapist, feedback.</li>
    <li>Payment details — processed through secure third-party payment providers; we do not store card details.</li>
    <li>Communication history — WhatsApp, email, and call notes relating to your bookings.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>2. How we use it</h3>
  <ul>
    <li>To deliver your sessions — assign the right therapist, honor your preferences, track continuity.</li>
    <li>To communicate with you — booking confirmations, reminders, service updates, aftercare.</li>
    <li>To improve our service — anonymized data helps us refine protocols, training, and operations.</li>
    <li>To meet legal and financial obligations — invoicing, tax records, regulatory compliance.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>3. Who we share it with</h3>
  <ul>
    <li>Your assigned therapist — for session delivery only.</li>
    <li>Payment processors — for transaction processing; they follow their own privacy policies.</li>
    <li>Legal authorities — only where required by Lebanese law.</li>
    <li>We do <strong>not</strong> sell your data. We do <strong>not</strong> share it with advertisers or unrelated third parties.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>4. How we store it</h3>
  <ul>
    <li>Data is stored on secure, access-controlled systems.</li>
    <li>Health notes are visible only to the assigned therapist and KURE Management.</li>
    <li>Payment data is never stored on our servers — handled by our payment providers.</li>
    <li>Data is retained for as long as needed to deliver service and meet legal obligations.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>5. Your rights</h3>
  <ul>
    <li>Access — request a copy of the data we hold about you.</li>
    <li>Correction — ask us to update inaccurate information.</li>
    <li>Deletion — ask us to delete your data, subject to legal retention obligations.</li>
    <li>Withdrawal — withdraw consent for future communications at any time.</li>
    <li>Contact us at support@getkured.co to exercise any of these rights.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>6. Marketing &amp; communications</h3>
  <ul>
    <li>We send booking-related messages by default.</li>
    <li>Marketing communications (offers, new services, workshops) are opt-in only — you can unsubscribe from any marketing message.</li>
    <li>WhatsApp broadcasts follow the same opt-in principle.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>7. Cookies &amp; website analytics</h3>
  <ul>
    <li>We use essential cookies for booking flow and session state.</li>
    <li>We use anonymized analytics (traffic, page views) to improve the site — no personal identification.</li>
    <li>You can control cookies through your browser settings.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>8. Children</h3>
  <ul>
    <li>KURE services are for adults. We do not knowingly collect data from anyone under 18.</li>
    <li>Sessions for minors require parental consent and presence.</li>
  </ul>
</section>

<section class="legal-section">
  <h3>9. Updates to this policy</h3>
  <p>We may update this Privacy Policy from time to time. Material changes will be communicated by email or through our website. Continued use of KURE services after an update constitutes acceptance of the revised policy.</p>
</section>

<div class="legal-notice legal-notice--footer">
  <p>Questions about our Privacy Policy? Email support@getkured.co</p>
  <p><strong>Version 1.0 · Last updated: July 2026</strong></p>
</div>
`.trim(),
  },
];

const offerCardSeed = [
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_SIZES',
    sortOrder: 1,
    name: 'Single Session',
    imageUrl: null,
    subtitle: 'Book one session when you need care, recovery, or reset.',
    badge: null,
    price: '$65',
    priceNote: '/50 min session',
    perks: [
      '80 min sessions — $90',
      'Any signature service',
      'In-Home or in-clinic',
    ],
    ctaLabel: 'BOOK NOW',
    ctaHref: '$OPEN_BOOKING_MODAL',
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_SIZES',
    sortOrder: 2,
    name: '5-Session Package',
    imageUrl: null,
    subtitle:
      'Our most popular choice for consistency, results, and better value.',
    badge: 'MOST POPULAR',
    price: '$275',
    priceNote: '/5 sessions +1 Free Facial',
    perks: [
      'Redeemable In-Home or in-clinic',
      '+1 Free Facial (in-clinic only)',
      '3 months validity',
      'Priority booking',
    ],
    ctaLabel: 'START 5-SESSION PACKAGE',
    ctaHref: '$OPEN_BOOKING_MODAL',
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_SIZES',
    sortOrder: 3,
    name: '10-Session Package',
    imageUrl: null,
    subtitle:
      'Best value for long-term results and a consistent wellness ritual.',
    badge: null,
    price: '$500',
    priceNote: '/10 sessions +1 Free Session',
    perks: [
      'Redeemable In-Home or in-clinic',
      '+1 Free Session (in-clinic only)',
      '6 months validity',
      'Priority booking',
    ],
    ctaLabel: 'START 10-SESSION PACKAGE',
    ctaHref: '$OPEN_BOOKING_MODAL',
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_OPTIONS',
    sortOrder: 1,
    name: 'Signature Session',
    imageUrl: null,
    subtitle:
      'One full 80-minute session — any signature service. A generous moment of care.',
    badge: null,
    price: '$90',
    priceNote: '/80 min voucher',
    perks: [
      'Any signature service',
      '80 min (default)',
      '50-min option available at $65',
      'In-Home or in-clinic',
    ],
    ctaLabel: 'ORDER THIS VOUCHER',
    ctaHref: '/gift-vouchers',
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_OPTIONS',
    sortOrder: 2,
    name: 'In-Home Couples Massage',
    imageUrl: null,
    subtitle:
      'Two therapists, side-by-side signature massage — the gift of a shared moment at home.',
    badge: 'MOST GIFTED',
    price: '$120',
    priceNote: '/voucher · for two',
    perks: [
      'Signature massage for two',
      'In-Home Only',
      '2 months validity',
      'Priority booking',
    ],
    ctaLabel: 'ORDER THIS VOUCHER',
    ctaHref: '/gift-vouchers',
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_OPTIONS',
    sortOrder: 3,
    name: 'Full Ritual',
    imageUrl: null,
    subtitle: 'A 5-session package voucher — real change, real generosity.',
    badge: null,
    price: '$275',
    priceNote: '/voucher · +1 Free Facial',
    perks: [
      '5 signature sessions',
      '+1 Free Facial (in-clinic)',
      '3 months validity',
      'Priority booking',
    ],
    ctaLabel: 'ORDER THIS VOUCHER',
    ctaHref: '/gift-vouchers',
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_HOUSES',
    sortOrder: 1,
    name: 'KURE Dbayeh',
    imageUrl: '/images/locations/kure-dbayeh.jpg',
    subtitle:
      'Our flagship wellness house — massage, drainage, facial rituals, and body care.',
    badge: null,
    price: '',
    priceNote: null,
    perks: [
      'Signature body work',
      'Madero & Brazilian sculpting',
      'Lymphatic drainage',
      'Facial rituals',
      'Private treatment rooms',
    ],
    ctaLabel: 'VIEW DBAYEH SERVICES',
    ctaHref: '/services?location=dbayeh',
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_HOUSES',
    sortOrder: 2,
    name: 'KURE Verdun',
    imageUrl: '/images/locations/kure-verdun.jpg',
    subtitle:
      'Recovery, stretching, massage, and bodywork in the heart of Beirut.',
    badge: null,
    price: '',
    priceNote: null,
    perks: [
      'Sports & recovery',
      'Stretching therapy',
      'Signature body massage',
      'Body sculpting',
      'Recovery-focused space',
    ],
    ctaLabel: 'VIEW VERDUN SERVICES',
    ctaHref: '/services?location=verdun',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_BEYOND',
    sortOrder: 1,
    name: 'KURE Academy',
    imageUrl: null,
    subtitle:
      'Practical wellness workshops for therapists, wellness professionals, and anyone drawn to the art of bodywork.',
    badge: 'TRAINING · CERTIFICATION',
    price: '',
    priceNote: 'BY KURE',
    perks: [
      'Body massage & lymphatic drainage',
      'Slimming & body sculpting',
      'Theory + hands-on + certificate',
    ],
    ctaLabel: 'RESERVE YOUR SPOT',
    ctaHref: '/academy',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_BEYOND',
    sortOrder: 2,
    name: 'Corporate Wellness',
    imageUrl: null,
    subtitle:
      "On-site wellness services designed to reduce stress, improve recovery, and support your team's wellbeing.",
    badge: 'ON-SITE · FOR TEAMS',
    price: '',
    priceNote: 'BY KURE',
    perks: [
      'Employee wellness days',
      'Office recovery sessions',
      'Customized programs',
    ],
    ctaLabel: 'PLAN YOUR PROGRAM',
    ctaHref: '/corporate',
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_BEYOND',
    sortOrder: 3,
    name: 'Wellness Events',
    imageUrl: null,
    subtitle:
      'Elevated wellness experiences delivered at your gathering — bridal, birthdays, or corporate retreats.',
    badge: 'PRIVATE · CURATED',
    price: '',
    priceNote: 'BY KURE',
    perks: [
      'Bridal & bachelorette days',
      'Sports & community events',
      'Therapists, beds & custom setups',
    ],
    ctaLabel: 'PLAN YOUR EXPERIENCE',
    ctaHref: '/corporate',
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'TWO_OCCASIONS',
    sortOrder: 1,
    name: 'Corporate Wellness',
    imageUrl: null,
    subtitle:
      'On-site programs for teams — reduce stress, improve recovery, support wellbeing.',
    badge: null,
    price: '',
    priceNote: null,
    perks: [
      'Employee wellness days',
      'Office recovery sessions',
      'Wellness weeks',
      'Customized ongoing programs',
    ],
    ctaLabel: 'EXPLORE CORPORATE',
    ctaHref: '#corporate-wellness',
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'TWO_OCCASIONS',
    sortOrder: 2,
    name: 'Wellness Events',
    imageUrl: null,
    subtitle:
      'Curated experiences delivered at your gathering — bridal, birthdays, retreats.',
    badge: null,
    price: '',
    priceNote: null,
    perks: [
      'Bridal & bachelorette days',
      'Milestone birthdays',
      'Sports & community events',
      'Corporate retreats & private parties',
    ],
    ctaLabel: 'EXPLORE EVENTS',
    ctaHref: '#wellness-events',
    isActive: true,
  },
];

const featureItemSeed = [
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    title: 'Real Savings',
    description: 'Save on every session — 5-session and 10-session tiers.',
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    title: 'Priority Booking',
    description:
      'Book ahead of general availability. Reserve the times that fit your life.',
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    title: 'Extended Validity',
    description:
      '3 months for the 5-session package, 6 months for the 10-session package.',
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    title: 'Flexible Services',
    description:
      'Use any session on any signature service — massage, sculpting, drainage, facial.',
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    title: 'In-Clinic Experience',
    description:
      'Redeem at KURE Dbayeh or KURE Verdun — dedicated spaces designed for continuity of care.',
    content: null,
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_BENEFITS',
    title: 'Continuity of Care',
    description:
      'Book the same therapist across sessions — familiarity, trust, better results.',
    content: null,
    sortOrder: 6,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'Validity window',
    description: 'Vouchers are valid for 2 months from the date of purchase.',
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'Transferable',
    description:
      'Vouchers are transferable — the giver may name the recipient at redemption.',
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'No cash exchange',
    description: 'Vouchers cannot be exchanged for cash or refunded.',
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'Partial redemption',
    description:
      'Partial redemption is allowed — remaining balance stays on the voucher for the remainder of its validity.',
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'Advance booking required',
    description:
      'Vouchers require advance booking; they cannot be used for on-demand or same-day services.',
    content: null,
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'Lost vouchers',
    description: 'Lost vouchers may be reissued with proof of purchase.',
    content: null,
    sortOrder: 6,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_POLICY',
    title: 'Discount exclusions',
    description:
      'Vouchers cannot be combined with promotional discounts or package rates.',
    content: null,
    sortOrder: 7,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Mount Liban',
    description: null,
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Beirut',
    description: null,
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Batroun',
    description: null,
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Jbeil',
    description: null,
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Khalde',
    description: null,
    content: null,
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Hamra',
    description: null,
    content: null,
    sortOrder: 6,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Rabieh',
    description: null,
    content: null,
    sortOrder: 7,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Maten',
    description: null,
    content: null,
    sortOrder: 8,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_COVERAGE',
    title: 'Kesserwan',
    description: null,
    content: null,
    sortOrder: 9,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_BOOKING_ARRIVAL',
    title: 'KURE Dbayeh',
    description: null,
    content:
      '<strong>KURE Dbayeh</strong> — Parking available on-site. We recommend arriving 10 minutes before your session for a calm entry.',
    sortOrder: 10,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_BOOKING_ARRIVAL',
    title: 'KURE Verdun',
    description: null,
    content:
      '<strong>KURE Verdun</strong> — Street parking and private garage nearby. Reception opens 15 minutes before your appointment.',
    sortOrder: 11,
    isActive: true,
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'LOCATION_BOOKING_ARRIVAL',
    title: 'In-Home',
    description: null,
    content:
      "<strong>In-Home</strong> — your therapist arrives at your scheduled time with the portable bed, oils, and music. <strong>Please prepare 2 clean towels</strong> (one for draping, one for the bed) — we don't provide towels for in-home sessions. You provide a quiet space (approx. 2m × 3m). Please shower before the session and confirm the address by WhatsApp.",
    sortOrder: 12,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    title: 'Individual Sessions',
    description:
      'One-on-one signature treatments — massage, sculpting, drainage, and facial — delivered in-clinic or in-home.',
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    title: 'KURE Packages',
    description:
      'Multi-session packages with priority booking, extended validity, and continuity of care.',
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    title: 'KURE Wellness Houses',
    description:
      'Dedicated clinic spaces in Dbayeh and Verdun — designed for ritual, continuity, and calm.',
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    title: 'Corporate Wellness by KURE',
    description:
      'On-site wellness programs for teams — massage, recovery, and presence at work.',
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    title: 'Wellness Events by KURE',
    description:
      'Curated gatherings and pop-up experiences that bring the KURE ritual to a wider community.',
    content: null,
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'ECOSYSTEM',
    title: 'KURE Academy',
    description:
      'Practical wellness workshops teaching the KURE method to therapists and anyone drawn to bodywork.',
    content: null,
    sortOrder: 6,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'CORPORATE_WELLNESS',
    title: 'Employee Wellness Days',
    description:
      'A full day of on-site massage and recovery — 30-min slots for your team.',
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'CORPORATE_WELLNESS',
    title: 'Office Recovery Sessions',
    description:
      '15–30 min chair massage during work hours. Recurring or one-off.',
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'CORPORATE_WELLNESS',
    title: 'Wellness Weeks & Custom Programs',
    description:
      'Curated week-long programming or ongoing multi-month partnerships tailored to your team.',
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Bridal & Bachelorette',
    description: null,
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Milestone Birthdays',
    description: null,
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: "Ladies' Gatherings",
    description: null,
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Corporate Retreats',
    description: null,
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Sports & Community Events',
    description: null,
    content: null,
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Private Parties',
    description: null,
    content: null,
    sortOrder: 6,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Custom Occasions',
    description: null,
    content: null,
    sortOrder: 7,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WELLNESS_EVENTS',
    title: 'Anything worth marking',
    description: null,
    content: null,
    sortOrder: 8,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    title: '2–5 KURE-trained therapists in uniform',
    description: null,
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    title: 'Portable beds, chairs, oils, tools',
    description: null,
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    title: 'Music, scent, ambient setup',
    description: null,
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    title: 'Setup + teardown handled',
    description: null,
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    title: 'Custom experience per event',
    description: null,
    content: null,
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WHY_PARTNERS',
    title:
      'First and only wellness house delivering corporate programs at scale in Lebanon',
    description: null,
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WHY_PARTNERS',
    title: 'World Massage Federation members',
    description: null,
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WHY_PARTNERS',
    title: 'KURE-trained therapists — not freelance contractors',
    description: null,
    content: null,
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'WHY_PARTNERS',
    title: '8 years of professional care',
    description: null,
    content: null,
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_FORMATS',
    title: 'Workshop · 4 hours',
    description:
      'Introductory session — protocols, technique preview, hands-on demo. Certificate of Participation.',
    content: 'FORMAT A',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_FORMATS',
    title: 'Course · 4 days',
    description:
      'Full certification — theory + hands-on + practical assessment. Certificate of Completion.',
    content: 'FORMAT B',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_CATEGORIES',
    title: 'Facial Lifting Massages',
    description:
      'Madero Wood and Iced Madero techniques for facial lifting, contouring, and rejuvenation.',
    content: 'CATEGORY 01 · FACIAL LIFTING',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_CATEGORIES',
    title: 'Slimming & Drainage',
    description:
      'Lymphatic Drainage, Cellulite Removal, and Brazilian Sculpting — body-shaping protocols that deliver.',
    content: 'CATEGORY 02 · SLIMMING & DRAINAGE',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_CATEGORIES',
    title: 'Body Massages',
    description:
      'Relaxing, Deep Tissue, Pregnancy, and In-Home techniques — the foundations of professional bodywork.',
    content: 'CATEGORY 03 · BODY MASSAGES',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_CATEGORIES',
    title: 'Sports Recovery',
    description:
      'Stretching Therapy and recovery-focused bodywork for athletes and active bodies.',
    content: 'CATEGORY 04 · SPORTS RECOVERY',
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'RECEIVE_CARE',
    title: 'In-Home',
    description:
      'Same protocols, delivered at your home. Transportation included within our coverage zones.',
    content: null,
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'RECEIVE_CARE',
    title: 'KURE Dbayeh',
    description:
      'Our private wellness house — massage, drainage, facial rituals, and body care.',
    content: null,
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'RECEIVE_CARE',
    title: 'KURE Verdun',
    description:
      'Recovery, stretching, massage, and bodywork in our Verdun space.',
    content: null,
    sortOrder: 3,
    isActive: true,
  },
];

const contentBlockSeed = [
  {
    page: 'ABOUT' as const,
    sectionKey: 'STORY',
    isActive: true,
    content: `
<section class="content-section">
  <h2>Where we come from.</h2>
  <p>KURE was born in Lebanon in 2018 — a country rich in ancient wellness practices, skilled hands, and centuries of tradition. Over eight years, we've grown from a single therapist into something larger: a refined wellness ecosystem honoring both technique and tenderness.</p>
  <p>Every therapist we train is grounded in signature protocols that blend manual expertise, body knowledge, and a deep respect for the ritual of healing. What began as one philosophy has become the way we deliver care — everywhere.</p>
</section>

<section class="content-section">
  <h2>Our philosophy.</h2>
  <p>We believe in healing that is personal, professional, and profoundly human.</p>
  <p>At KURE, wellness is not a luxury. It is a responsibility we carry with care. Our therapists are trained not just in technique, but in presence. Our rituals are rooted not just in results, but in intention.</p>
</section>

<blockquote class="content-quote">
  <p>Because every touch has the power to restore.</p>
  <p>Every session is a chance to reconnect.</p>
  <p>And everybody deserves to feel whole.</p>
</blockquote>
`.trim(),
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'MISSION_VISION',
    isActive: true,
    content: `
<section class="content-section">
  <h2>Our mission.</h2>
  <p>To deliver personalized, science-based wellness experiences that restore the body, calm the mind, and reconnect people with themselves — wherever they are.</p>
  <p>Through signature protocols, trained therapists, and carefully designed spaces, we make consistent, high-quality care accessible in-clinic and in-home across Lebanon.</p>
</section>

<section class="content-section">
  <h2>Our vision.</h2>
  <p>To become the leading wellness ecosystem in Lebanon and beyond — where care is delivered, taught, and shared.</p>
  <p>A network of wellness houses, trained practitioners, and community programs that raise the standard of bodywork and make ritual an everyday practice.</p>
</section>
`.trim(),
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'LOOKING_AHEAD',
    isActive: true,
    content: `
<section class="content-section">
  <h2>Where we're going.</h2>
  <p class="content-highlight">Wellness — delivered, taught, and shared.</p>
  <p>We're building a network of wellness houses and trained practitioners rooted in one philosophy — starting in Lebanon, growing wherever care is needed.</p>
  <p class="content-closing">This is only the beginning.</p>
</section>
`.trim(),
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGE_NOTE',
    isActive: true,
    content: `
<p><strong>Good to know:</strong> All package sessions are redeemable In-Home or in-clinic at KURE Dbayeh &amp; KURE Verdun. The <strong>bonus/free sessions (+1 Facial, +1 Session)</strong> are redeemable in-clinic only. For Body Massages and Slimming &amp; Drainage rates by duration, see <a href="/services">Services &amp; Prices</a>.</p>
`.trim(),
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_NOTE',
    isActive: true,
    content:
      '<p>Custom-amount vouchers also available — any service, any duration. WhatsApp us for tailored gifting.</p>',
  },
  {
    page: 'LOCATIONS' as const,
    sectionKey: 'COVERAGE_NOTE',
    isActive: true,
    content:
      '<p><a href="https://wa.me/96176577070">Don\'t see your area? Contact us to check availability →</a></p>',
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'WHAT_WE_TEACH_NOTE',
    isActive: true,
    content:
      '<p><em>Bespoke durations, private cohorts, and multi-category programs available upon request.</em></p>',
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_CATEGORY_FOOTER',
    isActive: true,
    content: 'Workshop (4h) · Course (4 days) · or custom',
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'CERTIFICATION',
    isActive: true,
    content: `
<p><strong>Certificate of Participation</strong> — awarded at the end of every Workshop. Confirms attendance and exposure to the KURE method.</p>
<p><strong>Certificate of Completion</strong> — awarded at the end of every Course. Confirms assessed competence in the technique taught.</p>
<p><em>Both carry the KURE Academy mark. Selected courses sit within the World Massage Federation ecosystem.</em></p>
`.trim(),
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_METHOD',
    isActive: true,
    content: `
<p><strong>◆ About the KURE method</strong></p>
<p>The techniques, sequences, and protocols taught at KURE Academy are the intellectual property of KURE. They represent years of refinement across 20,000+ client sessions.</p>
<p><strong>Students may not:</strong></p>
<ul>
  <li>Teach or re-teach KURE sequences under any other brand name</li>
  <li>Reproduce training materials for commercial use</li>
  <li>Claim KURE certification for techniques not taught by KURE Academy</li>
</ul>
<p>Personal practice and client work using what you've learned is encouraged. Formal teaching agreements are available for qualified graduates.</p>
`.trim(),
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'RECEIVE_CARE_NOTE',
    isActive: true,
    content:
      '<p><em>Some treatments are exclusive to our wellness houses. See treatment notes above.</em></p>',
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'KURE_STANDARD',
    isActive: true,
    content: `
<p>Every KURE protocol is developed and continuously refined by our Research &amp; Development Team since 2018.</p>
<p>Our methods sit within the World Massage Federation ecosystem — accredited standards, not improvised technique.</p>
<p>All therapists are trained and supervised by KURE — the same hands that built the method deliver your session.</p>
`.trim(),
  },
];

const milestoneStatSeed = [
  {
    page: 'ABOUT' as const,
    sectionKey: 'MILESTONES',
    value: '20K+',
    label: 'SESSIONS DELIVERED',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'MILESTONES',
    value: '10K+',
    label: 'CLIENTS SERVED',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'MILESTONES',
    value: '150+',
    label: 'AREAS COVERED',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'MILESTONES',
    value: '18',
    label: 'KURE-TRAINED THERAPISTS',
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'ABOUT' as const,
    sectionKey: 'MILESTONES',
    value: '2',
    label: 'WELLNESS HOUSES',
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    value: '4-8',
    label: 'INTIMATE',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    value: '10-15',
    label: 'CURATED',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    value: '20-30',
    label: 'SIGNATURE',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CORPORATE' as const,
    sectionKey: 'ON_SITE_DELIVERY',
    value: '30+',
    label: 'GRAND',
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'KURE_STANDARD',
    value: '2018',
    label: 'R&D SINCE',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'KURE_STANDARD',
    value: 'WMF',
    label: 'ACCREDITED PROTOCOLS',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'SERVICES' as const,
    sectionKey: 'KURE_STANDARD',
    value: '18',
    label: 'KURE-TRAINED THERAPISTS',
    sortOrder: 3,
    isActive: true,
  },
];

const stepItemSeed = [
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGES_HOW_IT_WORKS',
    title: 'Choose your package',
    description: '5 or 10 sessions — depending on how often you want to visit.',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGES_HOW_IT_WORKS',
    title: 'Pay upfront',
    description:
      'Card, bank transfer, Whish, or cash at our houses. Package activates on payment.',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'PACKAGES' as const,
    sectionKey: 'PACKAGES_HOW_IT_WORKS',
    title: 'Book at package rates',
    description:
      'Sessions live in your KURE account. Book online or via WhatsApp.',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_STEPS',
    title: 'Choose the voucher',
    description:
      'Session, duo, or full ritual — or ask us for a custom amount.',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_STEPS',
    title: 'Personalize it',
    description:
      "Add the recipient's name, a note, and choose digital or printed delivery.",
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'GIFT_VOUCHERS' as const,
    sectionKey: 'VOUCHER_STEPS',
    title: 'We handle the rest',
    description:
      'Voucher arrives beautifully packaged — digital in minutes, printed within 3 business days.',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'WHY_WORK_HERE',
    title: 'Real Protocols',
    description:
      'You deliver the same signature methods KURE built its reputation on — Wood Madero, Iced Madero, Lymphatic Drainage, Brazilian Sculpting, Gut Therapy. Not improvised massage.',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'WHY_WORK_HERE',
    title: 'Continuous Training',
    description:
      'All therapists are trained and supervised by our senior team. New protocols, refinements, and advanced techniques are shared regularly — never at your cost.',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'WHY_WORK_HERE',
    title: 'A Real Client Base',
    description:
      'Two active wellness houses (Dbayeh & Verdun) plus an in-home operation across Beirut, Mount Liban, Kesserwan, Batroun, Jbeil, and more. Full calendars, not empty schedules.',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'WHY_WORK_HERE',
    title: 'Professional Standards',
    description:
      'Licensed, respected, protected. WMF member. Clear code of conduct. Same-gender treatment policy. You work in an environment built for career-serious therapists.',
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'ACADEMY_PATHWAY',
    title: 'Enroll in a workshop or course',
    description:
      '1-day intensive workshops or 20+ hour professional courses at KURE Verdun.',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'ACADEMY_PATHWAY',
    title: 'Complete the program',
    description:
      'Receive your Certificate of Participation or Completion. Selected courses include WMF certification.',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'ACADEMY_PATHWAY',
    title: 'Get considered for roles',
    description:
      'Top graduates are shortlisted for KURE therapist openings and referred to partner wellness houses.',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'HOW_TO_APPLY',
    title: 'Send Your CV',
    description:
      "Message us on WhatsApp or email your CV to support@getkured.co. Include the role you're applying for.",
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'HOW_TO_APPLY',
    title: 'Initial Screening',
    description:
      "Our team reviews your CV within 5 business days. If there's a fit, we'll invite you for an interview.",
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'HOW_TO_APPLY',
    title: 'Interview & Trial',
    description:
      'Interview at KURE Verdun or Dbayeh. For therapist roles, a practical trial session is part of the process.',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'CAREERS' as const,
    sectionKey: 'HOW_TO_APPLY',
    title: 'Offer & Onboarding',
    description:
      'Formal offer, contract, and full onboarding — including KURE protocol training and integration into the team.',
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_HOW_IT_WORKS',
    title: 'Theory',
    description:
      'Understand the technique, the science, and the anatomy. Foundations you can build a career on.',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_HOW_IT_WORKS',
    title: 'Hands-On',
    description:
      'Practice under KURE-trained trainers. Real feedback. Real skill.',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ACADEMY_HOW_IT_WORKS',
    title: 'Certificate',
    description:
      'Receive KURE Academy certification. Recognized across our ecosystem and beyond.',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ENROLLMENT',
    title: 'See Calendar',
    description: 'Current dates on Instagram @kure.lb',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ENROLLMENT',
    title: 'Register',
    description: 'Form below or WhatsApp us',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ENROLLMENT',
    title: 'Confirm',
    description: 'Enrollment details + materials',
    sortOrder: 3,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ENROLLMENT',
    title: 'Pay Deposit',
    description: 'Secures your seat',
    sortOrder: 4,
    isActive: true,
  },
  {
    page: 'ACADEMY' as const,
    sectionKey: 'ENROLLMENT',
    title: 'Show Up',
    description: "Bring a beginner's mind",
    sortOrder: 5,
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_HOW_IT_WORKS',
    title: 'Choose your service',
    description: 'Pick a session or a package. Any signature service, any duration.',
    sortOrder: 1,
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_HOW_IT_WORKS',
    title: 'Tell us where',
    description: 'In your home, at KURE Dbayeh, or at KURE Verdun.',
    sortOrder: 2,
    isActive: true,
  },
  {
    page: 'HOME' as const,
    sectionKey: 'HOME_HOW_IT_WORKS',
    title: 'Enjoy your session',
    description: "Your therapist arrives on time. You reconnect. That's it.",
    sortOrder: 3,
    isActive: true,
  },
];

const serviceCatalogSeed = {
  currency: {
    code: 'USD',
    symbol: '$',
    name: 'US Dollar',
  },
  categories: [
    {
      name: 'Facial Lifting Massages',
      slug: 'facial-lifting-massages',
      eyebrow: 'CATEGORY 01 · ANTI-AGING',
      titleAccent: 'Massages',
      subtitle:
        'Madero-inspired lifting techniques for tone, lift, and radiance.',
      introEyebrow: 'JEUNESSE ET VITALITÉ',
      tagline: 'Longevity is a journey that starts here.',
      pricingSubtitle:
        'Single sessions when you need them — packages when you want consistency and better value.',
      note: 'Package sessions are redeemable In-Home or in-clinic. Any bonus/free session is in-clinic only.',
      cardBlurb: 'Techniques for lift, glow, and definition.',
      imageUrl: null,
      highlights: [
        '40-minute anti-aging facial lifting session',
        '5-session youth enhancement package — slows visible aging with consistent care',
      ],
      sortOrder: 1,
      services: [
        {
          name: 'Facial Madero wood',
          description:
            'Facial sculpting using anatomically shaped wooden tools — targeted lift and definition.',
          badge: null,
          sortOrder: 1,
        },
        {
          name: 'Facial Iced Madero',
          description:
            'Cold Madero technique that firms, decongests, and awakens the skin.',
          badge: null,
          sortOrder: 2,
        },
      ],
      prices: [
        {
          label: '40 min',
          description: 'Single',
          price: 45,
          kind: 'SINGLE' as const,
          sortOrder: 1,
        },
        {
          label: '5 sessions',
          description: '+1 Free Facial',
          price: 200,
          kind: 'PACKAGE' as const,
          sortOrder: 2,
        },
      ],
      addons: [],
    },
    {
      name: 'Slimming & Drainage',
      slug: 'slimming-drainage',
      eyebrow: 'CATEGORY 02 · BODY SCULPTING',
      titleAccent: null,
      subtitle:
        'Body sculpting, cellulite reduction, and lymphatic drainage — visible results, session by session.',
      introEyebrow: null,
      tagline: null,
      pricingSubtitle:
        'Single sessions when you need them — packages when you want consistency and better value.',
      note: '5-session package includes +1 Free Facial. 10-session package includes +1 Free Session. Bonuses are in-clinic only. All other package sessions redeemable In-Home or in-clinic.',
      cardBlurb: 'Techniques for sculpt, drain, and redefine.',
      imageUrl: null,
      highlights: [
        '50-minute body sculpting and drainage session',
        'Packages for consistent visible results',
      ],
      sortOrder: 2,
      services: [
        {
          name: 'Lymphatic Drainage',
          description:
            'Manual lymphatic technique to reduce retention, decongest tissue, and support circulation.',
          badge: null,
          sortOrder: 1,
        },
        {
          name: 'Manual Cellulite Removal',
          description:
            'Targeted manual work to break down cellulite and improve skin texture.',
          badge: null,
          sortOrder: 2,
        },
        {
          name: 'Madero Wood Therapy',
          description:
            'Sculpting with anatomically shaped wooden tools — contour and tone.',
          badge: null,
          sortOrder: 3,
        },
        {
          name: 'Iced Madero Therapy',
          description:
            'Cold wood technique that firms, decongests, and refreshes the body.',
          badge: null,
          sortOrder: 4,
        },
        {
          name: 'Brazilian Sculpting',
          description:
            'Signature sculpting protocol for shape, lift, and definition.',
          badge: 'EXCLUSIVE TO KURE WELLNESS HOUSES',
          sortOrder: 5,
        },
        {
          name: 'Gut Therapy',
          description:
            'Abdominal-focused work to support digestion, release, and core comfort.',
          badge: 'EXCLUSIVE TO KURE WELLNESS HOUSES',
          sortOrder: 6,
        },
      ],
      prices: [
        {
          label: '50 min',
          description: 'Single',
          price: 65,
          kind: 'SINGLE' as const,
          sortOrder: 1,
        },
        {
          label: '5 sessions',
          description: '+1 Free Facial',
          price: 275,
          kind: 'PACKAGE' as const,
          sortOrder: 2,
        },
        {
          label: '10 sessions',
          description: '+1 Free Session',
          price: 500,
          kind: 'PACKAGE' as const,
          sortOrder: 3,
        },
      ],
      addons: [
        {
          name: 'KURE Cellulite Oil',
          description: null,
          price: 30,
          sortOrder: 1,
        },
        {
          name: 'Active Madero',
          description: null,
          price: 20,
          sortOrder: 2,
        },
      ],
    },
    {
      name: 'Body Massages',
      slug: 'body-massages',
      eyebrow: 'CATEGORY 03 · BODYWORK',
      titleAccent: null,
      subtitle:
        'Full-body relaxation, tension release, and specialized care — tailored to your rhythm.',
      introEyebrow: null,
      tagline: null,
      pricingSubtitle:
        'Single sessions when you need them — packages when you want consistency and better value.',
      note: '5-session package includes +1 Free Facial. 10-session package includes +1 Free Session. Bonuses are in-clinic only. All other package sessions redeemable In-Home or in-clinic.',
      cardBlurb: null,
      imageUrl: null,
      highlights: [
        '50 or 80-minute signature body massage',
        'Packages for lasting rhythm and better value',
      ],
      sortOrder: 3,
      services: [
        {
          name: 'Relaxing Massage',
          description:
            'Full-body relaxation to release tension and restore calm.',
          badge: null,
          sortOrder: 1,
        },
        {
          name: 'Deep Tissue Massage',
          description:
            'Focused pressure for chronic tension and deeper muscle release.',
          badge: null,
          sortOrder: 2,
        },
        {
          name: 'Pregnancy Massage',
          description:
            'Adapted bodywork for comfort and relief during pregnancy.',
          badge: null,
          sortOrder: 3,
        },
        {
          name: 'In-Home Couples Massage',
          description:
            'Two therapists, side-by-side signature massage at home.',
          badge: 'IN-HOME ONLY · $120 FOR BOTH',
          sortOrder: 4,
        },
      ],
      prices: [
        {
          label: '50 min',
          description: 'Single',
          price: 65,
          kind: 'SINGLE' as const,
          sortOrder: 1,
        },
        {
          label: '80 min',
          description: 'Single',
          price: 90,
          kind: 'SINGLE' as const,
          sortOrder: 2,
        },
        {
          label: '5 sessions',
          description: '+1 Free Facial',
          price: 275,
          kind: 'PACKAGE' as const,
          sortOrder: 3,
        },
        {
          label: '10 sessions',
          description: '+1 Free Session',
          price: 500,
          kind: 'PACKAGE' as const,
          sortOrder: 4,
        },
      ],
      addons: [
        {
          name: 'Stretching',
          description: '20 min add-on',
          price: 20,
          sortOrder: 1,
        },
        {
          name: 'Facial',
          description: '20 min add-on',
          price: 20,
          sortOrder: 2,
        },
        {
          name: 'Hand & Foot Reflexology',
          description: '20 min add-on',
          price: 20,
          sortOrder: 3,
        },
      ],
    },
    {
      name: 'Sports Recovery',
      slug: 'sports-recovery',
      eyebrow: 'CATEGORY 04 · RECOVERY',
      titleAccent: null,
      subtitle:
        'Targeted recovery for athletes and active bodies — faster recovery, better performance.',
      introEyebrow: null,
      tagline: null,
      pricingSubtitle:
        'Single sessions when you need them — recovery priced for performance.',
      note: null,
      cardBlurb: null,
      imageUrl: null,
      highlights: [
        '50 or 70-minute recovery-focused session',
        'Built for athletes and active bodies',
      ],
      sortOrder: 4,
      services: [
        {
          name: 'Stretching Therapy',
          description:
            'Assisted full-body stretching for flexibility, joint mobility, and injury prevention.',
          badge: null,
          sortOrder: 1,
        },
        {
          name: 'Sports Massage',
          description:
            'Deep, targeted release for athletes — faster recovery, better performance.',
          badge: null,
          sortOrder: 2,
        },
      ],
      prices: [
        {
          label: '50 min',
          description: 'Single',
          price: 55,
          kind: 'SINGLE' as const,
          sortOrder: 1,
        },
        {
          label: '70 min',
          description: 'Single',
          price: 75,
          kind: 'SINGLE' as const,
          sortOrder: 2,
        },
      ],
      addons: [],
    },
  ],
};

const jobOpeningSeed = [
  {
    title: 'Licensed Massage Therapist',
    status: 'ACTIVELY_HIRING' as const,
    employmentTypes: ['FULL-TIME', 'PART-TIME', 'ON-CALL'],
    locations: ['DBAYEH', 'VERDUN', 'IN-HOME'],
    description:
      "Delivering KURE's signature massage, facial lifting, drainage, and recovery protocols. Ideal for licensed Lebanese therapists with 1+ year of experience. KURE Academy graduates encouraged to apply.",
    sortOrder: 1,
    isActive: true,
  },
  {
    title: 'Front-of-House & Reception',
    status: 'ACTIVELY_HIRING' as const,
    employmentTypes: ['FULL-TIME'],
    locations: ['KURE VERDUN'],
    description:
      'Client welcome, booking coordination, and daily operations at our Verdun house. Warm, detail-oriented, fluent in Arabic and English. Hospitality experience preferred.',
    sortOrder: 2,
    isActive: true,
  },
  {
    title: 'Customer Service Operator',
    status: 'TALENT_POOL' as const,
    employmentTypes: ['FULL-TIME', 'REMOTE-HYBRID'],
    locations: [],
    description:
      'Handling WhatsApp inquiries, booking confirmations, and voucher/package coordination. Not actively hiring right now — accepting CVs for the pipeline.',
    sortOrder: 3,
    isActive: true,
  },
  {
    title: 'KURE Academy Assistant Trainer',
    status: 'TALENT_POOL' as const,
    employmentTypes: ['PART-TIME'],
    locations: ['VERDUN'],
    description:
      'Supporting workshop delivery, hands-on correction, and training material preparation. Reserved for senior therapists with 3+ years at KURE or equivalent expertise.',
    sortOrder: 4,
    isActive: true,
  },
];

async function main() {
  await prisma.faq.deleteMany();
  await prisma.faqCategory.deleteMany();

  for (const category of faqSeed) {
    await prisma.faqCategory.create({
      data: {
        page: category.page,
        label: category.label,
        title: category.title,
        sortOrder: category.sortOrder,
        isActive: true,
        faqs: {
          create: category.faqs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
            sortOrder: faq.sortOrder,
            isActive: true,
          })),
        },
      },
    });
  }

  console.log(`Seeded ${faqSeed.length} FAQ categories with questions.`);

  await prisma.testimonial.deleteMany();
  await prisma.testimonialCategory.deleteMany();

  for (const category of testimonialSeed) {
    await prisma.testimonialCategory.create({
      data: {
        label: category.label,
        title: category.title,
        sortOrder: category.sortOrder,
        isActive: true,
        testimonials: {
          create: category.testimonials.map((testimonial) => ({
            name: testimonial.name,
            subtitle: testimonial.subtitle,
            content: testimonial.content,
            sortOrder: testimonial.sortOrder,
            isActive: true,
          })),
        },
      },
    });
  }

  const testimonialCount = testimonialSeed.reduce(
    (count, category) => count + category.testimonials.length,
    0,
  );
  console.log(
    `Seeded ${testimonialSeed.length} testimonial categories with ${testimonialCount} testimonials.`,
  );

  await prisma.hero.deleteMany();

  await prisma.hero.createMany({
    data: heroSeed,
  });

  console.log(`Seeded ${heroSeed.length} heroes.`);

  await prisma.sectionIntro.deleteMany();

  await prisma.sectionIntro.createMany({
    data: sectionIntroSeed,
  });

  console.log(`Seeded ${sectionIntroSeed.length} section intros.`);

  await prisma.sectionOutro.deleteMany();

  await prisma.sectionOutro.createMany({
    data: sectionOutroSeed,
  });

  console.log(`Seeded ${sectionOutroSeed.length} section outros.`);

  await prisma.offerCard.deleteMany();

  await prisma.offerCard.createMany({
    data: offerCardSeed,
  });

  console.log(`Seeded ${offerCardSeed.length} offer cards.`);

  await prisma.featureItem.deleteMany();

  await prisma.featureItem.createMany({
    data: featureItemSeed,
  });

  console.log(`Seeded ${featureItemSeed.length} feature items.`);

  await prisma.stepItem.deleteMany();

  await prisma.stepItem.createMany({
    data: stepItemSeed,
  });

  console.log(`Seeded ${stepItemSeed.length} step items.`);

  await prisma.legalDocument.deleteMany();

  await prisma.legalDocument.createMany({
    data: legalDocumentSeed,
  });

  console.log(`Seeded ${legalDocumentSeed.length} legal documents.`);

  await prisma.contentBlock.deleteMany();

  await prisma.contentBlock.createMany({
    data: contentBlockSeed,
  });

  console.log(`Seeded ${contentBlockSeed.length} content blocks.`);

  await prisma.milestoneStat.deleteMany();

  await prisma.milestoneStat.createMany({
    data: milestoneStatSeed,
  });

  console.log(`Seeded ${milestoneStatSeed.length} milestone stats.`);

  await prisma.jobOpening.deleteMany();

  await prisma.jobOpening.createMany({
    data: jobOpeningSeed,
  });

  console.log(`Seeded ${jobOpeningSeed.length} job openings.`);

  await prisma.categoryAddon.deleteMany();
  await prisma.categoryPrice.deleteMany();
  await prisma.service.deleteMany();
  await prisma.serviceCategory.deleteMany();
  await prisma.currency.deleteMany();

  const currency = await prisma.currency.create({
    data: {
      code: serviceCatalogSeed.currency.code,
      symbol: serviceCatalogSeed.currency.symbol,
      name: serviceCatalogSeed.currency.name,
      isActive: true,
    },
  });

  for (const category of serviceCatalogSeed.categories) {
    await prisma.serviceCategory.create({
      data: {
        name: category.name,
        slug: category.slug,
        eyebrow: category.eyebrow,
        titleAccent: category.titleAccent,
        subtitle: category.subtitle,
        introEyebrow: category.introEyebrow,
        tagline: category.tagline,
        pricingSubtitle: category.pricingSubtitle,
        note: category.note,
        cardBlurb: category.cardBlurb,
        imageUrl: category.imageUrl,
        highlights: category.highlights,
        currencyId: currency.id,
        sortOrder: category.sortOrder,
        isActive: true,
        services: {
          create: category.services.map((service) => ({
            name: service.name,
            description: service.description,
            imageUrl: null,
            badge: service.badge,
            sortOrder: service.sortOrder,
            isActive: true,
          })),
        },
        prices: {
          create: category.prices.map((price) => ({
            label: price.label,
            description: price.description,
            price: price.price,
            kind: price.kind,
            sortOrder: price.sortOrder,
            isActive: true,
          })),
        },
        addons: {
          create: category.addons.map((addon) => ({
            name: addon.name,
            description: addon.description,
            price: addon.price,
            sortOrder: addon.sortOrder,
            isActive: true,
          })),
        },
      },
    });
  }

  console.log(
    `Seeded ${serviceCatalogSeed.categories.length} service categories with currency ${currency.code}.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
