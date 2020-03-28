// defining some custom types
// -- newly created file, not found in the original (JS) Mockeer library

import puppeteer from 'puppeteer';

// defining "ConfigurationObj" based on the structure of "globalConfig" from "./config/defaultConfigs.ts"
// -- also based on the logic of "sanitiseConfiguration" from "./sanitiser.ts"
// -- also based on the "GlobalOptions" specs from "README.md" => all properties are optional
interface ConfigurationObj {
    allowImageRecourses?: boolean;
    // maybe "fixtureFilePath" should be of type "fs.PathLike"?
    // ---- if so, then "./helpers/file-helpers.ts" may also need to be updated
    fixtureFilePath?: string;
    fixtureName?: string;
    fixturesDir?: string;
    page?: puppeteer.Page;
    replaceIfExists?: boolean;
    replaceImage?: boolean;
    svgTemplate?: string;
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
