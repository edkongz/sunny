export type RequestHandler = (request, reply, next?) => void;

/*################################################################
  Routes
  ################################################################*/
export interface Route {
  method: "GET" | "PUT" | "POST" | "HEAD";
  path: string;
  options: RouteOptions;
  handler: RequestHandler;
}

export interface RouteOptions {
  description?: string;
  auth?: false | string;
  tags?: string[];
  validate: {
    params: any;
    query: any;
    payload: any;
  };
}

/*################################################################
  Plugin
  ################################################################*/
export interface Plugin {
  name: string;
  register: (server, options) => void;
}

/*################################################################
  Routes Defaults
  ################################################################*/
export interface RoutesDefaults {
  prefix: string;
}

/*################################################################
  Scheme
  ################################################################*/
export interface Scheme {
  server: SchemeServer;
  defaults: SchemeDefaults;
  auth: SchemeAuth[];
  plugins: SchemePlugins[];
}

export interface SchemeServer {
  address: string;
  port: number;
  cors: false;
}

export interface SchemeDefaults {
  auth: false | string;
  routes: RoutesDefaults;
}

export interface SchemeAuth {
  name: string;
}

export interface SchemePlugins {
  plugin: string | Plugin;
  options: any;
}

/*################################################################
  Manifest
  ################################################################*/
export interface Manifest extends Scheme {
  env: {
    [environment: string]: Partial<Scheme>;
  };
}
