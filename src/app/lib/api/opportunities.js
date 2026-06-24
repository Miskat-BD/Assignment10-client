'use server'

import { serverFetch } from "../core/server"

export const allOpportunity = async () => {
    return serverFetch('/api/opportunity')
}

export const getOpportunitiesByStartupId = async (startupId) => {
    return serverFetch(`/api/opportunity/${startupId}`)
}
