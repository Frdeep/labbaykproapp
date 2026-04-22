# 📖 LABBAYK APP — LA BIBLE DU PROJET (V3)

> **Document de Référence Ultime & Immuable**  
> Ce document fusionne l'architecture technique actuelle avec le "Brouillon Maître" fondateur du client. Il contient toutes les règles absolues, la structure de la base de données, la copie textuelle stricte, et la planification des sprints. **Tout agent IA doit lire ce fichier avant de coder.**

---

## 1. CONTEXTE PRODUIT & RÈGLES VERROUILLÉES

- **Identité** : Labbayk Voyages (17 rue Le Bua, 75020 Paris). Agréée par le consulat d'Arabie Saoudite.
- **Règle n°1 (ZÉRO VERT)** : La palette "Art Deco Zen" est stricte. Ivoire (fond), Or cuivré (accent), Encre (texte). Interdiction absolue d'utiliser du vert (sauf pour un feedback de succès).
- **Règle n°2 (Paiement 100% Hors-Ligne)** : L'application gère des *pré-réservations*. Pas d'intégration Stripe. Le client valide son dossier, puis l'agence le rappelle sous 24h.
- **Règle n°3 (Copywriting Strict)** : Le texte "Labbayk Allahuma Labbayk" et l'intro ("Chez Labbayk, nous croyons...") ne doivent jamais être réécrits.
- **Règle n°4 (Rareté vs Chiffres)** : Utiliser "Dernières places" et non pas "4 places restantes".
- **Règle n°5 (Auth Obligatoire)** : Pas de checkout invité. Auth Supabase obligatoire avant de réserver.

---

## 2. ARCHITECTURE TECHNIQUE

- **Frontend** : Next.js 16 (App Router) + React 19 + TypeScript.
- **Styles** : Tailwind CSS v4 avec `@theme` + Variables CSS (pas de CSS-in-JS).
- **UI** : Shadcn/ui (fortement customisé).
- **Animations** : Motion v12 (Framer Motion).
- **State** : Zustand (tunnel de réservation) + React Hook Form + Zod.
- **Backend** : Supabase (PostgreSQL, Auth, Storage, Edge Functions).
- **PWA/Mobile** : Capacitor 6 pour export iOS/Android natif.

---

## 3. STRUCTURE DE LA BASE DE DONNÉES (Supabase)

Toutes les tables sont sécurisées via RLS (Row Level Security).
1. `profiles` : Données clients (id, email, phone, civility, passport_type).
2. `formules` : Le catalogue. 19 offres Omra (Standard, Vacances, Ramadan) et Hajj.
3. `bookings` : Les réservations (status: draft, pending_contact, confirmed).
4. `documents` : Fichiers uploadés (passeport, selfie). Lié au Storage bucket `user-documents`.
5. `chat_messages` : Historique du Chat IA Anthropic.
6. `coran_imams` & `coran_user_activity` : 5 récitateurs (Alafasy, Sudais, Shuraim, Muaiqly, Husary) et suivi d'écoute.
7. `guide_contents` : Contenu éditorial (Invocations, Pèlerinage, Prière).

---

## 4. DÉTAILS DES OFFRES (LES FORMULES)

- **Standard / Vacances** : Omra de 8 à 9 jours. Prix de référence Quadruple ~1490€ à 1790€. Hôtels : Voco Makkah & Assafaa Médine.
- **Ramadan** : Séjours de 10 à 16 jours. Prix plus élevés (ex: 2590€ pour la fin du Ramadan). Hôtels : Taj Park Makkah & Assafaa Médine. Sans petit-déjeuner.
- **Hajj 2026** : Formules Confort (10500€) et Standard (9000€). Affichées en mode "Information" uniquement. Pas de réservation directe, formulaire de contact dédié.
- **Inclus par défaut** : Vol (Saudia/Aegean), Transferts, Visa (passeport UE), Hôtels, Guide.
- **Non inclus** : Dépenses perso, assurance, vaccins.
- **Règle Visa** : +150€ si passeport non européen.

---

## 5. BLUEPRINT UX/UI SECTION PAR SECTION (Pour la Refonte Native-Like)

### A. Auth & Onboarding (`/splash`, `/login`, `/signup`)
- **Desktop** : Split-screen (Image 50% / Form 50%).
- **Mobile** : Slider d'images plein écran (Ken Burns) + Bottom Sheet (Tiroir glissant du bas) pour le formulaire.
- **Profile Setup** : Civilité (Frère/Sœur), Nom, Nationalité, Type de passeport.

### B. Accueil (`/`)
- Widget `PrayerOrbitWidget` : Horloge SVG avec le soleil tournant selon l'heure de la prière.
- Carrousel "Nos prochains départs" (Scroll horizontal `snap-mandatory`).
- Grille Bento pour l'accès rapide (Guide, Coran, Chat).
- Date Hijri.

### C. Catalogue & Offres (`/offres`)
- Filtres Sticky en haut (Omra, Ramadan, Vacances).
- `FormuleCard` : Affiche les 3 prix (Quad, Triple, Double). Quad mis en avant. Pastilles "Dernières places", "Complet". Hôtels sous forme de logos/miniatures.
- Détails de l'offre : En-tête Parallax (l'image de l'hôtel zoome au pull-to-refresh). 5 onglets (Aperçu, Programme, Hôtels, Inclus, Docs). Bouton "Réserver" sticky en bas.

### D. Tunnel de Réservation (`/reserver/[id]`)
Processus en 5 étapes via Zustand :
1. **Récapitulatif** (Étape 0).
2. **Voyageurs** (Noms/Prénoms).
3. **Chambre & Options**.
4. **Documents** : La "Gate" critique. Upload Passeport (vérifié par OCR Tesseract.js) + Selfie.
5. **Confirmation** : Déclenche l'insertion en BDD, la notification Resend à l'agence, et génère le numéro de dossier `LBK-YYYY-XXXXX`.

### E. Guide & Rituels (`/guide`)
- Hub principal en Bento Grid.
- **Rituels (Tawaf / Sa'i)** : Mode sombre intégral (Immersive Dark Mode) pour économiser la batterie. Compteurs interactifs qui déclenchent une vibration haptique.
- Textes éditoriaux stricts (pratique majoritaire).

### F. Coran Audio (`/guide/coran`)
- Interface type Spotify. 
- API `EveryAyah.com` et `Quran.com`.
- Mini-player flottant ancré au-dessus de la Bottom Tab Bar pour écoute continue pendant la navigation.

### G. Chat IA Labbayk (`/chat`)
- Interface type iMessage.
- Alimenté par Anthropic (Claude 3.5).
- Contraint par un "System Prompt" strict : Pas de fatwas, pas de politique, pas de diagnostic médical. S'il ne sait pas, il propose d'appeler l'agence.

### H. Mon Voyage (`/mon-voyage`)
- Tableau de bord post-réservation.
- Compte à rebours avant le départ.
- Modules : Itinéraire, Hébergement, Vol, Contacts d'urgence.

---

## 6. TEXTES & COPYWRITING (Ne pas altérer)

- **Intro** : "Chez Labbayk, nous croyons que le pèlerinage est plus qu'un simple voyage..."
- **Documents requis** : "Passeport (valide +6 mois), Photo selfie (fond blanc, hijab pour les sœurs), Carte de séjour (si passeport étranger)."
- **Visa** : "Labbayk – Votre partenaire agréé pour le visa d'Arabie saoudite."

---

*Ce document est la source de vérité. Toute future refonte ou modification du code doit respecter ces principes à la lettre.*
