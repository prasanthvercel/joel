import React from 'react';
import { Button } from 'components/Button/Button'; // Import the Button component

const SplashPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center text-white">
        {/* Logo Placeholder */}
        <div className="mb-8">
          {/* You can replace this div with your logo component or image */}
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-blue-700 text-3xl font-bold">
            Logo
          </div>
        </div>
        {/* App Name */}
        <h1 className="text-4xl font-bold text-white">English Assistant AI</h1>
        {/* Tagline */}
        <p className="text-lg mt-2 text-blue-200">Learn English with AI</p>
      </div>

      {/* Buttons and Forgot Password Link */}
      <div className="mt-12 w-full max-w-sm">
        {/* Sign Up Button - Add href to navigate to /signup */}
        <Button href="/signup" className="w-full py-3 px-6 bg-red-500 text-white font-bold rounded-full text-lg shadow-lg hover:bg-red-600 transition duration-300">
          Sign Up
        </Button>
        {/* Login Button - Add href to navigate to /login */}
        <Button href="/login" className="w-full py-3 px-6 bg-white text-blue-700 font-bold rounded-full text-lg shadow-lg mt-4 hover:bg-gray-200 transition duration-300">
          Login
        </Button>
        <p className="mt-4 text-center text-white text-sm">
          <a href="#" className="underline hover:no-underline">Forgot your password?</a>
        </p>
      </div>
    </div>
  );
};

export default SplashPage;