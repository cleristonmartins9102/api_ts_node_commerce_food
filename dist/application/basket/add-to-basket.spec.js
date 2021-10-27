"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_to_basket_1 = require("./add-to-basket");
const makeProductModel = {
    idProduct: 1
};
const makeBasketMysqlRepositoryStub = () => {
    class BasketMysqlRepository {
        async add(product) {
            return Promise.resolve(null);
        }
    }
    return new BasketMysqlRepository();
};
const makeSut = () => {
    const addToBasketRepo = makeBasketMysqlRepositoryStub();
    const sut = new add_to_basket_1.AddToBasket(addToBasketRepo);
    return {
        sut,
        addToBasketRepo
    };
};
const productModel = {
    idProduct: 1
};
describe('Add To Basket', () => {
    test('Ensure AddToBasket call BasketMysqlRepository with correct value', () => {
        const { sut, addToBasketRepo } = makeSut();
        const basketRepoSpy = jest.spyOn(addToBasketRepo, 'add');
        sut.add(productModel);
        expect(basketRepoSpy).toBeCalledWith(productModel);
    });
    test('Ensure AddToBasket returns error if BasketMysqlRepository throws', async () => {
        const addToBasketRepo = makeBasketMysqlRepositoryStub();
        jest.spyOn(addToBasketRepo, 'add').mockImplementationOnce(() => {
            throw new Error();
        });
        const sut = new add_to_basket_1.AddToBasket(addToBasketRepo);
        await expect(sut.add(productModel)).rejects.toThrow();
    });
});
//# sourceMappingURL=add-to-basket.spec.js.map