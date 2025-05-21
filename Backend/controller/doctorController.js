import Doctor from "../models/Doctor.js";
import { sendMail } from "../utils/sendMail.js";

// Register new doctor
export const registerDoctor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      specialization,
      experience,
      feesPerConsultation,
    } = req.body;

    // Check if doctor already exists
    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({
        success: false,
        message: "Doctor with this email already exists",
      });
    }

    // Create new doctor
    const doctor = await Doctor.create({
      firstName,
      lastName,
      email,
      phone,
      nic,
      dob,
      gender,
      specialization,
      experience,
      feesPerConsultation,
    });

    // Send email notification
    const subject = "Doctor Registration Successful";
    const text = `Dear ${firstName} ${lastName},\n\nYour registration as a doctor has been received and is pending approval. We will notify you once your account is approved.\n\nBest regards,\nHospital Management System`;

    await sendMail(email, subject, text);

    res.status(201).json({
      success: true,
      message: "Doctor registered successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in registerDoctor:", error);
    res.status(500).json({
      success: false,
      message: "Error registering doctor",
      error: error.message,
    });
  }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  try {
    console.log('Fetching all doctors...');
    const doctors = await Doctor.find().sort({ createdAt: -1 });
    console.log('Found doctors:', doctors);
    
    res.status(200).json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.error("Error in getAllDoctors:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctors",
      error: error.message,
    });
  }
};

// Get single doctor
export const getDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      doctor,
    });
  } catch (error) {
    console.error("Error in getDoctor:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching doctor",
      error: error.message,
    });
  }
};

// Update doctor status
export const updateDoctorStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const doctor = await Doctor.findById(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    doctor.status = status;
    await doctor.save();

    // Send email notification
    const subject = "Doctor Registration Status Updated";
    const text = `Dear ${doctor.firstName} ${doctor.lastName},\n\nYour registration status has been updated to: ${status}\n\nBest regards,\nHospital Management System`;

    await sendMail(doctor.email, subject, text);

    res.status(200).json({
      success: true,
      message: "Doctor status updated successfully",
      doctor,
    });
  } catch (error) {
    console.error("Error in updateDoctorStatus:", error);
    res.status(500).json({
      success: false,
      message: "Error updating doctor status",
      error: error.message,
    });
  }
};

// Delete doctor
export const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    await doctor.deleteOne();

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    console.error("Error in deleteDoctor:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting doctor",
      error: error.message,
    });
  }
}; 