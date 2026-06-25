"use client";

import React from "react";
import { Card, Button, Chip, Avatar } from "@heroui/react";
import Link from "next/link";
import { authClient } from "@/app/lib/auth-client";

export default function OpportunityDetailsClient({ opportunity }) {
    const { data: session } = authClient.useSession();
    const userRole = session?.user?.role;

    const {
        role_title,
        startupName,
        required_skills,
        work_type,
        commitment_level,
        deadline,
        description,
        perks
    } = opportunity;

    const skillsArray = required_skills ? required_skills.split(",").map(s => s.trim()) : [];

    const formattedDeadline = deadline ? new Date(deadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    }) : "N/A";

    const getWorkTypeColor = (type) => {
        switch (type?.toLowerCase()) {
            case 'remote': return 'success';
            case 'onsite': return 'danger';
            case 'hybrid': return 'warning';
            default: return 'default';
        }
    };

    const isRestrictedRole = userRole === "admin" || userRole === "founder";

    return (
        <main className="min-h-screen bg-slate-50/50 py-12 sm:py-20 relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-125 h-125 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                <Link
                    href="/opportunities"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors group"
                >
                    <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Back to Opportunities
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                    <div className="lg:col-span-2 flex flex-col gap-6">

                        <Card className="border border-slate-100 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm">
                            <Card.Header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-100 w-full">
                                <div className="flex gap-4 items-center">
                                    {/* <Avatar
                                        name={startupName}
                                        className="w-14 h-14 text-lg font-bold bg-glinear-to-tr from-blue-600 to-indigo-600 text-white rounded-2xl"
                                    /> */}
                                    <div>
                                        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                                            {role_title}
                                        </h1>
                                        <p className="text-base font-semibold text-blue-600 mt-0.5">{startupName}</p>
                                    </div>
                                </div>
                                <Chip
                                    size="md"
                                    variant="flat"
                                    color={getWorkTypeColor(work_type)}
                                    className="capitalize font-bold px-3 py-1 rounded-xl"
                                >
                                    🟢 {work_type}
                                </Chip>
                            </Card.Header>

                            <Card.Content className="pt-6 flex flex-col gap-6">
                               

                                <div className="flex flex-col gap-3 pt-2">
                                    <h3 className="text-base font-bold text-slate-800">Required Skills</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {skillsArray.map((skill, index) => (
                                            <Chip
                                                key={index}
                                                variant="flat"
                                                className="bg-slate-100 text-slate-700 font-semibold px-3 py-1 rounded-xl text-xs"
                                            >
                                                {skill}
                                            </Chip>
                                        ))}
                                    </div>
                                </div>
                            </Card.Content>
                        </Card>

                        {perks && perks.length > 0 && (
                            <Card className="border border-slate-100 bg-white p-6 sm:p-8 rounded-[2rem] shadow-sm">
                                <Card.Content className="flex flex-col gap-4">
                                    <h3 className="text-lg font-bold text-slate-800">Perks & Benefits</h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {perks.map((perk, index) => (
                                            <div key={index} className="flex items-center gap-2.5 text-sm text-slate-600">
                                                <span className="shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center text-xs font-bold">✓</span>
                                                {perk}
                                            </div>
                                        ))}
                                    </div>
                                </Card.Content>
                            </Card>
                        )}
                    </div>

                    <div className="lg:col-span-1 lg:sticky lg:top-8">
                        <Card className="border border-slate-100 bg-white/90 backdrop-blur-md p-6 rounded-[2rem] shadow-md flex flex-col gap-6">
                            <Card.Header className="pb-0 pt-2 flex flex-col items-start gap-1 w-full">
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Job Information</span>
                                <h3 className="text-lg font-black text-slate-800">Quick Summary</h3>
                            </Card.Header>

                            <Card.Content className="flex flex-col gap-4 py-2 text-sm border-t border-b border-slate-100 my-2">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400 font-medium">Commitment:</span>
                                    <span className="font-bold text-slate-800 bg-slate-50 px-2.5 py-1 rounded-xl text-xs border border-slate-100">{commitment_level}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400 font-medium">Location Type:</span>
                                    <span className="font-bold text-slate-800 capitalize bg-slate-50 px-2.5 py-1 rounded-xl text-xs border border-slate-100">{work_type}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-400 font-medium">Application Deadline:</span>
                                    <span className="font-bold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-xl text-xs border border-rose-100">{formattedDeadline}</span>
                                </div>
                            </Card.Content>

                            <Card.Footer className="pt-0 flex flex-col gap-3 w-full">
                                <Button
                                    disabled={isRestrictedRole}
                                    className={`w-full font-bold h-12 rounded-2xl shadow-md transition-all ${
                                        isRestrictedRole
                                            ? "bg-slate-200 text-slate-400 cursor-not-allowed border border-slate-200 shadow-none"
                                            : "bg-slate-900 text-white hover:bg-blue-600"
                                    }`}
                                    size="lg"
                                >
                                    {isRestrictedRole ? "Only Collaborators Can Apply" : "Apply For This Role"}
                                </Button>
                            </Card.Footer>
                        </Card>
                    </div>

                </div>

            </div>
        </main>
    );
}