"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasketRepository = void 0;
class BasketRepository {
    constructor(addToDataBase) {
        this.addToDataBase = addToDataBase;
        this.tableName = 'Basket';
        this.addToDataBase = addToDataBase;
    }
    async add(product) {
        this.addToDataBase.add(product, this.tableName);
        return Promise.resolve(null);
    }
}
exports.BasketRepository = BasketRepository;
//# sourceMappingURL=basket-repositoy.js.map