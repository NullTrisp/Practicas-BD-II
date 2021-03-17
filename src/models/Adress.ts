import mongoose from "mongoose";
import { AddressSchema } from "../schemas/Address";

export const AddressModel = mongoose.model("Adress", AddressSchema);
