import React from 'react'
import className from 'classnames'
import { Link } from 'gatsby'
import { ReactComponent as NextIcon } from '../../images/icons/next.svg'
import { ReactComponent as PrevIcon } from '../../images/icons/prev.svg'

import css from './pagination.module.less'

const Pagination = ({ next, prev }) => {
  if (!next && !prev) {
    return null
  }

  const containerClass = className(css.pagination, {
    [css.paginationFirst]: next && !prev,
    [css.paginationLast]: !next && prev
  })

  return (
    <div className={containerClass}>
      {next && (
        <Link
          to={`/${next.slug}`}
          rel="next"
          className={className(css.pagination__link, css.pagination__linkNext)}
        >
          <span>
            <div className={css.pagination__type}>Next</div>
            {next.title}
          </span>
          <NextIcon aria-hidden="true" className={css.pagination__icon} />
        </Link>
      )}
      {prev && (
        <Link
          to={`/${prev.slug}`}
          rel="prev"
          className={className(css.pagination__link, css.pagination__linkprev)}
        >
          <PrevIcon aria-hidden="true" className={css.pagination__icon} />
          <span>
            <div className={css.pagination__type}>Previous</div>
            {prev.title}
          </span>
        </Link>
      )}
    </div>
  )
}

export default Pagination
