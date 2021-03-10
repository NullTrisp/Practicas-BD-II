import mongoose from "mongoose";
import { PostSchema } from "../schemas/Post";

export const PostModel = mongoose.model("Post", PostSchema);
