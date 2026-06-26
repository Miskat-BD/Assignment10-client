"use client";

import React, { useState, useEffect } from "react";
import { Table } from "@heroui/react";

const MyApplicationsTable = ({ applications }) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <Table>
            <Table.ScrollContainer>
                <Table.Content aria-label="My Applications Table">
                    <Table.Header>
                        <Table.Column isRowHeader>OPPORTUNITY NAME</Table.Column>
                        <Table.Column>STARTUP NAME</Table.Column>
                        <Table.Column>APPLIED DATE</Table.Column>
                        <Table.Column>STATUS</Table.Column>
                    </Table.Header>
                    <Table.Body>
                        {applications.map((app) => (
                            <Table.Row key={app._id || app.id}>
                                {/* 1. Opportunity Name */}
                                <Table.Cell className="font-semibold text-slate-800">
                                    {app.Opportunity_Role || "N/A"}
                                </Table.Cell>
                                
                                {/* 2. Startup Name */}
                                <Table.Cell className="text-slate-700 font-medium">
                                    {app.Startup_name || "N/A"}
                                </Table.Cell>
                                
                                {/* 3. Applied Date (Hydration Safe) */}
                                <Table.Cell className="text-sm text-slate-600">
                                    {isMounted && app.appliedAt 
                                        ? new Date(app.appliedAt).toLocaleDateString() 
                                        : "Loading..."}
                                </Table.Cell>
                                
                                {/* 4. Status */}
                                <Table.Cell>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                        app.Status === "Pending" ? "bg-amber-100 text-amber-800" :
                                        app.Status === "Approved" ? "bg-emerald-100 text-emerald-800" : "bg-rose-100 text-rose-800"
                                    }`}>
                                        {app.Status || "Pending"}
                                    </span>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Content>
            </Table.ScrollContainer>
        </Table>
    );
};

export default MyApplicationsTable;