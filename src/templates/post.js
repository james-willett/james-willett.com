import React from 'react'
import { graphql } from 'gatsby'
import { FixedObject } from 'gatsby-image'
import Helmet from 'react-helmet'
import DisqusComments from '../components/disqus-comments'
import Page from '../components/page'
import Pagination from '../components/pagination'
import RelatedPosts from '../components/related-posts'
import css from './post.module.less'
import { ReactComponent as CalendarIcon } from '../icons/calendar.svg'
import { ReactComponent as ClockIcon } from '../icons/clock.svg'

import 'prism-themes/themes/prism-a11y-dark.css'

export default ({ pageContext, data }) => {
  const { post, relatedPosts } = data
  const { html, timeToRead, frontmatter: meta } = post
  const { canonical, next, prev } = pageContext
  return (
    <Page title={meta.title} canonical={canonical} description={meta.summary}>
      <Helmet>
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={meta.date} />
        {pageContext.category && (
          <meta property="article:section" content={pageContext.category} />
        )}
        {meta.image && (
          <meta
            property="og:image"
            content={`${data.site.siteMetadata.siteUrl}${meta.image.publicURL}`}
          />
        )}
        {prev && <link rel="prev" href={prev.canonical} />}
        {next && <link rel="next" href={next.canonical} />}
      </Helmet>
      <article className={css.post}>
        <h1 className={css.post__title}>{meta.title}</h1>
        <div className={css.post__meta}>
          <time
            dateTime={meta.date}
            aria-label={`Written on ${meta.longDate}`}
            className={css.post__metaItem}
          >
            <CalendarIcon className={css.post__metaIcon} aria-hidden="true" />
            {meta.shortDate}
          </time>
          <time
            aria-label={`Estimated reading time: ${timeToRead} minute${
              timeToRead !== 1 ? 's' : ''
            }`}
            dateTime={`P${timeToRead}M`}
            className={css.post__metaItem}
          >
            <ClockIcon className={css.post__metaIcon} aria-hidden="true" />
            {timeToRead} min read
          </time>
        </div>
        <div
          className={css.post__content}
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <Pagination next={next} prev={prev} />
      </article>
      <RelatedPosts categoryLabel={pageContext.category} posts={relatedPosts} />
      <DisqusComments url={pageContext.canonical} />
    </Page>
  )
}

export const query = graphql`
  query($slug: String!, $category: String) {
    post: markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      timeToRead
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        shortDate: date(formatString: "MMM D, YYYY", locale: "en")
        longDate: date(formatString: "MMMM D, YYYY", locale: "en")
        summary
        image {
          publicURL
        }
      }
    }
    site {
      siteMetadata {
        siteUrl
      }
    }
    relatedPosts: allMarkdownRemark(
      filter: {
        frontmatter: { category: { eq: $category }, slug: { ne: $slug } }
      }
      sort: { fields: [frontmatter___date], order: [DESC] }
      limit: 4
    ) {
      edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "MMM D, YYYY", locale: "en")
            image {
              childImageSharp {
                fixed(width: 350) {
                  ...GatsbyImageSharpFixed_withWebp
                }
              }
            }
          }
        }
      }
    }
  }
`