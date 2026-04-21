import { createClient } from '@/lib/supabase-server';
import { notFound } from 'next/navigation';
import { FormuleDetailClient } from './detail-client';

export default async function FormuleDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: formule } = await supabase
    .from('formules')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single();

  if (!formule) {
    notFound();
  }

  return <FormuleDetailClient formule={formule} />;
}
