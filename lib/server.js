"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
exports.__esModule = true;
var register_1 = require("./register");
var R = require("ramda");
var path = require("path");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var defaults = require("./defaults");
var _a = require("./helpers"), merge = _a.merge, concat = _a.concat;
var loadManifest = require("./manifest").loadManifest;
/*################################################################
  Server Factory
  ################################################################*/
function Server() {
    var _a = loadManifest(), plugins = _a.plugins, manifest = __rest(_a, ["plugins"]);
    var app = express();
    var auth = {};
    var routes = merge(defaults.scheme.routes, manifest.routes);
    /*---------------------------------------------------------------
      Register plugin factory
      ---------------------------------------------------------------*/
    var register = register_1.registerFactory(routes, auth, app);
    /*---------------------------------------------------------------
      Plugins
      ---------------------------------------------------------------*/
    plugins.forEach(function (_a) {
        var plugin = _a.plugin, options = _a.options;
        require(path.join(process.cwd(), plugin)).register(register(options), options);
    });
    return app;
}
exports.Server = Server;
