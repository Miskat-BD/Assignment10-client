"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
      <div className="max-w-md w-full space-y-6">
        {/* Visual 404 Illustration using Tailwind & DaisyUI */}
        <div className="relative flex justify-center items-center">
          <h1 className="text-9xl font-extrabold text-slate-200 select-none tracking-widest">
            404
          </h1>
          <div className="absolute font-semibold text-emerald-600 bg-emerald-50 px-4 py-1 text-sm rounded rotate-12 shadow-sm border border-emerald-200">
            Page Not Found
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-800 md:text-3xl">
            Lost in Space?
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto text-sm md:text-base">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none min-h-0 h-11 px-6 w-full sm:w-auto normal-case shadow-md shadow-emerald-100"
          >
            Go Back Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="btn btn-outline border-slate-300 hover:bg-slate-50 hover:text-slate-800 min-h-0 h-11 px-6 w-full sm:w-auto normal-case"
          >
            Previous Page
          </button>
        </div>
      </div>
    </div>
  );
}