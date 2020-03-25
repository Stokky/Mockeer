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

// const MODES = Object.freeze({
//   RECORD: 'record',
//   PLAY: 'play',
// });
import { MODES } from './helpers/mockeer-modes';

import { configurationObj } from './custom-types';

//// TO BE UPDATED?
//// -- not sure what type "browser" should have
//// -- it's normally initialized with "browser = await puppeteer.launch();"
const recorder = async (browser: any, configuration: configurationObj) => {
  if (!browser) throw new Error('`browser` is a required parameter');
  const config = sanitiseConfiguration(configuration);
  if (!fs.existsSync(config.fixturesDir)) fs.mkdirSync(config.fixturesDir);
  const recorderMode = process.env.CI === 'true' ? MODES.PLAY : MODES.RECORD;
  if (isUpdate() || recorderMode === MODES.RECORD) {
    const fileExists = fs.existsSync(config.fixtureFilePath);

    if (config.replaceIfExists || !fileExists) {
      if (fileExists) fs.unlinkSync(config.fixtureFilePath);
      return handleRecordMode({ browser, config });
    }
  }

  return handlePlayMode({ browser, config });
};

//module.exports = recorder;
export { recorder };
