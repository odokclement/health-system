import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  gender: String,
  contactNumber: String,
  address: String,
  registrationDate: { type: Date, default: Date.now },
  enrolledPrograms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Program" }]
});

export const Client = mongoose.models.Client || mongoose.model("Client", clientSchema);
