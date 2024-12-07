// src/lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtysnjysvstigbmpxufi.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10eXNuanlzdnN0aWdibXB4dWZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE4OTU1MDgsImV4cCI6MjAxNzQ3MTUwOH0.JSB7RT4fi7OUnZILr0LTl4jpNtg5KZHbAMzHEi7J1cw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)