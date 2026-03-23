import { connectDB } from "@/lib/db";
import { Branch } from "@/models/Branch";
import { Cabin } from "@/models/Cabin";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ branchId: string }> }
) {
  try {
    const { name, capacity } = await req.json();

    const { branchId } = await params;

    if (!name) {
      return NextResponse.json(
        { message: "Cabin name is required" },
        { status: 400 }
      );
    }

    await connectDB();
    const branchExists = await Branch.findById(branchId);

    if (!branchExists) {
      return NextResponse.json(
        { message: "Branch not found" },
        { status: 404 }
      );
    }

    const cabin = await Cabin.create({
      branch: branchId,
      name,
      capacity,
    });

    return NextResponse.json(
      { message: "Cabin created", cabin },
      { status: 201 }
    );
  } catch (err: any) {
    console.log(err);
    // Handle duplicate cabin name per branch
    if (err.code === 11000) {
      return NextResponse.json(
        { message: "Cabin already exists in this branch" },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create cabin" },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ branchId: string }> }
) {
  try {
    const { branchId } = await params;

    await connectDB();

    const cabins = await Cabin.find({
      branch: branchId,
      isActive: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json(cabins);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to fetch cabins" },
      { status: 500 }
    );
  }
}
