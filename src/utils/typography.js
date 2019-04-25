import Typography from "typography"
import stAnnesTheme from "typography-theme-st-annes"
import stowLakeTheme from "typography-theme-stow-lake"

// stAnnesTheme.overrideThemeStyles = ({ rhythm }, options, style) => ({
//   "h1,h2,h3,h4,h5,h6": {
//     marginTop: rhythm(1),
//     marginBottom: rhythm(0.6),
//   },
//   p: {
//     marginBottom: rhythm(0.6),
//   },
// })

stowLakeTheme.overrideThemeStyles = ({ rhythm }, options, style) => ({
  "h1,h2,h3,h4,h5,h6": {
    marginTop: rhythm(1),
    marginBottom: rhythm(0.6),
  },
  p: {
    marginBottom: rhythm(0.6),
  },
})

const typography = new Typography(stowLakeTheme)

export default typography
