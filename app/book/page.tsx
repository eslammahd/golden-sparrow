'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Static slots for Stage 1 (will be replaced by Supabase in Stage 2)
const STATIC_SLOTS = [
  { id: 's1', date: 'Monday, 14 Jul 2025', time: '10:00 AM' },
  { id: 's2', date: 'Monday, 14 Jul 2025', time: '12:00 PM' },
  { id: 's3', date: 'Tuesday, 15 Jul 2025', time: '9:00 AM' },
  { id: 's4', date: 'Tuesday, 15 Jul 2025', time: '3:00 PM' },
  { id: 's5', date: 'Wednesday, 16 Jul 2025', time: '11:00 AM' },
  { id: 's6', date: 'Thursday, 17 Jul 2025', time: '10:00 AM' },
];

export default function BookPage() {
  const router = useRouter();
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlot) { setError('Please select a slot.'); return; }
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!phone.trim()) { setError('Please enter your phone number.'); return; }
    setError('');
    setSubmitting(true);
    const slot = STATIC_SLOTS.find(s => s.id === selectedSlot)!;
    const params = new URLSearchParams({
      name: name.trim(),
      phone: phone.trim(),
      date: slot.date,
      time: slot.time,
    });
    router.push(`/confirm?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-brand-900 text-white px-6 py-4 flex items-center gap-3">
        <Link href="/" className="text-teal-400 text-sm">← Back</Link>
        <h1 className="font-semibold text-lg">Book a Session</h1>
      </header>

      <div className="px-6 py-8 max-w-lg mx-auto space-y-8">
        {/* Slots */}
        <section>
          <h2 className="font-bold text-brand-900 text-base mb-4">Available Slots</h2>
          <div className="space-y-3">
            {STATIC_SLOTS.map(slot => (
              <button
                key={slot.id}
                onClick={() => setSelectedSlot(slot.id)}
                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-150 ${
                  selectedSlot === slot.id
                    ? 'border-teal-500 bg-teal-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-teal-300'
                }`}
              >
                <p className="font-semibold text-slate-800">{slot.date}</p>
                <p className="text-brand-600 text-sm font-medium">{slot.time}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Form */}
        <section>
          <h2 className="font-bold text-brand-900 text-base mb-4">Your Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="e.g. Ahmed Mohamed"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-teal-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="e.g. 01012345678"
                className="w-full border-2 border-slate-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:border-teal-500 transition"
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm font-medium">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-white font-bold text-lg py-4 rounded-2xl shadow-lg transition-all active:scale-95"
            >
              {submitting ? 'Booking...' : 'Confirm Booking →'}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
