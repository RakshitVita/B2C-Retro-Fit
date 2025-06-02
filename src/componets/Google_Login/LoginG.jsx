import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../../Zustand_State/AuthStore';
import './LoginG.css';

const logoPath = './/assets/logo.png';

const LoginG = ({ onClose }) => {
  const signup = useAuthStore((state) => state.signup);

  const handleGoogleSuccess = (credentialResponse) => {
    const decoded = credentialResponse.credential;
    signup(decoded);
    if (onClose) onClose();
  };

  const handleGoogleError = () => {
    console.error('Login Failed');
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-lg text-center relative">
        {/* Cross Icon */}
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="Close"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            lineHeight: 1,
          }}
        >
          &times;
        </button>
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
  );
};

export default LoginG;