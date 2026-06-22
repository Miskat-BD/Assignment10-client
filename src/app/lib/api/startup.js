'use server'

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

