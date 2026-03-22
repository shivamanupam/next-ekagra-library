import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  const email = "admin@library.com";
  const password = "admin123";

  const existingAdmin = await Admin.findOne({ email });

  if (existingAdmin) {
    return NextResponse.json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Admin.create({
    email,
    password: hashedPassword,
  });

  return NextResponse.json({ message: "Admin created successfully" });
}
