import React from 'react'
import { css } from '@emotion/react'
import { rhythm } from '../utils/typography'
import Layout from '../components/layout'

export default function PageNotFound () {
    return (
        <Layout>
            <div  css={{
                display: 'grid',
                gridTemplateColumns: '100vw',
                gridTemplateRows: '75vh',
            }}>
                <div css={{
                    justifySelf: 'center',
                    alignSelf: 'center',
                }}>
                    <h1>Oops... Something went wrong. 🙃 </h1>
                    <p>Try again and let Jacob know if it still doesn't work.</p>
                </div>
            </div>
        </Layout>
    )
}
