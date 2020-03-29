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
//const parse = require('url-parse');
var url_parse_1 = __importDefault(require("url-parse"));
//const isImage = require('is-image');
var is_image_1 = __importDefault(require("is-image"));
//const path = require('path');
var path_1 = __importDefault(require("path"));
//const { svgContentTypeHeader, svgContentLength } = require('../utils/svg-template');
var svg_template_1 = require("../utils/svg-template");
//const { removeLastDirectoryPartOfUrl } = require('./url-helper');
var url_helper_1 = require("./url-helper");
//const removeDuplicates = (outputs) => {
var removeDuplicates = function (outputs) {
    // the keys of "obj" are dynamically generated based on the value of "url" from each "outputs" element
    //const obj = {};
    var obj = {};
    // return Object.keys(outputs.reduce((prev, next) => {
    //   if (!obj[next.url]) obj[next.url] = next;
    //   return obj;
    // }, obj)).map(i => obj[i]);
    var outputsNoDuplicates = Object.keys(outputs.reduce(function (prev, next) {
        if (!obj[next.url]) {
            obj[next.url] = next;
        }
        return obj;
    }, obj)).map(function (i) { return obj[i]; });
    return outputsNoDuplicates;
};
//const getBrowserPages = async (browser) => browser.pages();
var getBrowserPages = function (browser) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/, browser.pages()];
}); }); };
//const handleRecordMode = async ({ browser, config }) => {
var handleRecordMode = function (_a) {
    var browser = _a.browser, config = _a.config;
    return __awaiter(void 0, void 0, void 0, function () {
        var scopes, setResponseInterceptor, setRequestInterceptor, fixtureSaved, saveScopes, pages;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    scopes = [];
                    setResponseInterceptor = function (p) { return p.on('response', function (response) { return __awaiter(void 0, void 0, void 0, function () {
                        var scope, parsedUrl, isImg, _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!response.ok()) return [3 /*break*/, 3];
                                    scope = void 0;
                                    parsedUrl = url_parse_1.default(response.url(), true);
                                    scope.url = response.url();
                                    scope.fullPath = "" + parsedUrl.origin + parsedUrl.pathname;
                                    scope.minimalPath = url_helper_1.removeLastDirectoryPartOfUrl(scope.fullPath);
                                    scope.query = parsedUrl.query;
                                    scope.headers = response.headers();
                                    scope.status = response.status();
                                    scope.method = response.request().method();
                                    isImg = is_image_1.default(scope.fullPath);
                                    if (!!isImg) return [3 /*break*/, 2];
                                    _a = scope;
                                    return [4 /*yield*/, response.text()];
                                case 1:
                                    _a.body = _b.sent();
                                    scopes.push(scope);
                                    return [2 /*return*/, scopes];
                                case 2:
                                    if (isImg && config.replaceImage && path_1.default.extname(scope.url) !== '.svg') {
                                        scope.body = config.svgTemplate;
                                        scope.headers['content-type'] = svg_template_1.svgContentTypeHeader;
                                        //scope.headers['content-length'] = svgContentLength;
                                        scope.headers['content-length'] = svg_template_1.svgContentLength.toString();
                                        return [2 /*return*/, scopes.push(scope)];
                                    }
                                    _b.label = 3;
                                case 3: return [2 /*return*/, null];
                            }
                        });
                    }); }); };
                    setRequestInterceptor = function (p) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, p.setRequestInterception(true)];
                                case 1:
                                    _a.sent();
                                    //p.on('request', (request) => {
                                    p.on('request', function (request) {
                                        if (request.resourceType() === 'image') {
                                            //const response = {};
                                            var response = void 0;
                                            response.headers = request.headers();
                                            response.body = config.svgTemplate;
                                            response.headers['content-type'] = svg_template_1.svgContentTypeHeader;
                                            //response.headers['content-length'] = svgContentLength;
                                            response.headers['content-length'] = svg_template_1.svgContentLength.toString();
                                            return request.respond(response);
                                        }
                                        return request.continue();
                                    });
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    fixtureSaved = false;
                    saveScopes = function () {
                        fixtureSaved = true;
                        //const reducedOutput = removeDuplicates(scopes);
                        var reducedOutput = removeDuplicates(scopes);
                        fs_1.default.appendFileSync(config.fixtureFilePath, JSON.stringify(reducedOutput));
                    };
                    if (!config.page) return [3 /*break*/, 1];
                    setResponseInterceptor(config.page);
                    if (config.replaceImage)
                        setRequestInterceptor(config.page);
                    config.page.on('close', function () {
                        if (!fixtureSaved) {
                            saveScopes();
                        }
                    });
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, getBrowserPages(browser)];
                case 2:
                    pages = _b.sent();
                    pages.forEach(function (p) { return setResponseInterceptor(p); });
                    if (config.replaceImage) {
                        pages.forEach(function (p) { return setRequestInterceptor(p); });
                    }
                    _b.label = 3;
                case 3:
                    browser.on('disconnected', function () {
                        if (!fixtureSaved) {
                            saveScopes();
                        }
                    });
                    return [2 /*return*/];
            }
        });
    });
};
exports.handleRecordMode = handleRecordMode;
