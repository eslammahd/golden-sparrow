import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-brand-900 to-brand-700 flex flex-col">
      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 py-16 text-center text-white">
        <div className="w-24 h-24 rounded-full bg-teal-400 flex items-center justify-center mb-6 text-4xl font-bold text-white shadow-lg">
          S
        </div>
        <h1 className="text-3xl font-bold mb-2 leading-tight">
          Dr. Saad El Mahdy
        </h1>
        <p className="text-teal-400 font-semibold text-lg mb-4">MD — Online Therapy</p>
        <p className="text-brand-100 max-w-sm text-base leading-relaxed mb-8">
          Confidential, professional therapy sessions — from the comfort of your home.
          Book a slot, pay securely, and we meet online.
        </p>
        <Link
          href="/book"
          className="bg-teal-500 hover:bg-teal-400 active:scale-95 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-xl transition-all duration-150"
        >
          Book a Session →
        </Link>
      </section>

      {/* How it works */}
      <section className="bg-white px-6 py-12">
        <h2 className="text-center text-xl font-bold text-brand-900 mb-8">How it works</h2>
        <div className="max-w-md mx-auto space-y-6">
          {[
            { step: '1', title: 'Choose a slot', desc: 'Pick a date and time that works for you.' },
            { step: '2', title: 'Book & pay', desc: 'Fill in your details and pay via Vodafone Cash or InstaPay.' },
            { step: '3', title: 'Confirmation', desc: 'Dr. Saad confirms your session and sends a meeting link.' },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <span className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">
                {item.step}
              </span>
              <div>
                <p className="font-semibold text-slate-800">{item.title}</p>
                <p className="text-slate-500 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/book"
            className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-semibold px-8 py-4 rounded-2xl shadow transition-all duration-150"
          >
            See Available Slots
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-900 text-brand-100 text-center text-sm py-4 px-6">
        © 2025 Dr. Saad El Mahdy — All sessions are confidential.
      </footer>
    </main>
  );
}
