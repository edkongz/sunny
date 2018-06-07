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
  cors?: false | any;
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
  cors: false | any;
  auth: false | string;
}

/*################################################################
  Scheme
  ################################################################*/
export interface Scheme {
  routes: RoutesDefaults;
  plugins: SchemePlugins[];
}


export interface SchemeDefaults {
  routes: RoutesDefaults;
}

export interface SchemeAuth {
  name: string;
}

export interface SchemePlugins {
  plugin: string; 
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

export interface ServerOptions {
  manifest: Partial<Manifest>
}
