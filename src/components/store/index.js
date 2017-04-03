// Application store
// =================

import { observable, action } from 'mobx'
import { on } from '../event-bus'
import { search } from '../wikipedia-api'
import faker from 'faker'

const Store = new class {
  @observable ui = {
    isSearchVisible: true
  }
  @observable searchResults = []
  @observable searchQuery = ''
  @observable articles = [
    randomArticle(),
    randomArticle(),
    randomArticle()
  ]

  @action setQuery(value) {
    this.searchQuery = value
  }

  @action setResults(results) {
    this.searchResults = [...results]
  }

  @action toggleSearch() {
    this.ui.isSearchVisible = !this.ui.isSearchVisible
  }
}()

function randomArticle() {
  return {
    id: faker.random.number(),
    title: faker.lorem.words(),
    text: faker.lorem.paragraphs(Math.random() * (13 - 3) + 3)
  }
}

function onQueryUpdate(value) {
  Store.setQuery(value)
}

function onSearchToggle() {
  Store.toggleSearch()
}

function onSearchSubmit() {
  search(Store.searchQuery, { complete: results => Store.setResults(results) })
}

const EventsMap = {
  'query:update': onQueryUpdate,
  'search:toggle': onSearchToggle,
  'search:submit': onSearchSubmit
}

export function bindEvents() {
  Object.keys(EventsMap).map(name => on(name, EventsMap[name]))
}

export default Store

window.store = Store
