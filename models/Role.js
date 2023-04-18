import mongoose from "mongoose";
import Permission from "./Permission.js";
const RoleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      require: false,
      unique: true,
    },
    description: {
      type: String,
      require: false,
    },
    permission_id: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "permission",
      },
    ],
  },
  { timestamps: true }
);
RoleSchema.pre(/^find/, function (next) {
  this.populate([{ path: "permission_id", model: Permission }]);
  next();
});
export default mongoose.model("role", RoleSchema);
