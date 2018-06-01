"use strict";
exports.__esModule = true;
var R = require("ramda");
/*################################################################
  Register Factory
  ################################################################*/
exports.registerFactory = function (serverRoutes, serverAuth, serverApp) { return function (pluginOptions) {
    var path = pathFactory(pluginOptions, serverRoutes);
    var middleware = middlewareFactory(pluginOptions, serverRoutes, serverAuth);
    return {
        /*---------------------------------------------------------------
          ROUTE
          ---------------------------------------------------------------*/
        route: function (route) {
            serverApp[method(route)].apply(serverApp, [path(route)].concat(middleware(route), [route.handler]));
        },
        /*---------------------------------------------------------------
          AUTH
          !!!MUTATING!!!
          ---------------------------------------------------------------*/
        auth: function (method) {
            if (serverAuth[method.name])
                throw Error("Auth with method already exists");
            serverAuth[method.name] = method.authenticate;
        }
    };
}; };
/*################################################################
  Factories
  ################################################################*/
/*---------------------------------------------------------------
  MIddleware Factory
  ---------------------------------------------------------------*/
var middlewareFactory = function (pluginOptions, serverRoutes, serverAuth) {
    var resolvers = [
        corsFactory(pluginOptions, serverRoutes),
        authFactory(serverAuth, pluginOptions, serverRoutes)
    ];
    return function (route) { return resolvers.map(function (fn) { return fn(route); }); };
};
/*---------------------------------------------------------------
  Path Factory
  ---------------------------------------------------------------*/
var pathFactory = function (pluginOptions, serverRoutes) { return function (route) {
    return "" + serverRoutes.prefix + prefixOr(pluginOptions) + route.path;
}; };
/*---------------------------------------------------------------
  CORS Factory
  ---------------------------------------------------------------*/
var corsFactory = function (pluginOptions, serverRoutes) { return function (route) {
    var otherwise = serverRoutes.cors;
    var result = R.find(hasValue, [
        R.path(["options", "cors"], route),
        R.path(["routes", "cors"], pluginOptions),
        otherwise
    ]);
    switch (true) {
        case result === true:
            return noop();
        case result === false:
            return noop();
        default:
            return cors(result);
    }
}; };
/*---------------------------------------------------------------
  Auth Factory
  ---------------------------------------------------------------*/
var authFactory = function (serverAuth, pluginOptions, serverRoutes) { return function (route) {
    var otherwise = serverRoutes.auth;
    var result = R.find(hasValue, [
        R.path(["optiosn", "auth"], route),
        R.path(["routes", "auth"], pluginOptions),
        otherwise
    ]);
    return result === false ? noop() : serverAuth[result].authenticate;
}; };
/*################################################################
  UTILS
  ################################################################*/
var prefixOr = R.pathOr("", ["routes", "prefix"]);
var hasValue = R.complement(R.isNil);
var method = R.pipe(R.prop("method"), R.toLowerCase);
