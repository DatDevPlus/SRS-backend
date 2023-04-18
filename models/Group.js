import mongoose from "mongoose";
import User from "./User.js";
const GroupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);
GroupSchema.pre(/^find/, function (next) {
  this.populate([{ path: "user_id", model: User }]);
  next();
});
export default mongoose.model("group", GroupSchema);
