'use server'

import { protectedFetch, serverFetch } from "../core/server"

export const getAllStartups = async () => {
    return serverFetch('/api/startups')
}

export const getStartupByFounderId = async (founderId) => {
    return protectedFetch(`/startup/${founderId}`)
}

export const getStartupDetailsById = async (startupId)=>{
    return protectedFetch(`/api/startup/${startupId}`)
}

