import express from "express";
import { CustomSupabase } from "./config/db_config";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser = require("body-parser");

import { authRoutes } from "./routes";

dotenv.config({ path: "./config.env" });

// const supabase = createClient(
//   process.env.SUPABASE_URL ?? "",
//   process.env.SUPABASE_KEY ?? ""
// );

// Access the environment variables

// // Create the Supabase client
// const supabase = createClient(supabaseUrl, supabaseKey);
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);

// this is unable the form data to be parsed

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;
});
