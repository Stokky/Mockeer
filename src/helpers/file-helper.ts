//const filenamify = require('filenamify');
import filenamify from 'filenamify';

//const path = require('path');
import path from 'path';

//const getFixtureFile = (filePath, fileName) => path.join(filePath, `${filenamify(fileName, { replacement: '' })}.json`);
const getFixtureFile = (filePath: string, fileName: string): string => path.join(filePath, `${filenamify(fileName, { replacement: '' })}.json`);

//const getFixtureFolder = (fixturesPath, fixturesFolder) => path.join(fixturesPath, fixturesFolder);
const getFixtureFolder = (fixturesPath: string, fixturesFolder: string): string => path.join(fixturesPath, fixturesFolder);

//module.exports = { getFixtureFile, getFixtureFolder };
export { getFixtureFile, getFixtureFolder };
