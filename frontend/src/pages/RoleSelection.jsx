import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. useLocation ko add kiya

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();
  
  // 2. Location hook ko initialize kiya
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber; // Ab ye error nahi dega

  const roles = [
    {
      id: 'customer',
      title: 'I am a Customer',
      description: 'Looking for a skilled Mistry or worker for my home.',
      icon: '🏠',
    },
    {
      id: 'worker',
      title: 'I am a Worker',
      description: 'I want to provide services and find work near me.',
      icon: '🛠️',
    }
  ];

  const handleNext = () => {
    if (selectedRole) {
      // 3. Phone aur Role dono ko aage wale page par bhej rahe hain
      navigate(`/${selectedRole}-registration`, { 
        state: { phoneNumber, role: selectedRole } 
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transform transition-all">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-orange-600 font-sans">MistryJi</h1>
          <p className="text-gray-500 mt-2 font-medium">Choose your profile to continue</p>
          {/* Debugging ke liye: {phoneNumber} */}
        </div>

        <div className="space-y-4">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
                selectedRole === role.id 
                ? 'border-orange-600 bg-orange-50 shadow-md scale-[1.02]' 
                : 'border-gray-100 bg-gray-50 hover:border-orange-200'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-3xl bg-white shadow-sm`}>
                  {role.icon}
                </div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold ${selectedRole === role.id ? 'text-orange-600' : 'text-gray-800'}`}>
                    {role.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-tight mt-1">{role.description}</p>
                </div>
                {selectedRole === role.id && (
                  <div className="bg-orange-600 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg transform scale-110">
                    ✓
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!selectedRole}
          className="w-full mt-10 bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all disabled:opacity-50 disabled:shadow-none"
        >
          Continue
        </button>

        <p className="mt-8 text-center text-xs text-gray-400">
          Aap baad mein settings se role change kar sakte hain.
        </p>
      </div>
    </div>
  );
};

export default RoleSelection;