"use strict";
exports.__esModule = true;
exports.errorHandler = function (err, request, reply, next) {
    if (err.isKaboom) {
        if (err.statusCode)
            reply.status(err.statusCode);
        return reply.send(err.output);
    }
    return reply.send(err);
};
