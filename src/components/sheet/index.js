// Sheet component
// ===============
//
// Or “article view”. Too cool to call it that, though.

import React, { PropTypes } from 'react'
import style from './index.scss'

const Sheet = ({ article }) => (
  <article className={style.Sheet} key={article.id}>
    <header>
      <h1 className={style.title}>{article.title}</h1>
      <div
        className={style.textWrapper}
        dangerouslySetInnerHTML={{ __html: article.body }} />
    </header>
  </article>
)

Sheet.propTypes = {
  article: PropTypes.object.isRequired
}

export default Sheet
