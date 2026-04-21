import { ScreenHeader } from '@/components/layout/screen-header';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

// Static guide content (expandable later)
const guideContent: Record<string, { title: string; content: string[] }> = {
  prieres: { title: 'Les 5 Prières', content: ['Fajr — L\'aube, avant le lever du soleil', 'Dhuhr — Milieu de journée', 'Asr — L\'après-midi', 'Maghrib — Au coucher du soleil', 'Isha — La nuit'] },
  douas: { title: 'Invocations essentielles', content: ['Dua à l\'entrée de la Mosquée', 'Dua lors du Tawaf', 'Dua entre les deux coins yéménites', 'Dua à Arafat', 'Dua de voyage'] },
  tawaf: { title: 'Le Tawaf', content: ['Commencez à la Pierre Noire', 'Tournez dans le sens inverse des aiguilles d\'une montre', '7 tours complets', 'Restez en état de pureté', 'Priez 2 rakat après le Tawaf'] },
  sai: { title: 'Le Sa\'i', content: ['Commencez au mont Safâ', 'Marchez vers le mont Marwa', '7 traversées au total', 'Accélérez entre les piliers verts', 'Invoquez Allah à chaque sommet'] },
  mina: { title: 'Mina', content: ['Séjour sous les tentes', 'Prières raccourcies', 'Préparation spirituelle', 'Lapidation des Jamarat'] },
  arafat: { title: 'La station d\'Arafat', content: ['Le pilier du Hajj', 'Wuquf du Dhuhr au Maghrib', 'Invocations intensives', 'Le jour du pardon'] },
  muzdalifah: { title: 'Muzdalifah', content: ['Prière du Maghrib et Isha combinées', 'Nuit à la belle étoile', 'Ramassage des cailloux', 'Départ après Fajr'] },
  medine: { title: 'Médine la Lumineuse', content: ['Visite de la Mosquée du Prophète ﷺ', 'Prière au Rawda', 'Visite de Uhud', 'Visite de Quba'] },
  conseils: { title: 'Conseils pratiques', content: ['Restez hydraté', 'Portez des chaussures confortables', 'Gardez vos documents en sécurité', 'Respectez les autres pèlerins', 'Apprenez quelques mots d\'arabe'] },
};

export default async function GuideDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = guideContent[slug];

  if (!guide) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <p className="text-body text-ink-400">Guide non trouvé</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <ScreenHeader
        leftAction={
          <Link href="/guide" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-ink-100/50">
            <ArrowLeft className="w-5 h-5 text-ink-500" />
          </Link>
        }
        title={guide.title}
      />

      <div className="px-5 py-6">
        <div className="space-y-4">
          {guide.content.map((item, i) => (
            <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl shadow-card">
              <div className="w-8 h-8 rounded-lg bg-beige-900 flex items-center justify-center text-gold-300 font-semibold text-[13px] flex-shrink-0">
                {i + 1}
              </div>
              <p className="text-body text-ink-700 pt-1">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
