import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://eezccvpkexmssynooupi.supabase.co';
// Ensure the user has added VITE_SUPABASE_ANON_KEY to their secrets
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || 'MISSING_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
