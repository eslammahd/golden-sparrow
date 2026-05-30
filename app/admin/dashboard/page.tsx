'use client';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Booking, Slot } from '@/lib/supabase';

const STATUS_COLORS: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800',
  confirmed: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
};

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function fmtDateTime(date: string, time: string): string {
  const d = new Date(date + 'T00:00:00');
  const parts = time.split(':');
  const hour = parseInt(parts[0]);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const dh = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} \u00b7 ${dh}:${parts[1]} ${ampm}`;
}

export default function DashboardPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'bookings' | 'slots'>('bookings');

  const fetchBookings = useCallback(async () => {
    const { data } = await supabase
      .from('bookings')
      .select('id, patient_name, phone, slot_id, status, created_at, slots(id, date, time, available, created_at)')
      .order('created_at', { ascending: false });
    setBookings((data as Booking[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) router.push('/admin');
    });
    fetchBookings();
  }, [router, fetchBookings]);

  async function updateStatus(id: string, status: 'confirmed' | 'rejected') {
    await supabase.from('bookings').update({ status }).eq('id', id);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/admin');
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-gray-900">Admin Panel</h1>
          <p className="text-xs text-gray-500">Dr. Saad El Mahdy</p>
        </div>
        <button onClick={handleLogout} className="text-sm text-red-500 font-medium">Sign out</button>
      </div>
      <div className="flex border-b border-gray-200 bg-white">
        {(['bookings', 'slots'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-3 text-sm font-semibold capitalize transition-colors ${
              tab === t ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="px-4 py-5">
        {tab === 'bookings' && (
          <BookingsTab bookings={bookings} loading={loading} onUpdateStatus={updateStatus} />
        )}
        {tab === 'slots' && <SlotsTab />}
      </div>
    </main>
  );
}

function BookingsTab({
  bookings,
  loading,
  onUpdateStatus,
}: {
  bookings: Booking[];
  loading: boolean;
  onUpdateStatus: (id: string, status: 'confirmed' | 'rejected') => void;
}) {
  if (loading) return <p className="text-center text-gray-400 mt-10">Loading\u2026</p>;
  if (bookings.length === 0) return <p className="text-center text-gray-500 mt-10">No bookings yet.</p>;
  return (
    <div className="flex flex-col gap-4 max-w-lg mx-auto">
      {bookings.map(b => (
        <div key={b.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-2">
            <div>
              <p className="font-semibold text-gray-900">{b.patient_name}</p>
              <p className="text-sm text-gray-500">{b.phone}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${STATUS_COLORS[b.status]}`}>
              {b.status}
            </span>
          </div>
          {b.slots && (
            <p className="text-sm text-blue-600 font-medium mb-3">
              {fmtDateTime(b.slots.date, b.slots.time)}
            </p>
          )}
          {b.status === 'pending' && (
            <div className="flex gap-2">
              <button
                onClick={() => onUpdateStatus(b.id, 'confirmed')}
                className="flex-1 bg-green-600 text-white text-sm font-semibold py-2.5 rounded-xl active:scale-95 transition-transform"
              >
                \u2713 Confirm
              </button>
              <button
                onClick={() => onUpdateStatus(b.id, 'rejected')}
                className="flex-1 bg-red-500 text-white text-sm font-semibold py-2.5 rounded-xl active:scale-95 transition-transform"
              >
                \u2715 Reject
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SlotsTab() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [adding, setAdding] = useState(false);

  const fetchSlots = useCallback(async () => {
    const { data } = await supabase
      .from('slots')
      .select('id, date, time, available, created_at')
      .order('date', { ascending: true })
      .order('time', { ascending: true });
    setSlots((data as Slot[]) ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchSlots(); }, [fetchSlots]);

  async function addSlot(e: React.FormEvent) {
    e.preventDefault();
    if (!date || !time) return;
    setAdding(true);
    await supabase.from('slots').insert({ date, time, available: true });
    setDate('');
    setTime('');
    await fetchSlots();
    setAdding(false);
  }

  async function toggleAvailability(id: string, current: boolean) {
    await supabase.from('slots').update({ available: !current }).eq('id', id);
    setSlots(prev => prev.map(s => s.id === id ? { ...s, available: !current } : s));
  }

  async function deleteSlot(id: string) {
    await supabase.from('slots').delete().eq('id', id);
    setSlots(prev => prev.filter(s => s.id !== id));
  }

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={addSlot} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-5">
        <p className="font-semibold text-gray-900 mb-3">Add New Slot</p>
        <div className="flex gap-2 mb-3">
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="time"
            value={time}
            onChange={e => setTime(e.target.value)}
            required
            className="flex-1 rounded-xl border border-gray-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          disabled={adding}
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl active:scale-95 transition-transform disabled:opacity-60"
        >
          {adding ? 'Adding\u2026' : '+ Add Slot'}
        </button>
      </form>
      {loading ? (
        <p className="text-center text-gray-400">Loading\u2026</p>
      ) : slots.length === 0 ? (
        <p className="text-center text-gray-500">No slots yet.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {slots.map(s => {
            const d = new Date(s.date + 'T00:00:00');
            const parts = s.time.split(':');
            const hour = parseInt(parts[0]);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const dh = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
            const label = `${DAYS[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]} \u00b7 ${dh}:${parts[1]} ${ampm}`;
            return (
              <div key={s.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{label}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${
                    s.available ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {s.available ? 'Available' : 'Booked'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleAvailability(s.id, s.available)}
                    className="text-xs bg-gray-100 text-gray-700 font-medium px-3 py-2 rounded-xl active:scale-95 transition-transform"
                  >
                    Toggle
                  </button>
                  <button
                    onClick={() => deleteSlot(s.id)}
                    className="text-xs bg-red-100 text-red-600 font-medium px-3 py-2 rounded-xl active:scale-95 transition-transform"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
