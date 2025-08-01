// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto'; // Polyfill for URL in React Native

const supabaseUrl = 'https://tsbnfmpezobrqvrquxem.supabase.co'; // Replace with your project URL
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRzYm5mbXBlem9icnF2cnF1eGVtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5OTEwMjksImV4cCI6MjA2OTU2NzAyOX0.u-Dp2k-Nq8jHh9D93FmC9CESRx5pMmYfVtfnJg9_Oi0'; // Replace with your project API Anon Key

export const supabase = createClient(supabaseUrl, supabaseAnonKey);