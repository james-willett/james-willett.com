import React from 'react'
import { graphql, Link } from 'gatsby'
import { FixedObject } from 'gatsby-image'
import { Page } from '../components'
import * as Utils from '../utils/utils'
import Config from '../../config'
// import style from './tag.module.less'

interface TagData {
  allMarkdownRemark: {
    posts: Array<{
      node: {
        fields: {
          slug: string
        }
        timeToRead: string
        frontmatter: {
          title: string
          date: string
          tags: Array<string>
          image: null | {
            childImageSharp: {
              fixed: FixedObject
            }
          }
        }
      }
    }>
  }
  site: {
    siteMetadata: {
      description: string
      siteUrl: string
    }
  }
}

interface TagPageProps {
  data: TagData
}

export default ({ data }: TagPageProps) => {
  const rawTags = data.allMarkdownRemark.posts
    .map(edge => edge.node.frontmatter.tags)
    .reduce((prev, curr) => prev.concat(curr))
  const tags = rawTags
    .filter((tag, index) => index === rawTags.indexOf(tag))
    .sort() // remove duplicates and sort values
  const tagPage = Config.pages.tag
  console.log(data)
  console.log(rawTags)
  console.log(tags)
  return (
    <Page
      wide={true}
      canonical="replace me"
      description="All tags present on the site"
    >
      hello world
      <div>
        {tags.map(tag => (
          <Link
            to={Utils.resolvePageUrl(tagPage, tag)}
            className={style.card}
            key={tag}
          >
            Link goes here!
          </Link>
        ))}
      </div>
    </Page>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      posts: edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
            tags
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
    site {
      siteMetadata {
        description
        siteUrl
      }
    }
  }
`
