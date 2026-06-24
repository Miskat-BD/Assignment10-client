"use client";

import React, { useState, useEffect } from "react";
import { Button, Form, Input, Label, TextField, FieldError } from "@heroui/react";
import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";
import { imageUpload } from "@/app/lib/imgUpload";
import { createStartup } from "@/app/lib/actions/startup";
import { getStartupByFounderId } from "@/app/lib/api/startup";
import UpdateStartupModal from "@/components/dashboard/UpdateStartupModal";
import toast from "react-hot-toast";
import DeleteStartupModal from "@/components/dashboard/DeleteStartupModal";

export default function CreateStartupPage() {
    const [logoPreview, setLogoPreview] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoadingData, setIsLoadingData] = useState(true);
    const [myStartup, setMyStartup] = useState(null);
    const [email, setEmail] = useState("");

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const fundingStages = [
        { label: "Idea Phase", value: "Idea Phase" },
        { label: "Pre-seed", value: "Pre-seed" },
        { label: "Seed", value: "Seed" },
        { label: "Series A+", value: "Series A+" },
    ];

    useEffect(() => {
        const fetchStartup = async () => {
            if (user?.id) {
                const data = await getStartupByFounderId(user.id);
                setMyStartup(data);
            }
            setIsLoadingData(false);
        };
        fetchStartup();
    }, [user?.id]);

    useEffect(() => {
        if (user?.email) {
            setEmail(user.email);
        }
    }, [user?.email]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const logoFile = formData.get("logo");
        let logoUrl = "";

        if (logoFile && logoFile.size > 0) {
            const uploadResult = await imageUpload(logoFile);
            logoUrl = uploadResult.url;
        }

        const formEntries = Object.fromEntries(formData.entries());
        const finalStartupData = {
            ...formEntries,
            logo: logoUrl,
            founderId: user?.id,
            founderName: user?.name,
            status: 'pending'
        };

        const res = await createStartup(finalStartupData);

        if (res && (res.insertedId || res.acknowledged)) {
            toast.success("🎉 Startup Profile Created Successfully!");
            setMyStartup(finalStartupData);
        }
        setIsSubmitting(false);
    };

    if (isLoadingData) {
        return <div className="text-center p-10 font-bold text-slate-500">Loading Startup Data...</div>;
    }

    return (
        <div className="max-w-4xl space-y-8 animate-fade-in p-2">

            {myStartup ? (
                <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-sm space-y-6">
                    <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-slate-100">
                        <div className="w-24 h-24 relative rounded-2xl overflow-hidden border border-slate-200 shrink-0 bg-slate-50">
                            <Image
                                src={myStartup.logo || "/placeholder-logo.png"}
                                alt="Startup Logo"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="text-center sm:text-left space-y-1">
                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <h1 className="text-2xl font-extrabold text-slate-900">{myStartup.name || myStartup.startup_name}</h1>
                                <span className={`px-3 py-1 ${myStartup.status == 'pending' ? 'bg-amber-50 text-amber-600' : myStartup.status == 'approved' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'} text-xs font-bold rounded-full capitalize border border-amber-200`}>
                                    {myStartup.status || "pending"}
                                </span>
                            </div>
                            <p className="text-sm font-semibold text-emerald-600">{myStartup.industry}</p>
                            <p className="text-xs text-slate-400">Founder Email: {myStartup.founderEmail}</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Funding Stage</h3>
                            <p className="text-sm font-bold text-slate-800 mt-1">{myStartup.fundingStage || myStartup.funding_stage}</p>
                        </div>
                        <div>
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Description</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mt-1 whitespace-pre-line">{myStartup.description}</p>
                        </div>
                    </div>

                    {/* Action Buttons Section */}
                    <div className="flex gap-3 justify-end pt-4 border-t border-slate-100">
                        <UpdateStartupModal
                            myStartup={myStartup}
                            setMyStartup={setMyStartup}
                            fundingStages={fundingStages}
                        />

                        <DeleteStartupModal startupId={myStartup._id || myStartup.id} setMyStartup={setMyStartup} />
                    </div>
                </div>
            ) : (
                <>
                    <div className="pb-4 border-b border-slate-100">
                        <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                            Create Startup Profile
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            You do not have a startup profile yet. Please provide the details to pitch on StartupForge.
                        </p>
                    </div>

                    <Form
                        className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm space-y-6 flex flex-col w-full"
                        onSubmit={onSubmit}
                    >
                        {/* Startup Logo */}
                        <div className="flex flex-col gap-2 w-full">
                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Startup Logo</label>
                            <div className="flex items-center gap-5 p-4 border border-dashed border-slate-200 rounded-xl hover:bg-slate-50/50 transition-colors">
                                <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 font-bold text-slate-400 text-xs relative">
                                    {logoPreview ? (
                                        <Image height={300} width={300} src={logoPreview} alt="Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        "No Logo"
                                    )}
                                </div>
                                <div className="flex flex-col gap-1">
                                    <input
                                        type="file"
                                        name="logo"
                                        accept="image/*"
                                        id="logo-upload"
                                        onChange={handleFileChange}
                                        required
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="logo-upload"
                                        className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg cursor-pointer transition-colors inline-block text-center"
                                    >
                                        Choose Logo File
                                    </label>
                                    <p className="text-[11px] text-slate-400">Supports PNG, JPG or WEBP. Will be uploaded via ImgBB.</p>
                                </div>
                            </div>
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <TextField isRequired name="name" type="text" className="flex flex-col gap-1">
                                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Startup Name</Label>
                                <Input placeholder="e.g., StartupForge" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-red-500" />
                            </TextField>

                            <TextField isRequired name="founderEmail" type="email" className="flex flex-col gap-1">
                                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Founder Email</Label>
                                <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="e.g., founder@startupforge.com" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-red-500" />
                            </TextField>

                            <TextField isRequired name="industry" type="text" className="flex flex-col gap-1">
                                <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Industry</Label>
                                <Input placeholder="e.g., SaaS, FinTech, AI" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                <FieldError className="text-xs text-red-500" />
                            </TextField>

                            <div className="flex flex-col gap-1">
                                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Funding Stage</label>
                                <select
                                    name="fundingStage"
                                    required
                                    className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all text-slate-800 h-10.5"
                                >
                                    {fundingStages.map((stage) => (
                                        <option key={stage.value} value={stage.value}>
                                            {stage.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Description */}
                        <TextField isRequired name="description" className="flex flex-col gap-1 w-full">
                            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</Label>
                            <textarea
                                name="description"
                                rows={4}
                                required
                                placeholder="Describe your startup's core vision, product, and target audience..."
                                className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 transition-all text-slate-800 resize-none"
                            />
                            <FieldError className="text-xs text-red-500" />
                        </TextField>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-2 w-full">
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                disabled={isSubmitting}
                                className="text-white font-semibold px-6 bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                            >
                                {isSubmitting ? "Uploading Logo..." : "Create Startup"}
                            </Button>
                        </div>
                    </Form>
                </>
            )}
        </div>
    );
}