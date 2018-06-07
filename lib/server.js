"use strict";
exports.__esModule = true;
var register_1 = require("./register");
var R = require("ramda");
var path = require("path");
var express = require("express");
var defaults = require("./defaults");
var helpers_1 = require("./helpers");
var manifest_1 = require("./manifest");
/*################################################################
  Server Factory
  ################################################################*/
function Server(options) {
    var manifest = options.manifest || manifest_1.loadManifest();
    var app = express();
    app.disable("x-powered-by");
    var auth = {};
    var routes = helpers_1.merge(defaults.scheme.routes, manifest.routes);
    /*---------------------------------------------------------------
      Register factory
      ---------------------------------------------------------------*/
    var register = register_1.registerFactory(routes, auth, app);
    /*---------------------------------------------------------------
      Plugins
      ---------------------------------------------------------------*/
    manifest.plugins.forEach(function (_a) {
        var plugin = _a.plugin, options = _a.options;
        resolvePlugin(plugin).register(register(options), options);
    });
    return app;
}
exports.Server = Server;
/*################################################################
  Plugins
  ################################################################*/
var resolvePlugin = R.cond([
    [R.is(Object), R.identity()],
    [R.is(String), function (plugin) { return require(path.join(process.cwd(), plugin)); }]
]);
