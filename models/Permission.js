import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    permission_detail: {
      type: String,
      require: false,
      unique: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
  },
  { timestamps: true }
);
PermissionSchema.pre(/^find/, function (next) {
    this.populate({
      path: "Role",
    });
    next();
  });
export default mongoose.model("Permission", PermissionSchema);