import type { GetServerSideProps } from 'next'
import { type ExtendedRecordMap } from 'notion-types'
import {
  getBlockParentPage,
  getBlockTitle,
  getPageProperty,
  idToUuid
} from 'notion-utils'
import RSS from 'rss'

import * as siteConfig from '@/lib/config'
import { getSiteMap } from '@/lib/get-site-map'
import { getSocialImageUrl } from '@/lib/get-social-image-url'
import { getCanonicalPageUrl } from '@/lib/map-page-url'

export const config = { runtime: 'experimental-edge' }

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  if (req.method !== 'GET') {
    res.statusCode = 405
    res.setHeader('Content-Type', 'application/json')
    res.write(JSON.stringify({ error: 'method not allowed' }))
    res.end()
    return { props: {} }
  }

  const siteMap = await getSiteMap()
  const ttlMinutes = 24 * 60 // 24 hours
  const ttlSeconds = ttlMinutes * 60

  const feed = new RSS({
    title: siteConfig.name,
    site_url: siteConfig.host,
    feed_url: `${siteConfig.host}/feed.xml`,
    language: siteConfig.language,
    ttl: ttlMinutes
  })

  for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
    const pageId = siteMap.canonicalPageMap[pagePath]!
    const recordMap = siteMap.pageMap[pageId] as ExtendedRecordMap
    if (!recordMap) continue

    const keys = Object.keys(recordMap?.block || {})
    const block = recordMap?.block?.[keys[0]!]?.value
    if (!block) continue

    const parentPage = getBlockParentPage(block, recordMap)
    const isBlogPost =
      block.type === 'page' &&
      block.parent_table === 'collection' &&
      parentPage?.id === idToUuid(siteConfig.rootNotionPageId)
    if (!isBlogPost) {
      continue
    }

    const title = getBlockTitle(block, recordMap) || siteConfig.name
    const description =
      getPageProperty<string>('Description', block, recordMap) ||
      siteConfig.description
    const url = getCanonicalPageUrl(siteConfig.site, recordMap)(pageId)
    const lastUpdatedTime = getPageProperty<number>(
      'Last Updated',
      block,
      recordMap
    )
    const publishedTime = getPageProperty<number>('Published', block, recordMap)
    const date = lastUpdatedTime
      ? new Date(lastUpdatedTime)
      : publishedTime
        ? new Date(publishedTime)
        : new Date()
    const socialImageUrl = getSocialImageUrl(pageId)

    feed.item({
      title,
      url,
      date,
      description,
      enclosure: socialImageUrl
        ? {
            url: socialImageUrl,
            type: 'image/jpeg'
          }
        : undefined
    })
  }

  const feedText = feed.xml({ indent: true })

  res.setHeader(
    'Cache-Control',
    `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds}`
  )
  res.setHeader('Content-Type', 'text/xml; charset=utf-8')
  res.write(feedText)
  res.end()

  return { props: {} }
}

export default function noop() {
  return null
}