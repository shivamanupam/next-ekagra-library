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
    bookingType: {
      type: String,
      enum: ["TIME_SLOT", "SUBSCRIPTION"],
      required: true,
    },
    plan: {
      type: String,
      enum: [
        // time-slot
        "6H",
        "9H",
        "12H",
        "FULL_DAY",
        // subscription
        "WEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "HALF_YEARLY",
        "YEARLY",
      ],
      required: true,
    },
    // Always present
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    // Only for TIME_SLOT
    startTime: Date,
    endTime: Date,
  },
  { timestamps: true }
);

export const Booking = models.Booking || model("Booking", BookingSchema);
