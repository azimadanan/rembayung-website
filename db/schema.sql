/*
 * REMBAYUNG WEBSITE - SUPABASE DATABASE SCHEMA
 * =============================================
 * 
 *
 */

-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create bookings table
create table if not exists bookings (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  booking_date date not null,
  time_slot text check (time_slot in ('lunch', 'dinner')) not null,
  guest_count int not null check (guest_count >= 2 and guest_count <= 8),
  name text not null,
  phone text not null,
  email text not null,
  status text default 'pending' check (status in ('pending', 'confirmed', 'cancelled'))
);

-- Enable Row Level Security
alter table bookings enable row level security;

-- Policy for enabling public inserts (anyone can make a booking)
create policy "Enable public inserts"
  on bookings for insert
  with check (true);

-- Policy for enabling read access for authenticated users (admins)
create policy "Enable read access for authenticated users"
  on bookings for select
  to authenticated
  using (true);

-- Policy for enabling update access for authenticated users (admins)
create policy "Enable update access for authenticated users"
  on bookings for update
  to authenticated
  using (true);
