import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hqvrbkmeyfdaqgnmecwp.supabase.co";
const supabaseAnonKey = "sb_publishable_4_RO1MXKCJ3ykDujiVnR2w_wsphdmnr";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
