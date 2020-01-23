module.exports = {
  siteMetadata: {
    title: 'James Willett',
    description: 'Blog of James Willett, Software Engineer & Online Instructor',
    siteUrl: 'https://www.james-willett.com/',
    privacyPolicy: 'https://www.iubenda.com/privacy-policy/43002998'
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-sitemap',
    `gatsby-plugin-playground`,
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    'gatsby-plugin-less',
    'gatsby-plugin-sharp',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`
      }
    },
    {
      resolve: `gatsby-plugin-linkedin-insight`,
      options: {
        partnerId: `1855105`,
        includeInDevelopment: false
      }
    },
    'gatsby-plugin-svgr',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'posts',
        path: `${__dirname}/content/posts/`
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images/`
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-autolink-headers',
          {
            resolve: 'gatsby-remark-custom-blocks',
            options: {
              blocks: {
                info: {
                  classes: 'info-block',
                  title: 'optional'
                },
                warn: {
                  classes: 'warning-block',
                  title: 'optional'
                }
              }
            }
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              withWebp: true
            }
          },
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: '±',
              showLineNumbers: false,
              noInlineHighlight: false,
              aliases: {}
            }
          },
          'gatsby-remark-external-links',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants'
        ]
      }
    },
    'gatsby-transformer-sharp',
    `gatsby-plugin-sass`,
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-77002717-1',
        head: false,
        anonymize: true,
        respectDNT: true
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'James Willett',
        short_name: 'James Willett',
        start_url: '/',
        background_color: '#f7f0eb',
        theme_color: '#00705f',
        display: 'minimal-ui',
        icon: 'src/images/logo.png'
      }
    },
    'gatsby-plugin-offline'
  ]
}
