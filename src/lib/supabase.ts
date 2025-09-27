import { createClient } from '@supabase/supabase-js';

// Replace these with your actual Supabase URL and anon key
// Using placeholder values for development to avoid errors
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

// Log a warning if real credentials are missing
if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
  console.warn('Supabase credentials not found in environment variables. Using mock data instead.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);