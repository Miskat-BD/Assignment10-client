'use server'

import { serverFetch } from "../core/server"

export const getApplicationsByStartupId = async (startupId) => {
    return serverFetch(`/api/applications/startup/${startupId}`)
}