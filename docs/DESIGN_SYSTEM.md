# DESIGN SYSTEM - LABBAYK ("Art Deco Zen")

## 1. Philosophie Globale
L'application doit refléter le sacré, le premium et le confort. Elle s'inspire du niveau d'exigence visuelle de Nusuk, tout en intégrant des schémas d'expérience utilisateur (UX) ultra-modernes (Bento Grid, Swipes horizontaux, Snapping).

## 2. Palette de Couleurs "Noor"
Les couleurs ne sont pas de simples identifiants, elles portent un sens émotionnel :
- **Emerald (Dominante/Confiance) :** `emerald-900` (#0A3B2B) remplace le noir profond dans presque toutes nos barres de surface pour un look oriental riche.
- **Gold (Action/Prestige) :** `gold-300` (#E5CF98), `gold-500` (#D4B56A), `gold-600` (#C9A961). Utilisée en touche pour les appels à l'action, l'état actif, ou les bordures subtiles. Une classe utilitaire `bg-grad-gold` offre le dégradé premium.
- **Ivory & Sand (Profondeur/Neutre) :** `ivory-50` (#FDFDFB) est le fond principal, plus doux qu'un blanc froid. Le `sand-100` à `sand-300` sert pour les cartes secondaires ou les zones de séparation.
- **Ink (Textes & Contour) :** `ink-900` (#171A19) pour les titres, `ink-500` pour les descriptions.

## 3. Typographie (Fontes)
- Les en-têtes et le branding global (`Logo`) adoptent un lettrage épuré mais affirmé.
- Classes de typographie principales :
  - `text-display-m` : Titres principaux d'accueil.
  - `text-h1`, `text-h2` : Sections.
  - `text-body`, `text-body-l` : Contenu lisible, avec un "line-height" respirant (1.6).
  - `text-caption`, `text-micro` : Petits textes descriptifs, labels d'icônes de la navbar.

## 4. Composants Majeurs / Layout Patterns
- **Composants d'Action (Cards) :** Toujours arrondis (`rounded-2xl` à `rounded-3xl` pour un feeling très doux), surmontées d'un `shadow-card` (ombre douce) ou `shadow-float` (élévation marquée).
- **Feedback Haptique :** Visuellement traduit par des boutons qui réagissent fermement au clic (`active:scale-[0.98]`).
- **Mode Sombre (Rituels) :** Pour l'immersion religieuse de nuit (Compteur de Tawaf), on opte pour un renversement total du thème : des fonds noirs mats avec des traits "Royal Gold".
