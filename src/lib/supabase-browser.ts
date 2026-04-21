// ─── Supabase Browser Client ─────────────────────────────────
// Used in Client Components ('use client').
// Uses @supabase/ssr for proper SSR cookie handling.

import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
