import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import Utils from '../../utils/utils'
import style from '../post-list/post-list.module.less'

const Courses = ({ courses }) => (
  <div className={style.container}>
    {courses.map((course, index) => {
      const { id, title, img, summary, info, slug } = course.node
      return (
        <div key={title} className={style.post}>
          <div className={style.cover}>
            <Link to={`/courses/${Utils.resolvePageUrl(slug)}`}>
              <Img
                fluid={img.childImageSharp.fluid}
                title={title}
                alt={summary}
              />
            </Link>
          </div>
          <div className={style.content}>
            <Link to={`/courses/${Utils.resolvePageUrl(slug)}`}>
              <h2>{title}</h2>
              <p>{summary}</p>
            </Link>
          </div>
        </div>
      )
    })}
  </div>
)

export default Courses
