// App container
// =============

import React, { PropTypes } from 'react'
import style from './index.scss'
import MainMenu from '../main-menu'
import Book from '../book'

const App = ({ store }) => (
  <div className={style.App}>
    <MainMenu />
    <Book articles={Array(...store.articles)} />
  </div>
)

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
