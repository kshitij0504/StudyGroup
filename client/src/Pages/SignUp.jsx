import React from "react";
import logo from "../assets/final.png";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center md:items-start p-8 max-w-4xl w-full bg-gray-800 rounded-lg shadow-lg gap-8">
        <div className="flex-1 flex flex-col items-center">
          <img
            src={logo}
            alt="mylogo"
            className="h-30 w-30 md:h-42 md:w-42 object-contain"
          />
          <p className="text-xl md:text-2xl lg:text-4xl font-extrabold text-white mt-2 md:mt-4 lg:mt-6 text-center md:text-center">
            Welcome to Class Plus
          </p>
          <p className="text-xs md:text-sm lg:text-base font-medium mt-2 text-white text-center md:text-center">
            Join us in a journey of knowledge and growth.
          </p>
        </div>
        <div className="flex-1 w-full mt-20">
          <form action="" className="flex flex-col gap-6">
            <div>
              <Label className="text-white" value="Enter Your Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label className="text-white" value="Enter Your Email" />
              <TextInput type="email" placeholder="Email" id="email" />
            </div>
            <div>
              <Label className="text-white" value="Enter Your Password" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button pill type="submit">
              Sign Up
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5 justify-center md:justify-center">
            <span className="text-lg">Have an account?</span>
            <Link to="/SignIn" className="text-blue-500 text-lg">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
