import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
  {
    userId: String,
    address: String,
    city: String,
    postCode: String,
    phone: String,
    notes: String,
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", AddressSchema);
