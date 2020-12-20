/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */
 var path = require('path');

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Pandas Eating Lots',
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
    'gatsby-plugin-use-query-params',
    'gatsby-transformer-remark',
    'gatsby-plugin-emotion',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    }
  ]
}
