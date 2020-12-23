import React from 'react'
import { graphql } from 'gatsby'
import { css } from '@emotion/react'
import { Waypoint } from 'react-waypoint';

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

export default class BlessingPage extends React.Component {
  constructor (props) {
    super(props)
    this.state =
                {
                  pageData: props.data['pagesJson'],
                  blessing: props.data['blessingsJson']
                }
    this.drawingRef = React.createRef()
  }

  render () {
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
            gridTemplateRows: 'repeat(' + (this.state.blessing.stanzas.length) + ', 100vh) 50vh'
          }}
        >
          <div
            css={[centered, container]}
          >
            <Waypoint onEnter={({ event }) => {
              this.drawingRef.current.changeDrawing({drawing: 'scribble'})
            }}
            />
            <h1> {this.state.blessing.title} </h1>
          </div>
          <div
            css={[container, centered, stick]}
          >
            <Drawing ref={this.drawingRef} />
          </div>
          {this.state.blessing.stanzas.map((stanza, index) =>
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
              <Waypoint onEnter={({ event }) => {
                this.drawingRef.current.changeDrawing({drawing: index})
              }}
              />
              <Stanza stanza={stanza}/>
            </div>
          )}
        </div>
      </Layout>
    )
  }
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
