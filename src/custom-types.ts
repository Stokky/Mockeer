// defining some custom types
// -- newly created file, not found in the original (JS) library

import puppeteer from 'puppeteer';

// defining "ConfigurationObj" based on the structure of "globalConfig"
interface ConfigurationObj {
    allowImageRecourses: boolean;
    fixtureName: string;
    fixturesDir: string;
    replaceIfExists: boolean;
    replaceImage: boolean;
    svgTemplate: string;
    // optional properties, not defined in "globalConfig"
    // -- maybe "fixtureFilePath" should be of type "fs.PathLike"?
    // ---- if so, then "./helpers/file-helpers.ts" may also need to be updated
    fixtureFilePath?: string;
    page?: puppeteer.Page;
};

interface ScopeObj {
    body: string;
    fullPath: string;
    headers: puppeteer.Headers;
    method: puppeteer.HttpMethod;
    minimalPath: string;
    query: object;
    status: number;
    url: string;
};

export { ConfigurationObj, ScopeObj };
