import Link from 'next/link';
export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-6 text-center">
      <h1 className="text-4xl font-bold text-brand-900 mb-2">404</h1>
      <p className="text-slate-500 mb-6">Page not found.</p>
      <Link href="/" className="text-brand-600 font-medium">← Back to Home</Link>
    </main>
  );
}
