import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation";

export const getUserSession = async ()=>{
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    return user
}

export const requiredRole = async (role)=>{
    const user = await getUserSession()
    if(!user){
        redirect('/auth/login')
    }
    if(user?.role !== role){
        redirect('/unauthorized')
    }
    return user
}