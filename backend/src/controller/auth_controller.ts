import { CustomSupabase } from "../config/db_config";
import jwt from "jsonwebtoken";

import { Request, Response } from "express";

import bcrypt from "bcrypt";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profile_image: string;
  phone: string;
}

export async function signUp(req: Request, res: Response): Promise<void> {
  console.log("request body", req.body, req.headers);

  // Parse the request body and cast it to User type after validation
  const requestBody = req.body as unknown as User;

  try {
    // Check if user already exists with the provided phone number
    const { data: existingUser, error: userError } = await CustomSupabase.from(
      "user"
    )
      .select()
      .eq("email", requestBody?.email ?? "")
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
    const crptPassword = await bcrypt.hash(requestBody.password, 10);
    console.log(crptPassword);

    // Create new user
    const { data: newUser, error: createError } = await CustomSupabase.from(
      "user"
    )
      .insert([
        {
          first_name: requestBody.firstName,
          last_name: requestBody.lastName,
          email: requestBody.email,
          password: crptPassword, // Note: Should hash password before storing
          profile_image: req.file
            ? `${process.env.BASE_URL}/public/images/${req.file.filename}`
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

    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET ?? "",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "User created successfully",
      user: newUser,
      token: token,
    });
  } catch (error) {
    console.error("SignUp error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
interface LoginUser {
  email: string;
  password: string;
}

export async function login(req: Request, res: Response): Promise<void> {
  // console.log("request body", req.body);

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

    const { data: user, error } = await CustomSupabase.from("user")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !user) {
      console.log("Database error:", error);
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        phone: user.phone_number,
      },
      process.env.JWT_SECRET ?? "",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
