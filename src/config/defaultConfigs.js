"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const { svgTemplate } = require('../utils/svg-template');
var svg_template_1 = require("../utils/svg-template");
//const globalConfig = {
var globalConfig = {
    fixturesDir: '__mockeer_fixture__',
    fixtureName: 'chrome-http-mocks',
    svgTemplate: svg_template_1.svgTemplate,
    replaceImage: false,
    allowImageRecourses: false,
    replaceIfExists: true,
};
exports.globalConfig = globalConfig;
