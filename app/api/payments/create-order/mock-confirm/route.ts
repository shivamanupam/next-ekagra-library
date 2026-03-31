import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";

export async function POST(req: Request) {
  try {
    const { bookingId, success } = await req.json();

    if (!bookingId || typeof success !== "boolean") {
      return NextResponse.json(
        { message: "bookingId and success flag required" },
        { status: 400 }
      );
    }

    await connectDB();

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    if (booking.status !== "HOLD") {
      return NextResponse.json(
        { message: "Booking already processed" },
        { status: 409 }
      );
    }

    if (success) {
      booking.status = "ACTIVE";
      booking.paymentStatus = "PAID";
    } else {
      booking.status = "CANCELLED";
      booking.paymentStatus = "FAILED";
    }

    await booking.save();

    return NextResponse.json({
      message: success ? "Payment successful" : "Payment failed",
      bookingId: booking._id,
      status: booking.status,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Mock payment failed" },
      { status: 500 }
    );
  }
}
