import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://nuocmmngtqhkcybrqenc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51b2NtbW5ndHFoa2N5YnJxZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTIzNzU4NzYsImV4cCI6MjAwNzk1MTg3Nn0.ccQI_FXTL5Og8-asspJ2Z4ZAYIh1zKBYE2BvjaZn5Zo';
export const supabase = createClient(supabaseUrl, supabaseKey)