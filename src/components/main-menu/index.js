// Main menu
// =========

import React from 'react'
import style from './index.scss'
import cx from 'classnames'

const MainMenu = () => {
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
    <button className={style.searchButton}>
      <i className={cx(style.icon, 'icon-search')} />
    </button>
  </menu>
}

export default MainMenu
