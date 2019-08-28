import React from 'react'
import Helmet from 'react-helmet'

import css from './disqus-comments.module.less'

// @ts-ignore
import { DiscussionEmbed } from 'disqus-react'

function DisqusComments({ url }) {
  return (
    <div className={css.discussion}>
      <Helmet>
        <link rel="preconnect" href="https://james-willett.disqus.com" />
        <link rel="preconnect" href="https://c.disquscdn.com" />
        <link rel="preconnect" href="https://referrer.disqus.com" />
      </Helmet>
      <DiscussionEmbed shortname="james-willett" config={{ url }} />
    </div>
  )
}

export default DisqusComments
