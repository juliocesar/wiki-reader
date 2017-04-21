// Application store
// =================

import { observable, action } from 'mobx'
import { on } from '../event-bus'
import { search, article, fetchArticle } from '../wikipedia-api'
import createHashHistory from 'history/createHashHistory'
import queryString from 'query-string'

function arrayUnion(arr1, arr2, equalityFunc) {
  let union = arr1.concat(arr2)

  for (var i = 0; i < union.length; i++) {
    for (var j = i + 1; j < union.length; j++) {
      if (equalityFunc(union[i], union[j])) {
        union.splice(j, 1)
        j--
      }
    }
  }

  return union
}

const Store = new class {
  history: null

  titlesInUrl = () => {
    const parsed = queryString.parse(this.history.location.search)

    return parsed.a ?
      parsed.a.split(/,/).map(title => decodeURI(title)) :
      []
  }

  syncWithTitles = (shouldFetch = true) => {
    const titles = this.titlesInUrl()
    const filtered = this.articles.filter(article => {
      return titles.indexOf(article.title) > -1
    })
    const filteredTitles = filtered.map(article => article.title)
    const titlesArticles = titles
      .filter(title => filteredTitles.indexOf(title) === -1)
      .map(title => article({ title: title }))
    const orderedUnion = arrayUnion(filtered, titlesArticles, (a1, a2) => {
      a1.title === a2.title
    })
    .sort(a1 => titles.indexOf(a1.title))
    this.articles = [...orderedUnion]

    if (shouldFetch) {
      this.fetchAllArticles()
    }
  }

  fetchAllArticles = () => {
    this.articles.map(article => {
      if (article.body === null) {
        fetchArticle(article.title, {
          complete: fetched => {
            const index = this.articles.indexOf(article)
            this.articles[index] = fetched
          }
        })
      }
    })
  }

  @observable ui = { isSearchVisible: false }
  @observable searchResults = []
  @observable searchQuery = ''
  @observable articles = []

  @action setQuery(value) {
    this.searchQuery = value
  }

  @action setResults(results) {
    this.searchResults = [...results]
  }

  @action addArticle(article) {
    this.articles = [...this.articles, article]
  }

  @action toggleSearch(showOrHide = null) {
    this.ui.isSearchVisible = showOrHide !== null ?
      showOrHide : !this.ui.isSearchVisible
  }
}()

function onQueryUpdate(value) {
  Store.setQuery(value)
}

function onSearchToggle() {
  Store.toggleSearch()
}

function onSearchSubmit() {
  search(Store.searchQuery, { complete: results => Store.setResults(results) })
}

function onArticleAdd(title) {
  const titles = Store.titlesInUrl()
  if (titles.indexOf(title) > -1) {
    return false
  }

  Store.history.push(`/?a=${
    [...Store.titlesInUrl(), encodeURI(title)].join(',')
  }`)

  Store.toggleSearch(false)
}

function onArticleMove(title, index) {
  const titles = Store.titlesInUrl()
  const currentIndex = titles.indexOf(title)
  const newIndex = currentIndex + index

  if (newIndex > titles.length || newIndex < 0) {
    return false
  }

  titles.splice(newIndex, 0, titles.splice(currentIndex, 1)[0])

  Store.history.push(`/?a=${[...titles].join(',')}`)
}

function onAppBoot() {
  Store.history = createHashHistory()
  Store.history.listen(Store.syncWithTitles)
  Store.syncWithTitles()
}

const EventsMap = {
  'query:update': onQueryUpdate,
  'search:toggle': onSearchToggle,
  'search:submit': onSearchSubmit,
  'article:add': onArticleAdd,
  'article:back': title => onArticleMove(title, -1),
  'article:forward': title => onArticleMove(title, 1),
  'app:boot': onAppBoot
}

export function bindEvents() {
  Object.keys(EventsMap).map(name => on(name, EventsMap[name]))
}

export default Store
