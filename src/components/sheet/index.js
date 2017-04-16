// Sheet component
// ===============
//
// Or “article view”. Too cool to call it that, though.

import React, { PropTypes } from 'react'
import cx from 'classnames'
import style from './index.scss'

const Sheet = ({ article, isFirst, isLast }) => (
  <article className={style.Sheet} key={article.id}>
    <menu className={style.menu}>
      <button className={style.button} {...{ disabled: isFirst }}>
        <i className={cx(style.icon, 'icon-move-left')} />
      </button>
      <button className={style.button} {...{ disabled: isLast }}>
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
