import { connectDB } from "@/lib/db";
import { Branch } from "@/models/Branch";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, address } = await req.json();

    if (!name || !address) {
      return NextResponse.json(
        { message: "Name and address are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const existingBranch = await Branch.findOne({ name });
    if (existingBranch) {
      return NextResponse.json(
        { message: "Branch already exists" },
        { status: 409 }
      );
    }

    const branch = await Branch.create({ name, address });

    return NextResponse.json(
      {
        message: "Branch created successfully!!",
        branch,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to create branch" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectDB();

    const branches = await Branch.find().sort({ createdAt: -1 });

    return NextResponse.json(branches);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to fetch branches" },
      { status: 500 }
    );
  }
}
