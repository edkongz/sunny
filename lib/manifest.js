"use strict";
exports.__esModule = true;
/*################################################################
  Load Mnifset
  ################################################################*/
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
module.exports = {
    loadManifest: function () {
        return yaml.safeLoad(fs.readFileSync(path.join(process.cwd(), "manifest.yaml"), "utf8"));
    }
};
