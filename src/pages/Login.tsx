import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../main';
import toast from 'react-hot-toast';
import { useGoogleLogin } from '@react-oauth/google';
import { FcGoogle } from 'react-icons/fc';
import { useAppData } from '../context/AppContext';

const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const { setUser, setIsAuth } = useAppData();

  const responseGoogle = async (authResult: any) => {
    setloading(true);
    try {
      const result = await axios.post(`${authService}/api/auth/login`, {
        code: authResult['code'],
      });
      localStorage.setItem('token', result.data.token);
      toast.success(result.data.message);
      setloading(false);
      setUser(result.data.user);
      setIsAuth(true);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error('Problem while login ');
      setloading(false);
    }
  };
  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: responseGoogle,
    flow: 'auth-code',
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4">
      <div className="text-center max-w-sm space-y-6">
        <h1 className="text-center text-3xl font-bold text-3xl font-bold text-[#E23774]">
          Tomato
        </h1>
        <p className="text-center text-sm text-gray-500">
          Login in or sign up to contiue
        </p>

        <button
          className="flex justify-center items-center w-full gap-3 rounded-xl border border-gray-300 bg-white px-4 py-3"
          onClick={googleLogin}
          disabled={loading}
        >
          <FcGoogle size={20} />
          {loading ? 'Signn in' : 'Continue with google'}
        </button>

        <p className="text-center text-xs text-gray-500">
          By Continuing, you agrer with our
          {''}
          <span className="text-[#E23774]">Terms of Service</span>
          <span className="text-[#E23774]">Privacy Policy </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
