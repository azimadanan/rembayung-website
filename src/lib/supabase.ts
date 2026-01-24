/**
 * SUPABASE CLIENT CONFIGURATION
 * ==============================
 *
 * BEFORE USING THIS FILE:
 * 1. Create a Supabase project (https://supabase.com/dashboard)
 * 2. Run the SQL in db/schema.sql in your Supabase SQL Editor
 * 3. Copy .env.example to .env.local
 * 4. Fill in your VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
 * 5. Create an admin user in Supabase Authentication dashboard
 *
 * This file handles all database operations including:
 * - Creating bookings (public access)
 * - Fetching bookings (admin only)
 * - Updating booking status (admin only)
 * - Admin authentication
 */

import { createClient } from "@supabase/supabase-js";

// Load environment variables
// These should be in your .env.local file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types
export interface Booking {
  id?: string;
  created_at?: string;
  booking_date: string;
  time_slot: "lunch" | "dinner";
  guest_count: number;
  name: string;
  phone: string;
  email: string;
  status?: "pending" | "confirmed" | "cancelled";
}

// Booking functions
export async function createBooking(
  booking: Omit<Booking, "id" | "created_at" | "status">,
) {
  const { data, error } = await supabase
    .from("bookings")
    .insert([booking])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getBookings() {
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("booking_date", { ascending: true });

  if (error) throw error;
  return data as Booking[];
}

export async function updateBookingStatus(
  id: string,
  status: "confirmed" | "cancelled",
) {
  const { data, error } = await supabase
    .from("bookings")
    .update({ status })
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Auth functions
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}
