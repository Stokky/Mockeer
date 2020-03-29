"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const path = require('path');
var path_1 = __importDefault(require("path"));
//const MODES = require('./mockeer-modes');
var mockeer_modes_1 = require("./mockeer-modes");
//const { getFixtureFile } = require('./file-helper');
var file_helper_1 = require("./file-helper");
//const isFunc = property => (typeof (property) === 'function');
var isFunc = function (property) { return (typeof (property) === 'function'); };
var isJest = function () {
    try {
        return (expect && isFunc(expect.getState));
    }
    catch (error) {
        // Ignore the error
    }
    return false;
};
exports.isJest = isJest;
var getJestMode = function () {
    //// TO BE UPDATED?
    //// -- not sure how to specify the type for "testStats" in this situation
    var testStats = expect.getState() || null;
    return testStats && testStats.snapshotState._updateSnapshot === 'all' ? mockeer_modes_1.MODES.RECORD : mockeer_modes_1.MODES.PLAY;
};
exports.getJestMode = getJestMode;
//const getJestTestPath = fixturesDir => (isJest() ? getFixtureFile(fixturesDir, expect.getState().currentTestName) : null);
var getJestTestPath = function (fixturesDir) { return (isJest() ? file_helper_1.getFixtureFile(fixturesDir, expect.getState().currentTestName) : null); };
exports.getJestTestPath = getJestTestPath;
var getJestTestFolder = function () { return (isJest() ? path_1.default.dirname(expect.getState().testPath) : null); };
exports.getJestTestFolder = getJestTestFolder;
var isUpdate = function () { return (isJest() ? expect.getState().snapshotState._updateSnapshot === 'all' : false); };
exports.isUpdate = isUpdate;
