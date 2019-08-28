import React from 'react'
import PropTypes from 'prop-types'
import style from './content.module.less'

const Content = ({ info, link }) => (
  <div className={style.container}>
    <div className={style.enrollButton}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button>Enroll now!</button>
      </a>
    </div>
    <article dangerouslySetInnerHTML={{ __html: info }} />
    <div className={style.enrollButton}>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <button>Enroll now!</button>
      </a>
    </div>
  </div>
)

Content.propTypes = {
  html: PropTypes.string.isRequired
}

export default Content
