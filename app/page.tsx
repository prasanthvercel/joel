import React from 'react';
import { Button } from 'components/Button/Button';

const SplashPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="text-center text-white">
         {/* Added logo image */}
         <div className="mb-8">
            <img src="/logo.jpg" alt="App Logo" className="mx-auto w-32 h-32 object-contain" />
          </div>
        {/* App Name */}
        <h1 className="text-4xl font-bold text-white">English Assistant AI</h1>
        {/* Tagline */}
        <p className="text-lg mt-2 text-blue-200">Learn English with AI</p>
      </div>

      {/* Buttons and Forgot Password Link */}
      <div className="mt-12 w-full max-w-sm">
        {/* Sign Up Button - Use primary intent */}
        <Button href="/signup" intent="primary" className="w-full py-3 px-6 rounded-full text-lg shadow-lg">
          Sign Up
        </Button>
        {/* Login Button - Use secondary intent */}
        <Button href="/login" intent="secondary" className="w-full py-3 px-6 rounded-full text-lg shadow-lg mt-4">
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