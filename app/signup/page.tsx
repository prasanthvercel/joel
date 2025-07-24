'use client';

import React, { FormEvent, useState } from 'react';
import { Button } from 'components/Button/Button'; // Import the Button component
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

const SignUpPage = () => {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({}); // State for validation errors
  const [supabaseError, setSupabaseError] = useState<string | null>(null); // State for Supabase errors

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const mobileRegex = /^[0-9]{10}$/;

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
         {/* Added logo image */}
         <div className="mb-8">
            <img src="/logo.jpg" alt="App Logo" className="mx-auto w-32 h-32 object-contain" />
          </div>
        <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
        <div className="w-full max-w-sm">
          <form onSubmit={handleSignUp} className="bg-white/20 backdrop-blur-md p-6 rounded-md shadow-md">

            <div className="mb-4"> {/* Container for input and error */}
              <input
                type="text"
                placeholder="Name"
                className={`border ${errors.name ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full text-gray-800`}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4"> {/* Container for input and error */}
              <input
                type="tel"
                placeholder="Mobile Number"
                className={`border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full text-gray-800`}
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />
              {errors.mobileNumber && <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>}

            </div>

            <div className="mb-4"> {/* Container for input and error */}
              <input
                type="email"
                placeholder="Email"
                className={`border ${errors.email ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full text-gray-800`}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

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

            <div className="mb-4"> {/* Container for input and error */}
              <input
                type="password"
                placeholder="Confirm Password"
                className={`border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-400'} p-2 rounded w-full text-gray-800`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}

            </div>

            {supabaseError && <p className="text-red-500 text-sm mb-4">{supabaseError}</p>}

            {/* Use Button component for submit */}
            <Button type="submit" intent="outline-purple" className="w-full py-3 px-6 rounded-full text-lg shadow-lg mt-4">
              Create Account
            </Button>
          </form>
          {/* Already have an account? Login link */}
          <p className="mt-4 text-center text-white text-sm">
            Already have an account?{' '}
            <a href="/login" className="underline hover:no-underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
