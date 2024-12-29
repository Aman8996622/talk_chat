"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function verifyToken(req, res, next) {
    var _a, _b;
    if (req.headers.hasOwnProperty("authorization")) {
        let token = (_b = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) !== null && _b !== void 0 ? _b : "";
        //  console.log(token);
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = {
            id: decoded.id, // Add user id from the token
            email: decoded.email,
            phone: decoded.phone,
        };
        next();
    }
    else {
        res.send({
            message: "invalid token",
        });
    }
}
//# sourceMappingURL=verify_token.js.map