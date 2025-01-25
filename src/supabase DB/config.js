import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL; 
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY; // Replace with your Supabase public anon key


export const supabase = createClient(supabaseUrl, supabaseKey);