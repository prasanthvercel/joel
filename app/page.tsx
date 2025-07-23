import React from 'react';

const SplashPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 to-blue-600">
      <div className="text-center text-white">
        {/* Logo Placeholder */}
        <div className="mb-4">
          {/* You can replace this div with your logo component or image */}
          <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center text-blue-600 text-2xl font-bold">
            Logo
          </div>
        </div>
        <h1 className="text-4xl font-bold">English Assistant AI</h1>
        <p className="text-lg mt-2">Learn English with AI</p>
        {/* Optional: Add a simple loading spinner or animation */}
      </div>
    </div>
  );
};

export default SplashPage;