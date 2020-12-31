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
  top: 'calc(25vh - 30vw + 16px)'
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
    console.log(props.data['allDrawingsJson']['nodes'])
    console.log(props.data['pagesJson'].drawings)
    this.state =
      {
        pageData: props.data['pagesJson'],
        blessing: props.data['blessingsJson'],
        drawings: props.data['allDrawingsJson']['nodes'].sort((a, b) => {
          // sort drawing data so it matches order from page JSON
          // will break if elements aren't unique i.e. drawing is repeated
          const indexA = props.data['pagesJson'].drawings.indexOf(a['name'])
          const indexB = props.data['pagesJson'].drawings.indexOf(b['name'])
          return indexA - indexB
        })
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
            gridTemplateColumns: 'repeat(1, 100%)',
            '@media screen and (min-width: 40em)': {
              gridTemplateColumns: '60% 30%'
            },
            gridTemplateRows: 'repeat(' + (this.state.blessing.stanzas.length + 1) + ', calc(100vh - 2.16rem))'
          }}
        >
          <div
            css={[
              centered,
              container,
              {
                gridRow: 1,
                gridColumn: 1
              }
            ]}
          >
            <Waypoint onEnter={({ event }) => {
              this.drawingRef.current.changeDrawing({drawing: -1})
            }}
            />
            <h1 css={{ marginBottom: 0 }} > {this.state.blessing.title} </h1>
          </div>
          <div
            css={[
              container,
              stick,
              {
                gridRow: 1,
                gridColumn: 1,
                justifySelf: 'center',
                '@media screen and (min-width: 40em)': {
                  gridColumn: 2,
                  alignSelf: 'center',
                  top: 'calc(2.16rem +  ((100vh - 2.16rem) / 2) - min(15vw + 32px, 250px))'
                }
              }
            ]}
          >
            <Drawing ref={this.drawingRef} drawingsOrder={this.state.pageData.drawings} drawingData={this.state.drawings} />
          </div>
          {this.state.blessing.stanzas.map((stanza, index) =>
            <div
              css={[
                container,
                centered,
                {
                  gridRow: index + 2
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
    query($slug: String!, $blessing: String!, $drawings: [String]!) {
      pagesJson(fields: { slug: { eq: $slug } }) {
        name
        blessing
        drawings
      }
      blessingsJson(title: {eq: $blessing}) {
        stanzas
        title
      }
      allDrawingsJson(filter: {name: {in: $drawings}}) {
        nodes {
          name
          path
        }
      }
    }
`
