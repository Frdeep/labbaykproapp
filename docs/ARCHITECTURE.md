# ARCHITECTURE TECHNIQUE - LABBAYK APP

## 1. Stack Technique Globale
- **Framework Front :** Next.js 16 (App Router) + Turbopack
- **Language :** TypeScript Strict
- **State Management :** Zustand (pour les stores complexes: Booking, Coran, Chat)
- **Styling :** Tailwind CSS v4 + variables CSS natives
- **Composants UI :** Composants "Shadcn/UI" modifiés pour correspondre au design "Art Deco Zen" + intégrations `21st.dev` / Aceternity.
- **Animations :** Framer Motion (Motion v12)
- **Backend / BDD :** Supabase (PostgreSQL, Authentification, Storage)
- **i18n :** Configuration multi-langues (FR par défaut, préparation AR)

## 2. Structure des Dossiers
- `/src/app/(auth)` : Les pages pré-authentification (Splash, Onboarding carrousel, Login, Signup).
- `/src/app/(app)` : Layout principal protégé par l'authentification (BottomTabBar, Header, Navigation métier).
- `/src/app/api` : Route Handlers (ex: proxy AI Chat).
- `/src/app/actions` : Server Actions sécurisées (booking, auth, profile) pour éviter les fetch API complexes.
- `/src/components/common` : Éléments globaux (Logo, UploadCard, ProgressBar).
- `/src/components/layout` : Squelette (BottomTabBar, ScreenHeader).
- `/src/components/ui` : Composants de micro-interaction et de design (Boutons, Inputs, DestinationCard).
- `/src/features` : Stores Zustand et logiques métiers segmentées (reservation, chat, coran).
- `/src/types` : Définitions TypeScript calquées sur la structure de la base de données.
- `/supabase/migrations` : Les schémas de BDD (Profils, Réservations, Formules, Documents Storage).

## 3. Sécurité (Supabase)
Toute la logique d'accès repose sur l'implémentation de `@supabase/ssr`. 
Le Middleware `src/proxy.ts` est responsable de la rotation des tokens serveur/client et de la redirection des utilisateurs non-authentifiés vers la boucle `/splash -> /onboarding -> /login`.

## 4. Choix de Conception Architecturaux
- "Server Actions First" : Les modifications en base de données sont toutes gérées côté serveur.
- Composants "Client" ciblés : Seuls les écrans interactifs (wizard, compteurs rituels) sont déclarés avec `'use client'`.
