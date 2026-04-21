-- ─── Labbayk Data Seed ──────────────────────────────────────
-- Inserts 19 Formules representing the upcoming stays.

-- Clearing existing data for fresh seed (if running locally)
TRUNCATE TABLE public.formules CASCADE;

INSERT INTO public.formules (
  title, subtitle, category, start_date, end_date, 
  duration_days, duration_nights, airline, route_from, route_to, 
  has_stopover, baggage_checked_kg, baggage_cabin_kg, 
  hotel_makkah, hotel_medina, includes_breakfast, 
  price_quad, price_triple, price_double, 
  status, published
) VALUES 
-- Omra Octobre
('Omra Vacances de la Toussaint', 'Séjour Premium - 13 Jours', 'vacances', '2024-10-18', '2024-10-31', 13, 12, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Voco Makkah', 'Anwar Al Madinah', true, 1690, 1790, 1890, 'available', true),
('Omra Octobre Confort', 'Vol direct - Médine en premier', 'standard', '2024-10-05', '2024-10-17', 12, 11, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Swissbôtel Makkah', 'Pullman Zamzam', true, 1590, 1690, 1790, 'sold_out', true),

-- Omra Novembre
('Omra Novembre Économique', 'Idéal pour petits budgets', 'standard', '2024-11-04', '2024-11-16', 12, 11, 'Aegean', 'Paris CDG', 'JED', true, 23, 8, 'Olayan Makkah', 'Emaar Elite', false, 1290, 1390, 1490, 'available', true),
('Omra Novembre Confort', 'Proximité des Harams', 'standard', '2024-11-15', '2024-11-27', 12, 11, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Makkah Towers', 'Dallah Taibah', true, 1650, 1750, 1850, 'last_spots', true),

-- Omra Décembre (Vacances scolaires)
('Omra Fin d''année', 'Vacances de Noël en Famille', 'vacances', '2024-12-21', '2025-01-04', 14, 13, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Hilton Suites Makkah', 'Anwar Al Madinah', true, 1890, 1990, 2190, 'new', true),
('Omra Décembre Débutant', 'Séjour 10 Jours Express', 'standard', '2024-12-05', '2024-12-15', 10, 9, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Swissbôtel Makkah', 'Pullman Zamzam', true, 1490, 1590, 1690, 'available', true),

-- Omra Janvier
('Omra Janvier Fraicheur', 'Profitez du climat idéal', 'standard', '2025-01-10', '2025-01-22', 12, 11, 'Aegean', 'Paris CDG', 'JED', true, 23, 8, 'Makkah Hotel', 'Emaar Elite', true, 1350, 1450, 1550, 'available', true),

-- Omra Février
('Omra Février Vacances Zone C', 'Spécial Famille IDF', 'vacances', '2025-02-15', '2025-02-28', 13, 12, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Voco Makkah', 'Dallah Taibah', true, 1750, 1850, 1950, 'available', true),
('Omra Février Standard', 'Confort abordable', 'standard', '2025-02-01', '2025-02-13', 12, 11, 'Aegean', 'Paris CDG', 'JED', true, 23, 8, 'Olayan Makkah', 'Pullman Zamzam', false, 1290, 1390, 1490, 'available', true),

-- Ramadan 2025 (Mars/Avril)
('Omra Début Ramadan', 'Entrée dans le mois sacré', 'ramadan', '2025-02-28', '2025-03-14', 15, 14, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Hilton Suites Makkah', 'Anwar Al Madinah', false, 2190, 2390, 2590, 'new', true),
('Omra Mi-Ramadan', 'Vivez la sérénité', 'ramadan', '2025-03-10', '2025-03-24', 15, 14, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Makkah Towers', 'Pullman Zamzam', false, 2390, 2590, 2790, 'info_only', true),
('Omra Fin Ramadan (Khatm)', 'Les 10 dernières nuits', 'ramadan', '2025-03-20', '2025-04-03', 15, 14, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Swissbôtel Makkah', 'Dallah Taibah', false, 2990, 3290, 3590, 'info_only', true),
('Omra Mois Complet Ramadan', 'Un mois de dévotion total', 'ramadan', '2025-02-27', '2025-04-03', 30, 29, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Voco Makkah', 'Anwar Al Madinah', false, 3990, 4290, 4690, 'info_only', true),

-- Omra Chawal (Après Ramadan)
('Omra Chawal Douceur', 'Après les foules du Ramadan', 'standard', '2025-04-10', '2025-04-22', 12, 11, 'Saudia', 'Paris CDG', 'MED', false, 23, 8, 'Olayan Makkah', 'Emaar Elite', true, 1390, 1490, 1590, 'draft', false),

-- Hajj 2025 (Juin)
('Hajj 2025 Premium', 'Tentes VIP Mina & Arafat', 'hajj', '2025-05-25', '2025-06-12', 18, 17, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Swissbôtel Makkah', 'Anwar Al Madinah', true, NULL, NULL, NULL, 'info_only', true),
('Hajj 2025 Confort', 'Tentes climatisées', 'hajj', '2025-05-25', '2025-06-12', 18, 17, 'Aegean', 'Paris CDG', 'MED', true, 23, 8, 'Makkah Towers', 'Pullman Zamzam', true, NULL, NULL, NULL, 'info_only', true),
('Hajj 2025 Express', 'Le rituel avant tout', 'hajj', '2025-05-28', '2025-06-10', 13, 12, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Voco Makkah', 'Dallah Taibah', true, NULL, NULL, NULL, 'draft', false),

-- Été 2025
('Omra Été Juillet', 'Vacances d''été aux lieux saints', 'vacances', '2025-07-05', '2025-07-18', 13, 12, 'Aegean', 'Paris CDG', 'MED', true, 23, 8, 'Olayan Makkah', 'Emaar Elite', true, 1450, 1550, 1650, 'draft', false),
('Omra Été Août', 'Séjour Août', 'vacances', '2025-08-01', '2025-08-14', 13, 12, 'Saudia', 'Paris CDG', 'JED', false, 23, 8, 'Swissbôtel Makkah', 'Anwar Al Madinah', true, 1550, 1650, 1750, 'draft', false);
