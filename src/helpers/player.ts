//const fs = require('fs');
import fs from 'fs';

//const isImage = require('is-image');
import isImage from 'is-image';

//const path = require('path');
import path from 'path';

//const parse = require('url-parse');
import parse from 'url-parse';

//const { svgContentTypeHeader, svgContentLength } = require('../utils/svg-template');
import { svgContentTypeHeader, svgContentLength } from '../utils/svg-template';

//const { removeLastDirectoryPartOfUrl } = require('./url-helper');
import { removeLastDirectoryPartOfUrl } from './url-helper';

import { scopeObj } from '../custom-types';

//// TO BE UPDATED?
//// -- not sure what type "browser" should have
//// -- see related notes from "index.ts"
const getBrowserPages = async (browser: any) => browser.pages();

//const getScope = (url, fixtures) => {
const getScope = (url: string, fixtures: Array<scopeObj>) => {
  const elementPos = fixtures.map(x => x.url).indexOf(url);
  if (elementPos >= 0) {
    const objectFound = fixtures[elementPos];
    if (objectFound) {
      const { body } = objectFound;
      if (isImage(objectFound.fullPath) && path.extname(objectFound.url) !== '.svg') {
        objectFound.headers['content-type'] = svgContentTypeHeader;
        objectFound.headers['content-length'] = svgContentLength;
      }
      return {
        status: objectFound.status || 200,
        headers: objectFound.headers,
        body,
      };
    }
  }
  return null;
};

const handlePlayMode = async ({ browser, config }) => {
  //const fixtures = JSON.parse(fs.readFileSync(config.fixtureFilePath));
  const fixtures = JSON.parse(fs.readFileSync(config.fixtureFilePath).toString());
  const setRequestInterceptor = async (p) => {
    await p.setRequestInterception(true);
    p.on('request', (request) => {
      if (request.resourceType() === 'image' && config.allowImageRecourses) {
        return request.continue();
      }
      let response = getScope(request.url(), fixtures);
      if (!response) {
        const parsedUrl = parse(request.url(), true);
        response = getScope(`${parsedUrl.origin}${parsedUrl.pathname}`, fixtures);
        if (!response) {
          response = getScope(removeLastDirectoryPartOfUrl(`${parsedUrl.origin}${parsedUrl.pathname}`), fixtures);
        }
      }
      return response
        ? request.respond(response)
        : request.abort();
    });
  };
  if (config.page) {
    await setRequestInterceptor(config.page);
  } else {
    const pagePromiseArray = [];
    const pages = await getBrowserPages(browser);
    pages.forEach(p => pagePromiseArray.push(setRequestInterceptor(p)));
    await Promise.all(pagePromiseArray);
  }
};

//module.exports = handlePlayMode;
export { handlePlayMode };
