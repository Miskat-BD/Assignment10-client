'use server'

import { protectedFetch, serverFetch } from "../core/server"

export const getAllUsers = async () => {
    return protectedFetch('/api/users')
}

export const getUserById = async (id) => {
    return serverFetch(`/api/users/${id}`)
}