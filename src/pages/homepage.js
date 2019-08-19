import React from 'react'
import Helmet from 'react-helmet'
import Layout from '../components/layout/layout'
import { graphql } from 'gatsby'
import tempImage from '../images/logo.png'

import style from './homepage.module.less'

export default function homepage({ data }) {
  console.log(data)
  return (
    <Layout>
      <div className={style.container}>
        <div className={style.banner}>Hi, I'm James Willett</div>
        <div className={style.introText}>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
            ut dolorem iste at, sequi ipsa delectus deleniti perspiciatis illo
            repellendus.
          </p>
          <div className={style.introImage}>
            <img src={tempImage} />
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Necessitatibus, vel earum ipsam quia ex eveniet perferendis
            assumenda impedit non ullam aut quisquam delectus placeat, beatae
            nulla reiciendis nihil, expedita sit.
          </p>
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  {
    site {
      siteMetadata {
        description
        siteUrl
      }
    }
  }
`
