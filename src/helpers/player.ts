import puppeteer from 'puppeteer';

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

import { ConfigurationObj, ScopeObj } from '../custom-types';

//const getBrowserPages = async (browser) => browser.pages();
const getBrowserPages = async (browser: puppeteer.Browser) => browser.pages();

//const getScope = (url, fixtures) => {
const getScope = (url: string, fixtures: Array<ScopeObj>) => {
  //const elementPos = fixtures.map(x => x.url).indexOf(url);
  const elementPos: number = fixtures.map(x => x.url).indexOf(url);
  if (elementPos >= 0) {
    //const objectFound = fixtures[elementPos];
    const objectFound: ScopeObj = fixtures[elementPos];
    if (objectFound) {
      //const { body } = objectFound;
      const { body }: { body: string } = objectFound;
      if (isImage(objectFound.fullPath) && path.extname(objectFound.url) !== '.svg') {
        objectFound.headers['content-type'] = svgContentTypeHeader;
        //objectFound.headers['content-length'] = svgContentLength;
        objectFound.headers['content-length'] = svgContentLength.toString();
      }
      // the "getScope" function should return an object of type "puppeteer.RespondOptions"
      // return {
      //   status: objectFound.status || 200,
      //   headers: objectFound.headers,
      //   //body,
      //   body: body,
      // };
      const response: puppeteer.RespondOptions = {
        status: objectFound.status || 200,
        headers: objectFound.headers,
        body
        // not returning "contentType" (optional property from "puppeteer.RespondOptions")
      };
      return response;
    }
  }
  return null;
};

//const handlePlayMode = async ({ browser, config }) => {
const handlePlayMode = async ({ browser, config }: { browser: puppeteer.Browser, config: ConfigurationObj } ) => {
  //const fixtures = JSON.parse(fs.readFileSync(config.fixtureFilePath));
  const fixtures: Array<ScopeObj> = JSON.parse(fs.readFileSync(config.fixtureFilePath).toString());
  //const setRequestInterceptor = async (p) => {
  const setRequestInterceptor = async (p: puppeteer.Page) => {
    await p.setRequestInterception(true);
    //p.on('request', (request) => {
    p.on('request', (request: puppeteer.Request) => {
      if (request.resourceType() === 'image' && config.allowImageRecourses) {
        return request.continue();
      }
      //let response = getScope(request.url(), fixtures);
      let response: puppeteer.RespondOptions = getScope(request.url(), fixtures);
      if (!response) {
        //const parsedUrl = parse(request.url(), true);
        const parsedUrl: parse = parse(request.url(), true);
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
    //const pagePromiseArray = [];
    const pagePromiseArray: Array<Promise<void>> = [];
    //const pages = await getBrowserPages(browser);
    const pages: Array<puppeteer.Page> = await getBrowserPages(browser);
    pages.forEach(p => pagePromiseArray.push(setRequestInterceptor(p)));
    await Promise.all(pagePromiseArray);
  }
};

//module.exports = handlePlayMode;
export { handlePlayMode };
