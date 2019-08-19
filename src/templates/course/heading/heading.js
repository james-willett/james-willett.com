import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'
import style from './heading.module.less'

const Heading = ({ title, cover, coverTitle }) => (
  <div className={style.header}>
    <div className={style.title}>
      <h1>{title}</h1>
    </div>
    <div className={style.cover}>
      <Img fluid={cover} title={coverTitle} alt={title} />
    </div>
  </div>
)

Heading.propTypes = {
  title: PropTypes.string.isRequired,
  cover: PropTypes.object.isRequired,
  coverTitle: PropTypes.string
}

export default Heading
