import mongoose from "mongoose";
import Role from "./Role.js";
const PermissionSchema = new mongoose.Schema(
  {
    permission_detail: {
      type: String,
      require: false,
      unique: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
  },
  { timestamps: true }
);
PermissionSchema.pre(/^find/, function (next) {
  this.populate([{ path: "role_id", model: Role }]);
  next();
});
export default mongoose.model("permission", PermissionSchema);
