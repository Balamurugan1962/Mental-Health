"use client";

import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import PasswordInput from '../components/PasswordInput';
import { assets } from '../assets/assets';
import API from '../utils/api';

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await API.post("/users/signin", { email, password }, { withCredentials: true });

      if (data.token) {
        localStorage.setItem("authToken", data.token);
        window.location.href = "/home"; // redirect after login
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Link href="/">
        <h1 className='absolute w-30 ml-5 mt-5 cursor-pointer text-2xl font-semibold'>TakeUrTime</h1>
      </Link>
      <div className='grid grid-cols-1 lg:grid-cols-5 h-screen'>
        <div className='flex flex-col gap-2 col-span-2 items-center justify-center bg-[#F7FAFC] p-5'>
          <form className='flex flex-col gap-4 w-[70%]' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
              <h1 className='font-semibold text-4xl'>Sign in</h1>
            </div>

            <div>
              <h2 className='text-[#718096]'>E-mail</h2>
              <input 
                className='border border-[#CBD5E0] w-full h-10 rounded-xl p-2.5'
                type='email' 
                placeholder='example@email.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <h2 className='text-[#718096]'>Password</h2>
              <PasswordInput value={password} onChange={setPassword} />
            </div>
            
            <div className='flex justify-between'>
              <p className="text-red-500">{error}</p>
              <Link href="/forgot-password" className='underline'>Forgot Password?</Link>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className='bg-[#1B4D3E] h-12 text-md rounded-xl text-white font-semibold cursor-pointer'
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            <div className='grid grid-cols-5 justify-center items-center py-10'>
              <hr className='col-span-2'/>
              <h2 className='text-center'>OR</h2>
              <hr className='col-span-2' />
            </div>

            <button 
              type="button"
              className='border border-[#CBD5E0] w-full rounded-full text-[#718096] flex p-3 gap-[30%] cursor-pointer'
            >
              <Image src={assets.google_logo} alt="Google login" className='w-5'/>
              <p className='text-center'>Continue with Google</p>
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className='hidden lg:flex flex-col gap-10 col-span-3 justify-center items-center bg-[#1B4D3E]'>
          <h1 className='text-5xl text-white font-medium'>Please Sign in to continue.</h1>
          <h1 className='text-4xl text-white font-medium'>Because your mental health matters.</h1>
          <p className='text-xl text-white w-[70%] text-center'>
            Take a step towards healing with a stigma-free, accessible and secure mental wellness companion.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
