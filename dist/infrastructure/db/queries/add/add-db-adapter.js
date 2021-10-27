"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDbAdapter = void 0;
const connection_1 = require("../../config/connection");
const prepare_data_1 = require("../../helper/prepare-data");
class AddDbAdapter {
    async add(data, tableName) {
        const connection = connection_1.connections.mysql('frangolino');
        const dataPepared = (0, prepare_data_1.prepare)(data);
        const sql = `INSERT INTO ${tableName} SET ?`;
        return new Promise((resolve, reject) => {
            connection.query(sql, dataPepared, (err, result) => {
                if (err)
                    reject(err);
                resolve(result);
            });
        });
    }
}
exports.AddDbAdapter = AddDbAdapter;
//# sourceMappingURL=add-db-adapter.js.map