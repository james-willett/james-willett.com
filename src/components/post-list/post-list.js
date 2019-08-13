import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
/* App imports */
import style from './post-list.module.less'
import TagList from '../tag-list/tag-list'
import Utils from '../../utils/utils'

const PostList = ({ posts }) => (
  <div className={style.container}>
    {posts.map((post, index) => {
      const { title, date, slug, tags, image, summary } = post.node.frontmatter
      return (
        <div key={title} className={style.post}>
          <div className={style.cover}>
            <Link to={`/${Utils.resolvePageUrl(slug)}`}>
              <Img
                fluid={image.childImageSharp.fluid}
                title={title}
                alt={summary}
              />
            </Link>
          </div>
          <div className={style.content}>
            <Link to={`/${Utils.resolvePageUrl(slug)}`}>
              {date ? <label>{date}</label> : null}
              <h2>{title}</h2>
              <p>{summary}</p>
            </Link>
            <TagList tags={tags} />
          </div>
        </div>
      )
    })}
  </div>
)

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      node: PropTypes.shape({
        frontmatter: PropTypes.shape({
          title: PropTypes.string.isRequired,
          date: PropTypes.string,
          slug: PropTypes.string.isRequired,
          tags: PropTypes.arrayOf(PropTypes.string).isRequired,
          image: PropTypes.shape({
            childImageSharp: PropTypes.shape({
              fluid: PropTypes.object.isRequired
            }).isRequired
          }).isRequired
        })
      })
    })
  )
}

export default PostList
