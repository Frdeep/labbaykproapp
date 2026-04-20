// ─── Formule Types ───────────────────────────────────────────
// Mirrors the `formules` table in Supabase.

export type FormuleCategory = 'standard' | 'vacances' | 'ramadan' | 'hajj';

export type FormuleStatus = 'available' | 'last_spots' | 'sold_out' | 'new' | 'info_only' | 'draft';

export type Airline = 'Saudia' | 'Aegean';

export type RouteDestination = 'MED' | 'JED';

export interface Formule {
  id: string;
  title: string;
  subtitle?: string | null;
  category: FormuleCategory;
  start_date: string; // ISO date
  end_date: string;
  duration_days: number;
  duration_nights: number;
  airline: Airline;
  route_from: string;
  route_to: RouteDestination;
  has_stopover: boolean;
  baggage_checked_kg: number;
  baggage_cabin_kg: number;
  hotel_makkah: string;
  hotel_makkah_logo_key?: string | null;
  hotel_medina: string;
  hotel_medina_logo_key?: string | null;
  includes_breakfast: boolean;
  meals_included?: string | null;
  price_six?: number | null;
  price_quad?: number | null;
  price_triple?: number | null;
  price_double?: number | null;
  visa_included_europe: boolean;
  visa_extra_non_europe: number;
  status: FormuleStatus;
  images: string[];
  published: boolean;
  created_at: string;
}
