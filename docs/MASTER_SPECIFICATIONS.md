# 📖 Labbayk Premium App — MASTER SPECIFICATIONS & PLAN

> **Document de Référence Ultime**  
> Ce document sert de "cerveau externe". Il contient absolument toutes les instructions, sprints, et spécifications de l'application Labbayk. Il est conçu pour qu'**aucun contexte ne soit perdu** lors d'un changement d'agent IA ou de compte.

---

## 1. Vision et Objectifs
**Labbayk** est l'application mobile-first (PWA) de l'agence Labbayk Voyages. 
L'objectif est d'offrir une expérience digitale *premium* et fluide pour l'accompagnement au pèlerinage (Hajj & Omra).

**Règles absolues (définies par le client) :**
- Le Backend (Supabase) et Frontend (Next.js/React) actuels sont stables et doivent être conservés.
- Le Design sera refait/amélioré lors d'une prochaine phase, mais la base actuelle "Art Deco Zen" (Ivoire, Emeraude, Or) reste le socle.
- Aucune image du dossier `/public/images/` ne doit être supprimée.

---

## 2. Rétrospective et Planification (Sprint 1 à 9)

Voici le plan complet de tout ce qui a été construit et qui définit l'application.

### ✅ SPRINT 1 : Bootstrap & Fondations
- **Stack** : Next.js 16 (App Router), React 19, Tailwind CSS v4.
- **Dépendances clés** : `motion/react` (animations), `zustand` (state), `lucide-react` (icônes), `react-hook-form` + `zod` (formulaires).
- **Structure** : Dossiers `(auth)` pour les visiteurs, et `(app)` pour les utilisateurs connectés.

### ✅ SPRINT 2 : Design System ("Art Deco Zen")
- **Palette "Royal"** : Fonds Ivoire (`#FDFBF7`), Textes Encre, Accents Or (`#C9A961`).
- **Typographie** : Fraunces (Titres sérif élégants) et Inter (Corps de texte lisible).
- **Rituels** : Un "Dark Mode" contextuel immersif dédié aux écrans de Tawaf et Sa'i.

### ✅ SPRINT 3 : Backend & Supabase
- **Authentification** : Gestion des sessions via `supabase-server` et middleware.
- **Base de données (PostgreSQL)** :
  1. `profiles` : Données utilisateurs (nom, prénom, téléphone).
  2. `formules` : Catalogue des voyages (Hajj, Omra Ramadan, etc.).
  3. `bookings` : Réservations avec statuts.
  4. `documents` : Upload de passeports/visas sécurisé via RLS.

### ✅ SPRINT 4 : UI Kit Premium
- **Composants** : `Button`, `Input`, `ActionSquare`, `DestinationCard`, `BottomTabBar`.
- **Animations** : Utilisation intensive des transitions `spring` (Framer Motion v12) pour un ressenti "app native iOS".

### ✅ SPRINT 5 : Les 10 Features Cores
1. **Accueil** : Dashboard avec horloge de prière orbitale, météo, stats agence.
2. **Catalogue** : Liste filtrable des formules avec pastilles d'état (Dernières places, Complet).
3. **Guide Spirituel** : Hub d'informations en format "Bento Grid".
4. **Coran Audio** : Lecteur intégré avec 5 récitateurs, API `EveryAyah`, mini-player flottant.
5. **Chat IA** : Assistant virtuel connecté à Claude (Anthropic).
6. **Rituels (Tawaf/Sa'i)** : Compteurs haptiques animés en mode sombre.
7. **Mon Voyage** : Suivi du séjour, décompte avant départ, urgences.
8. **Profil** : Paramètres et déconnexion.

### ✅ SPRINT 6 & 7 : PWA & Déploiement
- **PWA** : Configuration `manifest.json` pour installation sur écran d'accueil mobile.
- **Paiements (Annulés)** : L'intégration Stripe a été testée puis retirée à la demande du client.

### ✅ SPRINT 8 : Réservation sur Mesure
- Remplacement du paiement par un **système de prise de rendez-vous / calendrier**.

### ✅ SPRINT 9 : Tunnel de Réservation 5 Étapes
- Le "Booking Flow" a été totalement structuré via Zustand :
  1. Choix chambre/formule.
  2. Informations voyageurs.
  3. **Demande de Visa & Upload Documents (Passeport)**.
  4. Récapitulatif.
  5. Confirmation finale.

---

## 3. Notes sur les Maquettes (Photos du Client)

> **IMPORTANT POUR L'IA :** Lors des premières sessions, le client a fourni plusieurs photos/captures d'écran avec des instructions visuelles et fonctionnelles précises (inspirées de Nusuk et d'applications premium).

**Ce qui a été extrait et implémenté à partir de ces photos :**
- L'esthétique "Split-screen" sur desktop pour le login.
- L'utilisation de cartes avec des coins très arrondis (`rounded-3xl`) et des ombres douces.
- Le carrousel d'images en arrière-plan avec le texte qui se superpose (glassmorphism).
- La barre de navigation basse (Bottom Tab Bar) type iOS avec un indicateur actif animé.
- L'horloge orbitale pour les prières.

---

## 4. Prochaines Étapes (Futures Refontes)

Conformément aux instructions :
1. **Le Backend et le Frontend restent intacts** pour garantir la stabilité fonctionnelle.
2. **Le Design sera refondu plus tard** (probablement via l'intégration poussée de nouveaux composants 21st.dev et UI/UX Pro Max).
3. **Traductions** : Activer `next-intl` (actuellement en attente).
4. **Mails** : Configurer un fournisseur d'emails sur Supabase pour la confirmation d'inscription.

---
*Ce document est versionné dans Git. Tout agent IA prenant le relais doit impérativement le lire.*
