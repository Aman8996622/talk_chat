import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: "./config.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate if Supabase URL and key are available
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or key is missing in environment variables.");
} else {
  console.log("Supabase URL:", supabaseUrl);
  console.log("Supabase Key:", supabaseKey);
}

const supabase = createClient(
  process.env.SUPABASE_URL ?? "",
  process.env.SUPABASE_KEY ?? ""
);

console.log("Given supabase is connected");

export { supabase as CustomSupabase };
