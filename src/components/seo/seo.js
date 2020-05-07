/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { StaticQuery, graphql } from 'gatsby'
/* App imports */
import Config from '../../../config'
import Utils from '../../utils/utils'

function SEO({
  title,
  description,
  date,
  path,
  next,
  prev,
  lang,
  category,
  keywords,
  contentType,
  imageUrl,
  meta,
}) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaKeywords =
          keywords && keywords.length > 0
            ? { name: 'keywords', content: keywords.join(', ') }
            : []
        const pageUrl = Utils.resolvePageUrl(Config.siteUrl, path)
        const metaImageUrl = Utils.resolveUrl(
          imageUrl ? imageUrl : data.file.childImageSharp.fixed.src
        )

        return (
          <Helmet
            title={title} // Page title
            titleTemplate={`%s | ${Config.siteTitle}`}
            meta={
              [
                { name: 'description', content: description }, // Page description
                { property: 'article:published_time', content: date },
                { property: 'article:section', content: category },
                /* Open Graph */
                { property: 'og:title', content: title },
                { property: 'og:type', content: contentType || 'website' },
                { property: 'og:url', content: pageUrl },
                { property: 'og:description', content: description },
                { property: 'og:image', content: metaImageUrl },
                { property: 'og:image:alt', content: description },
                { property: 'og:site_name', content: Config.siteTitle },
                { property: 'og:locale', content: lang || 'en_US' },
                /* Twitter card */
                { name: 'twitter:card', content: 'summary_large_image' },
                { name: 'twitter:title', content: title },
                { name: 'twitter:description', content: description },
                { name: 'twitter:image', content: metaImageUrl },
                { name: 'twitter:image:alt', content: description },
                { name: 'twitter:site', content: Config.author },
                { name: 'twitter:creator', content: Config.author },
              ]
                .concat(metaKeywords) // Keywords
                .concat(meta || []) // Other provided metadata
            }
            link={[
              { rel: 'canonical', href: pageUrl }, // Canonical url
            ]}
          >
            {prev && <link rel="prev" href={prev.canonical} />}
            {next && <link rel="next" href={next.canonical} />}
          </Helmet>
        )
      }}
    />
  )
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  lang: PropTypes.string,
  contentType: PropTypes.oneOf(['article', 'website']),
  imageUrl: PropTypes.string,
  keywords: PropTypes.arrayOf(PropTypes.string),
  meta: PropTypes.arrayOf(
    PropTypes.shape({
      property: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
}

const detailsQuery = graphql`
  query DefaultSEOQuery {
    file(name: { eq: "facebook-logo" }) {
      childImageSharp {
        fixed(width: 500) {
          ...GatsbyImageSharpFixed_noBase64
        }
      }
    }
  }
`
export default SEO
