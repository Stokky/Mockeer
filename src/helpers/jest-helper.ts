//const path = require('path');
import path from 'path';

//const MODES = require('./mockeer-modes');
import { MODES } from './mockeer-modes';

//const { getFixtureFile } = require('./file-helper');
import { getFixtureFile } from './file-helper';

//const isFunc = property => (typeof (property) === 'function');
const isFunc = (property: any) => (typeof (property) === 'function');

const isJest = () => {
  try {
    return (expect && isFunc(expect.getState));
  } catch (error) {
    // Ignore the error
  }
  return false;
};

const getJestMode = () => {
  //// TO BE UPDATED?
  //// -- not sure how to specify the type for "testStats" in this situation
  const testStats = expect.getState() || null;
  return testStats && testStats.snapshotState._updateSnapshot === 'all' ? MODES.RECORD : MODES.PLAY;
};

//const getJestTestPath = fixturesDir => (isJest() ? getFixtureFile(fixturesDir, expect.getState().currentTestName) : null);
const getJestTestPath = (fixturesDir: string) => (isJest() ? getFixtureFile(fixturesDir, expect.getState().currentTestName) : null);

const getJestTestFolder = () => (isJest() ? path.dirname(expect.getState().testPath) : null);

const isUpdate = () => (isJest() ? expect.getState().snapshotState._updateSnapshot === 'all' : false);

// module.exports = {
//   getJestMode, isJest, getJestTestPath, isUpdate, getJestTestFolder,
// };
export { getJestMode, isJest, getJestTestPath, isUpdate, getJestTestFolder };
