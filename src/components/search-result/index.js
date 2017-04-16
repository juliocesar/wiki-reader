// Search result
// =============

import React, { PropTypes } from 'react'
import style from './index.scss'
import { emit } from '../event-bus'

const SearchResult = ({ result }) => (
  <div
    className={style.SearchResult}
    onClick={() => emit('article:add', result.title)}>
    <span className={style.text}>
      {result.title}
    </span>
  </div>
)

SearchResult.propTypes = {
  result: PropTypes.object.isRequired
}

export default SearchResult
