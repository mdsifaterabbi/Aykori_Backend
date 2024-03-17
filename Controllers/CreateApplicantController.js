import express from "express";
import formidable from "formidable";
import bodyParser from "body-parser";
import fs from "fs";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";
import JobModel from "../Models/JobModel.js";
import applicantModel from "../Models/applicantModel.js";

export const createApplicantController = async (req, res) => {
  try {
    const { name, email, phone, slug } = req.body;

    //verify here if slug is available in the JobModel or not
    const existingSlug = await JobModel.findOne({ slug });

    if (!existingSlug) {
      return res.send({
        message: "No slug available in the JobModel",
      });
    }

    //=============== avoid duplicate appliaction for the same post again and again
    const applicant = await applicantModel.findOne({
      email: email,
      slug: slug,
    });

    if (applicant) {
      return res.send({
        message: "You already applied for this post",
      });
    }

    const applicantStatus = 0;

    //now add to the Applicants model in the databse
    const newApplicant = new applicantModel({
      name,
      email,
      phone,
      slug,
      applicantStatus,
    });

    // Save the image data to MongoDB
    newApplicant.save();

    res.send({
      success: true,
      message: "createApplicantController is working",
      name,
      email,
      phone,
      slug,
      applicantStatus,
      data: newApplicant,
    });
  } catch (error) {
    console.log(error);
  }
};

//update applicant implementation
export const updateApplicantController = async (req, res) => {
  try {
    const id = req.params.id;
    const updates = req.body;

    const updateObject = {}; // Create an empty object for updates

    // Add only existing fields form the req.body to the update object
    if ("name" in updates) {
      updateObject.name = updates.name;
    }
    if ("phone" in updates) {
      updateObject.phone = updates.phone;
    }

    if ("applicantStatus" in updates) {
      updateObject.applicantStatus = updates.applicantStatus;
    }

    //dont update email or slug
    if ("email" in updates) {
      return res.send({
        success: false,
        message: "You can not change email",
      });
    }

    if ("slug" in updates) {
      return res.send({
        success: false,
        message: "You can not change slug",
      });
    }

    //Update the applicant document using findByIdAndUpdate
    const updatedApplicant = await applicantModel.findByIdAndUpdate(
      id,
      { $set: updateObject }, // Use $set operator for partial update
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedApplicant) {
      return res.send({
        success: false,
        message: "Applicant not found",
      });
    }

    res.send({
      success: true,
      message: "You are in updateApplicantController",
      id,
      data: updatedApplicant,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteApplicantController = async (req, res) => {
  try {
    const id = req.params.id;

    const deletedApplicant = await applicantModel.findByIdAndDelete(id);

    if (!deletedApplicant) {
      return res.send({
        success: false,
        message: "No applicant found with that id to delete",
      });
    }

    res.send({
      success: true,
      messsage: "You are in deleteApplicantController",
      id,
      deletedData: deletedApplicant,
    });
  } catch (error) {
    console.log(error);
  }
};
