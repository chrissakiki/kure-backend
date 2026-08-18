import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL as string,
});

const prisma = new PrismaClient({ adapter });

const faqSeed = [
  {
    page: "MAIN" as const,
    label: "BOOKING & SCHEDULING",
    title: "Booking your session.",
    sortOrder: 1,
    faqs: [
      {
        question: "How do I book a session?",
        answer:
          "Book directly through our website, WhatsApp us on +961 76 577 070, or call. We confirm every booking within 2 hours during business hours.",
        sortOrder: 1,
      },
      {
        question: "How far in advance should I book?",
        answer:
          "For weekend and evening slots, book 3–5 days ahead. Weekday morning and afternoon slots often have same-week availability. Package holders get priority booking.",
        sortOrder: 2,
      },
      {
        question: "What if I need to cancel or reschedule?",
        answer:
          "We require 24 hours' notice. Within 24 hours, or no-shows, are charged in full. If KURE cancels last-minute, you receive a complimentary session.",
        sortOrder: 3,
      },
      {
        question: "Can I book the same therapist every time?",
        answer:
          "Yes — we prioritize continuity of care. Just mention your preferred therapist when booking.",
        sortOrder: 4,
      },
    ],
  },
  {
    page: "MAIN" as const,
    label: "SESSIONS",
    title: "During your session.",
    sortOrder: 2,
    faqs: [
      {
        question: "What should I expect during my first KURE session?",
        answer:
          "Your therapist arrives on time, sets up quietly, and starts with a brief conversation to understand your body, tension, and preferences. Every session begins with intention.",
        sortOrder: 1,
      },
      {
        question: "Are your therapists licensed?",
        answer:
          "Yes — all KURE therapists are licensed Lebanese professionals, KURE-trained, and members of the World Massage Federation.",
        sortOrder: 2,
      },
      {
        question: "Gender-matching policy?",
        answer:
          "Female therapists treat female clients; male therapists treat male clients. No exceptions — this protects everyone.",
        sortOrder: 3,
      },
      {
        question: "What if the pressure isn't right?",
        answer:
          "Speak up anytime. Your therapist checks in during the session, but you're always in control. Pressure adjustments are welcome at any point.",
        sortOrder: 4,
      },
      {
        question: "What should I wear?",
        answer:
          "Comfortable underwear is standard. Draping protects your modesty throughout the session — only the area being worked on is uncovered.",
        sortOrder: 5,
      },
    ],
  },
  {
    page: "MAIN" as const,
    label: "IN-HOME",
    title: "In-home sessions.",
    sortOrder: 3,
    faqs: [
      {
        question: "Do I need to provide anything?",
        answer:
          "Just a quiet space (about 2m × 3m) and 2 clean towels — one for draping, one for the massage bed. We bring the portable bed, oils, and music. Towels are not provided for in-home sessions.",
        sortOrder: 1,
      },
      {
        question: "Do you cover my area?",
        answer:
          "We cover Mount Liban, Beirut, Batroun, Jbeil, Khalde, Hamra, Rabieh, Maten, and Kesserwan. WhatsApp us to check your specific location.",
        sortOrder: 2,
      },
      {
        question: "Is there an extra fee for in-home?",
        answer:
          "In-home sessions include transportation within our coverage zones. Locations outside standard coverage may incur a small transport fee — confirmed at booking.",
        sortOrder: 3,
      },
    ],
  },
  {
    page: "MAIN" as const,
    label: "PACKAGES & PAYMENT",
    title: "Packages & payment.",
    sortOrder: 4,
    faqs: [
      {
        question: "How do I pay?",
        answer:
          "Card, bank transfer, Whish, or cash (at our wellness houses). In-home sessions require prepayment.",
        sortOrder: 1,
      },
      {
        question: "How long are packages valid?",
        answer:
          "5-session package: 3 months. 10-session package: 6 months. Extensions for verified medical reasons only.",
        sortOrder: 2,
      },
      {
        question: "Can I redeem my package sessions at home?",
        answer:
          "Yes — your paid package sessions are redeemable In-Home or in-clinic (KURE Dbayeh or KURE Verdun). Only the bonus/free sessions included with 5 & 10-session packages (+1 Free Facial, +1 Free Session) are in-clinic only.",
        sortOrder: 3,
      },
      {
        question: "Are packages refundable?",
        answer:
          "Refunds are only granted for verified medical reasons, pro-rated on remaining sessions with a 10% admin fee.",
        sortOrder: 4,
      },
      {
        question: "Can I gift a session?",
        answer:
          "Yes — see our Gift Vouchers page. Vouchers are transferable, valid for 2 months, and beautifully packaged.",
        sortOrder: 5,
      },
    ],
  },
  {
    page: "ACADEMY" as const,
    label: "COMMON QUESTIONS",
    title: "Academy FAQ.",
    sortOrder: 1,
    faqs: [
      {
        question: "Do I need existing licensure to attend?",
        answer:
          "For most workshops, a massage therapy license (or equivalent) is required. Some introductory workshops are open to broader wellness professionals.",
        sortOrder: 1,
      },
      {
        question: "Are workshops open to international students?",
        answer:
          "Yes. Workshops are held in Beirut. Students from GCC and neighboring countries are welcome.",
        sortOrder: 2,
      },
      {
        question: "How much does a workshop cost?",
        answer:
          "Pricing varies by duration and certification level. Current pricing shared at enrollment.",
        sortOrder: 3,
      },
      {
        question: "What language are the workshops taught in?",
        answer:
          "English and Arabic. French available upon request for full-cohort workshops.",
        sortOrder: 4,
      },
      {
        question: "Can I work at KURE after completing a workshop?",
        answer:
          "Workshop completion does not guarantee employment. Top-performing students are invited to interview for our therapist team.",
        sortOrder: 5,
      },
      {
        question: "How many students per workshop?",
        answer:
          "Small class sizes (typically 6–12) to ensure personalized instruction and hands-on practice.",
        sortOrder: 6,
      },
    ],
  },
];

