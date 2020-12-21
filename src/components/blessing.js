import React from 'react'
import { css } from '@emotion/react'
import { useStaticQuery, Link, graphql } from 'gatsby'

import { rhythm } from '../utils/typography'

function Stanza (props) {
  return (
    <div>
      {props.stanza.map((line) =>
        <p key={line}> {line} </p>
      )}
    </div>
  )
}

export default function Blessing (props) {
  const blessing = props.blessing
  return (
      <div>
        {blessing.stanzas.map((stanza) =>
            <div key={stanza}>
                <Stanza stanza={stanza}/>
                <br></br>
            </div>
        )}
      </div>
  )
}
