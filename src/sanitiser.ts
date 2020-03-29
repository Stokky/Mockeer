//const check = require('check-types');
import check from 'check-types';

//const type = require('type-detect');
import type from 'type-detect';

//const { globalConfig } = require('./config/defaultConfigs');
import { globalConfig } from './config/defaultConfigs';

//const { getJestTestPath, getJestTestFolder, isJest } = require('./helpers/jest-helper');
import { getJestTestPath, getJestTestFolder, isJest } from './helpers/jest-helper';

//const { getFixtureFile, getFixtureFolder } = require('./helpers/file-helper');
import { getFixtureFile, getFixtureFolder } from './helpers/file-helper';

import { ConfigurationObj } from './custom-types';

//// TO BE UPDATED?
//// -- what type should be set for the function itself, in this case?
//const logError = (name, wrongType, correctType) => {
const logError = (name: string, wrongType: string, correctType: string) => {
  throw new Error(`Invalid argument ${name} with type ${wrongType} been passed. Argument should be ${correctType}`);
};

//const checkProperty = (obj, property, checkType) => {
const checkProperty = (obj: ConfigurationObj, property: string, checkType: string): boolean => {
  if (!obj) {
    return false;
  }
  const hasProperty: boolean = Object.prototype.hasOwnProperty.call(obj, property);
  if (!check[checkType](obj[property]) && hasProperty) {
    logError(property, type(obj[property]), checkType);
    return false;
  }
  return hasProperty;
};

//const sanitiseConfiguration = (conf) => {
const sanitiseConfiguration = (conf: ConfigurationObj): ConfigurationObj => {
  //const configuration = {};
  let configuration: ConfigurationObj = <ConfigurationObj>{};

  if (checkProperty(conf, 'fixturesDir', 'string')) {
    configuration.fixturesDir = conf.fixturesDir;
  } else if (isJest()) {
    //const fixtureFolder = getJestTestFolder();
    const fixtureFolder: string = getJestTestFolder();
    configuration.fixturesDir = getFixtureFolder(fixtureFolder, '__fixtures__') || globalConfig.fixturesDir;
  } else {
    configuration.fixturesDir = globalConfig.fixturesDir;
  }

  if (checkProperty(conf, 'fixtureName', 'string')) {
    configuration.fixtureFilePath = getFixtureFile(configuration.fixturesDir, conf.fixtureName);
  } else if (isJest()) {
    configuration.fixtureFilePath = getJestTestPath(configuration.fixturesDir);
  } else {
    configuration.fixtureFilePath = getFixtureFile(configuration.fixturesDir, globalConfig.fixtureName);
  }

  configuration.replaceIfExists = checkProperty(conf, 'replaceIfExists', 'boolean')
    ? conf.replaceIfExists
    : globalConfig.replaceIfExists;

  configuration.svgTemplate = checkProperty(conf, 'svgTemplate', 'string')
    ? conf.svgTemplate
    : globalConfig.svgTemplate;

  configuration.replaceImage = checkProperty(conf, 'replaceImage', 'boolean')
    ? conf.replaceImage
    : globalConfig.replaceImage;

  configuration.allowImageRecourses = checkProperty(conf, 'allowImageRecourses', 'boolean')
    ? conf.allowImageRecourses
    : globalConfig.allowImageRecourses;

  //configuration.page = checkProperty(conf, 'page', 'object')
  configuration.page = checkProperty(conf, 'page', 'puppeteer.Page')
    ? conf.page
    : null;

  return configuration;
};

//module.exports = sanitiseConfiguration;
export { sanitiseConfiguration };
