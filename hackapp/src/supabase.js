// supabase.js

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bvbfgqjdwpjutcnupyst.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ2YmZncWpkd3BqdXRjbnVweXN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTczMDA4NzgsImV4cCI6MjAxMjg3Njg3OH0.gLZUjACWnK9SpxydY7QURFtk1-5fw5o2SoIkqidyxCw"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
