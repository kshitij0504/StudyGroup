import React, { useState } from "react";
import logo from 'E:/PERN_STACK/client/src/assets/final.png'
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import OAuth from "./OAuth";

const SignUp = () => {
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setformdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formdata.username || !formdata.email || !formdata.password) {
      return toast.error("Please fill out all fields.");
    }

    console.log("Submitting form data:", formdata);
    setLoading(true);

    try {
      const URL = `http://localhost:8000/api/signup`;
      const response = await axios.post(URL, formdata);
      toast.success(response.data.message);

      if (response.data.success) {
        setformdata({
          username: "",
          email: "",
          password: "",
        });
        navigate("/otp", {state: {email: formdata.email}});
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div>
              <Label
                htmlFor="username"
                className="text-white"
                value="Enter Your Username"
              />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                onChange={handlechange}
                value={formdata.username}
                autoComplete="username"
              />
            </div>
            <div>
              <Label
                htmlFor="email"
                className="text-white"
                value="Enter Your Email"
              />
              <TextInput
                type="email"
                placeholder="Email"
                id="email"
                name="email"
                onChange={handlechange}
                value={formdata.email}
                autoComplete="email"
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                className="text-white"
                value="Enter Your Password"
              />
              <TextInput
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handlechange}
                value={formdata.password}
                autoComplete="password"
              />
            </div>
            <Button pill type="submit" disabled={loading}>
              {loading ? <Spinner size="lg" /> : "Sign Up"}
            </Button>
          </form>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-gray-800 px-2 text-white">OR</span>
            </div>
          </div>
          <OAuth />
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
