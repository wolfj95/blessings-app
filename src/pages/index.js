import React from 'react'
import { Link, navigate } from 'gatsby'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import qs from 'qs'

import Layout from '../components/layout'

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
            marginTop: 32,
            gridGap: 16,
            gridTemplateColumns: 'repeat(1, 100%)',
            '@media screen and (min-width: 40em)': {
              gridTemplateColumns: '60% 30%',
              marginLeft: 150
            },
          }}
        >
          <div
            css={[
              {
                justifySelf: 'center',
                alignSelf: 'center',
                maxWidth: 700,
                marginLeft: 'auto',
                marginRight: 'auto',
                paddingLeft: 16,
                paddingRight: 16,
                paddingTop: 32,
                paddingBottom: 32
              }
            ]}
          >
            <h1>A blessing for 2021</h1>
            <p> Hello, Friends. </p>
            <p>
              I'm writing to you as I watch the sun set on the first day of 2021. Reflecting on
              the year that just passed, there were very few things to be certain of. However, one thing
              I can be certain of is that during an often dark and painful year, you all brought countless moments
              of joy, laughter, and love into my life. As I consider my hopes for 2021, it is clear that one of
              the strongest is that the people who bring so much light into my life are blessed with
              success, laughter, and love in their own lives.
            </p>
            <p>
              So, I built this website over my break from school to send a blessing for your 2021. Each blessing was
              written by the poet and philospher John O'Donohue and comes from his collection of blessings, <i>To Bless the Space Between Us</i>. Spiritually, blessings are a source of complication for me. 
              I am uncertain from what entity I am asking for blessings (or if there is an entity at all). However,
              reflecting on each blessing as I chose them for you gave me a lot of joy, and I hope that, if nothing
              else, this blessing offers a moment of reflection and intentionality for you (regardless of who's listening).
            </p>
            <p>
              I hope that this year comes with the opportunity to spend time together irl, but, even if not, I am grateful
              to have you in my life.
            </p>
            <p>
              with lots of love,
              <br />
              Jacob ❤️
            </p>
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
