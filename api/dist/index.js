(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __webpack_require__(1);
var graphqlHTTP = __webpack_require__(2);
var graphql_1 = __webpack_require__(3);
var backlog_1 = __webpack_require__(4);
var app = express();
var schema = graphql_1.buildSchema("\n  type Query {\n    hello: String,\n    backlog: [Story]\n  }\n\n  type Story {\n    num: Int,\n    title: String,\n    size: Int\n  }\n");
var root = __assign({ hello: function () {
        return 'Hello world GraphQL!';
    } }, backlog_1.default);
app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
}));
app.get('/api/', function (req, res) {
    res.send('Hello World REST!');
});
var PORT = 4000;
app.listen(PORT, function () { return console.log("API listening on port " + PORT); });


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(5);
var elasticsearch_1 = __webpack_require__(6);
exports.default = {
    backlog: function () {
        return elasticsearch_1.default.search({
            index: 'backlog',
            type: 'story'
        })
            .then(function (_a) {
            var hits = _a.hits;
            return hits;
        })
            .then(function (_a) {
            var hits = _a.hits;
            return hits;
        })
            .then(_.map('_source'));
    }
};


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("lodash/fp");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch = __webpack_require__(7);
var elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost';
var client = new elasticsearch.Client({
    host: elasticsearchHost + ":9200"
});
exports.default = client;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("elasticsearch");

/***/ })
/******/ ])));