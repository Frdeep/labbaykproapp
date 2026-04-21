'use server';

import { createClient } from '@/lib/supabase-server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Non authentifié.' };

    const payload = {
      first_name: formData.get('first_name')?.toString(),
      last_name: formData.get('last_name')?.toString(),
      phone: formData.get('phone')?.toString(),
      birth_date: formData.get('birth_date')?.toString(),
      nationality: formData.get('nationality')?.toString(),
      emergency_contact_phone: formData.get('emergency_contact_phone')?.toString(),
    };

    const { error } = await supabase
      .from('profiles')
      .update(payload)
      .eq('id', user.id);

    if (error) throw error;

    revalidatePath('/profil');
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
