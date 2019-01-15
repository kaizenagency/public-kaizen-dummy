const config = require('./config/siteConfig')

module.exports = {
  siteMetadata: {
    title: 'Kaizen',
    siteUrl: config.siteUrl,
    wpUrl: config.wpUrl
  },
  plugins: [
    'gatsby-plugin-no-sourcemaps',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-offline',
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify-cache',
    'gatsby-plugin-sharp',
    'gatsby-plugin-polyfill-io',
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout.js`),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: config.siteTitle,
        short_name: config.shortTitle,
        description: config.siteDescription,
        start_url: '/',
        background_color: config.backgroundColor,
        theme_color: config.themeColor,
        display: 'minimal-ui',
        icon: 'src/assets/favicon.png'
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
      }
    },
    {
      resolve: 'gatsby-plugin-nprogress',
      options: {
        color: config.progressColor
      }
    },
    {
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/assets/favicon.png',
        injectHTML: true,
        icons: {
          android: true,
          appleIcon: true,
          appleStartup: true,
          coast: false,
          favicons: true,
          firefox: true,
          twitter: true,
          yandex: false,
          windows: true
        }
      }
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: config.siteUrl
      }
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: config.baseWPUrl,
        protocol: 'https',
        hostingWPCOM: false,
        useACF: true
      }
    },
    {
      resolve: 'gatsby-plugin-mailchimp',
      options: {
        endpoint: config.mailchimpUrl
      }
    },
    {
      resolve: `gatsby-plugin-google-tagmanager`,
      options: {
        id: 'GTM-AAAAAA',
        includeInDevelopment: false
      }
    }
  ]
}
