import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  wallet: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  projects: [
    {
      projectNumber: { type: String },
      projectName: { type: String },
      projectDescription: { type: String },
      projectStatus: { type: String },
      projectStartDate: { type: Date },
      projectEndDate: { type: Date },
    },
  ],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
