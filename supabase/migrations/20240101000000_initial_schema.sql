-- ─── Labbayk Database Schema ──────────────────────────────────
-- Base schema and RLS policies for the Labbayk App

-- 1. Custom Types
CREATE TYPE formule_category AS ENUM ('standard', 'vacances', 'ramadan', 'hajj');
CREATE TYPE formule_status AS ENUM ('available', 'last_spots', 'sold_out', 'new', 'info_only', 'draft');
CREATE TYPE airline AS ENUM ('Saudia', 'Aegean');
CREATE TYPE route_destination AS ENUM ('MED', 'JED');

CREATE TYPE booking_status AS ENUM ('draft', 'pending_contact', 'confirmed', 'completed', 'cancelled');
CREATE TYPE room_type AS ENUM ('2pers', '3pers', '4pers', '6pers');
CREATE TYPE callback_slot AS ENUM ('morning', 'afternoon', 'evening');

CREATE TYPE doc_type AS ENUM ('passport', 'selfie', 'residence_card', 'vaccination', 'other');
CREATE TYPE validation_status AS ENUM ('pending', 'uploading', 'scanning', 'validated', 'needs_retry', 'in_review');

-- 2. Tables
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'user',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE formules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  category formule_category NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  duration_days INTEGER NOT NULL,
  duration_nights INTEGER NOT NULL,
  airline airline NOT NULL,
  route_from TEXT NOT NULL,
  route_to route_destination NOT NULL,
  has_stopover BOOLEAN NOT NULL DEFAULT false,
  baggage_checked_kg INTEGER NOT NULL,
  baggage_cabin_kg INTEGER NOT NULL,
  hotel_makkah TEXT NOT NULL,
  hotel_makkah_logo_key TEXT,
  hotel_medina TEXT NOT NULL,
  hotel_medina_logo_key TEXT,
  includes_breakfast BOOLEAN NOT NULL DEFAULT false,
  meals_included TEXT,
  price_six INTEGER,
  price_quad INTEGER,
  price_triple INTEGER,
  price_double INTEGER,
  visa_included_europe BOOLEAN NOT NULL DEFAULT true,
  visa_extra_non_europe INTEGER NOT NULL DEFAULT 150,
  status formule_status NOT NULL DEFAULT 'draft',
  images TEXT[] NOT NULL DEFAULT '{}',
  published BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reference TEXT NOT NULL UNIQUE,
  user_id UUID REFERENCES auth.users(id) ON DELETE RESTRICT NOT NULL,
  formule_id UUID REFERENCES formules(id) ON DELETE RESTRICT NOT NULL,
  status booking_status NOT NULL DEFAULT 'draft',
  room_type room_type NOT NULL,
  travelers_count INTEGER NOT NULL,
  travelers JSONB NOT NULL DEFAULT '[]'::JSONB,
  total_amount INTEGER,
  preferred_callback_slot callback_slot,
  internal_notes TEXT,
  user_notes TEXT,
  contacted_at TIMESTAMPTZ,
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,
  doc_type doc_type NOT NULL,
  file_url TEXT NOT NULL,
  file_name TEXT,
  file_size INTEGER,
  mime_type TEXT,
  ocr_data JSONB,
  validation_status validation_status NOT NULL DEFAULT 'pending',
  validation_errors TEXT[] NOT NULL DEFAULT '{}',
  uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  validated_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ
);

-- 3. Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE formules ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read and update their own profile
CREATE POLICY "Users can view own profile" 
ON profiles FOR SELECT 
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (auth.uid() = id);

-- Formules: Anyone can read published formules
CREATE POLICY "Anyone can view published formules" 
ON formules FOR SELECT 
USING (published = true);

-- Bookings: Users can read and create their own bookings
CREATE POLICY "Users can view own bookings" 
ON bookings FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" 
ON bookings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own draft bookings" 
ON bookings FOR UPDATE 
USING (auth.uid() = user_id AND status = 'draft');

-- Documents: Users can read, upload, and update their own documents
CREATE POLICY "Users can view own documents" 
ON documents FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents" 
ON documents FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own documents" 
ON documents FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own documents" 
ON documents FOR DELETE 
USING (auth.uid() = user_id);

-- 4. Triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ LANGUAGE 'plpgsql';

CREATE TRIGGER update_profiles_updated_at
BEFORE UPDATE ON profiles
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON bookings
FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name)
  VALUES (new.id, new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user();
