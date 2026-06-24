import React from "react";
import { Card, Button, Chip } from "@heroui/react";

export default function OpportunityCard({ opportunity }) {
    const {
        role_title,
        startupName,
        required_skills,
        work_type,
        commitment_level,
        deadline
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

    return (
        <Card className="max-w-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow p-2 rounded-2xl bg-white">
            <Card.Header className="flex flex-col items-start gap-1 pb-2 w-full">
                <div className="flex justify-between items-start w-full">
                    <h3 className="text-xl font-bold text-slate-800 tracking-tight line-clamp-1">
                        {role_title}
                    </h3>
                    <Chip 
                        size="sm" 
                        variant="flat" 
                        color={getWorkTypeColor(work_type)}
                        className="capitalize font-semibold text-xs"
                    >
                        {work_type}
                    </Chip>
                </div>
                <p className="text-sm font-medium text-blue-600">{startupName || "Unknown Startup"}</p>
            </Card.Header>

            <Card.Content className="py-2 flex flex-col gap-3 text-sm">
                <div className="flex gap-4 text-xs text-slate-500 font-medium">
                    <div>
                        <span className="text-slate-400">Type:</span> {commitment_level}
                    </div>
                    <div>
                        <span className="text-slate-400">Deadline:</span> {formattedDeadline}
                    </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                    {skillsArray.slice(0, 4).map((skill, index) => (
                        <Chip 
                            key={index} 
                            size="sm" 
                            variant="flat" 
                            className="bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                            {skill}
                        </Chip>
                    ))}
                    {skillsArray.length > 4 && (
                        <span className="text-xs text-slate-400 font-medium self-center ml-1">
                            +{skillsArray.length - 4} more
                        </span>
                    )}
                </div>
            </Card.Content>

            <Card.Footer className="pt-2 border-t border-slate-50 mt-2 flex justify-end">
                <Button 
                    size="sm" 
                    className="bg-slate-900 text-white font-semibold rounded-xl px-4 hover:bg-slate-800"
                >
                    View Details
                </Button>
            </Card.Footer>
        </Card>
    );
}