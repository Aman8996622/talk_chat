"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
dotenv_1.default.config({ path: "./config.env" });
// const supabase = createClient(
//   process.env.SUPABASE_URL ?? "",
//   process.env.SUPABASE_KEY ?? ""
// );
// Access the environment variables
// // Create the Supabase client
// const supabase = createClient(supabaseUrl, supabaseKey);
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
console.log(__dirname);
app.use(routes_1.authRoutes);
app.use("/public", express_1.default.static(path_1.default.join(__dirname, "..", "public")));
console.log(path_1.default.join(__dirname, "..", "public"));
// app.use(contactRoutes);
// this is unable the form data to be parsed
app.get("/", (req, res) => {
    res.send("Hello from Express!");
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
});
//# sourceMappingURL=index.js.map