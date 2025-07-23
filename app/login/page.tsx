'use client';

import React, { FormEvent, useState } from 'react';
import { Button } from 'components/Button/Button';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for validation errors
  const [supabaseError, setSupabaseError] = useState<string | null>(null); // State for Supabase errors


  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!email) newErrors.email = 'Email is required.';
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };


  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSupabaseError(null); // Clear previous Supabase errors

     if (!validateForm()) {
      return; // Stop if validation fails
    }


    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (authError) {
      setSupabaseError(authError.message);
      console.error('Supabase Login Error:', authError);
      return;
    }

    console.log('Login successful:', data);
    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="bg-white/20 backdrop-blur-md p-6 rounded-md shadow-md">
            <input
              type="email"
              placeholder="Email"
              className={`border ${errors.email ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full mb-2 text-gray-800`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}


            <input
              type="password"
              placeholder="Password"
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full mb-4 text-gray-800`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

            {supabaseError && <p className="text-red-500 text-sm mb-4">{supabaseError}</p>}


            <button type="submit" className="w-full py-3 px-6 bg-white text-blue-700 font-bold rounded-full text-lg shadow-lg mt-4 hover:bg-gray-200 transition duration-300">
              Login
            </button>
          </form>
          <p className="mt-4 text-center text-gray-600 text-sm">
            <a href="/signup" className="underline hover:no-underline">Don't have an account? Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;