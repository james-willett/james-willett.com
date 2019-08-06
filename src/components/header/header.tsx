import React, { useState } from 'react'
import className from 'classnames'
import Img, { FixedObject } from 'gatsby-image'
import { Link, StaticQuery, graphql } from 'gatsby'
import { GitHubLink, TwitterLink, YoutubeLink } from './social-link'
import css from './header.module.less'
import { FaAlignRight } from 'react-icons/fa'
import links from './constants/links'

interface HeaderProps {
  wide?: boolean
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    logo: {
      childImageSharp: {
        fixed: FixedObject
      }
    }
  }
}

function HeaderComponent({ data, wide }: HeaderProps) {
  const contentClass = className(css.header__content, {
    [css.header__contentWide]: wide
  })
  const [isOpen, setNav] = useState(false)
  const toggleNav = () => {
    setNav(isOpen => !isOpen)
  }
  return (
    <header role="banner" className={css.header}>
      <div className={contentClass}>
        <Link
          to="/"
          className={css.header__homeLink}
          aria-label="Homepage - James Willett"
          rel="home"
        >
          <Img
            aria-hidden="true"
            fixed={data.logo.childImageSharp.fixed}
            className={css.header__logo}
          />
          {data.site.siteMetadata.title}
        </Link>

        <nav className={css.navbar}>
          <div className={css.navCenter}>
            <div className={css.navHeader}>
              <button type="button" className={css.menuBtn} onClick={toggleNav}>
                <FaAlignRight className={css.menuIcon} />
              </button>
            </div>
            <ul
              className={
                isOpen ? `${css.navLinks} ${css.showNav}` : `${css.navLinks}`
              }
            >
              {links.map((item, index) => {
                return (
                  <li key={index}>
                    <Link to={item.path}>{item.text}</Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </nav>

        {/* <nav
          aria-label="Social media links"
          className={css.header__socialLinks}
        >
          <TwitterLink />
          <YoutubeLink />
          <GitHubLink />
        </nav> */}
      </div>
    </header>
  )
}

export const Header = (props: Omit<HeaderProps, 'data'>) => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "logo.png" }) {
          childImageSharp {
            fixed(width: 42, height: 42) {
              ...GatsbyImageSharpFixed_withWebp
            }
          }
        }
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => <HeaderComponent data={data} {...props} />}
  />
)
