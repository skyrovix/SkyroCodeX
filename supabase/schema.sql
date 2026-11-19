-- =========================================================
-- SkyroCodeX :: Supabase Production PostgreSQL Schema
-- =========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL DEFAULT '',
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2. SNIPPETS TABLE
CREATE TABLE IF NOT EXISTS public.snippets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL DEFAULT 'Untitled Snippet',
    language TEXT NOT NULL,
    code TEXT NOT NULL,
    stdin TEXT DEFAULT '',
    is_public BOOLEAN DEFAULT true NOT NULL,
    short_id TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Index for instant lookup by short_id
CREATE INDEX IF NOT EXISTS idx_snippets_short_id ON public.snippets(short_id);
CREATE INDEX IF NOT EXISTS idx_snippets_user_id ON public.snippets(user_id);

-- 3. EXECUTIONS TABLE
CREATE TABLE IF NOT EXISTS public.executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    snippet_id UUID REFERENCES public.snippets(id) ON DELETE CASCADE,
    language TEXT NOT NULL,
    status TEXT NOT NULL,
    time_ms INTEGER DEFAULT 0,
    memory_kb INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_executions_user_id ON public.executions(user_id);
CREATE INDEX IF NOT EXISTS idx_executions_snippet_id ON public.executions(snippet_id);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.snippets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.executions ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
CREATE POLICY "Public profiles are viewable by everyone."
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile."
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile."
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Snippets Policies
CREATE POLICY "Public snippets or owned snippets are viewable."
    ON public.snippets FOR SELECT
    USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Logged in users can insert snippets."
    ON public.snippets FOR INSERT
    WITH CHECK (auth.uid() = user_id OR user_id IS NULL);

CREATE POLICY "Users can update their own snippets."
    ON public.snippets FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own snippets."
    ON public.snippets FOR DELETE
    USING (auth.uid() = user_id);

-- Executions Policies
CREATE POLICY "Users can view their own executions."
    ON public.executions FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Any execution can be recorded."
    ON public.executions FOR INSERT
    WITH CHECK (true);

-- Auto-create profile on Supabase auth user signup trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, name, avatar_url)
    VALUES (
        new.id,
        COALESCE(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
        COALESCE(new.raw_user_meta_data->>'avatar_url', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

