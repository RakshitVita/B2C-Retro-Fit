import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componets/Navbar'
import Mainpage from "./componets/Mainpage";
import Download from "./componets/Download";
import Subscription_section from "./componets/Subscription_section";

function App() {
  //backend data
    const notifications = ["New file downloaded","Subscription renewed","Profile updated","Security alert"];
    const profileFields = [{ label: "Username", value: "johndoe" },{ label: "Password", value: "********" }];
    const filenumber = 3;
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* header routes */}
        <Navbar notifications={notifications} profileFields={profileFields} filenumber={filenumber} avatar="/assets/profile.jpg" />
        <main className="flex justify-center items-center p-4">
          <Routes>
            {/* sub route */}
            <Route path="/" element={<Mainpage/>} />
            <Route path="/downloads" element={<Download/>} />
            <Route path="/subscriptions" element={<Subscription_section/>} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App



