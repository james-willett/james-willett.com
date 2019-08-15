import React from 'react'
import { graphql, Link } from 'gatsby'
import CourseList from '../../components/course-list/course-list'
import Layout from '../../components/layout/layout'
import style from '../../templates/tag.module.less'

const Courses = ({ data }) => {
  return (
    <Layout title="Courses!">
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
