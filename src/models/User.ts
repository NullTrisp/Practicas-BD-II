import mongoose from "mongoose";
import { UserSchema } from "../schemas/User";

export const UserModel = mongoose.model("User", UserSchema);


