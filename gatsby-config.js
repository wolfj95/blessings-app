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
    titleTemplate: '%s • hello from jacob',
    description: 'Blessing for my friends as we enter 2021.',
    url: 'https://blessings.jacobhwolf.com',
    image: 'src/images/favicon.png'
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: path.join(__dirname, '/src')
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `blessings`,
        short_name: `blessings`,
        start_url: `/`,
        // background_color: `#6b37bf`,
        // theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        // display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    'gatsby-transformer-remark',
    'gatsby-transformer-json',
    'gatsby-plugin-emotion',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-query-params',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography'
      }
    }
  ]
}
