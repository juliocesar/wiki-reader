// Wikipedia API module
// ====================

import jsonp from './jsonp'
import { localStorageCache as cache } from './cache'

function hash(string) {
  let hash = 0
  let i
  let chr

  if (string.length === 0) {
    return hash
  }

  for (i = 0; i < string.length; i++) {
    chr = string.charCodeAt(i)
    hash = ((hash << 5) - hash) + chr
    hash |= 0
  }

  return hash
}

function articleUrl(name) {
  return `
    https://en.wikipedia.org/w/api.php?
    action=parse&page=${name}&format=json&
    prop=text|displaytitle|revid&mobileformat=html
  `.trim().replace(/\n/, '')
}

function searchUrl(query) {
  return `
    https://en.wikipedia.org/w/api.php?
    action=query&list=search&srsearch=${query}&format=json&srlimit=10
  `.trim().replace(/\n/, '')
}

function searchResultsToArticles(response) {
  window.rep = response

  return response.query.search.map(result => {
    return article({ title: result.title, snippet: result.snippet })
  })
}

export function article(attributes) {
  return Object.assign({
    id: null || hash(attributes.title),
    title: null,
    body: null,
    snippet: null
  }, attributes)
}

export function fetchArticle(name, options = {}) {
  if (cache.exists(name)) {
    const response = cache.get(name)

    return options.complete(article({
      id: response.parse.pageid,
      title: response.parse.displaytitle,
      body: response.parse.text['*']
    }))
  }

  jsonp({
    url: articleUrl(name),
    complete: response => {
      cache.set(name, response)

      options.complete(article({
        id: response.parse.pageid,
        title: response.parse.displaytitle,
        body: response.parse.text['*']
      }))
    }
  })
}

export function search(query, options = {}) {
  jsonp({
    url: searchUrl(query),
    complete: response => {
      options.complete(searchResultsToArticles(response))
    }
  })
}
