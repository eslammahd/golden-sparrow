import Link from 'next/link';

interface PageProps {
  searchParams: { name?: string; phone?: string; date?: string; time?: string };
}

export default function ConfirmPage({ searchParams }: PageProps) {
  const { name, phone, date, time } = searchParams;

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-brand-900 text-white px-6 py-4">
        <h1 className="font-semibold text-lg text-center">Booking Received ✓</h1>
      </header>

      <div className="px-6 py-8 max-w-lg mx-auto space-y-6">
        {/* Booking Summary */}
        <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="font-bold text-brand-900 mb-4">Your Booking</h2>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-slate-500">Name</dt>
              <dd className="font-semibold text-slate-800">{name || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Phone</dt>
              <dd className="font-semibold text-slate-800">{phone || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Date</dt>
              <dd className="font-semibold text-slate-800">{date || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Time</dt>
              <dd className="font-semibold text-slate-800">{time || '—'}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-500">Status</dt>
              <dd className="font-semibold text-amber-600">Pending confirmation</dd>
            </div>
          </dl>
        </section>

        {/* Payment Instructions */}
        <section className="bg-teal-50 border-2 border-teal-400 rounded-2xl p-6">
          <h2 className="font-bold text-teal-700 text-base mb-4">💳 How to Pay</h2>
          <p className="text-slate-600 text-sm mb-4">
            Please send the session fee to Dr. Saad using one of the methods below, then wait for confirmation.
          </p>

          <div className="space-y-4">
            {/* Vodafone Cash */}
            <div className="bg-white rounded-xl p-4 border border-teal-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">📱</span>
                <span className="font-bold text-slate-800">Vodafone Cash</span>
              </div>
              <p className="text-sm text-slate-600">
                Send to number: <span className="font-bold text-brand-700">01XXXXXXXXX</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Name: Dr. Saad El Mahdy</p>
            </div>

            {/* InstaPay */}
            <div className="bg-white rounded-xl p-4 border border-teal-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xl">🏦</span>
                <span className="font-bold text-slate-800">InstaPay</span>
              </div>
              <p className="text-sm text-slate-600">
                IPA: <span className="font-bold text-brand-700">drsaad@instapay</span>
              </p>
              <p className="text-xs text-slate-400 mt-1">Name: Dr. Saad El Mahdy</p>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-brand-50 border border-brand-100 rounded-2xl p-5">
          <h3 className="font-semibold text-brand-900 mb-2">What happens next?</h3>
          <ol className="text-sm text-slate-600 space-y-1 list-decimal list-inside">
            <li>Send payment using one of the methods above.</li>
            <li>Dr. Saad will review and confirm your session.</li>
            <li>You&apos;ll receive a WhatsApp message with your meeting link.</li>
          </ol>
        </section>

        <Link
          href="/"
          className="block text-center text-brand-600 font-medium text-sm py-2"
        >
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
