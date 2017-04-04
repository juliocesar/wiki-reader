// Search result
// =============

import React, { PropTypes } from 'react'
import style from './index.scss'
import cx from 'classnames'
import { emit } from '../event-bus'

const SearchResult = ({ result }) => (
  <div
    className={style.SearchResult}
    onClick={() => emit('article:add', result.title)}>
    <i className={cx(style.icon, 'icon-search-result')} />
    <span className={style.text}>
      {result.title}
    </span>
  </div>
)

SearchResult.propTypes = {
  result: PropTypes.object.isRequired
}

export default SearchResult
