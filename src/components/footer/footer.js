import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import css from './footer.module.less'

const FooterComponent = props => {
  return (
    <footer className={css.footer}>
      <a
        href={props.privacyUrl}
        className={css.footer__link}
        target="_blank"
        rel="noopener nofollow noreferrer"
      >
        Privacy Policy
      </a>
      <script
        type="text/javascript"
        src="https://a.opmnstr.com/app/js/api.min.js"
        data-account="77678"
        data-user="69079"
        async
      ></script>
    </footer>
  )
}

const Footer = () => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            privacyPolicy
          }
        }
      }
    `}
    render={data => (
      <FooterComponent privacyUrl={data.site.siteMetadata.privacyPolicy} />
    )}
  />
)

export default Footer
