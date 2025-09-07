import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../utils/db";
import User from "@/models/userModel";
import { sendProjectNumberEmail } from "@/utils/email";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const data = await req.json();
    await connectToDatabase();

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [
        { email: data.email },
        { name: data.name },
        { wallet: data.wallet },
        { phone: data.phone },
      ],
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message:
            "User with provided email, name, wallet, or phone already exists.",
        },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate project number
    const projectNumber = "PRJ-" + Math.floor(Math.random() * 1e6);

    // Create user
    const user = new User({
      ...data,
      password: hashedPassword,
    });

    const savedUser = await user.save();

    // Check if upload (save) was successful
    if (!savedUser || !savedUser._id) {
      return NextResponse.json(
        {
          success: false,
          message: "User registration failed. Please try again.",
        },
        { status: 500 }
      );
    }

    // Send email
    await sendProjectNumberEmail(data.email, projectNumber);

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: savedUser._id,
        email: savedUser.email,
        accountType: savedUser.accountType,
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return NextResponse.json({ success: true, projectNumber, token });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}
