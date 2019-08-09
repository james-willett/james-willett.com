import React from 'react'
import { graphql, Link } from 'gatsby'
import Image from 'gatsby-image'
import Page from '../components/page'
import Utils from '../utils/utils'
import Config from '../../config'
import style from './tag.module.less'

export default ({ data }) => {
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
            <div className={style.cover}>
              <Image
                fluid={
                  data.allFile.edges.find(edge => edge.node.name === tag).node
                    .childImageSharp.fluid
                }
              />
            </div>
            <div className={style.content}>
              <h2>{Config.tags[tag].name || Utils.capitalize(tag)}</h2>
              <p>{Config.tags[tag].description}</p>
              <label>{`${
                rawTags.filter(sTag => sTag === tag).length
              } Posts`}</label>
            </div>
          </Link>
        ))}
      </div>
      hello
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
    allFile(filter: { relativeDirectory: { eq: "tags" } }) {
      edges {
        node {
          name
          childImageSharp {
            fluid(maxWidth: 400) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
