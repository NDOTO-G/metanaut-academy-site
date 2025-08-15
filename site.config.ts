import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '213e0a56290441aaace07354895bd113',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Metanaut Academy',
  domain: 'metanaut.academy',
  author: 'George Casseus',

  // open graph metadata (optional)
  description: 'Metnaut Academy',

  // social usernames (optional)
  twitter: 'MetanautAcademy',
  // github: 'transitive-bullshit',
  // linkedin: 'fisch2',
  // mastodon: '#', // optional mastodon profile URL, provides link verification
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: false,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/classes': 'e88fd99185524090ad1dc8caad3e3338',
    '/blog': 'f113fa29872f49cba57231440500a6d6',
    '/contact': '2887e4e80470415586fbfb7ee6c1c1d4'
  },
  // pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `navigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  navigationLinks: [
  { title: 'Home',    pageId: '213e0a56290441aaace07354895bd113' }, // your root
  { title: 'Classes', pageId: 'e88fd99185524090ad1dc8caad3e3338' },
  { title: 'Blog',    pageId: 'f113fa29872f49cba57231440500a6d6' },
  { title: 'Contact', pageId: '2887e4e80470415586fbfb7ee6c1c1d4' }
]
})
