const { getLocalIdentName } = require('css-loader-shorter-classnames');
require('dotenv').config();

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  plugins: [
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
    isProd && {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        trackingIds: [process.env.GOOGLE_ANALYTICS],
      },
    },
    {
      resolve: "gatsby-source-graphql",
      options: {
        typeName: "GRAPHCMS",
        fieldName: "graphCms",
        url: process.env.GRAPHCMS_ENDPOINT,
        headers: {
          Authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
        },
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
  ].filter(Boolean),
};
