"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const check = require('check-types');
var check_types_1 = __importDefault(require("check-types"));
//const type = require('type-detect');
var type_detect_1 = __importDefault(require("type-detect"));
//const { globalConfig } = require('./config/defaultConfigs');
var defaultConfigs_1 = require("./config/defaultConfigs");
//const { getJestTestPath, getJestTestFolder, isJest } = require('./helpers/jest-helper');
var jest_helper_1 = require("./helpers/jest-helper");
//const { getFixtureFile, getFixtureFolder } = require('./helpers/file-helper');
var file_helper_1 = require("./helpers/file-helper");
//const logError = (name, wrongType, correctType) => {
var logError = function (name, wrongType, correctType) {
    throw new Error("Invalid argument " + name + " with type " + wrongType + " been passed. Argument should be " + correctType);
};
//const checkProperty = (obj, property, checkType) => {
var checkProperty = function (obj, property, checkType) {
    if (!obj) {
        return false;
    }
    var hasProperty = Object.prototype.hasOwnProperty.call(obj, property);
    if (!check_types_1.default[checkType](obj[property]) && hasProperty) {
        logError(property, type_detect_1.default(obj[property]), checkType);
        return false;
    }
    return hasProperty;
};
//const sanitiseConfiguration = (conf) => {
var sanitiseConfiguration = function (conf) {
    //const configuration = {};
    var configuration;
    if (checkProperty(conf, 'fixturesDir', 'string')) {
        configuration.fixturesDir = conf.fixturesDir;
    }
    else if (jest_helper_1.isJest()) {
        //const fixtureFolder = getJestTestFolder();
        var fixtureFolder = jest_helper_1.getJestTestFolder();
        configuration.fixturesDir = file_helper_1.getFixtureFolder(fixtureFolder, '__fixtures__') || defaultConfigs_1.globalConfig.fixturesDir;
    }
    else {
        configuration.fixturesDir = defaultConfigs_1.globalConfig.fixturesDir;
    }
    if (checkProperty(conf, 'fixtureName', 'string')) {
        configuration.fixtureFilePath = file_helper_1.getFixtureFile(configuration.fixturesDir, conf.fixtureName);
    }
    else if (jest_helper_1.isJest()) {
        configuration.fixtureFilePath = jest_helper_1.getJestTestPath(configuration.fixturesDir);
    }
    else {
        configuration.fixtureFilePath = file_helper_1.getFixtureFile(configuration.fixturesDir, defaultConfigs_1.globalConfig.fixtureName);
    }
    configuration.replaceIfExists = checkProperty(conf, 'replaceIfExists', 'boolean')
        ? conf.replaceIfExists
        : defaultConfigs_1.globalConfig.replaceIfExists;
    configuration.svgTemplate = checkProperty(conf, 'svgTemplate', 'string')
        ? conf.svgTemplate
        : defaultConfigs_1.globalConfig.svgTemplate;
    configuration.replaceImage = checkProperty(conf, 'replaceImage', 'boolean')
        ? conf.replaceImage
        : defaultConfigs_1.globalConfig.replaceImage;
    configuration.allowImageRecourses = checkProperty(conf, 'allowImageRecourses', 'boolean')
        ? conf.allowImageRecourses
        : defaultConfigs_1.globalConfig.allowImageRecourses;
    //configuration.page = checkProperty(conf, 'page', 'object')
    configuration.page = checkProperty(conf, 'page', 'puppeteer.Page')
        ? conf.page
        : null;
    return configuration;
};
exports.sanitiseConfiguration = sanitiseConfiguration;
