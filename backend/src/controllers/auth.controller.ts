import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../db/prisma.js";

interface SignupResponse {
  id?: string;
  email?: string;
  error?: string;
}

interface LoginResponse {
  id?: string;
  email?: string;
  error?: string;
}

export const signup = async (req: Request, res: Response<SignupResponse>) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords don't match" });
    }

    // check if user already exists
    const user = await prisma.user.findUnique({ where: { email } });
    if (user) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    if (newUser) {
      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error: any) {
    console.log("error in signup controller", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response<LoginResponse>) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(400).json({ error: "Email not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Wrong password" });
    }

    res.status(200).json({
      id: user.id,
      email: user?.email,
    });
  } catch (error: any) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
