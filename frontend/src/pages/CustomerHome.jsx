import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CustomerRegistration = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    fullAddress: '',
    landmark: '',
    alternatePhone: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Customer Data:", formData);
    navigate('/customer-dashboard')

  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden mt-10 transform transition-all">
        
        {/* Header Section */}
        <div className="bg-orange-600 p-8 text-white text-center">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white/30">
            <span className="text-4xl">🏠</span>
          </div>
          <h2 className="text-2xl font-bold">Hello Customer!</h2>
          <p className="text-orange-100 text-sm">Please provide your address for services</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {/* Full Name */}
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

          {/* Detailed Address */}
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

          {/* Landmark & Alternate Number */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1 ml-1">Landmark</label>
              <input 
                name="landmark"
                type="text" 
                placeholder="Near Temple/Shop" 
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
                placeholder="Other Number" 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Action Button */}
          <button 
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 mt-4"
          >
            Start Booking Services
          </button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-gray-400 max-w-[250]">
        We use your address only to connect you with nearby verified workers.
      </p>
    </div>
  );
};

export default CustomerRegistration;