'use server'

import { serverMutation } from "../core/server"
import { revalidatePath } from "next/cache"

export const updateUserBlockStatus = async (id, data) => {
    // পাথটি ব্যাকেন্ডের (/api/users/:id/status) সাথে মিলানো হলো
    const response = await serverMutation(`/api/users/${id}/status`, "PATCH", data);
    
    // ডাটা আপডেট হওয়ার পর পেজটি স্বয়ংক্রিয়ভাবে রিভ্যালিডেট (অটো-রিফ্রেশ) হবে
    revalidatePath('/dashboard/admin/manage-users'); 
    
    return response;
}