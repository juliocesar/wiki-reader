// Book component
// ==============

import React, { PropTypes } from 'react'
import style from './index.scss'
import Sheet from '../sheet'

const Book = ({ articles }) => (
  <div className={style.Book}>
    {articles.map((article, index) => {
      return <Sheet
        key={article.id}
        article={article}
        isFirst={index === 0}
        isLast={index === articles.length - 1}
      />
    })}
  </div>
)

Book.propTypes = {
  articles: PropTypes.array
}

Book.defaultProps = {
  articles: []
}

export default Book
