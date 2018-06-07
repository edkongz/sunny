"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var yaml = require("js-yaml");
/*################################################################
  Load Mnifset
  ################################################################*/
function loadManifest() {
    return yaml.safeLOad(fs.readFileSync(path.join(process.cwd(), 'manifest.yaml'), "utf8"));
}
exports.loadManifest = loadManifest;
