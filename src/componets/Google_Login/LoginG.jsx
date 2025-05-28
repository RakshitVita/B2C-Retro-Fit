import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../../Zustand_State/AuthStore';
import './LoginG.css';

const LoginG = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const signup = useAuthStore((state) => state.signup);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setModalOpen(false);
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    signup(decoded);
    localStorage.setItem('user', JSON.stringify(decoded));
    console.log(decoded);
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
  };

  const steps = [
    {
      img: '/1.png',
      alt: 'Step 1: Upload Code',
      text: 'Step 1: Upload or drag-and-drop your code file (SQL, Java, etc.)',
    },
    {
      img: '/1.png',
      alt: 'Step 2: Convert Automatically',
      text: 'Step 2: Our system generates clean, structured documentation',
    },
    {
      img: '/2.png',
      alt: 'Step 3: Download Doc',
      text: 'Step 3: Instantly download and access past documents anytime',
    },
  ];

  return (
    <div className="login-container">
      <header className="login-header">
        <h1>Turn Your Code into Powerful Documentation</h1>
        <p>
          Upload, Convert, and Download — It's that simple. Code2Doc helps developers instantly generate documentation from SQL, Java, Python, and more!
        </p>
        <button onClick={() => setModalOpen(true)}>Start Now</button>
      </header>

      <section className="section">
        <h2>🚀 What We Do</h2>
        
            <p><strong>Code2Doc</strong> transforms your code into beautifully formatted documentation. Whether it's SQL, Java, Python, or other programming languages — just upload or drag & drop your file, and get a downloadable doc in seconds.</p>
            {/* <p>
  <strong>Code2Doc</strong> empowers developers by transforming raw source code into comprehensive, well-structured, and visually appealing documentation. Whether you're working with SQL, Java, Python, or other programming languages, our platform streamlines the process — simply upload or drag-and-drop your code file, and within seconds, you'll receive a polished document ready for sharing, onboarding, or archiving. No manual formatting, no wasted time — just instant clarity and productivity.
</p> */}

        
      </section>

      <section className="section">
        <h2>🎁 Free Trial for New Users</h2>
        <p>New users can convert up to <strong>400 lines of SQL code</strong> at no cost — no sign-up required! Experience the power of instant documentation without any commitment. Need more? Upgrade anytime with flexible subscription plans tailored to your workflow.</p>
 
      </section>

      <section className="section steps">
        <h2>🔄 How It Works</h2>
        <div className="step-grid">
          {steps.map(({ img, alt, text }, idx) => (
            <div key={idx} className="step-card">
              <img src={img} alt={alt} />
              <p>{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>💡 Key Features</h2>
        <ul>
          <li>Supports SQL, Java, Python, JavaScript & more</li>
          <li>Drag-and-drop file upload</li>
          <li>Instantly downloadable documentation</li>
          <li>All documents saved in your Downloads</li>
          <li>No need to re-upload lost files</li>
        </ul>
      </section>

      <section className="section">
        <h2>🔐 Subscription Plans</h2>
        <p>Go premium to unlock:</p>
        <ul>
          <li>Unlimited code conversions</li>
          <li>Support for large files and advanced features</li>
          <li>Priority processing and support</li>
        </ul>
      </section>

 

      {/* Login Modal */}


{isModalOpen && (
  <div
    className="fixed inset-0 bg-black/30  flex items-center justify-center z-50"
    onClick={(e) => e.target.classList.contains('fixed') && setModalOpen(false)}
  >
    <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Welcome to <span className="text-blue-700">RETRO FIT</span>
      </h2>
      <div className="flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleError}
        />
      </div>
    </div>
  </div>
)}


    </div>
  );
};

export default LoginG;
