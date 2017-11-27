// Sheet component
// ===============
//
// Or “article view”. Too cool to call it that, though.

import React, { PropTypes } from 'react'
import cx from 'classnames'
import style from './index.scss'
import { emit } from '../event-bus'

function isWikiLink(node) {
  return node.tagName === 'A' && (/\/wiki\//).test(node.href)
}

const onClickArticleContents = event => {
  const node = event.target

  if (isWikiLink(node)) {
    event.preventDefault()
    const title = node.href.substr(node.href.lastIndexOf('/') + 1)
    emit('article:add', title)
  }
  return false
}

const Sheet = ({ article, isFirst, isLast }) => (
  <article className={style.Sheet} key={article.id}>
    <menu className={style.menu}>
      <button
        onClick={() => emit('article:back', article.title)}
        className={style.button} {...{ disabled: isFirst }}>
        <i className={cx(style.icon, 'icon-move-left')} />
      </button>
      <button
        onClick={() => emit('article:forward', article.title)}
        className={style.button} {...{ disabled: isLast }}>
        <i className={cx(style.icon, 'icon-move-right')} />
      </button>
      <button className={style.button}>
        <i className={cx(style.icon, 'icon-delete')} />
      </button>
    </menu>
    <header>
      <h1 className={style.title}>{article.title}</h1>
      <div
        className={style.textWrapper}
        onClick={onClickArticleContents}
        dangerouslySetInnerHTML={{ __html: article.body }} />
    </header>
  </article>
)

Sheet.propTypes = {
  article: PropTypes.object.isRequired,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool
}

export default Sheet
