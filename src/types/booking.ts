// ─── Booking Types ───────────────────────────────────────────
// Mirrors the `bookings` table in Supabase.

export type BookingStatus = 'draft' | 'pending_contact' | 'confirmed' | 'completed' | 'cancelled';

export type RoomType = '2pers' | '3pers' | '4pers' | '6pers';

export type CallbackSlot = 'morning' | 'afternoon' | 'evening';

export interface TravelerInfo {
  first_name: string;
  last_name: string;
  birth_date: string;
  nationality: string;
  passport_number?: string;
  is_european_passport: boolean;
}

export interface Booking {
  id: string;
  reference: string;
  user_id: string;
  formule_id: string;
  status: BookingStatus;
  room_type: RoomType;
  travelers_count: number;
  travelers: TravelerInfo[];
  total_amount?: number | null;
  preferred_callback_slot?: CallbackSlot | null;
  internal_notes?: string | null;
  user_notes?: string | null;
  contacted_at?: string | null;
  confirmed_at?: string | null;
  created_at: string;
  updated_at: string;
}
