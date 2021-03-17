import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});
