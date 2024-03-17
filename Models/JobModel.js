import mongoose from "mongoose";

const jobsSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add this line to enable timestamps
  }
);

export default mongoose.model("Jobs", jobsSchema);
