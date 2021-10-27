"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepare = void 0;
/* istanbul ignore file */
const prepare = (data) => {
    let sql = {};
    for (const [key, value] of Object.entries(data)) {
        const valuePrepared = prepData(value);
        sql = { ...sql, [key]: valuePrepared };
    }
    return sql;
};
exports.prepare = prepare;
const prepData = (data) => {
    if (typeof data === 'number')
        return data;
    if (typeof data === 'string')
        return `'${data}'`;
    return data;
};
//# sourceMappingURL=prepare-data.js.map