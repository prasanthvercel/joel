import React from 'react';

const SplashPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4"> {/* Removed bg-blue-700 */}
      <div className="text-center text-white"> {/* Keep text white or light for now */}
        {/* Logo Placeholder - Keep the existing white circle or adjust */}
        <div className="mb-8"> {/* Increased margin-bottom */}
          {/* You can replace this div with your logo component or image */}
          <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center text-blue-700 text-3xl font-bold">
            Logo
          </div>
        </div>
        {/* App Name - Adjust text color to be lighter if needed */}
        <h1 className="text-4xl font-bold text-white">English Assistant AI</h1>
        {/* Tagline - Use a lighter text color */}
        <p className="text-lg mt-2 text-blue-200">Learn English with AI</p> {/* Lighter text color */}
      </div>

      {/* Buttons and Forgot Password Link */}
      <div className="mt-12 w-full max-w-sm"> {/* Add margin-top and limit width */}
        <button className="w-full py-3 px-6 bg-red-500 text-white font-bold rounded-full text-lg shadow-lg hover:bg-red-600 transition duration-300">
          Sign Up
        </button>
        <button className="w-full py-3 px-6 bg-white text-blue-700 font-bold rounded-full text-lg shadow-lg mt-4 hover:bg-gray-200 transition duration-300">
          Login
        </button>
        <p className="mt-4 text-center text-white text-sm">
          <a href="#" className="underline hover:no-underline">Forgot your password?</a>
        </p>
      </div>
    </div>
  );
};

export default SplashPage;