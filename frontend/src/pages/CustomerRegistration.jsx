import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Hooks import kiye
import axios from 'axios'; // 2. Axios import kiya

const CustomerRegistration = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 3. Pichle pages ka data nikala
  const { phoneNumber, role } = location.state || {};

  const [formData, setFormData] = useState({
    fullName: '',
    fullAddress: '',
    landmark: '',
    city: '', // Added City field as per Backend Model
    alternatePhone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 4. Data Packing
    const finalData = {
      phoneNumber,
      role,
      fullName: formData.fullName,
      address: formData.fullAddress, // Mapping to backend 'address'
      city: formData.city,
      landmark: formData.landmark,
      // alternatePhone optional hai toh bhej sakte ho ya model mein add kar sakte ho
    };

    try {
      // 5. API Call
      const response = await axios.post(
        "http://localhost:8000/api/v1/users/register", 
        finalData
      );

      if (response.data.success) {
        // alert("Registration Successful! Welcome to MistryJi.");
        navigate('/customer-dashboard');
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-10 transform transition-all">
        
        <div className="bg-orange-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
            <span className="text-4xl">🏠</span>
          </div>
          <h2 className="text-2xl font-bold">Hello Customer!</h2>
          <p className="text-orange-100 text-sm">Please provide your details to continue</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Your Full Name *</label>
            <input 
              name="fullName"
              type="text" 
              required
              placeholder="e.g. Aman Sharma" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          {/* City field added to match Backend requirements */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">City *</label>
            <input 
              name="city"
              type="text" 
              required
              placeholder="e.g. Noida" 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Complete Address *</label>
            <textarea 
              name="fullAddress"
              required
              rows="3" 
              placeholder="House No, Building Name, Street..." 
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Landmark</label>
              <input 
                name="landmark"
                type="text" 
                placeholder="Near Temple" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Alt. Phone</label>
              <input 
                name="alternatePhone"
                type="tel" 
                maxLength="10"
                placeholder="Optional" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 mt-4"
          >
            Start Booking Services
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400 max-w-[250px]">
        Aapka Number: {phoneNumber}
      </p>
    </div>
  );
};

export default CustomerRegistration;