"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//const removeLastDirectoryPartOfUrl = (url) => {
var removeLastDirectoryPartOfUrl = function (url) {
    //const urlArray = url.split('/');
    var urlArray = url.split('/');
    urlArray.pop();
    return (urlArray.join('/'));
};
exports.removeLastDirectoryPartOfUrl = removeLastDirectoryPartOfUrl;
