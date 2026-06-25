'use server'

import { serverMutation } from "../core/server"

export const updateProfile = async (id, data) => {
    return serverMutation(`/api/users/${id}`, 'PATCH', data)
}