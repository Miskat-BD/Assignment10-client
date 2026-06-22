const baseURL = process.env.NEXT_PUBLIC_BASE_URL

export const serverFetch = async (path) => {
    const res = await fetch(`${baseURL}${path}`)
    return handleStatusCode(res)
}

export const serverMutation = async (path, method, data) => {
    const res = await fetch(`${baseURL}${path}`, {
        method: method,
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })

    return handleStatusCode(res)
}

// handle 401, 404, 403
const handleStatusCode = async (res) => {
    if (res.status === 401) {
        redirect('/unauthorized')
    }
    else if (res.status === 403) {
        redirect('/forbidden');
    }

    return res.json()
}