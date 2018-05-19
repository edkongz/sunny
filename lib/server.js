"use strict";
exports.__esModule = true;
var defaults_1 = require("./defaults");
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var ramda_1 = require("ramda");
/*################################################################
  Server Factory
  ################################################################*/
function Server(manifest) {
    var auth = {};
    var app = express_1["default"]();
    var config = {
        server: ramda_1["default"].mergeDeepRight(defaults_1.serverDefaults.server, manifest.server),
        defaults: ramda_1["default"].mergeDeepRight(defaults_1.serverDefaults.defaults, manifest.defaults)
    };
    /*---------------------------------------------------------------
      Body Parsers
      ---------------------------------------------------------------*/
    app.use(body_parser_1["default"].json(), body_parser_1["default"].urlencoded());
    /*---------------------------------------------------------------
      Cross Origin Request
      ---------------------------------------------------------------*/
    if (config.server.cors) {
    }
    /*---------------------------------------------------------------
      Authentication scheme
      ---------------------------------------------------------------*/
    if (config.auth)
        config.auth.forEach(function (scheme) { return (auth[scheme.name] = scheme); });
    /*---------------------------------------------------------------
      Register plugin factory
      ---------------------------------------------------------------*/
    var register = function (options) {
        options = ramda_1["default"].mergeDeepRight(defaults_1.pluginDefaults, options);
        return {
            route: function (route) {
                // Build path using defaults and plugin route defaults
                var path = [
                    config.defaults.routes.prefix,
                    options.routes.prefix,
                    route.path
                ].join("");
                // add route to express
                app[route.method].use(path, route.handler);
            }
        };
    };
    /*---------------------------------------------------------------
      Plugins
      ---------------------------------------------------------------*/
    if (config.plugins)
        config.plugins.forEach(function (_a) {
            var plugin = _a.plugin, options = _a.options;
            if (typeof plugin === "string")
                plugin = require(plugin);
            plugin.register(register(options), options);
        });
}
exports.Server = Server;
