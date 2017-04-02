// Main menu
// =========

import React, { PropTypes } from 'react'
import style from './index.scss'
import cx from 'classnames'
import { emit } from '../event-bus'

const MainMenu = ({ isSearchVisible }) => {
  const searchButtonClassNames = cx({
    [style.searchButton]: !isSearchVisible,
    [style.searchButtonHidden]: isSearchVisible
  })

  return <menu className={style.MainMenu}>
    <span className={style.name}>
      Wiki Reader
    </span>
    <button className={style.button}>
      <i className={cx(style.icon, 'icon-reorder')} />
    </button>
    <button className={style.button}>
      <i className={cx(style.icon, 'icon-share')} />
    </button>
    <button
      className={searchButtonClassNames}
      onClick={e => emit('search:toggle')}>
      <i className={cx(style.icon, 'icon-search')} />
    </button>
  </menu>
}

MainMenu.propTypes = {
  isSearchVisible: PropTypes.bool
}

MainMenu.defaultProps = {
  isSearchVisible: false
}

export default MainMenu
