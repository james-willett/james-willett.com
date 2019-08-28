import React from 'react'
import { graphql } from 'gatsby'
import CourseList from '../../components/course-list/course-list'
import Layout from '../../components/layout/layout'
import style from '../../templates/tag/tag.module.less'
import Config from '../../../config'
import SEO from '../../components/seo/seo'

const coursePage = Config.pages.courses

const Courses = ({ data }) => {
  return (
    <Layout title="Online Courses">
      <SEO
        title="Courses"
        description="Online courses about Software Development"
        path={coursePage}
      />
      <div className={style.heading} />
      <CourseList courses={data.allCourseDetailsJson.edges} />
    </Layout>
  )
}

export const query = graphql`
  {
    allCourseDetailsJson {
      totalCount
      edges {
        node {
          id
          title
          summary
          info
          slug
          img {
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
`
export default Courses
