import mongoose from "mongoose";

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
    permission_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Permission",
    },
  },
  { timestamps: true }
);
RoleSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Permission",
  });
  next();
});
export default mongoose.model("Role", RoleSchema);
