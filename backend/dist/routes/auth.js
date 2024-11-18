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
exports.authRoutes = void 0;
const express_1 = require("express");
const upload_1 = __importDefault(require("../core/upload"));
const upload_middleware_1 = require("../middleware/upload_middleware");
const auth_controller_1 = require("../controller/auth_controller");
const routes = (0, express_1.Router)();
exports.authRoutes = routes;
routes.post("/signUp", (0, upload_middleware_1.setUploadPath)("./public/images/user_profile"), upload_1.default.single("profile_image"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_1.signUp)(req, res);
}));
routes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, auth_controller_1.login)(req, res);
}));
//# sourceMappingURL=auth.js.map