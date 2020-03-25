// defining custom types
// -- newly created file, not found in the original (JS) library

interface configurationObj {
    allowImageRecourses: boolean;
    fixtureFilePath: string;
    fixtureName: string;
    fixturesDir: string;
    page: string;
    replaceIfExists: boolean;
    replaceImage: boolean;
    svgTemplate: string;
};

interface scopeObj {
    body: string;
    fullPath: string;
    headers: string;
    method: string;
    minimalPath: string;
    query: object;
    status: string;
    url: string;
};

interface responseObj {
    body: string;
    headers: string;
};

export { configurationObj, scopeObj, responseObj };
