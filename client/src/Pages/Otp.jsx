import React from "react";

const Otp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Email Verification
        </h2>
        <p className="mb-4 text-center">
          We have sent a code to your email ba**@dipainhouse.com
        </p>
        <div className="flex justify-center space-x-2 mb-6">
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border border-gray-700 rounded-lg text-center text-xl bg-gray-900 focus:outline-none"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border border-gray-700 rounded-lg text-center text-xl bg-gray-900 focus:outline-none"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border border-gray-700 rounded-lg text-center text-xl bg-gray-900 focus:outline-none"
          />
          <input
            type="text"
            maxLength="1"
            className="w-12 h-12 border border-gray-700 rounded-lg text-center text-xl bg-gray-900 focus:outline-none"
          />
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
          Verify Account
        </button>
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
