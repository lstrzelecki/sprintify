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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("lodash/fp");

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var elasticsearch = __webpack_require__(10);
var elasticsearchHost = process.env.ELASTICSEARCH_HOST || 'localhost';
var client = new elasticsearch.Client({
    host: elasticsearchHost + ":9200"
});
exports.default = client;


/***/ }),
/* 2 */
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
var express = __webpack_require__(3);
var graphqlHTTP = __webpack_require__(4);
var graphql_1 = __webpack_require__(5);
var graphql_tools_1 = __webpack_require__(6);
var subscriptions_transport_ws_1 = __webpack_require__(7);
var dashboard_1 = __webpack_require__(8);
var dashboard_2 = __webpack_require__(14);
var createOrUpdateStory_1 = __webpack_require__(15);
var graphql_subscriptions_1 = __webpack_require__(16);
var app = express();
var queue = new graphql_subscriptions_1.PubSub();
var root = __assign({}, dashboard_2.default);
var schema = graphql_tools_1.makeExecutableSchema({
    typeDefs: __webpack_require__(17),
    resolvers: {
        Query: {
            dashboard: function () { return true; }
        },
        Mutation: __assign({}, createOrUpdateStory_1.default),
        Dashboard: dashboard_1.default,
        DashboardUpdatedEvent: {
            __resolveType: function (val) { return val.event; }
        }
    }
});
app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
    context: { queue: queue }
}));
var PORT = 4000;
var WS_PORT = 4001;
app.listen(PORT, function () { return console.log("API listening on port " + PORT); });
subscriptions_transport_ws_1.SubscriptionServer.create({ schema: schema, execute: graphql_1.execute, subscribe: graphql_1.subscribe, rootValue: root, onConnect: function () { return ({ queue: queue }); } }, { host: 'localhost', port: 4001, path: '/subscriptions' });


/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express-graphql");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("graphql");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("graphql-tools");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("subscriptions-transport-ws");

/***/ }),
/* 8 */
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
var backlog_1 = __webpack_require__(9);
var milestones_1 = __webpack_require__(11);
var deadlines_1 = __webpack_require__(12);
var sprint_1 = __webpack_require__(13);
exports.default = __assign({}, backlog_1.default, milestones_1.default, deadlines_1.default, sprint_1.default);


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var elasticsearch_1 = __webpack_require__(1);
exports.default = {
    backlog: function () {
        return elasticsearch_1.default.search({
            index: 'backlog',
            type: 'story',
            size: 1000
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
/* 10 */
/***/ (function(module, exports) {

module.exports = require("elasticsearch");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var elasticsearch_1 = __webpack_require__(1);
exports.default = {
    milestones: function () {
        return elasticsearch_1.default.search({
            index: 'backlog',
            type: 'milestone',
            size: 1000
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
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var elasticsearch_1 = __webpack_require__(1);
exports.default = {
    deadlines: function () {
        return elasticsearch_1.default.search({
            index: 'backlog',
            type: 'deadline',
            size: 1000
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _ = __webpack_require__(0);
var elasticsearch_1 = __webpack_require__(1);
exports.default = {
    currentSprint: function () {
        return elasticsearch_1.default.search({
            index: 'sprints',
            type: 'sprint'
        })
            .then(function (_a) {
            var hits = _a.hits;
            return hits;
        })
            .then(function (_a) {
            var hits = _a.hits;
            return hits;
        })
            .then(_.map('_source'))
            .then(_.first);
    }
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    dashboardUpdates: function (omit, _a) {
        var queue = _a.queue;
        return queue.asyncIterator('dashboardUpdates');
    }
};


/***/ }),
/* 15 */
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
var _ = __webpack_require__(0);
var elasticsearch_1 = __webpack_require__(1);
exports.default = {
    createStory: function (omit, _a, _b) {
        var story = _a.story;
        var queue = _b.queue;
        return elasticsearch_1.default.index({
            index: 'backlog',
            type: 'story',
            id: story.num,
            body: story,
            refresh: 'true'
        })
            .then(_.props(['_id']))
            .then(_.zipObject(['num']))
            .then(storyCreated);
        function storyCreated(val) {
            queue.publish('dashboardUpdates', { dashboardUpdates: __assign({}, story, { event: 'StoryCreatedEvent' }) });
            return val;
        }
    },
    updateStory: function (omit, _a, _b) {
        var story = _a.story;
        var queue = _b.queue;
        return elasticsearch_1.default.update({
            index: 'backlog',
            type: 'story',
            id: story.num,
            body: {
                doc: story,
            },
            refresh: true
        })
            .catch(function () { return updateInSprint(story); }) // story is in sprint
            .then(_.props(['_id']))
            .then(_.zipObject(['num']))
            .then(storyUpdated);
        function storyUpdated(val) {
            queue.publish('dashboardUpdates', { dashboardUpdates: __assign({}, story, { event: 'StoryUpdatedEvent' }) });
            return val;
        }
    }
};
function updateInSprint(story) {
    return elasticsearch_1.default.search({
        index: 'sprints',
        type: 'sprint',
        body: {
            query: {
                term: { 'stories.num': story.num }
            }
        }
    })
        .then(function (_a) {
        var hits = _a.hits;
        return hits;
    })
        .then(function (_a) {
        var hits = _a.hits;
        return hits[0];
    })
        .then(function (_a) {
        var _id = _a._id, _source = _a._source;
        return elasticsearch_1.default.update({
            index: 'sprints',
            type: 'sprint',
            id: _id,
            body: {
                doc: {
                    stories: _source.stories.map(function (s) { return s.num === story.num ? __assign({}, s, story) : s; })
                }
            }
        });
    });
}


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = require("graphql-subscriptions");

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = "type Query {\n  dashboard: Dashboard\n}\n\ntype Dashboard {\n  backlog: [Story],\n  milestones: [Milestone],\n  deadlines: [Deadline],\n  currentSprint: Sprint\n}\n\ntype Story {\n  num: String,\n  title: String,\n  size: Int\n}\n\ntype Milestone {\n  name: String,\n  after: Int\n}\n\ntype Deadline {\n  name: String,\n  date: String\n}\n\ntype Sprint {\n  stories: [Story],\n  start: String,\n  end: String\n}\n\ninput StoryInput {\n  num: String!,\n  title: String!,\n  size: Int = 1\n}\n\ntype StoryNum {\n  num: String\n}\n\ntype Mutation {\n  createStory(story: StoryInput): StoryNum,\n  updateStory(story: StoryInput): StoryNum\n}\n\ntype StoryCreatedEvent {\n  num: String\n  title: String\n  size: Int\n}\n\ntype StoryUpdatedEvent {\n  num: String\n  title: String\n  size: Int\n}\n\nunion DashboardUpdatedEvent = StoryCreatedEvent | StoryUpdatedEvent\n\ntype Subscription {\n  dashboardUpdates: DashboardUpdatedEvent\n}"

/***/ })
/******/ ])));