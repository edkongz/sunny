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
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "BAD_REQUEST" : _d;
    throw new Kaboom(400, "Bad Request", payload, code);
};
exports.Unauthorized = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "UNAUTHORIZED" : _d;
    throw new Kaboom(401, "Unauthorized", payload, code);
};
exports.Forbidden = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "FORBIDDEN" : _d;
    throw new Kaboom(403, "Forbidden", payload, code);
};
exports.NotFound = function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.payload, payload = _c === void 0 ? {} : _c, _d = _b.code, code = _d === void 0 ? "NOT_FOUND" : _d;
    throw new Kaboom(404, "NotFound", payload, code);
};
exports.Conflict = function (_a) {
    var _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.code, code = _c === void 0 ? "CONFLICT" : _c;
    throw new Kaboom(409, "Conflict", payload, code);
};
/*################################################################
  5xx Errors
  ################################################################*/
exports.BadImplementation = function (_a) {
    var _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.code, code = _c === void 0 ? "BAD_IMPLEMENTION" : _c;
    throw new Kaboom(500, "BadImplementation", payload, code);
};
exports.NotImplemented = function (_a) {
    var _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.code, code = _c === void 0 ? "NOT_IMPLEMENTED" : _c;
    throw new Kaboom(501, "NotImplemented", payload, code);
};
exports.BadGateway = function (_a) {
    var _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.code, code = _c === void 0 ? "BAD_GATEWAY" : _c;
    throw new Kaboom(502, "BadGateway", payload, code);
};
exports.ServerUnavailable = function (_a) {
    var _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.code, code = _c === void 0 ? "SERVER_UNAVAILABLE" : _c;
    throw new Kaboom(503, "ServerUnavailable", payload, code);
};
exports.GatewayTimeout = function (_a) {
    var _b = _a.payload, payload = _b === void 0 ? {} : _b, _c = _a.code, code = _c === void 0 ? "GATEWAY_TIMEOUT" : _c;
    throw new Kaboom(504, "GatewayTimeout", payload, code);
};
