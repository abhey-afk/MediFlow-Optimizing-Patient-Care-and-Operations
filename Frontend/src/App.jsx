import React from "react";
import "./App.css";
import { 
  createBrowserRouter, 
  RouterProvider, 
  createRoutesFromElements,
  Route,
  Navigate,
  Outlet
} from "react-router-dom";
import Home from "./Pages/Home";
import Appointment from "./Pages/Appointment";
import AboutUs from "./Pages/AboutUs";
import Register from "./Pages/Register";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./Pages/Login";
import AdminDashboard from "./admin/AdminDashboard";
import DoctorRegister from "./Pages/DoctorRegister";
import Doctors from "./Pages/Doctors";
import { useAuth } from "./context/AuthContext";
import { AuthProvider } from "./context/AuthContext";

const AppLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <ToastContainer />
      <Footer />
    </div>
  );
};

const App = () => {
  const { user } = useAuth();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<AppLayout />}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        
        {/* Protected Routes */}
        <Route 
          path="/appointment" 
          element={user ? <Appointment /> : <Navigate to="/login" />} 
        />
        
        {/* Admin Routes */}
        <Route 
          path="/admin" 
          element={user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/admin/*" 
          element={user?.role === "Admin" ? <AdminDashboard /> : <Navigate to="/login" />} 
        />
      </Route>
    ),
    {
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }
    }
  );

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
