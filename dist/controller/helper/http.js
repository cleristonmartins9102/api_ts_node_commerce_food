"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = exports.serverError = void 0;
const server_error_1 = require("../erros/server-error");
const serverError = (error) => ({ statusCode: 500, body: new server_error_1.ServerError(error) });
exports.serverError = serverError;
const ok = (msg) => ({ statusCode: 200, body: msg !== null && msg !== void 0 ? msg : null });
exports.ok = ok;
//# sourceMappingURL=http.js.map