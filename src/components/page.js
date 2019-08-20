import React from 'react'
import Helmet from 'react-helmet'

import Footer from './footer'
import Header from './header/header'
import Meta from './meta/meta'
import CookieConsent from './cookie-consent'

import css from './page.module.less'

function Page({ children, title, description, canonical, wide }) {
  return (
    <React.Fragment>
      <Helmet
        bodyAttributes={{ class: css.page }}
        htmlAttributes={{ lang: 'en' }}
      />
      {/* <Meta pageTitle={title} description={description} canonical={canonical} /> */}
      <Header />
      <main role="main" className={css.page__main}>
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </React.Fragment>
  )
}

export default Page
