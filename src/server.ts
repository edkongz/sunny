import { registerFactory } from "./register";
import {
  Manifest,
  RequestHandler,
  Route,
  Scheme,
  SchemeAuth,
  SchemePlugins,
  Plugin,
  ServerOptions
} from "./types";

import * as R from "ramda";
import * as path from "path";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as defaults from "./defaults";
import { merge, concat } from "./helpers";
import { loadManifest } from "./manifest";

/*################################################################
  Server Factory
  ################################################################*/
export function Server(options: Partial<ServerOptions>) {
  const manifest: Partial<Manifest> = options.manifest || loadManifest();

  const app = express();
  app.disable("x-powered-by");

  const auth = {};
  const routes = merge(defaults.scheme.routes, manifest.routes);

  /*---------------------------------------------------------------
    Register factory
    ---------------------------------------------------------------*/
  const register = registerFactory(routes, auth, app);

  /*---------------------------------------------------------------
    Plugins
    ---------------------------------------------------------------*/
  manifest.plugins.forEach(({ plugin, options }) => {
    resolvePlugin(plugin).register(register(options), options);
  });

  return app;
}

/*################################################################
  Plugins
  ################################################################*/
const resolvePlugin = R.cond([
  [R.is(Object), R.identity()],
  [R.is(String), plugin => require(path.join(process.cwd(), plugin))]
]);
