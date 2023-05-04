const config = require('./config');
const QRCode = require('qrcode');
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
      query {
        graphCms {
          templates${config.isProd ? '(where: { live: true })' : ''} {
            ...PageInfo
          }
          metadatas${config.isProd ? '(where: { global: true })' : ''} {
            field
            listValue
            jsonValue
            stringValue
            numberValue
            booleanValue
            datetimeValue
          }
        }
      }
    `,
  );

  if (res.errors) {
    reporter.panicOnBuild('Error getting resume templates :c');
    return;
  }

  const templates = res.data.graphCms.templates;
  const { homepage } = res.data.graphCms.metadatas.reduce((acc, curr) => {
    acc[curr.field] =
      curr.stringValue ??
      curr.numberValue ??
      curr.booleanValue ??
      curr.datetimeValue ??
      curr.jsonValue ??
      curr.listValue;
    return acc;
  }, {});

  await Promise.all(
    templates.map(async ({ layout, ...resumeInfo }) => {
      const pageTemplate = path.resolve(`./src/layouts/${layout}/index.jsx`);
      // Too small :c maybe one day we can use this
      const qrcode = await QRCode.toString(homepage, {
        type: 'svg',
        margin: 0,
        scale: 2,
      });
      actions.createPage({
        path: `/${resumeInfo?.subdomain ?? ''}`,
        component: pageTemplate,
        context: {
          withButtons: true,
          resumeInfo: {
            ...resumeInfo,
            qrcode: qrcode
              .replace('#ffffff', 'rgb(var(--page))')
              .replace('#000000', 'rgb(var(--text))'),
          },
        },
      });
    }),
  );
};
