// Wikipedia API module
// ====================

import jsonp from './jsonp'

function articleUrl(name) {
  return `
    http://en.wikipedia.org/w/api.php?
    action=parse&page=${name}&format=json&
    prop=text|displaytitle|revid&mobileformat=html
  `.trim().replace(/\n/, '')
}

function searchUrl(query) {
  return `
    http://en.wikipedia.org/w/api.php?
    action=query&list=search&srsearch=${query}&format=json&srlimit=10
  `.trim().replace(/\n/, '')
}

function searchResultsToArticles(response) {
  return response.query.search.map(result => {
    return {
      title: result.title,
      text: null,
      snippet: result.snippet
    }
  })
}

export function fetchArticle(name, options = {}) {
  jsonp(Object.assign({}, { url: articleUrl(name) }, options))
}

export function search(query, options = {}) {
  jsonp({
    url: searchUrl(query),
    complete: response => {
      if (options.complete) {
        options.complete(searchResultsToArticles(response))
      }
    }
  })
}
