import { createClient } from '@supabase/supabase-js';
console.log(process.env.SUPABASE_URL!, process.env.SUPABASE_API_KEY!);
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_API_KEY!);
