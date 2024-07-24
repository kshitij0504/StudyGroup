import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
// import Header from "./Components/Header";
import toast, { Toaster } from "react-hot-toast";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
