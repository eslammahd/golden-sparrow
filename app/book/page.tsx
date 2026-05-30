'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Slot } from '@/lib/supabase';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatSlot(slot: Slot) {
  const d = new Date(slot.date + 'T00:00:00');
  const [h, m] = slot.time.split(':');
  const hour = parseInt(h);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
  return { day: DAYS[d.getDay()], date: `${d.getDate()} ${MONTHS[d.getMonth()]}`, time: `${displayHour}:${m} ${ampm}` };
}

export default function BookPage() {
  const router = useRouter();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    supabase
      .from('slots')
      .select('*')
      .eq('available', true)
      .order('date', { ascending: true })
      .order('time', { ascending: true })
      .then(({ data }) => { setSlots(data ?? []); setLoading(false); });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) { setError('Please select a slot.'); return; }
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!phone.trim()) { setError('Please enter your phone number.'); return; }
    setError('');
    setSubmitting(true);
    const { error: err } = await supabase.from('bookings').insert({ patient_name: name.trim(), phone: phone.trim(), slot_id: selected, status: 'pending' });
    if (err) { setError('Something went wrong. Please try again.'); setSubmitting(false); return; }
    await supabase.from('slots').update({ available: false }).eq('id', selected);
    router.push('/confirm');
  }

  return (
    <main className="min-h-screen bg-gray-50 px-5 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Book a Session</h1>
      <p className="text-gray-500 text-sm mb-6">Pick a time, enter your details, then pay offline.</p>
      {loading ? (
        <p className="text-center text-gray-400 mt-16">Loading available slots…</p>
      ) : slots.length === 0 ? (
        <p className="text-center text-gray-500 mt-16">No slots available right now. Check back soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-md mx-auto">
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-3">Choose a slot</p>
            <div className="flex flex-col gap-3">
              {slots.map(slot => {
                const f = formatSlot(slot);
                const active = selected === slot.id;
                return (
                  <button key={slot.id} type="button" onClick={() => setSelected(slot.id)}
                    className={`flex items-center justify-between rounded-2xl px-5 py-4 border-2 transition-all ${ active ? 'border-blue-600 bg-blue-50 shadow-md' : 'border-gray-200 bg-white' }`}>
                    <span className="font-semibold text-gray-900">{f.day}, {f.date}</span>
                    <span className="text-blue-600 font-medium">{f.time}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Your full name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Ahmed Mohamed" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Phone number</label>
              <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="01XXXXXXXXX" className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" disabled={submitting} className="bg-blue-600 text-white font-bold text-lg py-4 rounded-2xl shadow-md active:scale-95 transition-transform disabled:opacity-60">
            {submitting ? 'Booking…' : 'Confirm Booking'}
          </button>
        </form>
      )}
    </main>
  );
}
