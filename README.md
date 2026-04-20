# Labbayk App — Hajj & Omra

> Votre partenaire de confiance pour le Hajj et la Omra.

## Stack technique

- **Frontend** : Next.js 16 (App Router) + TypeScript + React 19
- **Styles** : Tailwind CSS 4 + CSS custom tokens
- **UI** : shadcn/ui (customisés)
- **Animations** : Framer Motion 11+
- **Fonts** : Fraunces, Inter, Amiri
- **State** : Zustand + React Context
- **Forms** : React Hook Form + Zod
- **i18n** : next-intl (FR + EN, AR prévu)
- **Backend** : Supabase (Auth + Postgres + Storage + Edge Functions)
- **Email** : Resend
- **Audio Coran** : API Quran.com v4 + EveryAyah.com
- **OCR** : Tesseract.js
- **Mobile** : Capacitor 7 (iOS + Android)

## Lancer le projet

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.local.example .env.local
# Remplir les clés dans .env.local

# 3. Lancer le serveur de développement
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement requises

Voir `.env.local.example` pour la liste complète.

## Structure du projet

```
src/
├── app/          # Routes Next.js (App Router)
├── components/   # Composants React réutilisables
├── features/     # Logique métier par fonctionnalité
├── lib/          # Utilitaires, clients API, constantes
├── styles/       # Tokens CSS, design system
├── i18n/         # Traductions FR/EN
└── types/        # TypeScript types
```

## Déploiement

- **Web** : Vercel
- **iOS** : Capacitor → Xcode → App Store
- **Android** : Capacitor → Android Studio → Google Play

---

**Labbayk Allahuma Labbayk.**
