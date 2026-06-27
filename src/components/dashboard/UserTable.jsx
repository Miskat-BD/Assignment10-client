'use client'

import React, { useState, useTransition } from 'react';
import Image from 'next/image'; 
import { updateUserBlockStatus } from '@/app/lib/actions/users';
import toast from 'react-hot-toast';

const UserTable = ({ users }) => {
    const [isPending, startTransition] = useTransition();
    const [loadingId, setLoadingId] = useState(null);

    const handleBlockToggle = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'block' ? 'unblock' : 'block';
        
        setLoadingId(id);
        startTransition(async () => {
            try {
                // ২য় প্যারামিটারে অবজেক্ট আকারে ডাটা পাঠানো হলো { status: 'block'/'unblock' }
                await updateUserBlockStatus(id, { status: nextStatus });
                toast.success(`User successfully ${nextStatus}ed!`);
            } catch (error) {
                toast.error("Failed to update user status.");
            } finally {
                setLoadingId(null);
            }
        });
    };

    if (!users || users.length === 0) {
        return (
            <div className="bg-white p-12 text-center rounded-2xl border border-slate-100 shadow-sm text-slate-500">
                👥 No users found on the platform.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                            <th className="px-6 py-4">User Details</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Role</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm text-slate-700">
                        {users.map((user) => (
                            <tr key={user._id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 font-semibold text-slate-900">
                                    <div className="flex items-center gap-3">
                                        {user.image ? (
                                            <Image 
                                                width={40} 
                                                height={40}
                                                src={user.image}
                                                alt={user.name || "User Avatar"}
                                                className="w-8 h-8 rounded-full object-cover bg-slate-100 border border-slate-200"
                                            />
                                        ) : (
                                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-xs border border-slate-200">
                                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                                            </div>
                                        )}
                                        <span>{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                <td className="px-6 py-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-800 capitalize">
                                        {user.role || 'User'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium uppercase tracking-wider
                                        ${user.plan === 'premium' ? 'bg-amber-100 text-amber-800 font-bold' : 'bg-slate-100 text-slate-600'}
                                    `}>
                                        {user.plan || 'Free'}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize
                                        ${user.status === 'block' ? 'bg-rose-50 text-rose-700 border border-rose-100' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}
                                    `}>
                                        {user.status === 'block' ? 'Blocked' : 'Active'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-center">
                                    <button
                                        onClick={() => handleBlockToggle(user._id, user.status)}
                                        disabled={isPending && loadingId === user._id}
                                        className={`px-4 py-1.5 text-xs font-semibold rounded-xl border transition-all disabled:opacity-50
                                            ${user.status === 'block' 
                                                ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-sm' 
                                                : 'bg-rose-50 hover:bg-rose-100 text-rose-600 border-rose-200/60'
                                            }
                                        `}
                                    >
                                        {isPending && loadingId === user._id 
                                            ? 'Processing...' 
                                            : user.status === 'block' ? 'Unblock User' : 'Block User'
                                        }
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserTable;