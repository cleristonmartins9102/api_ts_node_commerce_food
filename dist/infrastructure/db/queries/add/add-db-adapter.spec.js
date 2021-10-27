"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const add_db_adapter_1 = require("./add-db-adapter");
const mockQuery = jest.fn();
jest.mock('mysql', () => ({
    createConnection: () => ({
        query: mockQuery.mockImplementation((sql, data, callback) => {
            callback(null, ['success']);
        })
    })
}));
const makeSut = () => {
    const sut = new add_db_adapter_1.AddDbAdapter();
    return {
        sut
    };
};
describe('Add Db Adapter', () => {
    test('Ensure AddDbAdapter returns error if Mysql throws', async () => {
        const { sut } = makeSut();
        mockQuery.mockImplementationOnce((sql, data, callback) => {
            callback(new Error());
        });
        await expect(sut.add({ idProduct: 2 }, 'Basket')).rejects.toThrow();
    });
    test('Ensure AddDbAdapter returns success when mysql success', async () => {
        const { sut } = makeSut();
        await expect(sut.add({ idProduct: 2 }, 'Basket')).resolves;
    });
});
//# sourceMappingURL=add-db-adapter.spec.js.map