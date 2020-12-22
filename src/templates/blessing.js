import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'

import Layout from '../components/layout'
import { container, centered } from '../components/container'
import Drawing from '../components/drawing'

const stick = css({
  height: '500px',
  position: 'sticky',
  top: 'calc(50vh - 250px + 32px + 10px)'
})

function Stanza (props) {
  return (
    <div>
      {props.stanza.map((line) =>
        <p key={line}> {line} </p>
      )}
    </div>
  )
}

export default function BlessingPage ({ data }) {
  const pageData = data['pagesJson']
  const blessing = data['blessingsJson']
  return (
    <Layout>
      <div
        css={{
          display: 'grid',
          gridGap: 16,
          gridTemplateColumns: 'repeat(1, 80%)',
          '@media screen and (min-width: 40em)': {
            gridTemplateColumns: '60% 30%'
          },
          gridTemplateRows: 'repeat(' + (blessing.stanzas.length) + ', 100vh) 50vh'
        }}
      >
        <div
          css={[centered, container]}
        >
          <h1> {blessing.title} </h1>
        </div>
        <div
          css={[container, centered, stick]}
        >
          <Drawing />
        </div>
        {blessing.stanzas.map((stanza, index) =>
          <div
            css={[
              container,
              {
                gridRowStart: index + 2,
                gridRowEnd: index + 2
              }
            ]}
            key={stanza}
          >
            <Stanza stanza={stanza}/>
          </div>
        )}
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
