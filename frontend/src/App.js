import React from "react";
import "./App.css";
import Profile from "./components/Profile/Profile";
import { Route, Routes, useLocation } from "react-router-dom";
import SideBar from "./components/SideBar/SideBar";
import Dashboard from "./final/dash/Dashboard";
import EditPage from "./components/EditPage/EditPage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Home from "./components/Home/Home";

function App() {
  const location = useLocation();
  const isSignInPage = location.pathname === "/SignIn";
  const isSignUppage = location.pathname === "/SignUp";
  const isHomepage = location.pathname === "/";
  
  return (
    <div className="app-container mt-0">
      {!isSignInPage && !isSignUppage && !isHomepage && <SideBar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/EditPage/:userId" element={<EditPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