const testimonialSeed = [
  {
    label: "Signature Sessions",
    title: "On the sessions.",
    sortOrder: 1,
    testimonials: [
      {
        name: "Nada A.",
        subtitle: "Madero · Dbayeh",
        content:
          "The session was great. I am super impressed how professional and talented the therapist is. It's rare to see this kind of service in Lebanon.",
        sortOrder: 1,
      },
      {
        name: "Rania K.",
        subtitle: "Package · In-Home",
        content:
          "I started the 5-session package thinking I'd try it. Three sessions in, I felt real change. KURE is not a spa — it is something else.",
        sortOrder: 2,
      },
      {
        name: "Layal M.",
        subtitle: "Facial · Verdun",
        content:
          "The therapist arrived exactly on time. Everything was prepared. The room was calm. This is how wellness should feel.",
        sortOrder: 3,
      },
    ],
  },
  {
    label: "In-Home",
    title: "On coming to you.",
    sortOrder: 2,
    testimonials: [
      {
        name: "Karim S.",
        subtitle: "Signature · In-Home Beirut",
        content:
          "I've had massages at spas across Europe. The KURE therapist who came to my apartment matched anything I've had abroad.",
        sortOrder: 1,
      },
      {
        name: "Yara M.",
        subtitle: "Body Massage · In-Home Jounieh",
        content:
          "Setup took 10 minutes. The session was 80 minutes. I fell asleep. That's a first at home.",
        sortOrder: 2,
      },
      {
        name: "Rita K.",
        subtitle: "Lymphatic · In-Home Kaslik",
        content:
          "My mother lives in Kaslik and doesn't drive. KURE arrives, cares for her, leaves. This changed her month.",
        sortOrder: 3,
      },
    ],
  },
  {
    label: "Corporate & Events",
    title: "On team & gathering wellness.",
    sortOrder: 3,
    testimonials: [
      {
        name: "Nour H., Head of People",
        subtitle: "Corporate Wellness Day",
        content:
          "Our wellness day boosted the entire team's mood for a week. The KURE therapists were professional, warm, and unforgettable.",
        sortOrder: 1,
      },
      {
        name: "Marc J., Founder",
        subtitle: "Corporate Retreat",
        content:
          "For our end-of-quarter retreat, KURE's morning stretching and evening massage program was the highlight — clients still mention it.",
        sortOrder: 2,
      },
      {
        name: "Layla T.",
        subtitle: "Bridal Event · Batroun",
        content:
          "KURE turned my bachelorette weekend into the most memorable moment for me and my girls. Every detail was thought through.",
        sortOrder: 3,
      },
    ],
  },
  {
    label: "KURE Academy",
    title: "On the training.",
    sortOrder: 4,
    testimonials: [
      {
        name: "Sarah G.",
        subtitle: "Madero Certification",
        content:
          "Coming from a physio background, KURE Academy elevated my touch. The Madero training changed how I work.",
        sortOrder: 1,
      },
      {
        name: "Ali D.",
        subtitle: "Lymphatic Drainage Cert.",
        content:
          "Small class, real hands-on time with the trainer, and a certificate that means something in the industry.",
        sortOrder: 2,
      },
      {
        name: "Maya R.",
        subtitle: "Body Massage Fundamentals",
        content:
          "The KURE method is beautiful — respectful, precise, and deeply human. I recommend the Academy to every therapist I meet.",
        sortOrder: 3,
      },
    ],
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
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
