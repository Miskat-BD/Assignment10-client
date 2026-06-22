import React from "react";
import { requiredRole } from "@/app/lib/core/session"; // আপনার session ফাইলের সঠিক পাথ দিন
import Link from "next/link";

const FounderDashboardPage = async () => {
    // 🛡️ সার্ভার-সাইড রোল ভেরিফিকেশন (ইউজার ফাউন্ডার না হলে অটোমেটিক /unauthorized এ রিডাইরেক্ট হবে)
    const user = await requiredRole("founder");

    // ডেমো ডাটা (পরবর্তীতে ডাটাবেজ থেকে কুয়েরি করে এখানে বসাবেন)
    const stats = [
        { name: "Total Opportunities", value: "12", change: "+2 this week", color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Total Applications", value: "48", change: "+12 pending", color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Accepted Members", value: "8", change: "Active talent", color: "text-purple-600", bg: "bg-purple-50" },
    ];

    const recentApplications = [
        { id: 1, applicant: "Anik Rahman", role: "Frontend Developer", opportunity: "Next.js Co-founder", status: "Pending" },
        { id: 2, applicant: "Sadia Islam", role: "UI/UX Designer", opportunity: "Mobile App Design", status: "Reviewed" },
        { id: 3, applicant: "Tanvir Ahmed", role: "Backend Engineer", opportunity: "Node.js Developer", status: "Pending" },
    ];

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                        Founder Overview
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Welcome back, <span className="font-semibold text-slate-700">{user.name}</span>! Here is your startup progress.
                    </p>
                </div>
                
                {/* Quick Action Button */}
                <Link
                    href="/dashboard/founder/add-opportunity"
                    className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl shadow-sm transition-all gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add New Opportunity
                </Link>
            </div>

            {/* 📊 Analytics Stats Grid */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {stats.map((stat) => (
                    <div 
                        key={stat.name} 
                        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between transition-all hover:shadow-md"
                    >
                        <div>
                            <p className="text-sm font-medium text-slate-400 uppercase tracking-wider">{stat.name}</p>
                            <h3 className="text-3xl font-bold text-slate-800 mt-2 tracking-tight">{stat.value}</h3>
                            <span className="text-xs text-slate-500 block mt-1">{stat.change}</span>
                        </div>
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center shrink-0`}>
                            <svg className={`w-6 h-6 ${stat.color}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307L21.75 4.5M21.75 4.5H16.5M21.75 4.5v5.25" />
                            </svg>
                        </div>
                    </div>
                ))}
            </div>

            {/* 📋 Recent Activity & Applications Table */}
            <div className="bg-white border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                        <h3 className="text-base font-bold text-slate-800">Recent Applications</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Latest talents applied for your startup opportunities</p>
                    </div>
                    <Link 
                        href="/dashboard/founder/applications" 
                        className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg transition-all"
                    >
                        View All
                    </Link>
                </div>

                {/* Responsive Table Wrapper */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-100">
                                <th className="py-3 px-6">Applicant</th>
                                <th className="py-3 px-6">Opportunity</th>
                                <th className="py-3 px-6">Role</th>
                                <th className="py-3 px-6 text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50 text-sm text-slate-600">
                            {recentApplications.map((app) => (
                                <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="py-4 px-6 font-semibold text-slate-800">{app.applicant}</td>
                                    <td className="py-4 px-6 text-slate-500">{app.opportunity}</td>
                                    <td className="py-4 px-6">{app.role}</td>
                                    <td className="py-4 px-6 text-center">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                                            app.status === "Pending" 
                                                ? "bg-amber-50 text-amber-700 border border-amber-100" 
                                                : "bg-blue-50 text-blue-700 border border-blue-100"
                                        }`}>
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FounderDashboardPage;