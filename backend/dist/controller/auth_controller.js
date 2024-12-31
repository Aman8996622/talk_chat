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
exports.signUp = signUp;
exports.login = login;
const db_config_1 = require("../config/db_config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dir_name_1 = require("../core/dir/dir_name");
const bcrypt_1 = __importDefault(require("bcrypt"));
function signUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        console.log("request body", req.body, req.headers);
        // Parse the request body and cast it to User type after validation
        const requestBody = req.body;
        try {
            // Check if user already exists with the provided phone number
            const { data: existingUser, error: userError } = yield db_config_1.CustomSupabase.from("user")
                .select()
                .eq("email", (_a = requestBody === null || requestBody === void 0 ? void 0 : requestBody.email) !== null && _a !== void 0 ? _a : "")
                .maybeSingle(); // Use maybeSingle() instead of single()
            if (userError && userError.code !== "PGRST116") {
                // Ignore PGRST116 error
                res.status(500).json({
                    status: "0",
                    error: "Error checking existing user",
                });
                console.log("user Error", userError);
                return;
            }
            if (existingUser) {
                res.status(200).json({
                    status: "0",
                    message: "User with this email already exists",
                });
                return;
            }
            // const crptPassword = await bcrypt.hash(requestBody.password, 10);
            const crptPassword = yield bcrypt_1.default.hash(requestBody.password, 10);
            console.log(crptPassword);
            // Create new user
            const { data: newUser, error: createError } = yield db_config_1.CustomSupabase.from("user")
                .insert([
                {
                    first_name: requestBody.firstName,
                    last_name: requestBody.lastName,
                    email: requestBody.email,
                    password: crptPassword, // Note: Should hash password before storing
                    profile_image: req.file
                        ? `${process.env.BASE_URL}${dir_name_1.UploadDir.USER_PROFILE}/${req.file.filename}`
                        : null,
                    phone_number: requestBody.phone,
                },
            ])
                .select()
                .single();
            if (createError) {
                console.log("create Error", createError);
                res.status(500).json({ error: "Error creating user" });
                return;
            }
            if (!newUser) {
                res.status(500).json({ error: "Failed to create user" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: newUser.id,
                email: newUser.email,
            }, (_b = process.env.JWT_SECRET) !== null && _b !== void 0 ? _b : "", {
                expiresIn: "7d",
            });
            res.status(200).json({
                message: "User created successfully",
                user: newUser,
                token: token,
            });
        }
        catch (error) {
            console.error("SignUp error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log("request body", req.body);
        var _a;
        try {
            console.log("request", req.headers);
            // For form-data, we need to access the fields directly
            const email = req.body.email;
            const password = req.body.password;
            console.log("Form data received:", {
                email: email,
                password: password,
            });
            if (!email || !password) {
                res.status(400).json({ error: "Email and password are required" });
                return;
            }
            const { data: user, error } = yield db_config_1.CustomSupabase.from("user")
                .select("*")
                .eq("email", email)
                .single();
            if (error || !user) {
                console.log("Database error:", error);
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const isValidPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!isValidPassword) {
                res.status(401).json({ error: "Invalid credentials" });
                return;
            }
            const token = jsonwebtoken_1.default.sign({
                id: user.id,
                email: user.email,
                phone: user.phone_number,
            }, (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "", {
                expiresIn: "7d",
            });
            res.status(200).json({
                message: "Login successful",
                user,
                token,
            });
        }
        catch (error) {
            console.error("Login error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
//# sourceMappingURL=auth_controller.js.map