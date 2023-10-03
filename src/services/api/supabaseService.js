import { createClient } from '@supabase/supabase-js'


// Create a single supabase client for interacting with your database
const supabaseUrl = 'https://nrtccbhphzlaldorksmb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydGNjYmhwaHpsYWxkb3Jrc21iIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU5NTEyNTAsImV4cCI6MjAxMTUyNzI1MH0.nGYLq0p5-iRJW5SKPPr3Sie2LDuhPFBUwmhhei5sYxA'

export const supabase = createClient(supabaseUrl, supabaseKey)


