import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaVenusMars, FaStethoscope, FaClock, FaMoneyBillWave } from "react-icons/fa";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    specialization: "",
    experience: "",
    feesPerConsultation: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.lastName) newErrors.lastName = "Last name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!formData.nic) newErrors.nic = "NIC is required";
    else if (!/^\d{12}$/.test(formData.nic)) newErrors.nic = "NIC must be 12 digits";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.specialization) newErrors.specialization = "Specialization is required";
    if (!formData.experience) newErrors.experience = "Experience is required";
    else if (formData.experience < 0) newErrors.experience = "Experience cannot be negative";
    if (!formData.feesPerConsultation) newErrors.feesPerConsultation = "Fees per consultation is required";
    else if (formData.feesPerConsultation < 0) newErrors.feesPerConsultation = "Fees cannot be negative";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/doctor/register",
        formData,
        {
          withCredentials: true,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }
      );
      if (response.data.success) {
        toast.success("Registration successful! Please wait for admin approval.");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error registering doctor:", error);
      toast.error(error.response?.data?.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  return (
    <div className="doctor-register-container">
      <div className="doctor-register-form-wrapper">
        <div className="doctor-register-header">
          <h1>Doctor Registration</h1>
          <p>Join our team of healthcare professionals</p>
        </div>
        <form onSubmit={handleSubmit} className="doctor-register-form">
          <div className="form-section">
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={errors.firstName ? "error" : ""}
                  />
                </div>
                {errors.firstName && <span className="error-text">{errors.firstName}</span>}
              </div>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={errors.lastName ? "error" : ""}
                  />
                </div>
                {errors.lastName && <span className="error-text">{errors.lastName}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaEnvelope className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "error" : ""}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                  />
                </div>
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaIdCard className="input-icon" />
                  <input
                    type="text"
                    name="nic"
                    placeholder="NIC Number"
                    value={formData.nic}
                    onChange={handleChange}
                    className={errors.nic ? "error" : ""}
                  />
                </div>
                {errors.nic && <span className="error-text">{errors.nic}</span>}
              </div>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? "error" : ""}
                  />
                </div>
                {errors.dob && <span className="error-text">{errors.dob}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaVenusMars className="input-icon" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? "error" : ""}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaStethoscope className="input-icon" />
                  <input
                    type="text"
                    name="specialization"
                    placeholder="Specialization"
                    value={formData.specialization}
                    onChange={handleChange}
                    className={errors.specialization ? "error" : ""}
                  />
                </div>
                {errors.specialization && <span className="error-text">{errors.specialization}</span>}
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaClock className="input-icon" />
                  <input
                    type="number"
                    name="experience"
                    placeholder="Years of Experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={errors.experience ? "error" : ""}
                  />
                </div>
                {errors.experience && <span className="error-text">{errors.experience}</span>}
              </div>
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaMoneyBillWave className="input-icon" />
                  <input
                    type="number"
                    name="feesPerConsultation"
                    placeholder="Fees per Consultation"
                    value={formData.feesPerConsultation}
                    onChange={handleChange}
                    className={errors.feesPerConsultation ? "error" : ""}
                  />
                </div>
                {errors.feesPerConsultation && <span className="error-text">{errors.feesPerConsultation}</span>}
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`submit-button ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegister; 