import mongoose from "mongoose";

const Day_of_timeSchema = new mongoose.Schema(
  {
    Time_detail: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("day_of_time", Day_of_timeSchema);
