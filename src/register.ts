import { RoutesDefaults, Route } from "./types";
const R = require("ramda");

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
        ...middleware(route),
        route.handler
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
    corsFactory(pluginOptions, serverRoutes),
    authFactory(serverAuth, pluginOptions, serverRoutes)
  ];
  return route => resolvers.map(fn => fn(route));
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

  switch (true) {
    case result === true:
      return noop();
    case result === false:
      return noop();
    default:
      return cors(result);
  }
};

/*---------------------------------------------------------------
  Auth Factory
  ---------------------------------------------------------------*/
const authFactory = (serverAuth, pluginOptions, serverRoutes) => route => {
  const otherwise = serverRoutes.auth;
  const result = R.find(hasValue, [
    R.path(["optiosn", "auth"], route),
    R.path(["routes", "auth"], pluginOptions),
    otherwise
  ]);
  return result === false ? noop() : serverAuth[result].authenticate;
};

/*################################################################
  UTILS
  ################################################################*/
const prefixOr = R.pathOr("", ["routes", "prefix"]);
const hasValue = R.complement(R.isNil);
const method = R.pipe(R.prop("method"), R.toLowerCase);
