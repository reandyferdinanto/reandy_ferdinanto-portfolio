-- ==========================================
-- PORTFOLIO DATABASE SCHEMA INITIALIZATION
-- ==========================================
-- Run this SQL on your local Supabase Studio or 
-- your VPS Supabase SQL editor to create the tables.

-- 1. Table: site_settings
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Table: skills
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL CHECK (category IN ('frontend', 'backend', 'other')),
    name TEXT NOT NULL,
    level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Table: projects
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT DEFAULT 'other',
    image_url TEXT,
    demo_url TEXT,
    technologies TEXT,
    image_credit TEXT,
    image_credit_url TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Table: certificates
CREATE TABLE IF NOT EXISTS public.certificates (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    avatar_url TEXT,
    review TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Table: contact_options
CREATE TABLE IF NOT EXISTS public.contact_options (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL,
    label TEXT,
    value TEXT NOT NULL,
    link TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. Table: web_orders
CREATE TABLE IF NOT EXISTS public.web_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    whatsapp TEXT,
    reference_url TEXT,
    requirements TEXT,
    status TEXT DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. Table: web_catalogs
CREATE TABLE IF NOT EXISTS public.web_catalogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    image_url TEXT,
    demo_url TEXT,
    description TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. Table: timeline
CREATE TABLE IF NOT EXISTS public.timeline (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('career', 'education')),
    title TEXT NOT NULL,
    date TEXT,
    location TEXT,
    "desc" TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================
-- Enable RLS for all tables (optional but recommended for security)
-- Since data fetch is done largely publicly, we will allow read access
-- to all users, but only allow write access to authenticated users.

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.web_catalogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.timeline ENABLE ROW LEVEL SECURITY;

-- Allow Read (Select) access to anyone for public assets
CREATE POLICY "Allow public read access" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.certificates FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.contact_options FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.web_catalogs FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON public.timeline FOR SELECT USING (true);

-- Allow inserting web orders to anyone (public)
CREATE POLICY "Allow public insert for web_orders" ON public.web_orders FOR INSERT WITH CHECK (true);
-- But only admin / auth can read web orders!
CREATE POLICY "Allow auth read for web_orders" ON public.web_orders FOR SELECT USING (auth.role() = 'authenticated');

-- Allow all operations for authenticated users (Admin)
CREATE POLICY "Allow auth full access" ON public.site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.certificates FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.contact_options FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.web_orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.web_catalogs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth full access" ON public.timeline FOR ALL USING (auth.role() = 'authenticated');
