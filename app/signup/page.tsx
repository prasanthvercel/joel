'use client';

import React, { FormEvent, useState } from 'react';
import { Button } from 'components/Button/Button';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const SignUpPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      console.error('Supabase Sign Up Error:', error);
      return;
    }

    if (data?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: data.user.id, name: name, mobile_number: mobileNumber },
        ]);

      if (profileError) {
        console.error('Supabase Profile Save Error:', profileError);
      }
    }

    console.log('Sign Up successful:', data);
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        <div className="w-full max-w-sm">
          <form onSubmit={handleSignUp} className="bg-white p-6 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Name"
              className="border border-gray-400 p-2 rounded w-full mb-4 text-gray-800" // Added border-gray-400
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="border border-gray-400 p-2 rounded w-full mb-4 text-gray-800" // Added border-gray-400
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="border border-gray-400 p-2 rounded w-full mb-4 text-gray-800" // Added border-gray-400
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-400 p-2 rounded w-full mb-4 text-gray-800" // Added border-gray-400
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button type="submit" className="w-full py-3 px-6 bg-red-500 text-white font-bold rounded-full text-lg shadow-lg hover:bg-red-600 transition duration-300 mt-4">
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;