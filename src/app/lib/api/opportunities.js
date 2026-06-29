'use server'

import { protectedFetch, serverFetch } from "../core/server"

const BaseURL = process.env.NEXT_PUBLIC_BASE_URL

export const allOpportunity = async (page) => {
    if (!page) {
        page = 1
    }
    const res = await fetch(`${BaseURL}/api/opportunity?page=${page}`)
    const data = await res.json()
    return data
    // return serverFetch(`/api/opportunity?page=${page}`)
}

export const getOpportunityById = async (id) => {
    return serverFetch(`/api/opportunity/${id}`)
}

export const getOpportunitiesByStartupId = async (startupId) => {
    return serverFetch(`/api/opportunity/startup/${startupId}`)
}


