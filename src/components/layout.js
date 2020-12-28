import React from 'react'
import { css } from '@emotion/react'
import { useStaticQuery, Link, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'

import SEO from '../components/seo'

export default function Layout ({ children }) {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div>
      <SEO />
      <div
        css={css`
          margin: 0 auto;
          padding: ${rhythm(2)};
          padding-top: ${rhythm(1.5)};
        `}
      >
        <Link to={'/'}>
          <h3
            css={css`
              margin-bottom: ${rhythm(2)};
              margin-left: auto;
              padding: 16px;
              display: inline-block;
              font-style: normal;
              position: fixed;
              background-color: black;
              color: #fffaf0;
            `}
          >
        {data.site.siteMetadata.title}
          </h3>
        </Link>
        {children}
      </div>
    </div>
  )
}
