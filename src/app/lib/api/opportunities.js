'use server'

import { protectedFetch, serverFetch } from "../core/server"

export const allOpportunity = async (page = 1, limit = 6, search = "", workType = "") => {
    if (!page) {
        page = 1;
    }
    return serverFetch(`/api/opportunity?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&workType=${encodeURIComponent(workType)}`);
};

export const getOpportunityById = async (id) => {
    return protectedFetch(`/api/opportunity/${id}`)
}

export const getOpportunitiesByStartupId = async (startupId) => {
    return serverFetch(`/api/opportunity/startup/${startupId}`)
}

