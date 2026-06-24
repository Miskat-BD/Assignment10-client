"use client";
import { updateOpportunityById } from "@/app/lib/actions/opportunity";
import { Envelope } from "@gravity-ui/icons";
import { Button, FieldError, Form, Input, Label, Modal, Surface, TextField } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const UpdateOpportunityModal = ({ opportunity }) => {
    // console.log(opportunity, 'opp');
    const router = useRouter();
    const formatDateForInput = (dbDate) => {
        if (!dbDate) return "";
        const date = new Date(dbDate);
        return date.toISOString().split('T')[0];
    };
    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        const data = Object.fromEntries(formData.entries())
        const res = await updateOpportunityById(opportunity._id, data)
        console.log(res, 'data is update');
        if(res.modifiedCount > 0){
            toast.success('Data update successfully')
            router.push('/dashboard/founder/manage-opportunities')
        }
        if(res.modifiedCount === 0){
            toast.warning('Data is updated already')
        }
        
    }
    return (
        <Modal>
            <Button variant="secondary">Update</Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-md">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Heading className="text-blue-950">Update Opportunity</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">
                                <Form onSubmit={handleUpdate} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        <TextField defaultValue={opportunity.
                                            role_title} name="role_title" type="text" className="flex flex-col gap-1">
                                            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Role Title *</Label>
                                            <Input placeholder="e.g. Senior React Developer" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                            <FieldError className="text-xs text-red-500" />
                                        </TextField>

                                        <TextField defaultValue={opportunity.required_skills} name="required_skills" type="text" className="flex flex-col gap-1">
                                            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Required Skills * (comma-separated)</Label>
                                            <Input placeholder="e.g. React, TypeScript, Node.js" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm" />
                                            <FieldError className="text-xs text-red-500" />
                                        </TextField>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Work Type *</label>
                                            <select name="work_type" className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-800 h-10.5">
                                                <option value="Remote">Remote</option>
                                                <option value="Onsite">Onsite</option>
                                                <option value="Hybrid">Hybrid</option>
                                            </select>
                                        </div>

                                        <div className="flex flex-col gap-1">
                                            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Commitment Level *</label>
                                            <select name="commitment_level" className="w-full px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-medium text-slate-800 h-10.5">
                                                <option value="Full-time">Full-time</option>
                                                <option value="Part-time">Part-time</option>
                                                <option value="Contractual">Contractual</option>
                                            </select>
                                        </div>

                                        <TextField defaultValue={formatDateForInput(opportunity.deadline)} name="deadline" type="date" className="flex flex-col gap-1">
                                            <Label className="text-xs font-bold text-slate-700 uppercase tracking-wider">Application Deadline *</Label>
                                            <Input type="date" className="w-full px-4 py-2 border border-slate-200 rounded-xl text-sm text-slate-800" />
                                            <FieldError className="text-xs text-red-500" />
                                        </TextField>
                                        <Modal.Footer>
                                            <Button slot="close" variant="secondary">
                                                Cancel
                                            </Button>
                                            <Button type="submit" slot="close">Update</Button>
                                        </Modal.Footer>
                                    </div>
                                </Form>
                            </Surface>
                        </Modal.Body>

                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
};

export default UpdateOpportunityModal;