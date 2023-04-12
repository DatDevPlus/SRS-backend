import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema(
  {
    reason: {
      type: String,
      require: false,
      unique: true,
    },
    quantity: {
      type: String,
      require: false,
      unique: true,
    },
    start_date: {
      type: String,
      require: false,
      unique: true,
    },
    end_date: {
      type: String,
      require: false,
      unique: true,
    },
    action: {
      type: String,
      require: false,
      unique: true,
    },
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    // },
    // day_off_type_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Day_of_Type",
    // },
    // day_off_time_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Day_of_Time",
    // },
    status: {
      type: String,
      require: false,
      unique: true,
    },
    approvers_number: {
      type: String,
      require: false,
      unique: true,
    },
  },
  { timestamps: true }
);
// RequestSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "User",
//     path: "Day_of_Time",
//     path: "Day_of_Type",
//   });
//   next();
// });

export default mongoose.model("Request_detail", RequestSchema);
