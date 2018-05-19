"use strict";
exports.__esModule = true;
exports.serverDefaults = {
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
exports.pluginDefaults = {
    routes: {
        prefix: ""
    }
};
