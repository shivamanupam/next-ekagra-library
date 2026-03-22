import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models/Admin";

async function createAdmin() {
  await connectDB();

  const email = "admin@library.com";
  const password = "admin123";

  const hashedPassword = await bcrypt.hash(password, 10);

  const adminExists = await Admin.findOne({ email });

  if (adminExists) {
    console.log("Admin already exists");
    return;
  }

  await Admin.create({
    email,
    password: hashedPassword,
  });

  console.log("Admin created successfully");
}

createAdmin();
