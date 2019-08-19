import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/layout/layout'
import style from './course.module.less'
import Heading from './heading/heading'
import Content from './content/content'

const CourseTemplate = ({ data }) => {
  const { id, title, summary, link, info } = data.course.edges[0].node
  const img = data.course.edges[0].node.img.childImageSharp.fluid
  return (
    <Layout>
      <div className={style.container}>
        <Heading title={title} cover={img} coverTitle={summary} />
        <div className={style.content}>
          <Content info={info} link={link} />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!) {
    course: allCourseDetailsJson(filter: { slug: { eq: $slug } }) {
      totalCount
      edges {
        node {
          id
          title
          slug
          summary
          link
          info
          img {
            childImageSharp {
              fluid(maxWidth: 1000) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
      }
    }
  }
`

export default CourseTemplate
