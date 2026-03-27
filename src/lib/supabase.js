import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ukyugqwbcdwcxvfrrabm.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVreXVncXdiY2R3Y3h2ZnJyYWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1NDE5ODMsImV4cCI6MjA5MDExNzk4M30.9-tGUCKbnpc9KxqvJapjFP0AxJRB3u97RPlBF5p9y9s';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
