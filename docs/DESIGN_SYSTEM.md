# 🎨 Labbayk — Design System & Refonte Reference Guide
> **Ce fichier est la source de vérité pour tout agent IA travaillant sur ce projet.**  
> Il persiste dans le workspace et ne dépend d'aucune mémoire interne de modèle.

---

## 1. Direction Artistique — "Art Deco Zen"

### Philosophie
Un style hybride fusionnant :
- **Art Deco** : Accents dorés, motifs géométriques, typographies élégantes serif
- **Zen Japonais** : Whitespace généreux, compositions calmes et équilibrées
- **Nusuk "Noor"** : La lumière comme métaphore spirituelle, rayonnements doux

### Principes Fondamentaux
| Principe | Implémentation |
|---|---|
| **"Calm Luxury"** | Whitespace généreux, palette sobre, or comme accent singulier |
| **Contenu subordonné au sacré** | L'UI renforce la concentration spirituelle, jamais de distraction |
| **Lumière comme métaphore** | Rayonnements radiaux doux, motifs filigrane, pas d'ombres dures |
| **Hiérarchie par cartes** | Tout contenu dans des cartes arrondies avec élévation subtile |
| **Dual-mode contextuel** | Light par défaut (ivoire), Dark uniquement pour les écrans rituels (Tawaf/Sa'i) |

---

## 2. Palette de Couleurs "Royal"

### Tokens CSS (source: `src/styles/tokens.css`)
```css
/* IVOIRE — Fonds principaux */
--lb-ivory-50:  #FDFBF7;   /* Fond principal */
--lb-ivory-100: #FAF6EF;   /* Fond secondaire */
--lb-ivory-200: #F5EEE2;   /* Fond tertiaire */

/* SABLE — Dégradés et cards */
--lb-sand-100:  #F2E8D4;
--lb-sand-200:  #E9DBC0;
--lb-sand-300:  #D9C7A3;
--lb-sand-400:  #BFA77C;

/* OR — Accent principal unique */
--lb-gold-100:  #F3E5C4;   /* Background léger doré */
--lb-gold-300:  #E0C37E;   /* Gradient or */
--lb-gold-500:  #C9A961;   /* Accent principal */
--lb-gold-600:  #B08E44;   /* Hover or */
--lb-gold-700:  #8B6E30;   /* Active or */

/* ENCRE — Textes et icônes */
--lb-ink-900:   #0A0E0C;   /* Texte principal */
--lb-ink-700:   #2C332F;   /* Titres secondaires */
--lb-ink-500:   #5C6561;   /* Texte body atténué */
--lb-ink-400:   #7D847F;   /* Icônes inactives */
--lb-ink-300:   #9BA39F;   /* Placeholder */
--lb-ink-200:   #C9CFCB;   /* Bordures légères */
--lb-ink-100:   #E4E7E5;   /* Séparateurs */

/* BEIGE — Actions primaires */
--lb-beige-900: #4A3C2B;   /* Boutons foncés */
--lb-beige-800: #6B573F;
--lb-beige-700: #8C7253;

/* NOIR RITUEL — Dark mode contextuel */
--lb-night-900: #070708;   /* Fond dark Tawaf/Sa'i */
--lb-night-800: #0E0E10;
--lb-night-700: #1A1A1D;

/* ÉTATS — Feedback UI uniquement */
--lb-success:   #4A7F5F;
--lb-warn:      #C48A2E;
--lb-error:     #B83A3A;
```

### Dégradés Nommés
```css
--lb-grad-home:     linear-gradient(180deg, #FDFBF7 0%, #F5EEE2 55%, #E9DBC0 100%);
--lb-grad-hero:     linear-gradient(135deg, #FAF6EF 0%, #F2E8D4 60%, #E0C37E 100%);
--lb-grad-card:     linear-gradient(180deg, #FDFBF7 0%, #F5EEE2 100%);
--lb-grad-gold:     linear-gradient(135deg, #E0C37E 0%, #C9A961 50%, #B08E44 100%);
--lb-grad-ritual:   radial-gradient(ellipse at top, #1A1A1D 0%, #070708 70%);
```

---

## 3. Typographie

### Polices
| Usage | Police | Taille | Poids | Notes |
|---|---|---|---|---|
| **Titres Display** | Fraunces (serif) | 26-40px | 500 | Sophistication chaleureuse |
| **Corps de texte** | Inter (sans-serif) | 15-17px | 400 | Lisibilité maximale |
| **Texte arabe** | Amiri (serif) | 20-28px | 400 | Pour le Coran et invocations |
| **Captions** | Inter | 13px | 500 | UPPERCASE, tracking large |
| **Micro** | Inter | 11px | 600 | Badges, indicateurs |

### Échelle Typographique
```
.text-display-xl  → 40px / 44px / w500 / serif
.text-display-l   → 32px / 36px / w500 / serif
.text-display-m   → 26px / 30px / w500 / serif
.text-title       → 20px / 26px / w500 / serif
.text-h1          → 24px / 30px / w600 / sans
.text-h2          → 18px / 24px / w600 / sans
.text-body-l      → 17px / 26px / w400 / sans
.text-body        → 15px / 22px / w400 / sans
.text-caption     → 13px / 18px / w500 / sans / UPPERCASE
.text-micro       → 11px / 14px / w600 / sans
.text-arabic-l    → 28px / 38px / Amiri
.text-arabic-m    → 20px / 32px / Amiri
```

---

## 4. Composants UI — Règles de Design

### Cards
- **Border radius** : `rounded-xl` (20px) standard, `rounded-2xl` (28px) pour hero cards
- **Ombre** : `var(--lb-shadow-card)` — très subtile
- **Background** : `var(--lb-ivory-50)` ou gradient card
- **Hover** : lift -4px + augmentation ombre (spring stiffness: 300, damping: 20)
- **Pas de bordure** par défaut (bordure uniquement pour états selected/active)

### Boutons
- **Primary** : gradient or (`--lb-grad-gold`), texte blanc, `rounded-md` (14px)
- **Secondary** : `--lb-ivory-200` fond, texte foncé
- **Ghost** : transparent, texte or, pas de bordure
- **Ritual** : fond dark + outline or pour Tawaf/Sa'i
- **Taille** : min 44px hauteur (touch targets)

### Icônes
- **Lucide React** exclusivement
- **Taille** : 24px max pour UI, 20px par défaut
- **Stroke** : 1.5-2px consistant
- **Couleur** : `var(--lb-ink-400)` par défaut, `var(--lb-gold-500)` pour active

### Bottom Tab Bar
- 5 onglets : Home, Offres, Guide, Chat, Profil
- Hauteur : ~64px + safe-area-inset-bottom
- Active : icône or + label bold
- Inactive : icône ink-400 + label regular
- Background : ivory-50 avec border-top 1px ink-100
- Effet backdrop-blur

### Spacing
- **Système 8px** (4px pour micro-ajustements)
- **Padding sections** : 20-24px horizontal, 24-32px vertical
- **Padding cards** : 16-20px interne
- **Gap entre sections** : 32-40px

---

## 5. Animations — Patterns Motion v12

### Import
```tsx
import { motion, AnimatePresence } from "motion/react"
```

### Presets Spring
| Preset | stiffness | damping | Usage |
|---|---|---|---|
| **Gentle** | 120 | 14 | Modals, éléments flottants, compteur rituel |
| **Default** | 200 | 20 | Usage général |
| **Snappy** | 400 | 25 | Toggles, petites interactions |
| **Stiff** | 500 | 30 | Tab indicator, mouvements précis |
| **Bouncy** | 600 | 15 | Playful, attention |

### Patterns Clés
```tsx
// Page transition (fade + slide)
initial={{ opacity: 0, x: 20 }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: -20 }}
transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}

// Card hover
whileHover={{ y: -4 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}

// Scroll reveal (fade-up)
initial={{ opacity: 0, y: 40 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-100px" }}
transition={{ duration: 0.6, ease: "easeOut" }}

// Stagger children (80ms par item)
staggerChildren: 0.08

// Tab indicator
layoutId="tab-indicator"
transition={{ type: "spring", stiffness: 500, damping: 30 }}

// Modal spring
transition={{ type: "spring", damping: 25, stiffness: 300 }}

// Skeleton shimmer
animate={{ backgroundPosition: ["-200% 0", "200% 0"] }}
transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
```

### Durées Standards
| Type | Durée | Notes |
|---|---|---|
| Button feedback | 80-150ms | Instantané |
| Hover effects | 150-200ms | Subtil |
| Micro-interactions | 150-300ms | Toggles, checkbox |
| Content reveals | 300-500ms | Fade-up, slide-in |
| Page transitions | 250-400ms | Route changes |
| Complex animations | 400-800ms | Multi-step |
| Stagger delay | 30-50ms/item | Entre items de liste |

### Règles de Performance
- ✅ Animer UNIQUEMENT `transform` et `opacity`
- ✅ Utiliser `viewport={{ once: true }}` pour les scroll reveals
- ✅ Respecter `prefers-reduced-motion`
- ❌ NE JAMAIS animer `width`, `height`, `top`, `left`, `margin`, `padding`
- ❌ Max 10-15 éléments animés simultanément

---

## 6. Bibliothèque 21st.dev — Composants Disponibles

### Installation
```bash
npx shadcn@latest add <component-url>
# Exemple:
npx shadcn@latest add https://21st.dev/r/aceternity/hero-highlight
npx shadcn@latest add https://21st.dev/r/magicui/animated-beam
```

### Composants Pertinents pour Labbayk

#### Hero & Backgrounds
| Composant | Source | Usage Labbayk |
|---|---|---|
| Aurora Background | aceternity | Fond subtil doré pour l'accueil |
| Background Gradient | ibelick | Gradient mesh pour sections premium |
| Spotlight Hero | aceternity | Mise en valeur des offres phares |
| Grid/Dot Pattern | magicui | Texture de fond légère |
| Retro Grid | magicui | Perspective grid élégante |

#### Cards & Content
| Composant | Source | Usage Labbayk |
|---|---|---|
| Bento Grid | magicui | Hub Guide, Dashboard Mon Voyage |
| 3D Card | aceternity | DestinationCard avec parallax tilt |
| Marquee | magicui | Logos hôtels partenaires défilants |
| Card Stack | aceternity | Carrousel offres sur mobile |
| Magic Card | magicui | Spotlight follow sur les formules |
| Hover Card Effect | aceternity | Glow animé sur les cards |

#### Navigation
| Composant | Source | Usage Labbayk |
|---|---|---|
| Floating Navbar | aceternity | Header Desktop avec blur |
| Dock | magicui | Alternative BottomTabBar macOS-style |
| Drawer | shadcn | Auth mobile Bottom Sheet |

#### Texte & Effets
| Composant | Source | Usage Labbayk |
|---|---|---|
| Text Generate | aceternity | "Assalamu Alaykum" reveal |
| Number Ticker | magicui | Stats voyage, compteur jours |
| Word Rotate | magicui | Mots tournants Hero |
| Animated Gradient Text | magicui | Titres premium dorés |
| Box Reveal | magicui | Reveal sections au scroll |
| Sparkles Text | magicui | Mise en valeur texte sacré |
| Blur Fade | magicui | Transitions douces |

#### Actions & Feedback
| Composant | Source | Usage Labbayk |
|---|---|---|
| Shimmer Button | magicui | CTA "Réserver" premium |
| Pulsating Button | magicui | Call-to-action prioritaire |
| Shine Border | magicui | Bordure brillante cards VIP |
| Border Beam | magicui | "Dernières places" highlight |
| Ripple | magicui | Cercles concentriques widget prière |
| Animated Circular Progress | magicui | Rituel counter Tawaf/Sa'i |
| Confetti | magicui | Célébration booking confirmé |

### Règles d'Intégration 21st.dev
1. **Remplacer les couleurs par nos tokens** — Utiliser `var(--lb-*)` partout
2. **Remplacer les polices** — Toujours Fraunces (titres) + Inter (body)
3. **Adapter le spacing** — Suivre le système 8px
4. **Dark mode** — Vérifier compatibilité écrans rituels
5. **Mobile-first** — Tester sur 375px, 768px, 1024px, 1440px
6. **A11y** — Garder les ARIA labels et le keyboard nav

---

## 7. UX Guidelines — Top 25 Règles pour Labbayk

### 🔴 Critical (Toujours respecter)
1. **Contraste couleur** : Minimum 4.5:1 pour le texte normal
2. **Touch targets** : Minimum 44×44px sur mobile
3. **Focus visible** : Anneau de focus 2px doré (`--lb-focus`) sur tous les éléments
4. **Hiérarchie headings** : h1→h2→h3 séquentiel, un seul h1 par page
5. **prefers-reduced-motion** : Respecter via CSS et `useReducedMotion()`
6. **Alt text** : Descriptif pour toutes les images significatives
7. **Labels visibles** : Jamais de placeholder-only sur les champs de formulaire

### 🟠 High Priority
8. **Mobile-first** : Concevoir pour 375px d'abord, puis scale up
9. **Système 8px** : Tout spacing en multiples de 8 (4 pour micro)
10. **Bottom nav ≤ 5 items** : Avec labels + icônes Lucide
11. **Safe areas iOS** : Padding notch et barre gestuelle
12. **No horizontal scroll** : Jamais sur le contenu principal mobile
13. **Adaptive navigation** : Bottom nav mobile → Sidebar desktop
14. **Une seule CTA primaire par écran** : Les secondaires sont subordonnées

### 🟡 Medium Priority
15. **Skeleton loading** : Pour tout chargement > 1s
16. **Empty states** : Message utile + action quand pas de contenu
17. **Erreurs inline** : Sous le champ concerné, pas en toast
18. **Transitions 150-300ms** : Jamais plus pour les micro-interactions
19. **Stagger 30-50ms** : Entre les items de liste
20. **Confirmation destructive** : Dialog avant suppression/annulation

### 🟢 Design Quality
21. **Pas d'émojis comme icônes** : Lucide React exclusivement
22. **Stroke cohérent** : 1.5-2px sur toutes les icônes
23. **Coins arrondis par tokens** : `--radius-xs` à `--radius-3xl`
24. **Ombres par système** : `--lb-shadow-card/float/ritual`
25. **Whitespace intentionnel** : 32-40px entre sections

---

## 8. Images & Assets (NE PAS SUPPRIMER)

### Images Existantes
```
public/images/
├── intro-1.jpg          ← Carrousel auth (Kaaba)
├── intro-2.jpg          ← Carrousel auth (Médine)
├── intro-3.png          ← Carrousel auth (Pèlerins)
├── hajj-premium.jpg     ← Page Hajj
├── omra-ramadan.jpg     ← Card offre Omra Ramadan
├── omra-toussaint.jpg   ← Card offre Omra Toussaint
├── omra-fin-annee.jpg   ← Card offre Omra Fin d'année
└── hotels/              ← Galerie hôtels partenaires
```

### Règles Images
- Format : JPEG/WebP pour photos, PNG pour transparence
- Taille max : 400KB par image
- Ratio : 4:5 vertical pour les cards destination
- Lazy loading : Toujours sauf hero/above-the-fold
- `alt` : Toujours descriptif

---

## 9. Architecture Technique

### Stack
| Tech | Version | Rôle |
|---|---|---|
| Next.js | 16.2.4 | Framework SSR/SSG (App Router) |
| React | 19.2.4 | UI Library |
| Tailwind CSS | v4 | Styling (directive `@theme`) |
| Motion | v12 | Animations (import from `motion/react`) |
| Supabase | v2 | Auth + BDD + Storage |
| Zustand | v5 | State management |
| Zod | v3 | Validation |
| React Hook Form | v7 | Formulaires |
| Lucide React | Latest | Icônes |

### Structure des Fichiers
```
src/
├── app/
│   ├── (auth)/        → Login, Signup, Forgot Password, Profile Setup
│   ├── (app)/         → App authentifiée (9 sections)
│   │   ├── page.tsx         → Accueil (OrbitWidget, PrayerRow)
│   │   ├── offres/          → Catalogue + Détails + Hôtels
│   │   ├── reserver/        → Tunnel 5 étapes
│   │   ├── guide/           → Hub Bento Grid
│   │   ├── coran/           → Lecteur audio
│   │   ├── chat/            → Assistant IA
│   │   ├── hajj/ & omra/    → Rituels (Dark Mode)
│   │   ├── mon-voyage/      → Dashboard personnel
│   │   └── profil/          → Paramètres utilisateur
│   ├── api/           → Routes API (chat, stripe legacy)
│   └── globals.css    → Tokens Tailwind v4
├── components/
│   ├── ui/            → Button, Input, ActionSquare, DestinationCard, BottomTabBar
│   ├── auth/          → AuthCarousel, formulaires
│   ├── booking/       → Steps de réservation
│   ├── chat/          → Bulles, streaming
│   ├── common/        → Logo, StatusPill, Avatar, HijriDate
│   ├── coran/         → Lecteur, liste sourates
│   ├── document/      → Upload, OCR
│   ├── formule/       → FormuleCard, détails
│   ├── layout/        → Header, Sidebar
│   ├── prayer/        → OrbitWidget, PrayerTimeRow
│   └── ritual/        → RitualCounter, Timeline
├── features/          → chat, coran, ocr, prayer, reservation
├── lib/               → supabase-browser/server, utils, validations, integrations
├── styles/            → tokens.css
└── types/             → TypeScript types
```

### Base de Données (Supabase)
- **Tables** : `profiles`, `formules`, `bookings`, `documents`
- **3 migrations SQL** + 1 seed file
- **RLS activé** sur toutes les tables
- **Storage** configuré pour documents (passeports, visas)

---

## 10. Checklist Pré-Livraison

### Qualité Visuelle
- [ ] Pas d'émojis comme icônes
- [ ] Famille d'icônes et style cohérents (Lucide, stroke 1.5-2px)
- [ ] Tokens sémantiques utilisés (pas de couleurs hardcodées)
- [ ] Dark mode testé sur les écrans rituels

### Interaction
- [ ] Touch targets ≥ 44×44px sur mobile
- [ ] Micro-interactions 150-300ms
- [ ] Tous les états disabled visuellement clairs
- [ ] Focus order = visual order

### Layout
- [ ] Mobile-first (375 / 768 / 1024 / 1440)
- [ ] Safe areas respectées (notch, status bar, gesture bar)
- [ ] Rythme spacing 4/8px maintenu
- [ ] Pas de scroll horizontal sur mobile

### A11y
- [ ] Alt text sur les images significatives
- [ ] Contraste couleur ≥ 4.5:1 pour le texte
- [ ] Labels visibles sur les champs de formulaire
- [ ] `prefers-reduced-motion` supporté
- [ ] Navigation clavier fonctionnelle
