import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkerRegistration = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    fullName: '',
    skill: 'Electrician',
    experience: '',
    city: '',
    hourlyRate: '',
    aadharNumber: '', // Added
    permanentAddress: '', // Added
    about: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aadhar validation (Basic 12 digit check)
    if(formData.aadharNumber.length !== 12) {
        alert("Please enter a valid 12-digit Aadhar Number");
        return;
    }
    console.log("Detailed Worker Data:", formData);
    navigate('/worker-dashboard')
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-12">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-6 border border-gray-100">
        
        {/* Verification Header */}
        <div className="bg-orange-600 p-6 text-white text-center">
          <h2 className="text-2xl font-bold">Worker Verification 🛠️</h2>
          <p className="text-orange-100 text-sm mt-1">Trust banane ke liye sahi jaankari bharein</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          
          {/* Section 1: Personal Info */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wider">Basic Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                <input name="fullName" type="text" required placeholder="Aapka Poora Naam" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                  onChange={handleChange} />
              </div>

              {/* Aadhar Input - Very Important */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Aadhar Number (12 Digits) *</label>
                <input name="aadharNumber" type="text" maxLength="12" required placeholder="0000 0000 0000" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                  onChange={handleChange} />
                <p className="text-[10px] text-gray-400 mt-1 ml-1">Hum aapka Aadhar safe rakhte hain aur kisi ko dikhate nahi.</p>
              </div>
            </div>
          </div>

          {/* Section 2: Work Experience */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wider">Professional Info</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Skill *</label>
                <select name="skill" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none" onChange={handleChange}>
                  <option>Electrician</option>
                  <option>Plumber</option>
                  <option>Carpenter</option>
                  <option>Painter</option>
                  <option>Mason (Mistry)</option>
                  <option>Tile/Marble Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Exp. (Years) *</label>
                <input name="experience" type="number" required placeholder="Exp" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                  onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Section 3: Location & Address */}
          <div>
            <h3 className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wider">Location & Rate</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Current City *</label>
                  <input name="city" type="text" required placeholder="Lucknow/Delhi" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                    onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Min. Charge (₹) *</label>
                  <input name="hourlyRate" type="number" required placeholder="Visiting Fee" 
                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                    onChange={handleChange} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Full Permanent Address *</label>
                <textarea name="permanentAddress" rows="2" required placeholder="Ghar ka poora pata" 
                  className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                  onChange={handleChange}></textarea>
              </div>
            </div>
          </div>

          <button type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all active:scale-95 text-lg"
          >
            Submit for Verification
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkerRegistration;