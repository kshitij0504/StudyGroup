import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import Header from "./Components/Header";
const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
