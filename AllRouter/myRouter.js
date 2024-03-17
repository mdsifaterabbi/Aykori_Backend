import express from "express";
import { createJobController } from "../Controllers/CreateJobController.js";
import {
  createApplicantController,
  deleteApplicantController,
  updateApplicantController,
} from "../Controllers/CreateApplicantController.js";

import formidable from "formidable";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import applicantModel from "../Models/applicantModel.js";
import JobModel from "../Models/JobModel.js";

const router = express.Router();

router.post("/create-job", createJobController);

router.post("/create-applicant", createApplicantController);

router.patch("/update-applicant/:id", updateApplicantController); //for partial update

router.delete("/delete-applicant/:id", deleteApplicantController);

export default router;
