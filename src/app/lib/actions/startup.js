'use server'
import { serverMutation } from "../core/server"

export const createStartup = async (data) => {
    return serverMutation('/startups', "POST", data)
}

export const updateStartup = async (startupId, updatedData) => {
    return serverMutation(`/api/startup/${startupId}`, 'PATCH', updatedData)
}

export const deleteStartup = async (startupId)=>{
    return serverMutation(`/api/startup/${startupId}`, 'DELETE')
}