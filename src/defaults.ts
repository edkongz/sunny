import { Scheme } from './types';
import { start } from 'repl';

export const serverDefaults: Partial<Scheme> = {
  server: {
    address: "127.0.0",
    port: 3000,
    cors: false
  },
  defaults: {
    auth: false,
    routes: {
      prefix: ""
    }
  },
  auth: [],
  plugins: []
};

export const pluginDefaults = {
  routes: {
    prefix: ""
  }
};
