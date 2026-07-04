import { createClient } from "@supabase/supabase-js";

// Safe fallbacks to prevent runtime initialization crashes when envs are not yet set
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://your-placeholder-supabase-url.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.placeholder";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Utility function to check if Supabase is properly configured
export const isSupabaseConfigured = () => {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL !== undefined &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== undefined
  );
};
