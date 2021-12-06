const { getLocalIdentName } = require('css-loader-shorter-classnames');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-remark',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-image`,
    {
      resolve: 'gatsby-plugin-sass',
      options: isProd ? {
        cssLoaderOptions: {
          modules: {
            getLocalIdent: getLocalIdentName(),
            auto: true,
          },
        },
      } : {},
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS],
      },
    },
    {
      resolve: 'gatsby-source-graphcms',
      options: {
        stages: isProd ? ['PUBLISHED'] : ['DRAFT'],
        endpoint: process.env.GRAPHCMS_ENDPOINT,
        token: process.env.GRAPHCMS_TOKEN,
        fragmentsPath: '.cache/graphcms',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};
