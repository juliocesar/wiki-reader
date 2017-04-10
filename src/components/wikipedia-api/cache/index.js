// API caching engines
// ===================

import LZString from 'lz-string'

export const localStorageCache = {
  set: (key, struct) => {
    window.localStorage[key] = LZString.compress(JSON.stringify(struct))
  },

  get: key => {
    const compressed = window.localStorage[key]

    if (compressed) {
      return JSON.parse(LZString.decompress(compressed))
    }
  },

  exists: key => {
    return !!window.localStorage[key]
  }
}
