import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaPhone, FaIdCard, FaCalendarAlt, FaVenusMars, FaHospital, FaUserMd, FaMapMarkerAlt, FaHistory } from "react-icons/fa";

const AppointmentForm = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    nic: "",
    dob: "",
    gender: "",
    appointmentDate: "",
    department: "Pediatrics",
    doctorFirstName: "",
    doctorLastName: "",
    hasVisited: false,
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  // Fetch doctors and set user data when component mounts
  React.useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);

        // If user is logged in, pre-fill their data
        if (user) {
          // Format the date of birth to YYYY-MM-DD format
          const formattedDob = user.dob ? new Date(user.dob).toISOString().split('T')[0] : "";
          
          setFormData(prev => ({
            ...prev,
            firstName: user.firstName || "",
            lastName: user.lastName || "",
            email: user.email || "",
            phone: user.phone || "",
            nic: user.nic || "",
            dob: formattedDob,
            gender: user.gender || "",
            address: user.address || ""
          }));
        }
      } catch (error) {
        toast.error("Failed to fetch doctors");
      }
    };

    fetchDoctors();
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    Object.keys(formData).forEach(key => {
      if (key !== 'hasVisited' && !formData[key]) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (10 digits)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must contain exactly 10 digits";
    }

    // NIC validation (13 digits)
    if (formData.nic && !/^\d{13}$/.test(formData.nic)) {
      newErrors.nic = "NIC must contain exactly 13 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/appointment/post",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="appointment-container">
      <div className="appointment-form-wrapper">
        <div className="appointment-header">
          <h1>Book an Appointment</h1>
          <p>Please fill out the form below to schedule your appointment</p>
        </div>

        <form className="appointment-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h2>Personal Information</h2>
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaUser className="input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={errors.firstName ? "error" : ""}
                    readOnly={!!user}
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
                    onChange={handleInputChange}
                    className={errors.lastName ? "error" : ""}
                    readOnly={!!user}
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
                    readOnly={!!user}
                  />
                </div>
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaPhone className="input-icon" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="Mobile Number (10 digits)"
                    value={formData.phone}
                    onChange={handleChange}
                    className={errors.phone ? "error" : ""}
                    maxLength="10"
                    readOnly={!!user}
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
                    placeholder="NIC (13 digits)"
                    value={formData.nic}
                    onChange={handleChange}
                    className={errors.nic ? "error" : ""}
                    maxLength="13"
                    readOnly={!!user}
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
                    placeholder="Date of Birth"
                    value={formData.dob}
                    onChange={handleChange}
                    className={errors.dob ? "error" : ""}
                  />
                </div>
                {errors.dob && <span className="error-text">{errors.dob}</span>}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Appointment Details</h2>
            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaVenusMars className="input-icon" />
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={errors.gender ? "error" : ""}
                    disabled={!!user}
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                {errors.gender && <span className="error-text">{errors.gender}</span>}
              </div>
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaCalendarAlt className="input-icon" />
                  <input
                    type="date"
                    name="appointmentDate"
                    placeholder="Appointment Date"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className={errors.appointmentDate ? "error" : ""}
                  />
                </div>
                {errors.appointmentDate && <span className="error-text">{errors.appointmentDate}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaHospital className="input-icon" />
                  <select
                    name="department"
                    value={formData.department}
                    onChange={(e) => {
                      handleChange(e);
                      setFormData(prev => ({
                        ...prev,
                        doctorFirstName: "",
                        doctorLastName: ""
                      }));
                    }}
                    className={errors.department ? "error" : ""}
                  >
                    {departmentsArray.map((dept, index) => (
                      <option value={dept} key={index}>{dept}</option>
                    ))}
                  </select>
                </div>
                {errors.department && <span className="error-text">{errors.department}</span>}
              </div>
              
              <div className="form-group">
                <div className="input-icon-wrapper">
                  <FaUserMd className="input-icon" />
                  <select
                    name="doctor"
                    value={`${formData.doctorFirstName} ${formData.doctorLastName}`}
                    onChange={(e) => {
                      const [firstName, lastName] = e.target.value.split(" ");
                      setFormData(prev => ({
                        ...prev,
                        doctorFirstName: firstName,
                        doctorLastName: lastName
                      }));
                    }}
                    disabled={!formData.department}
                    className={errors.doctorFirstName ? "error" : ""}
                  >
                    <option value="">Select Doctor</option>
                    {doctors
                      .filter((doctor) => doctor.doctorDepartment === formData.department)
                      .map((doctor, index) => (
                        <option
                          value={`${doctor.firstName} ${doctor.lastName}`}
                          key={index}
                        >
                          Dr. {doctor.firstName} {doctor.lastName}
                        </option>
                      ))}
                  </select>
                </div>
                {errors.doctorFirstName && <span className="error-text">{errors.doctorFirstName}</span>}
              </div>
            </div>

            <div className="form-group">
              <div className="input-icon-wrapper">
                <FaMapMarkerAlt className="input-icon" />
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className={errors.address ? "error" : ""}
                  rows="3"
                  readOnly={!!user}
                />
              </div>
              {errors.address && <span className="error-text">{errors.address}</span>}
            </div>

            <div className="form-group checkbox-group">
              <div className="input-icon-wrapper">
                <FaHistory className="input-icon" />
                <label>
                  <input
                    type="checkbox"
                    name="hasVisited"
                    checked={formData.hasVisited}
                    onChange={handleChange}
                  />
                  Have you visited before?
                </label>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className={`submit-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Booking Appointment...' : 'Book Appointment'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
