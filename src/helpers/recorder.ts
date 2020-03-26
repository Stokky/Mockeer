import puppeteer from 'puppeteer';

//const fs = require('fs');
import fs from 'fs';

//const parse = require('url-parse');
import parse from 'url-parse';

//const isImage = require('is-image');
import isImage from 'is-image';

//const path = require('path');
import path from 'path';

//const { svgContentTypeHeader, svgContentLength } = require('../utils/svg-template');
import { svgContentTypeHeader, svgContentLength } from '../utils/svg-template';

//const { removeLastDirectoryPartOfUrl } = require('./url-helper');
import { removeLastDirectoryPartOfUrl } from './url-helper';

import { ConfigurationObj, ScopeObj } from '../custom-types';

//const removeDuplicates = (outputs) => {
const removeDuplicates = (outputs: Array<ScopeObj>) => {
  // the keys of "obj" are dynamically generated based on the value of "url" from each "outputs" element
  //const obj = {};
  const obj: object = {};
  // return Object.keys(outputs.reduce((prev, next) => {
  //   if (!obj[next.url]) obj[next.url] = next;
  //   return obj;
  // }, obj)).map(i => obj[i]);
  const outputsNoDuplicates: Array<ScopeObj> = Object.keys(outputs.reduce((prev, next) => {
    if (!obj[next.url]) obj[next.url] = next;
    return obj;
  }, obj)).map(i => obj[i]);
  return outputsNoDuplicates;
};

//const getBrowserPages = async (browser) => browser.pages();
const getBrowserPages = async (browser: puppeteer.Browser) => browser.pages();

//const handleRecordMode = async ({ browser, config }) => {
const handleRecordMode = async ({ browser, config }: { browser: puppeteer.Browser, config: ConfigurationObj } ) => {
  //const scopes = [];
  const scopes: Array<ScopeObj> = [];
  //const setResponseInterceptor = p => p.on('response', async (response) => {
  const setResponseInterceptor = (p: puppeteer.Page) => p.on('response', async (response: puppeteer.Response) => {
    if (response.ok()) {
      //const scope = {};
      let scope: ScopeObj;
      const parsedUrl: parse = parse(response.url(), true);
      scope.url = response.url();
      scope.fullPath = `${parsedUrl.origin}${parsedUrl.pathname}`;
      scope.minimalPath = removeLastDirectoryPartOfUrl(scope.fullPath);
      scope.query = parsedUrl.query;
      scope.headers = response.headers();
      scope.status = response.status();
      scope.method = response.request().method();
      const isImg: boolean = isImage(scope.fullPath);

      if (!isImg) {
        scope.body = await response.text();
        scopes.push(scope);
        return scopes;
      }
      if (isImg && config.replaceImage && path.extname(scope.url) !== '.svg') {
        scope.body = config.svgTemplate;
        scope.headers['content-type'] = svgContentTypeHeader;
        //scope.headers['content-length'] = svgContentLength;
        scope.headers['content-length'] = svgContentLength.toString();
        return scopes.push(scope);
      }
    }
    return null;
  });

  //const setRequestInterceptor = async (p) => {
  const setRequestInterceptor = async (p: puppeteer.Page) => {
    await p.setRequestInterception(true);
    //p.on('request', (request) => {
    p.on('request', (request: puppeteer.Request) => {
      if (request.resourceType() === 'image') {
        //const response = {};
        let response: puppeteer.RespondOptions;
        response.headers = request.headers();
        response.body = config.svgTemplate;
        response.headers['content-type'] = svgContentTypeHeader;
        //response.headers['content-length'] = svgContentLength;
        response.headers['content-length'] = svgContentLength.toString();
        return request.respond(response);
      }
      return request.continue();
    });
  };

  //let fixtureSaved = false;
  let fixtureSaved: boolean = false;
  const saveScopes = () => {
    fixtureSaved = true;
    //const reducedOutput = removeDuplicates(scopes);
    const reducedOutput: Array<ScopeObj> = removeDuplicates(scopes);
    fs.appendFileSync(config.fixtureFilePath, JSON.stringify(reducedOutput));
  };

  if (config.page) {
    setResponseInterceptor(config.page);
    if (config.replaceImage) setRequestInterceptor(config.page);
    config.page.on('close', () => {
      if (!fixtureSaved) { saveScopes(); }
    });
  } else {
    //const pages = await getBrowserPages(browser);
    const pages: Array<puppeteer.Page> = await getBrowserPages(browser);
    pages.forEach(p => setResponseInterceptor(p));
    if (config.replaceImage) pages.forEach(p => setRequestInterceptor(p));
  }

  browser.on('disconnected', () => {
    if (!fixtureSaved) { saveScopes(); }
  });
};

//module.exports = handleRecordMode;
export { handleRecordMode };