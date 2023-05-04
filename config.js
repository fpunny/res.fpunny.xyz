require('dotenv').config();

module.exports = {
  isProd: process.env.NODE_ENV === 'production',
  queryContext: `
    fragment PageInfo on GRAPHCMS_Template {
      subdomain
      layout
      title
      metadatas {
        field
        booleanValue
        datetimeValue
        jsonValue
        listValue
        stringValue
        id
      }
      theme {
        hex
        rgba {
          r
          g
          b
        }
      }
      educations {
        title
        description
        start
        end
        location
        id
      }
      projects {
        title
        description
        start
        end
        organization
        references {
          label
          type
          url
          id
        }
        id
      }
      skills {
        title
        items
        id
      }
      socials {
        label
        type
        url
        id
      }
      works {
        title
        description
        start
        end
        organization
        id
      }
    }
  `,
};
