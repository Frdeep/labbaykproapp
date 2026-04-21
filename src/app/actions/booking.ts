'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';
import type { RoomType, CallbackSlot, TravelerInfo } from '@/types/booking';

interface CreateBookingInput {
  formule_id: string;
  room_type: RoomType;
  travelers_count: number;
  travelers: TravelerInfo[];
  preferred_callback_slot?: CallbackSlot | null;
  user_notes?: string;
}

export async function createBooking(input: CreateBookingInput) {
  try {
    const supabase = await createClient();
    
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return { success: false, error: 'Vous devez être connecté pour réserver.' };
    }

    // Generate reference (LBK-XXXXXX)
    const reference = 'LBK-' + Math.random().toString(36).substring(2, 8).toUpperCase();

    const { data, error } = await supabase
      .from('bookings')
      .insert({
        reference,
        user_id: user.id,
        formule_id: input.formule_id,
        room_type: input.room_type,
        travelers_count: input.travelers_count,
        travelers: input.travelers,
        preferred_callback_slot: input.preferred_callback_slot || null,
        user_notes: input.user_notes,
        status: 'pending_contact'
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase insert error:', error);
      return { success: false, error: 'Une erreur est survenue lors de la réservation.' };
    }

    revalidatePath('/mon-voyage');
    
    return { success: true, booking: data };
  } catch (err) {
    console.error('Create booking failed:', err);
    return { success: false, error: 'Serveur indisponible.' };
  }
}
