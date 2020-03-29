"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const filenamify = require('filenamify');
var filenamify_1 = __importDefault(require("filenamify"));
//const path = require('path');
var path_1 = __importDefault(require("path"));
//const getFixtureFile = (filePath, fileName) => path.join(filePath, `${filenamify(fileName, { replacement: '' })}.json`);
var getFixtureFile = function (filePath, fileName) { return path_1.default.join(filePath, filenamify_1.default(fileName, { replacement: '' }) + ".json"); };
exports.getFixtureFile = getFixtureFile;
//const getFixtureFolder = (fixturesPath, fixturesFolder) => path.join(fixturesPath, fixturesFolder);
var getFixtureFolder = function (fixturesPath, fixturesFolder) { return path_1.default.join(fixturesPath, fixturesFolder); };
exports.getFixtureFolder = getFixtureFolder;
