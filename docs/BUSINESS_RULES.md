# BUSINESS RULES - LABBAYK VOYAGES

## 1. Agence & Positionnement
- Labbayk Voyages (basée en région parisienne).
- 10 ans d'expertise dans les pèlerinages (Omra et Hajj).
- Plus de 1000 pèlerins accompagnés avec succès (Avis : 4.9/5).
- L'application doit rassurer le client, simplifier l'administratif lourd (Visa, Passeport) et être l'assistant numéro un sur place à La Mecque.

## 2. Rituels & Pèlerinage
- Le cœur religieux de l'app concerne les compteurs rituels (Tawaf et Sa'i) : 7 tours exacts requis, accompagnés d'invocations scripturaires spécifiques à chaque palier.
- Le calendrier Hajj est structuré en 5 jours distincts, avec des étapes critiques (Mina, Arafat, Muzdalifah, Retour).

## 3. Modèle de Données (Base Supabase)
- `users/profiles` : Gère les voyageurs (Nationalité, Contacts d'urgence, Méta-données d'identité).
- `formules` : Les packages (ex: Vacances Toussaint, VIP Ramadan) avec un statut de "publication" pour les cacher/afficher publiquement.
- `bookings` : La matrice centrale liant User, Formule, nombre de pèlerins embarqués (`travelers`), le créneau de rappel et le prix.
- `documents` : Le coffre-fort sécurisé des passeports, visas. Un document est lié au `user_id` en `CASCADE ON DELETE`.
