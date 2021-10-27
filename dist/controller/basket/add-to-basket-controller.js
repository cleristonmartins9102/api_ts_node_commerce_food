"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddToBasketController = void 0;
const http_1 = require("../helper/http");
class AddToBasketController {
    constructor(addToBasket) {
        this.addToBasket = addToBasket;
        this.addToBasket = addToBasket;
    }
    async handle(httpRequest) {
        try {
            const { body } = httpRequest;
            this.addToBasket.add(body);
            return (0, http_1.ok)();
        }
        catch (error) {
            return (0, http_1.serverError)(error);
        }
    }
}
exports.AddToBasketController = AddToBasketController;
//# sourceMappingURL=add-to-basket-controller.js.map