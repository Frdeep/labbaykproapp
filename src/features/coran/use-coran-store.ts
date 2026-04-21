// ─── Coran Store (Zustand) ──────────────────────────────────
import { create } from 'zustand';

interface CoranStore {
  currentSurah: number | null;
  currentAyah: number;
  isPlaying: boolean;
  reciter: string;
  setSurah: (num: number) => void;
  setAyah: (num: number) => void;
  togglePlay: () => void;
  setReciter: (name: string) => void;
}

export const useCoranStore = create<CoranStore>((set) => ({
  currentSurah: null,
  currentAyah: 1,
  isPlaying: false,
  reciter: 'Mishary Rashid Alafasy',

  setSurah: (num) => set({ currentSurah: num, currentAyah: 1, isPlaying: false }),
  setAyah: (num) => set({ currentAyah: num }),
  togglePlay: () => set((s) => ({ isPlaying: !s.isPlaying })),
  setReciter: (name) => set({ reciter: name }),
}));
