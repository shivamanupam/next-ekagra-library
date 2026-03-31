import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Booking } from "@/models/Booking";
import { Branch } from "@/models/Branch";
import { Cabin } from "@/models/Cabin";

const expiresAt = new Date();
expiresAt.setMinutes(expiresAt.getMinutes() + 15);

const LIBRARY_OPEN_HOUR = 7;
const LIBRARY_CLOSE_HOUR = 22;

const PLAN_TO_DURATION: Record<string, { days?: number; months?: number }> = {
  WEEKLY: { days: 7 },
  MONTHLY: { months: 1 },
  QUARTERLY: { months: 3 },
  HALF_YEARLY: { months: 6 },
  YEARLY: { months: 12 },
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await Booking.updateMany(
      {
        status: "HOLD",
        expiresAt: { $lt: new Date() },
      },
      {
        status: "CANCELLED",
        paymentStatus: "FAILED",
      }
    );

    const {
      branchId,
      cabinId,
      studentName,
      studentPhone,
      plan,
      startDate,
      startTime,
      endTime,
    } = body;

    // 1️⃣ Required field validation
    if (
      !branchId ||
      !cabinId ||
      !studentName ||
      !studentPhone ||
      !plan ||
      !startDate ||
      !startTime ||
      !endTime
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // 2️⃣ Basic sanity check (time order)
    if (startTime >= endTime) {
      return NextResponse.json(
        { message: "startTime must be before the end time" },
        { status: 400 }
      );
    }

    //Validate plan
    const duration = PLAN_TO_DURATION[plan];
    if (!duration) {
      return NextResponse.json({ message: "Invalid plan" }, { status: 400 });
    }

    //Normalize dates
    const startDateObj = new Date(startDate);
    startDateObj.setHours(0, 0, 0, 0);

    const endDateObj = new Date(startDateObj);

    if (duration.days) {
      endDateObj.setDate(endDateObj.getDate() + duration.days);
    }

    if (duration.months) {
      endDateObj.setMonth(endDateObj.getMonth() + duration.months);
    }

    // 4️⃣ Normalize time (daily slot)
    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const newStartMinutes = startHour * 60 + startMinute;
    const newEndMinutes = endHour * 60 + endMinute;

    const conflictingBooking = await Booking.findOne({
      branch: branchId,
      cabin: cabinId,

      // Only ACTIVE or valid HOLD bookings
      $or: [
        { status: "ACTIVE" },
        {
          status: "HOLD",
          expiresAt: { $gt: new Date() },
        },
      ],

      // DATE OVERLAP
      startDate: { $lt: endDateObj },
      endDate: { $gt: startDateObj },

      // TIME OVERLAP
      $expr: {
        $and: [
          { $lt: ["$startTimeInMinutes", newEndMinutes] },
          { $gt: ["$endTimeInMinutes", newStartMinutes] },
        ],
      },
    });

    if (conflictingBooking) {
      return NextResponse.json(
        {
          message: "Cabin already booked for this time slot",
        },
        { status: 409 }
      );
    }

    // 5️⃣ Library hours validation
    if (
      startHour < LIBRARY_OPEN_HOUR ||
      endHour > LIBRARY_CLOSE_HOUR ||
      (endHour === LIBRARY_CLOSE_HOUR && endMinute > 0)
    ) {
      return NextResponse.json(
        { message: "Time slot outside library hours (7AM–10PM)" },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      branch: branchId,
      cabin: cabinId,

      studentName,
      studentPhone,

      plan, // WEEKLY / MONTHLY / etc.

      startDate: startDateObj,
      endDate: endDateObj,

      startTime,
      endTime,

      startTimeInMinutes: newStartMinutes,
      endTimeInMinutes: newEndMinutes,

      status: "HOLD",
      paymentStatus: "PENDING",
      expiresAt,
    });

    // TEMP RESPONSE
    return NextResponse.json(
      {
        message: "Booking confirmed",
        bookingId: booking._id,
      },
      { status: 201 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "Failed to create booking" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const branchId = searchParams.get("branchId");
    const cabinId = searchParams.get("cabinId");
    const status = searchParams.get("status");
    const paymentStatus = searchParams.get("paymentStatus");

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 10);
    const skip = (page - 1) * limit;

    // 🔍 Build dynamic filter
    const filter: any = {};

    if (branchId) filter.branch = branchId;
    if (cabinId) filter.cabin = cabinId;
    if (status) filter.status = status;
    if (paymentStatus) filter.paymentStatus = paymentStatus;

    const [bookings, total] = await Promise.all([
      Booking.find(filter)
        .populate("branch", "name")
        .populate("cabin", "name")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      Booking.countDocuments(filter),
    ]);

    return NextResponse.json({
      data: bookings,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
