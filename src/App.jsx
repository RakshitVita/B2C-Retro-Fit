
import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componets/Navbar'
import Mainpage from "./componets/Mainpage";
import Download from "./componets/Download";
import Subscription_section from "./componets/Subscription_section";

const App = () => {
  const notifications = [
    "Welcome to Retro Fit!",
    "Your subscription is about to expire.",
    "New SQL conversion feature added!"
  ];

  const profileFields = [
    { label: "Name", value: "Jane Doe" },
    { label: "Email", value: "jane@example.com" },
    { label: "Avatar", value: "/assets/profile.jpg" }
  ];

  const filenumber = 3;

  return (
    <Router>
      <Navbar
        notifications={notifications}
        profileFields={profileFields}
        filenumber={filenumber}
      />
           <Routes>
             {/* sub route */}
             <Route path="/" element={<Mainpage/>} />
             <Route path="/downloads" element={<Download/>} />
             <Route path="/subscriptions" element={<Subscription_section/>} />
           </Routes>
    </Router>
  );
};

export default App;




