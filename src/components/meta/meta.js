import React from 'react'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'

export function MetaComponent({
  pageTitle,
  description,
  siteTitle,
  canonical
}) {
  return (
    <Helmet>
      <link rel="canonical" href={canonical} />
      <title>{pageTitle ? `${pageTitle} » ${siteTitle}` : siteTitle}</title>
      <meta name="description" content={description} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:url" content={canonical} />
      <meta property="og:description" content={description} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter meta tags (that are not already covered by OpenGraph) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@james_willett1" />
      <meta name="twitter:creator" content="@james_willett1" />
      <script
        src="https://my.hellobar.com/963fde236d330ec398c695d7abba79ef39b05cba.js"
        type="text/javascript"
        charset="utf-8"
        async="async"
      />
    </Helmet>
  )
}

const Meta = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <MetaComponent siteTitle={data.site.siteMetadata.title} {...props} />
    )}
  />
)

export default Meta
