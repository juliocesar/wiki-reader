// Search form
// ===========

import React, { PropTypes } from 'react'
import style from './index.scss'
import cx from 'classnames'
import { emit } from '../event-bus'

function onQueryChange(event) {
  emit('query:update', event.target.value)
}

const Search = ({ results, query, isVisible }) => {
  const classNames = cx({
    [style.Search]: isVisible,
    [style.SearchHidden]: !isVisible
  })

  return <div className={classNames}>
    <form className={style.form}>
      <input
        type="text"
        onChange={onQueryChange}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false" />
    </form>
  </div>
}

Search.propTypes = {
  results: PropTypes.array,
  query: PropTypes.string,
  isVisible: PropTypes.bool
}

Search.defaultProps = {
  results: [],
  isVisible: false,
  query: ''
}

export default Search
