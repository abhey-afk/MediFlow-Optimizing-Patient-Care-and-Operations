import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUserMd, FaUsers, FaCalendarCheck, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    doctors: 0,
    patients: 0,
    appointments: 0,
    messages: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/admin/stats", {
          withCredentials: true
        });
        if (response.data.success) {
          setStats(response.data.stats);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch dashboard statistics");
      }
    };

    fetchStats();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:4000/api/v1/user/logout", {
        withCredentials: true
      });
      navigate("/login");
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to logout");
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <FaUserMd className="stat-icon" />
          <div className="stat-info">
            <h3>Total Doctors</h3>
            <p>{stats.doctors}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaUsers className="stat-icon" />
          <div className="stat-info">
            <h3>Total Patients</h3>
            <p>{stats.patients}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaCalendarCheck className="stat-icon" />
          <div className="stat-info">
            <h3>Total Appointments</h3>
            <p>{stats.appointments}</p>
          </div>
        </div>

        <div className="stat-card">
          <FaEnvelope className="stat-icon" />
          <div className="stat-info">
            <h3>Total Messages</h3>
            <p>{stats.messages}</p>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button onClick={() => navigate("/admin/doctors")} className="action-button">
          Manage Doctors
        </button>
        <button onClick={() => navigate("/admin/patients")} className="action-button">
          Manage Patients
        </button>
        <button onClick={() => navigate("/admin/appointments")} className="action-button">
          Manage Appointments
        </button>
        <button onClick={() => navigate("/admin/messages")} className="action-button">
          View Messages
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard; 