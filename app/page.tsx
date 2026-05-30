import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <section className="px-5 pt-16 pb-12 text-center">
        <div className="mx-auto mb-6 h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg">
          SM
        </div>
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">Dr. Saad El Mahdy</h1>
        <p className="mt-1 text-lg text-blue-600 font-medium">MD · Psychiatry &amp; Psychotherapy</p>
        <p className="mt-4 text-gray-600 max-w-sm mx-auto leading-relaxed">
          Book a private online therapy session — simple, safe, and at your pace.
        </p>
        <Link
          href="/book"
          className="mt-8 inline-block bg-blue-600 text-white text-lg font-semibold px-8 py-4 rounded-2xl shadow-md active:scale-95 transition-transform"
        >
          Book a Session
        </Link>
      </section>
      <section className="px-5 pb-16">
        <h2 className="text-center text-xl font-bold text-gray-800 mb-6">How it works</h2>
        <div className="flex flex-col gap-4 max-w-sm mx-auto">
          {[
            { step: '1', title: 'Pick a slot', desc: 'Choose a date and time that works for you.' },
            { step: '2', title: 'Pay offline', desc: 'Send payment via Vodafone Cash or InstaPay.' },
            { step: '3', title: 'Meet online', desc: 'Dr. Saad confirms and you meet via video call.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="flex items-start gap-4 bg-white rounded-2xl p-4 shadow-sm">
              <div className="h-10 w-10 shrink-0 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-lg">{step}</div>
              <div>
                <p className="font-semibold text-gray-900">{title}</p>
                <p className="text-sm text-gray-500 mt-0.5">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
