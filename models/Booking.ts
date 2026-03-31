import { model, models, Schema } from "mongoose";

const BookingSchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
    },
    cabin: {
      type: Schema.Types.ObjectId,
      ref: "Cabin",
      required: true,
    },

    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    studentPhone: {
      type: String,
      required: true,
    },

    plan: {
      type: String,
      enum: ["WEEKLY", "MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"],
      required: true,
    },

    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },

    // normalized time slot
    startTimeInMinutes: {
      type: Number,
      required: true,
    },
    endTimeInMinutes: {
      type: Number,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
    },

    // 🔹 NEW: booking lifecycle
    status: {
      type: String,
      enum: ["HOLD", "ACTIVE", "CANCELLED"],
      default: "HOLD",
    },

    // 🔹 NEW: payment lifecycle
    paymentStatus: {
      type: String,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },

    // 🔹 NEW: pricing & payment trace
    amount: {
      type: Number,
      required: true,
    },

    paymentProvider: {
      type: String,
      default: "MOCK", // later: RAZORPAY
    },

    transactionId: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Booking = models.Booking || model("Booking", BookingSchema);
