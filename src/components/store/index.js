// Application store
// =================

import { observable } from 'mobx'
import faker from 'faker'

const Store = new class {
  @observable articles = [
    randomArticle(),
    randomArticle(),
    randomArticle()
  ]
}()

function randomArticle() {
  return {
    id: faker.random.number(),
    title: faker.lorem.words(),
    text: faker.lorem.paragraphs(Math.random() * (13 - 3) + 3)
  }
}

export default Store
