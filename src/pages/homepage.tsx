import React from 'react'
import Helmet from 'react-helmet'
import { Page } from '../components'
import { graphql } from 'gatsby'

import css from './homepage.module.less'
import css2 from './tag.module.less'

export default function homepage({ data }) {
  console.log(data)
  return (
    <Page
      wide={true}
      canonical={data.site.siteMetadata.siteUrl}
      description={data.site.siteMetadata.description}
    >
      <div className={css.postlist}>hello?</div>
    </Page>
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
