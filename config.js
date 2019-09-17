module.exports = {
  siteUrl: 'https://www.james-willett.com',
  siteTitle: 'James Willett',
  siteDescription: 'Blog of James Willett',
  author: 'JWillett',
  postsForArchivePage: 3,
  defaultLanguage: 'en',
  pages: {
    home: '/',
    blog: 'blog',
    tag: 'tag',
    courses: 'courses'
  },
  tags: {
    all: {
      name: 'All Posts',
      description: 'All posts on the website.'
    },
    articles: {
      name: 'Articles',
      description:
        'General articles written by me on Software testing & development'
    },
    gatling: {
      name: 'Gatling',
      description:
        'Gatling is an open-source load testing tool for web applications, designed for DevOps and Continuous Integration'
    },
    scala: {
      name: 'Scala - All Posts',
      description:
        'Scala is a general-purpose programming language providing support for functional programming and a strong static type system.'
    },
    scala_basics_series: {
      name: 'Scala: The Absolute Basics - Post Series',
      description:
        'Scala is a general-purpose programming language providing support for functional programming and a strong static type system.'
    },
    scala_oo_series: {
      name: 'Scala: Object Oriented Programming - Post Series',
      description: 'A series of posts on Object Oriented Programming in Scala'
    },
    scala_fp_series: {
      name: 'Scala: Functional Programming - Post Series',
      description: 'A series of posts on Functional Programming in Scala'
    },
    restassured: {
      name: 'REST Assured',
      description:
        'Testing and validation of REST services in Java is harder than in dynamic languages such as Ruby and Groovy. REST Assured brings the simplicity of using these languages into the Java domain.'
    }
  }
}
