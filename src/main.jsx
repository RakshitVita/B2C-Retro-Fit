import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="895598540226-lpnkg9ng4qmkl4bu6q74kj2nspjkoa27.apps.googleusercontent.com">
      <App />
      </GoogleOAuthProvider>
    
  </StrictMode>,
)
