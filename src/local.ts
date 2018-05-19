import { Manifest } from "./types";

/*---------------------------------------------------------------
  localhost server
  ---------------------------------------------------------------*/
export function start(manifest: Manifest, server) {
  server.listen(manifest.server.port, () => {
    console.log(
      `Server started on ${manifest.server.address}:${manifest.server.port}`
    );
  });
}
