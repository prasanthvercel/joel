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
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for validation errors
  const [supabaseError, setSupabaseError] = useState<string | null>(null); // State for Supabase errors

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const mobileRegex = /^[0-9]{10}$/; // Basic 10-digit mobile number validation

    if (!name) newErrors.name = 'Name is required.';
    if (!mobileNumber) {
      newErrors.mobileNumber = 'Mobile Number is required.';
    } else if (!mobileRegex.test(mobileNumber)) {
      newErrors.mobileNumber = 'Invalid mobile number format.';
    }
    if (!email) newErrors.email = 'Email is required.';
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSupabaseError(null); // Clear previous Supabase errors

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    // Call Supabase sign-up
    const { data, error: authError } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (authError) {
      setSupabaseError(authError.message);
      console.error('Supabase Sign Up Error:', authError);
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
        // Handle profile save error (maybe delete user or show a message)
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
          <form onSubmit={handleSignUp} className="bg-white/20 backdrop-blur-md p-6 rounded-md shadow-md">
            <input
              type="text"
              placeholder="Name"
              className={`border ${errors.name ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full mb-2 text-gray-800`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.name && <p className="text-red-500 text-sm mb-4">{errors.name}</p>}

            <input
              type="tel"
              placeholder="Mobile Number"
              className={`border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full mb-2 text-gray-800`}
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
            {errors.mobileNumber && <p className="text-red-500 text-sm mb-4">{errors.mobileNumber}</p>}

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
              className={`border ${errors.password ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full mb-2 text-gray-800`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

            <input
              type="password"
              placeholder="Confirm Password"
              className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full mb-4 text-gray-800`}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mb-4">{errors.confirmPassword}</p>}

            {supabaseError && <p className="text-red-500 text-sm mb-4">{supabaseError}</p>}

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