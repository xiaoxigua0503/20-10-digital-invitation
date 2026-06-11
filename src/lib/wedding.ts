import { galleryImages } from "@/lib/images";

export const wedding = {
  couple: {
    bride: "Christine Faner",
    groom: "Angelo Pablo",
  },
  date: {
    iso: "2026-06-19T10:00:00+08:00",
    display: "June 19, 2026",
  },
  ceremony: {
    title: "Ceremony",
    venue: "Lokal ng Sandulayan",
    lines: [
      "Sitio INC Brgy. Sto. Niño, Rizal",
      "5103 Occidental Mindoro",
    ],
  },
  reception: {
    title: "Reception",
    venue: "Grandiya's Venue Hall",
    lines: ["Aroma Center, Gate 1", "San Roque, San Jose", "Occidental Mindoro"],
  },
  party: {
    title: "Family & Friends Dinner",
    venue: "Paredes Private Resort",
    lines: ["Murtha, San Jose", "\nOccidental Mindoro"],
    mapQuery: "12°26'16.4\"N 121°06'10.8\"E",
  },
} as const;

export const weddingTimeline = [
  { time: "09:00 AM", title: "Guest Arrival", note: "Warm welcome and seating" },
  { time: "9:45 AM", title: "Wedding Ceremony", note: wedding.ceremony.venue },
  { time: "11:00 AM", title: "Photo Opportunities", note: "Family and entourage" },
  { time: "12:00 NN", title: "Reception", note: wedding.reception.venue },
  { time: "", title: "Lunch", note: "Sharing a meal together" },
  { time: "", title: "Program", note: "Speeches, music, and toasts" },
  { time: "6:00 PM", title: "Family & Friends Dinner", note: "Paredes Private Resort" },
] as const;

export const entourage = {
  principalSponsors: {
    left: [
      "Bro. Jimmy D. Flores",
      "Mr. Robert Angelo D. Pablo",
      "Mr. Joseph E. Salgado",
      "Bro. Hector Roy B. Casem",
      "Mr. Chester P. Ruiz",
    ],
    right: [
      "Sis. Ann Roxanne D. Rodrigo",
      "Sis. Maria Venus C. Enriquez",
      "Sis. Gemma N. Gadiano",
      "Sis. Eden D. Peralta",
      "Sis. Arlet D. Mactal",
    ],
  },
  bestMan: "Mr. Nico Alfonso N. Pangilinan",
  maidOfHonor: "Ms. Princess Catherine A. Mendoza",
  groomsmen: [
    "Mr. Carlos Bon B. Sunga",
    "Mr. Jaypee E. Estandian",
    "Mr. Jacob I. Guran",
    "Mr. Josh Will S. Gasmẽna",
  ],
  bridesmaids: [
    "Ms. Sophia Mae P. Acbang",
    "Ms. Bea Bianca S. Ramos",
    "Ms. Lie Catherine C. Galam",
    "Ms. Allona Jane A. Esguerra",
  ],
  ringBearer: "Marcus Gabriel R. Gadiano",
  flowerGirls: ["Sabrina P. Acbang", "Aubrey Naoue"],
} as const;

export const faq = [
  {
    q: "What time should we arrive?",
    a: "Please arrive at least 30 minutes early so everyone can be seated before the ceremony begins.",
  },
  {
    q: "Can I bring a plus one?",
    a: "We’d love to celebrate with you—please indicate the number of guests on your RSVP so we can plan accordingly.",
  },
  {
    q: "Is there parking available?",
    a: "Yes, both venues have nearby parking. If you need help on the day, reach out using the contact section below.",
  },
  {
    q: "What is the dress code?",
    a: "Strictly formal / semi-formal. We’d love for you to match our wedding palette if you can.",
  },
] as const;

export const gallery = galleryImages.map((src, idx) => ({
  src,
  alt: `Gallery photo ${idx + 1}`,
}));
