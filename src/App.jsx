
import React,{useEffect} from "react";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from './componets/Navbar/Navbar'
import Mainpage from "./componets/MainPage/Mainpage";
import Download from "./componets/Downloads/Download";
import Subscription_section from "./componets/Subscription/Subscription_section";
import LoginG from "./componets/Google_Login/LoginG";
import useAuthStore from "../Zustand_State/AuthStore";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";


const App = () => {
  const {authUser,checkAuth, isChecking,isLoggingIn}= useAuthStore();


  // Enable it after integrating Api
  useEffect(() => {
  checkAuth();
  }, [checkAuth])

  if(!authUser && (isChecking || isLoggingIn))
    return(
      <div className="flex justify-center items-center h-screen">
        <Loader className="size-10 animate-spin"/>
        </div>
    );
  

  const notifications = [
    "Welcome to Retro Fit!",
    "Your subscription is about to expire.",
    "New SQL conversion feature added!"
  ];

  const profileFields = [
    { label: "Avatar", value: "/assets/profile.jpg" },
    { label: "Name", value: "Jane Doe" },
    { label: "Email", value: "jane@example.com" }
    
  ];

  const filenumber = 2;

  return (
    <>
     <Toaster position="top-center" />
    <Router>
      <Navbar
        notifications={notifications}
        profileFields={profileFields}
        filenumber={filenumber}
      />
           <Routes>
             {/* sub route */}
             <Route path="/" element={ <Mainpage/> }  />
             <Route path="/downloads" element={authUser ? <Download/> : <Navigate to="/login"/>} />
             <Route path="/subscriptions" element={authUser ?<Subscription_section/>: <Navigate to="/login"/>} />
             <Route path="/login" element={!authUser ? <LoginG/> : <Navigate to = "/"/>} />
           </Routes>
    </Router>
    </>
  );
};

export default App;




