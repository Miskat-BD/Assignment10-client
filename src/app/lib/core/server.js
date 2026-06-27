import { redirect } from "next/navigation"
import { getUserToken } from "./session"
import { auth } from "../auth"
import { headers } from "next/headers"
import { authClient } from "../auth-client"

const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
    const res = await fetch(`${baseURL}${path}`)
    return handleStatusCode(res)
}

export const authHeader = async () => {
    const token = await getUserToken();
    console.log(token, 'tojen');
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {};
    return header;
}

export const serverMutation = async (path, method, data) => {
    // const session = await auth.api.getSession({
    //     headers: await headers()
    // })
    // console.log(session, 'session');
    const res = await fetch(`${baseURL}${path}`, {
        method: method,
        headers: {
            'content-type': 'application/json',
            ... await authHeader()
        },
        body: JSON.stringify(data)
    })

    return handleStatusCode(res)
}

export const protectedFetch = async (path) => {
    const res = await fetch(`${baseURL}${path}`,
        {
            headers: await authHeader()
        }
    );

    // handle 401, 403

    return handleStatusCode(res);
}

// handle 401, 404, 403
const handleStatusCode = async (res) => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json()
}