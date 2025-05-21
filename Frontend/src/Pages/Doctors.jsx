import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setError(null);
        console.log('Fetching doctors...');
        const response = await fetch('http://localhost:4000/api/v1/doctor/all', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include'
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        if (data.success) {
          console.log('Doctors data:', data.doctors);
          setDoctors(data.doctors);
        } else {
          console.error('Error in response:', data.message);
          setError(data.message || 'Failed to fetch doctors');
          toast.error(data.message || 'Failed to fetch doctors');
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setError('Failed to fetch doctors. Please try again later.');
        toast.error('Failed to fetch doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8" style={{ paddingTop: '100px' }}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Our Doctors</h1>
        <button
          onClick={() => navigate('/doctor/register')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
        >
          Register as Doctor
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600 mt-2">Loading doctors...</p>
        </div>
      ) : error ? (
        <div className="text-center py-8">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 text-blue-500 hover:text-blue-600"
          >
            Try Again
          </button>
        </div>
      ) : doctors.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600">No doctors found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨‍⚕️</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h2>
                  <p className="text-gray-600">{doctor.specialization}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-gray-600">
                  <span className="font-medium">Email:</span> {doctor.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Phone:</span> {doctor.phone}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Doctors; 