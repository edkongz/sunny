import { Manifest } from './types';
import * as fs from "fs";
import * as path from "path";
import * as yaml from "js-yaml";

/*################################################################
  Load Mnifset
  ################################################################*/
export function loadManifest():Partial<Manifest> {
  return yaml.safeLOad(
    fs.readFileSync(path.join(process.cwd(),  'manifest.yaml'), "utf8")
  )
}
