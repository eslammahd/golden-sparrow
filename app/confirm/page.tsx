import Link from 'next/link';

export default function ConfirmPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-5 py-12">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Booking Received!</h1>
          <p className="text-gray-500 mt-2 text-sm leading-relaxed">Dr. Saad will confirm your session after payment is received.</p>
        </div>
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-gray-800 text-lg">Pay to confirm your session</h2>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-bold text-sm">VC</span>
              </div>
              <p className="font-semibold text-gray-900">Vodafone Cash</p>
            </div>
            <p className="text-sm text-gray-500 mb-1">Send payment to:</p>
            <p className="text-xl font-bold text-gray-900 tracking-wide">01006060175</p>
            <p className="text-xs text-gray-400 mt-1">Open Vodafone Cash app → Send Money → Enter number</p>
          </div>
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-bold text-sm">IP</span>
              </div>
              <p className="font-semibold text-gray-900">InstaPay</p>
            </div>
            <p className="text-sm text-gray-500 mb-1">Send payment to IPA:</p>
            <p className="text-xl font-bold text-gray-900 tracking-wide">drsaad@instapay</p>
            <p className="text-xs text-gray-400 mt-1">Open InstaPay app → Pay → Enter IPA address</p>
          </div>
          <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
            <p className="text-sm text-blue-800 font-medium">📱 What happens next?</p>
            <ul className="mt-2 text-sm text-blue-700 flex flex-col gap-1">
              <li>• Send the payment screenshot to Dr. Saad</li>
              <li>• He will confirm your session within a few hours</li>
              <li>• You will receive the video call link</li>
            </ul>
          </div>
        </div>
        <Link href="/" className="mt-8 block text-center text-blue-600 font-medium text-sm">← Back to home</Link>
      </div>
    </main>
  );
}
