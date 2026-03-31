import { getPlanAmount } from "@/lib/pricing";
import { Booking } from "@/models/Booking";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { bookingId } = await req.json();

  const booking = await Booking.findById(bookingId);

  if (!booking || booking.status !== "PENDING_PAYMENT") {
    return NextResponse.json(
      {
        message: "Invalid Booking",
      },
      { status: 400 }
    );
  }

  const amount = getPlanAmount(booking.plan);

  // ⛔ gateway code comes NEXT step

  return NextResponse.json({
    bookingId: `mock_order_${Date.now()}`,
    amount,
    currency: "INR",
  });
}
