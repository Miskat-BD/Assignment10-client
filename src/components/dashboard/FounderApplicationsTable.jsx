"use client";

import React, { useState, useEffect } from "react";
import { Table, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { updateApplicationStatus } from "@/app/lib/actions/applications";

const FounderApplicationsTable = ({ initialApplications }) => {
    const [isMounted, setIsMounted] = useState(false);
    const [applications, setApplications] = useState(initialApplications);
    const [loadingId, setLoadingId] = useState(null);
    const router = useRouter();

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        setLoadingId(id);
        const result = await updateApplicationStatus(id, newStatus);

        if (result) {
            // লোকাল স্টেট আপডেট করে UI রিফ্রেশ করা হচ্ছে
            setApplications(prev =>
                prev.map(app => (app._id === id ? { ...app, Status: newStatus } : app))
            );
            router.refresh(); // সার্ভার ডাটা সিঙ্ক করার জন্য
        }
        setLoadingId(null);
    };

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="Founder Applications Management Table">
                    <Table.Header>
                        <Table.Column isRowHeader>APPLICANT NAME</Table.Column>
                        <Table.Column>OPPORTUNITY ROLE</Table.Column>
                        <Table.Column>STARTUP NAME</Table.Column>
                        <Table.Column>APPLIED DATE</Table.Column>
                        <Table.Column>STATUS</Table.Column>
                        <Table.Column>ACTIONS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {applications.map((app) => (
                            <Table.Row key={app._id || app.id}>
                                {/* ১. অ্যাপ্লিকেন্টের নাম ও ইমেইল */}
                                <Table.Cell>
                                    <div className="flex flex-col">
                                        <span className="font-semibold text-slate-800">{app.Applicant_name || "N/A"}</span>
                                        <span className="text-xs text-slate-400">{app.Applicant_email}</span>
                                    </div>
                                </Table.Cell>

                                {/* ২. রোল */}
                                <Table.Cell className="text-slate-700 font-medium">
                                    {app.Opportunity_Role || "N/A"}
                                </Table.Cell>

                                {/* ৩. স্টার্টআপের নাম */}
                                <Table.Cell className="text-slate-600">
                                    {app.Startup_name || "N/A"}
                                </Table.Cell>

                                {/* ৪. অ্যাপ্লাই করার তারিখ */}
                                <Table.Cell className="text-sm text-slate-600">
                                    {isMounted && app.appliedAt
                                        ? new Date(app.appliedAt).toLocaleDateString()
                                        : "Loading..."}
                                </Table.Cell>

                                {/* ৫. স্ট্যাটাস ব্যাজ */}
                                <Table.Cell>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${app.Status === "Pending" ? "bg-amber-100 text-amber-800" :
                                            app.Status === "Approved" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                        }`}>
                                        {app.Status || "Pending"}
                                    </span>
                                </Table.Cell>

                                {/* ৬. অ্যাকশন বাটনসমূহ (Approve / Reject) */}
                                <Table.Cell>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            color="success"
                                            variant="primary"
                                            className="font-semibold"
                                            isLoading={loadingId === app._id}
                                            disabled={app.Status === "Approved"}
                                            onClick={() => handleStatusChange(app._id, "Approved")}
                                        >
                                            Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="danger"
                                            variant="danger"
                                            className="font-semibold"
                                            isLoading={loadingId === app._id}
                                            disabled={app.Status === "Rejected"}
                                            onClick={() => handleStatusChange(app._id, "Rejected")}
                                        >
                                            Reject
                                        </Button>
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default FounderApplicationsTable;