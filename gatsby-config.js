// const queries = require('./src/utils/algolia');

/* Production build
*********************************************************************************/
// require('dotenv').config({
//   path: `.env.${process.env.GATSBY_ACTIVE_ENV}`,
// });


/* Local Build
*********************************************************************************/
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});


module.exports = {
  siteMetadata: {
    title: 'Postman Blog',
    description: 'The official Postman blog',
    author: 'Postman',
    siteUrl: 'https://blog.postman.com/',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-43979731-4",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: true,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 1000,
        // Defers execution of google analytics script after page load
        defer: true,
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'WPGraphQL',
        fieldName: 'wpgraphql',
        url: 'https://edit.blog.postman.com/graphql',
      },
    },
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-sitemap',
    // {
    //   resolve: `gatsby-plugin-csp`,
    //   options: {
    //     disableOnDev: true,
    //     reportOnly: false, // Changes header to Content-Security-Policy-Report-Only for csp testing purposes
    //     mergeScriptHashes: true, // you can disable scripts sha256 hashes
    //     mergeStyleHashes: true, // you can disable styles sha256 hashes
    //     mergeDefaultDirectives: true,
    //     directives: {
    //       "script-src": "'self' www.google-analytics.com",
    //       "script-src": "'self' http://www.google-analytics.com",
    //       "script-src": "'self' https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap",
    //       "script-src": "'self' https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css",
    //       "script-src": "'self' https://polyfill.io/v3/polyfill.min.js?features=default,Array.prototype.find,Array.prototype.includes",
    //       "style-src": "'self' 'unsafe-inline'",
    //       "img-src": "'self' data: www.google-analytics.com"
    //       // you can add your directives or override defaults
    //     }
    //   }
    // },
    {
      resolve: 'gatsby-plugin-robots-txt',
      options: {
        host: '',
        sitemap: '',
        resolveEnv: () => process.env.GATSBY_ACTIVE_ENV,
        env: {
          development: {
            policy: [{ userAgent: '*', disallow: ['/'] }],
          },
          production: {
            policy: [{ userAgent: '*', allow: '/' }],
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-preconnect',
      options: {
        domains: ['https://fonts.googleapis.com', 'https://stackpath.bootstrapcdn.com', 'https://fonts.gstatic.com'],
      },
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            "family": "Roboto",
            "variants": [
              "400",
              "500"
            ],
          },
          {
            family: `Open Sans`,
            variants: ["400", "700"]
          },
        ],
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    'gatsby-plugin-sass',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Postman Blog',
        short_name: 'Postman Blog',
        start_url: '/',
        background_color: '#FF6C37',
        theme_color: '#FF6C37',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png', // This path is relative to the root of the site.
      },
    },
    // this plugin has been deconstructed to be used in gatsby-node.js. Keep for future reference
    // {
    //   resolve: `gatsby-plugin-algolia`,
    //   options: {
    //     appId: process.env.GATSBY_ALGOLIA_APP_ID,
    //     apiKey: process.env.ALGOLIA_ADMIN_KEY,
    //     queries,
    //     chunkSize: 10000, // default: 1000
    //   }
    // },
    {
      resolve: 'gatsby-plugin-sri',
      options: {
        hash: 'sha512', // 'sha256', 'sha384' or 'sha512' ('sha512' = default)
        crossorigin: false // Optional
      }
    },
    {
      resolve: `gatsby-plugin-env-variables`,
      options: {
        whitelist: ['MUNCHKIN_ID', 'NEWSLETTER_FORM_ID']
      },
    },
    {
      resolve: `gatsby-plugin-gdpr-cookies`,
      options: {
        googleAnalytics: {
          trackingId: 'UA-43979731-4',
          anonymize: true
        },
        environments: ['production', 'development']
      }
    },
  ],
};
