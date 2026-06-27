'use server'

import { serverMutation } from "../core/server"
import { revalidatePath } from "next/cache"

export const updateUserBlockStatus = async (id, data) => {
    const response = await serverMutation(`/api/users/${id}/status`, "PATCH", data);
    
    revalidatePath('/dashboard/admin/manage-users'); 
    
    return response;
}