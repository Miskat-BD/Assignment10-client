"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import { authClient } from "@/app/lib/auth-client";
import { getStartupByFounderId } from "@/app/lib/api/startup";
// ১. আপনার অপরচুনিটি ফেচ করার এপিআই ফাংশনটি ইমপোর্ট করুন (নামটি আপনার প্রজেক্ট অনুযায়ী চেঞ্জ করে নেবেন)
import toast from "react-hot-toast";
import { createOpportunity } from "@/app/lib/actions/opportunity";
import PendingApprovalBanner from "@/components/dashboard/PendingApprovalBanner";
import { getOpportunitiesByStartupId } from "@/app/lib/api/opportunities";
import PricingPlanSection from "@/components/PricingPlanSection";

export default function AddOpportunityPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [myStartup, setMyStartup] = useState(null);
    const [opportunityCount, setOpportunityCount] = useState(0); // অ্যারে লেন্থ এখানে সেভ হবে

    const { data: session } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {
        const fetchData = async () => {
            if (user?.id) {
                // ২. প্রথমে স্টার্টআপ ডাটা ফেচ করুন
                const startupData = await getStartupByFounderId(user.id);
                setMyStartup(startupData);

                if (startupData) {
                    const startupId = startupData._id || startupData.id;
                    // ৩. স্টার্টআপ আইডি দিয়ে অপরচুনিটিগুলো ফেচ করুন
                    const opportunities = await getOpportunitiesByStartupId(startupId);

                    if (opportunities && Array.isArray(opportunities)) {
                        // ৪. অ্যারের লেন্থ দিয়ে কাউন্ট সেট করুন
                        setOpportunityCount(opportunities.length);
                    }
                }
            }
            setIsLoadingData(false);
        };
        fetchData();
    }, [user?.id]);

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!myStartup) {
            toast.error("Please create a Startup Profile first!");
            return;
        }

        if (myStartup.status !== 'approved') {
            toast.error("Your startup status must be 'approved' to post an opportunity!");
            return;
        }

        setIsSubmitting(true);
        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const formEntries = Object.fromEntries(formData.entries());

        const startupIdString = myStartup._id?.toString() || myStartup.id?.toString();

        const finalOpportunityData = {
            startup_id: startupIdString, // এখানে স্ট্রিং আইডি পাস হচ্ছে
            role_title: formEntries.role_title,
            required_skills: formEntries.required_skills,
            work_type: formEntries.work_type,
            commitment_level: formEntries.commitment_level,
            deadline: formEntries.deadline,
        };

        const res = await createOpportunity(finalOpportunityData);

        if (res && res.success) {
            toast.success("🎉 Opportunity Posted Successfully!");
            setOpportunityCount(prev => prev + 1); // সাকসেসফুলি পোস্ট হলে ক্লায়েন্ট সাইডেও কাউন্ট ১ বাড়িয়ে দিলাম
            formElement.reset();
        } else {
            toast.error(res?.message || "Something went wrong. Try again!");
        }

        setIsSubmitting(false);
    };

    if (isLoadingData) {
        return <div className="text-center p-10 font-bold text-slate-500">Loading Form Data...</div>;
    }

    const isPremium = myStartup?.plan === "premium";
    const postLimitReached = !isPremium && opportunityCount >= 3;

    return (
        <div className="max-w-4xl space-y-6 animate-fade-in p-2">
            {/* হেডার */}
            <div className="pb-4 border-b border-slate-100">
                <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                    Add Opportunity
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Post a role for your startup.{" "}
                    {myStartup && (
                        <span className="text-[#D97706] font-medium">
                            ({isPremium ? "Premium Unlimited" : `${opportunityCount}/3 free slots used`})
                        </span>
                    )}
                </p>
            </div>

            {/* শর্তসমূহ */}
            {!myStartup ? (
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                    <p className="text-amber-800 font-medium">
                        ⚠️ You haven't created a startup profile yet. Please go to <strong>My Startup</strong> tab and build your profile first!
                    </p>
                </div>
            ) : myStartup.status !== 'approved' ? (
                <PendingApprovalBanner myStartup={myStartup} />
            ) : (
                <>
                    {/* ৩টির বেশি হলে প্রিমিয়াম ব্যানার */}
                    {postLimitReached && <PricingPlanSection />}

                    {/* ফর্ম */}
                    <Form
                        className={`bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col w-full transition-all ${postLimitReached ? "opacity-50 pointer-events-none" : ""}`}
                        onSubmit={onSubmit}
                    >
                        {/* আপনার বাকি ইনপুট ফিল্ডগুলো আগের মতোই থাকবে... */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <TextField isRequired name="role_title" type="text" className="flex flex-col gap-1">
                                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Role Title *</Label>
                                <Input placeholder="e.g. Senior React Developer" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-red-500" />
                            </TextField>

                            <TextField isRequired name="required_skills" type="text" className="flex flex-col gap-1">
                                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Skills * (comma-separated)</Label>
                                <Input placeholder="e.g. React, TypeScript, Node.js" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-red-500" />
                            </TextField>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Work Type *</label>
                                <select name="work_type" required className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-800 h-10.5">
                                    <option value="Remote">Remote</option>
                                    <option value="Onsite">Onsite</option>
                                    <option value="Hybrid">Hybrid</option>
                                </select>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Commitment Level *</label>
                                <select name="commitment_level" required className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-800 h-10.5">
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contractual">Contractual</option>
                                </select>
                            </div>

                            <TextField isRequired name="deadline" type="date" className="flex flex-col gap-1">
                                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Application Deadline *</Label>
                                <Input className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-800" />
                                <FieldError className="text-xs text-red-500" />
                            </TextField>
                        </div>

                        <div className="flex justify-end pt-2 w-full">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                disabled={isSubmitting || postLimitReached}
                                className="text-white font-semibold px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                            >
                                {isSubmitting ? "Posting..." : "Publish Opportunity"}
                            </Button>
                        </div>
                    </Form>
                </>
            )}
        </div>
    );
}