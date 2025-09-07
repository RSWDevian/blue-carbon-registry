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

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Generate project number
    const projectNumber = "PRJ-" + Math.floor(Math.random() * 1e6);

    // Create default project
    const defaultProject = {
      projectNumber,
      projectName: "Default Project",
      projectDescription: "Initial project",
      projectStatus: "active",
      projectStartDate: new Date(),
      projectEndDate: new Date(),
    };

    // Create user
    const user = new User({
      ...data,
      password: hashedPassword,
      projects: [defaultProject],
    });

    await user.save();

    // Send email
    await sendProjectNumberEmail(data.email, projectNumber);

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, accountType: user.accountType },
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
