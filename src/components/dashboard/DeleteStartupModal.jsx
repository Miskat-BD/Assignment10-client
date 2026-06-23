"use client";

import React, { useState } from "react";
import { AlertDialog, Button } from "@heroui/react";
import toast from "react-hot-toast";
import { deleteStartup } from "@/app/lib/actions/startup";

export default function DeleteStartupModal({ startupId, setMyStartup }) {
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);

        const res = await deleteStartup(startupId);

        if (res && (res.deletedCount > 0 || res.acknowledged || res.success)) {
            toast("Startup Profile Deleted Successfully!", {
                style: {
                    color : 'red'
                },
            });
            setMyStartup(null);
        } else {
            toast.error("Could not delete startup. Try again!");
        }

        setIsDeleting(false);
    };

    return (
        <AlertDialog>
            <Button className="bg-red-500 hover:bg-red-600 text-white font-semibold rounded-xl px-5">
                Delete Startup
            </Button>

            <AlertDialog.Backdrop>
                <AlertDialog.Container placement="auto">
                    <AlertDialog.Dialog className="sm:max-w-md p-6 bg-white rounded-2xl shadow-xl flex flex-col gap-4">
                        <AlertDialog.CloseTrigger />

                        <AlertDialog.Header className="flex flex-col gap-1">
                            <AlertDialog.Heading className="text-lg font-bold text-slate-950">
                                Delete Startup Profile?
                            </AlertDialog.Heading>
                        </AlertDialog.Header>

                        <AlertDialog.Body>
                            <p className="text-sm text-slate-500 leading-relaxed">
                                Are you sure you want to delete your startup profile? This action is permanent and cannot be undone. All related data will be lost.
                            </p>
                        </AlertDialog.Body>

                        <AlertDialog.Footer className="flex justify-end gap-3 pt-2">
                            <Button slot="close" variant="secondary" className="rounded-xl text-xs font-semibold px-4 py-2 border border-slate-200">
                                Cancel
                            </Button>

                            <Button
                                onClick={handleDelete}
                                isLoading={isDeleting}
                                className="bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold px-4 py-2"
                            >
                                {isDeleting ? "Deleting..." : "Yes, Delete"}
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}