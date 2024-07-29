import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const otpCode = otp.join("");

    try {
      const response = await axios.post("http://localhost:8000/api/verify-otp", { email, otp: otpCode });
      toast.success(response.data.message);
      if (response.status === 200) {
        navigate("/signin"); 
      }
    } catch (error) {
      console.error("Verification failed:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h2>
        <p className="mb-4 text-center">
          We have sent a code to your email ba**@dipainhouse.com
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex justify-center space-x-2 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-12 border border-gray-700 rounded-lg text-center text-xl bg-gray-900 focus:outline-none"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            Verify Account
          </button>
        </form>
        <div className="mt-4 text-center">
          <a href="#" className="text-blue-400 hover:underline">
            Didn't receive code? Resend
          </a>
        </div>
      </div>
    </div>
  );
};

export default Otp;
