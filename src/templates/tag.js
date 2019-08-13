import React from 'react'
import { graphql } from 'gatsby'
import Img from 'gatsby-image'

import PostList from '../components/post-list/post-list'
import Page from '../components/page'
import style from './tag.module.less'
import Config from '../../config'
import Utils from '../utils/utils'

const TagPage = ({ data, pageContext }) => {
  const tag = pageContext.tag
  const tagName = Config.tags[tag].name || Utils.capitalize(tag)
  const tagPagePath = Config.pages.tag
  const tagImage = data.allFile.edges.find(edge => edge.node.name === tag).node
    .childImageSharp.fluid

  return (
    <Page
      wide={true}
      canonical="replace me"
      description={`All posts about ${tagName}`}
    >
      <div className={style.heading}>
        <div>
          <h1>{tagName}</h1>
        </div>
        <div className={style.cover}>
          <Img fluid={tagImage} />
        </div>
      </div>
      <PostList posts={data.allMarkdownRemark.edges} />
    </Page>
  )
}

export const pageQuery = graphql`
  query($tag: String!) {
    allMarkdownRemark(
      filter: {
        frontmatter: { tags: { in: [$tag] } }
        fileAbsolutePath: { regex: "/index.md$/" }
      }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            slug
            tags
            summary
            image {
              childImageSharp {
                fluid(maxWidth: 600) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    allFile(filter: { name: { eq: $tag }, dir: { regex: "/tags$/" } }) {
      edges {
        node {
          name
          dir
          childImageSharp {
            fluid(maxHeight: 200) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
export default TagPage
