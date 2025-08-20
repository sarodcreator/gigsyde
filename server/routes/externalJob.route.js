// routes/externalJob.route.js
import express from "express";
import { getExternalJobs } from "../controllers/externalJob.controller.js";

const externalJobs = express.Router();

externalJobs.get("/jobs", getExternalJobs);

export default externalJobs;