// ─── Labbayk — Constants ─────────────────────────────────────
// All constant values sourced from official Labbayk data.
// NEVER invent Labbayk content — only use verified copy.

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://app.labbayk.fr';

export const AGENCY = {
  name: 'Labbayk Voyages',
  tagline: 'Labbayk Allahuma Labbayk',
  address: '17 rue Le Bua, 75020 Paris',
  hours: 'Mardi au Samedi 10h-12h30 / 14h-18h',
  phones: [
    { label: 'Bureau', number: '+33142530146', display: '01 42 53 01 46' },
    { label: 'Mobile 1', number: '+33769806921', display: '07 69 80 69 21' },
    { label: 'Mobile 2', number: '+33667441723', display: '06 67 44 17 23' },
  ],
  email: 'contact@labbayk.fr',
  instagram: '@labbayk.fr',
  tiktok: '@labbayk.fr',
  website: 'labbayk.fr',
} as const;

export const TRUST_STATS = {
  yearsExperience: 10,
  pilgrimsServed: 1000,
  googleRating: 4.9,
} as const;

export const QURAN_API_BASE = process.env.NEXT_PUBLIC_QURAN_API_BASE ?? 'https://api.quran.com/api/v4';
export const EVERYAYAH_BASE = process.env.NEXT_PUBLIC_EVERYAYAH_BASE ?? 'https://everyayah.com/data';

export const VISA_EXTRA_NON_EUROPE = 150; // €

export const BAGGAGE = {
  checked_kg: 23,
  cabin_kg: 8,
} as const;
