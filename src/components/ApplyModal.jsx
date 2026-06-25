"use client";

import React, { useState, useEffect } from "react";
import { Button, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import toast from "react-hot-toast";
import { applyToOpportunity, getApplicationCheck } from "@/app/lib/actions/applications";

const ApplyModal = ({ opportunityId, applicantEmail, opportunityRole }) => {
    const [portfolioLink, setPortfolioLink] = useState("");
    const [motivation, setMotivation] = useState("");
    const [loading, setLoading] = useState(false);

    // 🟢 নতুন স্টেট: ইউজার ইতিমধ্যে অ্যাপ্লাই করেছেন কিনা তা ট্র্যাক করতে
    const [hasApplied, setHasApplied] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    // 🟢 ইউজার আগে অ্যাপ্লাই করেছেন কিনা তা মাউন্ট হওয়ার সময় চেক করা
    useEffect(() => {
        const checkApplicationStatus = async () => {
            if (!opportunityId || !applicantEmail) return;
            try {
                // আপনার ব্যাকএন্ড পোর্ট ৮০০০ অনুযায়ী এপিআই কল
                const data = await getApplicationCheck(opportunityId, applicantEmail)
                setHasApplied(data.hasApplied);
            } catch (error) {
                console.error("Error checking application status:", error);
            } finally {
                setCheckingStatus(false);
            }
        };

        checkApplicationStatus();
    }, [opportunityId, applicantEmail]);

    const handleSubmit = async (e) => {
        if (e && typeof e.preventDefault === "function") {
            e.preventDefault();
        }

        if (!portfolioLink || !motivation) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);
        try {
            const applicationData = {
                Opportunity_id: opportunityId,
                Opportunity_Role: opportunityRole,
                Applicant_email: applicantEmail,
                Portfolio_link: portfolioLink,
                Motivation: motivation,
                Status: "Pending",
                
            };

            const response = await applyToOpportunity(applicationData);

            if (response) {
                toast.success("Application submitted successfully! 🎉");
                setPortfolioLink("");
                setMotivation("");
                setHasApplied(true); // 🟢 সফল সাবমিশনের পর বাটন ডিজেবল করার জন্য
            }
        } catch (error) {
            console.error("Submission Error:", error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal>
            {/* 🟢 কন্ডিশনাল ট্রিগার বাটন স্টাইলিং ও টেক্সট */}
            <Button
                isDisabled={checkingStatus || hasApplied}
                className={`w-full font-bold h-12 rounded-2xl shadow-md transition-all ${hasApplied ? "bg-gray-400 text-white cursor-not-allowed" : "bg-slate-900 text-white hover:bg-blue-600"
                    }`}
                size="lg"
            >
                {checkingStatus ? "Checking Status..." : hasApplied ? "Already Applied" : "Apply For This Role"}
            </Button>

            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />

                        <Modal.Header>
                            <Modal.Heading>Apply for Role</Modal.Heading>
                            <p className="mt-1.5 text-sm leading-5 text-muted">
                                Fill out the information below to send your application to the founder.
                            </p>
                        </Modal.Header>

                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <form id="apply-role-form" onSubmit={handleSubmit} className="flex flex-col gap-4">

                                    {/* Email Input */}
                                    <TextField isDisabled className="w-full" name="email" type="email" variant="secondary">
                                        <Label>Applicant Email</Label>
                                        <Input
                                            placeholder="Your email address"
                                            required
                                            value={applicantEmail || ""}
                                            readOnly
                                        />
                                    </TextField>

                                    {/* Portfolio Link Input */}
                                    <TextField className="w-full" name="portfolio" type="url" variant="secondary">
                                        <Label>Portfolio Link</Label>
                                        <Input
                                            placeholder="Enter Your Portfolio URL"
                                            required
                                            value={portfolioLink}
                                            onChange={(e) => setPortfolioLink(e.target.value)}
                                        />
                                    </TextField>

                                    {/* Motivation Textarea/Input */}
                                    <TextField className="w-full" name="motivation" variant="secondary">
                                        <Label>Motivation Message</Label>
                                        <Input
                                            placeholder="Why do you want to join this role?"
                                            required
                                            value={motivation}
                                            onChange={(e) => setMotivation(e.target.value)}
                                        />
                                    </TextField>
                                </form>
                            </Surface>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button slot="close" variant="secondary">
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                form="apply-role-form"
                                isLoading={loading}
                                isDisabled={hasApplied} // 🟢 আগে অ্যাপ্লাই করা থাকলে সাবমিট বাটনও ডিজেবল থাকবে
                                className="bg-slate-900 text-white font-bold"
                            >
                                Submit Application
                            </Button>
                        </Modal.Footer>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default ApplyModal;