const path = require('path')

const config = require('../config')
const utils = require('../src/utils/utils')

module.exports = async function createPages({ graphql, actions }) {
  const { data } = await graphql(`
    {
      courses: allCourseDetailsJson {
        totalCount
        edges {
          node {
            slug
          }
        }
      }
      site {
        siteMetadata {
          siteUrl
        }
      }
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            frontmatter {
              slug
              title
              category
              next
              prev
              tags
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)

  /* Course pages */
  data.courses.edges.forEach(({ node }) => {
    actions.createPage({
      path: `courses/${node.slug}`,
      component: path.resolve(
        __dirname,
        '../src/templates/course/course-template.js'
      ),
      context: {
        slug: node.slug
      }
    })
  })

  /* Tag pages */
  const regexForIndex = /index\.md$/
  const defaultPosts = data.allMarkdownRemark.edges.filter(
    ({ node: { fileAbsolutePath } }) => fileAbsolutePath.match(regexForIndex)
  )

  const allTags = []
  defaultPosts.forEach(({ node }) => {
    node.frontmatter.tags.forEach(tag => {
      if (allTags.indexOf(tag) === -1) allTags.push(tag)
    })
  })

  allTags.forEach(tag => {
    actions.createPage({
      path: utils.resolvePageUrl(config.pages.tag, tag),
      component: path.resolve('src/templates/tag.js'),
      context: {
        tag: tag
      }
    })
  })

  const titles = data.allMarkdownRemark.edges.reduce((prev, { node }) => {
    prev[node.frontmatter.slug] = node.frontmatter.title
    return prev
  }, {})

  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { slug, next, prev, category } = node.frontmatter

    // Calculate full canonical URL for that page:
    const canonical = `${data.site.siteMetadata.siteUrl}/${slug}`

    let nextPost
    if (next) {
      if (!titles[next]) {
        throw new Error(
          `Could not find next article with slug ${next} for article ${slug}.`
        )
      }
      nextPost = {
        slug: next,
        canonical: `${data.site.siteMetadata.siteUrl}/${next}`,
        title: titles[next]
      }
    }

    let prevPost
    if (prev) {
      if (!titles[prev]) {
        throw new Error(
          `Could not find prev article with slug ${prev} for article ${slug}.`
        )
      }
      prevPost = {
        slug: prev,
        canonical: `${data.site.siteMetadata.siteUrl}/${prev}`,
        title: titles[prev]
      }
    }

    actions.createPage({
      path: slug,
      component: path.resolve(
        __dirname,
        '../src/templates/post/post-template.js'
      ),
      context: {
        slug,
        canonical,
        category,
        next: nextPost,
        prev: prevPost
      }
    })
  })
}
