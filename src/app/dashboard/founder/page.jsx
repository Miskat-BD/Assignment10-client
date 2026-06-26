import React from "react";
import { getUserSession, requiredRole } from "@/app/lib/core/session";
import Link from "next/link";
import { getStartupByFounderId } from "@/app/lib/api/startup";
import { getOpportunitiesByStartupId } from "@/app/lib/api/opportunities";
import { getApplicationsByStartupId } from "@/app/lib/api/applications.";

const FounderDashboardPage = async () => {
    const user = await requiredRole("founder");
    const activeUser = await getUserSession();

    let myStartup = null;
    let opportunities = [];
    let applications = []

    if (activeUser?.id) {
        myStartup = await getStartupByFounderId(activeUser?.id);

        if (myStartup) {
            const startupId = myStartup._id?.toString() || myStartup.id?.toString();

            const oppList = await getOpportunitiesByStartupId(startupId);
            if (Array.isArray(oppList)) {
                opportunities = oppList;
            }

            const appList = await getApplicationsByStartupId(startupId);
            if(Array.isArray(appList)){
                applications = appList
            }
        }
    }

    const acceptedMembers = applications.filter(apps => apps.Status == 'Approved')

    const stats = [
        { name: "Total Opportunities", value: opportunities.length, change: "+2 this week", color: "text-emerald-600", bg: "bg-emerald-50" },
        { name: "Total Applications", value: applications.length, change: "+12 pending", color: "text-blue-600", bg: "bg-blue-50" },
        { name: "Accepted Members", value: acceptedMembers.length, change: "Active talent", color: "text-purple-600", bg: "bg-purple-50" },
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


        </div>
    );
};

export default FounderDashboardPage;