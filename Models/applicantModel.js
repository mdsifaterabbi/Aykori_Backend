import mongoose from "mongoose";

const applicantsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
    },
    applicantStatus: {
      type: Number, // Set the field type to Number
      default: 0, // Set the default value to 0
    },
  },
  {
    timestamps: true, // Add this line to enable timestamps
  }
);

export default mongoose.model("Applicants", applicantsSchema);
