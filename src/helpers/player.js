"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const fs = require('fs');
var fs_1 = __importDefault(require("fs"));
//const isImage = require('is-image');
var is_image_1 = __importDefault(require("is-image"));
//const path = require('path');
var path_1 = __importDefault(require("path"));
//const parse = require('url-parse');
var url_parse_1 = __importDefault(require("url-parse"));
//const { svgContentTypeHeader, svgContentLength } = require('../utils/svg-template');
var svg_template_1 = require("../utils/svg-template");
//const { removeLastDirectoryPartOfUrl } = require('./url-helper');
var url_helper_1 = require("./url-helper");
//const getBrowserPages = async (browser) => browser.pages();
var getBrowserPages = function (browser) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, browser.pages()];
}); }); };
//const getScope = (url, fixtures) => {
var getScope = function (url, fixtures) {
    //const elementPos = fixtures.map(x => x.url).indexOf(url);
    var elementPos = fixtures.map(function (x) { return x.url; }).indexOf(url);
    if (elementPos >= 0) {
        //const objectFound = fixtures[elementPos];
        var objectFound = fixtures[elementPos];
        if (objectFound) {
            //const { body } = objectFound;
            var body = objectFound.body;
            if (is_image_1.default(objectFound.fullPath) && path_1.default.extname(objectFound.url) !== '.svg') {
                objectFound.headers['content-type'] = svg_template_1.svgContentTypeHeader;
                //objectFound.headers['content-length'] = svgContentLength;
                objectFound.headers['content-length'] = svg_template_1.svgContentLength.toString();
            }
            // the "getScope" function should return an object of type "puppeteer.RespondOptions"
            // return {
            //   status: objectFound.status || 200,
            //   headers: objectFound.headers,
            //   //body,
            //   body: body,
            // };
            var response = {
                status: objectFound.status || 200,
                headers: objectFound.headers,
                body: body
                // not returning "contentType" (optional property from "puppeteer.RespondOptions")
            };
            return response;
        }
    }
    return null;
};
//const handlePlayMode = async ({ browser, config }) => {
var handlePlayMode = function (_a) {
    var browser = _a.browser, config = _a.config;
    return __awaiter(void 0, void 0, void 0, function () {
        var fixtures, setRequestInterceptor, pagePromiseArray_1, pages;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    fixtures = JSON.parse(fs_1.default.readFileSync(config.fixtureFilePath).toString());
                    setRequestInterceptor = function (p) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, p.setRequestInterception(true)];
                                case 1:
                                    _a.sent();
                                    //p.on('request', (request) => {
                                    p.on('request', function (request) {
                                        if (request.resourceType() === 'image' && config.allowImageRecourses) {
                                            return request.continue();
                                        }
                                        //let response = getScope(request.url(), fixtures);
                                        var response = getScope(request.url(), fixtures);
                                        if (!response) {
                                            //const parsedUrl = parse(request.url(), true);
                                            var parsedUrl = url_parse_1.default(request.url(), true);
                                            response = getScope("" + parsedUrl.origin + parsedUrl.pathname, fixtures);
                                            if (!response) {
                                                response = getScope(url_helper_1.removeLastDirectoryPartOfUrl("" + parsedUrl.origin + parsedUrl.pathname), fixtures);
                                            }
                                        }
                                        return response
                                            ? request.respond(response)
                                            : request.abort();
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    if (!config.page) return [3 /*break*/, 2];
                    return [4 /*yield*/, setRequestInterceptor(config.page)];
                case 1:
                    _b.sent();
                    return [3 /*break*/, 5];
                case 2:
                    pagePromiseArray_1 = [];
                    return [4 /*yield*/, getBrowserPages(browser)];
                case 3:
                    pages = _b.sent();
                    pages.forEach(function (p) { return pagePromiseArray_1.push(setRequestInterceptor(p)); });
                    return [4 /*yield*/, Promise.all(pagePromiseArray_1)];
                case 4:
                    _b.sent();
                    _b.label = 5;
                case 5: return [2 /*return*/];
            }
        });
    });
};
exports.handlePlayMode = handlePlayMode;
