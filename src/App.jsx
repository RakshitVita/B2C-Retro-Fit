import React, { useEffect } from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from './componets/Navbar/Navbar'
import Mainpage from "./componets/MainPage/Mainpage";
import Download from "./componets/Downloads/Download";
import Subscription_section from "./componets/Subscription/Subscription_section";
import LoginG from "./componets/Google_Login/LoginG";
import useAuthStore from "../Zustand_State/AuthStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";

const App = () => {
  const { authUser, checkAuth, isChecking, isLoggingIn } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!authUser && (isChecking || isLoggingIn))
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  const notifications = [
    "Welcome to Retro Fit!",
    "Your subscription is about to expire.",
    "New SQL conversion feature added!"
  ];


  const filenumber = 2;

  return (
    <>
      <Toaster position="top-center"
        toastOptions={{
          duration: 5000, // <-- set global duration (in ms)
        }}
      />
      <Router>
        <Navbar
          notifications={notifications}
          filenumber={filenumber} />
        <AppRoutes authUser={authUser} />
      </Router>
    </>
  );
};

// Separate component to use useLocation inside Router
const AppRoutes = ({ authUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const handleLoginClose = () => {
    navigate("/");
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/downloads" element={<Download />} />
        <Route path="/subscriptions" element={<Subscription_section />} />
      </Routes>
      {/* Show login popup only if NOT on home and NOT logged in */}
      {!authUser && !isHome && <LoginG asModal={true} onClose={handleLoginClose} />}
    </>
  );
};

export default App;




