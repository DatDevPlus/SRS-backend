import mongoose from "mongoose";

const Day_of_typeSchema = new mongoose.Schema(
  {
    name: {
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

export default mongoose.model("Day_of_Type", Day_of_typeSchema);
