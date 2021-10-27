"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_adapter_1 = __importDefault(require("@/infrastructure/adapter/express/router-adapter"));
const make_add_to_basket_controller_1 = require("../factories/controller/make-add-to-basket-controller");
exports.default = (router) => {
    router.post('/addtobasket', (0, router_adapter_1.default)((0, make_add_to_basket_controller_1.makeAddToBasketController)()));
};
//# sourceMappingURL=basket-routes.js.map