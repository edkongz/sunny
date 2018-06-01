import { registerFactory } from "./register";
import {
  Manifest,
  RequestHandler,
  Route,
  Scheme,
  SchemeAuth,
  SchemePlugins,
  Plugin
} from "./types";

const R = require("ramda");
const path = require("path");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const defaults = require("./defaults");
const { merge, concat } = require("./helpers");
const { loadManifest } = require("./manifest");
// const resolvers = require("./resolvers");

/*################################################################
  Server Factory
  ################################################################*/
export function Server() {
  const { plugins, ...manifest }: Partial<Manifest> = loadManifest();
  const app = express();

  const auth = {};
  const routes = merge(defaults.scheme.routes, manifest.routes);

  /*---------------------------------------------------------------
    Register plugin factory
    ---------------------------------------------------------------*/
  const register = registerFactory(routes, auth, app);

  /*---------------------------------------------------------------
    Plugins
    ---------------------------------------------------------------*/
  plugins.forEach(({ plugin, options }) => {
    require(path.relative(process.cwd(), plugin)).register(
      register(options),
      options
    );
  });

  return app;
}
