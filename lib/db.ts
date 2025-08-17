import * as KeyvPkg from '@keyvhq/core'

// Workers-safe: always use in-memory Keyv to avoid bundling Node-only redis deps
const KeyvCtor: any = (KeyvPkg as any).default || (KeyvPkg as any)
const db = new KeyvCtor()

export { db }
