'use server'

import { serverFetch } from "../core/server"

export const getOpportunitiesByStartupId = async (startupId)=>{
    return serverFetch(`/api/opportunity/${startupId}`)
}