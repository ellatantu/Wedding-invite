import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// `isConfigured` lets Signboard.jsx show a friendly message instead of
// crashing if .env.local hasn't been filled in yet (e.g. during local
// dev before Supabase is set up, or if a deploy is missing the env vars).
export const isConfigured = Boolean(url && key);

export const supabase = isConfigured ? createClient(url, key) : null;
