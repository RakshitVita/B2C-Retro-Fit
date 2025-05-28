import React from 'react'
import { jwtDecode } from "jwt-decode";
import './LoginG.css'
import { GoogleLogin } from '@react-oauth/google';
import useAuthStore from '../../../Zustand_State/AuthStore';
const LoginG = () => {

    const { signup } = useAuthStore();

    return (
        <>
        <div className='flex justify-center items-center h-screen'>
<GoogleLogin
                onSuccess={credentialResponse => {
                    const credentailResponse = credentialResponse.credential;
                    signup({token:credentailResponse});
                    console.log(credentailResponse);

                    // Save user info to localStorage
                    localStorage.setItem('user', JSON.stringify(credentailResponseDecoded));
                }}
                onError={() => {
                    console.log('Login Failed')
                }}
            />
        </div>
            
        </>
    )
}

export default LoginG
