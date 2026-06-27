"use client";

import React, { useState } from "react";
import { Button, Form, Input, Label, TextField, FieldError, Modal } from "@heroui/react";
import Image from "next/image";
import { imageUpload } from "@/app/lib/imgUpload";
import toast from "react-hot-toast";
import { updateStartup } from "@/app/lib/actions/startup";

export default function UpdateStartupModal({ myStartup, setMyStartup, fundingStages }) {
    const [editLogoPreview, setEditLogoPreview] = useState(myStartup?.logo || null);
    const [isUpdating, setIsUpdating] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setEditLogoPreview(URL.createObjectURL(file));
        }
    };

    const onUpdateSubmit = async (e) => {
        e.preventDefault();
        setIsUpdating(true);

        const formElement = e.currentTarget;
        const formData = new FormData(formElement);
        const logoFile = formData.get("logo");
        let logoUrl = "";

        if (logoFile && logoFile.size > 0) {
            const uploadResult = await imageUpload(logoFile);
            logoUrl = uploadResult.url;
        }
        const formEntries = Object.fromEntries(formData.entries());

        const filteredUpdates = {};
        Object.keys(formEntries).forEach((key) => {
            if (key !== "logo" && formEntries[key] !== undefined && formEntries[key].trim() !== "") {
                filteredUpdates[key] = formEntries[key];
            }
        });

        if (logoUrl) {
            filteredUpdates.logo = logoUrl;
        }

        const updatedStartupData = {
            ...myStartup,
            ...filteredUpdates,
        };
        if (Object.keys(filteredUpdates).length === 0) {
            toast.error("No changes made to update!");
            setIsUpdating(false);
            return;
        }
        // console.log(filteredUpdates);

        const res = await updateStartup(myStartup._id || myStartup.id, filteredUpdates);


        if (res && (res.modifiedCount > 0 || res.acknowledged || res.success)) {
            toast.success("🎉 Startup Profile Updated Successfully!");
            setMyStartup(updatedStartupData);
        } else if (res && res.modifiedCount === 0) {
            toast.get("ℹ️ No new changes detected.");
        } else {
            toast.error("❌ Something went wrong!");
        }

        setIsUpdating(false);
    };

    return (
        <Modal>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-5">
                Update Profile
            </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-xl max-h-[85vh] overflow-y-auto flex flex-col backend-scroll">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading>Edit Startup Profile</Modal.Heading>
                            <p className="mt-1 text-xs text-slate-400">
                                Modify your startup profile details below. Changes will reflect everywhere immediately.
                            </p>
                        </Modal.Header>

                        <Form onSubmit={onUpdateSubmit} className="flex flex-col flex-1">
                            <Modal.Body className="space-y-5 p-6 w-full flex flex-col">

                                <div className="flex flex-col gap-1 w-full">
                                    <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Startup Logo</label>
                                    <div className="flex items-center gap-4 p-3 border border-dashed border-slate-200 rounded-xl">
                                        <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center overflow-hidden shrink-0 relative">
                                            <Image
                                                fill
                                                src={editLogoPreview || "/placeholder-logo.png"}
                                                alt="Preview"
                                                sizes="(max-width: 768px) 100vw, 100px"
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <input
                                                type="file"
                                                name="logo"
                                                accept="image/*"
                                                id="edit-logo-upload"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor="edit-logo-upload"
                                                className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold rounded-lg cursor-pointer transition-colors inline-block text-center"
                                            >
                                                Change Logo
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                    <TextField name="name" type="text" defaultValue={myStartup?.name || myStartup?.startup_name} className="flex flex-col gap-1">
                                        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Startup Name</Label>
                                        <Input placeholder="Startup Name" className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm" />
                                        <FieldError className="text-xs text-red-500" />
                                    </TextField>

                                    <TextField name="founderEmail" type="email" defaultValue={myStartup?.founderEmail} className="flex flex-col gap-1">
                                        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Founder Email</Label>
                                        <Input placeholder="Founder Email" className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm" />
                                        <FieldError className="text-xs text-red-500" />
                                    </TextField>

                                    <TextField name="industry" type="text" defaultValue={myStartup?.industry} className="flex flex-col gap-1">
                                        <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Industry</Label>
                                        <Input placeholder="Industry" className="w-full px-3 py-1.5 border border-slate-200 rounded-xl text-sm" />
                                        <FieldError className="text-xs text-red-500" />
                                    </TextField>

                                    <div className="flex flex-col gap-1">
                                        <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Funding Stage</label>
                                        <select
                                            name="fundingStage"
                                            defaultValue={myStartup?.fundingStage || myStartup?.funding_stage || ""}
                                            className="w-full px-3 py-2 border border-slate-200 bg-white rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 text-slate-800 h-9.5"
                                        >
                                            <option value="" disabled>Select Funding Stage</option>
                                            {fundingStages?.map((stage) => (
                                                <option key={stage.value} value={stage.value}>
                                                    {stage.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <TextField name="description" className="flex flex-col gap-1 w-full">
                                    <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Description</Label>
                                    <textarea
                                        name="description"
                                        defaultValue={myStartup?.description || ""}
                                        rows={3}
                                        placeholder="Describe your startup..."
                                        className="w-full px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:border-emerald-500 text-slate-800 resize-none"
                                    />
                                    <FieldError className="text-xs text-red-500" />
                                </TextField>

                            </Modal.Body>
                            <Modal.Footer className="mt-auto border-t border-slate-100 pt-3">
                                <Button slot="close" variant="secondary" className="rounded-xl text-xs font-semibold">
                                    Cancel
                                </Button>
                                <Button type="submit" slot="close" isLoading={isUpdating} className="bg-emerald-600 text-white rounded-xl text-xs font-semibold">
                                    {isUpdating ? "Saving..." : "Save Changes"}
                                </Button>
                            </Modal.Footer>
                        </Form>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}