import {
  RequestHandler,
  Manifest,
  SchemeAuth,
  Scheme,
  Route,
  SchemePlugins,
  Plugin
} from "./types";
import { serverDefaults, pluginDefaults } from "./defaults";
import express from "express";
import * as cors from "cors";
import bodyParser from "body-parser";
import R from "ramda";
import { merge, concat } from "./helpers";

interface Server {
  route: (route: Route) => void;
}

/*################################################################
  Server Factory
  ################################################################*/
export function Server(manifest: Partial<Manifest>) {
  const auth: { [name: string]: SchemeAuth } = {};

  const app = express();

  /*---------------------------------------------------------------
    Merge and build scheme 
    ---------------------------------------------------------------*/
  const scheme: Partial<Scheme> = {
    server: merge(serverDefaults.server, manifest.server),
    defaults: merge(serverDefaults.defaults, manifest.defaults),
    auth: concat(serverDefaults.auth, manifest.auth),
    plugins: concat(serverDefaults.plugins, manifest.plugins)
  };

  /*---------------------------------------------------------------
    Body Parsers
    ---------------------------------------------------------------*/
  app.use(bodyParser.json(), bodyParser.urlencoded());

  /*---------------------------------------------------------------
    Cross Origin Request
    ---------------------------------------------------------------*/
  if (scheme.server.cors) {
    app.use(cors({ orig }));
  }

  /*---------------------------------------------------------------
    Authentication scheme
    ---------------------------------------------------------------*/
  scheme.auth.forEach(scheme => (auth[scheme.name] = scheme));

  /*---------------------------------------------------------------
    Register plugin factory
    ---------------------------------------------------------------*/
  const register = options => {
    options = R.mergeDeepRight(pluginDefaults, options);

    // resolve cors
    // resolve path
    // resolve auth

    return {
      route(route: Route) {
        // Build path using defaults and plugin route defaults
        const path = [
          scheme.defaults.routes.prefix,
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
  scheme.plugins.forEach(({ plugin, options }) => {
    if (typeof plugin === "string") plugin = require(plugin) as Plugin;
    plugin.register(register(options), options);
  });

  return app;
}
