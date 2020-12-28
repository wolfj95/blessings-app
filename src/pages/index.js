import React from 'react'
import { Link, navigate } from 'gatsby'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import qs from 'qs'

import Layout from '../components/layout'
import { container, centered } from '../components/container'

export default class Home extends React.Component {
  state = {
    urlName: '',
    nameInput: ''
  }
  componentDidMount () {
  }

  handleChange = event => {
    this.setState({ nameInput: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    navigate('/' + this.state.nameInput.toLowerCase() + '/')
  }

  render () {
    const urlParams = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    if (urlParams['name']){
      this.state.urlName = urlParams['name']
    }
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
              {this.state.urlName
                ? <Link to={'/' + this.state.urlName + '/'}>go &rarr;</Link>
                : <form onSubmit={this.handleSubmit}>
                    <input type="text" name='name' placeholder='Who are you?' value={this.state.nameInput} onChange={this.handleChange}/>
                    <input type='submit' value='go &rarr;' disabled={this.state.nameInput===''} 
                        css={{
                          background: 'none',
                          border: 'none',
                          color: '#9f392b',
                          textDecoration: 'underline',
                          cursor: 'pointer'
                        }}
                    />
                  </form>
              }
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}
