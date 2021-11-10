const config = require('./config');
const path = require('path');

exports.onCreateBabelConfig = ({ actions }) => {
  actions.setBabelPreset({
    name: 'babel-preset-gatsby',
    options: {
      reactRuntime: 'automatic',
    },
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const res = await graphql(
    `
      ${config.queryContext}
      query templates($live: [Boolean]!) {
        allGraphCmsTemplate(filter: { live: { in: $live } }) {
          nodes {
            ...PageInfo
          }
        }
      }
    `,
    { live: config.isProd ? [true] : [true, false] },
  );

  if (res.errors) {
    reporter.panicOnBuild('Error getting resume templates :c');
    return;
  }

  const templates = res.data.allGraphCmsTemplate.nodes;
  templates.forEach(({ layout, subdomain, ...resumeInfo }) => {
    const pageTemplate = path.resolve(`./src/layouts/${layout}/index.jsx`);
    actions.createPage({
      path: `/${subdomain ?? ''}`,
      component: pageTemplate,
      context: {
        resumeInfo,
      },
    });
  });
};
