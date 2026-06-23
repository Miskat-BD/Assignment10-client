import { stripe } from '@/app/lib/stripe'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    return (
      <div className="min-h-[85vh] flex items-center justify-center bg-slate-50/50 px-4 py-12">
        <div className="max-w-md w-full bg-white border border-slate-100 rounded-3xl p-8 shadow-xl shadow-slate-200/50 text-center space-y-6 animate-fade-in">
          
          {/* সাকসেস অ্যানিমেশন আইকন */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-emerald-100 border-4 border-emerald-50 text-emerald-600 text-3xl">
            🎉
          </div>

          {/* হেডিংস */}
          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
              Payment Successful!
            </h1>
            <p className="text-amber-600 font-bold text-sm tracking-wide uppercase">
              ⚡ Welcome to Premium Growth
            </p>
          </div>

          {/* মূল মেসেজ কার্ড */}
          <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-5 text-sm text-slate-600 text-left space-y-3 leading-relaxed">
            <p>
              We appreciate your business! A confirmation email and invoice will be sent shortly to:
            </p>
            <p className="font-semibold text-slate-900 bg-white border border-slate-100 rounded-xl px-3 py-2 text-center break-all">
              {customerEmail}
            </p>
            <p className="text-xs text-slate-400 pt-2 border-t border-slate-200/60 text-center">
              If you have any questions, please email us at{' '}
              <a 
                href="mailto:orders@example.com" 
                className="text-emerald-600 hover:text-emerald-700 font-medium underline transition-all"
              >
                orders@example.com
              </a>.
            </p>
          </div>

          {/* অ্যাকশন বাটনসমূহ */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <Link 
              href="/dashboard/founder/add-opportunity"
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-11 px-4 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-600/10 transition-all duration-200 text-sm"
            >
              Post Opportunity Now
            </Link>
            <Link 
              href="/"
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold h-11 px-4 rounded-xl flex items-center justify-center transition-all duration-200 text-sm"
            >
              Go to Home
            </Link>
          </div>

        </div>
      </div>
    )
  }
}