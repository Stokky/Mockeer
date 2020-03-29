//const path = require('path');
import path from 'path';

//const MODES = require('./mockeer-modes');
import { MODES } from './mockeer-modes';

//const { getFixtureFile } = require('./file-helper');
import { getFixtureFile } from './file-helper';

//const isFunc = property => (typeof (property) === 'function');
const isFunc = (property: any): boolean => (typeof (property) === 'function');

const isJest = (): boolean => {
  try {
    return (expect && isFunc(expect.getState));
  } catch (error) {
    // Ignore the error
  }
  return false;
};

const getJestMode = (): string => {
  //// TO BE UPDATED?
  //// -- not sure how to specify the type for "testStats" in this situation
  const testStats = expect.getState() || null;
  return testStats && testStats.snapshotState._updateSnapshot === 'all' ? MODES.RECORD : MODES.PLAY;
};

//const getJestTestPath = fixturesDir => (isJest() ? getFixtureFile(fixturesDir, expect.getState().currentTestName) : null);
const getJestTestPath = (fixturesDir: string): string => (isJest() ? getFixtureFile(fixturesDir, expect.getState().currentTestName) : null);

const getJestTestFolder = (): string => (isJest() ? path.dirname(expect.getState().testPath) : null);

const isUpdate = (): boolean => (isJest() ? expect.getState().snapshotState._updateSnapshot === 'all' : false);

/*
module.exports = {
  getJestMode, isJest, getJestTestPath, isUpdate, getJestTestFolder,
};
*/
export { getJestMode, isJest, getJestTestPath, isUpdate, getJestTestFolder };
