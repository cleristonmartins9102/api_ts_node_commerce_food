"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connections = void 0;
const mysql_1 = __importDefault(require("mysql"));
const dev_1 = __importDefault(require("@/main/config/dev"));
const connections = {
    mysql: (database) => {
        const config = {
            host: 'localhost',
            user: dev_1.default.mysql.user,
            password: dev_1.default.mysql.secret
        };
        return mysql_1.default.createConnection(database ? { ...config, database: database } : config);
    }
};
exports.connections = connections;
//# sourceMappingURL=connection.js.map