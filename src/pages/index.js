import React from 'react'
import Layout from '../components/layout/layout'
import { graphql, Link } from 'gatsby'
import tempImage from '../images/logo.png'
import PostCard from '../components/postcard/postcard'
import SEO from '../components/seo/seo'

import style from './index.module.less'

export default function homepage({ data }) {
  console.log(data)
  return (
    <Layout>
      <SEO
        title="Homepage"
        description="Blog of James Willett"
        path="/"
        keywords={['scala', 'gatling', 'blog']}
      />
      <div className={style.container}>
        <div className={style.banner}>Hi, I'm James Willett</div>
        <div className={style.introText}>
          <div className={style.introImage}>
            <img src={tempImage} alt="James Willett Headshot" />
          </div>
          <p>
            Welcome to my personal website, where I blog about my experiences in
            Software Development. The majority of posts on this blog are about
            <b> Scala, Gatling</b> and <b>REST Assured.</b>
          </p>
          <p>
            If you use any of the above tools, I am sure you will find content
            on my site that is helpful to you. Be sure to check out the{' '}
            <Link to="/courses">courses</Link> page for details of my latest
            courses on Udemy.
          </p>
        </div>
        <hr />
        <div className={style.banner}>Latest Blog Posts</div>
        <nav aria-label="Posts">
          <ul className={style.postlist}>
            {data.allMarkdownRemark.posts.map(({ node: post }) => (
              <li key={post.fields.slug} className={style.postlist__entry}>
                <PostCard
                  slug={post.fields.slug}
                  timeToRead={post.timeToRead}
                  {...post.frontmatter}
                />
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      limit: 6
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      posts: edges {
        node {
          fields {
            slug
          }
          timeToRead
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
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
