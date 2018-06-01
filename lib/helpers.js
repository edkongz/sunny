"use strict";
exports.__esModule = true;
var R = require("ramda");
/*---------------------------------------------------------------
  noop request
  ---------------------------------------------------------------*/
exports.noop = function () { return function (request, reply, next) { return next(); }; };
/*---------------------------------------------------------------
  reject and reduce a list of arguments
  ---------------------------------------------------------------*/
var reduce = function (fn, seed) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return R.pipe(R.reject(R.isNil), R.reduce(fn, seed))(args);
}; };
exports.merge = reduce(R.mergeDeepRight, {});
exports.concat = reduce(R.concat, []);
/*---------------------------------------------------------------
  Resolvers
  ---------------------------------------------------------------*/ 
