import * as R from "ramda";
import * as Boom from "boom";
import { SSL_OP_TLS_BLOCK_PADDING_BUG } from "constants";

export const errorHandler = (err, request, reply, next) => {
  if(err.isKaboom) {
    if(err.statusCode) reply.status(err.statusCode);
    return reply.send(err.output);
  }
  return reply.send(err)
};