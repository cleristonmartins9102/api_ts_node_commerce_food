"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToBasket = void 0;
class AddToBasket {
    constructor(dbRepository) {
        this.dbRepository = dbRepository;
        this.dbRepository = dbRepository;
    }
    async add(product) {
        this.dbRepository.add(product);
        return Promise.resolve(null);
    }
}
exports.AddToBasket = AddToBasket;
//# sourceMappingURL=add-to-basket.js.map