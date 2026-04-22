'use client';

import { useState, useEffect, useRef } from 'react';
import { ScreenHeader } from '@/components/layout/screen-header';
import { Input } from '@/components/ui/input';
import { Search, Play, Pause, BookOpen, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getAudioUrl } from '@/lib/integrations/quran-api';

const imams = [
  { slug: 'alafasy', name: 'Mishary Alafasy' },
  { slug: 'sudais', name: 'Abdur-Rahman As-Sudais' },
  { slug: 'shuraim', name: 'Saud Al-Shuraim' },
  { slug: 'muaiqly', name: 'Maher Al-Muaiqly' },
  { slug: 'husary', name: 'Mahmoud Al-Husary' }
];

interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

// Static surah list (first 20 for quick load, expandable)
const staticSurahs: Surah[] = [
  { number: 1, name: 'الفاتحة', englishName: 'Al-Fatiha', englishNameTranslation: 'L\'Ouverture', numberOfAyahs: 7, revelationType: 'Meccan' },
  { number: 2, name: 'البقرة', englishName: 'Al-Baqara', englishNameTranslation: 'La Vache', numberOfAyahs: 286, revelationType: 'Medinan' },
  { number: 3, name: 'آل عمران', englishName: 'Aal-Imran', englishNameTranslation: 'La Famille d\'Imran', numberOfAyahs: 200, revelationType: 'Medinan' },
  { number: 4, name: 'النساء', englishName: 'An-Nisa', englishNameTranslation: 'Les Femmes', numberOfAyahs: 176, revelationType: 'Medinan' },
  { number: 5, name: 'المائدة', englishName: 'Al-Maida', englishNameTranslation: 'La Table Servie', numberOfAyahs: 120, revelationType: 'Medinan' },
  { number: 36, name: 'يس', englishName: 'Ya-Sin', englishNameTranslation: 'Ya-Sin', numberOfAyahs: 83, revelationType: 'Meccan' },
  { number: 55, name: 'الرحمن', englishName: 'Ar-Rahman', englishNameTranslation: 'Le Tout Miséricordieux', numberOfAyahs: 78, revelationType: 'Medinan' },
  { number: 56, name: 'الواقعة', englishName: 'Al-Waqia', englishNameTranslation: 'L\'Événement', numberOfAyahs: 96, revelationType: 'Meccan' },
  { number: 67, name: 'الملك', englishName: 'Al-Mulk', englishNameTranslation: 'La Royauté', numberOfAyahs: 30, revelationType: 'Meccan' },
  { number: 112, name: 'الإخلاص', englishName: 'Al-Ikhlas', englishNameTranslation: 'Le Monothéisme Pur', numberOfAyahs: 4, revelationType: 'Meccan' },
  { number: 113, name: 'الفلق', englishName: 'Al-Falaq', englishNameTranslation: 'L\'Aube Naissante', numberOfAyahs: 5, revelationType: 'Meccan' },
  { number: 114, name: 'الناس', englishName: 'An-Nas', englishNameTranslation: 'Les Hommes', numberOfAyahs: 6, revelationType: 'Meccan' },
];

