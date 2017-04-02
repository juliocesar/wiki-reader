// Application store
// =================

import { observable, action } from 'mobx'
import { on } from '../event-bus'
import faker from 'faker'

const Store = new class {
  @observable ui = {
    isSearchVisible: true
  }
  @observable searchResults = [
    randomSearchResult(),
    randomSearchResult(),
    randomSearchResult(),
    randomSearchResult(),
    randomSearchResult()
  ]
  @observable searchQuery = ''
  @observable articles = [
    randomArticle(),
    randomArticle(),
    randomArticle()
  ]

  @action setQuery(value) {
    this.searchQuery = value
  }

  @action toggleSearch() {
    this.ui.isSearchVisible = !this.ui.isSearchVisible
  }
}()

function randomSearchResult() {
  return {
    id: faker.random.number(),
    text: faker.lorem.words(1)
  }
}

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

const EventsMap = {
  'query:update': onQueryUpdate,
  'search:toggle': onSearchToggle
}

export function bindEvents() {
  Object.keys(EventsMap).map(name => on(name, EventsMap[name]))
}

export default Store
