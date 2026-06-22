'use server'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL

import { serverFetch } from "../core/server"

export const getAllStartups = async () => {
    return serverFetch('/api/startups')
}

export const getStartupByFounderId = async (founderId) => {
    return serverFetch(`/startup/${founderId}`)
}

export const getStartupDetailsById = async (startupId)=>{
    return serverFetch(`/api/startup/${startupId}`)
}

export const updateStartup = async (startupId, updatedData)=>{
    const res = await fetch(`${baseURL}/api/startup/${startupId}`,{
        method: 'PATCH',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    return res.json()
}