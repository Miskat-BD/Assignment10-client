"use client";

import React from "react";
import { Table, Button } from "@heroui/react";
import UpdateOpportunityModal from "./UpdateOpportunityModal";
import DeleteOpportunityModal from "./DeleteOpportunityModal";

export default function ManageOpportunitiesTable({ myStartup, opportunities }) {

    // ১. যদি ফাউন্ডার কোনো স্টার্টআপ প্রোফাইল তৈরি না করে থাকে
    if (!myStartup) {
        return (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-center">
                <p className="text-amber-800 font-medium">
                    ⚠️ Please create your startup profile first to view opportunities.
                </p>
            </div>
        );
    }

    // ২. যদি স্টার্টআপ থাকে কিন্তু কোনো অপরচুনিটি পোস্ট করা না থাকে
    if (!opportunities || opportunities.length === 0) {
        return (
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-8 text-center text-slate-500">
                No opportunities posted yet for this startup.
            </div>
        );
    }

    return (
        <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-4">
            <Table>
                <Table.ScrollContainer>
                    <Table.Content aria-label="Opportunities Management Table">
                        <Table.Header>
                            <Table.Column isRowHeader>ROLE TITLE</Table.Column>
                            <Table.Column>REQUIRED SKILLS</Table.Column>
                            <Table.Column>WORK TYPE</Table.Column>
                            <Table.Column>COMMITMENT LEVEL</Table.Column>
                            <Table.Column>DEADLINE</Table.Column>
                            <Table.Column>ACTIONS</Table.Column>
                        </Table.Header>
                        <Table.Body>
                            {opportunities.map((opp) => (
                                <Table.Row key={opp._id || opp.id}>
                                    <Table.Cell className="font-semibold text-slate-800">
                                        {opp.role_title}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                                            {opp.required_skills}
                                        </span>
                                    </Table.Cell>
                                    <Table.Cell className="text-slate-600">{opp.work_type}</Table.Cell>
                                    <Table.Cell className="text-slate-600">{opp.commitment_level}</Table.Cell>
                                    <Table.Cell className="text-sm text-slate-600">{opp.deadline.split('T')[0]}</Table.Cell>
                                    <Table.Cell>
                                        <div className="flex gap-2">
                                            <UpdateOpportunityModal opportunity={opp} />
                                            <DeleteOpportunityModal opportunity={opp}/>
                                        </div>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Content>
                </Table.ScrollContainer>
            </Table>
        </div>
    );
}