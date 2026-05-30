import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Slot = {
  id: string;
  date: string;
  time: string;
  available: boolean;
  created_at: string;
};

export type Booking = {
  id: string;
  patient_name: string;
  phone: string;
  slot_id: string | null;
  status: 'pending' | 'confirmed' | 'rejected';
  created_at: string;
  slots?: Slot;
};
