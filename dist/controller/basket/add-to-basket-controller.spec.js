"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_to_basket_controller_1 = require("./add-to-basket-controller");
const http_1 = require("../helper/http");
const makeAddToBasketStub = () => {
    class AddToBasket {
        async add(product) {
            return Promise.resolve(null);
        }
    }
    return new AddToBasket();
};
const makeSut = () => {
    const addToBasket = makeAddToBasketStub();
    const sut = new add_to_basket_controller_1.AddToBasketController(addToBasket);
    return {
        sut,
        addToBasket
    };
};
const addProductToBasketModel = {
    idProduct: 2
};
const httpRequest = {
    body: addProductToBasketModel
};
describe('AddToBasket Controller', () => {
    test('Ensure AddToBasketController calls AddToBasket with correct value', () => {
        const { sut, addToBasket } = makeSut();
        const addToBasketSpy = jest.spyOn(addToBasket, 'add');
        sut.handle(httpRequest);
        expect(addToBasketSpy).toBeCalledWith(httpRequest.body);
    });
    test('Ensure returns 500 if AddToBasket throws', async () => {
        const { sut, addToBasket } = makeSut();
        jest.spyOn(addToBasket, 'add').mockImplementationOnce(() => {
            throw new Error('any_error');
        });
        const response = await sut.handle(httpRequest);
        expect(response).toEqual((0, http_1.serverError)('any_error'));
    });
    test('Ensure returns 200 on success', async () => {
        const { sut } = makeSut();
        const response = await sut.handle(httpRequest);
        expect(response).toEqual((0, http_1.ok)());
    });
});
//# sourceMappingURL=add-to-basket-controller.spec.js.map