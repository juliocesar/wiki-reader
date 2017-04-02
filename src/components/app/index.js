// App container
// =============

import React, { PropTypes } from 'react'
import style from './index.scss'
import MainMenu from '../main-menu'
import Book from '../book'
import Search from '../search'
import DevTools from 'mobx-react-devtools'
import { observer } from 'mobx-react'

const App = observer(({ store }) => (
  <div className={style.App}>
    <MainMenu isSearchVisible={store.ui.isSearchVisible} />
    <Book articles={Array(...store.articles)} />
    <Search
      isVisible={store.ui.isSearchVisible}
      results={Array(...store.searchResults)} />
    {process.env.NODE_ENV === 'development' && <DevTools />}
  </div>
))

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App
