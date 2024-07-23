import React from "react";
import logo from "../assets/logo-removebg-preview.png"; // Adjust the import as necessary
import {Label} from "flowbite-react"
const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row">
        <div className="">
          <img src={logo} alt="mylogo" className="h-24 w-24 md:h-32 md:w-32 object-contain"/>
          <p className="text-sm mt-5 text-white">Join us in a journey of knowledge and growth. Welcome to the Class Plus</p>
        </div>
        <div className="">
          <form action="">
            <div className="">
              <Label className="text-white" value="Enter Your Username"></Label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
