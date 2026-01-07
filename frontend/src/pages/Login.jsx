import React, { useState } from 'react';
import { auth } from '../firebase.js'; 
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); 
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false); // Naya state verification status ke liye

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible'
      });
    }
  };

  const onSignup = async () => {
    if (phoneNumber.length !== 10) return alert("Please enter 10 digits");
    setLoading(true);
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = "+91" + phoneNumber;

    try {
      const result = await signInWithPhoneNumber(auth, formatPh, appVerifier);
      setConfirmationResult(result);
      setStep(2);
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert("Error sending OTP.");
      setLoading(false);
    }
  };

  const onOTPVerify = async () => {
    setLoading(true);
    const fullOtp = otp.join('');
    try {
      await confirmationResult.confirm(fullOtp);
      setVerified(true); // Button ko green karne ke liye
      setLoading(false);
      
      // 1.5 second baad next page par bhejne ka logic
      setTimeout(() => {
        navigate('/role-selection');
        // Yahan tum navigation use kar sakte ho: navigate('/role-selection')
      }, 1500);

    } catch (error) {
      alert("Wrong OTP! Check again.");
      setLoading(false);
      setVerified(false);
    }
  };

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);
    if (element.value !== '' && element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 transition-all duration-500">
      <div id="recaptcha-container"></div>
      
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8 transform transition-all">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-orange-600">MistryJi</h1>
          <p className="text-gray-500 mt-2 font-medium">
            {verified ? 'Account Verified!' : step === 1 ? 'Login with your phone number' : 'Verify your number'}
          </p>
        </div>

        {step === 1 ? (
          <div className="space-y-6">
            <div className="relative">
              <span className="absolute left-4 top-4 text-gray-500 font-medium">+91</span>
              <input
                type="tel"
                maxLength="10"
                placeholder="Enter Mobile Number"
                className="w-full pl-14 pr-4 py-4 bg-gray-50 text-lg border border-gray-200 rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button
              onClick={onSignup}
              disabled={phoneNumber.length !== 10 || loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all disabled:opacity-50"
            >
              {loading ? "Sending..." : "Get OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between gap-1">
              {otp.map((data, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className={`w-12 h-14 text-center text-xl font-bold border rounded-xl focus:ring-2 outline-none transition-all ${verified ? 'border-green-500 bg-green-50' : 'border-gray-200 focus:ring-orange-500'}`}
                  value={data}
                  onChange={(e) => handleOtpChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                  disabled={verified}
                />
              ))}
            </div>
            
            {/* Dynamic Button: Green when verified */}
            <button
              onClick={onOTPVerify}
              disabled={loading || verified}
              className={`w-full font-bold py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 ${
                verified 
                ? "bg-green-500 text-white shadow-green-200" 
                : "bg-orange-600 hover:bg-orange-700 text-white shadow-orange-200"
              }`}
            >
              {loading ? "Verifying..." : verified ? (
                <>
                  <span className="text-xl">✓</span> Verified
                </>
              ) : "Verify & Continue"}
            </button>

            {!verified && (
              <>
                <p className="text-center text-sm text-gray-500">
                  Didn't receive code? <span className="text-orange-600 font-semibold cursor-pointer">Resend</span>
                </p>
                <button 
                  onClick={() => setStep(1)} 
                  className="w-full text-gray-400 text-sm font-medium hover:text-gray-600"
                >
                  Change Phone Number
                </button>
              </>
            )}
          </div>
        )}

        <p className="mt-10 text-center text-xs text-gray-400">
          By continuing, you agree to our <br /> Terms of Service & Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;