// Search form
// ===========

import React, { PropTypes, Component } from 'react'
import style from './index.scss'
import cx from 'classnames'
import { emit } from '../event-bus'
import { observer } from 'mobx-react'
import SearchResult from '../search-result'

function onSubmit(event) {
  event.preventDefault()
  emit('search:submit')
}

@observer
export default class Search extends Component {
  static propTypes = {
    results: PropTypes.array,
    isVisible: PropTypes.bool
  }

  static defaultProps = {
    results: [],
    isVisible: false
  }

  componentDidUpdate() {
    if (this.props.isVisible === true) {
      this.refs.textfield.focus()
    }
  }

  render() {
    const { isVisible, results } = this.props

    const classNames = cx({
      [style.SearchVisible]: isVisible,
      [style.Search]: !isVisible
    })

    return <div className={classNames}>
      <button
        className={style.closeButton}
        onClick={e => emit('search:toggle')}>
        <i className={cx(style.icon, 'icon-close')} />
      </button>
      <form
        className={style.form}
        onSubmit={onSubmit}>
        <input
          type="text"
          className={style.textfield}
          ref="textfield"
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
        {results.map(result => (
          <SearchResult result={result} key={result.title} />
        ))}
      </div>
    </div>
  }
}
