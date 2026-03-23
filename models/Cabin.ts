import { model, models, Schema } from "mongoose";

const CabinSchema = new Schema(
  {
    branch: {
      type: Schema.Types.ObjectId,
      ref: "Branch",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    capacity: {
      type: Number,
      default: 1,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

CabinSchema.index({ branch: 1, name: 1 }, { unique: true });

export const Cabin = models.Cabin || model("Cabin", CabinSchema);
