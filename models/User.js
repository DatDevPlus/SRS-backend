import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    group_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
    },
  },
  { timestamps: true }
);
UserSchema.pre(/^find/, function (next) {
  this.populate({
    path: "Role",
    path: "Group",
  });
  next();
});
export default mongoose.model("User", UserSchema);
