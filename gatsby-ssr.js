const { default: Base } = require("./src/components/Base");

exports.onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([<div id='modal' key='modal' />]);
};
