// Search result
// =============

import React, { PropTypes } from 'react'
import style from './index.scss'
import cx from 'classnames'

const SearchResult = ({ result }) => (
  <div className={style.SearchResult}>
    <i className={cx(style.icon, 'icon-search-result')} />
    <span className={style.text}>
      {result.text}
    </span>
  </div>
)

SearchResult.propTypes = {
  result: PropTypes.object.isRequired
}

export default SearchResult
