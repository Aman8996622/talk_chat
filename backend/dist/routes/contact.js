"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRoutes = void 0;
const express_1 = require("express");
const verify_token_1 = __importDefault(require("../utils/verify_token"));
const contact_controller_1 = require("../controller/contact_controller");
const routes = (0, express_1.Router)();
exports.contactRoutes = routes;
routes.post("/getContactList", verify_token_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, contact_controller_1.getContactsList)(req, res);
}));
//# sourceMappingURL=contact.js.map