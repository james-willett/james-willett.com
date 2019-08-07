import React from 'react'

import PostCard from './postcard'

import css from './related-posts.module.less'

function RelatedPosts({ categoryLabel, posts }) {
  if (!categoryLabel) {
    return null
  }

  return (
    <nav aria-label="Related posts" className={css.relatedPosts}>
      <div className={css.relatedPosts__title}>
        <div className={css.relatedPosts__titleText}>
          Read more
          {categoryLabel && (
            <React.Fragment>
              {' '}
              about <strong>{categoryLabel}</strong>
            </React.Fragment>
          )}
        </div>
      </div>
      <div className={css.relatedPosts__listContainer}>
        <div className={css.relatedPosts__list}>
          {posts.edges.map(({ node }) => (
            <PostCard
              className={css.relatedPosts__postlink}
              slug={node.fields.slug}
              timeToRead={node.timeToRead}
              {...node.frontmatter}
            />
          ))}
        </div>
      </div>
    </nav>
  )
}

export default RelatedPosts
