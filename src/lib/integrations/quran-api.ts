// ─── Quran API Integration ───────────────────────────────────
// Proxy to Quran.com API v4 + EveryAyah.com for audio
// See: https://api-docs.quran.com/

import { QURAN_API_BASE, EVERYAYAH_BASE } from '@/lib/constants';

export interface Surah {
  number: number;
  name_arabic: string;
  name_simple: string;
  name_complex: string;
  revelation_place: 'makkah' | 'madinah';
  verses_count: number;
}

export async function fetchSurahs(): Promise<Surah[]> {
  const res = await fetch(`${QURAN_API_BASE}/chapters`, {
    next: { revalidate: 86400 }, // Cache 24h
  });
  if (!res.ok) throw new Error('Failed to fetch surahs');
  const data = await res.json();
  return data.chapters;
}

export function getAudioUrl(imamSlug: string, surahNumber: number): string {
  // EveryAyah URL pattern — each imam has a specific folder name
  const imamFolders: Record<string, string> = {
    alafasy: 'Alafasy_128kbps',
    sudais: 'Abdurrahmaan_As-Sudais_192kbps',
    shuraim: 'Saood_ash-Shuraym_128kbps',
    muaiqly: 'MauroAl-Muaqly_128kbps',
    husary: 'Husary_128kbps',
  };

  const folder = imamFolders[imamSlug] ?? 'Alafasy_128kbps';
  const paddedSurah = String(surahNumber).padStart(3, '0');

  return `${EVERYAYAH_BASE}/${folder}/${paddedSurah}001.mp3`;
}
