/* Vendor imports */
import React from 'react'
import PropTypes from 'prop-types'
/* App imports */
import Header from '../header/header'
import Footer from '../footer/footer'
import '../../styles/global.less'
import style from './layout.module.less'
import CookieConsent from '../cookie-consent/cookie-consent'

const Layout = ({ children, title }) => (
  <>
    <Header />
    <div className={style.container}>
      {title ? (
        <div className={style.title}>
          <h1>{title}</h1>
        </div>
      ) : null}
      {children}
    </div>
    <Footer />
    <CookieConsent />
  </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
}

Layout.defaultProps = {
  title: ''
}

export default Layout
