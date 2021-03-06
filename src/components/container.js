import { css } from '@emotion/react'

export const container = css({
  maxWidth: 500,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 16,
  paddingRight: 16,
  paddingTop: 32,
  paddingBottom: 32,
  '@media screen and (min-width: 40em)': {
    width: 500,
  }
})