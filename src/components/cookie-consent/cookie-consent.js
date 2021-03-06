// import React from 'react'
// import Helmet from 'react-helmet'
// import { StaticQuery, graphql } from 'gatsby'

// class CookieConsentComponent extends React.Component {
//   componentDidMount() {
//     window.addEventListener('load', () => {
//       window.cookieconsent.initialise({
//         palette: {
//           popup: {
//             background: '#252e39'
//           },
//           button: {
//             background: '#00705f'
//           }
//         },
//         theme: 'edgeless',
//         position: 'bottom-right',
//         content: {
//           href: this.props.privacyUrl
//         }
//       })
//     })
//   }

//   render() {
//     return (
//       <Helmet>
//         <link
//           rel="stylesheet"
//           type="text/css"
//           href="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css"
//         />
//         <script src="//cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js" />
//       </Helmet>
//     )
//   }
// }

// const CookieConsent = () => (
//   <StaticQuery
//     query={graphql`
//       query {
//         site {
//           siteMetadata {
//             privacyPolicy
//           }
//         }
//       }
//     `}
//     render={data => (
//       <CookieConsentComponent
//         privacyUrl={data.site.siteMetadata.privacyPolicy}
//       />
//     )}
//   />
// )

// export default CookieConsent
