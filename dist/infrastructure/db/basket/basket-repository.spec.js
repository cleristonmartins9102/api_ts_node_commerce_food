"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const basket_repositoy_1 = require("./basket-repositoy");
const makeAddDbAdapterStub = () => {
    class AddDbAdapterStub {
        async add(data, tableName) {
            return Promise.resolve();
        }
    }
    return new AddDbAdapterStub();
};
const makeSut = () => {
    const addToDataBase = makeAddDbAdapterStub();
    const sut = new basket_repositoy_1.BasketRepository(addToDataBase);
    return {
        sut,
        addToDataBase
    };
};
const productModel = {
    idProduct: 1
};
describe('Basket Repository', () => {
    test('Ensure BasketRepository calls AddDbAdapter with correct value', () => {
        const { sut, addToDataBase } = makeSut();
        const addToDataBaseSpy = jest.spyOn(addToDataBase, 'add');
        sut.add(productModel);
        expect(addToDataBaseSpy).toBeCalledWith(productModel, 'Basket');
    });
    test('Ensure BasketRepository returns error if AddToDataBase throws', async () => {
        const { sut, addToDataBase } = makeSut();
        jest.spyOn(addToDataBase, 'add').mockImplementationOnce(() => {
            throw new Error();
        });
        await expect(sut.add(productModel)).rejects.toThrow();
    });
});
//# sourceMappingURL=basket-repository.spec.js.map