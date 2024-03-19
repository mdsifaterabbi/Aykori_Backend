import JobModel from "../Models/JobModel.js";
import slugify from "slugify";

export const createJobController = async (req, res) => {
  try {
    const { jobTitle, jobDescription } = req.body;

    if (!jobTitle) {
      return res.send({
        message: "jobTitle is required",
      });
    }
    if (!jobDescription) {
      return res.send({
        message: "jobDescription is required",
      });
    }

    //checking exissting job
    const existingJobTitle = await JobModel.findOne({ jobTitle });

    if (existingJobTitle) {
      return res.send({
        message: "this jobTitle already exists.",
      });
    }

    const job = new JobModel({
      jobTitle,
      slug: slugify(jobTitle),
      jobDescription,
    });

    job.save();

    res.send({
      success: true,
      message: "job created in createJobController successfully",
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

//get all jobs
export const getAllJobsController = async (req, res) => {
  try {
    const { limit = 5, sort = "-createdAt" } = req.query; // Get query parameters

    const allJobs = await JobModel.find({}); //here we find all jobs

    const recentJobs = await JobModel.find({}, null, {
      // Use options for sorting and limit
      sort: sort,
      limit: parseInt(limit),
    });

    res.send({
      success: true,
      message: "All Category list",
      allJobs,
      recentJobs,
    });
  } catch (error) {
    console.log(error);
    res.send({
      success: false,
      message: "Error occurred in getAllJobsController",
      error,
    });
  }
};
