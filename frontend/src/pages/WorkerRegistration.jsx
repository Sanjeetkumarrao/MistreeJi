import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation add kiya
import axios from 'axios'; // axios import kiya

const WorkerRegistration = () => {
    const navigate = useNavigate();
    const location = useLocation(); // location initialize kiya
    
    // Pichle pages se aaya data
    const { phoneNumber, role } = location.state || {}; 

    const [formData, setFormData] = useState({
        fullName: '',
        skill: 'Electrician',
        experience: '',
        city: '',
        hourlyRate: '',
        aadharNumber: '',
        permanentAddress: '',
        about: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 1. Validation
        if(formData.aadharNumber.length !== 12) {
            alert("Please enter a valid 12-digit Aadhar Number");
            return;
        }

        // 2. Data Packing (Backend ke Model ke hisaab se)
        const finalData = {
            phoneNumber,
            role,
            fullName: formData.fullName,
            skill: formData.skill,
            experience: Number(formData.experience), // Number mein convert kiya
            city: formData.city,
            hourlyRate: Number(formData.hourlyRate),
            aadharNumber: formData.aadharNumber,
            address: formData.permanentAddress, // Backend "address" mang raha hai
        };

        try {
            // 3. Backend API Call
            const response = await axios.post(
                "http://localhost:8000/api/v1/users/register", 
                finalData
            );

            if (response.data.success) {
                // alert("Registration Successful! Welcome to MistryJi.");
                navigate('/worker-dashboard');
            }
        } catch (error) {
            console.error("Registration Error:", error);
            alert(error.response?.data?.message || "Registration failed. Try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 pb-12">
            <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden mt-6 border border-gray-100">
                
                <div className="bg-orange-600 p-6 text-white text-center">
                    <h2 className="text-2xl font-bold">Worker Verification 🛠️</h2>
                    <p className="text-orange-100 text-sm mt-1">Aapka Number: {phoneNumber}</p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {/* Basic Details */}
                    <div className="border-b border-gray-100 pb-4">
                        <h3 className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wider">Basic Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                                <input name="fullName" type="text" required placeholder="Aapka Poora Naam" 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none"
                                    onChange={handleChange} />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Aadhar Number (12 Digits) *</label>
                                <input name="aadharNumber" type="text" maxLength="12" required placeholder="0000 0000 0000" 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none font-mono"
                                    onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    {/* Professional Info */}
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

                    {/* Location & Rate */}
                    <div>
                        <h3 className="text-orange-600 font-bold text-sm mb-4 uppercase tracking-wider">Location & Rate</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">City *</label>
                                    <input name="city" type="text" required placeholder="Noida" 
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                                        onChange={handleChange} />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">Rate (₹) *</label>
                                    <input name="hourlyRate" type="number" required placeholder="Fee" 
                                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none"
                                        onChange={handleChange} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-1">Full Address *</label>
                                <textarea name="permanentAddress" rows="2" required placeholder="Complete Address" 
                                    className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500"
                                    onChange={handleChange}></textarea>
                            </div>
                        </div>
                    </div>

                    <button type="submit"
                        className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-lg"
                    >
                        Register as Worker
                    </button>
                </form>
            </div>
        </div>
    );
};

export default WorkerRegistration;