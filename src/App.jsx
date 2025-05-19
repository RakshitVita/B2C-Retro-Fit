import React from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componets/Navbar'
import Mainpage from "./componets/MainPage/Mainpage";
import Download from "./componets/Downloads/Download";
import Subscription_section from "./componets/Subscription/Subscription_section";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex justify-center items-center p-4">
          <Routes>
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
