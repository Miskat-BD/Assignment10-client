"use client";
import { deleteOpportunityById } from "@/app/lib/actions/opportunity";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const DeleteOpportunityModal = ({ opportunity }) => {
    const router = useRouter()
    const handleDelete = async () => {
        const res = await deleteOpportunityById(opportunity._id);

        if (res && (res.deletedCount > 0 || res.acknowledged || res.success)) {
            toast.warning("Opportunity Deleted Successfully!");
            router.push('/dashboard/founder/manage-opportunities')
        } else {
            toast.error("Could not delete startup. Try again!");
        }
    }
    return (
        <AlertDialog>
            <Button variant="danger">Delete</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-100">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete Opportunity permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete <strong>{opportunity.role_title}</strong> and all of its
                                data. This action cannot be undone.
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button onClick={handleDelete} type="submit" slot="close" variant="danger">
                                Delete Opportunity
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
};

export default DeleteOpportunityModal;