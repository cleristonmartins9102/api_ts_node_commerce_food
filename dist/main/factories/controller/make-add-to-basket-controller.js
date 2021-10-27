"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeAddToBasketController = void 0;
const add_to_basket_controller_1 = require("@/controller/basket/add-to-basket-controller");
const basket_repositoy_1 = require("@/infrastructure/db/basket/basket-repositoy");
const add_db_adapter_1 = require("@/infrastructure/db/queries/add/add-db-adapter");
const makeAddToBasketController = () => {
    const add = new add_db_adapter_1.AddDbAdapter();
    const repo = new basket_repositoy_1.BasketRepository(add);
    return new add_to_basket_controller_1.AddToBasketController(repo);
};
exports.makeAddToBasketController = makeAddToBasketController;
//# sourceMappingURL=make-add-to-basket-controller.js.map