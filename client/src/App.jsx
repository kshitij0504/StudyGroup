import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./Pages/Auth/SignIn";
import SignUp from "./Pages/Auth/SignUp";
import toast, { Toaster } from "react-hot-toast";
import Otp from "./Pages/Auth/Otp";
import Home from "./Pages/Home";
import PrivatePage from "./Components/PrivatePage";
import UpdateProfile from "./Pages/UpdateProfile";
import Group from "./Pages/Group/Group";
import DisplayGroup from "./Pages/Group/DisplayGroup";
import LayoutwithSidebar from "./Components/LayoutwithSidebar";
import ParticularGroup from "./Pages/Group/ParticualarGroup";
const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/otp" element={<Otp />} />
        <Route element={<PrivatePage />}>
          <Route element={<LayoutwithSidebar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/updateprofile" element={<UpdateProfile />} />
            <Route path="/creategroup" element={<Group />} />
            <Route path="/displaygroups" element={<DisplayGroup />} />
            <Route path="/groups/:id" element={<ParticularGroup />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
