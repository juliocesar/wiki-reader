// Application store
// =================

import { observable, action } from 'mobx'
import { on } from '../event-bus'
import faker from 'faker'

const Store = new class {
  @observable ui = {
    isSearchVisible: false
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

const EventsMap = {
  'query:update': onQueryUpdate
}

export function bindEvents() {
  Object.keys(EventsMap).map(name => on(name, EventsMap[name]))
}

export default Store
