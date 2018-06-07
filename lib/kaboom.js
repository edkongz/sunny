"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Kaboom = /** @class */ (function (_super) {
    __extends(Kaboom, _super);
    function Kaboom(statusCode, message, payload, code) {
        var _this = _super.call(this, message) || this;
        _this.isKaboom = true;
        _this.statusCode = statusCode;
        _this.output = {
            statusCode: statusCode,
            message: message,
            payload: payload,
            code: code
        };
        return _this;
    }
    return Kaboom;
}(Error));
exports.Kaboom = Kaboom;
/*################################################################
  4xx Errors
  ################################################################*/
exports.BadRequest = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "BAD_REQUEST" : _d, _e = _b.message, message = _e === void 0 ? "Bad request" : _e;
    throw new Kaboom(400, message, payload, code);
};
exports.Unauthorized = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "UNAUTHORIZED" : _d, _e = _b.message, message = _e === void 0 ? "Unauthorized" : _e;
    throw new Kaboom(401, message, payload, code);
};
exports.Forbidden = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "FORBIDDEN" : _d, _e = _b.message, message = _e === void 0 ? "Forbidden" : _e;
    throw new Kaboom(403, message, payload, code);
};
exports.NotFound = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "NOT_FOUND" : _d, _e = _b.message, message = _e === void 0 ? "Not found" : _e;
    throw new Kaboom(404, message, payload, code);
};
exports.Conflict = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "CONFLICT" : _d, _e = _b.message, message = _e === void 0 ? "Conflict" : _e;
    throw new Kaboom(409, message, payload, code);
};
/*################################################################
  5xx Errors
  ################################################################*/
exports.BadImplementation = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "BAD_IMPLEMENTATION" : _d, _e = _b.message, message = _e === void 0 ? "Bad implementation" : _e;
    throw new Kaboom(500, message, payload, code);
};
exports.NotImplemented = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "NOT_IMPLEMENTED" : _d, _e = _b.message, message = _e === void 0 ? "Not implemented" : _e;
    throw new Kaboom(501, message, payload, code);
};
exports.BadGateway = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "BAD_GATEWAY" : _d, _e = _b.message, message = _e === void 0 ? "Bad gateway" : _e;
    throw new Kaboom(502, message, payload, code);
};
exports.ServerUnavailable = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "SERVER_UNAVAILABLE" : _d, _e = _b.message, message = _e === void 0 ? "Server unavailable" : _e;
    throw new Kaboom(503, message, payload, code);
};
exports.GatewayTimeout = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "GATEWAY_TIMEOUT" : _d, _e = _b.message, message = _e === void 0 ? "Gateway timeout" : _e;
    throw new Kaboom(504, message, payload, code);
};
