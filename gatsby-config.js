/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
const path = require('path')

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'blessings',
    description: 'Blessing for my friends as we enter 2021.'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: path.join(__dirname, '/src')
      }
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    'gatsby-plugin-emotion',
    'gatsby-plugin-use-query-params',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    }
  ]
}
