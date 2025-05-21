import express from "express";
import {
  registerDoctor,
  getAllDoctors,
  getDoctor,
  updateDoctorStatus,
  deleteDoctor,
} from "../controller/doctorController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Public routes
router.post("/register", registerDoctor);
router.get("/all", getAllDoctors);
router.get("/:id", getDoctor);

// Admin only routes
router.put("/:id/status", isAdminAuthenticated, updateDoctorStatus);
router.delete("/:id", isAdminAuthenticated, deleteDoctor);

export default router; 