// components/FilterBox.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function FilterBox() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const currentWorkType = searchParams.get("workType") || "";

    const handleFilterChange = (value) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (value) {
            params.set("workType", value);
        } else {
            params.delete("workType");
        }
        params.set("page", "1"); // ফিল্টার চেঞ্জ হলে ইউজার পেজ ১ এ ফেরত যাবে

        router.push(`/opportunities?${params.toString()}`);
    };

    return (
        <div className="flex flex-wrap gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 max-w-xs">
            <div className="flex flex-col gap-1 w-full">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Work Type</label>
                <select 
                    value={currentWorkType} 
                    onChange={(e) => handleFilterChange(e.target.value)}
                    className="border border-slate-200 rounded-xl px-3 py-1.5 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full font-medium text-slate-700"
                >
                    <option value="">All Types</option>
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                </select>
            </div>
        </div>
    );
}