import { kv } from '@vercel/kv'

export default async function handler(request, response) {
    const { query } = request
    const { page, action } = query

    if (!page || !['home', 'scripts', 'executors'].includes(page)) {
        return response.status(400).json({ error: 'invalid page parameter' })
    }

    const key = `page:${page}:count`

    try {
        if (action === 'increment') {
            await kv.incr(key)
            return response.status(200).json({ success: true })
        } else if (action === 'decrement') {
            await kv.decr(key)
            return response.status(200).json({ success: true })
        } else {
            const value = await kv.get(key)
            const count = value ? parseInt(value) : 0
            return response.status(200).json({ page, count })
        }
    } catch (error) {
        return response.status(500).json({ error: error.message })
    }
}
