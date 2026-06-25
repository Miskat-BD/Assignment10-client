'use server'

import { serverFetch, serverMutation } from "../core/server"

export const applyToOpportunity = async (data) => {
    return serverMutation('/api/applications', 'POST', data)
}

export const getApplicationCheck = async (opportunityId, applicantEmail) => {
    return serverFetch(`/api/applications/check?opportunityId=${opportunityId}&email=${applicantEmail}`)
}

export const getApplicationByEmail = async (applicantEmail) => {
    return serverFetch(`/api/application/${applicantEmail}`)
}