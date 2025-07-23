'use client';

import React, { FormEvent, useState } from 'react'; // Import useState
import { Button } from 'components/Button/Button';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client'; // Import the browser-side Supabase client

const SignUpPage = () => {
  const router = useRouter();
  const supabase = createClient(); // Initialize Supabase client

  // State for input values
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null); // State for error messages

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => { // Made function async
    event.preventDefault();
    setError(null); // Clear previous errors

    // Call Supabase sign-up
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
      console.error('Supabase Sign Up Error:', error);
      return; // Stop if there's an error
    }

    // Optional: Save name and mobile number to a 'profiles' table
    if (data?.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          { id: data.user.id, name: name, mobile_number: mobileNumber }, // Assuming 'profiles' table with 'id', 'name', 'mobile_number'
        ]);

      if (profileError) {
        console.error('Supabase Profile Save Error:', profileError);
        // Handle profile save error (maybe delete user or show a message)
        // For simplicity, we'll proceed to login page even if profile save fails
      }
    }

    console.log('Sign Up successful:', data);
    // Redirect to login after successful signup
    router.push('/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center text-white">
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        {/* Sign-up form */}
        <div className="w-full max-w-sm">
          <form onSubmit={handleSignUp} className="bg-white p-6 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Name"
              className="border p-2 rounded w-full mb-4 text-gray-800"
              value={name} // Bind value to state
              onChange={(e) => setName(e.target.value)} // Update state on change
            />
            <input
              type="tel"
              placeholder="Mobile Number"
              className="border p-2 rounded w-full mb-4 text-gray-800"
              value={mobileNumber} // Bind value to state
              onChange={(e) => setMobileNumber(e.target.value)} // Update state on change
            />
            <input
              type="email"
              placeholder="Email"
              className="border p-2 rounded w-full mb-4 text-gray-800"
              value={email} // Bind value to state
              onChange={(e) => setEmail(e.target.value)} // Update state on change
            />
            <input
              type="password"
              placeholder="Password"
              className="border p-2 rounded w-full mb-4 text-gray-800"
              value={password} // Bind value to state
              onChange={(e) => setPassword(e.target.value)} // Update state on change
            />
            {/* Display error message if any */}
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