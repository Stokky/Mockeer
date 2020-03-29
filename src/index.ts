import puppeteer from 'puppeteer';

//const fs = require('fs');
import fs from 'fs';

//const handlePlayMode = require('./helpers/player');
import { handlePlayMode } from './helpers/player';

//const handleRecordMode = require('./helpers/recorder');
import { handleRecordMode } from './helpers/recorder';

//const sanitiseConfiguration = require('./sanitiser');
import { sanitiseConfiguration } from './sanitiser';

//const { isUpdate } = require('./helpers/jest-helper');
import { isUpdate } from './helpers/jest-helper';

/*
const MODES = Object.freeze({
  RECORD: 'record',
  PLAY: 'play',
});
*/
import { MODES } from './helpers/mockeer-modes';

import { ConfigurationObj } from './custom-types';

//const recorder = async (browser, configuration) => {
const recorder = async (browser: puppeteer.Browser, configuration: ConfigurationObj): Promise<void> => {
  if (!browser) {
    throw new Error('`browser` is a required parameter');
  }
  //const config = sanitiseConfiguration(configuration);
  const config: ConfigurationObj = sanitiseConfiguration(configuration);
  if (!fs.existsSync(config.fixturesDir)) {
    fs.mkdirSync(config.fixturesDir);
  }
  //const recorderMode = process.env.CI === 'true' ? MODES.PLAY : MODES.RECORD;
  const recorderMode: string = process.env.CI === 'true' ? MODES.PLAY : MODES.RECORD;
  if (isUpdate() || recorderMode === MODES.RECORD) {
    //const fileExists = fs.existsSync(config.fixtureFilePath);
    const fileExists: boolean = fs.existsSync(config.fixtureFilePath);
    if (config.replaceIfExists || !fileExists) {
      if (fileExists) {
        fs.unlinkSync(config.fixtureFilePath);
      }
      return handleRecordMode({ browser, config });
    }
  }
  return handlePlayMode({ browser, config });
};

//module.exports = recorder;
export { recorder };
