# 📦 Labbayk — Project Context (pour tout agent IA)

> **Dernière mise à jour** : 22 avril 2026  
> **Ce fichier doit être lu par tout agent avant de modifier le code.**

---

## Qu'est-ce que Labbayk ?

**Labbayk** est une Progressive Web App (PWA) mobile-first destinée à l'agence de voyages **Labbayk Voyages** (Hajj & Omra). Elle permet aux pèlerins de :

1. **Réserver des formules** de pèlerinage (Hajj, Omra Ramadan, Omra Toussaint, etc.)
2. **Suivre leur voyage** (dashboard personnel, documents, contacts d'urgence)
3. **Accéder à un guide spirituel** (étapes du pèlerinage, rituel Tawaf/Sa'i)
4. **Écouter le Coran** (5 récitateurs, lecteur audio avec mini-player)
5. **Poser des questions** à un assistant IA (Claude)
6. **Gérer leur profil** et documents (passeport, visa)

## Historique Complet (18 commits)

| Sprint | Date | Commit | Contenu |
|---|---|---|---|
| Init | 20 avr | `185cd12` | Initial commit |
| Init | 20 avr | `53cd7b1` | Structure Next.js |
| **1** | 20 avr | `c0cf33b` | Bootstrap : deps, types, configs, i18n, Supabase/Capacitor |
| **2** | 20 avr | `32e2e53` | Design System : tokens Tailwind v4, typographie, composants base |
| **3** | 20 avr | `de56514` | Backend : schema SQL, RLS, 19 formules seed |
| **4** | 20 avr | `56faecf` | UI Kit : Button, ActionSquare, DestinationCard, BottomTabBar |
| **5** | 21 avr | (inclus dans sprint 7) | Features : Auth, Home, Catalogue, Réservation, Rituels, Guide, Coran, Chat, Mon Voyage, Profil |
| **7** | 21 avr | `807e4eb` | PWA manifest + Stripe webhooks |
| **8** | 21 avr | `5ac2dbc` | Retrait Stripe + Calendrier RDV + UI Desktop |
| **9** | 21 avr | `73171d1` | Booking 5 étapes + documents gate + vraies images |
| Post | 21 avr | `49d3864` | Galerie hôtels dans détails offre |
| Post | 21 avr | `628478d` | Images hôtel Assafaa |
| Post | 21 avr | `d1a68f1` | Images intro authentiques Hajj/Omra |
| Post | 21 avr | `856f253` | Trigger redeploy Vercel |
| Post | 21 avr | `e314e2d` | Refonte auth : Split-screen Desktop + Glassmorphism Mobile |
| Post | 21 avr | `3c0bf78` | Fix hydration, refonte UI Auth, Skeleton Loading |
| Post | 22 avr | `cd83b64` | Lecteur audio Coran avec 5 récitateurs |
| Post | 22 avr | `b8b33a0` | Fix boucle de redirection infinie |
| **HEAD** | 22 avr | `c891bd8` | Auth drawer mobile, demande de visa, UI premium arrondie |

## Déploiement

- **Hébergement** : Vercel
- **URL** : https://labbayk-app.vercel.app
- **Branche** : `main`
- **BDD** : Supabase (PostgreSQL)

## Règles Absolues pour la Refonte

1. **NE PAS supprimer les images** existantes dans `public/images/`
2. **NE PAS supprimer l'intro** (carrousel auth avec les 3 images)
3. **Garder** la structure de routes existante `(auth)` / `(app)`
4. **Garder** Supabase comme backend
5. **Garder** la direction artistique "Art Deco Zen"
6. **Lire** `docs/DESIGN_SYSTEM.md` avant tout travail de design
7. **Tester** en mobile-first (375px) puis desktop
8. **Utiliser** les tokens CSS existants, ne pas hardcoder de couleurs

## Problèmes Connus

| Problème | Sévérité |
|---|---|
| Confirmation Email Supabase non configurée | 🔴 Bloquant |
| Variables d'env à vérifier en prod | 🟡 Moyen |
| Icône PWA 512x512 non fournie | 🟡 Moyen |
| Edge Functions non implémentées | 🟠 Low |
| Aucun test automatisé | 🟠 Low |
| i18n non implémenté (structure en place) | 🟠 Low |
