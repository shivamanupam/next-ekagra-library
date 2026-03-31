import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const now = new Date();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const [
      totalBookings,
      activeBookings,
      todayBookings,
      paidBookings,
      occupiedCabins,
    ] = await Promise.all([
      Booking.countDocuments(),
      Booking.countDocuments({ status: "ACTIVE" }),
      Booking.countDocuments({
        createdAt: { $gte: todayStart, $lte: todayEnd },
      }),
      Booking.countDocuments({ paymentStatus: "PAID" }).select("plan"),
      Booking.countDocuments({
        status: "ACTIVE",
        startDate: { $lte: now },
        endDate: { $gte: now },
      }),
    ]);
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to load dashboard stats" },
      { status: 500 }
    );
  }
}
