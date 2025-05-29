import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../../Zustand_State/AuthStore';
import './LoginG.css';

// Import the logo from the public folder using a relative URL (public assets don't need import, but for clarity or custom setup you might use a static path)
const logoPath = '/logo.png';

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
    const decoded = credentialResponse.credential;
    signup(decoded);
    // localStorage.setItem('user', JSON.stringify(decoded));
    console.log(decoded);
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="login-container">
      <header className="login-header">
        <button onClick={() => setModalOpen(true)}>Log In</button>
      </header>

      {/* Login Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/30 flex items-center justify-center z-50"
          onClick={(e) => e.target.classList.contains('fixed') && setModalOpen(false)}
        >
          <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg text-center">
            <img
              src={logoPath}
              alt="Retro Fit Logo"
              className="mx-auto mb-4 w-20 h-20 object-contain"
            />
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
