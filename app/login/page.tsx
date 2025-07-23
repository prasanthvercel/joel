'use client';

import React, { FormEvent, useState } from 'react';
import { Button } from 'components/Button/Button'; // Assuming Button component is still desired for the "Sign Up" link button
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Import the browser-side Supabase client

const LoginPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    // Call Supabase sign-in with email and password
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      console.error('Supabase Login Error:', error);
      return;
    }

    console.log('Login successful:', data);
    // Redirect to home after successful login
    router.push('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="bg-white p-6 rounded-md shadow-md">
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full mb-4 text-gray-800"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full mb-4 text-gray-800"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
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