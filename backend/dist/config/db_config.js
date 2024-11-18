"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSupabase = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: "./config.env" });
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
// Validate if Supabase URL and key are available
if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase URL or key is missing in environment variables.");
}
else {
    console.log("Supabase URL:", supabaseUrl);
    console.log("Supabase Key:", supabaseKey);
}
const supabase = (0, supabase_js_1.createClient)((_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : "", (_b = process.env.SUPABASE_KEY) !== null && _b !== void 0 ? _b : "");
exports.CustomSupabase = supabase;
console.log("Given supabase is connected");
//# sourceMappingURL=db_config.js.map