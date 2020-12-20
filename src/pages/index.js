import React from 'react'
import { Link, graphql } from 'gatsby'
import { css } from '@emotion/react'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'

import { rhythm } from '../utils/typography'
import Layout from '../components/layout'
import Button from '../components/button'

export default function Home ({ data }) {
  const [name, setName] = useQueryParam('name', StringParam)
  console.log(name)
  return (
    <Layout>
      <div>
        <h1
          css={css`
            display: inline-block;
          `}
        >
          A blessing for 2021
        </h1>
        <p> Hello, Friends. It's been a long year. </p>
        <Button buttonText="your blessing" />
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`
