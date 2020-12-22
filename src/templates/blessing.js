import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Blessing from '../components/blessing'
import Drawing from '../components/drawing'

export default function BlessingPage ({ data }) {
  const pageData = data['pagesJson']
  const blessing = data['blessingsJson']
  return (
    <Layout>
      <div>
        <h1>{pageData.name}</h1>
        <Blessing blessing={blessing} />
        <Drawing />
      </div>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String!, $blessing: String!) {
    pagesJson(fields: { slug: { eq: $slug } }) {
      name
      blessing
    }
    blessingsJson(title: {eq: $blessing}) {
      stanzas
      title
    }
  }
`
