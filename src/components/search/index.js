// Search form
// ===========

import React, { PropTypes } from 'react'
import style from './index.scss'
import cx from 'classnames'
import SearchResult from '../search-result'
import { emit } from '../event-bus'

const Search = ({ results, query, isVisible }) => {
  const classNames = cx({
    [style.Search]: isVisible,
    [style.SearchHidden]: !isVisible
  })

  return <div className={classNames}>
    <button
      className={style.closeButton}
      onClick={e => emit('search:toggle')}>
      <i className={cx(style.icon, 'icon-close')} />
    </button>
    <form className={style.form}>
      <input
        type="text"
        className={style.textfield}
        onChange={e => emit('query:update', e.target.value)}
        autoComplete="off"
        autoCorrect="off"
        placeholder="Wikipedia search"
        spellCheck="false" />
      <div className={style.instruction}>
        Press enter to search
      </div>
    </form>
    <div className={style.resultsWrapper}>
      {results.map(result => <SearchResult result={result} />)}
    </div>
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
