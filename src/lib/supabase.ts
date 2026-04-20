// ─── Supabase Browser Client ─────────────────────────────────
// Used in Client Components ('use client')
// For Server Components, use supabase-server.ts instead.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
