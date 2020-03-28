//const { svgTemplate } = require('../utils/svg-template');
import { svgTemplate } from '../utils/svg-template';

import { ConfigurationObj } from '../custom-types';

//const globalConfig = {
const globalConfig: ConfigurationObj = {
  fixturesDir: '__mockeer_fixture__',
  fixtureName: 'chrome-http-mocks',
  svgTemplate,
  replaceImage: false,
  allowImageRecourses: false,
  replaceIfExists: true,
};

//module.exports = { globalConfig };
export { globalConfig };
