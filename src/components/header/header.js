import React, { useState } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import css from './header.module.less'
import { FaAlignRight } from 'react-icons/fa'
import links from './constants/links'
import socialIcons from './constants/social-icons'

export function HeaderComponent() {
  const [isOpen, setNav] = useState(false)
  const toggleNav = () => {
    setNav(isOpen => !isOpen)
  }
  return (
    <nav className={css.navbar}>
      <div className={css.navCenter}>
        <div className={css.navHeader}>
          <Link
            to="/"
            className={css.header__homeLink}
            aria-label="Homepage - James Willett"
            rel="home"
          >
            James Willett
          </Link>
          <button type="button" className={css.logoBtn} onClick={toggleNav}>
            <FaAlignRight className={css.logoIcon} />
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
        <div className={css.navSocialLinks}>
          {socialIcons.map((item, index) => {
            return (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.icon}
              </a>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

const Header = props => (
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

export default Header
