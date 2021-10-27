"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (controler) => {
    return async (req, res) => {
        const httpRequest = {
            body: req.body
        };
        const response = await controler.handle(httpRequest);
        if (response.statusCode === 200) {
            res.status(response.statusCode).json(response.body);
        }
        else {
            res.status(response.statusCode).json({
                errod: response.body
            });
        }
    };
};
//# sourceMappingURL=router-adapter.js.map