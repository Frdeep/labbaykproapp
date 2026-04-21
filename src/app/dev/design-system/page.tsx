'use client';

import { PlaceholderImage } from '@/components/common/placeholder-image';
import { StatusPill } from '@/components/common/status-pill';
import { HijriDate } from '@/components/common/hijri-date';
import { AvatarPlaceholder } from '@/components/common/avatar-placeholder';
import { Logo } from '@/components/common/logo';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-ivory-50 pb-20">
      {/* Header */}
      <header className="bg-grad-hero px-6 pt-12 pb-10">
        <Logo size="lg" />
        <p className="text-body text-ink-500 text-center mt-3">
          Design System — Sprint 2 Validation
        </p>
      </header>

      <div className="max-w-[440px] mx-auto px-5 space-y-12 mt-8">

        {/* ── PALETTE ──────────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Palette</h2>

          <div className="space-y-3">
            <ColorGroup title="Ivoire" colors={[
              { name: '50', className: 'bg-ivory-50 border border-ink-100' },
              { name: '100', className: 'bg-ivory-100' },
              { name: '200', className: 'bg-ivory-200' },
            ]} />

            <ColorGroup title="Sable" colors={[
              { name: '100', className: 'bg-sand-100' },
              { name: '200', className: 'bg-sand-200' },
              { name: '300', className: 'bg-sand-300' },
              { name: '400', className: 'bg-sand-400' },
            ]} />

            <ColorGroup title="Or cuivré" colors={[
              { name: '100', className: 'bg-gold-100' },
              { name: '300', className: 'bg-gold-300' },
              { name: '500', className: 'bg-gold-500' },
              { name: '600', className: 'bg-gold-600' },
              { name: '700', className: 'bg-gold-700' },
            ]} />

            <ColorGroup title="Encre" colors={[
              { name: '100', className: 'bg-ink-100' },
              { name: '200', className: 'bg-ink-200' },
              { name: '300', className: 'bg-ink-300' },
              { name: '400', className: 'bg-ink-400' },
              { name: '500', className: 'bg-ink-500' },
              { name: '700', className: 'bg-ink-700' },
              { name: '900', className: 'bg-ink-900' },
            ]} />

            <ColorGroup title="Nuit (rituel)" colors={[
              { name: '700', className: 'bg-night-700' },
              { name: '800', className: 'bg-night-800' },
              { name: '900', className: 'bg-night-900' },
            ]} />

            <ColorGroup title="États" colors={[
              { name: 'success', className: 'bg-state-success' },
              { name: 'warn', className: 'bg-state-warn' },
              { name: 'error', className: 'bg-state-error' },
            ]} />
          </div>
        </section>

        {/* ── GRADIENTS ────────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Dégradés</h2>
          <div className="space-y-3">
            {[
              { name: 'Home', className: 'bg-grad-home' },
              { name: 'Hero', className: 'bg-grad-hero' },
              { name: 'Card', className: 'bg-grad-card' },
              { name: 'Gold', className: 'bg-grad-gold' },
              { name: 'Ritual', className: 'bg-grad-ritual' },
            ].map(g => (
              <div key={g.name} className="flex items-center gap-3">
                <div className={`w-full h-14 rounded-xl ${g.className}`} />
                <span className="text-caption text-ink-400 w-16 shrink-0">{g.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── TYPOGRAPHY ───────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Typographie</h2>
          <div className="space-y-4 bg-ivory-100 rounded-2xl p-5">
            <p className="text-display-xl">Display XL — Fraunces</p>
            <p className="text-display-l">Display L — Fraunces</p>
            <p className="text-display-m">Display M — Fraunces</p>
            <p className="text-title">Title — Fraunces</p>
            <hr className="border-ink-100" />
            <p className="text-h1">Heading 1 — Inter</p>
            <p className="text-h2">Heading 2 — Inter</p>
            <p className="text-body-l">Body Large — Inter 17px</p>
            <p className="text-body">Body — Inter 15px</p>
            <p className="text-caption text-ink-500">Caption — Inter uppercase</p>
            <p className="text-micro text-ink-400">Micro — Inter 11px</p>
            <hr className="border-ink-100" />
            <p className="text-arabic-l" dir="rtl">بسم الله الرحمن الرحيم</p>
            <p className="text-arabic-m" dir="rtl">لبيك اللهم لبيك</p>
          </div>
        </section>

        {/* ── BORDER RADIUS ────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Rayons de bordure</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'xs (6px)', cls: 'rounded-xs' },
              { name: 'sm (10px)', cls: 'rounded-sm' },
              { name: 'md (14px)', cls: 'rounded-md' },
              { name: 'lg (16px)', cls: 'rounded-lg' },
              { name: 'xl (20px)', cls: 'rounded-xl' },
              { name: '2xl (28px)', cls: 'rounded-2xl' },
              { name: 'pill', cls: 'rounded-pill' },
            ].map(r => (
              <div key={r.name} className={`w-16 h-16 bg-sand-200 ${r.cls} flex items-center justify-center`}>
                <span className="text-[9px] text-ink-500 font-medium">{r.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── SHADOWS ──────────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Ombres</h2>
          <div className="flex gap-4">
            <div className="w-24 h-24 bg-ivory-50 rounded-xl shadow-card flex items-center justify-center">
              <span className="text-micro text-ink-400">Card</span>
            </div>
            <div className="w-24 h-24 bg-ivory-50 rounded-xl shadow-float flex items-center justify-center">
              <span className="text-micro text-ink-400">Float</span>
            </div>
            <div className="w-24 h-24 bg-night-900 rounded-xl shadow-ritual flex items-center justify-center">
              <span className="text-micro text-gold-500">Ritual</span>
            </div>
          </div>
        </section>

        {/* ── STATUS PILLS ─────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Status Pills</h2>
          <div className="flex flex-wrap gap-2">
            <StatusPill tone="gold">Dernières places</StatusPill>
            <StatusPill tone="ivory">Nouveau</StatusPill>
            <StatusPill tone="muted">Complet</StatusPill>
            <StatusPill tone="success">Validé</StatusPill>
            <StatusPill tone="error">Erreur</StatusPill>
          </div>
        </section>

        {/* ── AVATARS ──────────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Avatars</h2>
          <div className="flex items-end gap-3">
            <AvatarPlaceholder size="sm" />
            <AvatarPlaceholder size="md" initials="AK" />
            <AvatarPlaceholder size="lg" initials="FA" />
            <AvatarPlaceholder size="xl" />
          </div>
        </section>

        {/* ── HIJRI DATE ───────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Date Hégirien</h2>
          <div className="bg-ivory-100 rounded-xl p-4">
            <HijriDate />
          </div>
        </section>

        {/* ── PLACEHOLDER IMAGES ───────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Placeholder Images</h2>
          <div className="grid grid-cols-2 gap-3">
            <PlaceholderImage context="hotel-voco-makkah-facade" ratio="4/5" tone="ivory" />
            <PlaceholderImage context="imam-alafasy-portrait" ratio="1/1" rounded="full" tone="sand" />
            <PlaceholderImage context="formule-f01-hero" ratio="16/10" tone="gold" />
            <PlaceholderImage context="ritual-tawaf-step-1" ratio="4/5" tone="ritual" />
          </div>
        </section>

        {/* ── LOGO SIZES ───────────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Logo</h2>
          <div className="flex flex-col items-center gap-6 bg-ivory-100 rounded-2xl p-8">
            <Logo size="sm" />
            <Logo size="md" />
            <Logo size="lg" />
            <Logo size="xl" />
          </div>
        </section>

        {/* ── TABULAR NUMBERS ──────────────────────── */}
        <section>
          <h2 className="text-title text-ink-900 mb-4">Chiffres tabulaires</h2>
          <div className="space-y-1 bg-ivory-100 rounded-xl p-4">
            <div className="flex justify-between">
              <span className="text-body text-ink-500">Chambre Quadruple</span>
              <span className="text-body font-semibold tabular">1 490 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-ink-500">Chambre Triple</span>
              <span className="text-body tabular">1 590 €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-body text-ink-500">Chambre Double</span>
              <span className="text-body tabular">1 690 €</span>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}

/* ── Helper component ──────────────────────────── */
function ColorGroup({
  title,
  colors,
}: {
  title: string;
  colors: { name: string; className: string }[];
}) {
  return (
    <div>
      <p className="text-caption text-ink-400 mb-1.5">{title}</p>
      <div className="flex gap-2">
        {colors.map(c => (
          <div key={c.name} className="flex flex-col items-center gap-1">
            <div className={`w-10 h-10 rounded-lg ${c.className}`} />
            <span className="text-[9px] text-ink-400">{c.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
