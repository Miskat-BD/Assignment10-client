'use client'

import React, { useState, useTransition } from 'react';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { updateStartupStatus } from '@/app/lib/actions/startup';
import { useRouter } from 'next/navigation';

const StartupTable = ({ startups }) => {
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState(null);
    const router = useRouter()

    const handleStatusChange = async (id, statusValue) => {
        setLoadingId(id);
        startTransition(async () => {
            try {
                await updateStartupStatus(id, {status: statusValue});
                toast.success(`Startup successfully ${statusValue}!`);
                router.push('/dashboard/admin/manage-startups')
            } catch (error) {
                toast.error("Something went wrong. Please try again.");
            } finally {
                setLoadingId(null);
            }
        });
    };

    if (!startups || startups.length === 0) {
        return (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm text-slate-500">
                🚀 No startups registered yet in the platform.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <th className="px-6 py-4">Startup Name</th>
                            <th className="px-6 py-4">Founder Name</th>
                            <th className="px-6 py-4">Founder Email</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                        {startups.map((startup) => (
                            <tr key={startup._id} className="hover:bg-slate-50/50 transition-colors">
                                {/* Startup Name & Logo */}
                                <td className="px-6 py-4 font-semibold text-slate-900">
                                    <div className="flex items-center gap-3">
                                        {startup.logo && (
                                            <Image width={100} height={100}
                                                src={startup.logo}
                                                alt={startup.name}
                                                className="w-8 h-8 rounded-lg object-contain bg-slate-100 p-1 border border-slate-200"
                                            />
                                        )}
                                        {startup.name}
                                    </div>
                                </td>

                                {/* Founder Name */}
                                <td className="px-6 py-4 text-slate-600">{startup.founderName || "N/A"}</td>

                                {/* Founder Email */}
                                <td className="px-6 py-4 text-slate-500">{startup.founderEmail || "N/A"}</td>

                                {/* Status Badge */}
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide capitalize
                                        ${startup.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' : ''}
                                        ${startup.status === 'rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200/50' : ''}
                                        ${startup.status !== 'approved' && startup.status !== 'rejected' ? 'bg-amber-50 text-amber-700 border border-amber-200/50' : ''}
                                    `}>
                                        {startup.status || 'Pending'}
                                    </span>
                                </td>

                                {/* Actions Button */}
                                <td className="px-6 py-4">
                                    <div className="flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => handleStatusChange(startup._id, 'approved')}
                                            disabled={isPending && loadingId === startup._id}
                                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-xl shadow-sm transition-all disabled:opacity-50"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => handleStatusChange(startup._id, 'rejected')}
                                            disabled={isPending && loadingId === startup._id}
                                            className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-medium rounded-xl border border-rose-200/60 transition-all disabled:opacity-50"
                                        >
                                            Reject
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StartupTable;