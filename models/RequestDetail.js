import mongoose from "mongoose";
mongoose.set("strictQuery", false);
import { Schema } from "mongoose";
import DateOfTime from "./DayOffTime.js";
import DateOfType from "./DayOffType.js";
import User from "./User.js";
const RequestSchema = Schema(
  {
    reason: {
      type: String,
      sparse: true,
      required: true,
    },
    quantity: {
      type: String,
      sparse: true,
      required: true,
    },
    start_date: {
      type: String,
      sparse: true,
      required: true,
    },
    end_date: {
      type: String,
      sparse: true,
      required: true,
    },
    action: {
      type: String,
      sparse: true,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    day_off_type_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "day_of_types",
    },
    day_off_time_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "day_of_times",
    },
    status: {
      type: String,
      sparse: true,
      required: true,
    },
    approvers_number: {
      type: String,
      sparse: true,
      required: true,
    },
  },
  { timestamps: true }
);
RequestSchema.pre(/^find/, function (next) {
  this.populate([
    { path: "user_id", model: User },
    { path: "day_off_time_id", model: DateOfTime },
    { path: "day_off_type_id", model: DateOfType },
  ]);
  next();
});
const Request_detail = mongoose.model("request_detail", RequestSchema);
export default Request_detail;
