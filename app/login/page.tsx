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
      return;
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
         {/* Added logo image */}
         <div className="mb-8">
            <img src="/logo.jpg" alt="App Logo" className="mx-auto w-32 h-32 object-contain" />
          </div>
        <h1 className="text-4xl font-bold mb-8">Login</h1>
        <div className="w-full max-w-sm">
          <form onSubmit={handleLogin} className="bg-white/20 backdrop-blur-md p-6 rounded-md shadow-md">
            <div className="mb-4"> {/* Container for input and error */}
              <input
                type="email"
                placeholder="Email"
                className={`border ${errors.email ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full text-gray-800`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
               {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>} {/* Display error */}
            </div>

            <div className="mb-4"> {/* Container for input and error */}
              <input
                type="password"
                placeholder="Password"
                className={`border ${errors.password ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full text-gray-800`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
            </div>


            {supabaseError && <p className="text-red-500 text-sm mb-4">{supabaseError}</p>}

            {/* Use Button component for submit */}
            <Button type="submit" intent="primary" className="w-full py-3 px-6 rounded-full text-lg shadow-lg mt-4">
              Login
            </Button>
          </form>
          {/* Don't have an account? Sign Up link - Use Button component */}
          <p className="mt-4 text-center text-white text-sm">
             Don't have an account?{' '}
            <Button href="/signup" intent="secondary" className="inline-block text-sm underline hover:no-underline">
              Sign Up
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;