export default function CoranPage() {
  const [search, setSearch] = useState('');
  const [surahs, setSurahs] = useState<Surah[]>(staticSurahs);
  
  // Audio Player State
  const [activeImam, setActiveImam] = useState(imams[0].slug);
  const [playingSurah, setPlayingSurah] = useState<Surah | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element safely on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && !audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.onended = () => setIsPlaying(false);
      audioRef.current.onpause = () => setIsPlaying(false);
      audioRef.current.onplay = () => setIsPlaying(true);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  // Handle Play/Pause logic
  const togglePlay = (surah: Surah) => {
    if (!audioRef.current) return;

    if (playingSurah?.number === surah.number) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
    } else {
      setPlayingSurah(surah);
      audioRef.current.src = getAudioUrl(activeImam, surah.number);
      audioRef.current.play();
    }
  };

  // Change Imam and auto-replay if already playing
  const handleImamChange = (slug: string) => {
    setActiveImam(slug);
    if (playingSurah && audioRef.current) {
      const wasPlaying = isPlaying;
      audioRef.current.src = getAudioUrl(slug, playingSurah.number);
      if (wasPlaying) audioRef.current.play();
    }
  };

  // Try to fetch full list from API
  useEffect(() => {
    fetch('https://api.quran.com/api/v4/chapters?language=fr')
      .then(r => r.json())
      .then(data => {
        if (data.chapters) {
          setSurahs(data.chapters.map((ch: any) => ({
            number: ch.id,
            name: ch.name_arabic,
            englishName: ch.name_simple,
            englishNameTranslation: ch.translated_name?.name || ch.name_simple,
            numberOfAyahs: ch.verses_count,
            revelationType: ch.revelation_place,
          })));
        }
      })
      .catch(() => {}); // Fallback to static
  }, []);

  const filtered = surahs.filter(s =>
    s.englishName.toLowerCase().includes(search.toLowerCase()) ||
    s.englishNameTranslation.toLowerCase().includes(search.toLowerCase()) ||
    s.name.includes(search)
  );

  return (
    <div className="flex flex-col">
      <ScreenHeader title="Coran" rightAction={<BookOpen className="w-5 h-5 text-ink-400" />} />

      <div className="px-5 py-4 flex flex-col gap-4 pb-32">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-300" />
          <Input placeholder="Rechercher une sourate..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-12" />
        </div>

        {/* Imam Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-none">
          {imams.map((imam) => (
            <button
              key={imam.slug}
              onClick={() => handleImamChange(imam.slug)}
              className={`
                px-4 py-2 rounded-pill text-[13px] font-medium whitespace-nowrap transition-all duration-300
                ${activeImam === imam.slug
                  ? 'bg-beige-900 text-gold-300 shadow-card'
                  : 'bg-white text-ink-500 hover:bg-ink-100/50 border border-ink-100'
                }
              `}
            >
              {imam.name}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {filtered.map((surah, i) => (
            <motion.div
              key={surah.number}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.02 }}
              className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-card hover:shadow-float transition-shadow cursor-pointer group"
            >
              {/* Number */}
              <div className="w-10 h-10 rounded-xl bg-beige-900/10 flex items-center justify-center text-beige-900 font-semibold text-[13px] tabular flex-shrink-0">
                {surah.number}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-body font-semibold text-ink-900 truncate">{surah.englishName}</h3>
                  <span className="text-[11px] text-ink-300 px-2 py-0.5 rounded-pill bg-ink-100/50">
                    {surah.numberOfAyahs} ayats
                  </span>
                </div>
                <p className="text-[12px] text-ink-400 truncate">{surah.englishNameTranslation}</p>
              </div>

              {/* Arabic name */}
              <span className="text-arabic-m text-gold-600 text-[18px] flex-shrink-0">{surah.name}</span>

              {/* Play button */}
              <button 
                onClick={() => togglePlay(surah)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
                  playingSurah?.number === surah.number
                  ? 'bg-ink-900 opacity-100 shadow-float' 
                  : 'bg-beige-900 opacity-0 group-hover:opacity-100'
                }`}
              >
                {playingSurah?.number === surah.number && isPlaying ? (
                  <Pause className="w-4 h-4 text-white" fill="currentColor" />
                ) : (
                  <Play className={`w-4 h-4 ${playingSurah?.number === surah.number ? 'text-white' : 'text-gold-300'} ml-0.5`} fill="currentColor" />
                )}
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating Audio Player */}
      <AnimatePresence>
        {playingSurah && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-20 left-4 right-4 z-50 bg-ink-900 text-white rounded-2xl p-4 shadow-float flex items-center gap-4"
          >
            <div className="w-10 h-10 rounded-full bg-beige-900/20 flex items-center justify-center text-gold-300 flex-shrink-0">
              <Volume2 className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-[11px] text-ink-300 uppercase tracking-widest mb-0.5">LECTURE EN COURS</p>
              <p className="text-body font-semibold truncate leading-tight">{playingSurah.englishName}</p>
              <p className="text-micro text-gold-300 truncate">{imams.find(i => i.slug === activeImam)?.name}</p>
            </div>
            
            <button 
              onClick={() => {
                if (!audioRef.current) return;
                if (isPlaying) audioRef.current.pause();
                else audioRef.current.play();
              }}
              className="w-12 h-12 rounded-full bg-beige-900 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform flex-shrink-0"
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-gold-300" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-gold-300 ml-0.5" fill="currentColor" />
              )}
            </button>

            <button 
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  audioRef.current.src = '';
                }
                setPlayingSurah(null);
                setIsPlaying(false);
              }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-state-error rounded-full flex items-center justify-center text-white shadow-card hover:scale-110 transition-transform"
            >
              <X className="w-3 h-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
