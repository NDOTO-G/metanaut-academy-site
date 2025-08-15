import type * as types from '../../lib/types'
import { search } from '../../lib/notion'

export const runtime = 'edge'

export default async function searchNotion(request: Request): Promise<Response> {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'method not allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json' }
    })
  }

  const searchParams = (await request.json()) as types.SearchParams

  console.log('<<< lambda search-notion', searchParams)
  const results = await search(searchParams)
  console.log('>>> lambda search-notion', results)

  return new Response(JSON.stringify(results), {
    status: 200,
    headers: {
      'content-type': 'application/json',
      'cache-control': 'public, s-maxage=60, max-age=60, stale-while-revalidate=60'
    }
  })
}
