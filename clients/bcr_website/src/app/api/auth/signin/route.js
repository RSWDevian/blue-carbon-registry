import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/db";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  const data = await req.json();
  await connectToDB();

  // Find user by email
  const user = await User.findOne({ email: data.email });
  if (!user) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  // Compare password
  const isMatch = await bcrypt.compare(data.password, user.password);
  if (!isMatch) {
    return NextResponse.json({ success: false, message: "Invalid credentials" }, { status: 401 });
  }

  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, email: user.email, accountType: user.accountType },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      accountType: user.accountType,
      projects: user.projects,
    },
  });
}