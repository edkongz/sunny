import { BadRequest, BadImplementation } from './kaboom';
import * as R from "ramda";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import { RoutesDefaults, Route } from "./types";
import { errorHandler } from './errors';
import { noop } from "./helpers";

/*################################################################
  Register Factory
  ################################################################*/
export const registerFactory = (
  serverRoutes: RoutesDefaults,
  serverAuth,
  serverApp
) => pluginOptions => {
  const path = pathFactory(pluginOptions, serverRoutes);
  const middleware = middlewareFactory(pluginOptions, serverRoutes, serverAuth);

  return {
    /*---------------------------------------------------------------
      ROUTE
      ---------------------------------------------------------------*/
    route(route: Route) {
      serverApp[method(route)](
        path(route),
        route.handler,
        errorHandler,
      );
    },

    /*---------------------------------------------------------------
      AUTH
      !!!MUTATING!!!
      ---------------------------------------------------------------*/
    auth(method) {
      if (serverAuth[method.name])
        throw Error("Auth with method already exists");
      serverAuth[method.name] = method.authenticate;
    }
  };
};

/*################################################################
  Factories
  ################################################################*/

/*---------------------------------------------------------------
  MIddleware Factory
  ---------------------------------------------------------------*/
const middlewareFactory = (pluginOptions, serverRoutes, serverAuth) => {
  const resolvers = [
    () => bodyParser.json(),
    corsFactory(pluginOptions, serverRoutes),
    authFactory(serverAuth, pluginOptions, serverRoutes),
    validateBody,
    validateQuery,
    validateParams
  ];
  return route => resolvers.map(fn => fn(route)).filter(fn => fn !== null);
};

/*---------------------------------------------------------------
  Path Factory
  ---------------------------------------------------------------*/
const pathFactory = (pluginOptions, serverRoutes: RoutesDefaults) => route => {
  return `${serverRoutes.prefix}${prefixOr(pluginOptions)}${route.path}`;
};

/*---------------------------------------------------------------
  CORS Factory
  ---------------------------------------------------------------*/
const corsFactory = (pluginOptions, serverRoutes) => route => {
  const otherwise = serverRoutes.cors;
  const result = R.find(hasValue, [
    R.path(["options", "cors"], route),
    R.path(["routes", "cors"], pluginOptions),
    otherwise
  ]);

  if (result === true) return noop();
  if (result === false) return noop();
  return cors(result);
};

/*---------------------------------------------------------------
  Auth Factory
  ---------------------------------------------------------------*/
const authFactory = (serverAuth, pluginOptions, serverRoutes) => route => {
  const otherwise = serverRoutes.auth;
  const result = R.find(hasValue, [
    R.path(["options", "auth"], route),
    R.path(["routes", "auth"], pluginOptions),
    otherwise
  ]);
  if (result === false) return null;
  if (serverAuth[result]) return serverAuth[result];
  return BadImplementation()
};

/*---------------------------------------------------------------
  Validate Body 
  ---------------------------------------------------------------*/
const validateBody = route => {
  const validator = R.path(["options", "validate", "body"], route);
  return (request, reply, next) => {
    const input = request.body;
    const results = validator.isJoi
      ? require("joi").validate(input, validator)
      : validator(input);

    if (isValid(results)) return next();
    return BadRequest({payload: results.error.details})
  };
};

/*---------------------------------------------------------------
  Validate Query
  ---------------------------------------------------------------*/
const validateQuery = route => {
  const validator = R.path(["options", "validate", "query"], route);
  if (!validator) return null;
  return (request, reply, next) => {
    const input = request.query;
    const results = validator.isJoi
      ? require("joi").validate(input, validator)
      : validator(input);
    if (isValid(results)) return next();
    return BadRequest({payload: results.error.details})
  };
};

/*---------------------------------------------------------------
  Validate Params
  ---------------------------------------------------------------*/
const validateParams = route => {
  const validator = R.path(["options", "validate", "params"], route);
  if (!validator) return null;
  return (request, reply, next) => {
    const input = request.params;
    const results = validator.isJoi
      ? require("joi").validate(input, validator)
      : validator(input);
    if (isValid(results)) return next();
    return BadRequest({payload: results.error.details})
  };
};

/*################################################################
  UTILS
  ################################################################*/
const prefixOr = R.pathOr("", ["routes", "prefix"]);
const hasValue = R.complement(R.isNil);
const method = R.pipe(R.prop("method"), R.toLower);
const isValid = R.anyPass([R.equals(true), R.propEq("error", null)]);
