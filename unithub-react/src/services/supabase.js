import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://herkinoadngauriezfuc.supabase.co";

const supabaseAnonKey =
"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhlcmtpbm9hZG5nYXVyaWV6ZnVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI0NzYwNDksImV4cCI6MjA5ODA1MjA0OX0.SxEnbTafRl3RjRAYXOivEI778sk6BCNeCrQVaMK835k";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);