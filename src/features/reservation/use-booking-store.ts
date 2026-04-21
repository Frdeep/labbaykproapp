// ─── Booking Store (Zustand) ────────────────────────────────
import { create } from 'zustand';
import type { RoomType, TravelerInfo } from '@/types/booking';

interface BookingStore {
  formuleId: string | null;
  roomType: RoomType;
  travelers: TravelerInfo[];
  travelersCount: number;
  appointmentDate: string | null;

  userNotes: string;
  step: number;
  // Actions
  setFormule: (id: string) => void;
  setRoomType: (type: RoomType) => void;
  setTravelersCount: (count: number) => void;
  updateTraveler: (index: number, data: Partial<TravelerInfo>) => void;
  setAppointmentDate: (date: string | null) => void;

  setUserNotes: (notes: string) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const defaultTraveler: TravelerInfo = {
  first_name: '',
  last_name: '',
  birth_date: '',
  nationality: 'FR',
  passport_number: '',
  is_european_passport: true,
};

export const useBookingStore = create<BookingStore>((set) => ({
  formuleId: null,
  roomType: '4pers',
  travelers: [{ ...defaultTraveler }],
  travelersCount: 1,
  appointmentDate: null,

  userNotes: '',
  step: 0,

  setFormule: (id) => set({ formuleId: id }),
  setRoomType: (type) => set({ roomType: type }),
  setTravelersCount: (count) =>
    set((state) => {
      const travelers = [...state.travelers];
      while (travelers.length < count) travelers.push({ ...defaultTraveler });
      return { travelersCount: count, travelers: travelers.slice(0, count) };
    }),
  updateTraveler: (index, data) =>
    set((state) => {
      const travelers = [...state.travelers];
      travelers[index] = { ...travelers[index], ...data };
      return { travelers };
    }),
  setAppointmentDate: (date) => set({ appointmentDate: date }),

  setUserNotes: (notes) => set({ userNotes: notes }),
  nextStep: () => set((s) => ({ step: Math.min(s.step + 1, 3) })),
  prevStep: () => set((s) => ({ step: Math.max(s.step - 1, 0) })),
  reset: () =>
    set({
      formuleId: null,
      roomType: '4pers',
      travelers: [{ ...defaultTraveler }],
      travelersCount: 1,
      appointmentDate: null,

      userNotes: '',
      step: 0,
    }),
}));
