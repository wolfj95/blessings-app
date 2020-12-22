import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'
import { useQueryParam, NumberParam, StringParam } from 'use-query-params'
import { rhythm } from '../utils/typography'

import Layout from '../components/layout'
import { container, centered } from '../components/container'

export default class Home extends React.Component {
  handleChange (event) {
    this.setState({ value: event.target.value })
  }

  handleSubmit (event) {
    event.preventDefault()
  }

  render () {
    const [name, setName] = useQueryParam('name', StringParam)
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
            gridTemplateRows: '85vh'
          }}
        >
          <div
            css={[centered, container]}
          >
            <h1>A blessing for 2021</h1>
            <p> Hello, Friends. It&apos;s been a long year. </p>
            <div>
              {name
                ? <Link to={'/' + name + '/'}>your blessing &rarr;</Link>
                : <form onSubmit={this.handleSubmit}>
                    <input type="text" name='name' value={this.state.value} onChange={this.handleChange}/>
                    <input type="submit" value="Submit" />
                  </form>
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
