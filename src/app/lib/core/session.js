import { headers } from "next/headers"
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { authClient } from "../auth-client";

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;
    return user
}

// export const getUserToken = async () => {
//     const { data: token } = await auth.api.getAccessToken({
//         headers: await headers()
//     })

//     return token?.token || null;
// }

export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null;
}

export const requiredRole = async (role) => {
    const user = await getUserSession()
    if (!user) {
        redirect('/auth/login')
    }
    if (user?.role !== role) {
        redirect('/unauthorized')
    }
    return user
}