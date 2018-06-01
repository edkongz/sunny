import { Manifest } from './types';
/*################################################################
  Load Mnifset
  ################################################################*/
const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");

module.exports = {
  loadManifest():Partial<Manifest> {
    return yaml.safeLoad(
      fs.readFileSync(path.join(process.cwd(), "manifest.yaml"), "utf8")
    );
  }
};
