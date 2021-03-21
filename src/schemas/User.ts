import mongoose from "mongoose";
import { AddressSchema } from "./Address";

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    index: { unique: true },
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: AddressSchema,
  },
  friends: {
    type: [String],
  },
});
