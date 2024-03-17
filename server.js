// MongoDb database information
// user: user01
// password: 2ihytzrY3jixRUPJ
//database name: Aykori
//model name: Jobs

import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import router from "./AllRouter/myRouter.js";
import connectDB from "./Config/db.js";
import bodyParser from "body-parser";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import multer from "multer";
import mongoose from "mongoose";

//configure dotenv
dotenv.config();

//database connection here
connectDB();

const PORT = process.env.PORT || 4000;

//middlewares
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", router);

app.listen(PORT, () => {
  console.log(`Aykori Express Server app listening on port ${PORT}`);
});
